import {useState} from "react";
//import useSendMessage from "../hooks/chat/userSendMsg";
import MessageInput from "../components/chat/MessageInput";
import {Message} from "../types/Types";
import MessageList from "../components/chat/MessageList";
import ChatHeader from "../components/chat/ChatHeader";
import { SiChatbot } from "react-icons/si";
import chatbotImg from "../images/chatbotImg.png";

export default function ChatAppContainer(){
    const [messages, setMessages] = useState<Message[]>([{prompt: "Hi!👋 how can I help you?",isUser: false}]);
    const [showBot, setShowBot] = useState(false);

    const handleSendMessage = (message: string) => {
        const messagesList = [...messages, {prompt: message, isUser: true}];
        setMessages(messagesList);
        setTimeout(() => {
            const botResponse = { prompt: 'This is a bot response.', isUser: false };
            setMessages([...messagesList, botResponse]);
          }, 1000);
    }
    const closeChatBot = ()=>{
        setShowBot(false);
    }
    const openChatBot = ()=>{
        setShowBot(!showBot);
    }
    return(
        <>
        <div className="fixed bottom-5 right-5">
            <button
                onClick={openChatBot} className="">
                <img src={chatbotImg} className="h-14 w-14"/>
            </button>
        </div>
        {showBot && 
        <div className="fixed bottom-12 right-6">
            <div className="max-w-md mx-auto bg-gray-100 rounded-lg shadow-lg p-4">
                    <ChatHeader closeChatBot={closeChatBot}/>
                <div>
                    <MessageList messages={messages}/>
                    <MessageInput onSendMessage={handleSendMessage}/>
                </div>
            </div>
        </div>}
        </>
    )
}