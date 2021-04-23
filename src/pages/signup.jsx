import { useState, useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import FirebaseContext from "../context/firebase"
import * as ROUTES from "../constants/routes"
import { doesUsernameExist } from "../services/firbease"

export default function Signup() {
  const history = useHistory()
  const { firebase } = useContext(FirebaseContext)

  const [username, setUsername] = useState("")
  const [fullname, setFullname] = useState("")
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    document.title = "Crear cuenta • Instagram"
  }, [])

  useEffect(() => {
    error &&
      setTimeout(() => {
        setError("")
      }, 3000)
  }, [error])

  const isInvalid =
    password === "" ||
    password.length < 6 ||
    emailAddress === "" ||
    username === "" ||
    fullname === ""

  const handleSignup = async (event) => {
    event.preventDefault()

    const usernameExists = await doesUsernameExist(username)
    if (!usernameExists.length) {
      try {
        const createUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password)
        // Authentication firebase
        await createUserResult.user.updateProfile({
          displayname: username,
        })

        // firebase user collection (create a document)
        await firebase.firestore().collection("users").add({
          userId: createUserResult.user.uid,
          username: username.toLowerCase(),
          fullname,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        })

        history.push(ROUTES.DASHBOARD)
      } catch (error) {
        setEmailAddress("")
        setFullname("")
        setUsername("")
        setPassword("")
        setError(error.message)
      }
    } else {
      setError("Este nombre de usuario no está disponible. Prueba otro.")
    }
  }

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="Phone with Instagram" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex justify-center w-full ">
            <img
              className="mt-2 w-6/12 mb-4"
              src="/images/logo.png"
              alt="Instagram logo"
            />
          </h1>

          <form onSubmit={handleSignup} method="POST">
            <h2 className="w-full text-gray-base font-semibold text-center p-2 mb-4">
              Regístrate para ver fotos y vídeos de tus amigos.
            </h2>
            <input
              type="email"
              aria-label="Introduce correo electrónico"
              placeholder="Correo electrónico"
              className="text-sm text-gray-base w-full border h-2 border-gray-primary rounded mr-3 py-5 px-4 mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              type="text"
              aria-label="Introduce nombre completo"
              placeholder="Nombre completo"
              className="text-sm text-gray-base w-full border h-2 border-gray-primary rounded mr-3 py-5 px-4 mb-2"
              onChange={({ target }) => setFullname(target.value)}
              value={fullname}
            />
            <input
              type="text"
              aria-label="Introduce nombre de usuario"
              placeholder="Nombre de usuario"
              className="text-sm text-gray-base w-full border h-2 border-gray-primary rounded mr-3 py-5 px-4 mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              type="password"
              aria-label="Introduce contraseña"
              placeholder="Contraseña"
              className="text-sm text-gray-base w-full border h-2 border-gray-primary rounded mr-3 py-5 px-4 mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />

            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 mt-2 font-bold
          ${isInvalid && " opacity-50"}`}
            >
              Iniciar Sesión
            </button>
            {error && (
              <p className="mt-4 mb-4 text-center text-xs text-red-primary">
                {error}
              </p>
            )}
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border border-gray-primary">
          <p className="text-sm">
            ¿Tienes una cuenta? {` `}
            <Link to={ROUTES.LOGIN} className=" text-blue-medium">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
