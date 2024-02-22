import React, {
  useCallback,
  useState,
  useReducer,
  useRef,
  useMemo,
  useContext,
} from "react";
import "../App.css";
import mockTodo from "../mockTodo.json"; //json파일
// const mockTodo =[{},{}];가능
const TodoContext = React.createContext(); //[1] Context생성
function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [...state, action.data]; //reducer반환값이 state업데이트
    }
    case "UPDATE": {
      return state.map((item) =>
        item.id === action.tId ? { ...item, isDone: !item.isDone } : item,
      );
    }
    case "DELETE": {
      return state.filter((item) => {
        return item.id != action.tId; //{}사용시 return사용
      });
    }
    default:
      return state;
  }
}
function TodoContextAPI(props) {
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  let idRef = useRef(4);
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current, //idRef.current는 idRef.현재값을 가져옴
        isDone: false,
        content: content,
        createDate: new Date().getTime(),
      },
    });
    idRef = idRef.current + 1; //idRef의 현재값을 1 증가시킴
  };
  const onUpdate = useCallback((targetId) => {
    //최적화:렌더링시 함수 재실행 방지
    dispatch({
      type: "UPDATE",
      tId: targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    //최적화:렌더링시 함수 재실행 방지
    dispatch({
      type: "DELETE",
      tId: targetId,
    });
  }, []);

  const Header = () => {
    return (
      <div className="Header">
        <h3> 오늘은 📩</h3>
        <h1> {new Date().toDateString()}</h1>
      </div>
    );
  };
  const OptHeader = React.memo(Header); //최적화
  
  const TodoEditor = () => {
    const { onCreate } = useContext(TodoContext);
    const [content, setContent] = useState("");
    const inputRef = useRef();
    const onSubmit = () => {
      if (!content) {
        inputRef.current.focus();
        return;
      }
      onCreate(content);
      setContent("");
      console.log(todo);
    };
    return (
      <div className="TodoEditor">
        <h3>새로운 Todo 작성하기🧨</h3>
        <div className="editor_wrapper">
          <input
            ref={inputRef}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            onKeyDown={(e) => {
              e.key === "Enter" && onSubmit();
            }}
            placeholder="할 일을 입력해주세요."
          />
          <button onClick={onSubmit}>추가</button>
        </div>
      </div>
    );
  };
  const TodoList = () => {
    //{/* todo, onUpdate, onDelete*/ } 풀옵스 삭제하고 useContext사용
    const { todo } = useContext(TodoContext);
    const [search, setSearch] = useState("");
    const getSearchResult = () => {
      return search === "" //검색어가 없을때
        ? todo //전체리스트
        : todo.filter((item) => item.content.includes(search)); //검색어가 포함된 content를 보여줌.
    };

    const analyzeTodo = useMemo(() => {
      //최적화:todo배열이 변동이 있을때만, 콜백함수 실행
      const totalCount = todo.length;
      const doneCount = todo.filter((item) => item.isDone).length;
      const notDoneCount = totalCount - doneCount;
      return {
        totalCount,
        doneCount,
        notDoneCount,
      };
    }, [todo]);
    const { totalCount, doneCount, notDoneCount } = analyzeTodo; //useMemo는 값을 변환함.
    return (
      <div className="TodoList">
        <h4>Todo List🎭 </h4>
        <div>
          <div>총개수 : {totalCount}</div>
          <div>완료된 할일 : {doneCount} </div>
          <div>미완료된 할일 : {notDoneCount}</div>
        </div>
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="searchbar"
          placeholder="검색어 입력"
        />
        <div>
          {getSearchResult().map((item) => {
            return <TodoItem key={item.id} {...item} />;
          })}
        </div>
      </div>
    );
  };
  TodoList.defaultProps = {
    todo: [],
  }; //defaultProps는 TodoList의 todo가 없을때 todo를 []로 설정
  //props를 구조분해 할당
  const TodoItem = ({ id, content, isDone, createDate }) => {
    const {onUpdate,onDelete} = useContext(TodoContext);
    const inRef = useRef();
    const onChangeCheck = () => {
      onUpdate(id);
    };
    const onClickDelete = () => {
      onDelete(id);
    };
    return (
      <div className="TodoItem">
        <div className="checkbox_col">
          <input
            ref={inRef}
            type="checkbox"
            checked={isDone}
            onClick={onChangeCheck}
          />
        </div>
        <div className="title_col">{content} </div>
        <div className="date_col">
          {new Date(createDate).toLocaleDateString()}
        </div>
        <div className="btn_col">
          <button onClick={onClickDelete}>삭제</button>
        </div>
      </div>
    );
  };
  return (
    <div className="App">
      <OptHeader />
      {/*[2]Context사용할 컴포넌트를 감싸고 value로 설정 */}
      <TodoContext.Provider value={{ todo, onCreate, onUpdate, onDelete }}>
        <TodoEditor />
        <TodoList />
      </TodoContext.Provider>
    </div>
  );
}
export default TodoContextAPI;
