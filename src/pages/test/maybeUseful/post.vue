<style scoped>
@import "../assets/css/home.css";
</style>
<template>
  <div class="postBody">
    <div class="chatHeader">
      <div class="left">
        <i></i>
        <span>DAOChat</span>
      </div>
      <div class="right">
        <div class="msgTop">
          <span class="bell"></span>
          <span class="al">AL</span>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="postMain">
      <div class="left postDetailMain">
        <pull-box :posts="posts" ref="postData"></pull-box>
      </div>
      <div class="right postUser">
        <div class="postUsertop">
          <div class="chatInfor">
            <img src="../assets/image/avatar.jpeg" />
            <span class="chatName">DAOChat官方讨论组</span>
            <div class="toolTip-top" style="display: none;">
              <div class="numberMain">
                <div class="left postReward">
                  小组成员
                  <p>56</p>
                </div>
                <div class="right respondReward">
                  小组文章
                  <p>345</p>
                </div>
                <div class="left joinReward">
                  发帖奖励(单位)
                  <p>3455</p>
                </div>
                <div class="clearfix"></div>
              </div>
              <span class="join">
                <i></i>加入小组
              </span>
              <span class="speak">
                <i></i>发言
              </span>
            </div>
          </div>
        </div>
        <div class="postUserBottom">
          <div class="chatRecommend">
            <p class="recommendTit">相关内容</p>
            <div class="chatList">
              <div class="listItem">
                <div class="chatAvatar">
                  <img src="../assets/image/avatar.jpeg" />
                </div>
                <div class="itemCard">
                  <div class="itemDdescription">
                    <div class="itemInfo">
                      <div class="infoTop">
                        <div class="itemName left">小王</div>
                        <div class="right">5:20 PM</div>
                      </div>
                    </div>
                    <div class="itemContent">
                      <div class="infoDown">
                        <span class="left">12819l浏览量</span>
                        <div class="right"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="listItem">
                <div class="chatAvatar">
                  <img src="../assets/image/avatar.jpeg" />
                </div>
                <div class="itemCard">
                  <div class="itemDdescription">
                    <div class="itemInfo">
                      <div class="infoTop">
                        <div class="itemName left">小王</div>
                        <div class="right">5:20 PM</div>
                      </div>
                    </div>
                    <div class="itemContent">
                      <div class="infoDown">
                        <span class="left">12819l浏览量</span>
                        <div class="right"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="listItem">
                <div class="chatAvatar">
                  <img src="../assets/image/avatar.jpeg" />
                </div>
                <div class="itemCard">
                  <div class="itemDdescription">
                    <div class="itemInfo">
                      <div class="infoTop">
                        <div class="itemName left">小王</div>
                        <div class="right">5:20 PM</div>
                      </div>
                    </div>
                    <div class="itemContent">
                      <div class="infoDown">
                        <span class="left">12819l浏览量</span>
                        <div class="right"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="listItem">
                <div class="chatAvatar">
                  <img src="../assets/image/avatar.jpeg" />
                </div>
                <div class="itemCard">
                  <div class="itemDdescription">
                    <div class="itemInfo">
                      <div class="infoTop">
                        <div class="itemName left">小王</div>
                        <div class="right">5:20 PM</div>
                      </div>
                    </div>
                    <div class="itemContent">
                      <div class="infoDown">
                        <span class="left">12819l浏览量</span>
                        <div class="right"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix"></div>
    </div>
  </div>
</template>
<script>
// import layerBox from "./layer";
// import pullBox from "./pull";
export default {
  data() {
    return {
      posts: []
    };
  },
  components: {
    //注册组件
    // layerBox,
    // pullBox
  },
  created() {
    let id = this.$route.query.id;
    this.getPost(id);
  },
  methods: {
    getPost: async function(id) {
      let token = localStorage.getItem("token");
      let url;
      let self = this;
      // 获取帖子
      let dat1 = {
        grp: id,
        base_post: null
      };
      if (token) {
        url = "/protected/post/pull";
        this.token = token;
      } else {
        url = "/post/pull";
      }
      const List = await axios.post("/" + url, dat1);
      if (List.code == 0) {
        self.posts = List.data.posts;
      }
    }
  }
};
</script>

