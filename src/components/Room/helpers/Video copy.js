import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";

export default function Video(props) {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);

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

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  }, [users, tracks]);

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={gridSpacing}>
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
      </Grid>
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack) {
            return (
              <Grid item xs={gridSpacing}>
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
                      videoTrack={user.videoTrack}
                      key={user.uid}
                      style={{ height: "100%", width: "100%" }}
                    />
                  </div>
                </div>
              </Grid>
            );
          } else return null;
        })}
    </Grid>
  );
}
