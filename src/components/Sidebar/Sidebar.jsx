import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const bottomItemClass = "flex items-start gap-2.5 p-2.5 pr-10 rounded-full text-[#282828] hover:bg-[#e2e6eb] cursor-pointer";

const Sidebar = () => {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, newChat } = useContext(Context);

  return (
    <div className="hidden min-h-screen sm:inline-flex flex-col justify-between bg-[#f0f4f9] py-6 px-4">
      <div>
        <img
          onClick={() => {
            setExtended((prev) => !prev);
          }}
          className="w-5 block ml-2.5 cursor-pointer"
          src={assets.menu_icon}
        />
        <div onClick={()=>newChat()} className="mt-12 inline-flex items-center gap-2.5 py-2.5 px-4 bg-[#e6eaf1] rounded-full text-sm text-gray-500 cursor-pointer">
          <img className="w-5" src={assets.plus_icon} alt="" />
          {extended ? <p>New Chat</p> : null}
        </div>
        {extended ? (
          <div className="flex flex-col animate-fadeIn">
            <p className="mt-5 mb-7">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div onClick={()=>onSent(item)} key={index} className="flex items-start gap-2.5 p-2.5 pr-10 rounded-full text-[#282828] hover:bg-[#e2e6eb] cursor-pointer">
                  <img className="w-5" src={assets.message_icon} />
                  <p>{item.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <div className={bottomItemClass}>
          <img className="w-5" src={assets.question_icon} />
          {extended ? <p>Help</p> : null}
        </div>
        <div className={bottomItemClass}>
          <img className="w-5" src={assets.history_icon} />
          {extended ? <p>Activity</p> : null}
        </div>
        <div className={bottomItemClass}>
          <img className="w-5" src={assets.setting_icon} />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
