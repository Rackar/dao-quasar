import { axiosInstance } from 'boot/axios';
export function jumpToGroup({ commit }, data) {
  return new Promise((resolve, reject) => {
    let id = data.id;
    let getGroupApi = '/grp/' + id;
    // debugger;
    axiosInstance
      .get(getGroupApi)
      .then(res => {
        // debugger;
        let result = res.data.data;
        result.grp.joined = data.joined;
        result.grp.pinned = data.pinned;
        commit('jumpGroup', result);
        resolve();
      })
      .catch(err => {
        reject(err);
      });
  });
}
