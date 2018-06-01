/// <reference path="../../Authenticator.ts" />
/// <reference path="../../Config.ts" />
/// <reference path="../../Model/Account.ts" />
/// <reference path="../../Model/Bank.ts" />
/// <reference path="../../Model/Transaction.ts" />
/// <reference path="../../Page/MessageBoard.ts" />
/// <reference path="../../Page/Model/BankPage.ts" />

class PageHandler {
    public static bankPage: BankPage; 

    public static load = () : void => {
        Authenticator.fetchUserToken().then(function (authToken: string) {
            const executor = new RequestExecutor(authToken, Configuration.Api.invokeUrl);
            PageHandler.loadPages(new GenericRepository(executor));
        }, function (error) {
            MessageBoard.showMessage(error, MessageType.Error);
        });
    }

    private static loadPages = (repo: GenericRepository) : void => {
        PageHandler.bankPage = new BankPage(repo);
    }
}

$(document).ready(function () {
    const forms = $(".formImport");
    for (let i = 0; i < forms.length; i++) {
        document.body.appendChild((<any>forms[i]).import.querySelector("body"));
    }

    const navigationItems = $(".navigationImport");
    for (let i = 0; i < navigationItems.length; i++) {
        $("#operationsNavigation")[0].appendChild((<any>navigationItems[i]).import.querySelector("body"));
    }
    $(".operationButton").hide();

    PageHandler.load();
});

$("#banksSection").on('click', function () {
    PageHandler.bankPage.show();
});

$("#createBankButton").on('click', function() {
    PageHandler.bankPage.create();
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