/// <reference path="typings/jquery.d.ts" />
/// <reference path="UserManager.ts" />

class Authenticator {

  private static userPool : UserManager = UserManager.build();

  public static signIn = (username: string, password: string, newPasswordPromise: () => Promise<string>) : Promise<boolean> => {
    return Authenticator.userPool.signIn(username, password, newPasswordPromise);
  };

  public static fetchUserToken = () : Promise<string> => {
    const deferred = $.Deferred();
    const cognitoUser = Authenticator.userPool.getCurrentUser();
    if (cognitoUser) {
        cognitoUser.getSession(function sessionCallback(err, session) {
            if (err) {
                deferred.reject(err);
            } else if (!session.isValid()) {
                deferred.reject("session is not valid");
            } else {
                deferred.resolve(session.getIdToken().getJwtToken());
            }
        });
    } else {
        deferred.reject("no user");
    }
    return deferred.promise();
  };

  public static isAutenticated = () : Promise<boolean> => {
    return Authenticator.fetchUserToken().then(function (token: string) {
        return token != null && token != undefined && token != '';
    });
  };
}