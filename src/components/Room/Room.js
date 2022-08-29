// import "./AgoraRTC_N-4.13.0.js";
// import "./agora-rtm-sdk-1.4.5.js";

import logo from "./logo.png"; //change later
import "./Room.css";

import { useState, useEffect, useRef } from "react";

// src = "js/room_rtm.js";
// src = "js/room_rtc.js";

function Room() {
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

  //handling the frame functionality
  const [videoFrame, setVideoFrame] = useState(false);
  const [userIdInDisplayFrame, setUserIdInDisplayFrame] = useState(null);
  const [userInDisplayFrame, setUserInDisplayFrame] = useState(null);

  function expandVideoFrame(e) {
    setVideoFrame(true);

    if (userIdInDisplayFrame !== null) {
      if (userIdInDisplayFrame !== e.currentTarget.id) {
        userInDisplayFrame.style.display = "block";
      }
    }

    setUserIdInDisplayFrame(e.currentTarget.id);
    setUserInDisplayFrame(e.currentTarget);
    e.currentTarget.style.display = "none";
  }

  function hideVideoFrame(e) {
    setVideoFrame(false);

    userInDisplayFrame.style.display = "block";

    setUserIdInDisplayFrame(null);
    setUserInDisplayFrame(null);
  }

  return (
    <div className="Room">
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

      <main className="container">
        <div id="room__container">
          <section
            id="members__container"
            className={memberContainer ? "members__container__hidden" : null}
          >
            <div id="members__header">
              <p>Participants</p>
              <strong id="members__count">0</strong>
            </div>

            <div id="member__list"></div>
          </section>

          <section id="stream__container">
            <div
              id="stream__box"
              style={{ display: videoFrame ? "block" : "none" }}
              onClick={hideVideoFrame}
            >
              {videoFrame ? (
                <div className="video__container" id={userIdInDisplayFrame}>
                  <div className="video-player" id={`user-1`}></div>
                </div>
              ) : null}
            </div>

            <div id="streams__container">
              <div
                className={
                  userIdInDisplayFrame
                    ? "video__container small__video__containers"
                    : "video__container"
                }
                id="user-container-1"
                onClick={expandVideoFrame}
              >
                <div className="video-player" id="user-1"></div>
              </div>

              <div
                className={
                  userIdInDisplayFrame
                    ? "video__container small__video__containers"
                    : "video__container"
                }
                id="user-container-2"
                onClick={expandVideoFrame}
              >
                <div className="video-player" id="user-2"></div>
              </div>

              <div
                className={
                  userIdInDisplayFrame
                    ? "video__container small__video__containers"
                    : "video__container"
                }
                id="user-container-3"
                onClick={expandVideoFrame}
              >
                <div className="video-player" id="user-3"></div>
              </div>
            </div>

            <div className="stream__actions">
              <button id="camera-btn" className="active">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z" />
                </svg>
              </button>
              <button id="mic-btn" className="active">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2c1.103 0 2 .897 2 2v7c0 1.103-.897 2-2 2s-2-.897-2-2v-7c0-1.103.897-2 2-2zm0-2c-2.209 0-4 1.791-4 4v7c0 2.209 1.791 4 4 4s4-1.791 4-4v-7c0-2.209-1.791-4-4-4zm8 9v2c0 4.418-3.582 8-8 8s-8-3.582-8-8v-2h2v2c0 3.309 2.691 6 6 6s6-2.691 6-6v-2h2zm-7 13v-2h-2v2h-4v2h10v-2h-4z" />
                </svg>
              </button>
              <button id="screen-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M0 1v17h24v-17h-24zm22 15h-20v-13h20v13zm-6.599 4l2.599 3h-12l2.599-3h6.802z" />
                </svg>
              </button>
              <button id="leave-btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 10v-5l8 7-8 7v-5h-8v-4h8zm-16-8v20h14v-2h-12v-16h12v-2h-14z" />
                </svg>
              </button>
            </div>

            <button id="join-btn">Join Stream</button>
          </section>

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
                  Does anyone know hen he will be back?
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
