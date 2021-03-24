import React, { useRef } from "react";
import "./App.css";
import { Row, Col } from "antd";
import ReactPlayer from "react-player";
import PlayerControl from "./components/PlayerControl/PlayerControl";
import { useDispatch, useSelector } from "react-redux";
import { StoresState } from "./stores";
import { setPlaying } from "./stores/videoReducer";

function App() {
  const dispatch = useDispatch();

  const playerRef = useRef<ReactPlayer>(null);

  const playing = useSelector(
    (state: StoresState) => state.videoPlayer.playing
  );
  const muted = useSelector((state: StoresState) => state.videoPlayer.muted);

  const handlePlaying = () => {
    dispatch(setPlaying());
  };

  const handleRewind = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
    }
  };

  const handleFastForward = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
    }
  };

  return (
    <Row justify="center">
      <Col span={10}>
        <div className="playerWrapper">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=gdZLi9oWNZg"
            ref={playerRef}
            width="100%"
            height="100%"
            muted={muted}
            playing={playing}
          />
          <PlayerControl
            muted={muted}
            playing={playing}
            handleRewind={handleRewind}
            handleFastForward={handleFastForward}
            handlePlaying={handlePlaying}
          />
        </div>
      </Col>
    </Row>
  );
}

export default App;
