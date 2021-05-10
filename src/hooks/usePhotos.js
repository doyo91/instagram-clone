import { useState, useEffect, useContext } from "react"

import UserContext from "../context/user"
import { getUserByUserId, getPhotos } from "../services/firebase"

export default function usePhotos() {
  const [photos, setPhotos] = useState(null)

  const {
    user: { uid: userId = "" },
  } = useContext(UserContext)

  useEffect(() => {
    async function getTimeLinePhotos() {
      const [{ following }] = await getUserByUserId(userId)

      //does the user actually follow people?
      if (following?.length > 0) {
        const followedUserPhotos = await getPhotos(userId, following)
        //   News photos in the top
        followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated)
        setPhotos(followedUserPhotos)
      }
    }

    getTimeLinePhotos()
  }, [userId])

  return { photos }
}
