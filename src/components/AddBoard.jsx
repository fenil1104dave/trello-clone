import { useState } from "react";
import EditButtons from "./EditButtons";
import { useDispatch } from "react-redux";
import { listActions } from "../store/appSlice";
import { boardActions } from "@/store/appSlice";
import ListEditor from "./ListEditor";
import shortid from "shortid";
import BoardEditor from "./BoardEditor";

const AddBoard = ({ toggleAddingBoard }) => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const addBoard = async () => {
    toggleAddingBoard();
    const payload = { title, boardId: shortid.generate(), lists: [] };
    dispatch(boardActions.addBoard(payload));
  };

  return (
    <div className="bg-gray-300 rounded-lg px-2 py-2 w-[270px]">
      <BoardEditor
        title={title}
        handleChangeTitle={handleChangeTitle}
        onClickOutside={toggleAddingBoard}
        saveBoard={addBoard}
      />

      {/* < EditButtons
        handleSave={}
        saveLabel={"Add list"}
        handleCancel={toggleAddingList}
      /> */}
    </div>
  );
};

export default AddBoard;
