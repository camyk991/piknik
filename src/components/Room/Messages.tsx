import "./Room.css";
import React from "react";
import { useState } from "react";

import { useChannel, useRtmClient } from "./settings.js";
import { RtmMessage } from "agora-rtm-react";

function Messages(props: any) {
  const { users, tracks, userName, chatPanel, roomId } = props;

  const rtmClient = useRtmClient();
  const testChannel = useChannel(rtmClient);
  const [texts, setTexts] = useState<messageStore[]>([]);
  const [uid, setUid] = useState<string>("");
  const [textInput, setTextInput] = useState<string>("");

  //scroll messages into view - doesn't work yet
  //let messagesContainer = document.getElementById("messages");
  // messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // rtm
  // const sendMsg = async (text: string) => {
  //   let message = rtmClient.createMessage({ text, messageType: "TEXT" });
  //   await testChannel.sendMessage(message);
  //   setTexts((previous) => {
  //     return [...previous, { msg: { text }, uid }];
  //   });
  //   setTextInput("");
  // };

  //gotta call this
  let login = async () => {
    setUid(String(Math.floor(Math.random() * 100000)));
    await rtmClient.login({ uid: uid });
    // await rtmClient.login({ uid: "1" });
    // const x = rtmClient.createChannel(roomId);

    // await rtmClient.addOrUpdateLocalUserAttributes({ name: displayName });
    // testChannel = await rtmClient.createChannel(roomId);
    // await x.join();
    await testChannel.join();

    rtmClient.on("ConnectionStateChanged", async (state, reason) => {
      console.log("ConnectionStateChanged", state, reason);
    });

    testChannel.on("ChannelMessage", (msg, uid) => {
      setTexts((previous) => {
        return [...previous, { msg, uid }];
      });
    });

    testChannel.on("MemberJoined", (memberId) => {
      console.log("New Member: ", memberId);
    });
  };

  // let logout = async () => {
  //   await testChannel.leave();
  //   await client.logout();
  //   testChannel.removeAllListeners();
  //   client.removeAllListeners();
  // };

  const sendMsg = async (e: React.FormEvent<HTMLFormElement>, text: string) => {
    e.preventDefault();
    login();
    setTimeout(async () => {
      let message = rtmClient.createMessage({ text, messageType: "TEXT" });
      await testChannel.sendMessage(message);
      setTexts((previous) => {
        return [...previous, { msg: { text }, uid }];
      });
      setTextInput("");
    }, 3000);
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
              <div
                className="message__body"
                style={{
                  backgroundColor: text.uid === uid ? "#ae00ff" : "#ccc",
                }}
              >
                <strong className="message__author">{text.uid}</strong>
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
          {/* <button onClick={() => sendMsg(textInput)}>Send Message</button> */}
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
