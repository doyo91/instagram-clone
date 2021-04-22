import { useState, useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import FirebaseContext from "../context/firebase"
import * as ROUTES from "../constants/routes"

export default function Login() {
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    document.title = "Login - Instagram"
  }, [])

  const isInvalid =
    password === "" || password.length < 6 || emailAddress === ""

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password)
      history.push(ROUTES.DASHBOARD)
    } catch (error) {
      setEmailAddress("")
      setPassword("")
      setError(error.message)
    }
  }

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="Phone with Instagram" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-cetner w-full">
            <img
              className="mt-2 w-6/12 mb-4"
              src="/images/logo.png"
              alt="Instagram logo"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              type="text"
              aria-label="Introduce correo electrónico"
              placeholder="Correo electrónico"
              className="text-sm text-gray-base w-full h-2 border-gray-primary rounded mr-3 py-5 px-4 mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              type="password"
              aria-label="Introduce contraseña"
              placeholder="Contraseña"
              className="text-sm text-gray-base w-full h-2 border-gray-primary rounded mr-3 py-5 px-4 mb-2"
              onChange={({ target }) => setPassword(target.value)}
            />

            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
          ${isInvalid && " opacity-50"}`}
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            ¿No tienes una cuenta? {` `}
            <Link to="/signup" className=" text-blue-medium">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
