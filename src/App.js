import './App.css';

import React, { useState } from 'react';

import ImageAnnotationDemo from './ImageAnnotationDemo';
import OpenSeadragonDemo from './OpenSeadragonDemo';

function App() {
  const [activeDemo, setActiveDemo] = useState('openseadragon');

  return (
    <div className="App">
      {/* <nav className="demo-nav">
        <button 
          className={activeDemo === 'image' ? 'active' : ''}
          onClick={() => setActiveDemo('image')}
        >
          Image Annotation
        </button>
        <button 
          className={activeDemo === 'openseadragon' ? 'active' : ''}
          onClick={() => setActiveDemo('openseadragon')}
        >
          OpenSeadragon + IIIF
        </button>
      </nav> */}

      {activeDemo === 'image' && <ImageAnnotationDemo />}
      {activeDemo === 'openseadragon' && <OpenSeadragonDemo />}
    </div>
  );
}

export default App;
