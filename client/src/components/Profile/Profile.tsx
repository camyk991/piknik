import "./Profile.css";
import React, { useState } from "react";
import VideoCall from "../Room/VideoCall";

import { v4 as uuidv4 } from "uuid";

function Profile(props: any) {
  const [inCall, setInCall] = useState(false);
  const [roomId, setRoomId] = useState("");

  function handleCreateRoom(e: any) {
    e.preventDefault();
    setInCall(true);

    //creating room uuid
    const inviteCode = uuidv4();

    window.history.replaceState({}, "", `?room=${inviteCode}`);

    //get the uuid from url
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // let roomIdtemp = urlParams.get("room") || "default";
    // setRoomId(roomIdtemp);

    setRoomId(inviteCode);
  }

  return (
    <div className="Profile">
      {inCall ? (
        <VideoCall setInCall={setInCall} userName={"John"} roomId={roomId} />
      ) : (
        <div className="Dashboard">
          <header>
            <div className="header-content">
              <div className="header-logo">
                <div className="logo"></div>
              </div>
              <div className="header-links">
                <div className="header-menu">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="header-link">
                  <a href="#">Pomóż</a>
                </div>
                <div className="header-link">
                  <a href="#">Otrzymaj pomoc</a>
                </div>
                <div className="header-link">
                  <a href="#">Chat grupowy</a>
                </div>
              </div>
              <div className="header-user-pic">
                <div className="user-pic"></div>
              </div>
            </div>
          </header>

          <main id="profile-main">
            <div className="main-content">
              {/* COLUMN 1 */}
              {/* user info */}
              <section className="user-info-container">
                <div className="user-info-content">
                  <div className="user-info-header">
                    <div className="user-info-id">
                      <p>ID: 12345</p>
                    </div>
                    <div className="user-info-pic">
                      <div className="u-pic"></div>
                    </div>
                  </div>

                  <div className="user-info-main">
                    <div className="user-info-name">
                      <p>Peter Parker</p>
                    </div>

                    <div className="user-info-subjects">
                      <p>Przedmioty:</p>
                      <p>Matematyka, Fizyka</p>
                    </div>

                    <div className="user-info-teach">
                      <p>Nauczał: 15h</p>
                    </div>

                    <div className="user-info-learn">
                      <p>Uczył się: 10h</p>
                    </div>
                  </div>

                  <div className="user-info-edit">
                    <button id="user-info-edit-btn">Edytuj</button>
                  </div>
                </div>
              </section>

              {/* hours left */}
              <section className="hours-left-container">
                <div className="hours-left-content">
                  <div className="hours-left-number">
                    <p>4</p>
                  </div>
                  <div className="hours-left-text">
                    <p>Liczba dostępnych godzin na naukę</p>
                  </div>
                </div>
              </section>

              {/* deal */}
              <section className="deal-container">
                <div className="deal-text">
                  <p>Poleć znajomemu i zyskaj 2 darmowe godziny!</p>
                </div>
              </section>

              {/* COLUMN 2 */}
              {/* teachers */}
              <section className="teachers-container">
                <div className="teachers-content">
                  <div className="teachers-header">
                    <p>Wybrane dla ciebie</p>
                  </div>
                  <div className="teachers-list">
                    <div className="teacher-el">
                      <div className="teacher-pic">
                        <div className="t-pic"></div>
                      </div>
                      <div className="teacher-info">
                        <div className="teacher-name">Aga</div>
                        <div className="teacher-subject">
                          Matematyka - funkcje
                        </div>
                      </div>
                    </div>

                    <div className="teacher-el">
                      <div className="teacher-pic">
                        <div className="t-pic"></div>
                      </div>
                      <div className="teacher-info">
                        <div className="teacher-name">Maciej</div>
                        <div className="teacher-subject">Fizyka - matura</div>
                      </div>
                    </div>

                    <div className="teacher-el">
                      <div className="teacher-pic">
                        <div className="t-pic"></div>
                      </div>
                      <div className="teacher-info">
                        <div className="teacher-name">Adam</div>
                        <div className="teacher-subject">
                          Matematyka - trójkąty
                        </div>
                      </div>
                    </div>

                    <div className="teacher-el">
                      <div className="teacher-pic">
                        <div className="t-pic"></div>
                      </div>
                      <div className="teacher-info">
                        <div className="teacher-name">Patrycja</div>
                        <div className="teacher-subject">
                          Matematyka - stereometria
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* friends */}
              <section className="friends-container">
                <div className="friends-content">
                  <div className="friends-header">
                    <p>Znajomi</p>
                  </div>
                  <div className="friends-list">
                    <div className="friend-el">
                      <div className="friend-pic">
                        <div className="f-pic"></div>
                      </div>
                      <div className="friend-name">Piotr</div>
                    </div>

                    <div className="friend-el">
                      <div className="friend-pic">
                        <div className="f-pic"></div>
                      </div>
                      <div className="friend-name">Iga</div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>

          <div className="feedback-btn-container">
            <button id="feedback-btn" onClick={handleCreateRoom}>
              Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
