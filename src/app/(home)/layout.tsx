import { Navbar } from "@/components/navbar/main"


const homeLayout = ({children}:{children:React.ReactNode}) => {

    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}


export default homeLayout