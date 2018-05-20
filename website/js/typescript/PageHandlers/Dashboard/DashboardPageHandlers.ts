/// <reference path="../../Authenticator.ts" />
/// <reference path="../../Config.ts" />
/// <reference path="../../Model/Account.ts" />
/// <reference path="../../Model/Bank.ts" />
/// <reference path="../../Model/Transaction.ts" />
/// <reference path="../../Page/MessageBoard.ts" />
/// <reference path="../../Page/Model/BankPage.ts" />

class PageHandler {

    public static getRepo = () : Promise<GenericRepository> => {
        const deferred = $.Deferred();
        Authenticator.fetchUserToken().then(function (authToken: string) {
            const executor = new RequestExecutor(authToken, Configuration.Api.invokeUrl);
            const repo = new GenericRepository(executor);
            deferred.resolve(repo);
        }, function (error) {
            deferred.reject(error);
            MessageBoard.showMessage(error, MessageType.Error);
        });
        return deferred;
    }
}

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
            let a = 1;
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

$("#banksSection").on('click', function() {
    PageHandler.getRepo().then(function (repo: GenericRepository) { 
        repo.retrieveAll(Bank.getMetadata(), function (banks: Array<Bank>) {
            const page = new BankPage();
            page.show(banks);
        });
    });
});

$("#createBankButton").on('click', function() {
    PageHandler.getRepo().then(function (repo: GenericRepository) { 
        const bankName = <string> $("#bankName").val();
        repo.save(new Bank("bankId", bankName), function (param) {
            $("#newBankForm").hide();
            $(".modal-backdrop").remove();
            MessageBoard.showMessage("Bank " + bankName + " was created successfully!", MessageType.Success);
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