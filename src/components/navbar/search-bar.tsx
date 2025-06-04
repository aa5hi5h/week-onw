import { Search } from "lucide-react"


export const SearchBar = () => {

    return (
        <div className="flex items-center relative" >
            <Search size={20} className="absolute ml-2 text-gray-500" />
            <input
            className="p-2 pl-8 text-sm border rounded-full focus:outline-none" />
        </div>
    )
}