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
      <el-button class="filter-item" @click="getupdataSlbList()" type="danger">资源同步 </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="testData"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column v-for="(item,index) in columns" :key="index" v-bind:label="item.alias" v-bind:prop="item.name" align="center" />
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
  </div>
</template>
<script>
import {getSlbList, getSlbUpdataList } from '@/api/aliecs'
export default {
  data() {
    return {
      updatalistQuery: {
        page: 1,
        page_size: 1000,
        load: 'all'
      },
      number: 1,
      hostTotal: 0,
      currentPage: 1,
      pageSize: 10,
      testData: [],
      columns: [],
      item: '',
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        page_size: 10,
      },
      elBreadcrumb: '',
      importanceOptions: [1, 2, 3],
      showReviewer: false,
      dialogFormVisible: false,
      dialogCicdFormVisible: false,
      dialogStatus: '',
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
    this.getList()
  },
  methods: {
    closeDialogfun() {
      this.dialogCicdFormVisible = false
    },
    handleSizeChange: function(val) {
      this.listQuery.page_size = val
      this.getList()
    },
    handleCurrentChange: function(val) {
      this.listQuery.page = val
      this.getList()
    },
    getList() {
      getSlbList(this.listQuery).then(response =>{
        console.log(response.data)
        this.columns = response.columns
        this.testData = response.data
        this.hostTotal = response.total
        this.listLoading = false
      })
    },
    getupdataSlbList(){
      let updatalistQuery = this.updatalistQuery
      getSlbUpdataList(updatalistQuery).then(response =>{  
      console.log(response) 
      if(response.code == 0 ) {
        this.getList() 
      }else{
        alert('数据后端还在更新,稍后查询')
        this.getList() 
      }
      })
    },
    
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    cicdRun(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date()
      this.dialogStatus = 'cicdrun'
      this.dialogCicdFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    }
  }
}
</script>
