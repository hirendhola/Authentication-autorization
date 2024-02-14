// import { useState } from "react"
// import axios from "axios"
// import { useNavigate } from "react-router-dom";

// function Signup() {
//   const navigate = useNavigate()
//   const [formValue, setFormValue] = useState({
//     name: "",
//     email: "",
//     password: "",
//   })
//   const handleChange = (e) => {
//     setFormValue(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await sendPayload();
//     navigate("/login");
//   }
  
//   const sendPayload = async () => {
//     const res = await axios.post("http://localhost:5001/signup", formValue,  {
//       headers: {
//         'Content-Type': 'application/json', 
//       },
//     })
//     const data = await res.data
//     return data
//   }

//   return (
//     <div className=" flex justify-center items-center h-[80vh] w-full">
//       <div className="">
//         <form className="bg-[#393E46] p-3 rounded-xl w-[350px] shadow-custom py-7 px-6 " onSubmit={handleSubmit}>
//         <h1 className="text-center font-mono text-3xl text-[#eeeeee] drop-shadow-2xl ">Sign UP </h1>
//           <div className="flex flex-col gap-4 text-lg">
//             <div className="flex flex-col gap-1">
//               <label className="text-white">Name:</label>
//               <input type="text" placeholder="Full Name" name="name" value={formValue.name}
//                 onChange={handleChange}
//                 className="p-2 outline-none border-none rounded-sm" required></input>
//             </div>
//             <div className="flex flex-col gap-1">
//               <label className="text-white">Email:</label>
//               <input type="email" placeholder="Enter Email" name="email" value={formValue.email}
//                 onChange={handleChange}
//                 className="p-2 outline-none border-none rounded-sm" required></input>
//             </div>
//             <div className="flex flex-col gap-1">
//               <label className="text-white">Password:</label>
//               <input type="password" placeholder="Enter Password " name="password" value={formValue.password}
//                 onChange={handleChange}
//                 className="p-2 outline-none border-none rounded-sm" required></input>
//             </div>
//             <button
//               type="submit"
//               className="bg-[#00ADB5] w-full text-center  self-center  text-xl font-semibold text-[#eeeeee] py-3 px-9 mt-5 mx-3 shadow-2xl rounded-lg hover:rounded-xl transition-all "
//             >Sign Up</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Signup

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    name: "",
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
    try {
      await sendPayload();
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response);
      if (error.response && error.response.status === 409) {
        setError("User already exists.");
      } else {
        setError("Signup failed. Please try again later.");
      }
    }
  };

  const sendPayload = async () => {
    const res = await axios.post("http://localhost:5001/signup", formValue, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.data;
    return data;
  };

  return (
    <div className="flex justify-center items-center h-[80vh] w-full">
      <div className="">
        <form
          className="bg-[#393E46] p-3 rounded-xl w-[350px] shadow-custom py-7 px-6 "
          onSubmit={handleSubmit}
        >
          <h1 className="text-center font-mono text-3xl text-[#eeeeee] drop-shadow-2xl">
            Sign UP
          </h1>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <div className="flex flex-col gap-4 text-lg">
            <div className="flex flex-col gap-1">
              <label className="text-white">Name:</label>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formValue.name}
                onChange={handleChange}
                className="p-2 outline-none border-none rounded-sm"
                required
              ></input>
            </div>
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
                placeholder="Enter Password "
                name="password"
                value={formValue.password}
                onChange={handleChange}
                className="p-2 outline-none border-none rounded-sm"
                required
              ></input>
            </div>
            <button
              type="submit"
              className="bg-[#00ADB5] w-full text-center  self-center  text-xl font-semibold text-[#eeeeee] py-3 px-9 mt-5 mx-3 shadow-2xl rounded-lg hover:rounded-xl transition-all "
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
