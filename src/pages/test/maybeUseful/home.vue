<style scoped>
@import "../assets/css/home.css";
</style>
<template>
  <div class="chatBody" id="app">
    <div class="chatMainL left">
      <div class="chatHeader" @click="showTip=!showTip">
        <i></i>
        <span>DAOChat</span>
        <div class="toolTip-left" v-if="showTip">
          <div class="commonBorder" @click="iscrtgrp">创建一个群</div>
          <div class="commonBorder" @click="clearLogin">退出登录</div>
        </div>
      </div>
      <div class="chatSearch"></div>
      <div class="chatList chatListFirst">
        <div
          v-if="joindgrp.length>0 && item.grp"
          v-for="(item,index) in joindgrp"
          @click="tabgrp(index,item.grp.id,'0')"
          :class="{'listItemBg':item.grp.id==active.id}"
          class="listItem"
        >
          <div class="act_icon" v-if="item.grp.id==active.id" @click.stop="showGrp=!showGrp">
            <img src="../assets/image/icon_more@2x.png" />
          </div>
          <div class="toolTip-left" v-if="showGrp && item.grp.id==active.id">
            <div
              class="commonBorder"
              @click.stop="setTop(item.grp.id,item.pinned==1?2:1)"
            >{{item.pinned==1?"置顶":"取消置顶"}}</div>
            <div class="commonBorder" @click.stop="clearGrp(item.grp.id)">退出群组</div>
          </div>
          <div class="chatAvatar">
            <img src="../assets/image/avatar.jpeg" />
          </div>
          <div class="itemCard">
            <div class="itemDdescription">
              <div class="itemInfo">
                <div class="infoTop">
                  <div class="itemName left">{{item.grp && item.grp.name}}</div>
                  <div class="right">{{item.unread}}</div>
                </div>
              </div>
              <div class="itemContent">
                <div class="infoDown">
                  <span class="left">{{item.grp && item.grp.desc_text}}</span>
                  <div class="right">5:20 PM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="chatRecommend">
        <p class="recommendTit">推荐</p>
        <div class="chatList">
          <div
            class="listItem"
            @click="tabgrp(index,item.id,'1')"
            :class="{'listItemBg':item.id==active.id}"
            v-for="(item,index) in grps"
          >
            <div class="chatAvatar">
              <img src="../assets/image/avatar.jpeg" />
            </div>
            <div class="itemCard">
              <div class="itemDdescription">
                <div class="itemInfo">
                  <div class="infoTop">
                    <div class="itemName left">{{item.name}}</div>
                    <div class="right">{{item.read_permission}}</div>
                  </div>
                </div>
                <div class="itemContent">
                  <div class="infoDown">
                    <span class="left">{{item.desc_text}}</span>
                    <div class="right">5:20 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="copyRight">
        All rights reserved 2020 DAOChat Inc
        <br />An user owned company
        <br />Designed by Alina
      </div>
    </div>
    <div class="chatMainR right">
      <div class="msgTop" v-if="token">
        <span class="bell">
          <i>8</i>
        </span>
        <router-link to="/personal">
          <span class="user"></span>
        </router-link>
      </div>
      <div class="msgTop" v-else>
        <router-link to="/login">
          <span class="loginNow">快速登录</span>
        </router-link>
      </div>
      <div class="chatCont">
        <div class="chatInfor">
          <img src="../assets/image/avatar.jpeg" />
          <span class="chatName">{{grpinfo.grp && grpinfo.grp.name}}</span>
          <span class="share">
            <i></i>分享
          </span>
          <span class="join" v-if="active.type==1" @click="joingrp(grpinfo.grp.id)">
            <i></i>加入小组
          </span>
          <span class="speak" @click="islayer=true">
            <i></i>发言
          </span>
        </div>
      </div>
      <router-link :to="{path:'/createGroupMember',query: {id: grpinfo.grp.id}}">
        <div class="dynamicList">
          <div class="items">
            <div class="itemsTit">
              <div class="chatTxt" v-if="grpinfo.creator && grpinfo.grp" v-show="grpinfo.grp">
                <p>
                  创建于 {{grpinfo.grp && grpinfo.grp.create_at|dateformat("YYYY-MM-DD HH:mm:ss")}}
                  <span
                    class="chatPosition"
                  >组长：{{grpinfo.creator.name}}</span>
                </p>
                <div class="detail">{{grpinfo.grp && grpinfo.grp.desc_text}}</div>
              </div>
              <div class="characterMain">
                <div v-if="grpuser.length>0" v-for="(items,index) in grpuser">
                  <div class="characterItem" v-if="index<5">
                    <img src="../assets/image/avatar.jpeg" />
                    <p>{{items.name}}</p>
                  </div>
                  <div class="characterMore" @click="showall" v-else>查看更多</div>
                </div>
              </div>
            </div>
          </div>
          <pull-box v-if="grpinfo.grp.read_permission==1" v-bind:posts="posts" ref="postData"></pull-box>
          <div class="lockMain" v-else-if="grpinfo.grp.read_permission==2">
            <div class="lockImg center">
              <img src="../assets/image/icon_suo_1@2x.png" />
            </div>
            <div class="lockTxt">
              私密群
              <br />只有小组成员可以浏览
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
      </router-link>
    </div>
    <!--      发帖-->
    <div class="sendPostModal" v-if="islayer">
      <div class="sendPostMain">
        <div class="closeModal" @click="speaks"></div>
        <div class="textarea">
          <textarea v-model="abbcontent" placeholder="有什么新鲜事告诉大家…"></textarea>
          <div id="result">
            <div class="imaList" v-if="imgList.length>0" v-for="(item,index) in imgList">
              <img :src="item" />
              <div class="close" @click="removeImg(index)">X</div>
            </div>
          </div>
          <div class="right allwords">{{abbcontent.length}}/200</div>
        </div>
        <div>
          <div class="left">
            <img src="../assets/image/expression.png" />
            <img @click="$refs.file.click()" src="../assets/image/picture.png" />
            <img @click="$refs.video.click()" src="../assets/image/video.png" />
          </div>
          <div class="clearfix"></div>
        </div>
        <input
          hidden="hidden"
          ref="file"
          id="file-chooser"
          @change="fileChange"
          type="file"
          accept="image/*"
        />
        <input
          hidden="hidden"
          ref="video"
          id="vadio-chooser"
          @change="fileChange"
          type="file"
          accept="video/*"
        />
        <!--        <div class="sendPostBtn" id="post">test</div>-->
        <div class="sendPostBtn" @click="setabb">
          <!--            <img src="../assets/image/send.png"/>-->
          快速发帖
        </div>
      </div>
    </div>
    <layer-box :layerInfo="layer" ref="showLayer"></layer-box>
    <!--      创建群-->
    <div class="popupModal createGroupModal" v-if="iscreate">
      <div class="popupMain">
        <div class="closeModal" @click="iscrtgrp"></div>
        <div class="popupTitle">创建一个群</div>
        <div class="createGroupMain">
          <div class="createGroupLeft left">
            <div class="groupName">
              <label class="left">小组名称</label>
              <input class="left" v-model="crtgrp.tit" type="text" placeholder="必填" />
              <div class="clearfix"></div>
            </div>
            <div class="groupDescription">
              <label class="left">小组介绍</label>
              <textarea
                class="left"
                v-model="crtgrp.desc_text"
                maxlength="200"
                placeholder="描述下你的话题，引起大家的兴趣"
              ></textarea>
              <i>
                <span class="count-change">0</span>/200
              </i>
              <div class="clearfix"></div>
            </div>
            <div class="rewardTit postRead">
              帖子阅读
              <label class="radioLabel">
                <input
                  class="postRadio allPerson"
                  v-model="crtgrp.read_permission"
                  type="radio"
                  value="1"
                  name="postRadio"
                  checked
                />
                <span class="radioInput"></span>所有人
              </label>
              <label class="radioLabel onlyTeamlabel">
                <input
                  class="postRadio onlyTeam"
                  type="radio"
                  v-model="crtgrp.read_permission"
                  value="2"
                  name="postRadio"
                />
                <span class="radioInput"></span>仅限组员&nbsp;&nbsp;
              </label>
            </div>
            <div class="settingContent" v-if="crtgrp.read_permission==2">
              <label class="setingLabel">设置密码</label>
              <input
                class="settingPws"
                v-model="crtgrp.password"
                type="password"
                placeholder="6位数字或字母"
              />
            </div>
            <div class="popupBtn" @click="creategrp">完成</div>
          </div>
          <div class="createGroupRight right">
            创建群之后你还可以设置以下参数：入群奖励、阅读奖励、回复奖励等。
            <br />
            <br />请注意，所有的这些奖励的代币将不经过你的确认直接从你的钱包扣掉。
            若你的钱包余额不够支付奖励，则该群的所有奖励设置将自动归零。
            <br />
            <br />创建群代表你为群内所有言论负责。你若退群，则系统将自动接替你做群主。
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import md5 from "md5";
import AWS from "aws-sdk";
import axios from "../http/axios";
import layerBox from "./layer";
import pullBox from "./pull";
export default {
  components: {
    //注册组件
    layerBox,
    pullBox
  },
  data() {
    return {
      showTip: false,
      crtgrp: {
        tit: "",
        desc_text: "",
        password: "",
        read_permission: 1
      },
      posttype: "image",
      showGrp: false,
      video: [],
      joindgrp: [],
      active: {
        type: 0,
        id: null,
        ind: 0
      },
      iscreate: false,
      islayer: false,
      grps: [],
      abbcontent: "",
      posts: [],
      grpinfo: {
        grp: {}
      },
      grpuser: [],
      postURL: "https://chatdao.com:3031/",
      speak: null,
      talk: null,
      comments: [],
      imgList: [],
      token: "",
      layer: {
        type: "setabb",
        show: true,
        post: 12345
      }
    };
  },

  created() {
    let token = localStorage.getItem("token");
    if (token) {
      this.token = token;
    } else {
      this.active.type = 1;
      this.active.id = 1;
    }
    this.$nextTick(function() {
      this.getgrp();
      this.getgrps();
    });
  },
  methods: {
    // 上传文件
    fileChange: async function(e) {
      let file = e.target.files[0];
      let newfile;
      //创建新文件对象
      if (e.target.accept != "image/*") {
        newfile = new File([file], md5("12345") + ".jpg", {
          type: "image/jpeg"
        });
      } else {
        newfile = file;
      }
      let self = this;
      console.log(e);
      if (
        (e.target.accept != "image/*" && this.imgList.length == 4) ||
        (e.target.accept != "image/*" && this.video.length == 1)
      ) {
        alert("只能上传四张图片，或一个视频！");
      } else {
        if (e.target.files) {
          let credentials = {}; //秘钥形式的登录上传
          AWS.config.update(credentials);
          AWS.config.region = "ap-northeast-1"; //设置区域
          // create bucket instance
          let bucket = new AWS.S3({ params: { Bucket: "justdao" } }); //选择桶
          let file = newfile;
          if (file) {
            console.log(file);
            let params = {
              Key: file.name,
              ContentType: file.type,
              Body: file,
              "Access-Control-Allow-Credentials": "*",
              ACL: "public-read"
            }; //key可以设置为桶的相抵路径，Body为文件， ACL最好要设置
            bucket.upload(params, (err, data) => {
              //打印出错误
              if (err) {
                console.log(err);
              } else {
                if (e.target.accept == "image/*") {
                  self.video = [];
                  self.imgList.push(data.Location);
                  self.posttype = "image";
                } else if (e.target.accept == "video/*") {
                  self.imgList = [];
                  self.video.push(data.Location);
                  self.posttype = "video";
                }
              }
            });
          } else {
            // results.innerHTML = 'Nothing to upload.';
          }
        }
      }
    },
    // 创建群
    creategrp: async function() {
      let self = this;
      let apiCode = "/protected/grp/create";
      let val = this.crtgrp;
      val["name"] = val.tit;
      val.read_permission = Number(val.read_permission);
      if ((val.tit = "" || val.desc_text == "" || val.read_permission == "")) {
        alert("信息不完整，请完善信息");
      } else {
        const putgrps = await axios.post("/" + apiCode, val);
        if (putgrps.code == 0) {
          this.getgrp();
          this.iscrtgrp();
        } else {
          alert(putgrps.massage);
        }
      }
    },

    // 获取群信息
    getgrpinfo: async function(id) {
      var self = this;
      let datasss = {};
      let token = localStorage.getItem("token");
      const bearer = "Bearer " + token;
      let postapi = "/grp/" + id;
      const getinfo = await axios.get("/" + postapi, datasss);
      if (getinfo.code == 0) {
        self.grpinfo = getinfo.data;
        // self.grpinfo.grp.create_at.m
        self.getgrpuser(id);
        self.getList(id);
        self.active.id = id;
      }
    },
    // 加入小组
    joingrp: async function(id) {
      var self = this;
      let datasss = {
        grp: id,
        password: ""
      };
      let token = localStorage.getItem("token");
      let postapi = "/protected/grp/join";
      const postjoin = await axios.post("/" + postapi, datasss);
      if (postjoin.code == 0) {
        this.$toast({
          text: "加入成功！"
        });
      } else if (postjoin.code == 104) {
        this.layer = {
          type: "login",
          show: true,
          post: 12345
        };
        self.$router.push({ path: "/login", query: { token: token } });
      }
    },
    // 获取群组员
    getgrpuser: async function(id) {
      let self = this;
      let token = localStorage.getItem("token");
      const bearer = "Bearer " + token;
      let postapi = "user/members/" + id;
      const getuser = await axios.get("/" + postapi, {});
      if (getuser.code == 0) {
        self.grpuser = getuser.data.alive;
      }
    },
    // 获取帖子
    getList: async function(id) {
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
      // 获取帖子
    },
    //   // 创建帖子
    setabb: async function() {
      let self = this;
      if (!this.abbcontent) {
        this.$toast({
          text: "请输入帖子内容"
        });
        return;
      }
      let postapi = "/protected/post/create";
      let dat = {
        grp: self.active.id,
        title: "",
        content: self.abbcontent
      };
      if (self.posttype == "image") {
        dat.images = self.imgList;
      } else {
        dat.images = self.video;
      }
      const crt = await axios.post("" + postapi, dat);
      if (crt.code == 0) {
        // self.posts[index].comments=add.data.comments
        //    this.getList(self.active.id);
        self.posts.unshift(crt.data);
        self.imgList = [];
        self.islayer = !self.islayer;
        self.layer = {
          type: "setabb",
          show: true,
          post: crt.data.post.id
        };
      }
    },
    // 获取评论

    // 群组切换
    tabgrp: function(index, id, i) {
      this.active.ind = i;
      this.active.id = id;
      this.getgrpinfo(id);
      this.showGrp = false;
    },
    // 发帖弹框
    speaks: function() {
      this.islayer = !this.islayer;
      if (!this.islayer) {
        this.imgList = [];
      }
    },
    // 建群弹框
    iscrtgrp: function() {
      this.iscreate = !this.iscreate;
      console.log(11111);
    },
    // 删除图片
    deleteImg: function() {},
    matchType: function(fileName) {
      // 后缀获取
      var suffix = "";
      // 获取类型结果
      var result = "";
      try {
        var flieArr = fileName.split(".");
        suffix = flieArr[flieArr.length - 1];
      } catch (err) {
        suffix = "";
      }
      // fileName无后缀返回 false
      if (!suffix) {
        result = false;
        return result;
      }
      // 图片格式
      var imglist = ["png", "jpg", "jpeg", "bmp", "gif"];
      // 进行图片匹配
      result = imglist.some(function(item) {
        return item == suffix;
      });
      if (result) {
        result = "image";
        return result;
      }
      // 匹配txt
      var txtlist = ["txt"];
      result = txtlist.some(function(item) {
        return item == suffix;
      });
      if (result) {
        result = "txt";
        return result;
      }
      // 匹配 excel
      var excelist = ["xls", "xlsx"];
      result = excelist.some(function(item) {
        return item == suffix;
      });
      if (result) {
        result = "excel";
        return result;
      }
      // 匹配 word
      var wordlist = ["doc", "docx"];
      result = wordlist.some(function(item) {
        return item == suffix;
      });
      if (result) {
        result = "word";
        return result;
      }
      // 匹配 pdf
      var pdflist = ["pdf"];
      result = pdflist.some(function(item) {
        return item == suffix;
      });
      if (result) {
        result = "pdf";
        return result;
      }
      // 匹配 ppt
      var pptlist = ["ppt"];
      result = pptlist.some(function(item) {
        return item == suffix;
      });
      if (result) {
        result = "ppt";
        return result;
      }
      // 匹配 视频
      var videolist = ["mp4", "m2v", "mkv"];
      result = videolist.some(function(item) {
        return item == suffix;
      });
      if (result) {
        result = "video";
        return result;
      }
      // 匹配 音频
      var radiolist = ["mp3", "wav", "wmv"];
      result = radiolist.some(function(item) {
        return item == suffix;
      });
      if (result) {
        result = "radio";
        return result;
      }
      // 其他 文件类型
      result = "other";
      return result;
    },
    removeImg: function(index) {
      this.imgList.splice(index, 1);
    },
    imgLoadError: function(res) {
      console.log(res);
    },
    clearLogin: function() {
      localStorage.removeItem("token");
      localStorage.removeItem("userinfo");
      this.$router.go(0);
    },
    // 置顶 取消置顶
    setTop: async function(id, block) {
      this.showGrp = false;
      let self = this;
      let postapi = "/protected/grp/pin";
      let dat = {
        grp: id,
        pinned: block
      };
      const crt = await axios.post(postapi, dat);
      if (crt.code == 0) {
        self.$toast({
          text: block == 1 ? "取消置顶成功！" : "置顶成功"
        });
        self.getgrp();
      } else {
        self.$toast({
          text: crt.message
        });
      }
    },
    clearGrp: async function(id) {
      this.showGrp = false;
      let self = this;
      let postapi = "/protected/grp/detach";
      let dat = {
        grp: id
      };
      const crt = await axios.post(postapi, dat);
      if (crt.code == 0) {
        self.$toast({
          text: "退出成功！"
        });
        self.getgrp();
        self.getgrps();
      } else {
        self.$toast({
          text: crt.message
        });
      }
    }
  }
};
</script>

