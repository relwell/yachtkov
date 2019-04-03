import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import axios from "axios";
import './App.css';
import yacht from './yacht.gif';


function initializeReactGA() {
    ReactGA.initialize('UA-137564463-1');
    ReactGA.pageview('/');
}


function App() {
  const [title, setTitle] = useState('');

  useEffect(() => {
    (async () => {
      initializeReactGA();
      const { data } = await axios.get("/generate");
      setTitle(data);
    })()
  }, []);

  return (
    <div className="App">
      <div id="background">
        <img src={yacht} alt="yacht" className="stretch" />
      </div>
      <h1>Yacht Rock Song Title Generator</h1>
      <p>Relax to the smooth sounds of...</p>
      <h2>{title}</h2>
      <button onClick={async () => {
        ReactGA.event({
          category: 'User',
          action: 'Generate Song Title'
        });
        const { data } = await axios.get("/generate");
        setTitle(data);
      }}>
        Generate a New Title
      </button>
      <div id="thanks">
        <p>Language model generated with <a href="https://github.com/jsvine/markovify">Markovify</a>.</p>
        <p>Special thanks to <a href="http://yachtrock.com">Beyond Yacht Rock's</a> <a href="http://www.yachtornyacht.com/">Yacht or Nyacht</a> for the data.</p>
        <p>Check out the code on <a href="https://github.com/relwell/yachtkov">GitHub</a>.</p>
      </div>
    </div>
  );
}

export default App;
