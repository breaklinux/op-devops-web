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
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新建
      </el-button>
            <el-button class="filter-item" @click="getupdatadnsList()" type="danger">资源同步 </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="testData"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column v-for="(item,index) in columns" :key="index" v-bind:label="item.alias" v-bind:prop="item.name" align="center"/>
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
    <br>
    <div class="block">
      <span class="demonstration"/>
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
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="named"
        label-position="left"
        label-width="70px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="域名名称" prop="named_Rr">
          <el-input v-model="named.Rr" placeholder="请输入域名名称" clearable/>
        </el-form-item>

        <el-form-item label="主域名称" prop="named_domain">
          <el-select v-model="named.ZoneId" multiple placeholder="请选择">
            <el-option
              v-for="ZoneId in domainoptions"
              :key="ZoneId.key"
              :label="ZoneId.label"
              :value="ZoneId.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="解析类型" prop="named_Type">
          <el-input v-model="named.Type" placeholder="选择类型A,CNAME" clearable/>
        </el-form-item>

        <el-form-item label="解析值" prop="named_Value">
          <el-input v-model="named.Value" placeholder="请输入解析值地址"/>
        </el-form-item>
        <el-form-item label="用途" prop="named_Remark">
          <el-input v-model="named.Remark" placeholder="请输入服务用途" clearable/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?postList():updateHost() ">
          提交
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel"/>
        <el-table-column prop="pv" label="Pv"/>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import {getPrivateDnsList,postPrivateDnsList,getUpdataPrivdnsList,getUpdataPrivdnsListtwo,deletePrivateDns, putEditPrivateDns } from '@/api/aliecs'
  export default {
    data() {
      return {
        updatalistQuery: 
        {
        page: 1,
        page_size: 1000,
        load: 'all'
         },
        domainoptions: [{
          value: '0b99bd2f5ca00fc856f8d943a892e480',
          label: 'xiavan.cloud'
        }],
        clearValidate: '',
        number: 1,
        ZoneId: [],
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
        named: {
          Rr: '',
          Type: '',
          Value: '',
          Remark: '',
          ZoneId: ''
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
          type: [{required: true, message: 'type is required', trigger: 'change'}],
          timestamp: [{type: 'date', required: true, message: 'timestamp is required', trigger: 'change'}],
          use: [{required: true, message: 'title is required', trigger: 'blur'}]
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
      handleSizeChange: function (val) {
        this.listQuery.page_size = val
        this.getList()
      },
      handleCurrentChange: function (val) {
        this.listQuery.page = val
        this.getList()
      },
      getList() {
        // this.axios.get(`https://op-apis.mumway.com/op-alicloud-api/privateparsing/index.json?page=${this.currentPage}&page_size=${this.pageSize}`).then((response) => {
        //   this.columns = response.data.columns
        //   this.testData = response.data.data
        //   this.hostTotal = response.data.total
        //   this.listLoading = false
        // }).catch((response) => {
        //   console.log(response)
        // })
        this.listLoading = true
        getPrivateDnsList(this.listQuery).then(response =>{
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
        var _this50 = this
        // this.axios.post('https://op-apis.mumway.com/op-alicloud-api/privateparsing/index.json', this.named).then(function (response) {
        //   _this50.dialogFormVisible = false
        //   _this50.$notify({
        //     title: 'Success',
        //     message: 'Created Successfully',
        //     type: 'success',
        //     duration: 2000
        //   })
        //   console.log(response.data);
        //   _this50.getList()
        // }).catch(function (error) {
        //   console.log(error)
        // })
        postPrivateDnsList(this.named).then(response => {
          _this50.dialogFormVisible = false
          _this50.$notify({
            title: 'Success',
            message: 'Created Successfully',
            type: 'success',
            duration: 2000
          })
          console.log(response.data);
          _this50.getList()
        })
      },
      delHost(row) {
        var _this51 = this
        _this51.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deletePrivateDns(row).then(response => {
            _this51.dialogFormVisible = false
            _this51.$notify({
              title: 'Success',
              message: 'Delete Successfully',
              type: 'success',
              duration: 2000
            })
            _this51.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      updateHost() {
        var _this52 = this
        _this52.$confirm('此操作将修改该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          putEditPrivateDns(_this52.named).then(response => {
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
        this.named = Object.assign({}, row) // copy obj
        this.named.timestamp = new Date()
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      resetTemp() {
        this.named = {
          Rr: '',
          Type: '',
          Value: '',
          Remark: '',
          ZoneId: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
   getupdatadnsList (){
      let updatalistQuery = this.updatalistQuery
      getUpdataPrivdnsList(updatalistQuery).then(response =>{  
      console.log(response) 
      getUpdataPrivdnsListtwo(updatalistQuery)
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

