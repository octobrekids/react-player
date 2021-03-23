import React from 'react';
import './App.css';
import { Row, Col } from 'antd';
import ReactPlayer from 'react-player';

function App() {
  return (
    <div className="playerWrapper">
      <Row justify="center">
        <Col span={12}>
          <ReactPlayer url="https://www.youtube.com/watch?v=AMMx1hOwH-4" 
          muted={true}
          playing={true} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
