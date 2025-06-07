import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import Link from "next/link"
import { Heart, Settings, ShoppingBag } from "lucide-react"
import { signOut } from "next-auth/react"


interface AvatarProps{
    user:any
}

export const Avatar = ({user}:AvatarProps) => {

    return (
        <DropdownMenu>
  <DropdownMenuTrigger>
    <Image 
    src={user.image}
    alt="profile logo"
    width={50}
    height={50}
    className="rounded-full focus:outline-none shadow-md h-8 w-8" />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>
        <Link href={"/my-product"} className="flex gap-x-2 items-center">
        <ShoppingBag /> My product</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
        <Link className="flex items-center gap-x-2" href={"/my-upvote"}>
        <Heart />
        Upvote
        </Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
        <div className="flex items-center gap-x-2">
        <Settings />
        settings
        </div>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
        <div onClick={() => signOut()}>
            Logout
        </div>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
    )
}