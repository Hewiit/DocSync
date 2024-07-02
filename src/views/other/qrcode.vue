<template>
  <el-card
    :body-style="{padding: '0'}"
    shadow="never"
    class="main-container"
  >
    <template #header>
      <div class="flex">
        <el-link :underline="false">generate the QRcode</el-link>
        <el-input
          v-model="qrText"
          class="flex-sub margin-lr"
          size="small"
          placeholder="Please input"
        />
        <el-button
          type="primary"
          size="mini"
          @click="generatorCode"
        >Click to Generate</el-button>
      </div>
    </template>
    <div
      v-show="qrUrl"
      class="content-wrappar flex flex-direction justify-center align-center"
    >
      <img
        ref="canvas"
        :src="qrUrl"
        class="canvas"
      />
      <div class="setting-wrapper margin-top">
        <div class="flex justify-between align-center">
          <span class="label">Span</span>
          <el-slider
            v-model="margin"
            :step="1"
            :max="10"
            :min="1"
            class="slider-wrapper"
            @change="onMarginChange"
          />
        </div>
        <div class="flex justify-center align-center margin-top">
          <el-button
            size="mini"
            type="primary"
            @click="changeBgColor"
          >changeBgColor</el-button>
          <el-button
            size="mini"
            type="warning"
            @click="changeFrColor"
          >changeFrColor</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="restore"
          >restore</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import Qrcode from 'qrcode'
export default {
  name: 'Qrcode',
  data() {
    return {
      qrText: '',
      qrUrl: '',
      margin: 1,
      lightColor: '',
      darkColor: ''
    }
  },
  methods: {
    generatorCode() {
      if (!this.qrText) {
        this.$errorMsg('Please Input the QRcode content')
        return
      }
      Qrcode.toDataURL(this.qrText, {
        width: 250,
        margin: this.margin,
        color: {
          dark: this.darkColor,
          light: this.lightColor
        }
      }).then(res => {
        this.qrUrl = res
      })
    },
    onMarginChange() {
      this.generatorCode()
    },
    changeBgColor() {
      this.lightColor = '#ffff00'
      this.generatorCode()
    },
    changeFrColor() {
      this.darkColor = '#ff0000'
      this.generatorCode()
    },
    restore() {
      this.lightColor = ''
      this.darkColor = ''
      this.margin = 1
      this.generatorCode()
    }
  }
}
</script>

<style lang="scss" scoped>
.content-wrappar {
  .canvas {
    width: 250px !important;
    height: 250px !important;
    border: 2px solid #f5f5f5;
  }
  .setting-wrapper {
    width: 50%;
    .label {
      width: 50px;
    }
    .slider-wrapper {
      width: 100%;
    }
  }
}
</style>
