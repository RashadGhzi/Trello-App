import React, { useState, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./task.css";
import AddForm from "../AddForm";
import { Draggable } from "react-beautiful-dnd";

const TaskItem = (props) => {
  const dispatch = useDispatch();
  const { listAllTask } = props.context;
  const tasks = useSelector((state) => state.tasks);
  const [taskId, setTaskId] = useState(null);
  const [title, setTitle] = useState(null);

  const hanldeAddForm = (e) => {
    e.preventDefault();
    dispatch({ type: "CHANGE_TASK_TITLE", payload: { taskId, title: title } });
    setTaskId(null);
    setTitle(null);
  };

  console.log("reordering task")

  return (
    <div className="tasks-item">
      {listAllTask
        ?.map((task_id) => tasks.find((ele) => ele.id === task_id))
        .map((item, index) =>
          taskId === item.id ? (
            <AddForm
              context={{
                hanldeAddForm,
                title,
                setTitle,
                setEditMode: setTaskId,
              }}
            />
          ) : (
            <Draggable key={item.id} draggableId={item.id} index={index}>
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <div
                    className="card task-card"
                    onClick={() => {
                      setTitle(item.title);
                      setTaskId(item.id);
                    }}
                    key={item.id}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="title">{item.title}</div>
                    <div className="date">{Date(item.id)}</div>
                  </div>
                </div>
              )}
            </Draggable>
          )
        )}
    </div>
  );
};

export default memo(TaskItem);
