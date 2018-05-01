/// <reference path="Entity.ts" />
/// <reference path="EntityMetadata.ts" />

class AccountMetadata implements EntityMetadata<Entity<Account>> {
    private static tableName = "Accounts";

    public tableName = () : string => {
        return AccountMetadata.tableName;
    }

    public build = (serialized:string) : Account => {
        const parsedObj = JSON.parse(serialized);
        return new Account(parsedObj.accountId, parsedObj.accountName, parsedObj.bank);
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

    public static getMetadata = () : AccountMetadata => {
        return Account.metadata;
    }
}
