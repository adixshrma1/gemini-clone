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
        }, 75 * index)
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
            setRecentPrompt(prompt);
            response = await run(prompt);
        }else{
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        let responseArray = response.split("**");
        let newResponse = "";      // for making characters bold.
        for (const i in responseArray) {
            if(i%2 === 0){
                newResponse += responseArray[i];
            }else{
                newResponse += "<b>" +responseArray[i]+ "</b>"
            }
        }

        let responseArray2 = newResponse.split("*");     // for li tags
        let newResponse2 = "";
        newResponse2 += responseArray2[0];
        for (let i=1; i<responseArray2.length; i++) {
            newResponse2 += "<li>" + responseArray2[i] + "</li>"
        }

        let responseArray3 = newResponse2.split(" ");
        for (const i in responseArray3) {
            const nextWord = responseArray3[i];
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