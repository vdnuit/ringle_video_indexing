import logo from "./logo.svg";
import "./App.css";
import ReactPlayer from "react-player";
import { useState, useRef, useCallback, useEffect } from "react";
import { wait } from "@testing-library/user-event/dist/utils";
import Subtitle from "./assets/subtitle.json";
import HeaderImg from "./assets/Group 25.png";
import TutorImg from "./assets/TutorImg.png";
import SearchIcon from "./assets/SearchIcon.png";
import BookmarkIcon from "./assets/BookmarkIcon.png";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;
const LS = styled.div`
  width: 60%;
  margin-top: 4%;
  margin-left: 15%;
  h1 {
    margin-top: 30px;
    font-family: "Inter";
    font-size: 20px;
    line-height: 30px;
    font-weight: 700;
  }
`;
const RS = styled.div`
  margin: 4%;

  margin-right: 15%;
  width: 50%;
`;
const Search = styled.div`
  display: flex;
  input {
    width: 100%;
    height: 39px;
    background: #f4f4f4;
    border: 1px solid #c9c9c9;
    border-radius: 6px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    /* identical to box height, or 175% */

    letter-spacing: -0.3px;
    padding-left: 25px;
    color: #818892;
  }
  img {
    z-index: 10;
    width: 20px;
    height: 20px;
    margin-left: -42px;
    margin-top: 10px;
  }
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

const Answers = styled.div`
  padding: 3px;
  margin-left: -3px;
  height: 230px;
  width: 106%;
  margin-top: 13px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  button {
    margin-top: 15px;
    border: none;
    background: #f4f1f1;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    div {
      diaplay: flex;
      justify-content: space-between;
      flex-direction: row;
      img {
        margin: 10px;
        float: right;
        width: 14px;
        height: 18px;
      }
      h5 {
        margin-top: 8px;
        margin-left: -10px;
        width: 100px;
        font-family: "Inter";
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 28px;
        /* identical to box height, or 200% */

        letter-spacing: -0.3px;

        color: #6e3ed3;
      }
    }
  }
`;
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
      return <p>Search</p>;
    }
    // console.log(e.input);
    return e.input.map((i) => (
      <>
        <button
          onClick={(e) => {
            props.onTime(time2sec(i.start.substring(0, 8)), e);
          }}
        >
          <div>
            <img src={BookmarkIcon} />
            <h5>{i.start.substring(0, 8)}</h5>
          </div>
          <p>{i.subtitle}</p>
          {/* 특정문자열만 색 바꾸는 코드: 줄이 바뀌어버림 */}
          {/* <p>{i.subtitle.substring(0, i.subtitle.indexOf(search))}</p>
          <p>{search}</p>
          <p>
            {i.subtitle.substring(i.subtitle.indexOf(search) + search.length)}
          </p> */}
        </button>
      </>
    ));
  };

  return (
    <>
      {/* 검색창 구역 */}
      <div>
        {/* 검색창 */}
        <Search>
          <input onChange={onSearch} value={search} placeholder="Search" />
          <img src={SearchIcon} />
        </Search>
        <Answers class="answers">
          <Answer input={answers} />
        </Answers>
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
          <h3>개요</h3>
          <p>
            2/8 (수)에 진행된 ‘영자 신문 읽기반’ 첫 수업의 맛보기 영상을
            시청해보세요!
            <br />
            “2월 영자 신문 읽기반” 모집은 마감되었습니다. <br />
            3월에는 영어 원서 읽기, 4월에는 영자 신문 읽기로 돌아올 예정이오니
            많은 관심 부탁드립니다.
            <br />
            📰 Read with Me: Articles
            <br />
            2023년 2월, 지금 가장 핫한 영국/미국 기사 함께 읽어요.
            <br />
            2월 Read with Me에서는 총 4주 간 미국과 영국의 주요 트렌드를 알 수
            있는 최신 기사 4편을 원어민 튜터와 읽고 주제와 관련된 고급 영어
            표현과 배경지식을 같이 소화해봅니다.
            <br />
            *각 LIVE 강의에서 다룰 기사와 학습 자료는 프로그램 신청자 분들에
            한해서 제공드리며, 강의 입장 링크 또한 각 세션 전 별도로 전달됩니다.
            <br />
            *총 4주간 이어지는 하나의 프로그램입니다. 개별 LIVE 세션 구매는
            불가하오니 참고 부탁드립니다. <br />
            링글 Pick! 2월 읽어볼 주제와 튜터 라인업
            <br />
          </p>
        </LS>

        {/* 우측 리스트 */}
        <RS>
          <Index onTime={onTime} />
        </RS>
      </Container>
    </>
  );
}
