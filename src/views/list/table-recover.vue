<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="right">
        <el-button
          size="mini"
          icon="el-icon-plus"
          @click="recoverMutiItem"
        >Recover
        </el-button>
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete-solid"
          @click="deleteMultiItem"
        >Delete Permanently
        </el-button>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template>
        <el-table
          ref="table"
          v-loading="loading"
          :data="groupList"
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
            label="Number"
            width="60"
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
            label="Is Public"
            prop="open"
            width="80"
          />
          <el-table-column
            align="center"
            label="Deletion Time"
            prop="deleteTime"
            width="180px"
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
                icon="el-icon-refresh-right"
                @click="Recover(scope.row)"
              >Recover</el-button>
              <el-button
                size="mini"
                type="danger"
                :underline="false"
                icon="el-icon-delete-solid"
                @click="deleteItem(scope.row)"
              >Delete Permanently</el-button>
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
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import qs from 'qs'

export default {
  name: 'TableRecover',
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
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: 0
      },
      groupList: [],
      deleteList: [],
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
  },
  methods: {
    handleSelectionChange(vals) {
      this.deleteList = vals
    },
    recoverMutiItem() {
      this.$confirm('This operation will recover all selected files. Continue?', 'Prompt', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.deleteList.length; i++) {
          this.Recover(this.deleteList[i])
        }
        this.Refresh()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled recovery'
        })
      })
    },
    deleteMultiItem() {
      this.$confirm('This operation will permanently delete all selected files. Continue?', 'Prompt', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.deleteList.length; i++) {
          this.Delete(this.deleteList[i])
        }
        this.Refresh()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled deletion'
        })
      })
    },
    deleteItem(item) {
      this.$confirm('This operation will permanently delete this file. Continue?', 'Prompt', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.Delete(item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled deletion'
        })
      })
    },
    Delete(item) {
      this.form1.word_id = item.word_id
      this.$axios.post('/worddocx/user_real_delete_word', qs.stringify(this.form1))
        .then(res => {
          if (res.data.result === 3) {
            this.$message.success(res.data.message)
            this.Refresh()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    Recover(item) {
      this.form1.word_id = item.word_id
      this.$axios.post('/worddocx/user_recover_word', qs.stringify(this.form1))
        .then(res => {
          if (res.data.result === 3) {
            this.$message.success(res.data.message)
            this.Refresh()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    Refresh() {
      this.loading = true
      this.groupList = []
      this.$axios.post('/worddocx/user_get_delete_word_list', qs.stringify(this.form))
        .then((res) => {
          if (res.data.result === 3) {
            for (let i = 0; i < res.data.user_delete_word_message_list.length; i++) {
              const words = {
                name: '',
                word_id: '',
                create_time: '',
                edit_time: '',
                last_id: 0,
                deleteTime: 0,
                is_editing: '',
                open: ''
              }
              words.name = res.data.user_delete_word_message_list[i].word_name
              words.word_id = res.data.user_delete_word_message_list[i].word_id
              words.create_time = res.data.user_delete_word_message_list[i].create_time
              words.edit_time = res.data.user_delete_word_message_list[i].edit_time
              words.last_id = res.data.user_delete_word_message_list[i].last_edit_user_id
              words.deleteTime = res.data.user_delete_word_message_list[i].delete_time
              words.is_editing = res.data.user_delete_word_message_list[i].is_editing === 1 ? 'Yes' : 'No'
              words.open = res.data.user_delete_word_message_list[i].open === 1 ? 'Yes' : 'No'
              let flag = 0
              for (let i = 0; i < this.groupList.length; i++) {
                if (this.groupList[i].word_id === words.word_id) {
                  this.groupList[i].is_editing = words.is_editing
                  flag = 1
                  break
                }
              }
              if (!flag) { this.groupList.push(words) }
            }
          }
          this.loading = false
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
