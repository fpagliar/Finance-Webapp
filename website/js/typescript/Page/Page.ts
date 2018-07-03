
abstract class Page<T extends Entity<T>> {
    // show: () => void;

    protected readonly repo: GenericRepository;

    constructor(repo : GenericRepository) {
        this.repo = repo;
    }

    protected abstract getNavigationClass: () => string;
    protected abstract getTitle: () => string;
    protected abstract showsTable: () => boolean;
    protected abstract showsGraph: () => boolean;
    protected abstract getMetadata: () => EntityMetadata<Entity<T>>;

    public show = () : void => {
        $(".operationButton").hide();
        $(".operationButton." + this.getNavigationClass()).show();
        Graph.INSTANCE.show(this.showsGraph());
        Graph.INSTANCE.rename(this.getTitle());
        Table.INSTANCE.show(this.showsTable());
        Table.INSTANCE.rename(this.getTitle());
        this.repo.retrieveAll(this.getMetadata(), function(banks: Array<T>) {
            Table.INSTANCE.populate(banks);
        });
    }
}