<template>
    <div id="login">
      <img src="../assets/logo.png">
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
  vuex: {
    getters: {
      user: store => store.user
    },
    actions: {
      setUser ({dispatch}, obj) {
        dispatch('SET_USER', obj)
      }
    }
  },
  methods: {
    confirm () {
      this.$Modal.warning({
        title: '<center>Atenção!</center>',
        content: '<center>Sua conta não é uma conta administrativa!</center>'
      })
      this.spinShow = false
      this.formInline.user = ''
      this.formInline.password = ''
    },
    tryLogin (token) {
      oboe({
        url: `http://dev-pi2-api.herokuapp.com/users/?email=${this.formInline.user}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      .done((res) => {
        console.log(res)
        if (res[0].is_superuser === false) {
          this.confirm()
        } else {
          console.log(this.$store.state.user)
          let user = {
            user: {
              token: token,
              email: res[0].email,
              nome: res[0].first_name
            }
          }
          // this.$store.state.user.token = token
          this.$store.commit('SET_USER', user)
          this.$router.push('/home')
        }
      })
      .fail((errorReport) => {
        console.log(errorReport)
      })
    },
    getToken () {
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
        if (res.token) {
          this.tryLogin(res.token)
          console.log('authentication success response: ' + JSON.stringify(res))
        }
      })
      .fail((errorReport) => {
        console.log(errorReport)
      })
      console.log(this.formInline.user)
      console.log(this.formInline.password)
    },
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.spinShow = true
          this.getToken()
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

