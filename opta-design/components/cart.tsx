"use client"

import { useState, useRef, useEffect } from "react"
import { ShoppingCart, Trash2, Plus, Minus, X, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart, type CartItem } from "@/components/cart-provider"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/toast-provider"

// Número de WhatsApp predefinido
const WHATSAPP_NUMBER = "+5493885201556"
// Email predefinido
const DEFAULT_EMAIL = "optadesign.team@gmail.com"

export function Cart({ openCheckout = false }: { openCheckout?: boolean }) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart()
  const { showToast } = useToast()
  const [contactMethod, setContactMethod] = useState<"email" | "whatsapp">("whatsapp")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [step, setStep] = useState<"cart" | "checkout">(openCheckout ? "checkout" : "cart")
  const sheetTriggerRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  // Debug log para verificar el estado del carrito
  useEffect(() => {
    console.log("Cart items:", items)
    console.log("Total items:", totalItems)
    console.log("Total price:", totalPrice)
  }, [items, totalItems, totalPrice])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price)
  }

  const handleCheckout = () => {
    if (items.length === 0) return
    setStep("checkout")
  }

  const handleSendOrder = () => {
    if (!name) {
      showToast("Por favor ingresa tu nombre")
      return
    }

    let orderText = `Hola, mi nombre es ${name} y quisiera solicitar los siguientes servicios de diseño:\n\n`

    if (items.length > 0) {
      items.forEach((item) => {
        orderText += `- ${item.name} x${item.quantity} (${formatPrice(item.price * item.quantity)})\n`
      })
      orderText += `\nTotal: ${formatPrice(totalPrice)}\n\n`
    } else {
      orderText += "Me gustaría recibir información sobre sus servicios de diseño.\n\n"
    }

    if (message) {
      orderText += `Mensaje adicional: ${message}\n\n`
    }

    orderText += "Quedo a disposición para continuar con los siguientes pasos. Muchas gracias!"

    if (contactMethod === "whatsapp") {
      // Usar el número predefinido para WhatsApp
      const whatsappNumber = WHATSAPP_NUMBER
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`
      window.open(whatsappUrl, "_blank")
    } else {
      // Formato para Email - usar el email predefinido
      const emailSubject = "Solicitud de servicios - Opta Design"
      const mailtoUrl = `mailto:${DEFAULT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(orderText)}`
      window.location.href = mailtoUrl
    }

    clearCart()
    setStep("cart")
    setIsOpen(false)
    showToast("¡Tu solicitud ha sido enviada!")
  }

  const CartItemComponent = ({ item }: { item: CartItem }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b">
      <div className="flex-1 mb-2 sm:mb-0">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-sm text-gray-500">{formatPrice(item.price)} por unidad</p>
      </div>
      <div className="flex items-center gap-2 self-end sm:self-auto">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-6 text-center font-medium">{item.quantity}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => removeItem(item.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative flex items-center gap-2 px-4" ref={sheetTriggerRef}>
          <ShoppingCart className="h-5 w-5" />
          <span>Ver carrito</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-xs text-white">
              {totalItems}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md mx-auto">
        <SheetHeader>
          <SheetTitle>{step === "cart" ? "Tu Carrito" : "Enviar Pedido de Diseño"}</SheetTitle>
        </SheetHeader>

        {step === "cart" ? (
          <>
            <div className="mt-6 flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex h-40 flex-col items-center justify-center text-center">
                  <ShoppingCart className="h-10 w-10 text-gray-400" />
                  <p className="mt-2 text-gray-500">Tu carrito está vacío</p>
                  <SheetClose asChild>
                    <Button
                      variant="link"
                      className="mt-2"
                      onClick={() => {
                        setTimeout(() => {
                          document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })
                        }, 100)
                      }}
                    >
                      Explorar servicios
                    </Button>
                  </SheetClose>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <CartItemComponent key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            <SheetFooter className="mt-6">
              {items.length > 0 && (
                <div className="w-full space-y-4">
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={() => clearCart()}>
                      Vaciar carrito
                    </Button>
                    <Button className="flex-1" onClick={handleCheckout}>
                      Solicitar
                    </Button>
                  </div>
                </div>
              )}
            </SheetFooter>
          </>
        ) : (
          <div className="mt-6 space-y-6">
            {items.length > 0 && (
              <div>
                <h3 className="mb-2 font-medium">Resumen de tu solicitud</h3>
                <div className="rounded-md bg-gray-50 p-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between py-1 text-sm">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tu nombre</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ingresa tu nombre"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>¿Dónde te enviamos los próximos pasos?</Label>
                <RadioGroup
                  value={contactMethod}
                  onValueChange={(value) => setContactMethod(value as "email" | "whatsapp")}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="whatsapp" id="whatsapp" defaultChecked />
                    <Label htmlFor="whatsapp" className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                        <path d="M13 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                        <path d="M9 14a5 5 0 0 0 6 0" />
                      </svg>{" "}
                      WhatsApp
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="email" id="email" />
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-gray-400" /> Email
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="message">Mensaje adicional (opcional)</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Detalles adicionales sobre tu solicitud"
                  className="min-h-[100px]"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button variant="outline" className="flex-1" onClick={() => setStep("cart")}>
                <X className="mr-2 h-4 w-4" /> Volver
              </Button>
              <Button className="flex-1" onClick={handleSendOrder}>
                <Send className="mr-2 h-4 w-4" /> Enviar solicitud
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export function DirectCheckoutButton() {
  const sheetTriggerRef = useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(true)
  }

  return (
    <>
      <Button onClick={handleClick}>Solicitar Presupuesto</Button>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="hidden" />
        <SheetContent className="w-full sm:max-w-md mx-auto">
          <CartCheckout onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  )
}

function CartCheckout({ onClose }: { onClose: () => void }) {
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const { showToast } = useToast()
  const [contactMethod, setContactMethod] = useState<"email" | "whatsapp">("whatsapp")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price)
  }

  const handleSendOrder = () => {
    if (!name) {
      showToast("Por favor ingresa tu nombre")
      return
    }

    let orderText = `Hola, soy ${name} y me gustaría solicitar los siguientes servicios:\n\n`

    if (items.length > 0) {
      items.forEach((item) => {
        orderText += `- ${item.name} x${item.quantity} (${formatPrice(item.price * item.quantity)})\n`
      })
      orderText += `\nTotal: ${formatPrice(totalPrice)}\n\n`
    } else {
      orderText += "Me gustaría recibir información sobre sus servicios de diseño.\n\n"
    }

    if (message) {
      orderText += `Mensaje adicional: ${message}\n\n`
    }

    orderText += "Quedo a disposición para continuar con los siguientes pasos. Muchas gracias!"

    if (contactMethod === "whatsapp") {
      // Usar el número predefinido para WhatsApp
      const whatsappNumber = WHATSAPP_NUMBER
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(orderText)}`
      window.open(whatsappUrl, "_blank")
    } else {
      // Formato para Email - usar el email predefinido
      const emailSubject = "Solicitud de servicios - Opta Design"
      const mailtoUrl = `mailto:${DEFAULT_EMAIL}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(orderText)}`
      window.location.href = mailtoUrl
    }

    clearCart()
    showToast("¡Tu solicitud ha sido enviada!")
    onClose()
  }

  return (
    <>
      <SheetHeader>
        <SheetTitle>Enviar Pedido de Diseño</SheetTitle>
      </SheetHeader>

      <div className="mt-6 space-y-6">
        {items.length > 0 && (
          <div>
            <h3 className="mb-2 font-medium">Resumen de tu solicitud</h3>
            <div className="rounded-md bg-gray-50 p-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between py-1 text-sm">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Tu nombre</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ingresa tu nombre"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>¿Dónde te enviamos los próximos pasos?</Label>
            <RadioGroup
              value={contactMethod}
              onValueChange={(value) => setContactMethod(value as "email" | "whatsapp")}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="whatsapp" id="whatsapp-direct" defaultChecked />
                <Label htmlFor="whatsapp-direct" className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                    <path d="M13 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                    <path d="M9 14a5 5 0 0 0 6 0" />
                  </svg>{" "}
                  WhatsApp
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email-direct" />
                <Label htmlFor="email-direct" className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-gray-400" /> Email
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="message-direct">Mensaje adicional (opcional)</Label>
            <Textarea
              id="message-direct"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Detalles adicionales sobre tu solicitud"
              className="min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            <X className="mr-2 h-4 w-4" /> Cancelar
          </Button>
          <Button className="flex-1" onClick={handleSendOrder}>
            <Send className="mr-2 h-4 w-4" /> Enviar solicitud
          </Button>
        </div>
      </div>
    </>
  )
}
