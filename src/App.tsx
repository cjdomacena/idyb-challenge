import React from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Slideshow from './components/Slideshow';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Slideshow />
      <Main />
    </div>
  );
}

export default App;
