import Header from "./components/Header"
import Login from "./components/Login"
import Signup from "./components/Signup"
import Welcome from "./components/Welcome"
import NotFound from "./components/NotFound"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"

function App() {

  return (
    <div className="w-screen h-screen relative overflow-hidden font-mono">
      <Header />
      <Routes >
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/user" element={<Welcome />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
