import { useEffect } from "react"
import { Link } from "react-router-dom"
import { Header } from "../components"
import * as ROUTES from "../constants/routes"

export default function NotFound() {
  useEffect(() => {
    document.title = "Página no encontrada • Instagram"
  }, [])

  return (
    <div className=" bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg my-4 ">
        <h2 className="font-semibold text-xl text-center my-4">
          Esta página no está disponible.
        </h2>
        <p className="text-center my-4">
          Es posible que el enlace que has seguido sea incorrecto o que se haya
          eliminado la página.
          <Link className="text-blue-medium" to={ROUTES.DASHBOARD}>
            {" "}
            Volver a Instagram.
          </Link>
        </p>
      </div>
    </div>
  )
}
