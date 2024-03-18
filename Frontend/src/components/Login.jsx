/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil"
import { userState } from "../states/Atoms/IsLoggedin"  
function Login() {

const [isLoggedIn, setIsLoggedIn] = useRecoilState(userState)
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendPayload()
  };
  console.log(isLoggedIn)
  const sendPayload = async () => {
    try {
<<<<<<< HEAD
      const res = await axios.post("http://localhost:5001/login", formValue, {
=======
      const res = await axios.post("https://authentication-autorization.vercel.app/login", formValue, {
>>>>>>> parent of 7aa14ba (admin route)
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/user");
      setIsLoggedIn(true)
    } catch (error) {
      console.error("Login failde:", error.response);
      if (error.response && error.response.status === 401) {
        setError("Invalid password.");
      } else if (error.response && error.response.status === 404) {
        setError("Email not found.");
        console.log(error)
      } else {
        setError("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] w-full">
      <div className="">
        <form
          className="bg-[#393E46] p-3 rounded-xl w-[350px] shadow-custom py-7 px-6 "
          onSubmit={handleSubmit}
        >
          <h1 className="text-center font-mono text-3xl text-[#eeeeee] drop-shadow-2xl">
            Login
          </h1>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <div className="flex flex-col gap-4 text-lg">
            <div className="flex flex-col gap-1">
              <label className="text-white">Email:</label>
              <input
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formValue.email}
                onChange={handleChange}
                className="p-2 outline-none border-none rounded-sm"
                required
              ></input>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white">Password:</label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={formValue.password}
                onChange={handleChange}
                className="p-2 outline-none border-none rounded-sm"
                required
              ></input>
            </div>
            <button
              type="submit"
              className="bg-[#00ADB5] w-full text-center self-center text-xl font-semibold text-[#eeeeee] py-3 px-9 mt-5 mx-3 shadow-2xl rounded-lg hover:rounded-xl transition-all "
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;