import { axiosInstance } from 'boot/axios';
export function jumpToGroup({ commit }, data) {
  let id = data.id;
  let getGroupApi = '/grp/' + id;
  // debugger;
  axiosInstance
    .get(getGroupApi)
    .then(res => {
      // debugger;
      commit('jumpGroup', res.data.data);
    })
    .catch(() => {});
}
