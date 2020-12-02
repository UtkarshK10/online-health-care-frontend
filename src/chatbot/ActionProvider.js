import data from '../assets/basics.json';
import stringSimilarity from 'string-similarity';
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    greet = (message) => {
        let defaultAnswer = 'Sorry, I\'m still in learning phase';
        let labels = [];
        let answers = [];
        data.forEach(obj => {
            labels.push(obj.label.toString().toLowerCase())
            answers.push(obj.answer.toString().toLowerCase())
        })


        const matching = stringSimilarity.findBestMatch(message, labels)

        const { bestMatch } = matching;

        if (bestMatch.rating < 0.2) {
            const res = this.createChatBotMessage(defaultAnswer);
            this.addMessageToState(res);
            return;
        }

        const { target } = bestMatch;

        const idx = labels.findIndex(ques => ques === target);

        if (idx === -1) {
            const res = this.createChatBotMessage(defaultAnswer);
            this.addMessageToState(res);

        } else {
            const res = this.createChatBotMessage(answers[idx]);
            this.addMessageToState(res);
        }

    }

    addMessageToState = (message) => {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));

    };
}
export default ActionProvider