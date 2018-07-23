
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
    protected abstract populateData: () => void;

    private showNavigation = () : void => {
        $(".operationButton").hide();
        $(".operationButton." + this.getNavigationClass()).show();
    }

    private showLayout = () : void => {
        Graph.INSTANCE.show(this.showsGraph());
        Graph.INSTANCE.rename(this.getTitle());
        Table.INSTANCE.show(this.showsTable());
        Table.INSTANCE.rename(this.getTitle());
    }

    public show = () : void => {
        this.showNavigation();
        this.showLayout();
        this.populateData();
    }
}