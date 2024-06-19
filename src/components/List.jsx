import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "./Card";
import CardEditor from "./CardEditor";
import ListEditor from "./ListEditor";

import { boardActions, cardActions, listActions } from "@/store/appSlice";
import shortid from "shortid";
import { useParams } from "react-router-dom";

const List = ({ listId, index }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const list = useSelector((state) => state.lists[listId]);

  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [addingCard, setAddingCard] = useState(false);

  const toggleAddingCard = () => setAddingCard(!addingCard);

  const addCard = async (cardText) => {
    toggleAddingCard();

    const payload = { cardText, cardId: shortid.generate(), listId };
    dispatch(listActions.addCard(payload));
    dispatch(cardActions.addCard(payload));
  };

  const toggleEditingTitle = () => setEditingTitle(!editingTitle);

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const editListTitle = async () => {
    setEditingTitle(false);
    dispatch(listActions.changeListTitle({ listId, listTitle: title }));
  };

  const deleteList = async () => {
    if (window.confirm("Are you sure to delete this list?")) {
      dispatch(
        listActions.deleteList({ listId, cards: list.cards, boardId: id })
      );
      dispatch(boardActions.deleteList({ listId, boardId: id }));
    }
  };
  return (
    <Draggable draggableId={list._id} index={index} key={list._id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-gray-300  w-[270px] h-fit m-5 rounded-lg border border-gray-300"
        >
          {editingTitle ? (
            <ListEditor
              list={list}
              title={title}
              handleChangeTitle={handleChangeTitle}
              saveList={editListTitle}
              onClickOutside={editListTitle}
              deleteList={deleteList}
            />
          ) : (
            <div
              className="cursor-pointer p-2 break-words font-medium text-lg"
              onClick={toggleEditingTitle}
            >
              {list.title}
            </div>
          )}

          <Droppable droppableId={list._id}>
            {(provided, _snapshot) => (
              <div ref={provided.innerRef} className="border-t">
                {list.cards &&
                  list.cards.map((cardId, index) => (
                    <Card
                      key={cardId}
                      cardId={cardId}
                      index={index}
                      listId={list._id}
                    />
                  ))}

                {provided.placeholder}

                {addingCard ? (
                  <CardEditor
                    onSave={addCard}
                    onCancel={toggleAddingCard}
                    adding
                  />
                ) : (
                  <div
                    className="toggle-add-card cursor-pointer px-5 py-2 text-gray-700 rounded-b-lg flex items-center"
                    onClick={toggleAddingCard}
                  >
                    <ion-icon name="add" /> Add a card
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default List;
