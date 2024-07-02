<template>
  <div class="main-container">
    <div class="content-wrapper margin-top">
      <el-card
        :body-style="{padding: 0}"
        shadow="hover"
      >
        <div class="flex justify-between padding-sm solid-bottom">
          <el-link :underline="false">Basic info</el-link>
        </div>
        <el-form
          v-model="baseInfoModel"
          label-width="80px"
          class="form-wrapper"
          size="small"
          label-position="right"
        >
          <el-col :span="24">
            <el-form-item label="name">
              <el-input
                v-model="personalInformation.username"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="ID">
              <el-input
                v-model="personalInformation.user_id"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="email">
              <el-input
                v-model="personalInformation.email"
                :disabled="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="password">
              <el-input
                v-model="baseInfoModel.password"
                :disabled="true"
              />
              <el-button
                size="mini"
                type="Placeholder"
                :underline="false"
                @click="dialogVisible_changePassword = true"
              >Change</el-button>
              <el-dialog title="Change Password" :visible.sync="dialogVisible_changePassword" width="40%" center>
                <el-form :model="form_changePassword">
                  <el-form-item label="Old password" :label-width="formLabelWidth">
                    <el-input v-model="form_changePassword.password" autocomplete="off" type="password" />
                  </el-form-item>
                  <el-form-item label="New password" :label-width="formLabelWidth">
                    <el-input v-model="form_changePassword.password1" autocomplete="off" type="password" />
                  </el-form-item>
                  <el-form-item label="Confirm the password" :label-width="formLabelWidth">
                    <el-input v-model="form_changePassword.password2" autocomplete="off" type="password" />
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible_changePassword = false, clearPassword()">Back</el-button>
                  <el-button @click="changePassword(), dialogVisible_changePassword = false, clearPassword()">Confirm</el-button>
                </div>
              </el-dialog>
            </el-form-item>
          </el-col>
          <el-col style="margin-left: 40px">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              style="margin-bottom: 20px"
              :underline="false"
              @click="logOff_1"
            >Delte The Account</el-button>
          </el-col>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import { getters } from '@/store/modules/user.js'
import { state } from '@/store/modules/user.js'
import store from '@/layouts/store/index'
export default {
  name: 'Personal',
  data() {
    return {
      dialogVisible_changePassword: false,
      loading: false,
      file: File,
      personalInformation: {
        username: null,
        email: null,
        sex: null,
        avatar: 'https://www.bing.com/images/search?view=detailV2&ccid=4UL1l76J&id=996E0B3D6F6E8C01709931862851E87C70854E45&thid=OIP.4UL1l76JhZ43VtGNLLF7ugAAAA&mediaurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.e142f597be89859e3756d18d2cb17bba%3frik%3dRU6FcHzoUSiGMQ%26riu%3dhttp%253a%252f%252fimg.touxiangwu.com%252fuploads%252fallimg%252f2021090522%252fvziucdhxmqa.jpg%26ehk%3dgBye%252fcUprgJqq2QAJqxXJVK2WipzM%252byvuCiGhjC1vdE%253d%26risl%3d%26pid%3dImgRaw%26r%3d0&exph=400&expw=400&q=%e5%a4%b4%e5%83%8f&simid=608015560007170595&FORM=IRPRST&ck=ECAE01F7053018569CD0D3DBBF6867B1&selectedIndex=76&itb=0',
        user_id: null
      },
      form_getPersonalInformation: {
        authorization: getters.getToken(state),
        username: getters.getUserName(state)
      },
      form_deleteUser: {
        token: getters.getToken(state),
        username: getters.getUserName(state),
        user_id: getters.getUserId(state),
        password: ''
      },
      form_changePassword: {
        authorization: getters.getToken(state),
        username: getters.getUserName(state),
        password: null,
        password1: null,
        password2: null
      },
      imageUrl: '',
      baseInfoModel: {
        name: '',
        id: '',
        email: '',
        password: ''
      },
      formLabelWidth: 180
    }
  },
  created() {
    this.getPersonalInformation()
  },
  methods: {
    clearPassword() {
      this.form_changePassword.password = ''
      this.form_changePassword.password1 = ''
      this.form_changePassword.password2 = ''
    },
    logOff_1() {
      this.$confirm('This operation will delete your account', 'tips', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'back',
          type: 'warning'
      }).then(() => {
        this.logOff_2()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'already back'
          })
        })
    },
    logOff_2() {
      this.$confirm('This operation will delete all your data,continue?', 'tips', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'back',
          type: 'warning'
      }).then(() => {
        this.logOff_3()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'already back'
          })
        })
    },
    logOff_3() {
      this.$confirm('Really?', 'tips', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'back',
          type: 'warning'
      }).then(() => {
        this.logOff()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'already back'
          })
        })
    },
    deleteUser() {
      this.$axios.post('/user/delete_user', qs.stringify(this.form_deleteUser))
        .then((res) => {
          // console.log(5)
          if (res.data.result === 3) {
            this.$message.success('Thanks for your support!See you later!')
            // this.$router.push('/login')
            store.logout()
            store.onLogout && store.onLogout()
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
    getPersonalInformation() {
      this.loading = true
      this.$axios.post('/user/check_personal_infomation', qs.stringify(this.form_getPersonalInformation))
        .then((res) => {
          // console.log(5)
          if (res.data.result === 2) {
            this.personalInformation.username = res.data.username
            this.personalInformation.email = res.data.email
            this.personalInformation.sex = res.data.sex
            this.personalInformation.user_id = res.data.user_id
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
        })
    },
    logOff() {
      this.$prompt('please input old password', 'tips', {
          confirmButtonText: 'confirm',
          cancelButtonText: 'back'
        }).then(({ value }) => {
          this.form_deleteUser.password = value
          this.deleteUser()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: 'back'
          })
        })
    },
    changePassword() {
      console.log(this.form_changePassword.password)
      console.log(this.form_changePassword.password1)
      console.log(this.form_changePassword.password2)
      this.$axios.post('/user/change_password', qs.stringify(this.form_changePassword))
        .then((res) => {
          // console.log(5)
          if (res.data.result === 3) {
            this.$message.success(res.data.message)
            store.logout()
            store.onLogout && store.onLogout()
            // this.$router.push('/login')
          } else {
            this.$message.error(res.data.message)
          }
        })
    },
  }
}
</script>

<style lang="scss" scoped>
.content-wrapper {
  overflow-y: auto;
  @media screen and (max-width: 768px) {
    .form-wrapper {
      margin-top: 2%;
      width: 98%;
      padding-left: 4%;
    }
  }
  @media screen and (min-width: 768px) {
    .form-wrapper {
      margin-top: 2%;
      width: 50%;
      padding-left: 4%;
    }
  }
}
</style>
