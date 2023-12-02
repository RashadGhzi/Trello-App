import React from "react";
import { useDispatch } from "react-redux";
import "./board.css";

export default function BoardForm() {
  const dispatch = useDispatch();

  const handleBoardSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    if (title){
      dispatch({ type: "ADD_BOARD", payload: { title } });
      e.target.reset();
    }else{
      alert("Title must contain characters.")
    }
  };
  return (
    <form method="post" onSubmit={handleBoardSubmit} className="board-form">
      <input
        type="text"
        name="title"
        id=""
        placeholder="enter your board name"
      />
      <button type="submit">add board</button>
    </form>
  );
}
