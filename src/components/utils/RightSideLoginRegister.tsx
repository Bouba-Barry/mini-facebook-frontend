interface propsRightSide{
    paragraph: String
}
export default function RighSideLoginRegister(props: propsRightSide){
    return(
        <div className="flex justify-center items-center min-h-screen bg-[#333437] text-white">
            <div className="text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">WELCOME</h1>
                <h2 className="text-5xl md:text-6xl lg:text-7xl mb-2">Mini Facebook</h2>
                <p className="text-sm md:text-base">{props.paragraph}</p>
            </div>
        </div>
    )
}