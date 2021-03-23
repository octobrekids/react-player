import React from 'react';
import './App.css';
import { Row, Col, Button } from 'antd';
import ReactPlayer from 'react-player';
import { CaretRightOutlined, ForwardOutlined, BackwardOutlined, PauseOutlined } from '@ant-design/icons'

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

          {/*top controls */}
          <div className="controlsWrapper" >
            <Row justify="space-between" style={{ padding: 16 }}>
              <Col>
                <h4 style={{ color: "white" }}>Video Title</h4>
              </Col>
              <Col>
                <Button>Bookmark
                </Button></Col>
            </Row>
          </div>
        </div>

        {/*middle controls*/}

        <Row justify="center">
          <Col>
            <div className="controlIcons">
              <BackwardOutlined />
            </div>
          </Col>
          <Col>
            <div className="controlIcons">
              <CaretRightOutlined />
            </div>
          </Col>
          <Col>
            <div className="controlIcons">
              <ForwardOutlined />
            </div>
          </Col>
        </Row>



      </Col>
    </Row>
  );
}

export default App;
