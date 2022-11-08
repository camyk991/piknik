import { useState } from "react";
import VideoCall from "./VideoCall";
// import Lobby from "./Lobby";
import logo from "./logo.png";
import "./Lobby.css";

//creating room uuid
// import { v4 as uuidv4 } from "uuid";
// uuidv4();

function Main() {
  const [inCall, setInCall] = useState(false);
  const [userName, setUserName] = useState();

  const [roomId, setRoomId] = useState("");

  function handleRoomId(e) {
    e.preventDefault();
    setRoomId(e.target.value);
  }

  function handleNameInput(e) {
    e.preventDefault();
    setUserName(e.target.value);
  }

  return (
    <div className="Main">
      {inCall ? (
        <VideoCall setInCall={setInCall} userName={userName} roomId={roomId} />
      ) : (
        <div className="Lobby">
          <header id="nav">
            <div className="nav--list">
              <a href="lobby.html">
                <h3 id="logo">
                  <img src={logo} alt="logo" />
                  <span>Mumble</span>
                </h3>
              </a>
            </div>

            <div id="nav__links">
              <a className="nav__link" href="/">
                Lobby
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#ede0e0"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 7.093v-5.093h-3v2.093l3 3zm4 5.907l-12-12-12 12h3v10h7v-5h4v5h7v-10h3zm-5 8h-3v-5h-8v5h-3v-10.26l7-6.912 7 6.99v10.182z" />
                </svg>
              </a>
              <a className="nav__link" id="create__room__btn" href="lobby.html">
                Create Room
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#ede0e0"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6 13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z" />
                </svg>
              </a>
            </div>
          </header>

          <main id="room__lobby__container">
            <div id="form__container">
              <div id="form__container__header">
                <p>👋 Create or Join Room</p>
              </div>

              <form id="lobby__form">
                <div className="form__field__wrapper">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your display name..."
                    onChange={handleNameInput}
                  />
                </div>

                <div className="form__field__wrapper">
                  <label>Room Name</label>
                  <input
                    type="text"
                    name="room"
                    required
                    placeholder="Enter room name..."
                    onChange={handleRoomId}
                  />
                </div>

                <button
                  className="form__field__wrapper"
                  onClick={() => setInCall(true)}
                >
                  Join Call
                </button>
              </form>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default Main;
