import { createUploadthing } from "uploadthing/next";


const f = createUploadthing()

export const ourFileRouter = {
    ProductLogo: f({ image: {maxFileCount: 1 , maxFileSize:"4MB"}})
    .middleware(({req}) => {
        return {...req}
    })
    .onUploadComplete (() => {
        console.log("Logo upload complete")
    }),
    ProductImages: f({image:{maxFileCount:5,maxFileSize:"16MB"}})
    .middleware(({req}) => {
        return {...req}
    })
    .onUploadComplete(() => {
        console.log("Prodcut Images uploaded successfully")
    })
}

export type OurFileRouter = typeof ourFileRouter