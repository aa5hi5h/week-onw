import { X } from "lucide-react"



interface AuthMoalProps{
    visible:boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
    children: React.ReactNode
}

export const AuthModal: React.FC<AuthMoalProps> = ({visible,setVisible,children}) => {

    if(!visible) return null

    return (
        <div className="flex items-center justify-center fixed inset-0 z-50 ">
            <div onClick={() => setVisible(false)} className="bg-black opacity-75 fixed inset-0 backdrop-blur backdrop-filter" />
                <div className="h-full w-full mt-auto sm:mt-0 xl:h-[500px] sm:w-[550px] relative z-10 bg-white shadow-sm rounded-md ">
                    <div className="absolute top-0 right-0 mt-4 mr-4">
                        <button className="hover:opacity-75 cursor-pointer">
                            <X className="w-4 h-4" onClick={() => setVisible(false)} />
                        </button>
                    </div>
                    <div className="flex flex-col flex-1 px-8 py-10 justify-center text-left ">
                        {children}
                    </div>
                </div>
        </div>
    )
}