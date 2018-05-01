/// <reference path="Config.ts" />
/// <reference path="typings/jquery.d.ts" />
/// <reference path="typings/mycognito.d.ts" />

class UserManager {

  private userPool;

  constructor(userPool) {
    this.userPool = userPool;
  }

  public signOut = () => {
      this.userPool.getCurrentUser().signOut();
  };

  public getCurrentUser = () : any => {
      return this.userPool.getCurrentUser();
  };

  public signIn = (username: string, password: string, newPasswordHandler: () => Promise<string>) : Promise<boolean> => {
    const deferred = $.Deferred();
    const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
      Username: username,
      Password: password
    });
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
      Username: username,
      Pool: this.userPool
    });

    cognitoUser.authenticateUser(authDetails, {
        onSuccess: () => { deferred.resolve() } ,
        onFailure: (error) => { deferred.reject(error) },
        newPasswordRequired(userAttributes, []) {
          delete userAttributes.email_verified;
          const that = this;
          newPasswordHandler().then(function (newPassword: string) {
            cognitoUser.completeNewPasswordChallenge(newPassword, userAttributes, that);
          });
        }
    });
    return deferred.promise();
  };

  public static build = () : UserManager => {
    try{
      const poolData = {
        UserPoolId: Configuration.Cognito.userPoolId,
        ClientId:  Configuration.Cognito.userPoolClientId
      };
      const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
      return new UserManager(userPool);
    }
    catch {
      return null;
    }
  };
}