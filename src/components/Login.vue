<template>
    <div id="login">
        <h2>SunBar Admin</h2>
        <Input class="center" v-model="email" placeholder="E-mail..." style="width: 400px"></Input>
        </br>
        </br>
        </br>
        <Input class="center" v-model="senha" placeholder="Senha..." style="width: 400px" type="password"></Input>
        </br>
        </br>
        </br>
         <Button @click="tryLogin()" style="width: 400px" type="success">Login</Button>
    </div>
</template>
<script>
export default {
  data () {
    return {
      email: '',
      senha: ''
    }
  },
  methods: {
    tryLogin () {
      alert(this.email, this.senha)
    }
  }
}
</script>
<style>
.center {
  text-align: center;
}
</style>

