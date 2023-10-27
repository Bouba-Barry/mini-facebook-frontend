import { FaSpinner } from "react-icons/fa"
import SpinnerButton from "../spinner/SpinnerButton"

interface propsButton {
    textButton : String,
    loading: boolean
}
export default function ButtonSubmitForm(props: propsButton){
    return(
        <div className="">
            <button 
                type="submit"
                className="flex flex-row justify-center items-center text-white bg-[#333437] hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full">
                    {props.textButton} {props.loading && <SpinnerButton />}
            </button>
        </div>
    )
}