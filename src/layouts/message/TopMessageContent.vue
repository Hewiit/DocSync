<template>
  <div style="width: 660px">
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="`Messages (${messageNum})`"
        name="notify"
      >
        <el-table
          v-loading="loading"
          :data="messageList"
          height="400"
        >
          <el-table-column width="250" property="content" label="Message Content" align="center" />
          <el-table-column width="100" property="send_name" label="Sender" />
          <el-table-column width="100" property="send_time" label="Sent Time" />
          <el-table-column
            align="center"
            label="Actions"
            width="210"
          >
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.showButton"
                size="mini"
                :underline="false"
                @click="accept(scope.row)"
              >Accept</el-button>
              <el-button
                v-if="scope.row.showButton"
                size="mini"
                type="danger"
                :underline="false"
                @click="refuse(scope.row)"
              >Refuse</el-button>
              <el-button
                size="mini"
                type="danger"
                :underline="false"
                @click="deleteMessage(scope.row)"
              >Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="bottom-wrapper">
          <el-link
            :underline="false"
            class="flex-sub text-center"
            @click="deleteAllMessage"
          >Clear All Messages
          </el-link>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import qs from 'qs'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
export default {
  name: 'MessageContent',
  components: {
  },
  data() {
    return {
      loading: false,
      form: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state)
      },
      form_invitation: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: 0,
        team_power: 0,
        inviter_id: 0
      },
      form_apply: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        team_id: 0,
        team_power: 0,
        apply_id: 0
      },
      // form_getUnlookMessageCount: {
      //   token: getters.getToken(state),
      //   username: getters.getUserName(state),
      //   user_id: getters.getUserId(state)
      // },
      form_deleteMessage: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        message_id: 0
      },
      activeName: '',
      messageNum: 0,
      messageList: [
        // {
        //   id: 0,
        //          content: '666',
        //          send_name: '1',
        //          send_time: '2',
        //          status: 0,
        //          type: 0,
        //          team_name: '3',
        //          word_name: '4',
        //          showButton: false
        // },
        // {
        //   id: 2,
        //          content: '662316',
        //          send_name: '4',
        //          send_time: '21',
        //          status: 0,
        //          type: 0,
        //          team_name: '3',
        //          word_name: '4',
        //          showButton: true
        // }
      ]
    }
  },
  // created() {
  //   this.getUnlookMessageCount()
  // },
  methods: {
    deleteMessage(item) {
      this.form_deleteMessage.message_id = item.id
      this.$axios.post('/team/delete_message', qs.stringify(this.form_deleteMessage))
         .then((res) => {
           if (res.data.result === 3) {
             this.$message.success(res.data.message)
           } else {
             this.$message.error(res.data.message)
           }
          this.getMessageList()
         })
    },
    deleteAllMessage() {
      for (let i = 0; i < this.messageList.length; i++) {
        this.deleteMessage(this.messageList[i])
      }
      this.getMessageList()
      this.messageNum = 0
    },
    // getUnlookMessageCount() {
    //   this.$axios.post('/user/get_unlook_message', qs.stringify(this.form_getUnlookMessageCount))
    //      .then((res) => {
    //        if (res.data.result === 2) {
    //          localStorage.setItem('unlook_message_count', res.data.unlook_message_count)
    //          this.$message.success(res.data.message)
    //        } else {
    //          this.$message.error(res.data.message)
    //        }
    //      })
    // },
    accept(item) {
      if (item.type === 0) {
        this.acceptInvitation(item)
      } else if (item.type === 1) {
        this.acceptApply(item)
      }
    },
    refuse(item) {
      if (item.type === 0) {
        this.refuseInvitation(item)
      } else if (item.type === 1) {
        this.refuseApply(item)
      }
    },
    getMessageList() {
      this.loading = true
      this.messageList = []
      this.$axios.post('/team/get_message', qs.stringify(this.form))
         .then((res) => {
           if (res.data.result === 3) {
             this.messageNum = res.data.message_list.length
             for (let i = 0; i < res.data.message_list.length; i++) {
               const messages = {
                 id: 0,
                 content: '',
                 send_name: '',
                 send_id: 0,
                 send_time: '',
                 status: 0,
                 type: 0,
                 team_name: '',
                 word_name: '',
                 team_power: 0,
                 team_id: 0,
                 showButton: false
               }
               messages.id = res.data.message_list[i].id
               messages.send_name = res.data.message_list[i].send_username
               messages.send_time = res.data.message_list[i].send_time
               messages.team_name = res.data.message_list[i].team_name
               messages.status = res.data.message_list[i].status
               messages.type = res.data.message_list[i].message_type
               messages.word_name = res.data.message_list[i].word_name
               messages.send_id = res.data.message_list[i].send_id
               messages.team_power = res.data.message_list[i].power
               messages.team_id = res.data.message_list[i].team_id
               switch (messages.type) {
                 case 0:
                   messages.content = 'User ' + messages.send_name + ' invites you to join team ' + messages.team_name;
                   messages.showButton = true;
                   break;
                 case 1:
                   messages.content = 'User ' + messages.send_name + ' applies to join your team ' + messages.team_name;
                   messages.showButton = true;
                   break;
                 case 2:
                   messages.content = 'You have successfully exited team ' + messages.team_name + ' where user ' + messages.send_name + ' belongs';
                   break;
                 case 3:
                   messages.content = 'You have been kicked out of team ' + messages.team_name + ' by user ' + messages.send_name;
                   break;
                 case 4:
                   messages.content = 'The team ' + messages.team_name + ' that you participated in, led by user ' + messages.send_name + ', has been disbanded';
                   break;
                 case 5:
                   messages.content = 'Your application to join team ' + messages.team_name + ', led by user ' + messages.send_name + ', has been rejected';
                   break;
                 case 6:
                   messages.content = 'Your application to join team ' + messages.team_name + ', led by user ' + messages.send_name + ', has been accepted';
                   break;
                 case 7:
                   messages.content = 'Your invitation to user ' + messages.send_name + ' to join your team ' + messages.team_name + ' has been accepted';
                   break;
                 case 8:
                   messages.content = 'Your invitation to user ' + messages.send_name + ' to join your team ' + messages.team_name + ' has been rejected';
                   break;
                 case 9:
                   messages.content = 'Your permissions in team ' + messages.team_name + ' have been changed by user ' + messages.send_name;
                   break;
                 case 10:
                   messages.content = 'User ' + messages.send_name + ' has exited collaboration on the document named "' + messages.word_name + '" that you are collaborating on';
                   break;
                 case 11:
                   messages.content = 'User ' + messages.send_name + ' has removed your collaboration editing rights on the document "' + messages.word_name + '"';
                   break;
                 case 12:
                   messages.content = 'User ' + messages.send_name + ' has added you to collaborate on editing the document "' + messages.word_name + '"';
                   break;
               }
               if (messages.status === 1) {
                 messages.showButton = false
               }
               let flag = 0
               for (let i = 0; i < this.messageList.length; i++) {
                 if (this.messageList[i].id === messages.id) {
                   flag = 1
                   break
                 }
               }
               if (!flag) {
                 this.messageList.push(messages)
               }
             }
             //  this.$message.success(res.data.message)
             localStorage.setItem('unlook_message_count', '0')
           }
           //  else {
           //   this.$message.error(res.data.message)
           // }
           this.loading = false
         })
    },
    update() {
      this.activeName = this.activeName === '0' ? 'notify' : this.activeName
      this.getMessageList()
    },
    clear(type) {
      if (!this[type + 'Num']) {
        return
      }
      this[type + 'Num'] = ''
      this.$emit('clear-num', 1)
    },
    more() {
      this.$successMsg('click more')
    },
    acceptInvitation(item) {
      this.form_invitation.team_id = item.team_id
      this.form_invitation.team_power = item.team_power
      this.form_invitation.inviter_id = item.send_id
      this.$axios.post('/team/accept_invitation', qs.stringify(this.form_invitation))
         .then((res) => {
           if (res.data.result === 4) {
             this.$message.success(res.data.message)
           } else {
             this.$message.error(res.data.message)
           }
           this.getMessageList()
         })
    },
    refuseInvitation(item) {
      this.form_invitation.team_id = item.team_id
      this.form_invitation.team_power = item.team_power
      this.form_invitation.inviter_id = item.send_id
      this.$axios.post('/team/refuse_invitation', qs.stringify(this.form_invitation))
        .then((res) => {
          if (res.data.result === 4) {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
          this.getMessageList()
        })
    },
    acceptApply(item) {
      this.form_apply.team_id = item.team_id
      this.form_apply.team_power = item.team_power
      this.form_apply.apply_id = item.send_id
      this.$axios.post('/team/accept_apply', qs.stringify(this.form_apply))
         .then((res) => {
           if (res.data.result === 6) {
             this.$message.success(res.data.message)
           } else {
             this.$message.error(res.data.message)
           }
           this.getMessageList()
         })
    },
    refuseApply(item) {
      this.form_apply.team_id = item.team_id
      this.form_apply.team_power = item.team_power
      this.form_apply.apply_id = item.send_id
      this.$axios.post('/team/refuse_apply', qs.stringify(this.form_apply))
         .then((res) => {
           if (res.data.result === 6) {
             this.$message.success(res.data.message)
           } else {
             this.$message.error(res.data.message)
           }
           this.getMessageList()
         })
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom-wrapper {
  display: flex;
  justify-content: space-around;
  padding-top: 10px;
  border-top: 1px solid #f5f5f5;
  .action {
    flex: 1;
    text-align: center;
  }
}
</style>
