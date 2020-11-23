import axios from '../axios/axios'
class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    greet = (message) => {
        const data = { message }
        axios.get('/api/users/chatbot', data, {
            headers: {
                'Content-type': 'application/json',
            }
        })
            .then(res => {
                console.log(res);
                const message = this.createChatBotMessage(res.data.message);
                this.addMessageToState(message);
            })
            .catch(e => {
                console.log(e)
            })

    }

    addMessageToState = (message) => {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));

    };
}
export default ActionProvider