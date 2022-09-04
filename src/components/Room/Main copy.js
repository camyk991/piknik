import { useState } from "react";
import { Button } from "@material-ui/core";
import VideoCall from "./VideoCall";

function Main() {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="Main">
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setInCall(true)}
        >
          Join Call
        </Button>
      )}
    </div>
  );
}

export default Main;
