import { useTheme } from "next-themes";
import Image from "next/image";
import HTML from "../../public/assets/codeEditorIcons/symbol.png";
import CSS from "../../public/assets/codeEditorIcons/CSS3.png";
import JS from "../../public/assets/codeEditorIcons/Group.png";
import closeIconWhite from "../../public/assets/onboardingIcons/close_light.png";
import closeIconBlack from "../../public/assets/onboardingIcons/close_black.png";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import ErrorModal from "./errorModal_comp";
import { useSessionContext } from "@/composables/sessionContext";

function PeerSession({ onClose }) {
  const { setSessionData } = useSessionContext();
  const [activeLanguage, setActiveLanguage] = useState("");
  const [sessionName, setSessionName] = useState("");
  const route = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (error !== "") {
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  }, [error]);

  function createPeerSession() {
    if (!sessionName || !activeLanguage) {
      setError("Session name and Programming language are required");
    } else {
      route.push("/?view=peerId");
      setSessionData({ sessionName, activeLanguage });
    }
  }

  const handleErrorClose = () => {
    setError("");
  };

  const handleClose = () => {
    onClose();
  };

  const { theme, setTheme } = useTheme();

  return (
    <div className="w-[456px] dark:bg-[#2F2F3A] bg-white rounded-2xl">
      <div className="p-8 font-nohemi">
        <div className=" flex justify-between">
          <div className=" font-bold text-[27px] leading-[32.4px]">
            New Peer Session
          </div>
          <button onClick={handleClose}>
            <Image
              src={theme === "dark" ? closeIconWhite : closeIconBlack}
              className="w-5 h-5"
              alt="close_btn"
            />
          </button>
        </div>
        <div>
          <div className="text-base font-semibold mt-8 leading-5">
            Session Name
          </div>
          <input
            type="text"
            name="sessionName"
            id="sessionName"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            placeholder="Enter Session Name"
            className="py-3 mt-2 mb-4 px-4 h-12 w-full font-nohemi dark:bg-[#1E1E2A] bg-gray-200 font-normal text-sm rounded-lg"
          />
        </div>
        <div className="flex-col">
          <div className=" font-bold mb-4 text-3xl leading-8">
            Select Language
          </div>
          <div
            className="space-x-3 flex "
            onChange={(e) => setActiveLanguage(e.target.activeLanguage)}
          >
            <div
              onClick={() => setActiveLanguage("html")}
              className={` w-32 h-32 flex justify-center items-center flex-col  shadow-md rounded-md cursor-pointer ${
                activeLanguage === "html"
                  ? "bg-blue-500 text-white"
                  : "  bg-gray-200 dark:bg-[#3D3D48]"
              }`}
            >
              <Image src={HTML} className="w-8 h-9 mb-4" alt="html" />
              <div className="font-bold text-xl">HTML</div>
            </div>
            <div
              onClick={() => setActiveLanguage("css")}
              className={` w-32 h-32 flex justify-center items-center shadow-md flex-col rounded-md cursor-pointer ${
                activeLanguage === "css"
                  ? "bg-blue-500 text-white "
                  : " bg-gray-200 dark:bg-[#3D3D48]"
              }`}
            >
              <Image src={CSS} alt="language-icon" className="w-8 h-8 mb-4" />
              <p className="font-bold text-xl">CSS</p>
            </div>
            <div
              onClick={() => setActiveLanguage("js")}
              className={` w-32 h-32 flex justify-center shadow-md items-center flex-col rounded-md cursor-pointer ${
                activeLanguage === "js"
                  ? "bg-blue-500 text-white"
                  : " bg-gray-200 dark:bg-[#3D3D48]"
              }`}
            >
              <Image src={JS} alt="language-icon" className="w-8 h-9 mb-4" />
              <p className="font-bold text-xl">JS</p>
            </div>
          </div>
        </div>

        <button
          onClick={createPeerSession}
          className="w-full py-[24px] px-[29px] text-white mt-12 rounded-lg bg-[#5F5BD7] text-center font-medium text-lg"
        >
          Create Peer Session
        </button>
      </div>

      <ErrorModal
        errorMessage={error}
        style={"fixed  top-0 right-0 mr-2 "}
        onClose={() => handleErrorClose()}
      />
    </div>
  );
}

export { PeerSession };
