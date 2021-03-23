import React from 'react';
import './App.css';
import { Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import PlayerControl from './components/PlayerControl';





function App() {
  return (
    <Row justify="center">
      <Col span={10}>
        <div className="playerWrapper">
          <ReactPlayer url="https://www.youtube.com/watch?v=gdZLi9oWNZg"
            width="100%"
            height="100%"
            muted={true}
            playing={true} />
          <PlayerControl />
        </div>
      </Col>
    </Row>
  );
}

export default App;
