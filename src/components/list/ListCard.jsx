import React, { memo, useCallback, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import TaskItem from "../task/TaskItem";
import AddForm from "../AddForm";
import "./list.css";

const ListCard=(props)=> {
  const { id, item } = props.context;

  const dispatch = useDispatch();
  const [editId, setEditId] = useState(null);
  const [title, setTitle] = useState(null);
  const [listId, setListId] = useState(null);

  const hanldeAddForm = useCallback(
    (e) => {
      e.preventDefault();
      if (title) {
        const taskId = Date.now() + "";
        dispatch({
          type: "ADD_TASK",
          payload: { title, taskId, listId, boardId: id },
        });
        dispatch({
          type: "ADD_TASK_ID_TO_LIST",
          payload: { listId, taskId },
        });
        dispatch({
          type: "ADD_TASK_ID_TO_BOARD",
          payload: { boardId: id, taskId },
        });

        setTitle(null);
        setEditId(null);
        setListId(null);
      } else {
        alert("Please enter a title.");
      }
    },
    [dispatch, title, listId, id]
  );

  const handleDeleteList = useCallback(() => {
    dispatch({ type: "REMOVE_LIST", payload: { listId: item.id } });
    dispatch({
      type: "REMOVE_LIST_ID_FROM_BOARD",
      payload: { boardId: id, listId: item.id },
    });
    item.taskId.forEach((element) => {
      dispatch({ type: "REMOVE_TASK", payload: { taskId: element } });
      dispatch({
        type: "REMOVE_TASK_ID_FROM_BOARD",
        payload: { boardId: id, taskId: element },
      });
    });
  }, [dispatch, item.id, item.taskId, id]);

  const totalTask = useMemo(() => {
    return item.taskId.length;
  }, [item.taskId]);

  const listAllTask = useMemo(() => {
    return item.taskId;
  }, [item.taskId]);

  return (
    <div className="card list-card" key={item.id}>
      <button type="button" onClick={() => {}}></button>
      <button type="button" onClick={handleDeleteList}>
        <i class="fa-solid fa-xmark"></i>
      </button>
      <div className="title list-card-title">{item.title}</div>
      <TaskItem context={{ listAllTask }} />
      {editId === item.id ? (
        <AddForm
          context={{ hanldeAddForm, title, setTitle, setEditMode: setEditId }}
        />
      ) : (
        <button
          className="add-task-btn"
          onClick={() => {
            setEditId(item.id);
            setListId(item.id);
          }}
          type="button"
        >
          + add task
        </button>
      )}
      <div className="date">{Date(item.id)}</div>
      <div className="left">
        Total task <small>{totalTask}</small>
      </div>
    </div>
  );
}

export default memo(ListCard);