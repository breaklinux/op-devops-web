<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="请输入内容"
        style="width: 200px;"
        class="filter-item"
      />
      <el-button class="filter-item" type="primary" icon="el-icon-search">
        搜索
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="testData"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column v-for="item in columns" :label="item.alias" :prop="item.name" :formatter="ansibleReSult" align="center" show-overflow-tooltip="true" />

    </el-table>
    <br>
    <div class="block">
      <span class="demonstration" />
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="hostTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <br>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataFormdataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      />
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
const calendarTypeOptions = [
]
export default {
  data() {
    return {
      hostTotal: 0,
      currentPage: 1,
      pageSize: 5,
      testData: [],
      columns: [],
      tableKey: 0,
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      envList: [],
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      showReviewer: false,
      temp: {
        username: '',
        instanceip: '',
        group: '',
        password: '',
        port: ''
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Add'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        use: [{ required: true, message: 'title is required', trigger: 'blur' }]
      },
      downloadLoading: false
    }
  },
  created() {
    this.ansibleHistoryList()
  },
  methods: {
    ansibleReSult: function(row, column) {
      var ansible_callback = row[column.property]
      if (!(ansible_callback === undefined || ansible_callback == null)) {
        var ansible_callbackStr = ansible_callback
        return ansible_callbackStr
      } else {
        return ''
      }
    },
    handleSizeChange: function(val) {
      this.pageSize = val
      this.ansibleHistoryList()
    },
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.ansibleHistoryList()
    },
    ansibleHistoryList() {
      this.axios.get(`http://change-dev-environment.chj.cloud/ansible/api/v2?page=${this.currentPage}&psize=${this.pageSize}`).then((response) => {
        this.columns = response.data.columns
        this.testData = response.data.data
        this.hostTotal = response.data.total
        this.listLoading = false
      }).catch((response) => {
        console.log(response)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>

