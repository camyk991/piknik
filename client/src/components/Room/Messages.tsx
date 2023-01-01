import "./Room.css";
import React from "react";
import { useState, useEffect } from "react";

import { RtmMessage } from "agora-rtm-react";
// import { text } from "stream/consumers";

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
  //   await rtmClient.logout();
  //   testChannel.removeAllListeners();
  //   rtmClient.removeAllListeners();
  // };

  //messages keep doubling
  useEffect(() => {
    testChannel.on("ChannelMessage", (msg: any, uid: any) => {
      setTexts((previous) => {
        //preventing doubled received messages
        if (previous.length > 0) {
          if (
            previous[previous.length - 1].uid == uid &&
            previous[previous.length - 1].msg == msg
          ) {
            return [...previous];
          } else {
            return [...previous, { msg, uid }];
          }
        } else {
          return [...previous, { msg, uid }];
        }
      });
    });

    // testChannel.on("MemberJoined", (msg: any, uid: any) => {
    //   setTexts((previous) => {
    //     return [...previous, { msg, uid }];
    //   });
    // });
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

// if doesn't work
// remember
// you changed the RtmMessage type
// type RtmMessage =
//   | RtmTextMessage
//   | RtmRawMessage;

export type messageStore = {
  msg: RtmMessage;
  uid: string;
};

export default Messages;
