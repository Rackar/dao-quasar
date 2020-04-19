<style>
.toolTip-left {
  left: 74px;
  top: -10px;
}
</style>
<template>
  <div>
    <div class="items" v-for="(item,index) in data_item" :key="index">
      <div class="itemsTit">
        <img v-if="isinfo" src="../assets/image/avatar.jpeg" />
        <span>
          <span v-if="isinfo">&nbsp;</span>
          {{item.creator && item.creator.name}}&nbsp;&nbsp;{{item.post && $moment(item.post.create_at).format('YYYY-MM-DD')}}&nbsp;&nbsp;
          <!--30分钟前-->
        </span>
      </div>
      <router-link :to="{path:'/post',query: {id:item.post.id}}">
        <p class="dynamicTxt">{{item.post.content}}</p>
      </router-link>
      <!--          <img class="imgList" @error="imgLoadError(res)" alt="bak" src="https://justdao.s3-ap-northeast-1.amazonaws.com/avatar1.jpeg"/>-->
      <div
        class="dynamicImg"
        v-if="item.post.images.length>0 && matchType(item.post.images[0])=='image'"
      >
        <img
          class="imgList"
          alt="bak"
          v-for="items in item.post.images"
          :src="items"
          :key="items.it"
        />
      </div>
      <div class="dynamicVideo" v-for="items in item.post.images" :key="items.id">
        <video width="430" height="240" controls="controls">
          <source :src="items" type="video/mp4" />
        </video>
        <span class="playIcon"></span>
      </div>
      <div class="interactionCont">
        <div class="thumbsUp">
          <i></i>
          {{item.post.num_like}}
        </div>
        <div class="comment" v-if="!item.comments" @click="getadd(item.post.id,index)">
          <i></i>
          {{item.post.num_comment}}
        </div>
        <div class="comment" v-else @click="close(index)">
          <i></i>收起
        </div>
        <div class="forward">
          <i></i>
          {{item.post.num_share}}
        </div>
        <div class="set" v-if="!isinfo" @click="showTip.index=index,showTip.type=!showTip.type">
          <i></i>设置
          <div class="toolTip-left" v-if="showTip.index==index && showTip.type">
            <span v-if="tab==0">
              <div class="commonBorder">再编辑</div>
              <div class="commonBorder" @click="deletePull(item.post.id)">删除</div>
            </span>
            <span v-if="tab==1">
              <div class="commonBorder">还原</div>
              <div class="commonBorder" @click="deletePull(item.post.id)">清除</div>
            </span>
          </div>
        </div>
      </div>
      <div class="commentList" v-if="item.comments">
        <p class="commentTotal" v-if="item.comments.length>0">
          {{item.comments.length}}条评论
          <!--              <span class="loading"></span></p>-->
        </p>
        <div class="commentItems">
          <label v-for="(items,index) in item.comments" :key="index">
            <div class="itemsTit">
              <img src="../assets/image/avatar.jpeg" />
              <span>&nbsp;{{items.creator.name}}&nbsp;&nbsp;{{$timeFn(items.comment.create_at)}}</span>
            </div>
            <div class="dynamicTxt respondTxt">
              {{items.comment.content}}
              <span
                class="respond"
                @click="reback.index=index,reback.reindex=ind"
              >回应</span>
              <div class="childrenItems" v-for="(it,index) in items.subs" :key="index">
                <div class="itemsTit">
                  <img src="../assets/image/avatar.jpeg" />
                  <span>&nbsp;{{it.creator.name}}&nbsp;&nbsp;{{$timeFn(it.comment.create_at)}}</span>
                </div>
                <div class="chatReplay">
                  <span class="replay">回复</span>
                  @{{items.creator.name}}
                </div>
                <div class="dynamicTxt respondTxt">
                  {{it.comment.content}}
                  <span class="respond">取消回应</span>
                  <!--  <div class="respondMain">
                              <div class="respondInput">
                                  <input type="text" placeholder="回应哈哈" />
                                  <span class="respondOperation">
                                      <i class="expression"></i>
                                      <i class="picture"></i>
                                      <i class="video"></i>
                                  </span>
                              </div>
                              <div class="respondBtn">回应</div>
                  </div>-->
                </div>
              </div>
            </div>
            <div
              class="respondMain"
              style="margin-left: 84px;width: auto;"
              v-show="reback.index==index && reback.reindex==ind"
            >
              <div class="respondInput">
                <input type="text" v-model="retalk" placeholder="回应" />
                <span class="respondOperation">
                  <i class="expression"></i>
                  <i @click="$refs.file.click()" class="picture"></i>
                  <i @click="$refs.video.click()" class="video"></i>
                </span>
              </div>
              <div class="respondBtn" @click="respeak(item.post.id,index,items.comment.id)">回应</div>
            </div>
          </label>
          <div class="respondMain">
            <div class="respondInput">
              <input type="text" v-model="talk" placeholder="评价" />
              <span class="respondOperation">
                <i class="expression"></i>
                <i @click="$refs.file.click()" class="picture"></i>
                <i @click="$refs.video.click()" class="video"></i>
              </span>
            </div>
            <div class="respondBtn" @click="respeak(item.post.id,index)">评价</div>
          </div>
        </div>
      </div>
    </div>

    <div class="clearfix"></div>
  </div>
</template>
<script>
// import axios from "../http/axios";
export default {
  name: "pull",
  data() {
    return {
      retalk: "",
      talk: "",
      showTip: {
        index: 0,
        type: false
      },
      reback: {
        index: "",
        reindex: ""
      },
      show: false,
      data_item: {},
      infos: {},
      val: "",
      contract: "",
      isinfo: true,
      tab: 0
    };
  },
  props: ["posts", "tabs"],
  mounted() {
    this.data_item = this.posts;
    this.tab = this.tabs;
    console.log(this.tabs);
  },
  watch: {
    posts: {
      immediate: true,
      handler(val) {
        this.data_item = val;
      }
    },
    tabs: {
      immediate: true,
      handler(val) {
        this.tab = val;
      }
    }
  },
  methods: {
    hideMe: function() {
      console.log(123456);
      this.isinfo = false;
    },
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
    // respeak:function () {
    // this.$emit();
    // },
    // 获取评论
    getadd: async function(id, index) {
      let token = localStorage.getItem("token");
      const bearer = "Bearer " + token;
      let self = this;
      let postapi = "/comments/" + id;
      const add = await axios.get("/" + postapi, {});
      if (add.code == 0) {
        // self.posts[index].comments=add.data.comments
        self.$set(self.data_item[index], "comments", add.data.comments);
        console.log(add.data.comments);
        self.talk = "";
        self.$forceUpdate();
      }
    },
    // 点赞、取消、
    like: async function(id) {
      let postapi = "/protected/post/like";
      let dat = {
        post: id,
        op: 1
      };
    },
    //   // 评论 回复
    respeak: async function(id, index, reid) {
      let val = this.talk;
      console.log(reid);
      if (reid) {
        val = this.retalk;
      }
      let postapi = "/protected/comment/create";
      let dat = {
        post: id,
        content: val,
        ref_comment: reid ? reid : null
      };
      const spk = await axios.post("/" + postapi, dat);
      if (spk.code == 0) {
        this.getadd(id, index);
      }
    },
    deletePull: async function(id) {
      let postapi = "/protected/post";
      let dat = {
        post: id
      };
      const spk = await axios.delete("/" + postapi, dat);
      if (spk.code == 0) {
        this.$toast({
          text: "删除成功！"
        });
        this.$emit("childFn");
      }
    },
    close: function(index) {
      let self = this;
      this.$delete(self.data_item[index], "comments");
      self.$forceUpdate();
    }
  }
};
</script>

<style scoped>
</style>
