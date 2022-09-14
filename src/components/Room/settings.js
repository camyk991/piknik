import {
  createClient,
  createChannel,
  createMicrophoneAndCameraTracks,
  createScreenVideoTrack,
} from "agora-rtc-react";

import { RtmMessage } from "agora-rtm-react";

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

export const useScreenVideoTrack = createScreenVideoTrack();

// sdfhaksdfj
// sdfhaksdfj
// sdfhaksdfj
// sdfhaksdfj
// sdfhaksdfj

// const App = () => {
//   const client = useClient();
//   const testChannel = useChannel(client);

//   const login = async () => {
//     await client.login({ uid: "userId" });
//     await testChannel.join();
//   };

//   const sendMsg = async (text) => {
//     const message = client.createMessage({ text, messageType: "TEXT" });
//     await testChannel.sendMessage(message);
//   };
// };
