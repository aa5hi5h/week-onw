import { ourFileRouter } from "@/app/api/uploadthing/core"
import { UploadDropzone } from "@/lib/uploadthing"
import { toast } from "sonner"

interface LogoUploaderProps{
    onChange: (url: string) => void
    endpoint: keyof typeof ourFileRouter
}

export const LogoUploader = ({onChange,endpoint}:LogoUploaderProps) => {

    return ( 
        <UploadDropzone 
        onClientUploadComplete={(res) => {
            const uploadedfileUrl = res?.[0].url
            onChange(uploadedfileUrl)
        }} 
        endpoint={endpoint}
        onUploadError={(error:Error) => {
            toast(error.message,{position:"top-center"})
        }} />
    )
}