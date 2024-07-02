<template>
  <div class="main-container">
    <TableHeader :can-collapsed="false">
      <template v-slot:right>
        <el-button
          v-if="isInited('addItemModel')"
          v-permission="['admin', 'editor']"
          type="primary"
          size="mini"
          icon="el-icon-plus"
          @click="onAddItem"
        >Add
        </el-button>
        <el-button
          v-if="isInited('deleteItemsModel')"
          type="danger"
          size="mini"
          icon="el-icon-delete"
          @click="onDeleteMultiItem"
        >Delete
        </el-button>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template>
        <el-table
          ref="table"
          v-loading="tableLoading"
          :data="dataList"
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
            <template v-slot:default="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="Name"
            prop="nickName"
          />
          <el-table-column
            align="center"
            label="Avatar"
          >
            <template v-slot:default="scope">
              <div class="avatar-container">
                <el-image
                  :src="require('@/assets/img_avatar_default.png')"
                  class="avatar"
                  :class="{'avatar-vip' : scope.row.vip === 1}"
                />
                <img
                  v-if="scope.row.vip === 1"
                  class="vip"
                  :src="require('@/assets/img_vip_icon.png')"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="Gender"
            prop="gender"
          >
            <template v-slot:default="scope">
              <div class="gender-container flex justify-center align-center">
                <img
                  class="gender-icon"
                  :src="scope.row.gender === 0 ? require('@/assets/icon_sex_man.png') : require('@/assets/icon_sex_woman.png')"
                />
                <span>{{ scope.row.gender === 0 ? 'Male' : 'Female' }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="Status"
          >
            <template v-slot:default="scope">
              <el-switch
                v-model="scope.row.status"
                :active-value="1"
                :inactive-value="0"
              />
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="Address"
            prop="address"
          />
          <el-table-column
            align="center"
            label="Last Login Time"
            prop="lastLoginTime"
            width="160px"
          />
          <el-table-column
            align="center"
            label="Last Login IP"
            prop="lastLoginIp"
            width="130px"
          />
          <el-table-column
            align="center"
            label="Actions"
          >
            <template v-slot:default="scope">
              <el-link
                v-if="isInited('updateItemModel')"
                type="primary"
                :underline="false"
                @click="onUpdateItem(scope.row)"
              >Edit</el-link>
              <el-link
                v-if="isInited('deleteItemsModel')"
                type="danger"
                :underline="false"
                @click="onDeleteItem(scope.row)"
              >Delete</el-link>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </TableBody>
    <TableFooter
      :page-size="pageModel.pageSize"
      :total-size="pageModel.totalSize"
      @pageSizeChanged="pageSizeChanged"
      @currentChanged="currentChanged"
      @onRefresh="doRefresh"
    />
    <Dialog
      ref="dialog"
      v-draggable
      :submit-button="true"
    >
      <template>
        <BaseForm
          ref="baseForm"
          :form-items="formItems"
        >
          <template #extra>
            <el-form-item label="Upload Avatar">
              <SingleUpload
                action="http://test.youcanedu.net:8881/yx/uploadSpellingTextBookCoverImage"
                :headers="{'Authorization': `Bearer eyJhbGciOiJIUzUxMiJ9.eyJBdXRob3JpemF0aW9uIjoiUk9MRV9hZG1pbiwiLCJ1c2VyRW50aXR5SWQiOjE4LCJ1c2VyRW50aXR5TmFtZSI6IueuoeeQhuWRmCIsInVzZXJFbnRpdHlQaG9uZSI6IjE4ODAwMDAwMDA4Iiwic3ViIjoi566h55CG5ZGYIiwiZXhwIjoxNjE2MTQ2MjQwfQ.TZS59WlhzJwkbk60OhE7xJMJ2XlIY3gBo_Cnh8yqCooKfyquS_IbSH-d6___nVNAhrMzNq3qDMM2sTZpiQ2IDA`}"
                file-name="textBookCoverFile"
                :extra-style="{width: '100px', height: '100px'}"
                :multiple="true"
                :image-path="userModel.avatar"
                :before-upload="beforeUpload"
                @onSingleSuccess="onSingleSuccess"
              />
            </el-form-item>
          </template>
        </BaseForm>
      </template>
    </Dialog>
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
import { formBuilder } from '@/utils/form'
import draggable from '@/directive/draggable'
export default {
  name: 'Table',
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
      userModel: {
        address: '',
        avatar: '',
        gender: 1,
        id: 1,
        lastLoginIp: '',
        lastLoginTime: '',
        status: 0,
        vip: 1
      }
    }
  },
  computed: {
    formItems() {
      return formBuilder()
        .formItem({
          label: 'User Name',
          type: 'input',
          name: 'nickName',
          value: this.userModel.nickName,
          maxLength: 50,
          inputType: 'text',
          placeholder: 'Please enter user name',
          associatedOption: 'address',
          validator: ({ value, placeholder }, { value: assValue }) => {
            if (!value) {
              this.$errorMsg(placeholder)
              return false
            }
            if (!assValue) {
              this.$errorMsg('Incorrect address')
              return false
            }
            return true
          }
        })
        .formItem({
          label: 'User Gender',
          type: 'radio-group',
          name: 'gender',
          style: 'button',
          value: this.userModel.gender,
          radioOptions: [
            {
              label: 'Male',
              value: 0
            },
            {
              label: 'Female',
              value: 1
            }
          ]
        })
        .formItem({
          label: 'Contact Address',
          type: 'input',
          name: 'address',
          value: this.userModel.address,
          maxLength: 50,
          inputType: 'textarea',
          row: 5,
          placeholder: 'Please enter contact address'
        })
        .formItem({
          label: 'User Status',
          type: 'radio-group',
          name: 'status',
          value: this.userModel.status,
          radioOptions: [
            {
              label: 'Active',
              value: 1
            },
            {
              label: 'Disabled',
              value: 0
            }
          ]
        })
        .build().formItems
    }
  },
  mounted() {
    this.initGetData({
      url: this.$urlPath.getTableList,
      params: () => this.withPageInfoData(),
      beforeAction: () => {
        this.tableLoading = true
      },
      afterAction: () => {
        this.tableLoading = false
      },
      onResult: (res) => {
        this.handleSuccess(res)
      }
    }).then(() => {
      this.getData()
    })

    this.initAddItem({
      url: this.$urlPath.getTableList,
      params: () => {
        return this.$refs.baseForm.generatorParams()
      },
      onAddItem: () => {
        this.$refs.dialog.show({
          beforeShowAction: () => {
            this.userModel = {
              address: '',
              avatar: '',
              gender: 1,
              id: 1,
              lastLoginIp: '',
              lastLoginTime: '',
              status: 0,
              vip: 1
            }
          },
          onConfirmCallback: () => {
            const checkResult = this.$refs.baseForm.checkParams()
            if (checkResult) {
              this.doAddItem()
            }
          }
        })
      },
      onResult: (res) => {
        this.$successMsg('Simulated user information added successfully')
        const params = this.$refs.baseForm.generatorParams()
        params.avatar =
          'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201411%2F29%2F20141129194517_5Z2Lu.png&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1615013287&t=832537ff575fa5c5bb2e65b71c2b52fb'
        params.lastLoginIp = '221.189.176.207'
        params.lastLoginTime = '2021-03-22 20:39:25'
        this.dataList.unshift({
          ...params
        })
        this.$refs.dialog.close()
      },
      onError: (error) => {
        this.$errorMsg(error)
        this.$refs.dialog.close()
      }
    })

    this.initUpdateItem({
      url: this.$urlPath.updateUserInfo,
      params: () => {
        return this.$refs.baseForm.generatorParams()
      },
      onUpdateItem: (item) => {
        this.$refs.dialog.show({
          beforeShowAction: () => {
            this.userModel.gender = item.gender
            this.userModel.address = item.address
            this.userModel.status = item.status
            this.userModel.avatar = item.avatar
          },
          onConfirmCallback: () => {
            if (this.$refs.baseForm.checkParams()) {
              this.doUpdateItem()
            }
          }
        })
      },
      onResult: (res) => {
        this.$successMsg('Simulated user information updated successfully')
        this.$refs.dialog.close()
      },
      onError: (error) => {
        this.$errorMsg(error)
        this.$refs.dialog.close()
      }
    })

    this.initDeleteItem({
      url: this.$urlPath.getTableList,
      params: () => {
        return {
          ids: this.tempItem.id
        }
      },
      multiParams: () => {
        return {
          ids: this.selectedItems.map((it) => it.id).join(',')
        }
      },
      onDeleteItem: (item) => {
        this.tempItem = item
        this.$showConfirmDialog('Are you sure you want to delete this user information?').then((_) => {
          this.$successMsg('Simulated user deletion successful')
          // In a pure frontend environment, simulate like this. In a real environment, replace with this.doDeleteItem('single')
          this.dataList = this.dataList.filter((it) => it.id !== item.id)
        })
      },
      onDeleteMultiItem: () => {
        this.$showConfirmDialog('Are you sure you want to delete these user information?').then((_) => {
          this.$successMsg('Simulated user deletion successful')
          // In a pure frontend environment, simulate like this. In a real environment, replace with this.doDeleteItem('multi')
          const tempIds = this.selectedItems.map((it) => it.id)
          this.dataList = this.dataList.filter((it) => !tempIds.includes(it.id))
        })
      },
      onResult: () => { },
      onError: () => { }
    })
  },

  methods: {
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
.avatar-container {
  position: relative;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  vertical-align: middle;
  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .avatar-vip {
    border: 2px solid #cece1e;
  }
  .vip {
    position: absolute;
    top: 0;
    right: -9px;
    width: 15px;
    transform: rotate(60deg);
  }
}
.gender-container {
  .gender-icon {
    width: 20px;
  }
}
</style>
