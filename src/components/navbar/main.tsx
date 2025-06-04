import { BellRing } from "lucide-react"
import { Logo } from "./logo"
import { SearchBar } from "./search-bar"
import { CategoriesMenu } from "./categories-menu"


export const Navbar = () => {

    return (
        <div className="p-4 border-b flex items-center justify-between">
            <div className="flex gap-x-4 items-center">
                <Logo />
                <SearchBar />
            </div>
            <div className ="absolute right-1/2 translate-x-1/2 transform z-10">
                <CategoriesMenu />
            </div>
            <div className="flex items-center md:mr-4">
            
                 <div className="flex items-center gap-x-4 ">
                    <button className="text-gray-800  text-sm  opacity-80 cursor-pointer">Sign in</button>
                    <button className="cursor-pointer text-sm  px-4 py-2 rounded-md bg-red-400 text-white">Sign up</button>
                 </div>
            </div>
        </div>
    )
}