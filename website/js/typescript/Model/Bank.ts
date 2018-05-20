/// <reference path="Entity.ts" />
/// <reference path="EntityMetadata.ts" />

class BankMetadata implements EntityMetadata<Entity<Bank>> {
    private static tableName = "Banks";

    public tableName = () : string => {
        return BankMetadata.tableName;
    }

    public build = (serialized : any) : Bank => {
        return new Bank(serialized.bankId, serialized.bankName);
    }

    public getColumnHeaders = () : Array<string> => {
        return ["bankId", "bankName"];
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

    public toColumnData = () : Array<any> => {
        return [this.bankId, this.bankName];
    }

    public static getMetadata = () : BankMetadata => {
        return Bank.metadata;
    }
}
