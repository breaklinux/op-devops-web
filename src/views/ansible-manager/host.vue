<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :model="listQuery" :inline="true" ref="listQuery">
        <el-form-item prop="appname">
           <el-input
            v-model="listQuery.appname"
            placeholder="应用名称"
            style="width: 180px;"
            class="filter-item"
            clearable
          />
        </el-form-item>
      <el-form-item prop="env">
        <el-select v-model="listQuery.env" placeholder="请选择环境" clearable class="filter-item" style="width: 180px">

        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name+'('+item.key+')'"
          :value="item.key"
        />
      </el-select>
      </el-form-item>  
      <el-form-item>
        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchBtn">
          搜索
        </el-button>
      </el-form-item>  
      <el-form-item>
         <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
          新建
        </el-button>
      </el-form-item>  
      </el-form>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="testData"
      border
      highlight-current-row
      style="width: 100%;"
    >

      <el-table-column v-for="(item,index) in columns" :key="index" :label="item.alias" :prop="item.name" align="center" />
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="delHost(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <br >
    <div class="block">
      <span class="demonstration" />
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[1, 5, 10, 100]"
        :page-size="listQuery.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="hostTotal"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">

      <el-form
        ref="dataFormdataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="环境" prop="group">
          <el-select v-model="temp.group" class="filter-item" placeholder="Please select">
            <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key" />
          </el-select>
        </el-form-item>
        <el-form-item label="主机" prop="instanceip">
          <el-select v-model="temp.instanceip"  multiple  filterable class="filter-item" placeholder="请输入主机IP">
            <el-option v-for="item in newList" :key="item.PrimaryIpAddress" :label="item.PrimaryIpAddress" :value="item.PrimaryIpAddress" />
          </el-select>
        </el-form-item>

        <el-form-item label="用户" prop="user">
          <el-input v-model="temp.username" placeholder="请输入用户名"  clearable />
        </el-form-item>

        <el-form-item label="密码" prop="passwd">
          <el-input v-model="temp.password" placeholder="请输入密码" clearable  />
        </el-form-item>

        <el-form-item label="端口" prop="port">
          <el-input v-model="temp.port" placeholder="请输入SSH端口" clearable />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?postList():updateHost()">
          提交
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {   getList,getEnvList,postHostApiList,deleteHost,putEditHost,getInstanceIP } from '@/api/ansible'
import {getEcsList } from '@/api/aliecs'
const calendarTypeOptions = [
  { key: 'dev', display_name: '开发环境' },
  { key: 'test', display_name: '测试环境' },
  { key: 'test2', display_name: '测试环境2' },
  { key: 'pre', display_name: '预生产环境' },
  { key: 'pro', display_name: '生产环境' }
]
export default {
  data() {
    return {
      newList: [],
      hostTotal: 0,
      currentPage: 1,
      pageSize: 5,
      testData: [],
      columns: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        page_size: 10,
      },
      ecslistQuery: {
        page: 1,
        page_size: 50,
      },
      appList: [],
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      clearValidate: '',
      showReviewer: false,
      temp: {
        group: '',
        instanceip: [],
        username: '',
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
    this.getList()
    this.get_EcsLIpist()
  },
  methods: {
    searchBtn() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleSizeChange: function(val) {
      this.listQuery.page_size = val
      this.getList()
    },
    handleCurrentChange: function(val) {
      this.listQuery.page = val
      this.getList()
    },
     get_EcsLIpist() {
      getInstanceIP(this.ecslistQuery).then((response) => {
        let ipList = response.data
        this.newList =  response.data      
      })
    },
    getList() {
      getList(this.listQuery).then(response => {
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
      postHostApiList(this.temp).then(response => {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    delHost(row) {
      var _this51 = this
      _this51.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteHost(row).then(response =>{
          _this51.dialogFormVisible = false
          _this51.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          }),
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
        putEditHost(_this52.temp).then(response => {
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
      this.temp.timestamp = new Date()
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataFormdataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        group: '',
        instanceip:[],
        username: '',
        password: '',
        port: ''
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    }
  }
}
</script>
