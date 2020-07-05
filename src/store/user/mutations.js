// export function someMutation(/* state */) {
export function login_saveToken(state, tokenWithB) {
  let token = tokenWithB.split(' ')[1] ? tokenWithB.split(' ')[1] : tokenWithB;
  let userinfo = setUserIdAndNameFormToken(token);
  state.userid = userinfo.userid;
  state.token = token;
  window.localStorage.setItem('token', token);
  // alert(token)
  function parseJwt(token) {
    let secPart = token.split('.')[1];
    // console.log(secPart);
    // 解析jwt，解决包含下划线和中文的问题。
    let userString = decodeURIComponent(
      escape(window.atob(secPart.replace(/-/g, '+').replace(/_/g, '/')))
    );
    // console.log(userString);

    return JSON.parse(userString);
  }
  function setUserIdAndNameFormToken(token) {
    let payloadInfo = parseJwt(token);
    let result = {
      userid: payloadInfo.id,
    };
    return result;
  }
}
export function logout_delToken(state) {
  state.token = '';
  window.localStorage.removeItem('token');

  // console.log(dd);
  state.userid = '';
}

export function setUserinfo(state, userinfo) {
  state.avatar = userinfo.avatar;
  state.name = userinfo.name;
  state.mail_export = userinfo.mail_export;
  state.address = userinfo.address;
  state.social_twitter = userinfo.social_twitter;
  state.social_sync_grp = userinfo.social_sync_grp;
}

export function resetUserinfo(state) {
  state.userid = '';
  state.token = '';

  state.name = '';
  state.mail_export = '';
  state.avatar = '';
  state.address = '';
  state.social_twitter = null;
  state.social_sync_grp = null;
}
