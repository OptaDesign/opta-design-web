import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Instagram, Mail, Send } from "lucide-react"
import { CartSection } from "@/components/cart-section"
import { CatalogTabs } from "@/components/catalog-tabs"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center pl-4">
            <Link href="/" className="flex items-center">
              <img src="/logo.png" alt="Opta Design" className="h-10 w-auto" />
            </Link>
          </div>
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6 hidden md:flex">
            <Link href="#inicio" className="text-sm font-medium transition-colors hover:text-primary">
              Inicio
            </Link>
            <Link href="#nosotros" className="text-sm font-medium transition-colors hover:text-primary">
              Nosotros
            </Link>
            <Link href="#catalogo" className="text-sm font-medium transition-colors hover:text-primary">
              Catálogo
            </Link>
            <Link href="#contacto" className="text-sm font-medium transition-colors hover:text-primary">
              Contacto
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4 pr-4">
            <CartSection />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section id="inicio" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-r from-rose-100 to-teal-100">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center justify-items-center">
              <div className="space-y-4 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
                <div className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-teal-500/20 text-pink-700 font-medium text-sm mb-2">
                  Agencia de Diseño Digital
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-teal-600">
                  Descubrí nuestro catálogo de servicios visuales.
                </h1>
                <p className="max-w-[600px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto lg:mx-0">
                  Hola, somos Opta: diseñamos contenido visual a medida para marcas que quieren destacar, conectar y
                  crecer.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                  <Button
                    className="bg-gradient-to-r from-pink-600 to-teal-600 hover:from-pink-700 hover:to-teal-700"
                    asChild
                  >
                    <Link href="#catalogo">
                      Ver Catálogo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="#contacto">Solicitar Presupuesto</Link>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <img src="/logo.png" alt="Opta Design" className="h-auto w-full max-w-[400px]" />
              </div>
            </div>
          </div>
        </section>

        <section id="nosotros" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Sobre Nosotros</h2>
                <div className="max-w-[900px] space-y-4 text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  <p>
                    En Opta creemos que el diseño no solo debe verse bien, sino también comunicar, conectar y convertir.
                    Somos una agencia creativa especializada en contenido visual a medida, pensado para marcas que
                    quieren diferenciarse y crecer con una comunicación clara, atractiva y profesional.
                  </p>
                  <p>
                    Nuestro enfoque está en facilitarte el proceso: te entregamos contenido estratégico y listo para
                    publicar, para que puedas manejar tus redes con autonomía, sin depender de un community manager.
                  </p>
                  <p>
                    Diseñamos con propósito, entendiendo tu esencia y transformándola en piezas que potencien tu marca y
                    conecten con tu audiencia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="catalogo" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Nuestro Catálogo</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Descubre nuestra amplia gama de servicios de diseño para potenciar tu marca.
                </p>
              </div>
            </div>

            <CatalogTabs />
          </div>
        </section>

        <section id="contacto" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Contacto para Presupuesto Personalizado
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Completa el formulario y nos pondremos en contacto contigo a la brevedad.
                </p>
              </div>
            </div>
            <div className="mx-auto w-full max-w-md space-y-4 mt-8 text-center">
              <Button className="w-full" asChild>
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfxAwVfos43LYslTZ4ZItvq5p6zneBl1VuQtCVcoNywmRAdJA/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send className="mr-2 h-4 w-4" /> Ir al formulario
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 text-center max-w-6xl mx-auto">
          <p className="text-center text-sm leading-loose text-gray-500">
            © 2025 Opta Design. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 justify-center">
            <Link
              href="https://www.instagram.com/optadesign_/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-pink-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="https://wa.link/mdiutu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-green-600 transition-colors"
              aria-label="WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                <path d="M13 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                <path d="M9 14a5 5 0 0 0 6 0" />
              </svg>
            </Link>
            <Link
              href="mailto:optadesign.team@gmail.com"
              className="text-gray-500 hover:text-blue-600 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Función para formatear precios
export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(price)
}
