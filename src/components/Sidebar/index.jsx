import useUser from "../../hooks/useUser"
import User from "./User"
import Suggestions from "./Suggestions"

export default function Sidebar() {
  const {
    user: { fullName, username, userId },
  } = useUser()

  return (
    <aside className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} />
    </aside>
  )
}
