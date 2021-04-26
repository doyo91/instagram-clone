import { lazy, Suspense } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import * as ROUTES from "./constants/routes"
import useAtuhListener from "./hooks/useAuthListener"
import UserContext from "./context/user"

const Login = lazy(() => import("./pages/Login"))
const Signup = lazy(() => import("./pages/SignUp"))
const Dashboard = lazy(() => import("./pages/Dashboard"))
const NotFound = lazy(() => import("./pages/NotFound"))

export default function App() {
  const { user } = useAtuhListener()
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} exact />
            <Route path={ROUTES.SIGN_UP} component={Signup} exact />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} exact />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  )
}
