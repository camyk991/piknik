import { useState, useEffect, useRef } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  useRtmClient,
} from "./settings.js";
import Room from "./Room.js";

import { createChannel, RtmChannel } from "agora-rtm-react";

export default function VideoCall(props) {
  const { userName, roomId, setInCall, setRoomId } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  let client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const url = window.location.href;
  const urlArr = url.split("/");
  const lastSegment = urlArr.pop() || urlArr.pop();

  //get the uuid from url
  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // let roomIdtemp = urlParams.get("room") || "default";
  // setRoomId(roomIdtemp);

  // const [memberName, setMemberName] = useState([]);

  const rtmClient = useRtmClient;
  const testChannel = useRef(rtmClient.createChannel(roomId)).current;

  const [uid, setUid] = useState("");

  useEffect(() => {
    let init = async (name) => {
      if (roomId == "1") {
        setRoomId(lastSegment);
      }

      console.log(`%c ${lastSegment} `, "background: #222; color: #bada55");

      //publish video and audio
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });

          // setMemberName((prevName) => {
          //   return [...prevName];
          // });
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      //unpublish video and audio
      client.on("user-unpublished", (user, mediaType) => {
        if (mediaType === "audio") {
          if (user.audioTrack) user.audioTrack.stop();
        }
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      //user left
      client.on("user-left", (user) => {
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      //try connecting to Agora
      try {
        await client.join(config.appId, name, config.token, uid);
      } catch (error) {
        console.log("error");
      }

      //get video and audio and publish them
      if (tracks) {
        await client.publish([tracks[0], tracks[1]]);
      }
      setStart(true);
    };

    //create room
    if (ready && tracks) {
      try {
        init(lastSegment ? lastSegment : "main");
      } catch (error) {
        console.log(error);
      }
    }
  }, [lastSegment, client, ready, tracks]);

  return (
    <div>
      <div>
        {start && tracks && (
          <Room
            tracks={tracks}
            users={users}
            userName={userName}
            roomId={lastSegment}
            rtmClient={rtmClient}
            testChannel={testChannel}
            uid={uid}
            client={client}
          />
        )}
      </div>
    </div>
  );
}
