import React, { useState, useRef } from "react";
function UseRefSample(props) {
  const [text, setText] = useState("");
  const [confirm, setConfirm] = useState(false);
  const textRef = useRef();
  const handleOnChange = (e) => {
    setText(e.target.value);
  };
  const handleOnClick = () => {
    setConfirm(true);
   // alert(text);
    if(text.length <5){
      textRef.current.focus(); //useRef사용하여 포커스 하기
    }
    
  };
  const cancelClick = () => {
    //useState로 초기화하기
    // setText("");
    // setConfirm(false);
    textRef.current.value = "" ;//useRef로 초기화하기
    
    
  };
  return (
    <div>
      <input ref = {textRef} value={text} onChange={handleOnChange} />
      <button onClick={handleOnClick}>작성완료</button>
      <button onClick={cancelClick}>취소</button>
      {confirm && <div> 입력한 text는 {text}입니다.</div>}
    </div>
  );
}
export default UseRefSample;
