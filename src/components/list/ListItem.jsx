import React, { useState, useMemo, memo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddForm from "../AddForm";
import "./list.css";
import ListCard from "./ListCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const ListItem = () => {
  const [formMode, setFormMode] = useState(false);
  const [title, setTitle] = useState(null);
  const { id } = useParams();

  // Memoize the result of useSelector to avoid unnecessary re-renders
  const list = useSelector((state) => state.list);

  const dispatch = useDispatch();

  const hanldeAddForm = (e) => {
    e.preventDefault();
    const listId = Date.now() + "";
    if (title) {
      dispatch({
        type: "ADD_LIST",
        payload: { listId: listId, title: title, boardId: id },
      });
      dispatch({
        type: "ADD_LIST_ID_TO_BOARD",
        payload: { boardId: id, listId: listId },
      });
      setTitle(null);
      setFormMode(false);
      e.target.reset();
    } else {
      alert("Please enter a title.");
    }
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch({
      type: "MOVE_TASK",
      payload: {
        source: source,
        destination: destination,
        draggableId: draggableId,
      },
    });
  };

  // Memoize the list result to avoid unnecessary re-renders
  const filteredList = useMemo(
    () => list.filter((item) => item.boardId === id),
    [list, id]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="list-grid">
        {filteredList.map((item) => (
          <Droppable key={item.id} droppableId={item.id}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <ListCard context={{ id, item }} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
        {formMode ? (
          <AddForm
            context={{
              hanldeAddForm,
              title,
              setTitle,
              setEditMode: setFormMode,
            }}
          />
        ) : (
          <button
            className="add-list-btn"
            onClick={() => {
              setFormMode(true);
            }}
            type="button"
          >
            + add another list
          </button>
        )}
      </div>
    </DragDropContext>
  );
};

export default memo(ListItem);
