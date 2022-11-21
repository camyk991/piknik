// import React, { CSSProperties, useState } from "react";
// import { createChannel, createClient, RtmMessage } from "agora-rtm-react";

// export const useClient = createClient("<Your Agora App ID>");
// export const useChannel = createChannel("test");

// const App = () => {
//   const client = useClient();
//   const testChannel = useChannel(client);
//   const [texts, setTexts] = useState([]);
//   const [uid, setUid] = useState<string>("");
//   const [textInput, setTextInput] = useState<string>("");
//   const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

//   let login = async () => {
//     await client.login({ uid });
//     await testChannel.join();
//     client.on("ConnectionStateChanged", async (state, reason) => {
//       console.log("ConnectionStateChanged", state, reason);
//     });
//     testChannel.on("ChannelMessage", (msg, uid) => {
//       setTexts((previous) => {
//         return [...previous, { msg, uid }];
//       });
//     });
//     testChannel.on("MemberJoined", (memberId) => {
//       console.log("New Member: ", memberId);
//     });
//     setLoggedIn(true);
//   };

//   let logout = async () => {
//     await testChannel.leave();
//     await client.logout();
//     testChannel.removeAllListeners();
//     client.removeAllListeners();
//     setLoggedIn(false);
//   };

//   const sendMsg = async (text: string) => {
//     let message = client.createMessage({ text, messageType: "TEXT" });
//     await testChannel.sendMessage(message);
//     setTexts((previous) => {
//       return [...previous, { msg: { text }, uid }];
//     });
//     setTextInput("");
//   };
// };
