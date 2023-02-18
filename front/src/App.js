import logo from "./logo.svg";
import "./App.css";
import ReactPlayer from "react-player";
import { useState, useRef, useCallback, useEffect } from "react";
import { wait } from "@testing-library/user-event/dist/utils";

export default function App() {
  //동영상 재생에 필요
  const [playing, setPlaying] = useState(false);
  const [playIndex, setPlayIndex] = useState(0);
  const player = useRef();

  //검색창 처리
  const [search, setSearch] = useState("");
  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  //자막 링크
  const SUBTITLE =
    "https://ringlecontents.s3.ap-northeast-2.amazonaws.com/webinar/caption/628/1.vtt";
  const [trackLang, setTrackLang] = useState();
  //자막 넣기 위한 코드
  useEffect(() => {
    const textTracks = player.current.getInternalPlayer()?.textTracks;

    for (var i = 0; textTracks?.length && i < textTracks.length; i++) {
      // For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
      if (textTracks[i].language === trackLang) {
        textTracks[i].mode = "showing";
      } else {
        textTracks[i].mode = "hidden";
      }
    }
  }, [trackLang]);

  //재생 목록(클립 여러 개일 때 대비)
  const playList = [
    {
      index: 1,
      url: "https://ringlecontents.s3.ap-northeast-2.amazonaws.com/webinar/video/628/1.mp4",
    },
  ];

  //타임스탬프에 따라 이동
  const [time, setTime] = useState(0);
  const on40 = () => {
    setTime(40 + 1);
    // 야매로 중복클릭 가능하게 수정함
    setTimeout(function () {
      setTime(40);
    }, 1);
  };

  return (
    <div className="App">
      <h1>링글 동영상 데모</h1>
      <input
        onChange={onSearch}
        value={search}
        placeholder="검색할 단어를 입력하세요"
      />
      <ReactPlayer
        ref={player}
        url={playList[playIndex].url + `#t=${time}`}
        controls
        muted
        progressInterval={1000}
        pip={true}
        config={{
          file: {
            attributes: {
              crossOrigin: "anonymous",
            },
            tracks: [
              {
                kind: "subtitles",
                src: SUBTITLE,
                srcLang: "en",
                default: false,
                mode: trackLang === "en" ? "showing" : "hidden",
              },
            ],
          },
        }}
        playing={playing}
        loop
      />
      {trackLang}
      <button onClick={() => setTrackLang("en")}>자막 키기</button>
      <button onClick={() => setTrackLang()}>자막 끄기</button>

      <button onClick={() => setPlaying(!playing)}>
        {playing ? "정지" : "재생"}
      </button>
      <button onClick={on40}>30</button>
    </div>
  );
}
