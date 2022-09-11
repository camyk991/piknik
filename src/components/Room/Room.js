// import "./agora-rtm-sdk-1.4.5.js";

import logo from "./logo.png"; //change later
import "./Room.css";
import Video from "./Video";

import { useState } from "react";

function Room(props) {
  const { users, tracks, userName } = props;
  //scroll messages into view - doesn't work yet
  //let messagesContainer = document.getElementById("messages");
  // messagesContainer.scrollTop = messagesContainer.scrollHeight;

  //show and hide members container (left container)
  const [memberContainer, setMemberContainer] = useState(true);
  function handleMemberContainer() {
    setMemberContainer(!memberContainer);
  }

  //show and hide chat panel (right container)
  const [chatPanel, setChatPanel] = useState(true);
  function handleChatPanel() {
    setChatPanel(!chatPanel);
  }

  return (
    <div className="Room">
      {/* NAV */}
      <header id="nav">
        <div className="nav--list">
          <button id="members__button" onClick={handleMemberContainer}>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <path
                d="M24 18v1h-24v-1h24zm0-6v1h-24v-1h24zm0-6v1h-24v-1h24z"
                fill="#ede0e0"
              />
              <path d="M24 19h-24v-1h24v1zm0-6h-24v-1h24v1zm0-6h-24v-1h24v1z" />
            </svg>
          </button>
          <a href="lobby.html">
            <h3 id="logo">
              <img src={logo} alt="Site Logo" />
              <span>Mumble</span>
            </h3>
          </a>
        </div>

        <div id="nav__links">
          <button id="chat__button" onClick={handleChatPanel}>
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              fill="#ede0e0"
              clipRule="evenodd"
            >
              <path d="M24 20h-3v4l-5.333-4h-7.667v-4h2v2h6.333l2.667 2v-2h3v-8.001h-2v-2h4v12.001zm-15.667-6l-5.333 4v-4h-3v-14.001l18 .001v14h-9.667zm-6.333-2h3v2l2.667-2h8.333v-10l-14-.001v10.001z" />
            </svg>
          </button>

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

      {/* MAIN CONTAINER */}
      <main className="container">
        <div id="room__container">
          {/* MEMBERS CONTAINER */}
          <section
            id="members__container"
            className={memberContainer ? "members__container__hidden" : null}
          >
            <div id="members__header">
              <p>Participants</p>
              <strong id="members__count">{users.length + 1}</strong>
            </div>

            <div id="member__list">
              {tracks ? (
                <div className="member__wrapper" id="member__1__wrapper">
                  <span className="green__icon"></span>
                  <p className="member_name">{userName}</p>
                  {/* <p className="member_name">Nala</p> */}
                </div>
              ) : null}

              {users.length > 0 ? (
                <div className="member__wrapper" id="member__2__wrapper">
                  <span className="green__icon"></span>
                  <p className="member_name">Nala</p>
                </div>
              ) : null}
            </div>
          </section>

          {/* STREAM CONTAINER */}
          <Video tracks={tracks} users={users} />

          {/* MESSAGES CONTAINER */}
          <section
            id="messages__container"
            className={chatPanel ? "messages__container__hidden" : null}
          >
            <div id="messages">
              {/* <div className="message__wrapper">
              <div className="message__body__bot">
                <strong className="message__author__bot">🤖 Mumble Bot</strong>
                <p className="message__text__bot">
                  Welcome to the room, Don't be shy, say hello!
                </p>
              </div>
            </div> */}

              {/* <div className="message__wrapper">
              <div className="message__body">
                <strong className="message__author">Dennis Ivy</strong>
                <p className="message__text">
                  Does anyone know when he will be back?
                </p>
              </div>
            </div> */}
            </div>

            <form id="message__form">
              <input
                type="text"
                name="message"
                placeholder="Send a message...."
              />
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
