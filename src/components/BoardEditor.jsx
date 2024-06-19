import { useSelector } from "react-redux";
import ReactTextareaAutosize from "react-textarea-autosize";
import EditButtons from "./EditButtons";

const BoardEditor = ({
  title,
  handleChangeTitle,
  saveBoard,
  boardId,
  onClickOutside,
  addingBoard,
}) => {
  const board = useSelector((state) => state.boards[boardId]);
  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      saveList();
    }
  };

  return (
    <div className="flex items-center flex-col">
      <ReactTextareaAutosize
        autoFocus
        className="rounded-md border border-transparent resize-none outline-none text-base px-5 py-2"
        placeholder="Enter list title..."
        value={title}
        onChange={handleChangeTitle}
        onKeyDown={handleEnter}
        style={{ width: 245 }}
      />
      <EditButtons
        handleSave={saveBoard}
        saveLabel={"Add Board"}
        handleCancel={onClickOutside}
        cardText={title}
      />
    </div>
  );
};

export default BoardEditor;
