import {
  createClient,
  createMicrophoneAndCameraTracks,
  createScreenVideoTrack,
} from "agora-rtc-react";

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

export const getScreenVideoTrack = createScreenVideoTrack({
  encoderConfig: "1080p_1",
  optimizationMode: "detail",
});
