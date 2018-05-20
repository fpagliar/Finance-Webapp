/// <reference path="../../Model/Entity.ts" />
/// <reference path="../../typings/jquery.d.ts" />

abstract class Section {

    public collapse = () : void => {
        this.getSection().hide();
    };

    public expand = () : void => {
        this.getSection().show();
    };

    public rename = (name: string) : void => {
        this.getSection().find(".sectionTitle").text(name);
    }

    private getSection = () : JQuery<HTMLElement> => {
        return $("#" + this.getSectionName());
    }

    public abstract populate: <T> (records: Array<Entity<T>>) => void;

    protected abstract getSectionName: () => string;
}