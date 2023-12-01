<template>
  <div class="dashboard-container">
    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
      <el-form-item label="渠道名: ">
        <el-input v-model="queryParams.channelName" placeholder="渠道名称"></el-input>
      </el-form-item>
      <el-form-item label="渠道类型: ">
        <el-select v-model="queryParams.channelType" clearable  placeholder="渠道类型">
          <el-option label="OpenAi" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分组: ">
        <el-select v-model="queryParams.groupId" clearable placeholder="分组">
          <el-option
            v-for="group in groupList"
            :key="group.groupId"
            :label="group.groupName"
            :value="group.groupId"> 
          </el-option>
        </el-select>
      </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit" icon="el-icon-search">搜索</el-button>
          </el-form-item>
      </el-form>
       <el-button type="primary" @click="createChannel">创建渠道</el-button>
    <el-table
        :data="tableData"
        stripe
        type=index
        style="width: 100%">
        <el-table-column
         label="序号"
         width="100">
         <template slot-scope="scope">
           <span style="margin-left: 10px">{{ scope.row.channelId }}</span>
         </template>
        </el-table-column>
        <el-table-column
          label="渠道名称"
          min-width="180"
          >
          <template slot-scope="scope">
            <i class="el-icon-bank-card"></i>
            <span style="margin-left: 10px">{{ scope.row.channelName }}</span>
          </template>
        </el-table-column>

        <el-table-column
          label="渠道类型"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.channelTypeDesc }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="渠道分组"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.groups }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          label="apiKey情况"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.rate }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="queryParams.pageNum"
        @current-change="changePage"
        :total="totalData">
      </el-pagination>
      <el-drawer
        title="渠道详情"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose">
        <el-card class="box-card">
            <span></span>
        </el-card>
      </el-drawer>
      <el-dialog title="新增渠道" :visible.sync="dialogFormVisible">
        <el-form :model="channel">
          <el-form-item label="渠道名称" :label-width="formLabelWidth">
            <el-input v-model="channel.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { queryChannel,createChannel,batchTestApiKey,testApiKey } from '@/api/one-api'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'groupList'
    ])
  },
  data(){
    return{
      tableData: [],
      channel:{},
      drawer: false,
      formLabelWidth: '120px',
      dialogFormVisible:false,
       totalData:100,
       channelInfo:{},
       direction: 'rtl',
      queryParams:{
        pageNum:1,
        pageSize:10,
        channelName:'',
        channelType:'',
        groupId:''
      }

    }
  },
  created() {
    this.getData();
  },
  methods: {
      createChannel() {
        this.dialogFormVisible = true;
      },
        handleClose(done) {
            this.$confirm('确认关闭？')
              .then(_ => {
                done();
              })
              .catch(_ => {});
        },
        changePage(pageNum){
          this.queryParams.pageNum=pageNum;
          this.getData(this.queryParams.pageNum,this.queryParams.pageSize)
        },
        getData(pageNum,pageSize){
          queryChannel(this.queryParams).then(res=>{
            this.tableData=res.data.records;
            this.totalData=res.data.total;
          })
        },
       handleEdit(index, row) {
         this.channelInfo=row;
         this.drawer=true;
         console.log(index, row);
       },
       handleDelete(index, row) {
         console.log(index, row);
       },
       onSubmit(){
         this.queryParams.pageNum=1;
          this.getData();
       }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
