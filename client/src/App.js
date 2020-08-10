import React from 'react';
import logo from './logo.svg';
import './App.css';

import Title from "./components/Title.js"
import List from "./components/List.js"
import ListItem from "./components/ListItem.js"
import Footer from "./components/Footer.js"


function App() {
  return (
    <div className="App">
      <Title />
      <Footer />

    </div>
  );
}

export default App;
