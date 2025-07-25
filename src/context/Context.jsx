import { createContext, useState } from "react";
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
	const [input, setInput] = useState("");
	const [recentPrompt, setRecentPrompt] = useState("");
	const [prevPrompts, setPrevPrompts] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [loading, setLoading] = useState(false);
	const [resultData, setResultData] = useState("");

	const delayPara = (index, nextWord) => {
		setTimeout(function () {
			setResultData((prev) => prev + nextWord);
		}, 10 * index);
	};
    const newChat = () =>{
    setLoading(false);
    setShowResults(false);
    setInput("");             
    setRecentPrompt("");      
    setResultData(""); 
    }

  const onSent = async (promptObj) => {
  const promptText = typeof promptObj === "string" ? promptObj : promptObj?.text;

  if (!promptText) {
    console.error("No input text provided to onSent");
    return;
  }

  setResultData("");
  setLoading(true);
  setShowResults(true);

  setPrevPrompts((prev) => [...prev, promptText]);
  setRecentPrompt(promptText);

  try {
    const response = await runChat({ text: promptText });

    let responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      newResponse += i % 2 === 1 ? `<b>${responseArray[i]}</b>` : responseArray[i];
    }

    const formattedResponse = newResponse.split("*").join("<br/>");
    const charArray = formattedResponse.split("");

    charArray.forEach((char, index) => {
      delayPara(index, char);
    });
  } catch (error) {
    console.error("Error while running chat:", error);
  } finally {
    setLoading(false);
    setInput("");
  }
};

	const contextValue = {
		prevPrompts,
		setPrevPrompts,
		onSent,
		setRecentPrompt,
		recentPrompt,
		input,
		setInput,
		showResults,
		loading,
		resultData,
		newChat,
	};

	return (
		<Context.Provider value={contextValue}>{props.children}</Context.Provider>
	);
};



export default ContextProvider;