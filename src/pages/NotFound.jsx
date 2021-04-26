import { useEffect } from "react"

export default function NotFound() {
  useEffect(() => {
    document.title = "Página no encontrada • Instagram"
  }, [])

  return (
    <div className=" bg-gray-background">
      <div className="mx-auto max-w-screen-lg my-4 ">
        <h2 className="font-semibold text-xl text-center my-4">
          Esta página no está disponible.
        </h2>
        <p className="text-center my-4">
          Es posible que el enlace que has seguido sea incorrecto o que se haya
          eliminado la página. Volver a Instagram.
        </p>
      </div>
    </div>
  )
}
