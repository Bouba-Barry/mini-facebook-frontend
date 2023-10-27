import React from "react";
import { Message, MessageListProps } from "../../types/Types";

interface PropsListMsg{
    listMessage: Message[]
}
const MessageList: React.FC<{messages: Message[]}> = ({messages})=>{
    console.log("length message list " + messages.length);
    return(
        <div className="chat-message h-80 w-80 overflow-y-auto">
            {messages.map((msg, index) =>(
            <div className={`flex items-end my-2 ${msg.isUser&&'justify-end'}`} key={index}>
                <div className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 ${msg.isUser?'order-1 items-end':'order-2 items-start'}`}>
                    <div>
                        <span 
                            className={`px-4 py-2 rounded-lg inline-block ${msg.isUser?'rounded-br-none bg-blue-600 text-white':'bg-gray-300 text-gray-600'}`}>
                                {msg.prompt}
                        </span>
                    </div>
                </div>
            </div>))}
        </div>
    )
}
export default MessageList;