import logo from "./logo.svg";
import "./App.css";
import ReactPlayer from "react-player/lazy";
import { useState, useRef, useCallback } from "react";
import { wait } from "@testing-library/user-event/dist/utils";

const VideoPlayer = ({}) => {
  const [playIndex, setPlayIndex] = useState(0);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);
  const [time, setTime] = useState(0);
  const playerRef = useRef();
  const onTime = () => {
    setTime(30);
  };
  const on40 = () => {
    setTime(40 + 1);
    // 야매로 중복클릭 가능하게 수정함
    setTimeout(function () {
      setTime(40);
    }, 1);
  };
  const playList = [
    {
      index: 1,
      url: "https://ringlecontents.s3.ap-northeast-2.amazonaws.com/webinar/video/604/1.mp4",
    },
  ];

  if (playList === null) return <p>Loading...</p>;

  return (
    <>
      <h2>Player Test</h2>
      <ReactPlayer
        // @ts-ignore
        ref={playerRef}
        // @ts-ignore
        url={playList[playIndex].url + `#t=${time}`}
        playing
        controls
        muted
        progressInterval={1000}
        pip={true}
        width={"800px"}
        height={"500px"}
      />
      <button onClick={onTime}>20</button>
      <button onClick={on40}>30</button>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <VideoPlayer />
    </div>
  );
}

export default App;
