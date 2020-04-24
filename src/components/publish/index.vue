<template>
  <q-dialog v-model="shouldShow" :persistent="isLoading">
    <div class="container">
      <div v-if="isLoading" class="waiting">
        <q-spinner color="primary" size="3em" />
      </div>

      <div class="body">
        <textarea
          ref="textarea"
          maxlength="200"
          v-model="content"
          :placeholder="placeholder"
        ></textarea>
      </div>

      <div class="footer">
        <div class="left">
          <!-- <img class="imgBtn" src="~assets/expression.png" /> -->
          <img class="imgBtn" @click="onImgBtnClick" src="~assets/picture.png" />
          <img class="imgBtn" @click="onVideoBtnClick" src="~assets/video.png" />
        </div>
        <div>
          <div class="wordLength" v-if="!hasMaxText">{{ content.length }}/200</div>
          <div class="maxTextErr" v-else>已超出200字</div>
        </div>
      </div>

      <div class="media">
        <div
          class="imgItem"
          v-for="item in imgList"
          :key="item.id"
          :style="{ backgroundImage: `url(${item.previewUrl})` }"
        >
          <div class="close removeBtn" @click="removeMedia('imgList', item.id)">
            <q-icon :name="removeIcon" />
          </div>
        </div>

        <div class="videoItem" v-for="item in videoList" :key="item.id">
          <video controls="true" :src="item.previewUrl" />
          <div class="close removeBtn" @click="removeMedia('videoList', item.id)">
            <q-icon :name="removeIcon" />
          </div>
        </div>
      </div>

      <div class="sendPostBtn" @click="publish">{{publishBtnLabel}}</div>

      <input
        hidden="hidden"
        ref="imgInput"
        id="file-chooser"
        @change="uploadImg"
        type="file"
        accept="image/*"
      />
      <input
        hidden="hidden"
        ref="videoInput"
        id="vadio-chooser"
        @change="uploadVideo"
        type="file"
        accept="video/*"
      />
    </div>
  </q-dialog>
</template>

<script src="./index.js"></script>
<style lang="scss" src="./index.scss" scoped="true"></style>