<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.title"
        placeholder="请输入内容"
        style="width: 200px;"
        class="filter-item"
      />
      <el-select v-model="listQuery.type" placeholder="请选择环境" clearable class="filter-item" style="width: 130px">
        <!--<el-option-->
          <!--v-for="item in envList"-->
          <!--:key="item.key"-->
          <!--:label="item.display_name+'('+item.key+')'"-->
          <!--:value="item.key"-->
        <!--/>-->
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search">
        搜索
      </el-button>
     <el-button class="filter-item" @click="updataDnsLis()" type="danger">资源同步 </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="testData"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column v-for="(item,index) in columns" :key="index" v-bind:label="item.alias" v-bind:prop="item.name" align="center" />=
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
import axios from 'axios'
import {getDnsList, postDnsList, deleteDnsParsing, putEditDnsParsing,getUpdataDnsList} from '@/api/aliecs'
export default {
  data() {
    return {
      updatalistQuery: {
        page: 1,
        page_size: 1000,
        load: 'all'
      },
      releaseList: [],
      radio2: '1',
      value1: [],
      value2: [],
      envList: [],
      languageList: [],
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
      appversionList: [],
      elBreadcrumb: '',
      importanceOptions: [1, 2, 3],
      showReviewer: false,
      temp: {
        group: '',
        appname: '',
        business: '',
        apptype: '',
        level: '',
        owner: '',
        used: '',
        giturl: '',
        port: ''
      },
      cicd: {
        appversion: '',
        giturl: '',
        appname: '',
        env: '',
        branch: '',
        language_type: '',
        release_type: 'vm',
        release_reason: '',
        instance_ip: []
      },
      dialogFormVisible: false,
      dialogCicdFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Add',
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

       this.listLoading = true;
      getDnsList(this.listQuery).then(response =>{
         this.columns = response.columns
        this.testData = response.data
        this.hostTotal = response.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    postList() {
      postDnsList(this.temp).then(response =>{
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
      })
      this.getList()
    },
    delHost(row) {
      console.log(row)
      var _this51 = this
      _this51.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteDnsParsing(row).then(response => {
          console.log(response)
          _this51.dialogFormVisible = false
          _this51.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          _this51.getList()
        })
        /* this.$message({
                type: 'success',
                message: '删除成功!'
              });*/
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    updateHost() {
      var _this52 = this
      // debugger;
      _this52.$confirm('此操作将修改该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        putEditDnsParsing(_this52.temp).then(response => {
           console.log(response)
          _this52.dialogFormVisible = false
          _this52.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
          _this52.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },

    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.cicd.appname = this.temp.appname
      this.temp.timestamp = new Date()
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        group: '',
        appname: '',
        business: '',
        apptype: '',
        level: '',
        owner: '',
        used: '',
        port: ''
      }
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
    },
   updataDnsLis(){
      let updatalistQuery = this.updatalistQuery
      getUpdataDnsList(updatalistQuery).then(response =>{  
      console.log(response) 
      if(response.code == 0 ) {
        this.getList() 
      }else{
        alert('数据后端还在更新,稍后查询')
        this.getList() 
      }
      })
    },
  }
}
</script>
