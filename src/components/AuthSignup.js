import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { MdEmail } from "react-icons/md";
import { GoKey } from "react-icons/go";
import { IoMdPerson } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import AuthMenu from "./AuthMenu";

const AuthSignup = () => {
  const appContext = useContext(AppContext);
  const {
    userNameInput,
    userEmail,
    userPassword,
    handleUserNameInput,
    handleUserEmail,
    handleUserPassword,
    signup,
    errorMessage,
  } = appContext;
  const [hidePassword, setHidePassword] = useState(true);
  const showHiddenPassword = hidePassword ? "" : "hidden";
  const showRevealedPassword = hidePassword ? "hidden" : "";
  function togglePassword() {
    setHidePassword(!hidePassword);
  }
  return (
    <div className="md:flex w-full rounded ">
      <div className="md:w-1/2 bg-white pt-20 pb-16 px-12 rounded-t-lg md:rounded-l-lg  md:rounded-r-none">
        <div className="font-inter_extrabold text-4xl text-blue-500 text-center mb-8">
          Signup
        </div>
        {/* USER NAME */}
        <div className="grid grid-cols-7 w-full mb-4">
          <div className="col-span-1 bg-blue-500 pt-1">
            <IoMdPerson className="text-white text-3xl mx-auto" />
          </div>
          <div className="col-span-6">
            <input
              className="w-full bg-blue-200 placeholder-blue-800 pl-3 py-2"
              name="userName"
              type="text"
              placeholder="User Name"
              value={userNameInput}
              onChange={handleUserNameInput}
            />
          </div>
        </div>
        {/* EMAIL */}
        <div className="grid grid-cols-7 w-full mb-4">
          <div className="col-span-1 bg-blue-500 pt-1">
            <MdEmail className="text-white text-3xl mx-auto" />
          </div>
          <div className="col-span-6">
            <input
              className="w-full bg-blue-200 placeholder-blue-800 pl-3 py-2"
              name="email"
              type="text"
              placeholder="Email"
              value={userEmail}
              onChange={handleUserEmail}
            />
          </div>
        </div>
        {/* HIDDEN PASSWORD */}
        <div className={showHiddenPassword + " grid grid-cols-7 w-full"}>
          <div className="col-span-1 bg-blue-500 pt-1">
            <GoKey className="text-white text-3xl mx-auto" />
          </div>
          <div className="col-span-5">
            <input
              className="w-full bg-blue-200 placeholder-blue-800 pl-3 py-2"
              name="password"
              type="password"
              placeholder="Password"
              value={userPassword}
              onChange={handleUserPassword}
            />
          </div>
          <div className="col-span-1 bg-blue-200 text-center pt-1">
            <button
              className="text-blue-500 text-3xl focus:outline-none"
              onClick={() => togglePassword()}
            >
              <FaRegEye />
            </button>
          </div>
        </div>
        {/* REVEALED PASSWORD */}
        <div className={showRevealedPassword + " grid grid-cols-7 w-full"}>
          <div className="col-span-1 bg-blue-500 pt-1">
            <GoKey className="text-white text-3xl mx-auto" />
          </div>
          <div className="col-span-5">
            <input
              className="w-full bg-blue-200 placeholder-blue-800 pl-3 py-2"
              name="password"
              type="text"
              placeholder="Password"
              value={userPassword}
              onChange={handleUserPassword}
            />
          </div>
          <div className="col-span-1 bg-blue-200 text-center pt-1">
            <button
              className="text-blue-500 text-3xl focus:outline-none"
              onClick={() => togglePassword()}
            >
              <FaRegEyeSlash />
            </button>
          </div>
        </div>
        {/* SUBMIT BUTTON */}
        <div className="flex justify-center w-full mt-12">
          <button
            className="font-inter_bold hover:bg-blue-500 text-blue-500 hover:text-white 
            text-center rounded py-2 px-10 border border-blue-500 focus:outline-none"
            onClick={() => signup()}
          >
            Signup
          </button>
        </div>
        <div className="w-full text-red-600 text-center mt-8">
          {errorMessage}
        </div>
      </div>
      <div className="md:w-1/2 bg-blue-500 py-24 rounded-b-lg md:rounded-r-lg  md:rounded-l-none">
        <AuthMenu loggedIn={false} />
      </div>
    </div>
  );
};

export default AuthSignup;
