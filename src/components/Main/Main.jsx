import React, { useContext } from 'react';
import './Main.css';
import {assets} from '../../assets/assets'
import { Context } from '../../context/Context';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResults,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  console.log("resultData: ", resultData);

  const handleCardClick = (text) => {
    setInput(text);
    onSent({ text: text });
  };

  return (
    <div className='main'>
      <div className='nav'>
        <p>Gemini</p>
        <img src={assets.user_icon} alt='User Icon' />
      </div>

      <div className='main-container'>
        {!showResults
        ?<>
        <div className='greet'>
          <p><span>Hello, Mehul.</span></p>
          <p>How can I help you today?</p>
        </div>

        <div className='cards'>
          <div className='card' onClick={() => handleCardClick('Suggest beautiful places to see on an upcoming road trip')}>
            <p>Suggest beautiful places to see on an upcoming road trip</p>
            <img src={assets.compass_icon} alt='Compass Icon' />
          </div>
          <div className='card' onClick={() => handleCardClick('Briefly summarize this concept: urban planning')}>
            <p>Briefly summarize this concept: urban planning</p>
            <img src={assets.bulb_icon} alt='Bulb Icon' />
          </div>
          <div className='card' onClick={() => handleCardClick('Brainstorm team bonding activities for our work retreat')}>
            <p>Brainstorm team bonding activities for our work retreat</p>
            <img src={assets.message_icon} alt='Message Icon' />
          </div>
          <div className='card' onClick={() => handleCardClick('Improve the readability of the following code')}>
            <p>Improve the readability of the following code</p>
            <img src={assets.code_icon} alt='Code Icon' />
          </div>
        </div>
        </> :
        <div className='result'>
            <div className='result-title'>
               <img src={assets.user_icon} alt='' />
               <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
                <img src={assets.gemini_icon} alt='' />
                {loading?<div className='loader'>
                    <hr />
                    <hr />
                    <hr />
                    </div>
                    :<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                    }
            </div>
        </div>
        }

        <div className='main-bottom'>
          <div className='search-box'>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type='text'
              placeholder='Enter a prompt'
            />
            <div>
              <img src={assets.gallery_icon} alt='Gallery Icon' />
              <img src={assets.mic_icon} alt='Mic Icon' />
              <img
                onClick={() => onSent({ text: input })}
                src={assets.send_icon}
                alt='Send Icon'
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>
          <p className='bottom-info'>
            Gemini may display inaccurate information, including about people.
            Please double-check its responses. Your privacy and Gemini Apps.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
