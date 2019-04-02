import React, { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import yacht from './yacht.gif';



function App() {
  const [title, setTitle] = useState('');

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:5000/generate");
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
        const { data } = await axios.get("http://localhost:5000/generate");
        setTitle(data);
      }}>
        Generate a New Title
      </button>
      <p id="thanks">Language model generated with <a href="https://github.com/jsvine/markovify">Markovify</a>. Special thanks to <a href="http://yachtrock.com">Beyond Yacht Rock's</a> <a href="http://www.yachtornyacht.com/">Yacht or Nyacht</a> for the data. Check out the code on <a href="https://github.com/relwell/yachtkov">GitHub</a>.</p>
    </div>
  );
}

export default App;
