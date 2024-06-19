import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddBoard from "./AddBoard";
import { useNavigate } from "react-router-dom";

const BoardCard = ({ boardId }) => {
  const navigate = useNavigate();
  const board = useSelector((state) => state.boards[boardId]);

  return (
    <div
      className="relative cursor-pointer bg-white p-2  h-[100px] rounded-lg border border-gray-300 shadow-sm text-base break-words flex items-center w-[270px]"
      onClick={() => navigate(`/${boardId}`)}
    >
      {board.title}
    </div>
  );
};
const Boards = () => {
  const boards = useSelector((state) => state.boards.boards);
  const [addingBoard, setAddingBoard] = useState(false);

  const toggleAddingBoard = () => setAddingBoard(!addingBoard);

  return (
    <div className="p-5">
      <div className="text-3xl font-bold text-white">My Boards</div>
      <div className="w-full mt-5 flex gap-3 flex-wrap">
        {boards.map((boardId) => (
          <BoardCard boardId={boardId} key={boardId} />
        ))}
        {addingBoard ? (
          <AddBoard toggleAddingBoard={toggleAddingBoard} />
        ) : (
          <div
            onClick={toggleAddingBoard}
            className="add-list-button bg-opacity-25 rounded-2xl cursor-pointer text-white flex items-center justify-center font-medium mt-3 h-fit p-5 transition duration-85 ease-in w-[270px]"
          >
            Add a Board
          </div>
        )}
      </div>
    </div>
  );
};

export default Boards;
