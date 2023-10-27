import { ErrorProps } from "../../types/Types"


export const Error=(props:ErrorProps)=>{
    return(
      <p className="text-red-500 text-xs italic">
      {props.error?.type==="required" && "This field is required"}
      {props.error?.type==="minLength" && "at least 3 characters needed"}
      </p>
      )
  }