import "./Room.css";
import React from "react";
import { useState, useEffect } from "react";

import { useChannel, useRtmClient } from "./settings.js";
import { RtmMessage } from "agora-rtm-react";

function Messages(props: any) {
  const {
    users,
    tracks,
    userName,
    chatPanel,
    roomId,
    rtmClient,
    testChannel,
    uid,
  } = props;

  //scroll messages into view - doesn't work yet
  //let messagesContainer = document.getElementById("messages");
  // messagesContainer.scrollTop = messagesContainer.scrollHeight;

  const [texts, setTexts] = useState<messageStore[]>([]);
  const [textInput, setTextInput] = useState<string>("");

  // let logout = async () => {
  //   await testChannel.leave();
  //   await client.logout();
  //   testChannel.removeAllListeners();
  //   client.removeAllListeners();
  // };

  useEffect(() => {
    testChannel.on("ChannelMessage", (msg: any, uid: any) => {
      setTexts((previous) => {
        return [...previous, { msg, uid }];
      });
    });
  }, []);

  const sendMsg = async (e: React.FormEvent<HTMLFormElement>, text: string) => {
    e.preventDefault();

    let message = rtmClient.createMessage({ text, messageType: "TEXT" });
    await testChannel.sendMessage(message);
    setTexts((previous) => {
      return [...previous, { msg: { text }, uid }];
    });
    setTextInput("");
  };

  return (
    <div className="Messages">
      {/* MESSAGES CONTAINER */}
      <section
        id="messages__container"
        className={chatPanel ? "messages__container__hidden" : undefined}
      >
        <div id="messages">
          {texts.map((text: messageStore, i) => (
            <div key={i} className="message__wrapper">
              <div className="message__body">
                <strong
                  className="message__author"
                  style={{ color: text.uid === uid ? "#ae00ff" : "#2aca3e" }}
                >
                  {text.uid}
                </strong>
                <p className="message__text">{text.msg["text"]}</p>
              </div>
            </div>
          ))}
          {/* <div className="message__wrapper">
              <div className="message__body__bot">
                <strong className="message__author__bot">🤖 Mumble Bot</strong>
                <p className="message__text__bot">
                  Welcome to the room, Don't be shy, say hello!
                </p>
              </div>
            </div> */}

          {/* <div className="message__wrapper">
              <div className="message__body">
                <strong className="message__author">Dennis Ivy</strong>
                <p className="message__text">
                  Does anyone know when he will be back?
                </p>
              </div>
            </div> */}
        </div>

        <form
          id="message__form"
          onSubmit={(e) => {
            sendMsg(e, textInput);
          }}
        >
          <input
            type="text"
            name="message"
            placeholder="Send a message...."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </form>
      </section>
    </div>
  );
}

export type messageStore = {
  msg: RtmMessage;
  uid: string;
};

export default Messages;

// Future<AgoraRtmChannel?> _createChannel(String name) async {
//   AgoraRtmChannel? channel = await _client?.createChannel(name);
//   if (channel != null) {
//     channel.onMemberJoined = (AgoraRtmMember member) {
//       _log("Member joined: " +
//           member.userId +
//           ', channel: ' +
//           member.channelId);
//     };
//     channel.onMemberLeft = (AgoraRtmMember member) {
//       _log(
//           "Member left: " + member.userId + ', channel: ' + member.channelId);
//     };
//     channel.onMessageReceived =
//         (AgoraRtmMessage message, AgoraRtmMember member) {
//       _log("Channel msg: " + member.userId + ", msg: " + message.text);
//     };
//   }
//   return channel;
// }
