import { useState, useEffect, useRef } from "react";
import { config, useClient, useMicrophoneAndCameraTracks } from "./settings.js";
import Room from "./Room.js";

import { createClient, createChannel } from "agora-rtm-react";

export const useRtmClient = createClient("a3c62a430c5841dea1060444ce7eaf9c");

export const useChannel = createChannel(window.location.href.split("/").pop());

export default function VideoCall(props) {
  const { userName, roomId, setInCall, setRoomId } = props;
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  let client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  //rtm init
  const rtmClient = useRtmClient();
  //const testChannel = useChannel(rtmClient);

  //get the roomId from the url
  const url = window.location.href;
  const urlArr = url.split("/");
  const lastSegment = urlArr.pop() || urlArr.pop();

  // const [memberName, setMemberName] = useState([]);

  // const rtmClient = useRtmClient;
  const testChannel = useRef(rtmClient.createChannel(lastSegment)).current;

  const [uid, setUid] = useState("");

  useEffect(() => {
    let init = async (name) => {
      if (roomId == "1") {
        setRoomId(lastSegment);
      }

      //publish video and audio
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...new Set([...prevUsers, user])];
          });

          user.videoTrack.play();

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
          if (user.videoTrack) user.videoTrack.stop();
          //MUTING AND OTHER STUFF
          //since setMuted basically calles user-unpublish this will handle the muting
          //so right now the circle doesn't disappear, which is good, only the icon shows up
          //but now it doesn't appear back until you do sth with it
          //dunno a problem with refreshing or sth?

          //when I click on it while it's muted it crashes for sm reason

          // setUsers((prevUsers) => {
          //   return prevUsers.filter((User) => User.uid !== user.uid);
          // });
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

        //get video and audio and publish them
        if (tracks) {
          await client.publish([tracks[0], tracks[1]]);
        }
        setStart(true);
      } catch (error) {
        console.log("error");
      }

      // //get video and audio and publish them
      // if (tracks) {
      //   await client.publish([tracks[0], tracks[1]]);
      // }
      // setStart(true);
    };

    let rtmInit = async () => {
      await rtmClient.login({ uid: String(Date.now()) });
      await testChannel.join();
    };

    //create room
    if (ready && tracks) {
      try {
        init(lastSegment ? lastSegment : "default");
        rtmInit();
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
