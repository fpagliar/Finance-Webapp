/// <reference path="../Sections/Table.ts" />
/// <reference path="../Sections/Graph.ts" />
/// <reference path="../Page.ts" />

class BankPage implements Page {

    public show = (banks: Array<Bank>) : void => {
        this.showMenuOptions();
        Graph.INSTANCE.collapse();
        Table.INSTANCE.expand();
        Table.INSTANCE.rename("Banks");
        Table.INSTANCE.populate(banks);
    }

    public showMenuOptions = () : void => {
        $(".operationButton").hide();
        $(".operationButton.bank").show();
    }
}