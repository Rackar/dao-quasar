<template>
  <q-card flat class="container">
    <q-list class="rounded-borders">
      <div v-for="grp in recommendGroups" :key="grp.id">
        <q-item clickable @click="jumpToGroup(grp.id)" v-ripple :class="[ 'group-list']">
          <q-item-section avatar>
            <q-avatar rounded size="50px">
              <img :src="grp.avatar || 'statics/group.svg'" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">
              <span class="group-title">{{ grp.name }}</span>
            </q-item-label>
            <q-item-label caption lines="1">{{ grp.desc_text }}</q-item-label>
          </q-item-section>
          <q-item-section side top class="justify-between">
            <q-icon
              v-if="grp.read_permission === 2"
              name="img:statics/icons/icon_suo_2.svg"
              size="xs"
            />
            <q-item-label v-else class="badge-num">{{ grp.num_post }}</q-item-label>
            <q-item-label caption>{{ $utils.timeStringToLocal(grp.last_post_at, 'RelativeDay') }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator inset="true" />
      </div>
    </q-list>
  </q-card>
</template>
<script>
export default {
  inject: ['reload'],
  components: {},
  props: {
    user_id: String,
  },
  data() {
    return {
      recommendGroups: [],
      lastGroupId: null,
      hasMore: true,
    };
  },
  created() {
    this.init();
  },
  watch: {},
  computed: {
    // userid() {
    //   return this.$store.state.user.userid;
    // },
    // currentGroupId() {
    //   return this.$store.state.group.currentGroup.id;
    // },
  },
  methods: {
    async jumpToGroup(id) {
      this.$router.push('/group/' + id).catch(() => {});
    },

    init() {
      this.getReCommendGroups().then(grp => {
        if (grp.length) {
          this.recommendGroups.push(...grp);
        } else {
        }
      });
    },
    // 获取全部群组
    getReCommendGroups() {
      return new Promise((resolve, reject) => {
        let postUrl = '/grp/joined';
        let data = {
          user_id: +this.user_id,
        };

        this.$axios
          .post(postUrl, data)
          .then(res => {
            if (res.data.code == 0) {
              let arr = res.data.data.grps_joined.map(a => a.grp);
              resolve(arr);
            } else {
              reject([]);
            }
          })
          .catch(() => {
            reject([]);
          });
      });
    },

    // loadMore(index, done) {
    //   if (!this.hasMore) {
    //     return done();
    //   }

    //   this.getReCommendGroups(this.lastGroupId).then(grp => {
    //     if (grp.length) {
    //       this.recommendGroups.push(...grp);
    //       this.lastGroupId = grp[grp.length - 1].id;
    //     } else {
    //       this.hasMore = false;
    //       this.$q.notify('已拉取全部群组');
    //     }
    //     done();
    //   });
    // },
  },
};
</script>
<style lang="stylus" scoped>
.container {
  padding-top: 20px;

  .group-list {
    padding: 18px 48px;
  }

  @media only screen and (max-width: 1024px) {
    .group-list {
      padding: 18px 12px;
    }
  }

  .group-title {
    font-size: 14px;
    font-weight: 600;
    line-height: 25px;
    color: #5C6876;
  }

  .text-caption {
    font-size: 12px;
    color: #8C909D;
  }

  .badge-num {
    font-size: 12px;
    padding: 6px 7px 5px;
    background: rgb(228, 228, 228);
    border-radius: 13px;
    color: #2A3542;
    font-weight: 600;
  }
}

.tuijian {
  padding-left: 22px;
  font-size: 18px;
  font-weight: 600;
  color: rgb(42, 53, 66);
  line-height: 33px;
}

.isActive {
  background-color: #E4E4E4;

  .badge-num {
    background: #F1F1F1;
  }
}

.leftHideTool {
  position: absolute;
  left: 22px;
  top: 31px;
  z-index: 20;
  padding: 1px;
  font-size: 20px;
}

.pin {
  background-color: #dddddd;

  .badge-num {
    background: rgb(241, 241, 241);
  }
}

.menu-hover {
  position: absolute;
  font-size: 14px;
  background-color: white;
  top: 10px;
  left: 20px;
  border-radius: 4px;
}
</style>
