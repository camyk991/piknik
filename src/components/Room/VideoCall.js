import { useState, useEffect, useRef } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  // channelName,
  // useChannel,
  useRtmClient,
} from "./settings.js";
import Room from "./Room.js";

import { createChannel, RtmChannel } from "agora-rtm-react";
export const useChannel = createChannel("testrtm");

// import { RtmMessage } from "agora-rtm-react";

// import uuid from "react-uuid";

{
  /* <li key={uuid()}> */
}

// let uid = sessionStorage.getItem("uid");
// if (!uid) {
//   uid = uuid();
//   sessionStorage.setItem("uid", uid);
// }

// console.log(`Random uuid ${uid}`);

export default function VideoCall(props) {
  const { userName, roomId } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  let client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  // const [memberName, setMemberName] = useState([]);

  const rtmClient = useRtmClient;

  // const testChannel = useChannel(rtmClient);
  // const testChannel = rtmClient.createChannel(roomId);
  const testChannel = useRef(rtmClient.createChannel(roomId)).current;

  const [uid, setUid] = useState("");

  useEffect(() => {
    let init = async (name) => {
      //init rtm

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

      //rtm
      // setUid(client.uid.toString());
      // console.log(
      //   "%c New Member: ",
      //   "background: #222; color: #bada55",
      //   client.uid
      // );
      // console.log(
      //   "%c New Member: ",
      //   "background: #222; color: #bada55",
      //   client
      // );

      // await rtmClient.login({ uid: uid });

      // await testChannel.join();

      // // await testChannel
      // //   .getMembers()
      // //   .then((res) => {
      // //     setMembers(res);
      // //   })
      // //   .catch((err) => console.log(err));

      // // if (!members.includes(uid.toString())) {
      // //   testChannel
      // //     .join()
      // //     .then((res) => console.log(res))
      // //     .catch((err) => console.log(err));
      // // }

      // rtmClient.on("ConnectionStateChanged", async (state, reason) => {
      //   console.log("ConnectionStateChanged", state, reason);
      // });

      // // testChannel.on("ChannelMessage", (msg, uid) => {
      // //   setTexts((previous) => {
      // //     return [...previous, { msg, uid }];
      // //   });
      // // });

      // testChannel.on("MemberJoined", (memberId) => {
      //   console.log(
      //     "%c New Member: ",
      //     "background: #222; color: #bada55",
      //     memberId
      //   );
      // });

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
        init(roomId ? roomId : "main");
      } catch (error) {
        console.log(error);
      }
    }
  }, [roomId, client, ready, tracks]);

  return (
    <div>
      <div>
        {start && tracks && (
          <Room
            tracks={tracks}
            users={users}
            userName={userName}
            roomId={roomId}
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
