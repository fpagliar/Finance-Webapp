/// <reference path="../typings/jquery.d.ts" />

enum MessageType {
    Success, Error
};

class MessageBoard {

    public static showMessage = (message: string, type : MessageType) : void => {
        const boardId = MessageBoard.getBoardId(type);
        const boardElement = $("#" + boardId);
        boardElement.text(message);
        boardElement.fadeTo(2000, 500).slideUp(500, function() {
            boardElement.slideUp(500);
        });
    }

    private static getBoardId = (type : MessageType) : string => {
        if (type == MessageType.Success) {
            return "successMessageBoard";
        } else if(type == MessageType.Error) {
            return "errorMessageBoard";
        } else {
            throw new TypeError("Invalid MessageType: " + type);
        }
    }
}