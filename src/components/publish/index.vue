<template>
  <q-dialog v-model="shouldShow" :persistent="isLoading">
    <div class="container">
      <div v-if="isLoading" class="waiting">
        <q-spinner color="primary" size="3em" />
      </div>

      <div class="header">
        <q-btn class="closeIcon header_left" icon="close" flat round dense v-close-popup />
        <div class="header_right">未发布的帖子</div>
      </div>

      <slot></slot>

      <div class="body" ref="body">
        <img :src="curUserAvatar" class="avatar" />
        <q-input
          borderless
          autogrow
          class="textarea"
          :placeholder="placeholder"
          :maxlength="maxTextLength"
          v-model="content"
        />
      </div>

      <div class="media grid" :data-length="mediaLength">
        <div
          class="grid_item imgItem"
          v-for="item in imgList"
          :key="item.id"
          :style="{ backgroundImage: `url(${item.previewUrl})` }"
        >
          <div class="close removeBtn" @click="removeMedia('imgList', item.id)">
            <q-icon :name="removeIcon" />
          </div>
        </div>

        <div class="grid_item videoItem" v-for="item in videoList" :key="item.id">
          <q-media-player
            type="video"
            background-color="black"
            radius="4px"
            hide-volume-slider
            dense
            :show-big-play-button="false"
            :sources="[{ src: item.previewUrl }]"
          />
          <div class="close removeBtn" @click="removeMedia('videoList', item.id)">
            <q-icon :name="removeIcon" />
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="footer_left">
          <!-- <img class="imgBtn" src="~assets/expression.png" /> -->
          <img
            svg-inline
            class="imgBtn svg-icon svg-icon--middle-grey svg-icon--hover-dark-grey"
            :data-disabled="!canUploadImg"
            @click="onImgBtnClick"
            src="@/statics/icons/icon_tupian_normal.svg"
          />
          <img
            svg-inline
            class="imgBtn svg-icon svg-icon--middle-grey svg-icon--hover-dark-grey"
            :data-disabled="!canUploadVideo"
            @click="onVideoBtnClick"
            src="@/statics/icons/icon_shipin_normal.svg"
          />
        </div>
        <div class="footer_right">
          <div class="wordLength">{{ content.length }}/{{ maxTextLength }}</div>
          <q-btn
            class="sendPostBtn"
            @click="publish"
            unelevated
            :disabled="!canPublish"
            color="primary"
          >
            <img
              svg-inline
              class="svg-icon svg-icon--white"
              src="@/statics/icons/icon_fatie.svg"
            />
            <span>{{ publishBtnLabel }}</span>
          </q-btn>
        </div>
      </div>

      <input
        hidden="hidden"
        ref="imgInput"
        id="file-chooser"
        @change="uploadImg"
        type="file"
        accept="image/*"
        multiple
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
