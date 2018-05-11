/// <reference path="RequestExecutor.ts" />

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
            debugger;
            entity.build(data);
            
        });
    }
}