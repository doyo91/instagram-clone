import { useContext, useEffect, useState } from "react"
import FirebaseContext from "../context/firebase"

export default function useAtuhListener() {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("authUser"))
  )

  const { firebase } = useContext(FirebaseContext)

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      // we have a user... therefore we can store the user in localStorage
      if (authUser) {
        window.localStorage.setItem("authUser", JSON.stringify(authUser))
        setUser(authUser)
      } else {
        //   we don't have an authUser, therefore clear the localstorage
        window.localStorage.removeItem("authUser")
        setUser(null)
      }
    })

    return () => listener()
  }, [firebase])

  return { user }
}
