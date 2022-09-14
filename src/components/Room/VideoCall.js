import { useState, useEffect } from "react";
import {
  config,
  useClient,
  useMicrophoneAndCameraTracks,
  // channelName,
} from "./settings.js";
import Room from "./Room.js";

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
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const [memberName, setMemberName] = useState([]);

  useEffect(() => {
    let init = async (name) => {
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
        await client.join(config.appId, name, config.token, null);
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
          <Room tracks={tracks} users={users} userName={userName} />
        )}
      </div>
    </div>
  );
}
