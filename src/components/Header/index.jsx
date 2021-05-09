import { useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import FirebaseContext from "../../context/firebase"
import UserContext from "../../context/user"
import * as ROUTES from "../../constants/routes"
import { HomeIcon, CompassIcon, HeartIcon, PaperPlaneIcon } from "../Icons"

export default function Header() {
  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(UserContext)
  const history = useHistory()

  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8 px-4 w-full">
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-gray-7000 text-center flex items-center align-items cursor-pointer">
            <h1 className="flex justify-center w-full">
              <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                <img
                  src="/images/logo.png"
                  alt="Instagram logo"
                  className="mt-2 w-6/12"
                />
              </Link>
            </h1>
          </div>
          <div className="text-gray-700 text-center flex items-center align-items">
            {user ? (
              <>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <HomeIcon isActive={true} />
                </Link>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <PaperPlaneIcon isActive={false} />
                </Link>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <CompassIcon isActive={false} />
                </Link>
                <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
                  <HeartIcon isActive={false} />
                </Link>

                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      className="rounded-full h-8 w-8 flex"
                      src={`/images/avatars/${user.displayName}.jpg`}
                      alt={`${user.displayName} profile`}
                    />
                  </Link>
                </div>
                <button
                  type="button"
                  title="Cerrar sesión"
                  onClick={() => {
                    firebase.auth().signOut()
                    history.push(ROUTES.LOGIN)
                  }}
                  onKeyDown={(event) => {
                    if ((event.key = "Enter")) {
                      firebase.auth().signOut()
                      history.push(ROUTES.LOGIN)
                    }
                  }}
                >
                  <svg
                    className="w-8 ml-3 text-black-light cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    className="bg-blue-medium font-semibold text-sm rounded text-white w-30 mx-2 px-2 h-8"
                    type="button"
                  >
                    Iniciar sesión
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    className="font-semibold text-sm rounded text-blue-medium w-30 px-2 h-8"
                    type="button"
                  >
                    Registrarte
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
