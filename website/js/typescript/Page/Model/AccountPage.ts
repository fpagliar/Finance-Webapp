/// <reference path="../Sections/Table.ts" />
/// <reference path="../Sections/Graph.ts" />
/// <reference path="../Page.ts" />
/// <reference path="../../GenericRepository.ts" />

class AccountPage extends Page<Account> {

    constructor(repo : GenericRepository) {
        super(repo);
    }

    protected getNavigationClass = () : string => {
        return "account";
    }

    protected getTitle = () : string => {
        return "Accounts";
    }

    protected showsTable = () : boolean => {
        return true;
    }

    protected showsGraph = () : boolean => {
        return true;
    }

    protected getMetadata = () : EntityMetadata<Account> => {
        return Account.getMetadata();
    }

    // public create = () : void => {
    //     const bankName = <string> $("#bankName").val();
    //     const bankId = <string> $("#bankId").val();
    //     this.repo.save(new Bank(bankId, bankName), function (param) {
    //         $("#newBankForm").hide();
    //         $(".modal-backdrop").remove();
    //         MessageBoard.showMessage("Bank " + bankName + " was created successfully!", MessageType.Success);
    //     });
    // }
}