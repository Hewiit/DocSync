<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="right">
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          @click="deleteMultiItem"
        >Cancel Collection
        </el-button>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template>
        <el-table
          ref="table"
          v-loading="loading"
          :data="likedWordList"
          :header-cell-style="tableConfig.headerCellStyle"
          :size="tableConfig.size"
          :stripe="tableConfig.stripe"
          :border="tableConfig.border"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="45"
          />
          <el-table-column
            align="center"
            label="Index"
            width="80"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="File Name"
            prop="name"
          />
          <el-table-column
            align="center"
            label="File ID"
            prop="word_id"
            width="100"
          />
          <el-table-column
            align="center"
            label="Creation Time"
            prop="create_time"
            width="180"
          />
          <el-table-column
            align="center"
            label="Is Editing"
            prop="is_editing"
            width="100"
          />
          <el-table-column
            align="center"
            label="Is Public"
            prop="open"
            width="80"
          />
          <el-table-column
            align="center"
            label="Operation"
            width="260"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                :underline="false"
                icon="el-icon-reading"
                @click="onRichTextEditor(scope.row)"
              >View</el-button>
              <el-button
                size="mini"
                type="danger"
                :underline="false"
                icon="el-icon-star-off"
                @click="deleteItem(scope.row)"
              >Cancel Collection</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </TableBody>
  </div>
</template>

<script>
import TableMixin, { PageModelMixin } from '@/mixins/TableMixin'
import {
  GetDataMixin,
  AddItemMixin,
  DeleteItemsMixin,
  UpdateItemMixin,
  RefreshActionMixin
} from '@/mixins/ActionMixin'
import SingleUpload from '@/components/common/SingleUpload.vue'
import BaseForm from '@/components/common/BaseForm.vue'
import draggable from '@/directive/draggable'
import store from '@/layouts/store'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import qs from 'qs'
export default {
  name: 'TableLike',
  // eslint-disable-next-line vue/no-unused-components
  components: { SingleUpload, BaseForm },
  directives: { draggable },
  mixins: [
    TableMixin,
    PageModelMixin,
    GetDataMixin,
    AddItemMixin,
    DeleteItemsMixin,
    UpdateItemMixin,
    RefreshActionMixin
  ],
  data() {
    return {
      loading: false,
      form: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state)
      },
      form1: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        word_id: ''
      },
      form_quitLike: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: 0
      },
      likedWordList: [],
      cancelLikeList: [],
      userModel: {
        address: '',
        avatar: '',
        gender: 1,
        id: 1,
        lastLoginIp: '',
        lastLoginTime: '',
        nickName: '',
        status: 0,
        vip: 1
      }
    }
  },
  created() {
    this.Refresh()
    localStorage.setItem('flag', 'user')
    localStorage.setItem('shareFlag', 'false')
    localStorage.setItem('enable', 'false')
    localStorage.setItem('addCooper', 'false')
  },
  methods: {
    handleSelectionChange(items) {
      this.cancelLikeList = items
    },
    deleteMultiItem() {
      this.$confirm('This action will cancel collection for selected files. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.cancelLikeList.length; i++) {
          this.cancelLike(this.cancelLikeList[i])
        }
        this.Refresh()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled operation'
        })
      })
    },
    deleteItem(item) {
      this.$confirm('This action will cancel collection for this file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.cancelLike(item)
        this.Refresh()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled operation'
        })
      })
    },
    cancelLike(item) {
      this.form_quitLike.word_id = item.word_id
      this.$axios.post('/worddocx/user_cancel_collect', qs.stringify(this.form_quitLike))
        .then((res) => {
          if (res.data.result === 3) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.Refresh()
        })
    },
    Refresh() {
      this.loading = true
      this.likedWordList = []
      this.$axios.post('/worddocx/user_get_collect_word_list', qs.stringify(this.form))
        .then((res) => {
          if (res.data.result === 3) {
            for (let i = 0; i < res.data.collect_word_list.length; i++) {
              const words = {
                name: '',
                word_id: 0,
                create_time: '',
                edit_time: '',
                last_id: 0,
                is_editing: '',
                open: ''
              }
              words.name = res.data.collect_word_list[i].word_name
              words.word_id = res.data.collect_word_list[i].word_id
              words.create_time = res.data.collect_word_list[i].create_time
              words.edit_time = res.data.collect_word_list[i].edit_time
              words.last_id = res.data.collect_word_list[i].last_edit_user_id
              words.is_editing = res.data.collect_word_list[i].is_editing === 1 ? 'Yes' : 'No'
              words.open = res.data.collect_word_list[i].open === 1 ? 'Yes' : 'No'
              let flag = 0
              for (let i = 0; i < this.likedWordList.length; i++) {
                if (this.likedWordList[i].word_id === words.word_id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.likedWordList.push(words) }
            }
          }
          this.loading = false
        })
    },
    onRichTextEditor(item) {
      this.form1.word_id = item.word_id
      this.$axios.post('/worddocx/user_get_collect_word_content', qs.stringify(this.form1))
        .then(res => {
          if (res.data.result === 3) {
            localStorage.setItem('word_name', item.name)
            localStorage.setItem('word_id', item.word_id)
            localStorage.setItem('user_word_content', res.data.word_content)
            store.toRichTextReadOnly && store.toRichTextReadOnly()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    onSingleSuccess({ res }) {
      if (res.status !== 200) {
        this.$errorMsg(res.msg)
      } else {
        this.userModel = res.obj
      }
    },
    beforeUpload(file) {
      const size = file.size
      if (size / 1024 > 500) {
        this.$errorMsg('Uploaded file size cannot exceed 500K')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
