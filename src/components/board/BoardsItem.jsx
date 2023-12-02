import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function BoardsItem() {
  const boards = useSelector((state) => state.boards);
  const dispatch = useDispatch();

  const deleteBoard = (board) => {
    board.listId.forEach((id) => {
      dispatch({ type: "REMOVE_LIST", payload: { listId: id } });
    });
    board.taskId.forEach((id) => {
      dispatch({ type: "REMOVE_TASK", payload: { taskId: id } });
    });
    dispatch({ type: "REMOVE_BOARD", payload: { boardId: board.id } });
  };

  return (
    <div className="boards-item">
      {boards.map((board) => (
        <Link to={"list/" + board.id} key={board.id}>
          <div className="card">
            <button
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                deleteBoard(board);
              }}
              type="button"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>
            <div className="title">{board.title}</div>
            <div className="date">{Date(board.id)}</div>
            <div className="left">
              Total List <small>{board.listId.length}</small> and Total Task
              <small>{board.taskId.length}</small>Left.
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
