export const ifCurrentGroupJoined = state => {
  return state.joinedGroupIdList.some(id => id === state.currentGroup.id);
};
