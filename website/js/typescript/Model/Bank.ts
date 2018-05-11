/// <reference path="Entity.ts" />
/// <reference path="EntityMetadata.ts" />

class BankMetadata implements EntityMetadata<Entity<Bank>> {
    private static tableName = "Banks";

    public tableName = () : string => {
        return BankMetadata.tableName;
    }

    public build = (serialized:string) : Bank => {
        const parsedObj = JSON.parse(serialized);
        return new Bank(parsedObj.bankId, parsedObj.bankName);
    }
}

class Bank implements Entity<Bank> {
    private static metadata = new BankMetadata();

    private bankId: string;
    private bankName: string;

    public constructor(bankId: string, bankName: string) {
        this.bankId = bankId;
        this.bankName = bankName;
    }

    public getMetadata = () : BankMetadata => {
        return Bank.metadata;
    }

    public static getMetadata = () : BankMetadata => {
        return Bank.metadata;
    }
}
