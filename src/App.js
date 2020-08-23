import React from 'react';
import TapeCard from './components/TapeCard';
import json from './assets/jsons/tape.json';
import './App.css';

function App() {
  return (
    <div className="App">
      {json.data.map(tapData => <TapeCard key={tapData.id} className="tape-card" tape={tapData}/>)}
    </div>
  );
}

export default App;
