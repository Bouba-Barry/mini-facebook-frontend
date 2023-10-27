import Button from "../utils/Button";
import HeaderForm from "../utils/HeaderForm";
import RighSideLoginRegister from "../utils/RightSideLoginRegister";
import SignUpForm from "./SignUpForm";

export default function SignUpPage(){
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
            <div className="flex flex-col justify-center items-center m-2">
                <HeaderForm 
                    title={"SIGN UP"}/>
                <SignUpForm />
                <Button 
                    text={"Do you have already an account?"}
                    textButton={"LOGIN"}
                    link={"/login"}/>
            </div>
            <div className="md:block hidden">
                <RighSideLoginRegister paragraph={"Please create your account"}/>
            </div>
        </div>
    )
}