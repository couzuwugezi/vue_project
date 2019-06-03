let bus = new Vue();
// 可以复用的datagrid组件, 自带翻页功能
let datagrid = {
  template: '<div style="margin:auto">' +
    '<el-table :border="true" :stripe="true" :data="tableData" @row-click="rowClick" @row-dblclick="dbclick" highlight-current-row size="mini" header-align="center" style="width: 100%">' +
    '<el-table-column fit v-for="column in columns" :type="column.type" :prop="column.prop" :label="column.label" :key="column.id" :formatter="column.formatter">' +
    '</el-table-column>' +
    '</el-table>' +
    '<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="sizes" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>' +
    '</div>',
  props: ['columns', 'url'],
  data: function () {
    return {
      currentPage: 1,
      total: 0,
      sizes: [10, 15, 20, 40],
      inParam: {}, // 调用此组件时传进来的参数
      size: 10,
      tableData: []
    }
  },
  methods: {
    rowClick: function (row, event, column) {
      let rowData = JSON.parse(JSON.stringify(row));
      this.$emit('open1', rowData);
    },
    dbclick: function (row, event) {
      let rowData = JSON.parse(JSON.stringify(row));
      this.$emit('open', rowData);
    },
    handleSizeChange: function (val) { // 每页条数
      this.size = val;
      let _this = this;
      let initObj = {
        page: this.currentPage,
        rows: val
      };
      let newObj = $.extend({}, _this.inParam, initObj);
      $.ajax({
        url: _this.url,
        type: "post",
        dataType: "json",
        data: newObj,
        success: function (response) {
          let data = JSON.parse(JSON.stringify(response));
          _this.tableData = data.rows;
          _this.total = data.total;
        },
        error: function (data) {
        }
      });
    },
    handleCurrentChange: function (val) { // 当前页
      let _this = this;
      this.currentPage = val;
      let initObj = {
        page: val,
        rows: this.size
      };
      let newObj = $.extend({}, _this.inParam, initObj);
      $.ajax({
        url: _this.url,
        type: "post",
        dataType: "json",
        data: newObj,
        success: function (response) {
          let data = JSON.parse(JSON.stringify(response));
          _this.tableData = data.rows;
          _this.total = data.total;
        },
        error: function (data) {
        }
      });
    },
    query: function (params) {
      let _this = this;
      _this.inParam = params;
      _this.size = 10;
      _this.currentPage = 1;
      let initObj = {
        page: 1,
        rows: 10
      };
      let newObj = $.extend({}, _this.inParam, initObj);
      $.ajax({
        url: _this.url,
        type: 'post',
        dataType: "json",
        data: newObj,
        success: function (response) {
          let data = JSON.parse(JSON.stringify(response));
          _this.tableData = data.rows;
          _this.total = data.total;
          _this.currentPage = 1;
          _this.size = 10;
        },
        error: function (error) {
          console.log(error);
        }
      })
    }
  }
};

function add0(m) {
  return m < 10 ? '0' + m : m
}

function timestampToTime(shijianchuo) {
  if (shijianchuo == null) {
    return '';
  }
  let time = new Date(shijianchuo);
  let y = time.getFullYear();
  let m = time.getMonth() + 1;
  let d = time.getDate();
  let h = time.getHours();
  let mm = time.getMinutes();
  let s = time.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm)
    + ':' + add0(s);
}

function isJson(obj) {
  return typeof (obj) == "object"
    && Object.prototype.toString.call(obj).toLowerCase() == "[object object]"
    && !obj.length;
}

function isRealNum(val) {
  // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
  if (val === "" || val == null) {
    return false;
  }
  return !isNaN(val);
}

/**
 * 数组删除指定元素
 *
 * @param arr
 * @param val
 * @returns
 */
function removeByValue(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      arr.splice(i, 1);
      break;
    }
  }
}

/**
 * 数组去重
 * @param array
 * @returns
 */
function delSameData(array) {
  let n = []; // 一个新的临时数组
  // 遍历当前数组
  for (let i = 0; i < array.length; i++) {
    // 如果当前数组的第i已经保存进了临时数组，那么跳过，
    // 否则把当前项push到临时数组里面
    if (n.indexOf(array[i]) === -1)
      n.push(array[i]);
  }
  return n;
}
