import { Navbar } from "@/components/navbar/main"
import { auth } from "../../../auth"


const homeLayout = async ({children}:{children:React.ReactNode}) => {



    return (
        <div>
            {children}
        </div>
    )
}


export default homeLayout