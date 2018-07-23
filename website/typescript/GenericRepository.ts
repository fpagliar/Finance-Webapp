/// <reference path="RequestExecutor.ts" />
/// <reference path="Model/Entity.ts" />
/// <reference path="Model/EntityMetadata.ts" />
class GenericRepository {

    private executor: RequestExecutor;

    constructor(executor: RequestExecutor) {
        this.executor = executor;
    }

    public save = (entity: Entity<any>, onSuccess: (param: any) => void) => {
        this.executor.post("repository", {tableName: entity.getMetadata().tableName(), record: entity}, onSuccess);
    }

    public retrieveAll = <T extends Entity<T>> (entity: EntityMetadata<T>, onSuccess: (records: Array<T>) => void) => {
        this.executor.get("repository?tableName=" + entity.tableName(), function (data) {
            const records : Array<T> = [];
            for (let entry of data) {
                records.push(entity.build(entry));
            }
            onSuccess(records);
        });
    }
}