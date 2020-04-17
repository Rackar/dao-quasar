<template>
  <div>
    <!--      发帖-->
    <div class="sendPostModal">
      <div class="sendPostMain">
        <!-- <div class="closeModal" @click="speaks"></div> -->
        <div class="textarea">
          <textarea v-model="abbcontent" placeholder="有什么新鲜事告诉大家…"></textarea>
          <div id="result">
            <div class="imaList" v-for="(item,index) in imgList" :key="index">
              <img :src="item" />
              <div class="close" @click="removeImg(index)">X</div>
            </div>
          </div>
          <div class="right allwords">{{abbcontent.length}}/200</div>
        </div>
        <div>
          <div class="left">
            <img src="~assets/expression.png" />
            <img @click="$refs.file.click()" src="~assets/picture.png" />
            <img @click="$refs.video.click()" src="~assets/video.png" />
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
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return { imgList: [], abbcontent: "" };
  },
  watch: {},
  computed: {},
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
    }, //   // 创建帖子
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
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss">
</style>