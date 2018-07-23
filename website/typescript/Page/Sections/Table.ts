/// <reference path="../Serializer.ts" />
/// <reference path="Section.ts" />

class Table extends Section {

    public static readonly INSTANCE = new Table();

    protected getSectionName = () : string => {
        return "tableSection";
    }

    public populate = <T> (records: Array<Entity<T>>) : void => {
        const head = $("thead")[0];
        head.innerHTML = Serializer.toHeaders(records[0].getMetadata().getColumnHeaders());
        const body = $("tbody")[0];
        const rowData : Array<string> = records.map(x => Serializer.toRow(x.toColumnData()));
        body.innerHTML = rowData.join("\n");
    };
}
