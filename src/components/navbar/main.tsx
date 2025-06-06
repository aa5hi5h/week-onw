"use client"
import { BellRing } from "lucide-react"
import { Logo } from "./logo"
import { SearchBar } from "./search-bar"
import { CategoriesMenu } from "./categories-menu"
import { Notification } from "./notifications"
import { Avatar } from "./avatar"
import { useState } from "react"
import { AuthModal } from "../models/auth-modals"
import { AuthModalContent } from "./auth-content"


interface NavbarProp{
    authenticated:any
}

export const Navbar = ({authenticated}:NavbarProp) => {

    const [showAuthModel,setShowAuthModel] = useState<boolean>(false)

    console.log("AUTHENTICATED_USER::::",authenticated)

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

                {authenticated ? (
                    <div>
                        <button>Submit</button>
                        <Notification user={authenticated.user.id} />
                        <Avatar user={authenticated.user} />
                    </div>
                ) : (
                    <div className="flex items-center gap-x-4 ">
                    <button onClick={() => setShowAuthModel(true)}  className="text-gray-800  text-sm  opacity-80 cursor-pointer">Sign in</button>
                    <button onClick={() => setShowAuthModel(true)}  className="cursor-pointer text-sm  px-4 py-2 rounded-md bg-red-400 text-white">Sign up</button>
                 </div>
                )}
            </div>
            <AuthModal visible={showAuthModel} setVisible={setShowAuthModel}>
                <AuthModalContent />
            </AuthModal>
        </div>
    )
}