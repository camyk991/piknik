import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Main from "./components/Room/Main";
import { GlobalStyle } from "./GlobalStyles";
import { useIsLoggedIn } from "./hooks/useIsLoggedIn";
import VideoCall from "./components/Room/VideoCall";
import { useIsInRoom } from "./hooks/useIsInRoom";
import { v4 as uuidv4 } from "uuid";
import PostOffer from "./components/PostOffer/PostOffer";

function App() {
  const { loggedIn, setLoggedIn, userData, setUserData } = useIsLoggedIn();
  // const { inCall, setInCall, roomId, setRoomId } = useIsInRoom();

  const [inCall, setInCall] = useState(true);
  // const [roomId, setRoomId] = useState(uuidv4());
  const [roomId, setRoomId] = useState("1");

  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<Register isLoggedIn={loggedIn} />} />
        <Route
          path="/sign-in"
          element={
            <Login
              isLoggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setUserData={setUserData}
            />
          }
        />
        <Route
          path="/room/:roomId"
          element={
            <VideoCall
              setInCall={setInCall}
              userName={"John"}
              roomId={roomId}
              setRoomId={setRoomId}
            />
          }
        />
        <Route
          path="/dashboard"
          element={<Profile setRoomId={setRoomId} roomId={roomId} />}
        />
        <Route path="/" element={<Main />} />
        <Route path="/post-offer" element={<PostOffer />} />
      </Routes>
      <GlobalStyle />
    </div>
  );
}

export default App;
