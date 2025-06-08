"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ImageUploader } from "@/components/uploader/image-uploader"
import { LogoUploader } from "@/components/uploader/logo-uploader"
import { createProduct } from "@/lib/server-action"
import { Product } from "@prisma/client"
import { format } from "date-fns"
import { ArrowLeft, ChevronDownIcon, Gamepad2, Link2, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"
import { toast } from "sonner"


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
    const [date,setDate] = useState<Date | undefined>(undefined)
    const [calendarOpen,setCalendarOpen] = useState<boolean>(false)
    const [website,setWebsite] = useState<string>("")
    const [Twitter,setTwitter] = useState<string>("")
    const [discord,setDiscord] = useState<string>("")

    const router = useRouter()

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

    const handlePreviousStep = useCallback(() => {
        setStep(step - 1 ) 
    },[step])

    const HandleSubmitAnotherProduct = () => {
        setName("")
        setSlug("")
        setCategories([])
        setDescription("")
        setHeadline("")
        setUploadedProductLogoUrl("")
        setProductImagesUrl([])
        setDate(undefined)
        setCalendarOpen(false)
        setTwitter("")
        setWebsite("")
        setDiscord("")
        setStep(0)
    }

    const handleSubmit = async() => {

        const formattedDate = date ? format(date , "dd/mm/yyyy") : ""
        const data = {
            name,
            slug,
            website,
            twitter:Twitter,
            headline,
            description,
            logo: uploadedProductLogoUrl,
            discord,
            images: uploadedProductImagesUrl,
            releaseDate: formattedDate,
            categories,
        }

        try{
            await createProduct(data)
            toast("Product created Successfully",{position:"top-center"})
            setStep(7)
        }catch(err){
            console.log("ERR:::",err)
            toast("Error while creating this product",{position:"top-center"})
        }
        
    }


    const HandleGoToMyProduct = () => {
        router.push("/my-product")
    }

    


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
            {
                step === 4 && (
                    <div className="flex flex-col space-y-8">
                        <div className="font-bold tracking-tight text-4xl">
                            Release Date
                        </div>
                        <p className="font-medium text-xl">When will your product be available to the public? Select a date to continue.</p>
                        <div>
                            <div className="font-smeibold">Release Date</div>
                            <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date)
              setCalendarOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
                        </div>
   
                    </div>
                )
            }
            {
                step === 5 && (
                    <div className="flex flex-col space-y-8">
                        <h2 className="text-4xl font-bold tracking-tight">Additional Links</h2>
                        <p className="text-xl font-light">Add links to your product's website, social media, and other platforms</p>
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-x-2">
                                <Link2 />
                                <div className="text-lg text-gray-500">Website</div>
                            </div>
                            <input
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                             className="p-2 rounded-md border w-full focus:outline-none" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-x-2">
                                <X />
                                <div className="text-lg text-gray-500">Twitter</div>
                            </div>
                            <input 
                            value={Twitter}
                            onChange={(e) => setTwitter(e.target.value)}
                            className="p-2 border focus:oultine-none rounded-md w-full" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-x-2">
                                <Gamepad2 />
                                <div className="text-lg text-gray-500">Discord</div>
                        </div>
                        <input 
                        value={discord}
                        onChange={(e) => setDiscord(e.target.value)}
                        className="p-2 border focus:outltine-none rounded-md w-full" />
                    </div>
                </div>
                )
            }
            {
                step === 6 && (
                    <div className="flex flex-col space-y-8">
                        <div className="text-4xl font-bold tracking-tight">Review and Submit</div>
                        <p className="text-xl font-light leading-8">Review the details of your product and submit it to the world.
                             Your product will be reviewed by our team before it goes live.</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="font-semibold text-lg">Name of the product</div>
                            <div className="mt-2 text-gray-600">{name}</div>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">Slug ( URl )</div>
                            <div className="mt-2 text-gray-600">{slug}</div>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">Categories</div>
                            <div className="flex gap-x-2">
                                {categories.map((category:any,idx:any) => (
                                    <div className="mt-2 text-gray-600" key={idx}>
                                        {category}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">Website</div>
                            <div className="mt-2 text-gray-600" > {website}</div>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">Headline</div>
                            <div className=" text-gray-600 mt-2">{headline}</div>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">Description</div>
                            <div className="text-gray-600 mt-2">{description}</div>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">Twitter</div>
                            <div className="text-gray-600 mt-2">{Twitter}</div>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">Discord</div>
                            <div className="mt-2 text-gray-600">{discord}</div>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">Release Date</div>
                            <div className="mt-2 text-gray-600">{date ? date.toDateString() : "not specified"}</div>
                        </div>
                        <div>
                            <div className="font-semibold text-lg">Product Images</div>
                            <div className="flex gap-x-2">
                                {uploadedProductImagesUrl.map((img:any,idx:any) => (
                                    <Image 
                                    key={idx}
                                    src={img}
                                    alt="prodcut images"
                                    className="rounded-md object-fit overflow-hidden"
                                    width={1000}
                                    height={1000} />
                                ))}
                            </div>
                        </div>
                    </div>
                    </div>
                )
            }
            {
                step === 7 && (
                    <div className="flex flex-col space-y-8">
                        <div className="text-4xl font-bold tracking-tight">Congratulations</div>
                        <p className="text-xl font-light">Your product has been successfully submitted.
                             Our team will review it and get back to you soon.</p>
                        <button onClick={HandleGoToMyProduct} className="bg-red-500 px-6 py-2 w-56 text-white rounded-md">Go to your products</button>
                        <Separator />
                        <div onClick={HandleSubmitAnotherProduct} className="text-red-500 ml-2 hover:underline cursor-pointer ">Submit another product</div>
                    </div>
                )
            }
            {
                step !== 7 && (
                    <div className="flex w-full justify-between items-center pb-12 mt-8">
                    { step !== 0 && (
                        <div onClick={handlePreviousStep} className="text-gray-500 cursor-pointer flex gap-x-4 ">
                            <ArrowLeft />
                            Previous
                            </div>
                    )}
                    {
                        step === 6 ? (
                            <button onClick={handleSubmit} className="bg-red-500 text-white rounded-md px-6 py-2 hover:opacity-75 cursor-pointer">Submit</button>
                        ) : (
                            <button onClick={nextStep} className="bg-red-500 text-white px-6 rounded-md py-2 hover:opacity-75 cursor-pointer">Next</button>
                        )
                    }
                </div>
                ) 
            }
            </div>
    )
}

export default NewProductPage