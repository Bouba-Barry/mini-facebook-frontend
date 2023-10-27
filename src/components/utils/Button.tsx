import { Link } from "react-router-dom"

interface propsButton{
    text: string
    textButton : string
    link: string
}
export default function Button(props : propsButton){
    return(
        <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-2 md:mb-0 md:mr-4">{props.text}</p>
                <Link  to={props.link}
                    className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm md:w-auto px-5 py-2.5 text-center">
                        {props.textButton}
                </Link>
        </div>
    )
}