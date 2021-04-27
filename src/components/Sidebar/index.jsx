import React from "react"

import useUser from "../../hooks/useUser"
import User from "./User"
import Suggestions from "./Suggestions"

export default function Sidebar() {
  const {
    user: { docId, fullname, username, userId, following },
  } = useUser()

  return (
    <aside className="p-4">
      <User username={username} fullName={fullname} />
      <Suggestions
        userId={userId}
        following={following}
        loggedInUserDocId={docId}
      />
    </aside>
  )
}

// Sidebar.whyDidYouRender = true
