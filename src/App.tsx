import React, { useState } from 'react';
import './App.css';
import SimpleMap from './components/SimpleMap'

function App() {
  const [content, setContent] = useState("");
  return (
    <div className="App">
      <SimpleMap setTooltipContent={setContent} />
    </div>
  );
}

export default App;
