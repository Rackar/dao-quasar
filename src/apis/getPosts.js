import { post } from './request';

const getPosts_notLoggedIn = function(data) {
  return post('/post/pull', data).then(res => {
    res.posts.forEach(function(item) {
      item.likeStatus = 1;
    });
    return res;
  });
};

const getPosts_loggedIn = function(data) {
  return post('/protected/post/pull', data).then(async function(res) {
    if (res.posts.length === 0) return res;

    const postIds = res.posts.map(i => i.post.id);
    const likeStatus = await post('/protected/post/likes', { posts: postIds }).then(
      res => res.likes
    );
    res.posts.forEach(function(item) {
      const status = likeStatus[item.post.id] === undefined ? 1 : likeStatus[item.post.id];
      item.likeStatus = status;
    });
    return res;
  });
};

const getPosts = function({ userid, groupId, lastPostId }) {
  const data = { grp: groupId, base_post: lastPostId };
  return userid
    ? getPosts_loggedIn(data)
    : getPosts_notLoggedIn(data);
};

export default getPosts;
