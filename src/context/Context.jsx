import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) =>{

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord)=>{
        setTimeout(()=>{
            setResultData(prev => prev + nextWord);
        }, 70 * index)
    }

    const newChat = ()=>{
        setShowResult(false);
        setLoading(false);
    }

    const onSent = async (prompt)=>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined){
            response = await run(prompt);
            setRecentPrompt(prompt);
        }else{
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        let responseArray = response.split("**");
        let finalStr = "";      // for making characters bold.
        for (const i in responseArray) {
            if(i%2 === 0){
                finalStr += responseArray[i];
            }else{
                finalStr += "<b>" +responseArray[i]+ "</b>"
            }
        }
        let finalStr1 = finalStr.split("*").join("<br/>");      // for line break.
        // setResultData(finalStr1);

        let responseArray1 = finalStr1.split(" ");
        for (const i in responseArray1) {
            const nextWord = responseArray1[i];
            delayPara(i, nextWord + " ");  
        }
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        input, setInput,
        recentPrompt, setRecentPrompt,
        prevPrompts, setPrevPrompts,
        showResult,
        loading,
        resultData,
        onSent,
        newChat
    }
    return(
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;