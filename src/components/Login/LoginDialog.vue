<template>
  <div>
    <!-- 弹出框 -->
    <el-dialog
      title="登录"
      :visible="true"
      width="30%"
      :before-close="handleClose"
      center
    >
      <el-form
        status-icon
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        style="text-align:center;"
      >
        <el-form-item label="手机号" prop="phone"
        label-width="100px">
          <el-input type="text" autocomplete="off" v-model.number.trim="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px"  prop="password">
          <el-input type="password" autocomplete="off" v-model.trim="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleForm)" :disabled="ruleForm.phone === '' || ruleForm.password === ''?true:false"
            >提交</el-button
          >
          <el-button @click="resetForm" :disabled="ruleForm.phone === '' || ruleForm.password === ''?true:false">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    // 手机号正则验证
    const validatePass2 = (rule, value, cb) => {
      const reg = /^1[3456789]\d{9}$/
      if (reg.test(value)) {
        cb()
      } else {
        cb(new Error('请输入正确的手机号'))
      }
    }
    return {
      ruleForm: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '请输入6位以上的密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 取消和关闭按钮
    handleClose () {
      this.$store.commit('dialogVisible', false)
    },
    // 确定提交按钮
    submitForm (val) {
      // 进行表单校验
      this.$refs.ruleForm.validate(async (isPass) => {
        //  如果通过，则提交登录
        if (isPass) {
          const res = await this.$store.dispatch('login', val)
          // console.log(res)
          if (res.code === 200) {
            this.$message.success('登陆成功')
            this.$store.commit('dialogVisible', false)
            // 需要重置数据
            this.resetForm()
            setTimeout(() => {
              this.$router.go(0)
            }, 2000)
          } else if (res.code === 502) {
            this.$message.error(res.message)
          }
        }
      })
    },
    // 重置
    resetForm () {
      this.ruleForm = {
        phoneNumber: '',
        password: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
