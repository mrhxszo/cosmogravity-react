import react, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LinkContext from "./components/Header/LinkContext";
import Header from "./components/Header/Header";
import Home from "./components/Home";
import Univers from "./components/Univers/Univers";
  

function App() {
  //this useState hook is used to pass the context from LinkContext in header folder to all the components
  const [linkClicked, setLinkClicked] = useState("")

  return (
    <LinkContext.Provider value={{ linkClicked, setLinkClicked }}>
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/Univers" element={<Univers/>}></Route>
        </Routes>
      </Router>
    </LinkContext.Provider>
  );
}

export default App;

