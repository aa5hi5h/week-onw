

const items = [
    {
        icon: "🗓️",
        title:"Coming Soon",
        description:"Check out the launches that are coming soon"
    },
    {
        icon: "❓",
        title:'Product Questions',
        description:"Answer the most intresting questions"
    },
    {
        icon: "🔮",
        title:"Launch Archive",
        description:"Most-loved Launches by the community"
    },
    {
        icon: "📰",
        title:'Newsletter',
        description:"The best of bird , everyday"
    }
]

export const ShowLaunchMenu = () => {

    return (
        <div className="absolute w-96 top-full text-gray-600 bg-white p-4 border rounded-md ">
            <div className="flex flex-col py-2 gap-4 space-y-1">
                {items.map((item:any,idx:any) => (
                    <div key={idx} className="flex ml-4 items-center gap-x-4">
                        <div>{item.icon}</div>
                        <div className="flex flex-col">
                            <div className="text-md font-bold">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}