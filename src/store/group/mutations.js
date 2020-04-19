// export function someMutation(/* state */) {
export function jumpGroup(state, payload) {
    // debugger;
    state.currentGroup = payload.grp
    state.currentGroupOwner = payload.creator
}


