/// <reference path="Entity.ts" />
/// <reference path="EntityMetadata.ts" />

class AccountMetadata implements EntityMetadata<Entity<Account>> {
    private static tableName = "Accounts";

    public tableName = () : string => {
        return AccountMetadata.tableName;
    }

    public getColumnHeaders = () : Array<string> => {
        return ["accountId", "accountName", "bank"];
    }

    public build = (serialized : any) : Account => {
        return new Account(serialized.accountId, serialized.accountName, serialized.bank);
    }
}

class Account implements Entity<Account> {
    private static metadata = new AccountMetadata();

    private accountId: string;
    private accountName: string;
    private bank: string;

    public constructor(accountId: string, accountName: string, bank: string) {
        this.accountId = accountId;
        this.accountName = accountName;
        this.bank = bank;
    }

    public getMetadata = () : AccountMetadata => {
        return Account.metadata;
    }

    public toColumnData = () : Array<any> => {
        return [this.accountId, this.accountName, this.bank];
    }

    public static getMetadata = () : AccountMetadata => {
        return Account.metadata;
    }
}
