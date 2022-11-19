import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useIsInRoom = () => {
  const [inCall, setInCall] = useState(true);
  const [roomId, setRoomId] = useState(uuidv4());

  return { inCall, setInCall, roomId, setRoomId };
};
