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
