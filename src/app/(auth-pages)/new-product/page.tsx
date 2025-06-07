"use client"
import { Textarea } from "@/components/ui/textarea"
import { ImageUploader } from "@/components/uploader/image-uploader"
import { LogoUploader } from "@/components/uploader/logo-uploader"
import Image from "next/image"
import { useCallback, useState } from "react"


const categoriesItem = [
    "Media",
    "Blockchain",
    "Cloud",
    "Commerce",
    "Cybersecurity",
    "Design",
    "Data",
    "Photography",
    "E-commerce",
    "Education",
    "Entertainment",
    "video"
]


const NewProductPage = () => {

    const [name , setName] = useState<string>("")
    const [slug,setSlug] = useState<string>("")
    const [step,setStep] = useState<number>(0)
    const [categories,setCategories] = useState<string[]>([])
    const [headline,setHeadline] = useState<string>("")
    const [description,setDescription] = useState<string>("")
    const [uploadedProductLogoUrl,setUploadedProductLogoUrl] = useState<string>("")
    const [uploadedProductImagesUrl,setProductImagesUrl] = useState<string[]>([])

    const handleInputChange = (e: any) => {
        const productName = e.target.value
        setName(productName)
        const formattedProduct = productName
        .toLowerCase()
        .replace(/[\s.]+/g,"-")
        .replace(/[^a-z0-9-]/g,"-")
        .replace(/-+/g,"-")

        setSlug(formattedProduct)
    }

    const nextStep = useCallback(() => {
        setStep(step+1)
    },[step])

    
    const handleToggleCategory = (category:string) => {
        if(categories.includes(category)){
            setCategories((prev) => prev.filter((cat) => cat !== category))
        }else if( categories.length < 3){
            setCategories((prev) => [...prev,category])
        }
    }

    const HanldeLogoUrl = useCallback((url:any) => {
        setUploadedProductLogoUrl(url)
    },[])

    const HandleMultipleImages = useCallback((urls:string[]) => {
        setProductImagesUrl(urls)
    },[])

    return (
        <div className="px-6 md:px-0 mt-12 md:mt-20  md:w-3/5 mx-auto ">
                {step === 0 && (
                    <div className="flex flex-col space-y-8">
                <h1 className="text-4xl font-bold tracking-tight">New Product</h1>
                <p className="text-xl font-light leading-8">Ready to showcase your product to the world? You came to 
                    the right place. Follow the steps below to get started.</p>
                <div className="flex flex-col space-y-1">
                    <div className="font-semibold ">Name of the product</div>
                    <input 
                    value={name}
                    maxLength={30}
                    onChange={handleInputChange}
                    className="p-2 border rounded-md focus:outline-none" />
                    <div className="text-gray-600 mt-1">{name.length}/30</div>
                </div>
                <div className="flex flex-col space-y-1">
                    <div className="font-semibold">Slug</div>
                    <input
                    value={slug}
                    readOnly
                    className="p-2 border rounded-md focus:outline-none"  />
                </div>
                </div>
                )
}
            { step === 1 && (
                <div className="flex flex-col space-y-8 " >
                    <h2 className="text-4xl font-bold tracking-tight">What category does your product belong to ?</h2>
                    <p className="font-light text-xl text-gray-500">Choose at least 3 categories that best fits your product. This will people discover your product</p>
                    <div className="font-semibold text-lg">Select Categories</div>
                    <div className="grid grid-cols-4 gap-4">
                    {categoriesItem.map((category:any,idx:any) => (
                        <div onClick={() => handleToggleCategory(category)} key={idx} 
                        className={`py-2 cursor-pointer px-6 text-center rounded-full border 
                        ${categories.includes(category) ? "bg-red-500 text-white" : "bg-white"} `}>
                            {category}
                        </div>
                    ))}
                </div>
                </div>
            ) }
            { step === 2 && (
                <div className="flex flex-col space-y-8 ">
                    <h2 className="text-4xl font-bold tracking-tight">Product Details</h2>
                    <p className="font-light text-xl leading-8">Keep it simple and clear. Describe your product in a way that 
                        makes it easy for people to understand what it does.</p>
                    <div>
                        <div className="font-semibold">Headline</div>
                        <input
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        maxLength={70}
                        className="p-2 mt-1 border w-full rounded-md focus:outline-none" />
                        <div className="mt-1 text-gray-500">{headline.length}/70</div>
                    </div>
                    <div>
                        <div className="font-semibold">Description</div>
                        <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        maxLength={300} 
                        rows={8}
                        className="w-full " />
                        <div className="mt-1 text-gray-500">{description.length}/300</div>
                    </div>
                </div>
            )

            }
            {
                step === 3 && (
                    <div className="space-y-8 flex flex-col">
                        <h1 className="text-4xl font-bold tracking-tight">Add images to your product</h1>
                        <p className="font-light leading-8 text-xl">Include images that best represent your product.
                             This will help people understand what your product looks like.</p>
                        <div>
                            <div>Logo</div>
                            {uploadedProductLogoUrl ? (
                                <div>
                                    <Image
                                    src={uploadedProductLogoUrl}
                                    alt="product logo"
                                    width={1000}
                                    height={1000}
                                    className="w-40 h-40 object-cover rounded-md" />
                                </div>
                            ) : (
                                <LogoUploader 
                                onChange={HanldeLogoUrl} 
                                endpoint="ProductLogo" />
                            )}
                        </div>
                        <div>
                            Product Images ( upload atleast 3 images )
                            {
                                uploadedProductImagesUrl.length > 0 ? (
                                    <div className="md:flex space-y-4 mt-2 md:space-y-0 gap-2">
                                    {uploadedProductImagesUrl.map((url:any,idx:any) => (
                                        <div key={idx} className="relative md:w-40 md:h-40">
                                        <Image
                                        src={url}
                                        alt="Product images url"
                                        width={1000}
                                        height={1000}
                                        objectFit="cover"
                                        className="rounded-md" />
                                        </div>
                                    ))}
                                    </div>
                                ) : (
                                    <ImageUploader
                                    endpoint="ProductImages"
                                    onChange={HandleMultipleImages} />
                                )
                            }
                        </div>
                    </div>
                )
            }
                <div className="flex justify-start pb-12 mt-8">
                    <button onClick={nextStep} className="bg-red-500 text-white cursor-pointer px-4 py-2 hover:opacity-75 rounded-md ">Next</button>
                </div>
            </div>
    )
}

export default NewProductPage