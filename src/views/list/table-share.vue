<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="left">
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template>
        <el-table
          ref="table"
          v-loading="loading"
          :data="cooperationWordList"
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
            prop="id"
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
                icon="el-icon-edit"
                @click="onRichTextEditor(scope.row)"
              >Edit</el-button>
              <el-button
                size="mini"
                type="danger"
                :underline="false"
                icon="el-icon-delete"
                @click="deleteItem(scope.row)"
              >Quit Cooperation</el-button>
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
  name: 'TableShare',
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
      form_getCooperationWordList: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state)
      },
      form_quitCooperate: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: 0
      },
      form: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: 0
      },
      cooperationWordList: [],
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
    this.getCooperationWordList()
    localStorage.setItem('flag', 'user')
    localStorage.setItem('shareFlag', 'true')
    localStorage.setItem('addCooper', 'false')
  },
  methods: {
    deleteItem(item) {
      this.$confirm('This action will remove you from collaborating on this document. Continue?', 'Prompt', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.quitCooperate(item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Cancelled exit'
        })
      })
    },
    quitCooperate(item) {
      this.form_quitCooperate.word_id = item.id
      this.$axios.post('/team/selfout_cooperate', qs.stringify(this.form_quitCooperate))
        .then((res) => {
          if (res.data.result === 3) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getCooperationWordList()
        })
    },
    getCooperationWordList() {
      this.loading = true
      this.cooperationWordList = []
      this.$axios.post('/worddocx/user_cooperation_word_list', qs.stringify(this.form_getCooperationWordList))
        .then((res) => {
          if (res.data.result === 3) {
            for (let i = 0; i < res.data.cooperation_word_list.length; i++) {
              const cooperationWords = {
                id: 0,
                name: '',
                create_time: '',
                is_editing: '',
                open: ''
              }
              cooperationWords.id = res.data.cooperation_word_list[i].word_id
              cooperationWords.name = res.data.cooperation_word_list[i].word_name
              cooperationWords.create_time = res.data.cooperation_word_list[i].create_time
              cooperationWords.is_editing = res.data.cooperation_word_list[i].is_editing === 1 ? 'Yes' : 'No'
              cooperationWords.open = res.data.cooperation_word_list[i].open === 1 ? 'Yes' : 'No'
              let flag = 0
              for (let i = 0; i < this.cooperationWordList.length; i++) {
                if (this.cooperationWordList[i].id === cooperationWords.id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.cooperationWordList.push(cooperationWords) }
            }
          }
          this.loading = false
        })
    },
    onRichTextEditor(item) {
      this.form.word_id = item.id
      this.$axios.post('/worddocx/user_edit_cooperation_word', qs.stringify(this.form))
        .then(res => {
            if (res.data.result === 5) {
              this.$message.success(res.data.message)
              localStorage.setItem('word_name', item.name)
              localStorage.setItem('word_id', item.id)
              localStorage.setItem('user_word_content', res.data.word_content)
              localStorage.setItem('enable', 'true')
              this.$router.push('/editor/rich-text')
            } else if (res.data.result === 4) {
              this.$message.error(res.data.message)
              this.$axios.post('/worddocx/user_look_cooperation_word', qs.stringify(this.form))
                .then(res => {
                  if (res.data.result === 4) {
                    localStorage.setItem('word_name', item.name)
                    localStorage.setItem('word_id', item.id)
                    localStorage.setItem('user_word_content', res.data.word_content)
                    localStorage.setItem('enable', 'false')
                    store.toRichTextReadOnly && store.toRichTextReadOnly()
                  } else {
                    this.$message.error(res.data.message)
                  }
                })
            } else {
              this.$message.error(res.data.message)
            }
          }
        )
    },
    onChooseTemplate() {
      store.toChooseTemplate && store.toChooseTemplate()
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
