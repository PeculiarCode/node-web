<template>
  <el-table :data="articles" border style="width: 100%">
    <el-table-column label="标题" width="150">
      <template #default="scope"> {{ scope.row.article.title }} </template>
    </el-table-column>
    <el-table-column prop="body" label="描述" width="150">
      <template #default="scope">
        {{ scope.row.article.description }}
      </template>
    </el-table-column>
    <el-table-column prop="body" label="内容" width="150">
      <template #default="scope"> {{ scope.row.article.body }} </template>
    </el-table-column>

    <el-table-column label="操作" width="100">
      <template #default="scope">
        <el-button @click="handleDelete(scope.row)" type="text" size="small"
          >删除</el-button
        >
        <el-button type="text" size="small" @click="handleEdit(scope.row)"
          >编辑</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    title="提示"
    v-model="dialogVisible"
    width="60%"
    :before-close="handleClose"
  >
    <el-input placeholder="标题" v-model="form.title"></el-input>
    <el-input placeholder="描述" v-model="form.description"></el-input>
    <el-input
      placeholder="内容"
      v-model="form.content"
      type="textarea"
    ></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </span>
    </template>
  </el-dialog>
  <el-input
    v-model="inputValue"
    placeholder="输入objectId进行数据查询"
    style="width: 30%"
  ></el-input>
  <el-button @click="handleSearch">数据筛选</el-button>
  <el-button @click="handleAdd">数据增加</el-button>
</template>
<script>
export default {
  data() {
    return {
      articles: [],
      form: {
        title: '',
        description: '',
        content: ''
      },
      objectId: '',
      inputValue: '',
      dialogVisible: false,
      addStatus: false
    }
  },
  mounted() {
    this._initData()
  },
  methods: {
    async _initData() {
      try {
        const res = await this.$axios({
          url: 'getArticles',
          method: 'GET',
          params: { _size: 10, _page: 1 }
        })
        this.articles = res.data.articles
      } catch (err) {
        console.log(err)
      }
    },
    handleAdd() {
      this.dialogVisible = true
      this.addStatus = true
      this.form = {}
    },
    handleEdit(e) {
      this.dialogVisible = true
      this.addStatus = false
      const data = e.article
      this.form.title = data.title
      this.form.description = data.description
      this.form.content = data.body
      this.objectId = e._id
    },
    handleSure() {
      let params = {
        article: {
          title: this.form.title,
          description: this.form.description,
          body: this.form.content,
          creteTime: Date.now(),
          updateTime: Date.now()
        }
      }
      if (!this.addStatus) {
        this.$axios({
          url: `updateArticles/${this.objectId}`,
          method: 'PATCH',
          data: { article: { ...params } }
        })
      } else {
        this.$axios({
          url: 'createArticle',
          method: 'POST',
          data: { ...params }
        })
      }

      this.dialogVisible = false
      this._initData()
    },
    handleClose() {
      this.dialogVisible = false
    },
    handleDelete(e) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const id = e._id
          const data = await this.$axios({
            url: `deleteArticles/${id}`,
            method: 'DELETE'
          })
          if (data.data.status) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this._initData()
          }
        })
        .catch(() => {})
    },
    async handleSearch() {
      if (!this.inputValue) {
        this.$message.error('输入id')
        return
      }
      const { data } = await this.$axios({
        url: `readArticles/${this.inputValue}`,
        method: 'POST'
      })
      this.articles = [].concat(data.article)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-input {
  margin-top: 20px;
}
.el-textarea {
  margin-top: 20px;
}
</style>
