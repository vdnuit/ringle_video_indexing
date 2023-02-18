import logo from "./logo.svg";
import "./App.css";
import ReactPlayer from "react-player";
import { useState, useRef, useCallback, useEffect } from "react";
import HeaderImg from "./assets/Group 25.png";
import TutorImg from "./assets/TutorImg.png";
import PlaylistImg from "./assets/PlaylistImg.png";
import styled from "styled-components";
import Index from "./components/rightside.js";
const Container = styled.div`
  display: flex;
`;
const LS = styled.div`
  width: 60%;
  margin-top: 3%;
  margin-left: 15%;
  h1 {
    margin-top: 30px;
    font-family: "Inter";
    font-size: 20px;
    line-height: 30px;
    font-weight: 700;
  }
  p {
    font-family: "Inter";
    color: rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    font-weight: 300;
    font-style: normal;
    font-variant: normal;
    text-decoration: none;
    vertical-align: baseline;
    white-space: pre-wrap;
    line-height: 25px;
  }
`;
const RS = styled.div`
  margin-top: 3%;
  margin-left: 2%;
  margin-right: 15%;
  width: 50%;
`;

const Profile = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  display: flex;
  height: 40px;
  font-family: "Inter";

  h4 {
    margin-left: 20px;
    font-size: 16px;
    line-height: 24px;
  }
  p {
    margin-left: 20px;

    --tw-text-opacity: 1;
    color: rgb(134 154 184 / var(--tw-text-opacity));
    font-size: 14px;
    line-height: 21px;
  }
`;

export default function App() {
  //동영상 재생에 필요
  const [playing, setPlaying] = useState(false);
  const [playIndex, setPlayIndex] = useState(0);
  const player = useRef();

  //자막 링크
  const SUBTITLE =
    "https://ringlecontents.s3.ap-northeast-2.amazonaws.com/webinar/caption/628/1.vtt";

  //자막 넣기 위한 코드
  const [trackLang, setTrackLang] = useState("en");

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

  //택 1 탭
  const [tab, setTab] = useState(0);

  const Tabs = styled.div`
    display: flex;
  `;

  const Tab = styled.button`
    &:hover {
      background-color: #f9fbfd;
      color: #7462e0;
    }
    font-family: "Inter";
    height: 47px;
    width: 150px;
    border: none;
    border-bottom-style: solid;
    border-bottom-width: 2px;

    text-align: center;
    text-transform: uppercase;
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 20px;
    margin-top: 10px;
    padding: auto;
    background-color: ${(props) => (props.isActive ? "#EDF0F5" : "#FFFFFF")};
    color: ${(props) => (props.isActive ? "#7462E0" : "#8E8E8E")};
  `;

  function tabChange(num, e) {
    setTab(num);
  }

  return (
    <>
      {/* 헤더 */}
      <img src={HeaderImg} style={{ width: "100%" }} />
      <Container>
        <LS>
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

          {/* 하단 텍스트 */}
          <h1>🔁2월 영자 신문 읽기반 미리보기: 해리 왕자의 자서전 'Spare'</h1>
          <Profile>
            <img src={TutorImg} style={{ width: "40px" }} alt="Moorea" />
            <div>
              <h4>Moorea</h4>
              <p>University of Cambridge</p>
            </div>
          </Profile>
          <Tabs>
            <Tab onClick={(e) => tabChange(0, e)} isActive={tab === 0}>
              개요
            </Tab>
            <Tab onClick={(e) => tabChange(1, e)} isActive={tab === 1}>
              MY PLAYLIST
            </Tab>
          </Tabs>
          {tab === 0 ? (
            <p>
              2/8 (수)에 진행된 ‘영자 신문 읽기반’ 첫 수업의 맛보기 영상을
              시청해보세요!
              <br />
              “2월 영자 신문 읽기반” 모집은 마감되었습니다. <br />
              3월에는 영어 원서 읽기, 4월에는 영자 신문 읽기로 돌아올 예정이오니
              많은 관심 부탁드립니다.
              <br />
              <br />
              📰 Read with Me: Articles
              <br />
              <br />
              2023년 2월, 지금 가장 핫한 영국/미국 기사 함께 읽어요.
              <br />
              2월 Read with Me에서는 총 4주 간 미국과 영국의 주요 트렌드를 알 수
              있는 최신 기사 4편을 원어민 튜터와 읽고 주제와 관련된 고급 영어
              표현과 배경지식을 같이 소화해봅니다.
              <br />
              *각 LIVE 강의에서 다룰 기사와 학습 자료는 프로그램 신청자 분들에
              한해서 제공드리며, 강의 입장 링크 또한 각 세션 전 별도로
              전달됩니다.
              <br />
              *총 4주간 이어지는 하나의 프로그램입니다. 개별 LIVE 세션 구매는
              불가하오니 참고 부탁드립니다. <br />
              <br />
              링글 Pick! 2월 읽어볼 주제와 튜터 라인업
              <br />
              <br />
              <br />
            </p>
          ) : (
            <img
              src={PlaylistImg}
              style={{ width: "100%", marginBottom: "40px" }}
            />
          )}
        </LS>

        {/* 우측 리스트 */}
        <RS>
          <Index onTime={onTime} />
        </RS>
      </Container>
    </>
  );
}
