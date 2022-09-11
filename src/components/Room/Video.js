import { AgoraVideoPlayer } from "agora-rtc-react";
import { useState, useEffect } from "react";
import Controls from "./Controls";

export default function Video(props) {
  //users - remote users (others)
  //tracks - local tracks (us)
  const { users, tracks } = props;
  const [start, setStart] = useState(false);
  const [inCall, setInCall] = useState(false);

  const [userIds, setUserIds] = useState([]);

  //set remote users Ids
  // setUserIds(users.map(() => users.uid));
  // console.log(userIds);

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
    // e.currentTarget.remove();

    //users are not comming back to the circles (their videos)
    //the AgoraVideoPlayer is disappearing
    //prolly coz there can only be one videoPlayer
    //so changing the display to "none" is not gonna cut it anymore
    //we have to delete and add it to the frame and circle
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
            <div className="video-player" id={"user-" + userIdInDisplayFrame}>
              <AgoraVideoPlayer
                videoTrack={
                  //make it search the videos properly (now works only for two)
                  userIdInDisplayFrame == 1 ? tracks[1] : users[0].videoTrack
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
          id="1"
          onClick={expandVideoFrame}
        >
          <div className="video-player" id="user-1">
            {!videoFrame || userIdInDisplayFrame != 1 ? (
              <AgoraVideoPlayer
                videoTrack={tracks[1]}
                style={{ height: "100%", width: "100%" }}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>

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
                  id={user.uid}
                  onClick={expandVideoFrame}
                >
                  <div className="video-player" id={"user-" + user.uid}>
                    {!videoFrame || userIdInDisplayFrame != user.uid ? (
                      <AgoraVideoPlayer
                        videoTrack={user.videoTrack}
                        key={user.uid}
                        style={{ height: "100%", width: "100%" }}
                      />
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              );
            } else return null;
          })}
      </div>

      <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
    </section>
  );
}
