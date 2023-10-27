import { IoMdClose } from "react-icons/io";
import  {FormHeaderProps} from "../../types/Types";

export default function FormHeader(props:FormHeaderProps) {
return(
    <div className="flex flex-row justify-between mb-1">
        <h5 className="dark:text-white">
           {props.title}
        </h5>
        <div>
            <button className="text-3xl dark:text-white" type="button" >
            <IoMdClose className="mb-1" onClick={props.closePopupClick}/></button>
        </div>
    </div>
)

}