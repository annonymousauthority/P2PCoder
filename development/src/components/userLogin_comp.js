"use client";
import React, { useState } from "react";
import { OnboardingHeader } from "./onboardingHeader";
import Link from "next/link";
import Image from "next/image";
import googleIcon from "../../public/assets/onboardingIcons/google.png";
import github_lightMode from "../../public/assets/onboardingIcons/github_lightMode.png";
import github_darkMode from "../../public/assets/onboardingIcons/github_darkMode.png";
import { useTheme } from "next-themes";
import UserLogin from "@/composables/userLoginFunction";
import {
  emailValidator,
  passwordValidator,
} from "@/composables/emailPasswordValidator";

import { signInWithGithub } from "@/composables/authGithubSigninPopup";
import { PasswordToggle } from "./passwordToggleFunction";
import { signInWithGoogle } from "@/composables/authGoogleSigninPoppup";
import { ForgotPassword } from "./ForgotPassword";
import closeWhite from ".././../public/assets/forgotPasswordForm/close_white.png";
import closeBlack from ".././../public/assets/onboardingIcons/close_black.png";

function UserLoginComp() {
  const { theme, setTheme } = useTheme();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);


  const forgotPassword = () => {
    setForgotPasswordModal(true);
  };

  const emailChange = (e) => {
    setEmailAddress(e.target.value);
  };

  const passwordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const validEmail = emailValidator(emailAddress);
    const validPassword = passwordValidator(password);

    if (validEmail === true && validPassword === true) {
      try {
        const result = await UserLogin(emailAddress, password);
        if (result.loggedIn) {
          console.log("Logged in", result.message);
        } else {
          console.log("user does not exist", result.message);
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      if (validEmail !== true) {
        setEmailError(validEmail);
      } else {
        setEmailError("");
      }

      if (validPassword !== true) {
        setPasswordError(validPassword);
      } else {
        setPasswordError("");
      }
    }
  };

  return (
      <div>
        {!forgotPasswordModal ? (
          <form
            className="space-y-6 p-10 bg-white dark:bg-[#1E1E2A] dark:text-white w-auto min-w-[600px] font-nohemi rounded-[24px]"
            onSubmit={loginUser}
          >
            <div className="space-y-3">
              <div className="flex justify-between">
                <OnboardingHeader
                  h1={"Welcome back"}
                  p={"Enjoy extra features when you create an account with us."}
                />

                <Image
                  src={theme === "dark" ? closeWhite : closeBlack}
                  alt="closeBtn"
                  width={24}
                  height={24}
                  className="w-6 h-6 ml-8 mb-[20px]"
                />
              </div>

              <div className="flex flex-row justify-between gap-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    signInWithGoogle();
                  }}
                  className="flex flex-row flex-nowrap justify-center gap-2 bg-[#DCDCE5] dark:bg-[#363647] items-center p-3 rounded-md w-full shadow-md"
                >
                  <Image
                    src={googleIcon}
                    alt="google_icon"
                    className="w-6 h-auto"
                  />
                  <p className="text-[14px]">Create Account with Google</p>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    signInWithGithub();
                  }}
                  className="flex flex-row flex-nowrap justify-center gap-2 bg-[#DCDCE5] dark:bg-[#363647] items-center px-3 rounded-md w-full shadow-md"
                >
                  <Image
                    src={theme === "dark" ? github_darkMode : github_lightMode}
                    alt="google_icon"
                    className="w-6 h-auto"
                  />
                  <p className="text-[14px]">Create Account with Github</p>
                </button>
              </div>
            </div>

            <div className="flex items-center text-center">
              <div className="border-b-2 border-gray-200 w-full relative flex justify-center"></div>
              <p className="flex justify-center w-1/6">OR</p>
              <div className="border-b-2 border-gray-200 w-full relative flex justify-center"></div>
            </div>

            <div className="space-y-8">
              <div>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="dark:bg-[#363647] border-[1px] p-3 rounded-lg bg-gray-100 w-full"
                  placeholder="Enter Email Address"
                  onChange={emailChange}
                  value={emailAddress}
                />
                {emailError && (
                  <p className="text-sm text-red-500">{emailError}</p>
                )}
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <PasswordToggle
                  inputId="password"
                  placeholder="Enter password"
                  handleInputChange={passwordChange}
                  inputValue={password}
                />
                {passwordError && (
                  <p className="text-sm text-red-500">{passwordError}</p>
                )}
                <button
                  className="float-right font-bold text-[#5F5BD7]"
                  onClick={forgotPassword}
                >
                  Forgot password?
                </button>
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  className="bg-[#5F5BD7] text-white text-center font-bold block w-full p-3 rounded-md"
                >
                  Log in
                </button>

                <p className="text-center">
                  {"Don't have an account with us?"}
                  <Link
                    href="/?view=signup"
                    className="text-violet-800 mx-1.5 dark:text-white font-bold"
                  >
                    Create your account
                  </Link>
                </p>
              </div>
            </div>
          </form>
        ) : (
          <ForgotPassword />
        )}
      </div>
  );
}
export default UserLoginComp;
