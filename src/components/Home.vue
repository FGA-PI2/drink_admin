<template>
<div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
   
        <Row type="flex">
            <Col :span="spanLeft" class="layout-menu-left">
                <Menu active-name="1" theme="dark" width="auto">
                    <div class="layout-logo-left"></div>
                    <MenuItem name="1" @click="option = '1'">
                        <Icon type="ios-navigate" :size="iconSize"></Icon>
                        <span class="layout-text" @click="option = '1'">Início</span>
                    </MenuItem>
                    <MenuItem name="2">
                        <Icon type="ios-keypad" :size="iconSize"></Icon>
                        <span class="layout-text" @click="option = '2'">Administrar Bebidas</span>
                    </MenuItem>
                    <MenuItem name="3">
                        <Icon type="ios-analytics" :size="iconSize"></Icon>
                        <span class="layout-text" @click="option = '3'">Usuários</span>
                    </MenuItem>
                </Menu>
            </Col>
            <Col :span="spanRight">
                <div class="layout-header">
                    <Button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                      <div v-if="option === '1'">
                        <h1>Bem-Vindo {{user.nome}}!</h1>
                        </br>
                        <h2>Bebidas da Máquina</h2>                        
                        <Row>
                          <Col span="8">
                              <Card>
                                <p slot="title">Posição #1 {{drinks[0].nome}}</p>
                                  <i-circle :percent="drinksSize[0].size" :stroke-color="drinksSize[0].color">
                                    <span class="demo-Circle-inner" style="font-size:24px">{{drinksSize[0].size}}%</span>
                                </i-circle>
                              </Card>
                          </Col>
                          <Col span="8">
                              <Card>
                                  <p slot="title">Posição #2 {{drinks[1].nome}}</p>
                                  <i-circle :percent="drinksSize[1].size" :stroke-color="drinksSize[1].color">
                                    <span class="demo-Circle-inner" style="font-size:24px">{{drinksSize[1].size}}%</span>
                                </i-circle>
                              </Card>
                          </Col>
                          <Col span="8">
                              <Card dis-hover>
                                  <p slot="title">Posição #3 {{drinks[2].nome}}</p>
                                  <i-circle :percent="drinksSize[2].size" :stroke-color="drinksSize[2].color">
                                    <span class="demo-Circle-inner" style="font-size:24px">{{drinksSize[2].size}}%</span>
                                </i-circle>
                              </Card>
                          </Col>
                      </Row>
                      </br></br>
                      <h2>Histórico de Compras</h2>
                      <Table :columns="columnsOrders" :data="dataOrders"></Table>
                    </div>
                    <div v-if="option === '2'">
                      <Row>
                            <Card>
                                <p slot="title">Bebidas</p>
                                <Table :columns="columns1" :data="data1"></Table>
                                <Button type="success" @click="modalNewBebida = true" long>Cadastrar Nova Bebida</Button>
                                <Modal v-model="modal2" width="360">
                                  <p slot="header" style="color:#f60;text-align:center">
                                      <Icon type="information-circled"></Icon>
                                      <span>Atenção!</span>
                                  </p>
                                  <div style="text-align:center">
                                      <p>Você está prestes a excluir uma bebida do seu banco de dados!</p>
                                      <p>Tem certeza que deseja excluir?</p>
                                  </div>
                                  <div slot="footer">
                                      <Button type="error" size="large" long :loading="modal_loading" @click="del">Excluir</Button>
                                  </div>
                                  <Modal
                                    v-model="modalNewBebida"
                                    title="Cadastrar nova Bebida"
                                    ok-text="Cadastrar"
                                    cancel-text="Cancelar">
                                    <Form label-position="left" :label-width="100">
                                      <FormItem label="Nome">
                                          <Input></Input>
                                      </FormItem>
                                      <FormItem label="Preço">
                                          <Input ></Input>
                                      </FormItem>
                                      <FormItem label="Volume">
                                          <Input ></Input>
                                      </FormItem>
                                  </Form>
                                </Modal>
                              </Modal>
                            </Card>
                            <Card dis-hover>
                                <p slot="title">Drinks</p>
                                <Table :columns="columns2" :data="data2"></Table>
                                <Button type="success" @click="modalNewBebida = true" long>Cadastrar Novo Drinks</Button>
                            </Card>
                    </Row>
                    </div>
                    <div v-if="option === '3'">
                      <Table :columns="columnsUsers" :data="dataUsers"></Table>
                    </div>
                    </div>
                </div>
                <div class="layout-copy">
                    2017 &copy; SunBar Team!
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
/* eslint-disable */
import oboe from 'oboe'
export default {
  data () {
    return {
      orders: null,
      modalNewBebida: false,
      modal2: false,
      user: null,
      spanLeft: 5,
      spanRight: 19,
      drinks: null,
      cardapio: null,
      option: '1',
      drinksSize: [
        {size: 0, color: ''},
        {size: 0, color: ''},
        {size: 0, color: ''}
      ],
      dataUsers: [],
      columnsUsers: [
        {title: 'Nome', key: 'first_name'},
        {title: 'Email', key: 'email'},
        {title: 'Data de Nascimento', key: 'data_nascimento'},
        {title: 'Créditos', key: 'creditos'},
        {title: 'Super Usuário', key: 'is_superuser'}
      ],
      dataOrders: [],
      columnsOrders: [
        {title: 'Nome', key: 'nome'},
        {title: 'Data', key: 'data_compra'},
        {title: 'Usuario', key: 'usuario'},
        {title: 'Preco', key: 'preco'},
        {title: 'Valido', key: 'is_valid'}
      ],
      columns1: [
        {title: 'Nome', key: 'nome'},
        {title: 'Posicao', key: 'posicao'},
        {title: 'Restante', key: 'remaining_quantity'},
        {title: 'Preco', key: 'preco'},
        {title: 'Volume', key: 'volume'},
        {
          title: 'Ações',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      alert(params.index)
                    }
                  }
                }, 'Editar'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modal2 = true
                  }
                }
              }, 'Excluir')
            ])
          }
        }
      ],
      data1: [],
      columns2: [
        {title: 'Nome', key: 'nome'},
        {title: 'Descricao', key: 'descricao'},
        {title: 'Preco', key: 'preco'},
        {title: 'Volume', key: 'volume'},
        {title: 'Proporção', key: 'proporcao'},
        {
          title: 'Ações',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      alert(params.index)
                    }
                  }
                }, 'Editar'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modal2 = true
                  }
                }
              }, 'Excluir')
            ])
          }
        }
      ],
      data2: [],
    }
  },
  methods: {
    setGraphics () {
      for(let x in this.drinksSize){
        this.drinksSize[x].size = (this.drinks[x].remaining_quantity * 100) / this.drinks[x].volume
        console.log('the size is: ',this.drinksSize[x].size)
        if(this.drinksSize[x].size <= 10){
          this.drinksSize[x].color = '#ff5500'
        } else if (this.drinksSize[x].size > 10 && this.drinksSize[x].size <= 35){
          this.drinksSize[x].color = '#ffd480'
        } else {
          this.drinksSize[x].color = '#80d4ff'
        }
      }
    },
    toggleClick () {
      if (this.spanLeft === 5) {
        this.spanLeft = 2
        this.spanRight = 22
      } else {
        this.spanLeft = 5
        this.spanRight = 19
      }
    }
  },
  mounted () {
    console.log('INICIOU O COMPUTED')
    this.user = this.$store.getters.returnUser
    oboe({
      url: `http://dev-pi2-api.herokuapp.com/users/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.user.token
      }
    })
    .done((res) => {
      this.dataUsers = res
    })
    .fail((errorReport) => {
      console.log(errorReport)
    })
    oboe({
      url: `http://dev-pi2-api.herokuapp.com/compra/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.user.token
      }
    })
    .done((res) => {
      console.log('huhuhuhu', res)
      this.dataOrders = res
      for(let x in this.dataOrders){
        this.dataOrders[x]['is_valid'] = this.dataOrders[x].qr_code.is_valid
      }
      console.log('ORDES', this.dataOrders)
    })
    .fail((errorReport) => {
      console.log(errorReport)
    })
    oboe({
      url: `http://dev-pi2-api.herokuapp.com/bebida/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.user.token
      }
    })
    .done((res) => {
      console.log('huhuhuhu', res)
      this.drinks = res
      this.data1 = res
      this.setGraphics()
    })
    .fail((errorReport) => {
      console.log(errorReport)
    })
    oboe({
      url: `http://dev-pi2-api.herokuapp.com/drink/`,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.user.token
      }
    })
    .done((res) => {
      this.cardapio = res
      this.data2 = res
    })
    .fail((errorReport) => {
      console.log(errorReport)
    })
  },
  computed: {
    iconSize () {
      return this.spanLeft === 5 ? 14 : 24
    }
  }
}
</script>
<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-breadcrumb {
  padding: 10px 15px 0;
}
.layout-content {
  min-height: 200px;
  margin: 15px;
  overflow: hidden;
  background: #fff;
  border-radius: 4px;
}
.layout-content-main {
  padding: 10px;
}
.layout-copy {
  text-align: center;
  padding: 10px 0 20px;
  color: #9ea7b4;
}
.layout-menu-left {
  background: #464c5b;
}
.layout-header {
  height: 60px;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.layout-ceiling-main a {
  color: #9ba7b5;
}
.layout-hide-text .layout-text {
  display: none;
}
.ivu-col {
  transition: width 0.2s ease-in-out;
}
</style>