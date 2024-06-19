import { createSlice } from "@reduxjs/toolkit";

// Board slice
export const boardSlice = createSlice({
  name: "board",
  initialState: { boards: [] },
  reducers: {
    addBoard: (state, action) => {
      const { boardId } = action.payload;
      state.boards.push(boardId);
      state[boardId] = action.payload;
    },
    changeBoardTitle: (state, action) => {
      const { boardId, boardTitle } = action.payload;
      state[boardId].title = boardTitle;
    },
    addList: (state, action) => {
      const { listId, boardId } = action.payload;
      state[boardId].lists.push(listId);
    },
    moveList: (state, action) => {
      const { oldListIndex, newListIndex, boardId } = action.payload;
      const newLists = Array.from(state[boardId].lists);
      const [removedList] = newLists.splice(oldListIndex, 1);
      newLists.splice(newListIndex, 0, removedList);
      state[boardId].lists = newLists;
    },
    deleteList: (state, action) => {
      const { listId, boardId } = action.payload;
      state[boardId].lists = state.lists.filter(
        (tmpListId) => tmpListId !== listId
      );
    },
  },
});

// Lists slice
export const listsByIdSlice = createSlice({
  name: "lists",
  initialState: {},
  reducers: {
    addList: (state, action) => {
      const { listId, listTitle } = action.payload;
      state[listId] = { _id: listId, title: listTitle, cards: [] };
    },
    changeListTitle: (state, action) => {
      const { listId, listTitle } = action.payload;
      state[listId].title = listTitle;
    },
    deleteList: (state, action) => {
      const { listId } = action.payload;
      delete state[listId];
    },
    addCard: (state, action) => {
      const { listId, cardId } = action.payload;
      state[listId].cards.push(cardId);
    },
    moveCard: (state, action) => {
      const { oldCardIndex, newCardIndex, sourceListId, destListId } =
        action.payload;
      if (sourceListId === destListId) {
        const newCards = Array.from(state[sourceListId].cards);
        const [removedCard] = newCards.splice(oldCardIndex, 1);
        newCards.splice(newCardIndex, 0, removedCard);
        state[sourceListId].cards = newCards;
      } else {
        const sourceCards = Array.from(state[sourceListId].cards);
        const [removedCard] = sourceCards.splice(oldCardIndex, 1);
        const destinationCards = Array.from(state[destListId].cards);
        destinationCards.splice(newCardIndex, 0, removedCard);
        state[sourceListId].cards = sourceCards;
        state[destListId].cards = destinationCards;
      }
    },
    deleteCard: (state, action) => {
      const { cardId: deletedCardId, listId } = action.payload;
      state[listId].cards = state[listId].cards.filter(
        (cardId) => cardId !== deletedCardId
      );
    },
  },
});

// Cards slice
export const cardsByIdSlice = createSlice({
  name: "cards",
  initialState: {},
  reducers: {
    addCard: (state, action) => {
      const { cardText, cardId } = action.payload;
      state[cardId] = { text: cardText, _id: cardId };
    },
    changeCardText: (state, action) => {
      const { cardText, cardId } = action.payload;
      state[cardId].text = cardText;
    },
    deleteCard: (state, action) => {
      const { cardId } = action.payload;
      delete state[cardId];
    },
    deleteList: (state, action) => {
      const { cards: cardIds } = action.payload;
      cardIds.forEach((cardId) => {
        delete state[cardId];
      });
    },
  },
});

export const boardActions = boardSlice.actions;
export const listActions = listsByIdSlice.actions;
export const cardActions = cardsByIdSlice.actions;
