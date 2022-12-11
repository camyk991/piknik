import React, { useEffect } from "react";

import {
  createScreenVideoTrack,
  createClient,
  AgoraVideoPlayer,
  createCameraVideoTrack,
} from "agora-rtc-react";

export default function ScreenTest() {
  async function startScreenCall() {
    const screenClient = createClient({ mode: "rtc", codec: "vp8" });
    await screenClient.join(
      "fe911605b2f6467faf4e846035abab80",
      "006fe911605b2f6467faf4e846035abab80IAA/sh04GpuP+tax97RzYeQLSYcCRg49MQB03jI23qlykmnabjEAAAAAEABGxiZqeU4iYQEAAQB5TiJh",
      "Elliot"
    );

    const screenTrack = await createScreenVideoTrack();
    await screenClient.publish(screenTrack);

    return screenClient;
  }

  async function startVideoCall() {
    const videoClient = createClient({ mode: "rtc", codec: "vp8" });
    await videoClient.join(
      "fe911605b2f6467faf4e846035abab80",
      "006fe911605b2f6467faf4e846035abab80IAA/sh04GpuP+tax97RzYeQLSYcCRg49MQB03jI23qlykmnabjEAAAAAEABGxiZqeU4iYQEAAQB5TiJh",
      "Elliot"
    );

    const videoTrack = await createCameraVideoTrack();
    await videoClient.publish(videoTrack);

    return videoClient;
  }

  useEffect(() => {
    startScreenCall().then((res) => console.log(res));
  }, []);

  return <div className="screenTest"></div>;
}
