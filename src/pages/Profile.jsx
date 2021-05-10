import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { getUserByUsername } from "../services/firebase"
import * as ROUTES from "../constants/routes"
import { Header, UserProfile } from "../components"

export default function Profile() {
  const [user, setUser] = useState(null)
  const history = useHistory()
  const { username } = useParams()

  useEffect(() => {
    async function checkUserExists() {
      const [user] = await getUserByUsername(username)
      if (user?.userId) {
        setUser(user)
      } else {
        history.push(ROUTES.NOT_FOUND)
      }
    }

    checkUserExists()
  }, [username, history])

  return user?.username ? (
    <div className="bg-gray-background">
      <Header />
      <div className="mx-auto max-w-screen-lg">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null
}
