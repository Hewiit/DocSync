<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template v-slot:right>
        <el-button
          size="mini"
          icon="el-icon-plus"
          @click="dialogFormVisible = true"
        >Create
        </el-button>
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          @click="deleteMultiItem"
        >Delete
        </el-button>
      </template>
    </TableHeader>
    <el-dialog title="Create Personal Document" :visible.sync="dialogFormVisible">
      <el-form :model="form2">
        <el-form-item label="Document Name" :label-width="formLabelWidth">
          <el-input v-model="form2.word_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Public?" :label-width="formLabelWidth">
          <el-radio v-model="radio" label="1">Yes</el-radio>
          <el-radio v-model="radio" label="0">No</el-radio>
        </el-form-item>
        <el-form-item label="Select Template" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="8">
              <el-card v-model="radio2" :body-style="{ padding: '0px' }">
                <img src="../../assets/template0.jpg" class="image" />
                <div style="padding: 14px;">
                  <span>Blank Document</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="create0">Create</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card v-model="radio2" :body-style="{ padding: '0px' }">
                <img src="../../assets/template1.png" class="image" />
                <div style="padding: 14px;">
                  <span>Meeting Summary</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="create1">Create</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }">
                <img src="../../assets/template2.png" class="image" />
                <div style="padding: 14px;">
                  <span>To-Do List</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="create2">Create</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card :body-style="{ padding: '0px' }">
                <img src="../../assets/template3.png" class="image" />
                <div style="padding: 14px;">
                  <span>Worklist</span>
                  <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="create3">Create</el-button>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
      </div>
    </el-dialog>
    <TableBody ref="tableBody">
      <template>
        <el-table
          ref="table"
          v-loading="loading"
          :data="wordList"
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
            label="No."
            width="60"
          >
            <template v-slot:default="scope">
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
            label="Being Edited?"
            prop="is_editing"
            width="100"
          />
          <el-table-column
            align="center"
            label="Public"
            prop="open"
            width="80"
          />
          <el-table-column
            align="center"
            label="Actions"
            width="260"
          >
            <template v-slot:default="scope">
              <el-button
                size="mini"
                :underline="false"
                icon="el-icon-edit"
                @click="onRichTextEditor(scope.row)"
              >Edit</el-button>
              <el-popover
                placement="top"
                width="350"
              >
                <p>Document Management</p>
                <el-button
                  v-if="scope.row.open === 'Yes'"
                  size="mini"
                  type="warning"
                  :underline="false"
                  @click="openWord(scope.row)"
                >Set to Private</el-button>
                <el-button
                  v-if="scope.row.open === 'No'"
                  size="mini"
                  :underline="false"
                  @click="openWord(scope.row)"
                >Set to Public</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  :underline="false"
                  icon="el-icon-unlock"
                  @click="unlock(scope.row)"
                >Force Unlock</el-button>
                <el-button
                  slot="reference"
                  style="margin-inline:10px"
                  type="info"
                  size="mini"
                  icon="el-icon-setting"
                >Manage
                </el-button>
              </el-popover>
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
import qs from 'qs'
import draggable from '@/directive/draggable'
import store from '@/layouts/store'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
export default {
  name: 'TableCreated',
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
      form2: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        word_name: '',
        open: 0
      },
      form3: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: 0
      },
      form_openWord: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: 0,
        open: 0
      },
      deleteWordList: [],
      radio: '0',
      radio2: '0',
      wordList: [],
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  created() {
    this.Refresh()
    localStorage.setItem('flag', 'user')
    localStorage.setItem('shareFlag', 'false')
    localStorage.setItem('addCooper', 'true')
  },
  methods: {
    openWord(item) {
      this.form_openWord.word_id = item.word_id
      this.form_openWord.open = item.open === 'yes' ? 0 : 1
      this.$axios.post('/worddocx/user_edit_open_word', qs.stringify(this.form_openWord))
        .then(res => {
            if (res.data.result === 4) {
              this.$message.success(res.data.message)
              // localStorage.setItem('enable', 'true')
              this.Refresh()
            } else {
              this.$message.error(res.data.message)
            }
        })
    },
    unlock(item) {
      this.form3.word_id = item.word_id
      this.$axios.post('/worddocx/user_unlock_word', qs.stringify(this.form3))
        .then(res => {
            if (res.data.result === 5) {
              this.$message.success(res.data.message)
              localStorage.setItem('enable', 'true')
              this.Refresh()
            } else {
              this.$message.error(res.data.message)
            }
        })
    },
    create0() {
      this.radio2 = '0'
      this.addWord()
    },
    create1() {
      this.radio2 = '1'
      this.addWord()
    },
    create2() {
      this.radio2 = '2'
      this.addWord()
    },
    create3() {
      this.radio2 = '3'
      this.addWord()
    },
    addWord() {
      if (this.radio2 === '0') { this.form2.template_id = 0 } else if (this.radio2 === '1') { this.form2.template_id = 1 } else if (this.radio2 === '2') { this.form2.template_id = 2 } else { this.form2.template_id = 3 }
      if (this.radio === '0') { this.form2.open = 0 } else this.form2.open = 1
      this.$axios.post('/worddocx/user_create_word', qs.stringify(this.form2))
        .then((res) => {
            if (res.data.result === 3) {
              this.$message.success(res.data.message)
            } else {
              this.$message.error(res.data.message)
            }
            this.Refresh()
            this.dialogFormVisible = false
          }
        )
    },
    Refresh() {
      this.loading = true
      this.wordList = []
      this.$axios.post('/worddocx/user_owe_word_list', qs.stringify(this.form))
        .then((res) => {
          if (res.data.result === 3) {
            for (let i = 0; i < res.data.word_message_list.length; i++) {
              const words = {
                name: '',
                word_id: 0,
                create_time: '',
                edit_time: '',
                last_id: 0,
                is_editing: '',
                open: ''
              }
              words.name = res.data.word_message_list[i].word_name
              words.word_id = res.data.word_message_list[i].word_id
              words.create_time = res.data.word_message_list[i].create_time
              words.edit_time = res.data.word_message_list[i].edit_time
              words.last_id = res.data.word_message_list[i].last_edit_user_id
              words.is_editing = res.data.word_message_list[i].is_editing === 1 ? 'yes' : 'no'
              words.open = res.data.word_message_list[i].open === 1 ? 'yes' : 'no'
              let flag = 0
              for (let i = 0; i < this.wordList.length; i++) {
                if (this.wordList[i].word_id === words.word_id) {
                  this.wordList[i].is_editing = words.is_editing
                  flag = 1
                  break
                }
              }
              if (!flag) { this.wordList.push(words) }
            }
          }
          this.loading = false
        })
    },
    onRichTextEditor(item) {
      this.form3.word_id = item.word_id
      this.$axios.post('/worddocx/user_edit_word', qs.stringify(this.form3))
        .then(res => {
            if (res.data.result === 4) {
              this.$message.success(res.data.message)
              localStorage.setItem('word_name', item.name)
              localStorage.setItem('word_id', item.word_id)
              localStorage.setItem('user_word_content', res.data.word_content)
              localStorage.setItem('enable', 'true')
              store.toRichTextEditor && store.toRichTextEditor()
            } else if (res.data.result === 3) {
              this.$message.error(res.data.message)
              this.$axios.post('/worddocx/user_look_word', qs.stringify(this.form3))
                .then(res => {
                  if (res.data.result === 3) {
                    localStorage.setItem('word_name', item.name)
                    localStorage.setItem('word_id', item.word_id)
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
    onDelete(item) {
      this.form3.word_id = item.word_id
      this.$axios.post('/worddocx/user_delete_word', qs.stringify(this.form3))
        .then(res => {
          if (res.data.result === 4) {
            this.$message.success(res.data.message)
            // location.reload()
          } else {
            this.$message.error(res.data.message)
          }
          this.Refresh()
        })
    },
    deleteItem(item) {
      this.$confirm('This action will permanently delete this file. Continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.onDelete(item)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Deletion canceled'
        })
      })
    },
    deleteMultiItem() {
      this.$confirm('This action will permanently delete all selected files. Continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.deleteWordList.length; i++) {
          this.onDelete(this.deleteWordList[i])
        }
        this.Refresh()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Deletion canceled'
        })
      })
    },
    handleSelectionChange(items) {
      this.deleteWordList = items
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
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
