"use client";

import Welcome from "@/components/welcome_comp";
import EditorNavBar from "@/components/navbar_components/editorNavbar_comp";
import SideNavBarControl from "@/components/navbar_components/sidebar_components/sideBarNavControl";
import TabBarControls from "@/components/navbar_components/tabbar_components/tabBarControls_comp";
import { useEffect, useState } from "react";
import SignUpComponent from "@/components/signup_comp";
import { useSearchParams, useRouter } from "next/navigation";
import { Modal } from "@/components/modal";
import { LanguageModal } from "@/components/languageModal_comp";

const barItems = [{ id: 1, title: "Welcome", active: true }];

function Home() {
  const [items, setItems] = useState([]);
  const view = useSearchParams().get("view");
  const router = useRouter();

  useEffect(() => {
    if (items.length == 0) {
      setItems(barItems);
    } else {
      window.localStorage.setItem("barItems", JSON.stringify(items));
    }
  }, [items]);
  useEffect(() => {
    const storedItems = window.localStorage.getItem("barItems");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      setItems(barItems);
    }
  }, []);

  const handleButtonClicks = (i) => {
    if (i == 0 && items.length < 5) {
      const oldItems = items.map((item) => ({
        ...item,
        active: false,
      }));
      const newItems = [
        ...oldItems,
        {
          id: items.length + 1,
          title: "untitled",
          active: true,
        },
      ];
      setItems(newItems);
    }
  };

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

  return (
    <>
      <main className="h-full bg-[#DCDCE5] dark:bg-[#2F2F3A]">
        <div className="relative h-full border-gray-200 border-b-[1px] ">
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
          <div className="ml-[96px] w-full">
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
            />
          </div>
        </div>
        <div className="bg-white dark:bg-[#1E1E2A]  ml-24 w-[92%] p-11 h-screen flex flex-col justify-start  ">
          <>
            {view == "chooseLanguage" ? (
              <Modal
                onClose={() => {
                  router.push("/");
                }}
              >
                <LanguageModal />
              </Modal>
            ) : (
              <div></div>
            )}
            {items[0]?.active && items[0].title === "Welcome" ? (
              <Welcome />
            ) : items.filter((e) => e.active)[0] ? (
              <div className="text-black"></div>
            ) : (
              <Welcome />
            )}
          </>
        </div>
      </main>
    </>
  );
}

export default Home;
