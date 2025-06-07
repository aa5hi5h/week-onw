import { ourFileRouter } from "@/app/api/uploadthing/core"
import { UploadDropzone } from "@/lib/uploadthing"
import { toast } from "sonner"


interface ImageUploaderProps{
    onChange: (urls: string[]) => void
    endpoint: keyof typeof ourFileRouter
}

export const ImageUploader = ({endpoint,onChange}:ImageUploaderProps) => {

    return (
        <UploadDropzone
        endpoint={endpoint} 
        onClientUploadComplete={(res:{url:string}[]) => {
            const urls = res.map((img) => img.url)
            onChange(urls)
        }}
        onUploadError={(err:Error) => {
            toast(err.message,{position:"top-center"})
        }} />
    )
}