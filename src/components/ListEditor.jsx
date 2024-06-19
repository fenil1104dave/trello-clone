import ReactTextareaAutosize from "react-textarea-autosize";

const ListEditor = ({ title, handleChangeTitle, saveList, deleteList }) => {
  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      saveList();
    }
  };

  return (
    <div>
      <ReactTextareaAutosize
        autoFocus
        className="m-2 rounded-md border border-transparent resize-none outline-none text-base px-5 py-2"
        placeholder="Enter list title..."
        value={title}
        onChange={handleChangeTitle}
        onKeyDown={handleEnter}
        style={{ width: 254 }}
      />
      {deleteList && <ion-icon name="trash" onClick={deleteList} />}
    </div>
  );
};

export default ListEditor;
