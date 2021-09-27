<template>
  <div class="app-container">
    <hr
      style="height: 1px; border-top: 1px dashed rgb(0, 102, 204); border-right: none; border-bottom: none; border-left: none; border-image: initial;"
    >
    <br>
    <el-row>
      <el-col :span="12">
        <div class="filter-container">
          <el-input
            v-model="listQuery.title"
            placeholder="请输入文件名"
            style="width: 200px;"
            class="filter-item"
          />
          <el-button class="filter-item" type="primary" icon="el-icon-search">
            搜索
          </el-button>
        </div>
      </el-col>
      <el-upload
        ref="upload"
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">开始上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  data() {
    return {
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      fileList: []
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-container {
    .roles-table {
      margin-top: 30px;
    }
    .permission-tree {
      margin-bottom: 30px;
    }
  }
</style>
