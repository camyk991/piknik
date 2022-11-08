const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
let roomId = urlParams.get("room"); //room.html?room=roomId

if (!roomId) {
  roomId = "main"; //change later
}

let joinRoomInit = async () => {
  channel = await rtmClient.createChannel(roomId);

  //join a room
  await client.join(APP_ID, roomId, token, uid);
};

joinRoomInit();
