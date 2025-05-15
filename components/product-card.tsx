"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/toast-provider"

export function ProductCard({
  id,
  name,
  description,
  price, // Mantenemos el parámetro para no romper la funcionalidad, pero no lo mostramos
  image,
  tag,
  tagColor,
  gradientFrom,
  gradientTo,
  iconColor,
  buttonColor,
  features,
  icon,
}: {
  id: string
  name: string
  description: string
  price: number
  image: string
  tag: string
  tagColor: string
  gradientFrom: string
  gradientTo: string
  iconColor: string
  buttonColor: string
  features: string[]
  icon?: React.ReactNode
}) {
  const { addItem } = useCart()
  const { showToast } = useToast()

  const handleAddToCart = () => {
    console.log("Adding to cart:", id, name, price)
    addItem({
      id,
      name,
      price,
    })
    showToast(`¡${name} agregado con éxito al carrito!`)
  }

  return (
    <Card className="overflow-hidden border-0 shadow-lg h-full flex flex-col">
      <div className="relative">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-48 object-cover" loading="lazy" />
        <div className={`absolute top-3 right-3 ${tagColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>
          {tag}
        </div>
      </div>
      <CardHeader className={`bg-gradient-to-r ${gradientFrom} ${gradientTo}`}>
        <CardTitle className="flex items-center text-xl flex-wrap mb-2">
          {icon} <span className="ml-2">{name}</span>
        </CardTitle>
        <CardDescription className="font-medium mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4 flex-grow">
        <div className="flex items-start">
          <div className="flex-1">
            <p className="text-sm">{description}</p>
            <ul className="mt-2 space-y-1 text-sm">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className={`mr-2 h-1.5 w-1.5 rounded-full ${tagColor.replace("bg-", "bg-")} mt-1.5`}></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <div className="mt-auto">
        <CardFooter
          className={`flex flex-col gap-3 items-start bg-gradient-to-r ${gradientFrom} ${gradientTo} border-t p-4`}
        >
          <Button className={`${buttonColor} w-full mt-2`} onClick={handleAddToCart}>
            Agregar al carrito
          </Button>
        </CardFooter>
      </div>
    </Card>
  )
}
