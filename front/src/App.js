import logo from "./logo.svg";
import "./App.css";
import ReactPlayer from "react-player";
import { useState, useRef, useCallback, useEffect } from "react";
import { wait } from "@testing-library/user-event/dist/utils";
import Subtitle from "./assets/subtitle.json";

function Index(props) {

  //검색창 처리
  const [search, setSearch] = useState("");

  useEffect(() => {
    console.log(search);
    searchSub(search);
  }, [search]);
  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  //자막에서 검색어 찾기
  const [answers, setAnswers] = useState();
  const searchSub = (value) => {
    var corrects = [];
    for (var i = 0; i < Subtitle.subtitles.length; i++) {
      if (Subtitle.subtitles[i].subtitle.indexOf(search) !== -1) {
        corrects.push(Subtitle.subtitles[i]);
      }
    }
    setTimeout(function () {
      setAnswers(corrects);
      // console.log(corrects);
    }, 5);
  };
  //시간->초
  const time2sec = (e) => {
    console.log(e);
    var hour = e.substring(0, 2);
    var minute = e.substring(3, 5);
    var second = Number(e.substring(6, 8));
    second += minute * 60;
    second += hour * 60 * 60;
    console.log(hour);
    console.log(minute);
    console.log(second);
    return second;
  };
  //검색어 배열 출력
  const Answer = (e) => {
    if (e.input === undefined) {
      return <p>검색어를 입력해주세요.</p>;
    }
    // console.log(e.input);
    return e.input.map((i) => (
      <>
        <button
          onClick={(e) => {
            props.onTime(time2sec(i.start.substring(0, 8)), e);
          }}
        >
          <p>{i.subtitle}</p>
          <p>{i.start.substring(0, 8)}</p>
        </button>
      </>
    ));
  };

  return (
    <>
      {/* 검색창 구역 */}
      <div>
        {/* 검색창 */}
        <input
          onChange={onSearch}
          value={search}
          placeholder="검색할 단어를 입력하세요"
        />
        <Answer input={answers} />
      </div>
      {/* 클립 구역 */}
      <div>
        <h2>클립 목록</h2>
        <div>
          <p>
            Prince Harry's <br />
            autobiography 'Spare'
            <br />
            (Sneak Peak)
          </p>
          <label>14:19</label>
        </div>
      </div>
    </>
  );
}

export default function App() {
  //동영상 재생에 필요
  const [playing, setPlaying] = useState(false);
  const [playIndex, setPlayIndex] = useState(0);
  const player = useRef();

  //자막 링크
  const SUBTITLE =
    "https://ringlecontents.s3.ap-northeast-2.amazonaws.com/webinar/caption/628/1.vtt";

  //자막 넣기 위한 코드
  const [trackLang, setTrackLang] = useState();

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
  const onTime = (num, e) => {
    setTime(num + 1);
    // 야매로 중복클릭 가능하게 수정함
    setTimeout(function () {
      setTime(num);
    }, 1);
  };

  return (
    <div className="App">
      {/* 헤더 */}
      <h1>링글 해커톤 영상 인덱싱 데모</h1>
      {/* 동영상 */}
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

      {/* 우측 리스트 */}
      <Index onTime={onTime} />
      {/* 하단 텍스트 */}
      <h1>🔁2월 영자 신문 읽기반 미리보기: 해리 왕자의 자서전 'Spare'</h1>
      <div>
        <img
          src="https://d38emex6h5e12i.cloudfront.net/avatar/93235ffca940a2234653b2d31b4acd564fdd0c878d2e08fe6e2a3f7ef3c6a5d5_e0151cc118c8.jpg"
          style={{ width: "50px" }}
          alt="Moorea"
        />
        <div>
          <p>Moorea</p>
          <p>University of Cambridge</p>
        </div>
      </div>
      <h3>개요</h3>
      <p>
        2/8 (수)에 진행된 ‘영자 신문 읽기반’ 첫 수업의 맛보기 영상을
        시청해보세요!
        <br />
        “2월 영자 신문 읽기반” 모집은 마감되었습니다. <br />
        3월에는 영어 원서 읽기, 4월에는 영자 신문 읽기로 돌아올 예정이오니 많은
        관심 부탁드립니다.
        <br />
        📰 Read with Me: Articles
        <br />
        2023년 2월, 지금 가장 핫한 영국/미국 기사 함께 읽어요.
        <br />
        2월 Read with Me에서는 총 4주 간 미국과 영국의 주요 트렌드를 알 수 있는
        최신 기사 4편을 원어민 튜터와 읽고 주제와 관련된 고급 영어 표현과
        배경지식을 같이 소화해봅니다.
        <br />
        *각 LIVE 강의에서 다룰 기사와 학습 자료는 프로그램 신청자 분들에 한해서
        제공드리며, 강의 입장 링크 또한 각 세션 전 별도로 전달됩니다.
        <br />
        *총 4주간 이어지는 하나의 프로그램입니다. 개별 LIVE 세션 구매는
        불가하오니 참고 부탁드립니다. <br />
        링글 Pick! 2월 읽어볼 주제와 튜터 라인업
        <br />
      </p>

      {/* 임시버튼들 */}
      <button onClick={() => setTrackLang("en")}>자막 키기</button>
      <button onClick={() => setTrackLang()}>자막 끄기</button>

      <button onClick={() => setPlaying(!playing)}>
        {playing ? "정지" : "재생"}
      </button>
      <button
        onClick={(e) => {
          onTime(30, e);
        }}
      >
        30
      </button>
    </div>
  );
}
