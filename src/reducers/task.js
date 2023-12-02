const taskReducer = (tasks=[], action) => {
  switch (action.type) {
    case "ADD_TASK":
      const new_task = {
        id: action.payload.taskId,
        title: action.payload.title,
        boardId: action.payload.boardId,
        listId: action.payload.listId,
      };

      return [...tasks, new_task];

    case "REMOVE_TASK":
      return tasks.filter((task) => task.id !== action.payload.taskId);

    case "CHANGE_TASK_TITLE":
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, title: action.payload.title }
          : task
      );

    case "CHANGE_BOARD_ID_OF_TASK":
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, boardId: action.payload.boardId }
          : task
      );

    case "CHANGE_LIST_ID_OF_TASK":
      return tasks.map((task) =>
        task.id === action.payload.taskId
          ? { ...task, listId: action.payload.listId }
          : task
      );

    default:
      return tasks;
  }
};

export default taskReducer;
