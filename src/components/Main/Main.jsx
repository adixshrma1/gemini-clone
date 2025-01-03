import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const loaderClasses = "rounded-sm border-0 bg-[#f6f7f8] bg-gradient-to-r from-[#9ed7ff] to-[#ffffff] h-5 animate-pulse";
const cardClasses = "hover:bg-[#dfe4ea] h-[200px] p-4 bg-[#f0f4f9] rounded-lg relative cursor-pointer";
const cardImgClasses = "absolute w-9 p-1.5 bg-white rounded-2xl bottom-2 right-2";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  return (
    <div className="flex-1 min-h-screen pb-4 relative">
      <div className="flex items-center justify-between text-2xl p-5 text-[#585858]">
        <p>Gemini</p>
        <img className="w-10 rounded-full" src={assets.user_icon} alt="" />
      </div>
      <div className="max-w-[900px] m-auto">
        {!showResult ? (
          <>
            <div className="my-8 mx-0 text-[#c4c7c5] font-medium p-5">
              <p>
                <span className="text-[56px] bg-gradient-to-r from-[#4b90ff] to-[#ff5546] bg-clip-text text-transparent">Hello, Dev.</span>
              </p>
              <p className="text-4xl">How can I help you today?</p>
            </div>
            <div className="max-h-[42vh] overflow-y-scroll no-scrollbar grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4 p-5">
              <div className={cardClasses}>
                <p className="text-[#585858]">Suggest beautiful places to see on an upcoming road trip.</p>
                <img className={cardImgClasses} src={assets.compass_icon} alt="" />
              </div>
              <div className={cardClasses}>
                <p className="text-[#585858]">Briefly summarise this concept: Urban Planning.</p>
                <img className={cardImgClasses} src={assets.bulb_icon} alt="" />
              </div>
              <div className={cardClasses}>
                <p className="text-[#585858]">Brainstorm team working activities for our work retreat.</p>
                <img className={cardImgClasses} src={assets.message_icon} alt="" />
              </div>
              <div className={cardClasses}>
                <p className="text-[#585858]">Improve Readability of the following code.</p>
                <img className={cardImgClasses} src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="px-5 max-h-[78vh] sm:max-h-[70vh] overflow-y-scroll no-scrollbar">
              <div className="my-10 flex items-center gap-4">
                <img className="w-10 rounded-full" src={assets.user_icon} alt="" />
                <p>{recentPrompt}</p>
              </div>
              <div className="flex items-start gap-4">
                <img className="w-10 rounded-full" src={assets.gemini_icon} alt="" />
                {loading ? (
                  <>
                    <div className="w-full flex flex-col gap-2.5">
                      <hr className={loaderClasses}/>
                      <hr className={loaderClasses}/>
                      <hr className={loaderClasses}/>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="sm:text-lg font-light leading-7" dangerouslySetInnerHTML={{ __html: resultData }}></p>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        <div className="absolute bottom-0 w-full max-w-[900px] m-auto">
          <div className="flex items-center justify-between gap-5 bg-[#f0f4f9] py-2.5 px-5 m-1.5 rounded-full">
            <input
              className="flex-1 w-[150px] bg-transparent border-none outline-none p-2 text-lg"
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div className="flex items-center gap-1.5 sm:gap-4">
              <img className="w-5 sm:w-6 cursor-pointer" src={assets.gallery_icon} alt="" />
              <img className="w-5 sm:w-6 cursor-pointer" src={assets.mic_icon} alt="" />
              {input ? (
                <img className="w-5 sm:w-6 cursor-pointer" onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="hidden sm:block text-sm my-4 text-center font-light">
            Gemini may display inaccurate info, including about people, so
            double-check its responses.{" "}
            <span className="underline">Your privacy and Gemini Apps</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
