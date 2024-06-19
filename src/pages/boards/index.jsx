import { useState } from "react";
import BoardCard from "./components/BoardCard";
import { AddBoard } from "./components/AddBoard";

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  return (
    <div style={{ border: "1px solid red" }}>
      <div className="font-bold text-2xl mb-5">My Boards</div>
      <div className="flex items-center gap-3">
        {boards?.map((b) => (
          <BoardCard title={b.title} color={b.color} setBoards={setBoards} />
        ))}
        <div
          style={{ background: "#dadde3" }}
          onClick={() => setIsAdding(true)}
          className="boards-card p-2.5 rounded-lg text-black truncate font-bold text-base mb-2 flex items-center justify-center"
        >
          {isAdding ? <AddBoard /> : "Create new board..."}
        </div>
      </div>
    </div>
  );
};

export default Boards;
