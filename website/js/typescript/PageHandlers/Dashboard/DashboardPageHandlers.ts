/// <reference path="../../Authenticator.ts" />
/// <reference path="../../Config.ts" />
/// <reference path="../../Model/Account.ts" />
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

// TODO:
// 1 - Map from line to transaction.
// 2 - Nice dialog with bank selection for the file.
// 3 - Bank CRUD.
// 4 - Trigger all saves.
// 5 - Retrieves populate grids.
// 6 - Github repo.
// 7 - AWS Initialization scripts.
// 8 - Figure out build issues.
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