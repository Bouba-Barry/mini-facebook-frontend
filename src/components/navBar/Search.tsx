import { SearchProps } from "../../types/Types";


export default function Search(props:SearchProps) {
return(
        <form>
            <div className="flex">                
                <div className="relative w-80 h-4 mb-5">
                    <input 
                    value={props.search}
                    onInput={(event) => {
                      if (
                        event.currentTarget.value !== "\\" &&
                        event.currentTarget.value !== "}" &&
                        event.currentTarget.value !== "{"
                      ) {
                        props.changeSearch(event.currentTarget.value);
                      }
                    }}
                    className="block p-2 w-full 
                    z-20 text-sm text-gray-900 bg-gray-50 rounded-lg 
                      border-none outline-none
                    dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 
                    dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
                    placeholder="Search by Content | Hashtag" required />
                    <button type="submit" className="absolute h-9 top-0 right-0 p-2 text-sm 
                    font-medium  text-black  rounded-r-lg 
                      dark:bg-blue-600 dark:hover:bg-blue-700 
                    dark:focus:ring-blue-800">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                        {/* <span className="sr-only">Search</span> */}
                    </button>
                </div>
            </div>
        </form>
)
}