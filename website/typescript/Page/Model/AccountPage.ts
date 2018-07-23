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

    protected populateData = () : void => {
        this.repo.retrieveAll(this.getMetadata(), function(accounts: Array<Account>) {
            Table.INSTANCE.populate(accounts);
        });
    }
}