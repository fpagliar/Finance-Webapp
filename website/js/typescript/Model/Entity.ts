

interface Entity<T> {

    getMetadata: () => EntityMetadata<Entity<T>>;

    toColumnData: () => Array<any>;
}