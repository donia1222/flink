"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Trash2, Upload, X, RefreshCw, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GalleryImage {
  id: number
  src: string
  alt: string
  category?: string
  description?: string
}

export default function GalleryAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("all")
  const [isDeleting, setIsDeleting] = useState<number | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [uploadForm, setUploadForm] = useState({
    nombre: "",
    categoria: "all",
    descripcion: "",
  })

  const categories = [
    { id: "all", name: "Todas" },
    { id: "wohnung", name: "Wohnung" },
    { id: "buero", name: "Büro" },
    { id: "spezial", name: "Spezialreinigung" },
  ]

  // Cargar imágenes
  const fetchImages = async (category = "all") => {
    setIsLoading(true)
    try {
      const url =
        category === "all"
          ? "https://web.lweb.ch/flink/obtenerimagen.php"
          : `https://web.lweb.ch/flink/obtenerimagen.php?categoria=${category}`

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Error al cargar las imágenes")
      }

      const data = await response.json()
      setImages(data)
      setError(null)
    } catch (err) {
      setError("Error al cargar las imágenes. Por favor, inténtalo de nuevo.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchImages(activeTab)
  }, [activeTab])

  // Manejar cambio de archivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Crear URL para vista previa
      const fileUrl = URL.createObjectURL(file)
      setPreviewUrl(fileUrl)

      // Establecer nombre por defecto basado en el nombre del archivo
      const fileName = file.name.split(".")[0].replace(/[_-]/g, " ")
      setUploadForm((prev) => ({
        ...prev,
        nombre: fileName.charAt(0).toUpperCase() + fileName.slice(1),
      }))
    }
  }

  // Manejar cambios en el formulario
  const handleUploadFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUploadForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Subir imagen
  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      setError("Por favor, selecciona una imagen")
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("imagen", selectedFile)
      formData.append("nombre", uploadForm.nombre)
      formData.append("categoria", uploadForm.categoria)
      formData.append("descripcion", uploadForm.descripcion)

      const response = await fetch("https://web.lweb.ch/flink/anadirimagen.php", {
        method: "POST",
        body: formData,
      })

      // Intentar obtener el texto de la respuesta primero
      const responseText = await response.text()

      // Intentar parsear como JSON
      let result
      try {
        result = JSON.parse(responseText)
      } catch (parseError) {
        console.log("Respuesta no es JSON:", responseText)
        // Si no es JSON, verificar si contiene algún mensaje de éxito
        if (responseText.includes("correctamente") || response.ok) {
          // Considerarlo como éxito aunque no sea JSON válido
          result = { success: true }
        } else {
          throw new Error("Formato de respuesta no válido")
        }
      }

      if (result.success) {
        // Mostrar mensaje de éxito
        setUploadSuccess(true)
        setTimeout(() => setUploadSuccess(false), 3000)

        // Recargar imágenes
        fetchImages(activeTab)

        // Resetear formulario
        setSelectedFile(null)
        setPreviewUrl(null)
        setUploadForm({
          nombre: "",
          categoria: "all",
          descripcion: "",
        })
      } else {
        throw new Error(result.error || "Error al subir la imagen")
      }
    } catch (err: any) {
      console.error("Error completo:", err)
      setError(err.message || "Error al subir la imagen. Por favor, inténtalo de nuevo.")
    } finally {
      setIsUploading(false)
    }
  }

  // Eliminar imagen
  const handleDeleteImage = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta imagen?")) {
      return
    }

    setIsDeleting(id)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("_method", "DELETE")
      formData.append("id", id.toString())

      const response = await fetch("https://web.lweb.ch/flink/eliminarimagen.php", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Error al eliminar la imagen")
      }

      // Actualizar estado local
      setImages((prevImages) => prevImages.filter((img) => img.id !== id))
    } catch (err) {
      setError("Error al eliminar la imagen. Por favor, inténtalo de nuevo.")
      console.error(err)
    } finally {
      setIsDeleting(null)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Administración de Galería</h1>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="upload">Subir Imágenes</TabsTrigger>
          <TabsTrigger value="manage">Gestionar Imágenes</TabsTrigger>
        </TabsList>

        {/* Pestaña de Subida */}
        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Subir Nueva Imagen</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUploadSubmit} className="space-y-6">
                {/* Vista previa de imagen */}
                <div className="mb-6">
                  {previewUrl ? (
                    <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Vista previa"
                        fill
                        className="object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null)
                          setPreviewUrl(null)
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div
                      className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6 cursor-pointer hover:border-sky-500 transition-colors"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <Upload size={48} className="text-gray-400 mb-4" />
                      <p className="text-gray-500 text-center">
                        Haz clic para seleccionar una imagen o arrastra y suelta aquí
                      </p>
                      <p className="text-gray-400 text-sm mt-2">PNG, JPG, GIF hasta 5MB</p>
                    </div>
                  )}
                  <input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="nombre" className="text-sm font-medium">
                      Nombre
                    </label>
                    <input
                      id="nombre"
                      type="text"
                      name="nombre"
                      value={uploadForm.nombre}
                      onChange={handleUploadFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="categoria" className="text-sm font-medium">
                      Categoría
                    </label>
                    <select
                      id="categoria"
                      name="categoria"
                      value={uploadForm.categoria}
                      onChange={handleUploadFormChange}
                      className="w-full p-2 border border-gray-300 rounded-md"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="descripcion" className="text-sm font-medium">
                    Descripción
                  </label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={uploadForm.descripcion}
                    onChange={handleUploadFormChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>

        

                {uploadSuccess && (
                  <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 mr-2" />
                      <p>Imagen subida correctamente</p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600"
                  disabled={isUploading || !selectedFile}
                >
                  {isUploading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Subir Imagen
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pestaña de Gestión */}
        <TabsContent value="manage">
          <Card>
            <CardHeader>
              <CardTitle>Gestionar Imágenes</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filtros de categoría */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={activeTab === category.id ? "default" : "outline"}
                    onClick={() => setActiveTab(category.id)}
                    className={activeTab === category.id ? "bg-sky-500 hover:bg-sky-600" : ""}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* Estado de carga */}
              {isLoading && (
                <div className="flex justify-center items-center py-20">
                  <RefreshCw className="h-12 w-12 animate-spin text-sky-500" />
                </div>
              )}

              {/* Mensaje de error */}
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {/* Estado vacío */}
              {!isLoading && !error && images.length === 0 && (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">No hay imágenes disponibles en esta categoría.</p>
                </div>
              )}

              {/* Lista de imágenes */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((image) => (
                  <div key={image.id} className="relative bg-white rounded-lg shadow-md overflow-hidden group">
                    <div className="relative h-48">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium truncate">{image.alt}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {categories.find((c) => c.id === image.category)?.name || "General"}
                      </p>
                      {image.description && (
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{image.description}</p>
                      )}
                    </div>
                    <button
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteImage(image.id)}
                      disabled={isDeleting === image.id}
                    >
                      {isDeleting === image.id ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
