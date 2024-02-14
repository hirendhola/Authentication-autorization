/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { CiMenuFries } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil"
import {userState} from "../states/Atoms/IsLoggedin"
function Header() {
    const [ismenuOpen, setIsMenuOpen] = useState(false);
    const isLoggedIn = useRecoilValue(userState);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {   
          navigate("/user");
        }
      }, [isLoggedIn, navigate]);
      
    const onClick = () => {
        setIsMenuOpen(!ismenuOpen);
    };

    const handleSignupClick = () => {
        navigate("/signup");
    };

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleSignupClickSmall = () => {
        navigate("/signup");
        setIsMenuOpen(!ismenuOpen);
    };

    const handleLoginClicksSmall = () => {
        navigate("/login");
        setIsMenuOpen(!ismenuOpen);
    };

    return (
        <>
            <div className="w-screen h-20 bg-[#222831] text-[#EEEEEE] flex items-center justify-between shadow-xl">
                <h1 className="text-2xl font-semibold tracking-wider ml-[10vw] cursor-pointer" onClick={() => { navigate("/") }}><span className="font-bold text-3xl">A</span>uth</h1>

                {isLoggedIn ? null : (
                    <div>
                        {/* for small screen */}
                        <div className="md:hidden mr-[10vw] transition-all text-2xl">
                            {ismenuOpen ? (
                                <IoMdClose onClick={onClick} className="" />
                            ) : (
                                <CiMenuFries onClick={onClick} className="" />
                            )}
                        </div>

                        {/* for big screen */}
                        <div className="hidden md:flex mr-[10vw]">
                            <ul className="w-fit flex flex-row gap-10 text-lg">
                                <li className="cursor-pointer hover:text-[#00ADB5]  py-[.6rem] px-[.7rem] rounded-md ease-in-out transition-all hover:bg-[#ffffff17] " onClick={handleSignupClick}>SignUp</li>
                                <li className="cursor-pointer hover:text-[#00ADB5] py-[.6rem] px-[1rem] rounded-md ease-in-out transition-all hover:bg-[#ffffff17]" onClick={handleLoginClick}>Login</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>

            {ismenuOpen ? (
                <div className="transition transform ease-in-out z-10">
                    <ul className="w-screen flex flex-col gap-2 justify-center bg-[#222831] pl-[10vw] pt-2 pb-4 text-[#eeeeee] border-slate-900 text-xl">
                        <li className="cursor-pointer hover:text-[#00ADB5] transition-colors" onClick={handleSignupClickSmall}>SignUp</li>
                        <li className="cursor-pointer hover:text-[#00ADB5] transition-colors" onClick={handleLoginClicksSmall}>Login</li>
                    </ul>
                </div>
            ) : null}
        </>
    );
}

export default Header;
