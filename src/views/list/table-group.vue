<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template slot="right">
        <el-popover
          v-model="visible_applyTeam"
          placement="top"
          width="350"
        >
          <p>Apply to Join Team by ID</p>
          <el-input
            v-model="form_applyTeam.team_id"
            placeholder="Enter Team ID"
            style="width: 80%; margin: auto"
          />
          <div style="text-align: left; margin: 0">
            <el-button size="mini" style="margin-top: 10px" @click="applyTeam(), visible_applyTeam = false, form_applyTeam.team_id = null">Confirm</el-button>
          </div>
          <el-button
            slot="reference"
            style="margin-right: 10px"
            size="mini"
            icon="el-icon-plus"
          >Apply</el-button>
        </el-popover>
        <el-button
          size="mini"
          icon="el-icon-plus"
          @click="dialogFormVisible = true"
        >Create Team
        </el-button>
        <el-button
          type="danger"
          size="mini"
          icon="el-icon-delete"
          @click="deleteMultiItem"
        >Dismiss/Leave
        </el-button>
      </template>
    </TableHeader>
    <el-dialog title="Create Team" :visible.sync="dialogFormVisible">
      <el-form :model="form2">
        <el-form-item label="Team Name" :label-width="formLabelWidth">
          <el-input v-model="form2.team_name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false; form2.team_name = null">Cancel</el-button>
        <el-button @click="addTeam">Confirm</el-button>
      </div>
    </el-dialog>
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
            label="No."
            width="80"
          >
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="Team ID"
            prop="id"
            width="100"
          />
          <el-table-column
            align="center"
            label="Team Name"
            prop="name"
          />
          <el-table-column
            align="center"
            label="Created Time"
            prop="time"
            width="180"
          />
          <el-table-column
            align="center"
            label="Members"
            prop="member_num"
            width="80"
          />
          <el-table-column
            align="center"
            label="Documents"
            prop="word_num"
            width="80"
          />
          <el-table-column
            align="center"
            label="Permission"
            prop="power"
            width="140px"
          />
          <el-table-column
            align="center"
            label="Operation"
            width="260"
          >
            <template slot-scope="scope">
              <el-dialog title="Transfer Leader Permission" :visible.sync="scope.row.dialogVisible">
                <el-form :model="form1">
                  <el-form-item label="Member ID to Transfer" :label-width="formLabelWidth">
                    <el-input v-model="form1.member_id" autocomplete="off" />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="scope.row.dialogVisible = false; form1.member_id = null">Cancel</el-button>
                  <el-button @click="Leader_change(scope.row), scope.row.dialogVisible = false">Confirm</el-button>
                </div>
              </el-dialog>
              <el-button
                :underline="false"
                size="small"
                @click="toGroupFile(scope.row)"
              >Enter</el-button>
              <el-button
                type="info"
                :underline="false"
                size="small"
                :disabled="scope.row.power != 'Creator'"
                @click="scope.row.dialogVisible = true"
              >Transfer Leadership</el-button>
              <el-button
                v-if="scope.row.power === 'Creator'"
                type="danger"
                :underline="false"
                size="small"
                icon="el-icon-delete"
                @click="deleteItem(scope.row)"
              >Dismiss</el-button>
              <el-button
                v-if="scope.row.power != 'Creator'"
                type="danger"
                :underline="false"
                size="small"
                icon="el-icon-delete"
                @click="deleteItem(scope.row)"
              >Leave</el-button>
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
import qs from 'qs'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import store from '@/layouts/store'
export default {
  name: 'TableGroup',
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
      visible_applyTeam: false,
      form: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state)
      },
      form1: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: null,
        member_id: null
      },
      form_applyTeam: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: null
      },
      groupList: [],
      tableLoading: false,
      dialogFormVisible: false,
      dialogVisible: false,
      form2: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_name: ''
      },
      form_disbandTeam: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: 0
      },
      form_quitTeam: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: 0
      },
      disbandTeamList: [],
      formLabelWidth: '120px'
    }
  },
  created() {
    this.Refresh()
  },
  methods: {
    quitTeam(item) {
      this.form_quitTeam.team_id = item.id
      this.$axios.post('/team/quit_team', qs.stringify(this.form_quitTeam))
        .then((res) => {
          if (res.data.result === 5) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.Refresh()
        })
    },
    applyTeam() {
      this.$axios.post('/team/apply_team', qs.stringify(this.form_applyTeam))
        .then((res) => {
          if (res.data.result === 4) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    Leader_change(item) {
      this.form1.team_id = item.id
      console.log(item.id)
      this.$axios.post('/team/move_team_leader_perm', qs.stringify(this.form1))
        .then((res) => {
          if (res.data.result === 6) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.Refresh()
        })
    },
    toGroupFile(item) {
      localStorage.setItem('team_id', item.id.toString())
      store.toGroupFile && store.toGroupFile()
    },
    addTeam() {
      this.$axios.post('/team/create_team', qs.stringify(this.form2))
        .then((res) => {
          if (res.data.result === 2) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.Refresh()
          this.dialogFormVisible = false
          this.form2.team_name = null
        })
    },
    handleSelectionChange(items) {
      this.disbandTeamList = items
    },
    deleteItem(item) {
      if (item.power === 'Creator') {
        this.$confirm('This action will permanently dissolve the team, do you want to continue?', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.disbandTeam(item)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Dissolution canceled'
          })
        })
      } else {
        this.$confirm('This action will leave the team, do you want to continue?', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.quitTeam(item)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'Exit canceled'
          })
        })
      }
    },
    deleteMultiItem() {
      this.$confirm('This action will permanently dissolve/leave all selected teams, do you want to continue?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.disbandTeamList.length; i++) {
          if (this.disbandTeamList[i].power === 'Creator') {
            this.disbandTeam(this.disbandTeamList[i])
          } else {
            this.quitTeam(this.disbandTeamList[i])
          }
        }
        this.Refresh()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Dissolution/exit canceled'
        })
      })
    },
    disbandTeam(item) {
      this.form_disbandTeam.team_id = item.id
      this.$axios.post('/team/disband_team', qs.stringify(this.form_disbandTeam))
        .then((res) => {
          if (res.data.result === 4) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.Refresh()
        })
    },
    Refresh() {
      this.tableLoading = true
      this.groupList = []
      this.$axios.post('/team/get_team_list', qs.stringify(this.form))
        .then((res) => {
          if (res.data.result === 3) {
            for (let i = 0; i < res.data.team_list.length; i++) {
              const teams = {
                name: '',
                time: '',
                member_num: 0,
                word_num: 0,
                power: '',
                id: 0,
                dialogVisible: false
              }
              teams.name = res.data.team_list[i].team_name
              teams.time = res.data.team_list[i].create_time
              teams.member_num = res.data.team_list[i].member_cnt
              teams.word_num = res.data.team_list[i].word_cnt
              teams.id = res.data.team_list[i].team_id
              if (res.data.team_list[i].power === 1) {
                teams.power = 'Creator'
              } else if (res.data.team_list[i].power === 2) {
                teams.power = 'Admin'
              } else if (res.data.team_list[i].power === 3) {
                teams.power = 'Visitor'
              }
              let flag = 0
              for (let j = 0; j < this.groupList.length; j++) {
                if (this.groupList[j].id === teams.id) {
                  flag = 1
                  break
                }
              }
              if (!flag) { this.groupList.push(teams) }
            }
          } else {
            this.$message.error(res.data.message)
          }
          this.tableLoading = false
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
        this.$errorMsg('The uploaded file must not exceed 500K')
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
