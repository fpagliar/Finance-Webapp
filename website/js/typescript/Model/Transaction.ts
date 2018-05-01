/// <reference path="Entity.ts" />

class TransactionMetadata implements EntityMetadata<Entity<Transaction>> {
    private static tableName = "Transactions";

    public tableName = () : string => {
        return TransactionMetadata.tableName;
    }

    public build = (serialized:string) : Transaction => {
        return new Transaction();
    }
}
class Transaction implements Entity<Transaction> {
    private static metadata = new TransactionMetadata();

    private transactionId: string;
    private accountId: string;
    private description: string;
    private category: string;
    private subCategory: string;
    private date: Date;
    private tags: string[];

    public constructor() {
        this.transactionId = "transactionId";
    }

    public getMetadata = () : TransactionMetadata => {
        return Transaction.metadata;
    }

    public static getMetadata = () : TransactionMetadata => {
        return Transaction.metadata;
    }
}
