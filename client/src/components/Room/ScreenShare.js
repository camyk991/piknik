import { useEffect, useState, useRef } from "react";
import { useClient, getScreenVideoTrack } from "./settings";
import styled from "styled-components";
import {
  createScreenVideoTrack,
  createClient,
  AgoraVideoPlayer,
} from "agora-rtc-react";

export default function ScreenShare(props) {
  let screenTracks;
  const client = useClient();
  const { tracks: videoTrack, users } = props;

  const { isScreenSharing } = props;

  //SCREEN SHARING AND SHIT
  const getScreenSharingVideoTrack = (tracks) => {
    if (Array.isArray(tracks)) {
      return tracks[0];
    } else {
      return tracks;
    }
  };

  //this line asks for permission
  if (isScreenSharing) {
    const { ready, tracks } = getScreenVideoTrack();
    screenTracks = tracks;
  }

  const tracksRef = useRef(screenTracks);

  useEffect(() => {
    tracksRef.current = screenTracks;
  }, [screenTracks]);

  const screenTrack = getScreenSharingVideoTrack(screenTracks);

  if (screenTracks) {
    //works but also doesn't refreshes and it only updates for other, we still see our camera instead of screen
    client.unpublish([videoTrack[1]]);
    client.publish(screenTrack);

    //1-video, 0-audio
    // videoTrack[1] = screenTrack;
  }

  console.log(`%c ${screenTrack} `, "background: #222; color: #bada55");
  console.log(`%c ${videoTrack[1]} `, "background: #222; color: #bada55");

  return <div className="ScreenShare" style={{ display: "none" }}></div>;
}
