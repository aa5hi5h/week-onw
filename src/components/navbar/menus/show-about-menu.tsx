


const items = [
    {
        title:"About Us",
    },
    {
        title:"Carrers"
    },
    {
        title:"Apps"
    },
    {
        title:"Faqs"
    },
    {
        title:"Legal"
    }
]


export const ShowAboutMenu = () => {

    return (
        <div className="border border-gray-300 bg-white text-gray-600 rounded-xl w-56 absolute top-full shadow-md ">
            <div className="flex p-4">
                <div className="flex flex-col space-y-1">
                    {items.map((item:any,idx:any) => (
                        <div key={idx} className="font-semibold ">
                            {item.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}