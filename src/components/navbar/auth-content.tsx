import { signIn } from "next-auth/react"



export const AuthModalContent = () => {

    return (
            <div className="flex flex-col items-center py-20 px-8  justify-center min-h-full text-center">
                <div className="text-2xl font-bold py-4 tracking-tight">See what&apos;s new in tech</div>
                <p className="text-gray-600 mx-auto w-4/5 text-sm ">Join our community of friendly 
                folk discovering and sharing the latest product in tech</p>
                <button
                onClick={() => signIn("google")} 
                className="px-10 border rounded-md  py-2 hover:opacity-75 mt-4 cursor-pointer">
                    Sign in with Google
                </button>
                <button 
                onClick={() => signIn("github")}
                className="px-10 border py-2 hover:opacity-75 mt-4 rounded-md  cursor-pointer">
                    Sign in with Github
                </button>
            </div>
    )
}