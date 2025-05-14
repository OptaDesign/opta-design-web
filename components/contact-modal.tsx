"use client"

import { Button } from "@/components/ui/button"
import { CopyToClipboard } from "@/components/copy-to-clipboard"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Mail, MessageSquare } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  text: string
  contactMethod: "whatsapp" | "email"
  contactInfo: string
}

export function ContactModal({ isOpen, onClose, title, message, text, contactMethod, contactInfo }: ContactModalProps) {
  const handleManualContact = () => {
    if (contactMethod === "whatsapp") {
      window.open(`https://web.whatsapp.com/`, "_blank")
    } else {
      window.open(`https://mail.google.com/`, "_blank")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <div className="bg-gray-50 p-3 rounded-md text-sm max-h-40 overflow-y-auto whitespace-pre-wrap">{text}</div>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">Enviar a:</span>
          {contactMethod === "whatsapp" ? (
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 text-green-500 mr-1" />
              <span>{contactInfo}</span>
            </div>
          ) : (
            <div className="flex items-center">
              <Mail className="h-4 w-4 text-blue-500 mr-1" />
              <span>{contactInfo}</span>
            </div>
          )}
        </div>
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <CopyToClipboard text={text} className="w-full sm:w-auto" />
          <Button onClick={handleManualContact} className="w-full sm:w-auto">
            {contactMethod === "whatsapp" ? "Abrir WhatsApp Web" : "Abrir Gmail"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
