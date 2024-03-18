import { useRecoilValue } from "recoil"
import { userState } from "../states/Atoms/IsLoggedin"
import { useNavigate } from "react-router-dom"
function Home() {
  const isLoggedIn = useRecoilValue(userState)
  console.log(isLoggedIn)
  const navigate = useNavigate()
  return (
    <div>
      {isLoggedIn ? (
        navigate("/user")
      ) : (
        <div className="w-screen h-[80vh] grid place-content-center">
          <h1 className="text-3xl">Please Login/SignUp</h1>
        </div>
      )}
    </div>
  )
}

export default Home