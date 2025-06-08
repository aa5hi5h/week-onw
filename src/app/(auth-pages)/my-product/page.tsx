import { getProducts } from "@/lib/server-action"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


const MyProductPage = async() => {

    const products = await getProducts()

    console.log("PRODUCT::::",products)

    return (
        <div className="md:px-0 md:py-0 px-6 py-10 md:w-3/5 md:mx-auto">
            { products.length < 0 ? (
                <div>
                <h2 className="text-4xl font-bold tracking-tight">No product found</h2>
                <p className="text-gray-500 text-xl font-medium">Looks like you have not created any products yet, create a 
                    new product to continue
                </p>
                <Link href={"/new-product"} className="flex gap-x-2">
                <div className="bg-red-500 text-white px-6 py-2 w-56">
                    <Plus />
                    <div>Create a product</div>
                </div>
                </Link>
                </div>
            ) : (
                <div>
                   <h2 className="text-4xl font-bold tracking-tight">All Products</h2>
                   <div className="text-gray-500 mt-1 font-medium">Manage your products here</div>
                   <div className="grid grid-cols-2 lg:grid-cols-5 mt-10 gap-4">
                   {products.map((product:any,idx:any) => (
                    <Link href={`/edit/${product.id}`} key={idx}>
                     <div className="rounded-xl hover:scale-105 transition-transform
                                    justify-center items-center cursor-pointer border ease-in-out duration-300 transform">
                        <Image
                        src={product.logo}
                        alt="product logo"
                        width={150}
                        height={150}
                        className="rounded-md object-cover" />
                    </div>
                    </Link>
                   ))}
                   </div>
                </div>
            )}
        </div>
    )
}

export default MyProductPage