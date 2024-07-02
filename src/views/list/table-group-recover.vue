<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="left">
        <el-button
          size="mini"
          icon="el-icon-back"
          @click="onFile"
        >Back</el-button>
      </template>
      <template slot="right">
        <el-button
          size="mini"
          icon="el-icon-refresh-right"
          @click="recoverMultiItem"
        >Recover
        </el-button>
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete-solid"
          @click="deleteMultiItem"
        >Delete
        </el-button>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template>
        <el-table
          ref="table"
          v-loading="tableLoading"
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
            label="Index"
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
          />
          <el-table-column
            align="center"
            label="Creation Time"
            prop="create_time"
          />
          <el-table-column
            align="center"
            label="Public Access"
            prop="open"
          />
          <el-table-column
            align="center"
            label="Deletion Time"
            prop="deleteTime"
            width="140px"
          />
          <el-table-column
            align="center"
            label="Action"
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
                icon="el-icon-delete"
                @click="deleteItem(scope.row)"
              >Delete</el-button>
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
  name: 'TableGroupRecover',
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
      form: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id'))
      },
      form1: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        team_id: Number(localStorage.getItem('team_id')),
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
    localStorage.setItem('flag', 'team')
  },
  methods: {
    handleSelectionChange(vals) {
      this.deleteList = vals
    },
    recoverMultiItem() {
      this.$confirm('This operation will recover all selected files, continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.deleteList.forEach(item => {
          this.Recover(item)
        })
        this.Refresh()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Recovery canceled'
        })
      })
    },
    deleteMultiItem() {
      this.$confirm('This operation will permanently delete all selected files, continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.deleteList.forEach(item => {
          this.Delete(item)
        })
        this.Refresh()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Deletion canceled'
        })
      })
    },
    deleteItem(item) {
      this.$confirm('This operation will permanently delete this file, continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.Delete(item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Deletion canceled'
        })
      })
    },
    Delete(item) {
      this.form1.word_id = item.word_id
      this.$axios.post('/worddocx/team_real_delete_word', qs.stringify(this.form1))
        .then(res => {
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
            this.Refresh()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    Recover(item) {
      this.form1.word_id = item.word_id
      this.$axios.post('/worddocx/team_recover_word', qs.stringify(this.form1))
        .then(res => {
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
            this.Refresh()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    onFile() {
      this.$router.push('/list/table-group-file')
    },
    Refresh() {
      this.loading = true
      this.groupList = []
      this.$axios.post('/worddocx/team_get_delete_word_list', qs.stringify(this.form))
        .then((res) => {
          if (res.data.result === 4) {
            res.data.team_delete_word_message_list.forEach(data => {
              const words = {
                name: data.word_name,
                word_id: data.word_id,
                create_time: data.create_time,
                edit_time: data.edit_time,
                last_id: data.last_edit_user_id,
                deleteTime: data.delete_time,
                is_editing: data.is_editing === 1 ? 'Yes' : 'No',
                open: data.open === 1 ? 'Yes' : 'No'
              }
              const existing = this.groupList.find(w => w.word_id === words.word_id)
              if (!existing) {
                this.groupList.push(words)
              } else {
                existing.is_editing = words.is_editing
              }
            })
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
        this.$errorMsg('File size cannot exceed 500K')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

