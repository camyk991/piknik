import React, { useEffect, useState, useRef } from "react";
import {
  AgoraVideoPlayer,
  createClient,
  createMicrophoneAndCameraTracks,
  ClientConfig,
  IAgoraRTCRemoteUser,
  ILocalVideoTrack,
  ILocalAudioTrack,
  createScreenVideoTrack,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from "agora-rtc-react";

// Create screen client
const useScreenVideoClient = createClient({
  mode: "rtc",
  codec: "vp8",
});

const getScreenSharingVideoTrack = (
  tracks: ILocalVideoTrack | [ILocalVideoTrack, ILocalAudioTrack]
) => {
  if (Array.isArray(tracks)) {
    return tracks[0];
  } else {
    return tracks;
  }
};

//todo
// ScreenSharing component
const ScreenSharing = (props: any) => {
  const useScreenVideoTrack = createScreenVideoTrack({
    encoderConfig: "1080p_1",
    optimizationMode: "detail",
  });
  // Using the screen client hook
  const screenVideoClient = useScreenVideoClient();
  const { ready, tracks } = useScreenVideoTrack();
  const tracksRef = useRef(tracks);
  const [toggleState, setToggleState] = useState<boolean>(false);

  const { onScreenSharingStopped } = props;

  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);

  useEffect(() => {
    const init = async (channelName: string) => {
      if (!props.screenshareConfig) return;

      try {
        await screenVideoClient.join(
          props.screenshareConfig.appId,
          channelName,
          props.screenshareConfig.token,
          props.screenshareConfig.uid
        );
        const videoTrack = getScreenSharingVideoTrack(tracks);
        if (tracks) await screenVideoClient.publish(videoTrack);
      } catch (e) {
        console.error(e);
      }
    };

    if (props.screenshareConfig && ready && tracks) {
      init(props.screenshareConfig.channelName);
    }
  }, [props.screenshareConfig, screenVideoClient, ready, tracks]);

  useEffect(() => {
    const videoTrack = getScreenSharingVideoTrack(tracks);
    if (videoTrack) {
      videoTrack.on("track-ended", () => {
        onScreenSharingStopped();
        stopScreenshare();
        setToggleState(false);
      });
    }
    // Stop and remove all tracks for screenshared client
    function stopScreenshare() {
      if (tracksRef.current) {
        const track = getScreenSharingVideoTrack(tracksRef.current);
        track.close();
        track.removeAllListeners();
      }
      (async () => {
        await screenVideoClient.leave();
        screenVideoClient.removeAllListeners();
      })();
    }
  }, [onScreenSharingStopped, tracks, screenVideoClient]);

  useEffect(() => {
    return () => {
      if (tracksRef.current) {
        const track = getScreenSharingVideoTrack(tracksRef.current);
        track.close();
        track.removeAllListeners();
      }
      (async () => {
        await screenVideoClient.leave();
        screenVideoClient.removeAllListeners();
      })();
    };
  }, [tracks, screenVideoClient]);

  if (!ready) {
    return null;
  }

  // Toggle tracks for screenshared client
  if (toggleState) {
    // If on then turn it off
    if (tracksRef.current) {
      const track = getScreenSharingVideoTrack(tracksRef.current);
      track.close();
      track.removeAllListeners();
    }
    (async () => {
      await screenVideoClient.leave();
      screenVideoClient.removeAllListeners();
    })();
  } else {
    // If off then turn it on
    (async () => {
      await screenVideoClient.join(
        props.screenshareConfig.appId,
        props.screenshareConfig.channelName,
        props.screenshareConfig.token,
        props.screenshareConfig.uid
      );
      // Using the screen client hook
      if (!null) {
        const videoTrack = getScreenSharingVideoTrack(tracks);
        if (tracks) await screenVideoClient.publish(videoTrack);
      }
    })();
  }

  const videoTrack = getScreenSharingVideoTrack(tracks);

  return (
    <>
      {/* Agora video player for screenshare */}
      <AgoraVideoPlayer className="video" videoTrack={videoTrack} />
      {/* Toggle Screenshare Button */}
      <div id="screenshare-controls">
        <button
          onClick={() => setToggleState(!toggleState)}
          id="toggle-screenshare-btn"
        >
          {toggleState ? "Start Screen Sharing" : "Stop Screen Sharing"}
        </button>
      </div>
    </>
  );
};
