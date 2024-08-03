<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="left">
        <el-button
          size="mini"
          icon="el-icon-back"
          @click="onGroup"
        >Back</el-button>
      </template>
      <template slot="right">
        <el-button
          size="mini"
          icon="el-icon-plus"
          @click="onGroupMember()"
        >Member Management
        </el-button>
        <el-button
          size="mini"
          icon="el-icon-plus"
          @click="dialogFormVisible = true"
        >Create
        </el-button>
        <el-button
          type="warning"
          size="mini"
          icon="el-icon-delete"
          @click="onGroupRecover"
        >Recycle Bin
        </el-button>
      </template>
    </TableHeader>
    <el-dialog title="Create Document" :visible.sync="dialogFormVisible">
      <el-form :model="form2">
        <el-form-item label="Document Name" :label-width="formLabelWidth">
          <el-input v-model="form2.word_name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Public" :label-width="formLabelWidth">
          <el-radio v-model="radio" label="1">Yes</el-radio>
          <el-radio v-model="radio" label="0">No</el-radio>
        </el-form-item>
        <el-form-item label="Choose Template" :label-width="formLabelWidth">
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
                  <span>Task List</span>
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
          :data="teamWordList"
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
            label="Created Time"
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
            label="Public"
            prop="open"
            width="80"
          />
          <el-table-column
            align="center"
            label="Operation"
            width="300"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                :underline="false"
                @click="onGroupRichTextEditor(scope.row)"
              >Edit</el-button>
              <el-popover
                placement="top"
                width="350"
              >
                <p>Document Management</p>
                <el-popover
                  v-model="visible"
                  placement="top"
                  width="320"
                >
                  <el-switch
                    v-model="isPublic"
                    inactive-color="#13ce66"
                    active-color="#FFBF00"
                    active-text="Partially Public"
                    inactive-text="Fully Public"
                  />
                  <el-popover
                    v-model="visible"
                    placement="top"
                    width="350"
                  >
                    <p>Add Collaborator by ID</p>
                    <el-input v-model="form_invite.accept_id" placeholder="Select Member" />
                    <p></p>
                    <div style="text-align: left; margin: 0">
                      <el-button size="mini" style="margin-top:10px" @click="cooperate_invite(scope.row), visible = false">Confirm</el-button>
                    </div>
                    <el-button
                      slot="reference"
                      style="margin:10px"
                      size="mini"
                      icon="el-icon-plus"
                    >Add Member
                    </el-button>
                  </el-popover>
                  <el-table :data="gridData" empty-text="No Data">
                    <el-table-column width="140" property="name" label="Name" />
                    <el-table-column width="60" property="power" label="Permission" />
                    <el-table-column align="center" label="Operation" width="80">
                      <template>
                        <el-button size="mini" type="danger" :underline="false">Delete</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-button
                    slot="reference"
                    v-permission="['admin', 'editor']"
                    style="margin-inline:10px"
                    size="mini"
                    icon="el-icon-plus"
                  >Collaborate
                  </el-button>
                </el-popover>
                <el-button
                  size="mini"
                  type="warning"
                  :underline="false"
                  style="margin:10px"
                  @click="unlock(scope.row)"
                >Force Unlock</el-button>
                <el-button
                  v-if="scope.row.open === 'Yes'"
                  size="mini"
                  :underline="false"
                  @click="openTeamWord(scope.row)"
                >Set Private</el-button>
                <el-button
                  v-if="scope.row.open === 'No'"
                  size="mini"
                  :underline="false"
                  @click="openTeamWord(scope.row)"
                >Set Public</el-button>
                <el-button
                  slot="reference"
                  style="margin-inline:10px"
                  size="mini"
                  icon="el-icon"
                >Manage
                </el-button>
              </el-popover>
              <el-button
                size="mini"
                type="danger"
                :underline="false"
                @click="OnDelete(scope.row)"
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
import store from '@/layouts/store'
import qs from 'qs'
export default {
  name: 'TableGroupLatest',
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
      powerOptions: [
        {
          value: 1,
          label: 'captain'
        },
        {
          value: 2,
          label: 'developer'
        },
        {
          value: 3,
          label: 'observer'
        }
      ],
      form: {
          token: getters.getToken(state),
          user_id: getters.getUserId(state),
          username: getters.getUserName(state),
          team_id: localStorage.getItem('team_id')
      },
      radio: '0',
      radio2: '0',
      form2: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_name: '',
        team_id: Number(localStorage.getItem('team_id')),
        open: 0,
        template_id: 0
      },
      form3: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: 0,
        team_id: Number(localStorage.getItem('team_id'))
      },
      form4: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: 0
      },
      form_invite: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        accept_id: null,
        word_id: null,
        team_id: Number(localStorage.getItem('team_id'))
      },
      form_openTeamWord: {
        token: getters.getToken(state),
        user_id: getters.getUserId(state),
        username: getters.getUserName(state),
        word_id: 0,
        team_id: Number(localStorage.getItem('team_id')),
        open: 0
      },
      teamWordList: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      isPublic: true
    }
  },
  created() {
    this.Refresh()
    localStorage.setItem('flag', 'team')
    localStorage.setItem('shareFlag', 'false')
    localStorage.setItem('addCooper', 'true')
  },
  methods: {
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
    openTeamWord(item) {
      this.form_openTeamWord.word_id = item.word_id
      this.form_openTeamWord.open = item.open === 'yes' ? 0 : 1
      this.$axios.post('/worddocx/team_edit_open_word', qs.stringify(this.form_openTeamWord))
        .then(res => {
            if (res.data.result === 6) {
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
      this.$axios.post('/worddocx/team_unlock_word', qs.stringify(this.form3))
        .then(res => {
          if (res.data.result === 6) {
            this.$message.success(res.data.message)
            localStorage.setItem('enable', 'true')
            location.reload()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    addWord() {
      if (this.radio2 === '0') { this.form2.template_id = 0 } else if (this.radio2 === '1') { this.form2.template_id = 1 } else if (this.radio2 === '2') { this.form2.template_id = 2 } else { this.form2.template_id = 3 }
      if (this.radio === '0') { this.form2.open = 0 } else this.form2.open = 1
      this.$axios.post('/worddocx/team_create_word', qs.stringify(this.form2))
      .then((res) => {
          if (res.data.result === 5) {
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
      this.teamWordList = []
      this.$axios.post('/worddocx/team_word_message_list', qs.stringify(this.form))
        .then((res) => {
          if (res.data.result === 4) {
            for (let i = 0; i < res.data.team_word_message_list.length; i++) {
              const words = {
                name: '',
                word_id: 0,
                create_time: '',
                edit_time: '',
                last_id: 0,
                is_editing: '',
                open: ''
              }
              words.name = res.data.team_word_message_list[i].word_name
              words.word_id = res.data.team_word_message_list[i].word_id
              words.create_time = res.data.team_word_message_list[i].create_time
              words.edit_time = res.data.team_word_message_list[i].edit_time
              words.last_id = res.data.team_word_message_list[i].last_edit_user_id
              words.is_editing = res.data.team_word_message_list[i].is_editing === 1 ? 'yse' : 'no'
              words.open = res.data.team_word_message_list[i].open === 1 ? 'yes' : 'no'
              let flag = 0
              for (let i = 0; i < this.teamWordList.length; i++) {
                if (this.teamWordList[i].word_id === words.word_id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.teamWordList.push(words) }
            }
          }
          this.loading = false
        })
    },
    cooperate_invite(item) {
      this.form_invite.word_id = item.word_id
      this.$axios.post('/team/send_cooperate_inviter', qs.stringify(this.form_invite))
        .then((res) => {
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    onGroupRichTextEditor(item) {
      this.form3.word_id = item.word_id
      this.$axios.post('/worddocx/team_edit_word', qs.stringify(this.form3))
        .then(res => {
            if (res.data.result === 6) {
              this.$message.success('Get！')
              localStorage.setItem('team_word_name', item.name)
              localStorage.setItem('team_word_id', item.word_id)
              localStorage.setItem('team_word_content', res.data.word_content)
              localStorage.setItem('enable', 'true')
              store.toGroupRichTextEditor && store.toGroupRichTextEditor()
            } else if (res.data.result === 3 || res.data.result === 5) {
              this.$message.error(res.data.message)
              this.$axios.post('/worddocx/team_look_word', qs.stringify(this.form3))
                .then(res => {
                    if (res.data.result === 4) {
                      localStorage.setItem('team_word_name', item.name)
                      localStorage.setItem('team_word_id', item.word_id)
                      localStorage.setItem('team_word_content', res.data.word_content)
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
    OnDelete(item) {
      this.form3.word_id = item.word_id
      this.$axios.post('/worddocx/team_delete_word', qs.stringify(this.form3))
        .then(res => {
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
            this.Refresh()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    onGroupMember() {
      store.toGroupMember && store.toGroupMember()
    },
    onGroupRecover() {
      store.toGroupRecover && store.toGroupRecover()
    },
    onGroup() {
      store.toGroup && store.toGroup()
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
