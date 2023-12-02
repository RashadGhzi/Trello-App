const boardReducer = (boards = [], action) => {
  switch (action.type) {
    case "ADD_BOARD":
      const new_board = {
        id: Date.now() + "",
        title: action.payload.title,
        listId: [],
        taskId: [],
      };

      return [...boards, new_board];

    case "REMOVE_BOARD":
      return boards.filter((board) => board.id !== action.payload.boardId);

    case "CHANGE_BOARD_TITLE":
      const change_title_to_board = boards.map((board) => {
        if (board.id === action.payload.boardId) {
          return { ...board, title: action.payload.title };
        }
        return board;
      });
      return change_title_to_board;

    case "ADD_LIST_ID_TO_BOARD":
      const add_list_id_to_board = boards.map((board) => {
        if (board.id === action.payload.boardId) {
          return {
            ...board,
            listId: [...board.listId, action.payload.listId],
          };
        }
        return board;
      });
      return add_list_id_to_board;

    case "REMOVE_LIST_ID_FROM_BOARD":
      const remove_id_from_list = boards.map((board) => {
        if (board.id === action.payload.boardId) {
          return {
            ...board,
            listId: board.listId.filter((id) => id !== action.payload.listId),
          };
        }
        return board;
      });
      return remove_id_from_list;

    case "ADD_TASK_ID_TO_BOARD":
      return boards.map((board) => {
        if (board.id === action.payload.boardId) {
          return { ...board, taskId: [...board.taskId, action.payload.taskId] };
        }
        return board;
      });

    case "REMOVE_TASK_ID_FROM_BOARD":
      return boards.map((board) => {
        if (board.id === action.payload.boardId) {
          return {
            ...board,
            taskId: board.taskId.filter((id) => id !== action.payload.taskId),
          };
        }
        return board;
      });

    default:
      return boards;
  }
};

export default boardReducer;
