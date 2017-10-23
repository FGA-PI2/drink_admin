<template>
    <div id="login">
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Email..." style="width: 300px">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
            </br>
        <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Senha..." style="width: 300px">
                <Icon type="ios-locked-outline" slot="prepend"></Icon>
            </Input>
        </FormItem>
        </br>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')" style="width: 300px">Logar</Button>
        </FormItem>
    </Form>
         <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
</template>
<script>
import oboe from 'oboe'
export default {
  data () {
    return {
      formInline: {
        user: '',
        password: ''
      },
      ruleInline: {
        user: [{ required: true, message: 'Campo Obrigatório', trigger: 'blur' }],
        password: [
          { required: true, message: 'Campo Obrigatório', trigger: 'blur' },
          { type: 'string', min: 3, message: 'O comprimento da senha não pode ser inferior a 3 dígitos', trigger: 'blur' }
        ]
      },
      spinShow: false
    }
  },
  methods: {
    tryLogin () {
      oboe({
        url: 'http://dev-pi2-api.herokuapp.com/api-token-auth/',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          username: this.formInline.user,
          password: this.formInline.password
        }
      })
      .done((res) => {
        console.log('authentication success response: ' + JSON.stringify(res))
      })
      .fail((errorReport) => {
        console.log(errorReport)
      })
      console.log(this.formInline.user)
      console.log(this.formInline.password)
      this.spinShow = false
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.spinShow = true
          this.tryLogin()
        } else {
          this.$Message.error('Falha na validação do formulário!')
        }
      })
    }
  }
}
</script>
<style>
.center {
  text-align: center;
}
</style>

