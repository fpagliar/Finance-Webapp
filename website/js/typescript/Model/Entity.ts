

interface Entity<T> {

    // tableName: () => string;

    getMetadata: () => EntityMetadata<Entity<T>>

}