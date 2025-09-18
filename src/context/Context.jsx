import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);

        let currentPrompt;
        // If 'prompt' is undefined, it's a new chat from the main input.
        if (prompt === undefined) {
            currentPrompt = input;
            // Add the new prompt to the sidebar history.
            if (input) {
                setPrevPrompts(prev => [...prev, input]);
            }
        } 
        // Otherwise, it's a prompt being loaded from the sidebar.
        else {
            currentPrompt = prompt;
        }

        setRecentPrompt(currentPrompt);
        const response = await runChat(currentPrompt);
        
        let responseArray = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }
        let finalResponse = newResponse.split("*").join("</br>");

        let responseWords = finalResponse.split(" ");
        for (let i = 0; i < responseWords.length; i++) {
            const nextWord = responseWords[i];
            delayPara(i, nextWord + " ");
        }
        
        setLoading(false);
        setInput("");
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;