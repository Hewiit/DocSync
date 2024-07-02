<template>
  <div class="main-container">
    <el-card :body-style="{padding: '5px'}">
      <template #header>
        <div class="flex justify-between">
          <el-link :underline="false">Print the picture</el-link>
          <el-button
            type="primary"
            size="small"
            @click="printImage"
          >Print</el-button>
        </div>
      </template>
      <div class="image-wrapper">
        <img :src="imagePath" />
      </div>
    </el-card>
    <el-card
      :body-style="{padding: '5px'}"
      class="margin-top-xs"
    >
      <template #header>
        <div class="flex justify-between">
          <el-link :underline="false">Print HTML</el-link>
          <el-button
            type="primary"
            size="small"
            @click="printHtml"
          >Print</el-button>
        </div>
      </template>
      <div
        id="htmlWrapper"
        class="html-wrapper flex justify-center align-center flex-direction"
      >
        <el-table
          :data="dataList"
          :header-cell-style="tableConfig.headerCellStyle"
          :size="tableConfig.size"
          :stripe="tableConfig.stripe"
          :border="tableConfig.border"
        >
          <el-table-column
            align="center"
            label="Name"
            prop="name"
          />
          <el-table-column
            align="center"
            label="Age"
            prop="age"
          />
          <el-table-column
            align="center"
            label="Gender"
            prop="gender"
          />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import printJS from 'print-js'
import imagePath from '@/assets/img_vue.jpeg'
import TableMixin from '@/mixins/TableMixin'
export default {
  name: 'Print',
  mixins: [TableMixin],
  data() {
    return {
      imagePath,
      dataList: []
    }
  },
  methods: {
    printImage() {
      printJS({
        printable: imagePath,
        type: 'image',
        showModal: false
      })
    },
    printHtml() {
      printJS({
        printable: 'htmlWrapper',
        type: 'html',
        targetStyles: ['*']
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.html-wrapper,
.image-wrapper {
  width: 80%;
  margin: 0 auto;
  & > img {
    width: 100%;
  }
}
.html-wrapper {
  margin: 0 auto;
  & > h1 {
    color: red;
  }
}
</style>
