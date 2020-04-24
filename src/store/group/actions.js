import { axiosInstance } from 'boot/axios';
export function jumpToGroup({ commit }, data) {
  let id = data.id;
  let getGroupApi = '/grp/' + id;
  // debugger;
  axiosInstance
    .get(getGroupApi)
    .then(res => {
      // debugger;
      let result = res.data.data;
      result.grp.joined = data.joined;
      commit('jumpGroup', result);
    })
    .catch(() => {});
}
