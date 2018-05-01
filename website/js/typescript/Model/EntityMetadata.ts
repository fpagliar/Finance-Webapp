/// <reference path="Entity.ts" />

interface EntityMetadata<T extends Entity<T>> {

    tableName: () => string;

    build: (serialized: string) => T;
}