"use client"
import Link from "next/link"
import { useState } from "react"
import { ShowLaunchMenu } from "./menus/show-launch-menu"
import { ShowCommunityMenu } from "./menus/show-community-menu"
import { ShowAboutMenu } from "./menus/show-about-menu"



export const CategoriesMenu = () => {

    const [showLaunchesMenu,setShowLaunchesMenu] = useState<boolean>(false)
    const [showCommunityMenu,setShowCommunityMenu] = useState<boolean>(false)
    const [showAboutMenu,setShowAboutMenu] = useState<boolean>(false) 

    return (
        <div className="hidden md:flex text-medium text-gray-600 p-2">
            <div className="flex gap-x-6 items-center">
                <div 
                onMouseEnter={() => setShowLaunchesMenu(true)}
                onMouseLeave={() => setShowLaunchesMenu(false)} 
                className="hover:text-red-600 cursor-pointer ">
                    Launches { showLaunchesMenu && <ShowLaunchMenu />}
                </div>
                <Link className="hover:text-red-600" href={"/categories"}>Categories</Link>
                <div
                onMouseEnter={() => setShowCommunityMenu(true)} 
                onMouseLeave={() => setShowCommunityMenu(false)}
                className="hover:text-red-600 cursor-pointer">
                    Community {showCommunityMenu && <ShowCommunityMenu />}
                </div>
                <Link className="hover:text-red-500 " href={"/advertise"}>Advertise</Link>
                <div 
                className="hover:text-red-500 cursor-pointer"
                onMouseEnter={() => setShowAboutMenu(true)}
                onMouseLeave={() => setShowAboutMenu(false)}>
                    About { showAboutMenu && <ShowAboutMenu />}
                </div>
            </div>
        </div>
    )
}