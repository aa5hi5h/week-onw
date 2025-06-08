"use server"
import { Product } from "@prisma/client"
import { auth } from "../../auth"
import { prisma } from "./db"


export const createProduct = async(prodcut:any) => {
    try{
        const authenticated = await auth()

        if(!authenticated || !authenticated.user || !authenticated.user.id){
            console.log("code reaches here")
            throw new Error("You need to be logged in !!!")
        }


        console.log("code reaches part 2!!!!")


        const product = await prisma.product.create({
            data:{
                name:prodcut.name,
                slug: prodcut.slug,
                website: prodcut.website,
                discord: prodcut.discord,
                twitter: prodcut.twitter,
                logo: prodcut.logo,
                headline: prodcut.headline,
                description: prodcut.description,
                releaseDate: prodcut.releaseDate,
                images: {
                    createMany: {
                        data: prodcut.images.map((img:string) => ({url:img}))
                    }
                },
                categories: {
                    connectOrCreate: prodcut.images.map((name:string) => ({
                        where: {name},
                        create: {name}
                    }))
                },
                user: {
                    connect : {id: authenticated.user.id}
                }
            }
        })

        return product

    }catch(err){
        console.log("ERROR::::",err)
        return null
    }
}