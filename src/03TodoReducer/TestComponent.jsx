import { useReducer, React } from "react";
import { useEffect } from "react";
function reducer(state, action) {
  switch (action.type) {
    case "INC":
      return state + action.data;
    case "DEC":
      return state - action.data;
    case "INIT":
      return action.data;
    default:
      return state;
  }
}
function TestComponent() {
  //[state, 상태변화전달함수] =생성자(상태변화함수,state초기값)
  const [count, dispatch] = useReducer(reducer, 0); //리듀서함수, state초깃값
  return (
    <div>
      <h4>테스트 컴포넌트 </h4>
      <p>count: {count}</p>
      <button onClick={() => dispatch({ type: "INC", data: 1 })}>증가</button>

      <button onClick={() => dispatch({ type: "DEC", data: 1 })}>감소</button>
      <button onClick={() => dispatch({ type: "INIT", data: 0 })}>
        초기화
      </button>
    </div>
  );
}
export default TestComponent;
