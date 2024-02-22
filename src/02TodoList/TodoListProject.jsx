import React, { useState, useRef } from "react";
import mockTodo from "./mockTodo.json"; //json파일
import "../App.css";
// const mockTodo =[{},{}];가능

function TodoListProject(props) {
  const [todo, setTodo] = useState(mockTodo);
  let idRef = useRef(4);
  const onCreate = (content) => {
    const newItem = {
      id: idRef.current, //idRef.current는 idRef.현재값을 가져옴
      isDone: false,
      content: content,
      createDate: new Date().getTime(),
    };
    setTodo([...todo, newItem]); //newItem를 추가해 todo를 update
    idRef = idRef.current + 1; //idRef의 현재값을 1 증가시킴
  };
  const onUpdate = (targetId) => {
    const newTodo = todo.map((item) => {
      item.id === targetId ? { ...item, isDone: !item.isDone } : item;
    });
    setTodo(newTodo);
  };
  const onDelete = (targetId) => {
    setTodo(todo.filter((item) => item.id !== targetId));
  };
  const Header = () => {
    return (
      <div className="Header">
        <h3> 오늘은 📩</h3>
        <h1> {new Date().toDateString()}</h1>
      </div>
    );
  };

  const TodoEditor = ({ onCreate }) => {
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
  const TodoList = ({ todo, onUpdate, onDelete }) => {
    const [search, setSearch] = useState("");
    const getSearchResult = () => {
      return search === "" //검색어가 없을때
        ? todo //전체리스트
        : todo.filter((item) => item.content.includes(search)); //검색어가 포함된 content를 보여줌.
    };
    return (
      <div className="TodoList">
        <h4>Todo List🎭 </h4>
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
            return (
              <TodoItem
                key={item.id}
                {...item}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            );
          })}
        </div>
      </div>
    );
  };
  //props를 구조분해 할당
  const TodoItem = ({ id, content, isDone, createDate, onUpdate }) => {
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
          <input ref={inRef} type="checkbox" checked={isDone} />
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
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelte={onDelete} />
    </div>
  );
}
export default TodoListProject;
