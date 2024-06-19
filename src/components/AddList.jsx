import { useState } from "react";
import EditButtons from "./EditButtons";
import { useDispatch } from "react-redux";
import { listActions } from "../store/appSlice";
import { boardActions } from "@/store/appSlice";
import ListEditor from "./ListEditor";
import shortid from "shortid";
import { useParams } from "react-router-dom";

const AddList = ({ toggleAddingList }) => {
  const { id } = useParams();

  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const createList = async () => {
    toggleAddingList();
    const payload = {
      listId: shortid.generate(),
      listTitle: title,
      boardId: id,
    };
    dispatch(listActions.addList(payload));
    dispatch(boardActions.addList(payload));
  };

  return (
    <div className="bg-gray-300 rounded-lg w-[270px] pb-3">
      <ListEditor
        title={title}
        handleChangeTitle={handleChangeTitle}
        onClickOutside={toggleAddingList}
        saveList={createList}
      />

      <EditButtons
        handleSave={createList}
        saveLabel={"Add list"}
        handleCancel={toggleAddingList}
        cardText={title}
      />
    </div>
  );
};

export default AddList;
