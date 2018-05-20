/// <reference path="../Sections/Table.ts" />
/// <reference path="../Sections/Graph.ts" />
/// <reference path="../Page.ts" />
/// <reference path="../../GenericRepository.ts" />

class BankPage extends Page {

    private readonly repo: GenericRepository;

    constructor(repo : GenericRepository) {
        super();
        this.repo = repo;
    }

    public show = () : void => {
        $(".operationButton").hide();
        $(".operationButton.bank").show();
        Graph.INSTANCE.collapse();
        Table.INSTANCE.expand();
        Table.INSTANCE.rename("Banks");
        this.repo.retrieveAll(Bank.getMetadata(), function(banks: Array<Bank>) {
            Table.INSTANCE.populate(banks);
        });
    }

    public create = () : void => {
        const bankName = <string> $("#bankName").val();
        const bankId = <string> $("#bankId").val();
        this.repo.save(new Bank(bankId, bankName), function (param) {
            $("#newBankForm").hide();
            $(".modal-backdrop").remove();
            MessageBoard.showMessage("Bank " + bankName + " was created successfully!", MessageType.Success);
        });
    }
}