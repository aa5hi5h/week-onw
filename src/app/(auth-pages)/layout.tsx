import { redirect } from "next/navigation"
import { auth } from "../../../auth"


const AuthLayout = async ({children}:{children:React.ReactNode}) => {

    const authenticated = await auth()

    if(!authenticated){
        redirect("/")
    }

    return (
        <div>
            {children}
        </div>
    )
}


export default AuthLayout