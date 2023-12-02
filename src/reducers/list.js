const listReducer = (list = [], action) => {
  switch (action.type) {
    case "ADD_LIST":
      const new_list = {
        id: action.payload.listId,
        title: action.payload.title,
        boardId: action.payload.boardId,
        taskId: [],
      };
      return [...list, new_list];

    case "REMOVE_LIST":
      return list.filter((list) => list.id !== action.payload.listId);

    case "CHANGE_LIST_TITLE":
      return list.map((list) =>
        list.id === action.payload.listId
          ? { ...list, title: action.payload.title }
          : list
      );

    case "CHANGE_BOARD_ID_OF_LIST":
      return list.map((list) =>
        list.id === action.payload.listId
          ? { ...list, boardId: action.payload.boardId }
          : list
      );

    case "ADD_TASK_ID_TO_LIST":
      return list.map((list) =>
        list.id === action.payload.listId
          ? { ...list, taskId: [...list.taskId, action.payload.taskId] }
          : list
      );

    case "REMOVE_TASK_ID_FROM_LIST":
      return list.map((list) =>
        list.id === action.payload.listId
          ? {
              ...list,
              taskId: list.taskId.filter(
                (task) => task !== action.payload.taskId
              ),
            }
          : list
      );

    case "MOVE_TASK":
      const sortList = list.map((listItem) => {
        const { source, destination, draggableId } = action.payload;
        if (
          listItem.id === destination.droppableId &&
          source.droppableId === destination.droppableId
        ) {
          const copyOfTask = [...listItem.taskId];
          const sortItem = copyOfTask.splice(source.index, 1)[0];
          copyOfTask.splice(destination.index, 0, sortItem);
          return {
            ...listItem,
            taskId: copyOfTask,
          };
        } else {
          if (listItem.id === source.droppableId) {
            const copyOfTask = [...listItem.taskId];
            copyOfTask.splice(source.index, 1);
            return {
              ...listItem,
              taskId: copyOfTask,
            };
          }

          if (listItem.id === destination.droppableId) {
            const copyOfTask = [...listItem.taskId];
            copyOfTask.splice(destination.index, 0, draggableId);
            return {
              ...listItem,
              taskId: copyOfTask,
            };
          }
        }

        return listItem;
      });

      return sortList;

    default:
      return list;
  }
};

export default listReducer;
