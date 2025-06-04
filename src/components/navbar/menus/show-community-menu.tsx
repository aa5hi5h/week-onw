

const items = [
    {
        icon:"🎙️",
        title:"Discussion",
        description:"Checkout the launches that are releasing soon"
    },
    {
        icon:"✏️",
        title:"Stories",
        description:"Tech news, intervies and tips  from the maker"
    },
    {
        icon:"💯",
        title:"Visit streaks",
        description:"The most active communtiy members"
    }
]


export const ShowCommunityMenu = () => {

    return (
        <div className="absolute w-96 p-4 bg-white text-gray-600 shadow-sm border rounded-xl top-full ">
            <div className=" flex flex-col gap-4 space-y-1">
                {items.map((item:any,idx:any) => (
                    <div key={idx} className="flex items-center gap-4">
                        <div>{item.icon}</div>
                        <div className="flex flex-col ">
                            <div className="text-md font-bold ">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}