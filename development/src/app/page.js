"use client";
import Welcome from "@/components/welcome_comp";
import EditorNavBar from "@/components/navbar_components/editorNavbar_comp";
import SideNavBarControl from "@/components/navbar_components/sidebar_components/sideBarNavControl";
import TabBarControls from "@/components/navbar_components/tabbar_components/tabBarControls_comp";
import { useSearchParams, useRouter } from "next/navigation";
import { Modal } from "@/components/modal";
import { OpenTabModal } from "@/components/openTabModal_comp";
import { useTabContext } from "@/composables/tabContext";
import Collab from "@/components/collab_comp";
import { useEffect } from "react";
import ErrorModal from "@/components/errorModal_comp";
import UserLoginComp from "@/components/userLogin_comp";
import SignUpComponent from "@/components/signup_comp";
import SessionComp from "@/components/session_comp";
import { ForgotPassword } from "@/components/ForgotPassword";
import VerificationOverlay from "@/components/VerificationOverlay";
import VerificationSuccessful from "@/components/VerificationSuccessful_comp";

function Home() {
  const { items, setItems, errorMessage, setErrorMessage } = useTabContext();
  const view = useSearchParams().get("view");
  const router = useRouter();

  const handleTabActive = (tab) => {
    const index = items.findIndex((i, k) => k === tab);
    const newItems = items.map((item, idx) => ({
      ...item,
      active: idx === index,
    }));
    setItems(newItems);
  };
  const handleTabClose = (tab) => {
    const index = items.findIndex((i, k) => k === tab);
    const newItems = items.map((item, idx) => ({
      ...item,
      active: setActive(idx, index),
    }));
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const setActive = (idx, index) => {
    if (idx === index) {
      return false;
    } else if (idx === index - 1) {
      return index + 1 <= items.length - 1 ? false : true;
    } else if (idx === index + 1) {
      return true;
    } else {
      return false;
    }
  };

  const handleTabRename = (tab, event) => {
    if (!event.target.classList.contains("tab-title")) return;

    const index = items.findIndex((i, k) => k === tab);
    const currentTabTitleEl = event.target;
    const currentTab = items[tab];
    const initialName = currentTab.title;
    const tabExt = currentTab.ext;

    const form = document.createElement("form");
    currentTabTitleEl.replaceChildren(form);
    const inputField = document.createElement("input");
    inputField.value = initialName;
    form.appendChild(inputField);
    const currentTabChild = currentTabTitleEl.firstChild;
    currentTabChild[0].focus();
    currentTabChild[0].select();

    currentTabChild.addEventListener("submit", tabRenameSubmitHandler, {
      once: true,
    });
    currentTabChild.addEventListener("focusout", tabRenameFocusHandler, {
      once: true,
    });

    function tabRenameSubmitHandler(e) {
      currentTabChild.removeEventListener("focusout", tabRenameFocusHandler);
      e.preventDefault();
      const newName = e.target[0].value;
      setTabName(newName, tabExt);
    }

    function tabRenameFocusHandler(e) {
      currentTabChild.removeEventListener("submit", tabRenameSubmitHandler);
      const currentName = e.target.value;
      setTabName(currentName, tabExt);
    }

    function setTabName(name, ext) {
      const newItems = items.map((item, idx) => ({
        ...item,
        title: idx === index ? name : item.title,
      }));
      setItems(newItems);
      const extEl = document.createElement("span");
      extEl.textContent = ext;
      extEl.classList.add(
        ext === ".js"
          ? "text-yellow-500"
          : ext === ".css"
          ? "text-blue-500"
          : ext === ".html"
          ? "text-orange-500"
          : ext === ".p2p"
          ? "text-[#5F5BD7]"
          : "untitled"
      );
      currentTabTitleEl.replaceChildren(name, extEl);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage("");
    }, 6000);
  }, [errorMessage]);

  return (
    <>
      <main className="h-full bg-[#F3F3F6] dark:bg-[#2F2F3A] relative">
        <ErrorModal
          errorMessage={errorMessage}
          style={"absolute z-50 top-3 right-0 mr-2 "}
          onClose={() => setErrorMessage("")}
        />
        <div className="relative h-full border-[#DCDCE5] border-b-[1px] dark:border-gray-700 ">
          <EditorNavBar />
        </div>
        <div className="relative flex w-full">
          <div>
            <SideNavBarControl
              handleTopNavClicks={(i) => {
                handleButtonClicks(i);
              }}
            />
          </div>
          <div className="ml-24 w-[80%]">
            <TabBarControls
              items={items}
              handleActiveTab={(i, event) => {
                event.stopPropagation();
                handleTabActive(i);
              }}
              handleCloseTab={(i, event) => {
                event.stopPropagation();
                handleTabClose(i);
              }}
              handleRenameTab={(i, event) => {
                event.stopPropagation();
                handleTabRename(i, event);
              }}
            />
          </div>
        </div>
        <div className="bg-white dark:bg-[#1E1E2A]  ml-24 w-[92.9%] h-screen flex flex-col justify-start">
          <>
            {view == "quicklinks" ? (
              <Modal
                onClose={() => {
                  router.push("/");
                }}
              >
                <OpenTabModal
                  onClose={() => {
                    router.push("/");
                  }}
                />
              </Modal>
            ) : view == "login" ? (
              <Modal
                onClose={() => {
                  router.push("/");
                }}
              >
                <UserLoginComp
                  onClose={() => {
                    router.push("/");
                  }}
                />
              </Modal>
            ) : view == "signup" ? (
              <Modal
                onClose={() => {
                  router.push("/");
                }}
              >
                <SignUpComponent
                  onClose={() => {
                    router.push("/");
                  }}
                />
              </Modal>
            ) : view == "recoveraccount" ? (
              <Modal
                onClose={() => {
                  router.push("/");
                }}
              >
                <ForgotPassword />
              </Modal>
            ) : view === "verificationOverlay" ? (
              <Modal
                onClose={() => {
                  router.push("/");
                }}
              >
                <VerificationOverlay
                  onClose={() => {
                    router.push("/");
                  }}
                />
              </Modal>
            ) : view === "verificationSuccessful" ? (
              <Modal
                onClose={() => {
                  router.push("/");
                }}
              >
                <VerificationSuccessful
                  onClose={() => {
                    router.push("/");
                  }}
                />
              </Modal>
            ) : (
              <div></div>
            )}

            {items.map((item) => {
              if (item?.active && item.title === "Welcome") {
                return (
                  <div className="p-11" key={item.id}>
                    <Welcome />
                  </div>
                );
              } else if (item.active && item.title == "collab") {
                return (
                  <div key={item.id}>
                    <SessionComp />
                  </div>
                );
              } else if (item.active && item.title != "Welcome") {
                return <Collab key={item.id} isCollabOn={item.isCollab} />;
              }
            })}
          </>
        </div>
      </main>
    </>
  );
}

export default Home;
