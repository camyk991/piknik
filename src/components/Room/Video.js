import { AgoraVideoPlayer } from "agora-rtc-react";
import { useState, useEffect } from "react";
import Controls from "./Controls";

export default function Video(props) {
  //users - remote users (others)
  //tracks - local tracks (us)
  const { users, tracks } = props;
  const [start, setStart] = useState(false);
  const [inCall, setInCall] = useState(false);

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
    <section id="stream__container">
      <div
        id="stream__box"
        style={{ display: videoFrame ? "block" : "none" }}
        onClick={hideVideoFrame}
      >
        {videoFrame ? (
          <div className="video__container" id={userIdInDisplayFrame}>
            <div className="video-player" id="user-1">
              <AgoraVideoPlayer
                videoTrack={
                  userIdInDisplayFrame.match(/\d/)[0] == 1
                    ? tracks[1]
                    : users[parseInt(userIdInDisplayFrame.match(/\d/)[0]) - 2]
                        .videoTrack
                }
                style={{ height: "100%", width: "100%" }}
              />
            </div>
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
          <div className="video-player" id="user-1">
            <AgoraVideoPlayer
              videoTrack={tracks[1]}
              style={{ height: "100%", width: "100%" }}
            />
          </div>
        </div>

        {/* <div
          className={
            userIdInDisplayFrame
              ? "video__container small__video__containers"
              : "video__container"
          }
          id="user-container-2"
          onClick={expandVideoFrame}
        >
          <div className="video-player" id="user-1"></div>
        </div> */}

        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <div
                  className={
                    userIdInDisplayFrame
                      ? "video__container small__video__containers"
                      : "video__container"
                  }
                  id={"user-container-" + user.id}
                  onClick={expandVideoFrame}
                >
                  <div className="video-player" id={"user-" + user.id}>
                    <AgoraVideoPlayer
                      videoTrack={user.videoTrack}
                      key={user.uid}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                </div>
              );
            } else return null;
          })}
      </div>

      {/* STREAM ACTIONS */}
      <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />

      {/* {inCall ? (
        <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
      ) : (
        <button id="join-btn" onClick={() => setInCall(true)}>
          Join Stream
        </button>
      )} */}
    </section>
  );
}
