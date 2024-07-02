<template>
  <div
    v-infinite-scroll="load"
    class="comment-wrapper"
    :infinite-scroll-disabled="disabled"
  >
    <el-card
      v-for="item of dataList"
      :key="item.id"
      :body-style="{padding: '0'}"
      class="item-wrapper"
    >
      <div class="header-wrapper">
        <div class="avatar-wrapper">
          <img
            class="avatar"
            :src="item.avatar"
          />
          <img
            class="vip"
            :src="require('@/assets/img_vip_icon.png')"
          />
        </div>
        <div class="nick-wrapper">
          <span class="nick-name">{{ item.nickName }}</span>
          <el-rate
            v-model="item.rate"
            disabled
            text-color="#ff9900"
          />
        </div>
        <el-tag
          size="mini"
          :type="item.status === 0 ? 'warning' : 'success'"
        >
          {{ item.status === 0 ? 'Not Displayed' : 'Displayed' }}
        </el-tag>
        <div class="flex-sub"></div>
        <div>
          <el-dropdown
            size="mini"
            @command="handleCommand"
          >
            <span class="el-dropdown-link">
              <i class="el-icon-more"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{ type: 'delete', item }">
                Delete
              </el-dropdown-item>
              <el-dropdown-item :command="{ type: 'changeStatus', item }">
                {{ item.status === 0 ? 'Enable Display' : 'Disable Display' }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <div class="content-wrapper">
        {{ item.content }}
      </div>
      <div>
        <el-image
          v-for="(image, index) of item.images"
          :key="index"
          :src="image"
          :preview-src-list="item.images"
          class="content-image"
          fit="cover"
        />
      </div>
    </el-card>
    <div class="text-center margin-top">
      <div v-if="loading">
        Loading...
      </div>
      <div v-if="noMore">No more data</div>
    </div>
  </div>
</template>

<script>
import TableMixin, { PageModelMixin } from '@/mixins/TableMixin'
import { GetDataMixin } from '@/mixins/ActionMixin'
export default {
  name: 'CommentList',
  mixins: [TableMixin, PageModelMixin, GetDataMixin],
  data() {
    return {
      loading: false,
      noMore: false
    }
  },
  computed: {
    disabled() {
      return this.loading
    }
  },
  mounted() {
    this.initGetData({
      url: this.$urlPath.getCommentList,
      params: {
        page: this.pageModel.currentPage,
        pageSize: this.pageModel.pageSize
      },
      onResult: (res) => {
        this.loading = false
        this.dataList.push(...res.data)
        this.noMore = this.dataList.length === res.totalSize
      }
    })
  },
  methods: {
    handleCommand({ type, item }) {
      if (type === 'delete') {
        this.$showConfirmDialog('Are you sure you want to delete this comment?', () => {
          this.dataList.splice(this.dataList.indexOf(item), 1)
          this.$successMsg('Comment deleted successfully')
        })
      } else {
        const tip = item.status === 0 ? 'Enable' : 'Disable'
        this.$showConfirmDialog(`Are you sure you want to ${tip} this comment?`, () => {
          item.status = item.status === 0 ? 1 : 0
          this.$successMsg(`Comment ${tip}ed successfully`)
        })
      }
    },
    load() {
      if (this.noMore) return
      this.pageModel.currentPage += 1
      this.loading = true
      setTimeout(_ => {
        this.getData()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-wrapper {
  padding: 5px 10px;
  .item-wrapper {
    padding: 10px;
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    border-radius: 5px;
    .header-wrapper {
      display: flex;
      justify-content: flex-start;
      .avatar-wrapper {
        position: relative;
        .avatar {
          border-radius: 50%;
          width: 40px;
          height: 40px;
          border: 3px solid #f5f5f5;
        }
        .vip {
          position: absolute;
          top: -13px;
          right: -13px;
          width: 30px;
          height: 30px;
          transform: rotate(45deg);
        }
      }
      .nick-wrapper {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    .content-wrapper {
      font-size: 14px;
      margin: 5px 0;
      line-height: 20px;
    }
    .content-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
    }
    .content-image + .content-image {
      margin-left: 10px;
    }
  }
}
</style>
