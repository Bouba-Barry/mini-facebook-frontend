import { IoMdClose } from "react-icons/io";
import { ChatBotHeaderProps } from "../../types/Types";

export default function ChatHeader(props: ChatBotHeaderProps){
    return(
        <div className="flex flex-row justify-between mb-1">
        <h5 className="dark:text-white">
            Mini ChatBot
        </h5>
        <div>
            <button
                onClick={props.closeChatBot}
                className="text-3xl dark:text-white"
                type="button" >
            <IoMdClose className="mb-1"/></button>
        </div>
        </div>
    )
}