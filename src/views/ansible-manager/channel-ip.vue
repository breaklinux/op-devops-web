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
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        新建
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
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="ipTotal"
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

        <el-form-item label="授权IP" prop="IP">
          <el-input v-model="temp.ip" placeholder="请输入用途" clearable />
        </el-form-item>

        <el-form-item label="使用方" prop="owner">
          <el-input v-model="temp.owner" placeholder="请输入使用方" clearable />
        </el-form-item>

        <el-form-item label="备注说明" prop="note">
          <el-input v-model="temp.desc" placeholder="请输入备注说明" clearable />
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
import axios from 'axios'
import {putChannelIp,deleteChannelIp,postChannelIp,getChannelIp} from '@/api/ansible'
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
      testData: [],
      ipTotal: 0,
      currentPage: 1,
      pageSize: 5,
      columns: [],
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      showReviewer: false,
      temp: {
        ip: '',
        desc: '',
        owner: ''
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
    this.getAnsibeHistory()
  },
  methods: {
    handleSizeChange: function(val) {
      this.pageSize = val
      this.getAnsibeHistory()
    },
    handleCurrentChange: function(val) {
      this.currentPage = val
      this.getAnsibeHistory()
    },
    getAnsibeHistory() {
      getChannelIp(this.listQuery).then((response) => {
        console.log('channel-get:', response)
        this.columns = response.columns
        this.testData = response.data
        //this.ipTotal = response.total
        this.listLoading = false
      }).catch((response) => {

      })
    },
    postList() {
      var _this59 = this
      postChannelIp(this.temp).then(function(response) {
        console.log(response)
        _this59.dialogFormVisible = false
        _this59.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
        _this59.getAnsibeHistory()
      }).catch(function(error) {
        console.log(error)
      })
    },
    delHost(row) {
      var _this61 = this
      _this61.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteChannelIp(row).then(function(response) {
          console.log(response)
          _this61.dialogFormVisible = false
          _this61.$notify({
            title: 'Success',
            message: 'Delete Successfully',
            type: 'success',
            duration: 2000
          })
          _this61.getAnsibeHistory()
        }).catch(function(error) {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    updateHost() {
      var _this62 = this
      console.log(_this62.temp)
      _this62.$confirm('此操作将修改该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        putChannelIp(_this62.temp
        ).then(function(response) {
          console.log(response)
          _this62.dialogFormVisible = false
          _this62.$notify({
            title: 'Success',
            message: 'Update Successfully',
            type: 'success',
            duration: 2000
          })
          _this62.getAnsibeHistory()
        }).catch(function(error) {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消修改'
        })
      })
    },

    handleUpdate(row) {
      console.log(row)
      this.temp = Object.assign({}, row) // copy obj
      this.temp.timestamp = new Date()
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    resetTemp() {
      this.temp = {
        ip: '',
        desc: '',
        owner: ''
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
