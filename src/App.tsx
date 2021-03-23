import React from 'react';
import './App.css';
import { Row, Col, Button } from 'antd';
import ReactPlayer from 'react-player';
// top: 50%;
// left: 50%;
// position: absolute;
// transform: translate(-50%,-50%);
// text-align: center;

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
          <div className="controlsWrapper">
            <Row justify="space-between" style={{padding:16}}>
              <Col>
                <h5>Video Title</h5>
              </Col>
              <Col>
              <Button>Bookmark
                </Button></Col>
            </Row>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default App;
