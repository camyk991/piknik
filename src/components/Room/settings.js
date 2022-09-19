import {
  createClient,
  createMicrophoneAndCameraTracks,
  createScreenVideoTrack,
} from "agora-rtc-react";

import { createChannel, RtmMessage } from "agora-rtm-react";

// import { createChannel } from "agora-rtm-react";

import AgoraRTM from "agora-rtm-react";

import { createClient as createRtmClient } from "agora-rtm-react";

const appId = "a3c62a430c5841dea1060444ce7eaf9c";

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: null };
export const useClient = createClient(config);

export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks(
  {},
  {
    encoderConfig: {
      width: { min: 640, ideal: 1920, max: 1920 },
      height: { min: 480, ideal: 1080, max: 1080 },
    },
  }
);

// export const channelName = "main";
// const useChannel = createChannel("channelName");

//share screen
export const useScreenVideoTrack = createScreenVideoTrack();

// rtm
// export const useRtmClient = createRtmClient(appId);
export const useRtmClient = AgoraRTM.createInstance(
  "a3c62a430c5841dea1060444ce7eaf9c"
);

export const useChannel = createChannel("rtmtest");
