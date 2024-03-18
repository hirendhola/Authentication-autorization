/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from 'recoil';
import { userState } from '../states/Atoms/IsLoggedin';
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function Welcome() {
  
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(userState)

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:5001/user", {
        withCredentials: true,
      });
      setUserData(res.data.user);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      if (error.response && (error.response.status === 401 || error.response.status === 404)) {
        try {
          await refreshToken();
          await fetchUserData(); // Retry fetching user data after token refresh
        } catch (refreshError) {
          console.error("Failed to refresh token:", refreshError);
          navigate("/login"); // Redirect to login page if refresh token has also expired
        }
      } else {
        navigate("/login");
      }
    }
  };

  const refreshToken = async () => {
    try {
      const res = await axios.get("http://localhost:5001/refresh", {
        withCredentials: true,
      });
      console.log(res)
    } catch (error) {
      setIsLoggedIn(false)
      console.error("Failed to refresh token:", error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5001/logout", null, {
        withCredentials: true,
        
      });
      setIsLoggedIn(false)
      navigate("/login");
    } catch (error) {
      setIsLoggedIn(false)
      navigate("/login");
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] w-full">
      <div className="">
        <div className="bg-[#393E46] p-3 rounded-xl w-[320px] shadow-custom py-7 px-6 ">
          <h1 className="text-center font-mono text-4xl text-[#eeeeee] drop-shadow-2xl flex flex-col items-center gap-4">
            User Profile
            {/* <div className="w-32 h-32">{svgCode && <div dangerouslySetInnerHTML={{ __html: svgCode }} />}</div> */}
            <img src="https://xsgames.co/randomusers/avatar.php?g=pixel" className="w-36 h-36 rounded-full"/>
          </h1>
          {userData ? (
            <div className="flex flex-col gap-4 text-xl text-[#eeeeee]">
              <br></br>
              <div>
                <strong>Name:</strong> {userData.name}
              </div>
              <div>
                <strong>Email:</strong> {userData.email}
              </div>
              <button
                onClick={handleLogout}
                className="bg-[#00ADB5] w-full text-center self-center text-xl font-semibold text-[#eeeeee] py-3 px-9 mt-5 mx-3 shadow-2xl rounded-lg hover:rounded-xl transition-all "
              >
                Logout
              </button>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Welcome;
