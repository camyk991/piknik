import { useEffect, useState, useRef } from "react";
import { useClient, getScreenVideoTrack } from "./settings";
import styled from "styled-components";
import {
  createScreenVideoTrack,
  createClient,
  AgoraVideoPlayer,
} from "agora-rtc-react";
// import { initScreenSharing } from "./ScreenShare";

export default function ScreenShare(props) {
  let screenTracks;
  const client = useClient();

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

  if (screenTracks) client.publish(screenTrack);

  return <div className="ScreenShare" style={{ display: "none" }}></div>;
}
