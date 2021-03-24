import React from 'react';
import './App.css';
import { Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import PlayerControl from './components/PlayerControl/PlayerControl';
import { useDispatch, useSelector } from 'react-redux';
import { StoresState } from './stores';
import { setPlaying } from './stores/videoReducer';

function App() {
  const playing = useSelector((state: StoresState) => state.videoPlayer.playing)
  const muted = useSelector((state: StoresState) => state.videoPlayer.muted)
  const dispatch = useDispatch()

  const handlePlaying = () => {
      dispatch(setPlaying());
  }
  
  return (

    <Row justify="center">
      <Col span={10}>
        <div className="playerWrapper">

          <ReactPlayer url="https://www.youtube.com/watch?v=gdZLi9oWNZg"
            width="100%"
            height="100%"
            muted={muted}
            playing={playing} />
          <PlayerControl muted={muted} playing={playing} handlePlaying={handlePlaying}/>
        </div>
      </Col>
    </Row>
  );
}

export default App;
