export const actionTypes = {
  ADD_NOTES: "ADD_NOTES"
};

export const addNotes = text => {
  return {
    type: actionTypes.ADD_NOTES,
    payload: text
  };
};
