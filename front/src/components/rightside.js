import { useState, useRef, useCallback, useEffect } from "react";
import Subtitle from "../assets/subtitle.json";
import SummarizeIndex from "../assets/summarizeIndex.json";
import SearchIcon from "../assets/SearchIcon.png";
import BookmarkIcon from "../assets/BookmarkIcon.png";
import styled from "styled-components";
import PlayIcon from "../assets/PlayIcon.png";
import XIcon from "../assets/XIcon.png";
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
    line-height: 34px;
    /* identical to box height, or 175% */

    letter-spacing: -0.3px;
    padding-left: 25px;
    color: #818892;
    padding-top: 3px;
  }
  img {
    z-index: 10;
    width: 20px;
    height: 20px;
    margin-left: -42px;
    margin-top: 12px;
  }
`;

const Answers = styled.div`
  padding: 3px;
  height: 230px;
  width: 105%;
  margin-top: 13px;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  button {
    &:hover {
      background: #dbdbdb;
      box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.25);
    }
    margin-top: 15px;
    border: none;
    background: #f4f1f1;
    width: 100%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    div {
      diaplay: flex;
      justify-content: space-between;
      flex-direction: row;
      img {
        margin: 8px;
        margin-top: 6px;
        margin-right: 11px;
        float: right;
        width: 14px;
        height: 18px;
      }
      h5 {
        margin-top: 10px;
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
    p {
      margin-left: 14px;
      text-align: left;
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      margin-bottom: 15px;
      /* or 200% */
      margin-top: 2px;
      letter-spacing: -0.3px;

      color: #878b91;
    }
  }
`;
const ClipList = styled.div`
  div {
    margin-top: 30px;
    width: 106%;
    height: 50px;
    background: linear-gradient(
      91.87deg,
      rgba(110, 62, 211, 0.8) 14.9%,
      rgba(121, 74, 182, 0.8) 59.19%,
      rgba(110, 62, 211, 0.8) 108.35%
    );
    box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 11px;
  }
  h2 {
    margin: 25px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    font-family: "Inter";
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 53px;
    /* identical to box height, or 175% */

    letter-spacing: -0.3px;

    color: #ffffff;
  }
  button {
    &:hover {
      background: #dbdbdb;
      box-shadow: inset 0px 2px 4px rgba(0, 0, 0, 0.25);
    }
    margin-top: 15px;
    border: none;
    background: #f4f1f1;
    width: 106%;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    padding-top: 5px;
    padding-bottom: 15px;
    p {
      margin: 10px;
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      /* identical to box height, or 200% */

      letter-spacing: -0.3px;
      text-align: left;
      color: #535353;
    }
    label {
      font-family: "Inter";
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      /* identical to box height, or 200% */

      letter-spacing: -0.3px;

      color: #878b91;
      text-align: left;
      margin-right: 80%;
    }
    img {
      padding-top: 3px;
      margin-bottom: -3px;
      margin-right: 5px;
      width: 15px;
    }
  }
`;
const Summarizes = styled.div``;
export default function Index(props) {
  //검색창 온오프
  const [on, setOn] = useState(false);

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
  const Summarize = () => {
    return Summarize.indexes.map((i) => (
      <>
        <button
          onClick={(e) => {
            props.onTime(time2sec(i.start.substring), e);
          }}
        >
          <div>
            <img src={BookmarkIcon} />
            <h5>{i.start.substring}</h5>
          </div>
          <p>{i.index}</p>
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
          {on ? (
            <img
              onClick={() => {
                setOn(false);
              }}
              src={XIcon}
            />
          ) : (
            <img
              onClick={() => {
                setOn(true);
              }}
              src={SearchIcon}
            />
          )}
        </Search>
        {on ? (
          <Answers class="answers">
            <Answer input={answers} />
          </Answers>
        ) : (
          <Summarizes>
            <Summarize />
          </Summarizes>
        )}
      </div>
      {/* 클립 구역 */}
      <ClipList>
        <div>
          <h2>Clip List</h2>
        </div>
        <button>
          <p>
            Prince Harry's autobiography 'Spare'
            <br />
            (Sneak Peak)
          </p>
          <img src={PlayIcon} />
          <label>14:19</label>
        </button>
      </ClipList>
    </>
  );
}
