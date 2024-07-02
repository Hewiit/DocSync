<template>
  <el-card
    class="flex-sub chart-item-container"
    :body-style="{padding: 0}"
    shadow="never"
  >
    <template #header>
      <div class="text-bold">
        Enrollment channel analysis chart
      </div>
    </template>
    <div
      ref="channelsChart"
      class="chart-item"
    >
    </div>
  </el-card>

</template>

<script>
import itemChartMixins from './mixins/item-chart-mixins'
export default {
  name: 'EnrollmentChannelsChart',
  mixins: [itemChartMixins],
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.$echarts.dispose(this.getInstance(this.$refs.channelsChart))
  },
  methods: {
    init() {
      const option = {
        grid: {
          left: '12%',
          right: '5%',
          top: '5%',
          bottom: '3%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis'
        },
        series: [
          {
            name: 'Access source',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '16',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: true,
              length: 5,
              length2: 5,
              smooth: true
            },
            data: [
              { value: 1969, name: 'online' },
              { value: 743, name: 'mutual push' },
              { value: 1594, name: 'Phone' },
              { value: 1347, name: 'ditui' },
              { value: 635, name: 'live' }
            ]
          }
        ]
      }
      this.getInstance(this.$refs.channelsChart).setOption(option)
    },
    updateChart() {
      this.getInstance(this.$refs.channelsChart).resize()
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-item-container {
  width: 100%;
  height: 215px;
  .chart-item {
    height: 180px;
  }
}
</style>
