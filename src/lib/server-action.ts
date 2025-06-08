"use server"
import { Product } from "@prisma/client"
import { auth } from "../../auth"
import { prisma } from "./db"


export const createProduct = async(prodcut:any) => {
    try{
        const authenticated = await auth()

        if(!authenticated || !authenticated.user || !authenticated.user.id){
            throw new Error("You need to be logged in !!!")
        }

        const userId = authenticated.user.id


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
                        data: prodcut.images.map((img:string) => ({urls:img}))
                    }
                },
                categories: {
                    connectOrCreate: prodcut.categories.map((name:string) => ({
                        where: {name},
                        create: {name}
                    }))
                },
                user: {
                    connect : {id: userId}
                }
            }
        })

        return product

    }catch(err){
        console.log("ERROR::::",err)
        return null
    }
}


export const getProducts = async() => {
    
    const authenticated = await auth()

    if(!authenticated || !authenticated.user || !authenticated.user.id){
        throw new Error("You need to be authenticated before continuing")
    }

    const userId = authenticated.user.id

    const products = await prisma.product.findMany({
        where:{
            userId, 
        },
        orderBy:{
            createdAt: "desc"
        }
    })

    return products
} 