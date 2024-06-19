import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import CardEditor from "./CardEditor";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { cardActions } from "@/store/appSlice";

const Card = ({ cardId, index, listId }) => {
  const card = useSelector((state) => state.cards[cardId]);
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);
  const [editing, setEditing] = useState(false);

  const startHover = () => setHover(true);
  const endHover = () => setHover(false);

  const startEditing = () => setEditing(true);
  const endEditing = () => setEditing(false);

  const editCard = async (text) => {
    endEditing();
    dispatch(cardActions.changeCardText({ cardId: card._id, cardText: text }));
  };

  const deleteCard = async () => {
    if (window.confirm("Are you sure to delete this card?")) {
      dispatch(cardActions.deleteCard({ cardId: card._id, listId }));
    }
  };

  return (
    <Draggable draggableId={card._id} index={index} key={card._id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="relative cursor-pointer bg-white m-2 p-2 rounded-sm border border-gray-300 shadow-sm text-base break-words"
          onMouseEnter={startHover}
          onMouseLeave={endHover}
        >
          {!editing ? (
            <div>
              {hover && (
                <div className="absolute top-5 right-5 flex flex-row justify-end">
                  <div
                    className="card-icon cursor-pointer flex items-center justify-center rounded-md m-1 text-gray-500 bg-gray-100 opacity-90"
                    onClick={startEditing}
                  >
                    <ion-icon name="create" />
                  </div>
                </div>
              )}
              {card.text}
            </div>
          ) : (
            <CardEditor
              text={card.text}
              onSave={editCard}
              onDelete={deleteCard}
              onCancel={endEditing}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
