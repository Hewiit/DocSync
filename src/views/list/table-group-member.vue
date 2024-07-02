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
        <el-popover
          v-model="visible"
          placement="top"
          width="350"
        >
          <p>Add collaborator by ID</p>
          <el-input
            v-model="form_invite.accept_id"
            placeholder="Enter ID"
            style="width: 80%; margin: auto"
          />
          <p></p>
          <el-select v-model="form_invite.power" placeholder="Select permission">
            <el-option
              v-for="item in powerOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div style="text-align: left; margin: 0">
            <el-button size="mini" style="margin-top: 10px" @click="invite(), visible = false">Confirm</el-button>
          </div>
          <el-button
            slot="reference"
            style="margin-right: 10px"
            size="mini"
            icon="el-icon-plus"
          >Add Member
          </el-button>
        </el-popover>
        <el-button
          v-if="isInited('deleteItemsModel')"
          type="danger"
          size="mini"
          icon="el-icon-delete"
          @click="deleteMultiItem"
        >Delete Member
        </el-button>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template>
        <el-table
          ref="table"
          v-loading="loading"
          :data="memberList"
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
            label="ID"
            prop="id"
            width="100px"
          />
          <el-table-column
            align="center"
            label="Username"
            prop="username"
            width="240px"
          />
          <el-table-column
            align="center"
            label="Email"
            prop="email"
            width="320px"
          />
          <el-table-column
            align="center"
            label="Permission"
            prop="power"
            width="100px"
          />
          <el-table-column
            align="center"
            label="Action"
          >
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                width="350"
              >
                <p>Change member permission</p>
                <el-select v-model="form_setPerm.perm" placeholder="Select permission">
                  <el-option
                    v-for="item in powerOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <div style="text-align: left; margin: 0">
                  <el-button size="mini" style="margin-top: 10px" @click="setPerm(scope.row)">Confirm</el-button>
                </div>
                <el-button
                  slot="reference"
                  style="margin-inline: 10px"
                  size="mini"
                >Change Member Permission</el-button>
              </el-popover>
              <el-button
                size="mini"
                type="danger"
                :underline="false"
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
import store from '@/layouts/store'
import qs from 'qs'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
export default {
  name: 'TableGroupMember',
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
      visible_setPerm: true,
      loading: false,
      form_member: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id'))
      },
      visible: false,
      form_invite: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        send_id: getters.getUserId(state),
        accept_id: null,
        team_id: Number(localStorage.getItem('team_id')),
        power: null
      },
      form_deleteMember: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id')),
        deleted_id: null
      },
      form_quitTeam: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id'))
      },
      form_setPerm: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: Number(localStorage.getItem('team_id')),
        member_id: 0,
        perm: null
      },
      memberList: [],
      deleteMemberList: [],
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
    this.getMemberList()
  },
  methods: {
    setPerm(item) {
      this.form_setPerm.member_id = item.id
      this.$axios.post('/team/set_perm', qs.stringify(this.form_setPerm))
        .then((res) => {
          // console.log(5)
          if (res.data.result === 7) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getMemberList()
        })
    },
    deleteItem(item) {
      if (item.id === this.form_deleteMember.user_id) {
        this.$confirm('This action will make you leave this team' + ', continue?', 'Prompt', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.quitTeam()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Operation canceled'
          })
        })
      } else {
        this.$confirm('This action will kick out user member ' + item.username + ', continue?', 'Prompt', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deleteMember(item)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Operation canceled'
          })
        })
      }
    },
    handleSelectionChange(items) {
      this.deleteMemberList = items
    },
    deleteMultiItem() {
      this.$confirm('This action will kick out all selected members, continue?', 'Prompt', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.deleteMemberList.length; i++) {
          this.deleteMember(this.deleteMemberList[i])
        }
        this.getMemberList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Kick out canceled'
        })
      })
    },
    deleteMember(item) {
      this.form_deleteMember.deleted_id = item.id
      // console.log(item.id)
      this.$axios.post('/team/delete_member', qs.stringify(this.form_deleteMember))
        .then((res) => {
          // console.log(5)
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getMemberList()
        })
    },
    quitTeam() {
      this.$axios.post('/team/quit_team', qs.stringify(this.form_quitTeam))
        .then((res) => {
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.onGroupSpace()
        })
    },
    onGroupSpace() {
      store.toGroupSpace && store.toGroupSpace()
    },
    clearList() {
      this.memberList = []
    },
    onFile() {
      this.$router.push('/list/table-group-file')
    },
    getMemberList() {
      this.loading = true
      this.clearList()
      this.$axios.post('/team/get_team_member_list', qs.stringify(this.form_member))
        .then((res) => {
          if (res.data.result === 4) {
            for (let i = 0; i < res.data.team_member_list.length; i++) {
              const members = {
                sno: 0,
                id: 0,
                username: '',
                email: '',
                power: ''
              }
              members.sno = i + 1
              members.id = res.data.team_member_list[i].id
              members.username = res.data.team_member_list[i].username
              members.email = res.data.team_member_list[i].email
              if (res.data.team_member_list[i].power === 1) {
                members.power = 'Captain'
              } else if (res.data.team_member_list[i].power === 2) {
                members.power = 'Developer'
              } else if (res.data.team_member_list[i].power === 3) {
                members.power = 'Observer'
              }
              let flag = 0
              for (let i = 0; i < this.memberList.length; i++) {
                if (this.memberList[i].id === members.id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.memberList.push(members) }
              // this.$message.success(res.data.message)
            }
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
    },
    invite() {
      this.$axios.post('/team/invite_member', qs.stringify(this.form_invite))
        .then((res) => {
          if (res.data.result === 6) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    onRichTextEditor() {
      store.toRichTextEditor && store.toRichTextEditor()
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
        this.$errorMsg('Uploaded file cannot exceed 500K')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
