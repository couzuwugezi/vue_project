<template>
  <div class="table-container" id="sendMsgLog">
    <div class="table-container__info">
      <div class="table-container__title">
        <div>短信发送日志</div>
      </div>
      <div class="table-container__row" id="queryBlock" v-cloak>
        <table>
          <tr>
            <td>
              <el-date-picker size="mini" v-model="timeValue" type="datetimerange" range-separator="至"
                              start-placeholder="开始时间"
                              end-placeholder="结束时间">
              </el-date-picker>
            </td>
            <td>
              <el-input size="mini" placeholder="请输入手机号" v-model="mobile" clearable>
              </el-input>
            </td>
            <td>
              <el-select size="mini" v-model="tempId" clearable filterable placeholder="请选择短信模板">
                <el-option v-for="item in tempIdOptions" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </td>
            <td>
              <el-select size="mini" v-model="systemCode" clearable filterable placeholder="调用子系统">
                <el-option v-for="item in systemCodeOptions" :key="item.value" :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <div class="table-container__element">
              <el-button type="success" plain class="table-container__add" icon="el-icon-search" circle size="mini"
                         @click="query"></el-button>
            </div>
          </tr>
        </table>
      </div>
      <div id="datagrid" v-cloak>
        <el-table highlight-current-row stripe :data="tableData" header-align="center" :border=true size="mini"
                  :height="height">
          <el-table-column label=" " type="index" width="50" show-overflow-tooltip></el-table-column>
          <el-table-column fit prop="systemCode" label="调用子系统" show-overflow-tooltip></el-table-column>
          <el-table-column fit prop="mobile" label="手机号" show-overflow-tooltip></el-table-column>
          <el-table-column fit prop="tempName" label="短信模板名称" show-overflow-tooltip></el-table-column>
          <el-table-column fit prop="tempId" label="短信模板编号" show-overflow-tooltip></el-table-column>
          <el-table-column fit prop="content" label="填充内容" show-overflow-tooltip></el-table-column>
          <el-table-column fit prop="sendTime" label="发送时间" show-overflow-tooltip
                           :formatter="timeFormatMethod"></el-table-column>
          <el-table-column fit prop="status" label="状态" show-overflow-tooltip></el-table-column>
        </el-table>
        <div class="table-container__pagination" align="right">
          <el-pagination v-on:size-change="handleSizeChange" v-on:current-change="handleCurrentChange"
                         class="table-container__pagination-color"
                         :current-page="currentPage" :page-sizes="sizes" :page-size="size"
                         layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "sendMsgLog",
    data() {
      return {
        timeValue: [new Date(), new Date()],
        mobile: '',
        tempId: '',
        tempIdOptions: [],
        systemCode: '',
        systemCodeOptions: [],
        tableData: [],
        currentPage: 1,
        total: 0,
        sizes: [10, 15, 20, 40],
        size: 10,
        timeFormatMethod: function (row, column, cellValue) {
          return timestampToTime(cellValue);
        },
        height: null
      }
    },
    methods: {
      query() {
        let param = {};
        param.mobile = this.mobile;
        param.tempId = this.tempId;
        param.systemCode = this.systemCode;
        if (this.timeValue !== null) {
          param.starTime = this.timeValue[0];
          param.endTime = this.timeValue[1];
        }
      },
      handleSizeChange() {

      },
      handleCurrentChange() {

      }
    },
    created() {
      this.$axios({
        method: 'post',
        url: '/manage/source/subSystem'
      }).then(response => {
        if (response.status === 200) {
          let data = response.data;
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            let jsonData = {};
            jsonData.value = data[i].code;
            jsonData.label = data[i].name;
            arr.push(jsonData);
          }
          this.systemCodeOptions = arr;
        }
      }).catch(error => {
        console.log(error);
      });
      this.$axios({
        method: 'post',
        url: '/manage/fwrz/queryAllSmsTemp'
      }).then(response => {
        if (response.status === 200) {
          let data = response.data;
          let arr = [];
          for (let i = 0; i < data.length; i++) {
            let jsonData = {};
            jsonData.value = data[i].code;
            jsonData.label = data[i].name;
            arr.push(jsonData);
          }
          this.tempIdOptions = arr;
        }
      }).catch(error => {
        console.log(error);
      });
    }
  }
</script>

<style scoped>
  #sendMsgLog {
    min-height: 100%;
    width: 100%;
    position: relative;
    padding: 10px;
    float: left;
  }
</style>
