import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "./List";
import AddList from "./AddList";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { boardActions, listActions } from "@/store/appSlice";
import { Link, useParams } from "react-router-dom";

const Board = () => {
  const { id } = useParams();
  const [addingList, setAddingList] = useState(false);

  const dispatch = useDispatch();

  const board = useSelector((state) => state.boards[id]);

  const toggleAddingList = () => setAddingList((prev) => !prev);

  const handleDragEnd = ({ source, destination, type }) => {
    if (!destination) return;

    if (type === "COLUMN") {
      if (source.index !== destination.index) {
        dispatch(
          boardActions.moveList({
            oldListIndex: source.index,
            newListIndex: destination.index,
            boardId: id,
          })
        );
      }
      return;
    }

    if (
      source.index !== destination.index ||
      source.droppableId !== destination.droppableId
    ) {
      dispatch(
        listActions.moveCard({
          sourceListId: source.droppableId,
          destListId: destination.droppableId,
          oldCardIndex: source.index,
          newCardIndex: destination.index,
        })
      );
    }
  };

  return (
    <>
      <div className="text-center bg-slate-100 flex p-4 items-center">
        <Link to="/">Back</Link>
        <h3 className="mx-auto text-3xl font-bold dark:text-white">
          {board.title}
        </h3>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="COLUMN">
          {(provided) => (
            <div
              className="h-[92%] flex overflow-x-auto"
              ref={provided.innerRef}
            >
              {board?.lists?.map((listId, index) => {
                return <List listId={listId} key={listId} index={index} />;
              })}

              {provided.placeholder}

              <div className="w-[270px] m-5">
                {addingList ? (
                  <AddList toggleAddingList={toggleAddingList} />
                ) : (
                  <div
                    onClick={toggleAddingList}
                    className="add-list-button bg-opacity-25 rounded-2xl cursor-pointer text-white flex items-center justify-center font-medium min-h-8 px-5 py-4 transition duration-85 ease-in  w-[270px]"
                  >
                    Add a list
                  </div>
                )}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Board;
