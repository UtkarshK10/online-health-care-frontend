
class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
    }

    parse = (message) => {
        const lowercase = message.toLowerCase();
        if (lowercase.length === 0) return;
        this.actionProvider.greet(lowercase);
    };
}

export default MessageParser;
