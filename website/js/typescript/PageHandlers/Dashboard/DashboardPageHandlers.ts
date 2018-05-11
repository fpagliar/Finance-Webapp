/// <reference path="../../Authenticator.ts" />
/// <reference path="../../Config.ts" />
/// <reference path="../../Model/Account.ts" />
/// <reference path="../../Model/Bank.ts" />
/// <reference path="../../Model/Transaction.ts" />

$("#mybutton").on('click', function () {
    debugger;
    Authenticator.fetchUserToken().then(function (authToken: string) {
        const executor = new RequestExecutor(authToken, Configuration.Api.invokeUrl);
        const repo = new GenericRepository(executor);
        repo.save(new Account("accountId", "accountName", "bank"), function (param) {
            debugger;
        });
        repo.save(new Transaction(), function (param) {
            debugger;
        });
        repo.retrieveAll(Account.getMetadata(), function (param) {
            debugger;
        });
    });
});

// $("#showBankFormButton").on('click', function() {
//     $("newBankForm").show();
// });

$("#showAccountFormButton").on('click', function() {
    Authenticator.fetchUserToken().then(function (authToken: string) {
        const executor = new RequestExecutor(authToken, Configuration.Api.invokeUrl);
        const repo = new GenericRepository(executor);
        repo.retrieveAll(Bank.getMetadata(), function (banks: Array<Bank>) {

        });
    });
});

$("#createAccountButton").on('click', function() {
    Authenticator.fetchUserToken().then(function (authToken: string) {
        const executor = new RequestExecutor(authToken, Configuration.Api.invokeUrl);
        const repo = new GenericRepository(executor);
        const accountName = <string> $("accountName").val();
        repo.save(new Account("accountId", accountName, "bank"), function (param) {
            debugger;
        });
    });
});

$("#createBankButton").on('click', function() {
    Authenticator.fetchUserToken().then(function (authToken: string) {
        const executor = new RequestExecutor(authToken, Configuration.Api.invokeUrl);
        const repo = new GenericRepository(executor);
        const bankName = <string> $("bankName").val();
        repo.save(new Bank("bankId", bankName), function (param) {
            debugger;
        });
    });
});

$('#file').change(function() {
    const file = (<any>this).files[0];
    const reader = new FileReader();
    reader.onload = function (progressEvent) {
      // Entire file
      console.log(this.result);
  
      // By lines
      const lines = this.result.split('\n');
      for(let line = 0; line < lines.length; line++) {
        console.log(lines[line]);
      }
    };
    reader.readAsText(file);
});