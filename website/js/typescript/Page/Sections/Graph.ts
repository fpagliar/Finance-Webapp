/// <reference path="../Serializer.ts" />
/// <reference path="Section.ts" />

class Graph extends Section {

    public static readonly INSTANCE = new Graph();

    protected getSectionName = () : string => {
        return "graphSection";
    }

    public populate = () : void => {

    };
}