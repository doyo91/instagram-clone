import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import * as ROUTES from "./constants/routes"
import useAuthListener from "./hooks/useAuthListener"
import UserContext from "./context/user"

import ProtectedRoute from "./helpers/protectedRoute"
import IsUserLoggedIn from "./helpers/isUserLoggedIn"


const Dashboard = lazy(() => import("src/pages/dashboard"))
const Login = lazy(() => import("src/pages/login"))
const Signup = lazy(() => import("src/pages/signUp"))
const Profile = lazy(() => import("src/pages/profile"))
const NotFound = lazy(() => import("src/pages/notFound"))


export default function App() {
  const { user } = useAuthListener()
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense
          fallback={
            <div className="w-100 h-100 flex justify-center items-center">
              <img
                src="/images/loading-logo.png"
                alt="Instagram logo"
                className="w-3"
              />
            </div>
          }
        >
          <Switch>
            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.LOGIN}
            >
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.SIGN_UP}
            >
              <Signup />
            </IsUserLoggedIn>
            <Route path={ROUTES.PROFILE} component={Profile} />
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}
