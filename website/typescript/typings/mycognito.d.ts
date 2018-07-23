declare namespace AmazonCognitoIdentity {
    class CognitoUserPool {
        constructor(data: any);
    }

    class CognitoUser {
        constructor(data: any);
        authenticateUser(first: any, second: any);
        completeNewPasswordChallenge(password: string, userAttributes: any, something: any);
    }

    class AuthenticationDetails {
        constructor(data: any);
    }
}
