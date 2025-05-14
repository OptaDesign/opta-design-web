"use client"

import type React from "react"

import { useState } from "react"
import { Layers, Package, Briefcase, Sparkles } from "lucide-react"
import { ProductCard } from "@/components/product-card"

// Tipos para nuestros datos
type TabId = "individuales" | "packs" | "corporativo" | "especiales"

type TabInfo = {
  id: TabId
  label: string
  icon: React.ReactNode
  color: string
}

export function CatalogTabs() {
  const [activeTab, setActiveTab] = useState<TabId>("individuales")

  // Definición de las pestañas
  const tabs: TabInfo[] = [
    {
      id: "individuales",
      label: "Diseños Individuales",
      icon: <Layers className="h-5 w-5" />,
      color: "bg-pink-500",
    },
    {
      id: "packs",
      label: "Packs de Redes",
      icon: <Package className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      id: "corporativo",
      label: "Diseño Corporativo",
      icon: <Briefcase className="h-5 w-5" />,
      color: "bg-teal-500",
    },
    {
      id: "especiales",
      label: "Packs Especiales",
      icon: <Sparkles className="h-5 w-5" />,
      color: "bg-purple-500",
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Selector de pestañas para móvil */}
      <div className="md:hidden mb-6">
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value as TabId)}
          className="w-full p-3 border rounded-lg bg-white shadow-sm text-base font-medium focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          {tabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      {/* Pestañas para tablet/desktop */}
      <div className="hidden md:flex mb-6 bg-white rounded-lg shadow-sm overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center flex-1 py-4 px-4 transition-all ${
              activeTab === tab.id ? `text-white ${tab.color}` : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            <span className="font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Indicador de pestaña activa para móvil */}
      <div className="md:hidden mb-6 flex items-center">
        <div className={`w-2 h-8 rounded-r-full ${tabs.find((t) => t.id === activeTab)?.color}`}></div>
        <div className="flex items-center ml-3">
          {tabs.find((t) => t.id === activeTab)?.icon}
          <span className="ml-2 font-medium">{tabs.find((t) => t.id === activeTab)?.label}</span>
        </div>
      </div>

      {/* Contenido de las pestañas */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {/* DISEÑOS INDIVIDUALES */}
        {activeTab === "individuales" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductCard
              id="post-instagram"
              name="Post de Instagram"
              description="Diseño visual estático para tu feed"
              price={6500}
              image="/placeholder.svg?height=200&width=400&text=Post+Instagram"
              tag="INSTAGRAM"
              tagColor="bg-pink-500"
              gradientFrom="from-pink-50"
              gradientTo="to-purple-50"
              iconColor="text-pink-500"
              buttonColor="bg-pink-600 hover:bg-pink-700"
              features={[
                "Personalizado con tu identidad de marca",
                "Estética cuidada para captar la atención",
                "Resolución y formato ideal para Instagram",
              ]}
              icon={<Layers className="mr-2 h-5 w-5 text-pink-500" />}
            />

            <ProductCard
              id="post-facebook"
              name="Post de Facebook"
              description="Diseño optimizado para publicaciones"
              price={6500}
              image="/placeholder.svg?height=200&width=400&text=Post+Facebook"
              tag="FACEBOOK"
              tagColor="bg-blue-500"
              gradientFrom="from-blue-50"
              gradientTo="to-indigo-50"
              iconColor="text-blue-500"
              buttonColor="bg-blue-600 hover:bg-blue-700"
              features={[
                "Diseño alineado con tu marca",
                "Enfoque en claridad y legibilidad",
                "Perfecto para comunicar promociones o novedades",
              ]}
              icon={<Layers className="mr-2 h-5 w-5 text-blue-500" />}
            />

            <ProductCard
              id="historia-ig-fb"
              name="Historia de Instagram/Facebook"
              description="Diseño visual vertical para stories"
              price={6500}
              image="/placeholder.svg?height=200&width=400&text=Historia+IG/FB"
              tag="HISTORIA"
              tagColor="bg-purple-500"
              gradientFrom="from-purple-50"
              gradientTo="to-indigo-50"
              iconColor="text-purple-500"
              buttonColor="bg-purple-600 hover:bg-purple-700"
              features={[
                "Impacto rápido y visual",
                "Ideal para llamados a la acción",
                "Estética adaptada al formato historia",
              ]}
              icon={<Layers className="mr-2 h-5 w-5 text-purple-500" />}
            />

            <ProductCard
              id="reel-instagram"
              name="Reel de Instagram"
              description="Diseño dinámico con enfoque visual"
              price={20000}
              image="/placeholder.svg?height=200&width=400&text=Reel+Instagram"
              tag="REEL"
              tagColor="bg-gradient-to-r from-pink-500 to-orange-500"
              gradientFrom="from-orange-50"
              gradientTo="to-pink-50"
              iconColor="text-pink-500"
              buttonColor="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
              features={[
                "Movimiento, ritmo y narrativa",
                "Pensado para generar más vistas e interacción",
                "Formato vertical optimizado para reels",
              ]}
              icon={<Layers className="mr-2 h-5 w-5 text-pink-500" />}
            />
          </div>
        )}

        {/* PACKS DE REDES SOCIALES */}
        {activeTab === "packs" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductCard
              id="pack-5-posts"
              name="5 imágenes para Instagram/Facebook"
              description="Pack de posts estáticos para redes sociales"
              price={20000}
              image="/placeholder.svg?height=200&width=400&text=5+Posts"
              tag="PACK"
              tagColor="bg-teal-500"
              gradientFrom="from-teal-50"
              gradientTo="to-green-50"
              iconColor="text-teal-500"
              buttonColor="bg-teal-600 hover:bg-teal-700"
              features={[
                "5 diseños visualmente coherentes",
                "Adaptados 100% a tu marca",
                "Ideal para planificar tu contenido semanal",
              ]}
              icon={<Package className="mr-2 h-5 w-5 text-teal-500" />}
            />

            <ProductCard
              id="pack-10-posts"
              name="10 imágenes para Instagram/Facebook"
              description="Pack completo de contenido visual"
              price={35000}
              image="/placeholder.svg?height=200&width=400&text=10+Posts"
              tag="PACK"
              tagColor="bg-emerald-500"
              gradientFrom="from-emerald-50"
              gradientTo="to-teal-50"
              iconColor="text-emerald-500"
              buttonColor="bg-emerald-600 hover:bg-emerald-700"
              features={[
                "10 diseños estáticos profesionales",
                "Uniformidad estética en todo el feed",
                "Perfecto para potenciar tu presencia online",
              ]}
              icon={<Package className="mr-2 h-5 w-5 text-emerald-500" />}
            />

            <ProductCard
              id="pack-5-historias"
              name="5 diseños para historias Instagram/Facebook"
              description="Pack de historias en formato vertical"
              price={20000}
              image="/placeholder.svg?height=200&width=400&text=5+Historias"
              tag="PACK"
              tagColor="bg-amber-500"
              gradientFrom="from-amber-50"
              gradientTo="to-yellow-50"
              iconColor="text-amber-500"
              buttonColor="bg-amber-600 hover:bg-amber-700"
              features={[
                "5 creatividades dinámicas y atractivas",
                "Pensadas para promociones y CTA",
                "Diseño alineado a tu identidad visual",
              ]}
              icon={<Package className="mr-2 h-5 w-5 text-amber-500" />}
            />

            <ProductCard
              id="pack-10-historias"
              name="10 Diseños para historias Instagram/Facebook"
              description="Más historias, más impacto visual"
              price={35000}
              image="/placeholder.svg?height=200&width=400&text=10+Historias"
              tag="PACK"
              tagColor="bg-rose-500"
              gradientFrom="from-rose-50"
              gradientTo="to-red-50"
              iconColor="text-rose-500"
              buttonColor="bg-rose-600 hover:bg-rose-700"
              features={[
                "10 piezas para historias verticales",
                "Alto nivel de creatividad y estilo",
                "Enfocadas en captar la atención en segundos",
              ]}
              icon={<Package className="mr-2 h-5 w-5 text-rose-500" />}
            />

            <ProductCard
              id="carrusel-individual"
              name="Carrusel para Instagram x1"
              description="Post secuencial de hasta 5 slides"
              price={15000}
              image="/placeholder.svg?height=200&width=400&text=Carrusel"
              tag="CARRUSEL"
              tagColor="bg-indigo-500"
              gradientFrom="from-indigo-50"
              gradientTo="to-blue-50"
              iconColor="text-indigo-500"
              buttonColor="bg-indigo-600 hover:bg-indigo-700"
              features={[
                "Contenido dinámico y claro",
                "Diseño fluido entre cada diapositiva",
                "Ideal para educar, contar historias o presentar productos",
              ]}
              icon={<Package className="mr-2 h-5 w-5 text-indigo-500" />}
            />

            <ProductCard
              id="pack-4-carruseles"
              name="Carrusel para Instagram x4 (Pack)"
              description="Pack de 4 carruseles para tu estrategia"
              price={40000}
              image="/placeholder.svg?height=200&width=400&text=4+Carruseles"
              tag="PACK"
              tagColor="bg-violet-500"
              gradientFrom="from-violet-50"
              gradientTo="to-purple-50"
              iconColor="text-violet-500"
              buttonColor="bg-violet-600 hover:bg-violet-700"
              features={[
                "4 publicaciones con hasta 5 slides cada una",
                "Consistencia visual en todo el contenido",
                "Potencia el engagement y storytelling de tu marca",
              ]}
              icon={<Package className="mr-2 h-5 w-5 text-violet-500" />}
            />
          </div>
        )}

        {/* DISEÑO CORPORATIVO */}
        {activeTab === "corporativo" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard
              id="tarjetas-personales"
              name="Tarjetas personales"
              description="Diseño profesional para causar una excelente primera impresión"
              price={10000}
              image="/placeholder.svg?height=200&width=400&text=Tarjetas+Personales"
              tag="CORPORATIVO"
              tagColor="bg-teal-500"
              gradientFrom="from-teal-50"
              gradientTo="to-green-50"
              iconColor="text-teal-500"
              buttonColor="bg-teal-600 hover:bg-teal-700"
              features={[
                "Estilo alineado a tu identidad visual",
                "Preparadas para impresión de alta calidad",
                "Formato estándar (frente o frente/dorso opcional)",
              ]}
              icon={<Briefcase className="mr-2 h-5 w-5 text-teal-500" />}
            />

            <ProductCard
              id="folleto-frente"
              name="Folleto Frente"
              description="Diseño publicitario de una sola cara"
              price={15000}
              image="/placeholder.svg?height=200&width=400&text=Folleto+Frente"
              tag="CORPORATIVO"
              tagColor="bg-amber-500"
              gradientFrom="from-amber-50"
              gradientTo="to-yellow-50"
              iconColor="text-amber-500"
              buttonColor="bg-amber-600 hover:bg-amber-700"
              features={[
                "Visual atractivo que comunica con impacto",
                "Ideal para promociones o presentación de servicios",
                "Formato vertical optimizado para impresión",
              ]}
              icon={<Briefcase className="mr-2 h-5 w-5 text-amber-500" />}
            />

            <ProductCard
              id="folleto-frente-dorso"
              name="Folleto Frente y Dorso"
              description="Diseño completo de doble cara para mayor información"
              price={25000}
              image="/placeholder.svg?height=200&width=400&text=Folleto+Frente/Dorso"
              tag="CORPORATIVO"
              tagColor="bg-rose-500"
              gradientFrom="from-rose-50"
              gradientTo="to-red-50"
              iconColor="text-rose-500"
              buttonColor="bg-rose-600 hover:bg-rose-700"
              features={[
                "Más espacio para contenido visual y texto",
                "Diseño armónico en ambas caras",
                "Listo para impresión profesional",
              ]}
              icon={<Briefcase className="mr-2 h-5 w-5 text-rose-500" />}
            />
          </div>
        )}

        {/* PACKS ESPECIALES */}
        {activeTab === "especiales" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductCard
              id="pack-lanzamiento"
              name='Pack "Lanzamiento Express"'
              description="Ideal para mostrar tu marca desde el primer día"
              price={25000}
              image="/placeholder.svg?height=200&width=400&text=Lanzamiento+Express"
              tag="ESPECIAL"
              tagColor="bg-gradient-to-r from-pink-500 to-orange-500"
              gradientFrom="from-orange-50"
              gradientTo="to-pink-50"
              iconColor="text-pink-500"
              buttonColor="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600"
              features={[
                "2 posts llamativos para tu feed",
                "2 historias verticales con impacto visual",
                "1 carrusel con hasta 5 slides para contar más",
              ]}
              icon={<Sparkles className="mr-2 h-5 w-5 text-pink-500" />}
            />

            <ProductCard
              id="pack-crecimiento"
              name='Pack "Crecimiento"'
              description="Pensado para marcas que buscan visibilidad constante"
              price={65000}
              image="/placeholder.svg?height=200&width=400&text=Crecimiento"
              tag="ESPECIAL"
              tagColor="bg-gradient-to-r from-blue-500 to-indigo-500"
              gradientFrom="from-blue-50"
              gradientTo="to-indigo-50"
              iconColor="text-blue-500"
              buttonColor="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600"
              features={[
                "6 posts estáticos con diseño personalizado",
                "6 historias que refuerzan tu comunicación",
                "2 carruseles para mayor engagement",
              ]}
              icon={<Sparkles className="mr-2 h-5 w-5 text-blue-500" />}
            />

            <ProductCard
              id="pack-identidad"
              name='Pack "Identidad Visual"'
              description="Tu marca desde cero, con presencia y estilo propio"
              price={75000}
              image="/placeholder.svg?height=200&width=400&text=Identidad+Visual"
              tag="ESPECIAL"
              tagColor="bg-gradient-to-r from-purple-500 to-violet-500"
              gradientFrom="from-purple-50"
              gradientTo="to-violet-50"
              iconColor="text-purple-500"
              buttonColor="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600"
              features={[
                "Diseño de logo profesional",
                "10 posts alineados a tu nueva imagen",
                "5 historias para promocionar y conectar",
              ]}
              icon={<Sparkles className="mr-2 h-5 w-5 text-purple-500" />}
            />

            <ProductCard
              id="pack-mensual"
              name='Pack "Contenido Mensual"'
              description="Solución integral para todo tu mes de contenido"
              price={110000}
              image="/placeholder.svg?height=200&width=400&text=Contenido+Mensual"
              tag="ESPECIAL"
              tagColor="bg-gradient-to-r from-emerald-500 to-teal-500"
              gradientFrom="from-emerald-50"
              gradientTo="to-teal-50"
              iconColor="text-emerald-500"
              buttonColor="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
              features={[
                "15 posts estáticos estratégicos",
                "10 historias adaptadas a promociones y mensajes clave",
                "4 carruseles que impulsan el alcance y el valor de tu marca",
              ]}
              icon={<Sparkles className="mr-2 h-5 w-5 text-emerald-500" />}
            />
          </div>
        )}
      </div>
    </div>
  )
}
