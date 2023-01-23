export const CHANGE_STATE = "CHANGE_STATE";
export const ADD_ROOM = "ADD_ROOM";
export const REMOVE_ROOM = "REMOVE_ROOM";
export const INCREASE_ADULTS = "INCREASE_ADULTS";
export const DECREASE_ADULTS = "DECREASE_ADULTS";
export const INCREASE_CHILDREN = "INCREASE_CHILDREN";
export const DECREASE_CHILDREN = "DECREASE_CHILDREN";
export const SELECT_CHILD_AGE = "SELECT_CHILD_AGE";
function travellers(state, action) {
  switch (action.type) {
    case CHANGE_STATE:
      return action.payload;
    case ADD_ROOM:
      if (state.length < 8) return [...state, { adults: 1, children: [] }];
      break;
    case REMOVE_ROOM:
      if (state.length > 1)
        return state.filter((ro, ind) => ind !== action.payload);
      break;
    case INCREASE_ADULTS:
      return state.map((rom, ind) =>
        ind === action.payload && rom.adults < 15
          ? { ...rom, adults: rom.adults + 1 }
          : rom
      );

    case DECREASE_ADULTS:
      return state.map((rom, ind) =>
        ind === action.payload && rom.adults > 1
          ? { ...rom, adults: rom.adults - 1 }
          : rom
      );
    case INCREASE_CHILDREN:
      return state.map((rom, ind) =>
        rom.children.length === 6
          ? rom
          : ind !== action.payload
          ? rom
          : { ...rom, children: [...rom.children, { age: false }] }
      );
    case DECREASE_CHILDREN:
      return state.map((rom, ind) => {
        if (ind === action.payload) {
          return {
            ...rom,
            children: rom.children.filter(
              (ch, ind) => ind !== rom.children.length - 1
            ),
          };
        } else {
          return rom;
        }
      });
    case SELECT_CHILD_AGE:
      return state.map((rom, ind) =>
        ind === action.payload.romInd
          ? {
              ...rom,
              children: rom.children.map((ch, ind) =>
                ind === action.payload.chInd
                  ? { ...ch, age: action.payload.selectedAge }
                  : ch
              ),
            }
          : rom
      );
    default:
      return state;
  }
}
export default travellers;
