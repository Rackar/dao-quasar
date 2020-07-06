// export function someMutation(/* state */) {
export function jumpGroup(state, payload) {
  // debugger;
  state.currentGroup = payload.grp;
  state.currentGroupOwner = payload.creator;
  let contractSymbol = state.contracts.find(
    contract => contract.contract === payload.grp.reward_contract
  ).symbol;
  state.currentGroup.contractSymbol = contractSymbol;
}

export function setJoinedGroupIdList(state, payload) {
  state.joinedGroupIdList = payload.list;
}

export function setJoinedGroupPinnedList(state, payload) {
  state.joinedGroupPinnedList = payload;
}

export function playVideoUnique(state, payload) {
  state.previewVideoDom = payload;
  // debugger;
  // if (state.previewVideoDom === payload) {
  // } else {
  //   if (
  //     state.previewVideoDom &&
  //     state.previewVideoDom.pause &&
  //     state.previewVideoDom.state.playing
  //   ) {
  //     state.previewVideoDom.pause();
  //   }
  //   state.previewVideoDom = payload;
  //   if (payload.state.playing == false) {
  //     payload.play();
  //   }
  // }
}

export function cacheGroupData(state, payload) {
  // let {
  //   isReady,
  //   hasPermission,
  //   hasMore,
  //   posts,
  //   lastPostId,
  //   targetCommentPost,
  //   addCommentShow,
  //   grpMembers,
  //   password,
  //   blockedMembers,
  //   showJoinGroup,
  // } = payload.data;
  let id = payload.id;
  let obj = state.cachedGroups.find(group => group.id === id);
  payload.currentGroup = state.currentGroup;
  payload.currentGroupOwner = state.currentGroupOwner;
  let copy = JSON.parse(JSON.stringify(payload));
  if (obj) {
    obj = copy;
  } else {
    state.cachedGroups.push(copy);
  }
}
