
class Serializer {

    public static toHeaders = (headers : Array<string>) : string => {
        return Serializer.createRow(headers, "th");
    }

    public static toRow = (columns : Array<any>) : string => {
        return Serializer.createRow(columns, "td");
    }

    private static createRow = (data : Array<any>, separatorName: string) : string => {
        const separatorStart = "<" + separatorName + ">";
        const separatorEnd = "</" + separatorName + ">";
        let ans = "<tr>";
        for (let cell of data) {
            ans += separatorStart + cell + separatorEnd;
        }
        ans += "</tr>"
        return ans;
    }
}