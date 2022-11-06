import React from "react";
import Main from "./components/Room/Main";
import { GlobalStyle } from "./GlobalStyles";
import Profile from "./components/Profile/Profile";

function App() {
  return (
    <div className="App">
      {/* <Main /> */}

      <Profile />

      <GlobalStyle />
    </div>
  );
}

export default App;
