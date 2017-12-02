<template>
<div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
  <Row type="flex">
    <Col :span="spanLeft" class="layout-menu-left">
      <Menu active-name="1" theme="dark" width="auto">
        <div class="layout-logo-left"></div>
        <MenuItem name="1" @click="option = '1'">
            <Icon type="ios-navigate" :size="iconSize" @click="option = '1'"></Icon>
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
                <Col span="8" v-for="(drink, index) in drinks" :key="drink.nome">
                    <Card>
                      <p slot="title">Posição #{{index+1}} {{drinks[index].nome}}</p>
                        <i-circle :percent="drinksSize[index].size" :stroke-color="drinksSize[index].color">
                          <span class="demo-Circle-inner" style="font-size:24px">{{drinksSize[index].size}}%</span>
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
                      <Modal v-model="modal2.bool" width="360">
                        <p slot="header" style="color:#f60;text-align:center">
                            <Icon type="information-circled"></Icon>
                            <span>Atenção!</span>
                        </p>
                        <div style="text-align:center">
                            <p>Você está prestes a excluir do seu banco de dados!</p>
                            <p>Tem certeza que deseja excluir?</p>
                        </div>
                        <div slot="footer">
                            <Button type="error" size="large" long :loading="modal2.loading" @click="del('bebida')">Excluir</Button>
                        </div>
                        <Modal
                          v-model="modalNewBebida"
                          title="Cadastrar nova Bebida"
                          :loading="loading"
                          @on-ok="asyncOK('bebida')"
                          cancel-text="Cancelar">
                          <Form label-position="left" :label-width="100">
                            <FormItem label="Nome">
                                <Input v-model="novaBebida.nome"></Input>
                            </FormItem>
                            <FormItem label="Preço">
                                <InputNumber :max="1000" :min="1" v-model="novaBebida.preco"></InputNumber>
                            </FormItem>
                            <FormItem label="Volume">
                                <InputNumber :max="3000" :min="100" v-model="novaBebida.volume"></InputNumber>
                            </FormItem>
                            <FormItem label="Volume Restante">
                                <InputNumber :max="3000" :min="100" v-model="novaBebida.remaining_quantity"></InputNumber>
                            </FormItem>
                            <FormItem label="Posição">
                                <InputNumber :max="3" :min="1" v-model="novaBebida.posicao"></InputNumber>
                            </FormItem>
                        </Form>
                      </Modal>
                    </Modal>
                  </Card>



                  <Card dis-hover>
                      <p slot="title">Drinks do Cardápio</p>
                      <Table :columns="columns2" :data="data2"></Table>
                      <Button type="success" @click="modalNewDrink = true" long>Cadastrar Novo Drink</Button>
                      <Modal v-model="modal3.bool" width="360">
                        <p slot="header" style="color:#f60;text-align:center">
                            <Icon type="information-circled"></Icon>
                            <span>Atenção!</span>
                        </p>
                        <div style="text-align:center">
                            <p>Você está prestes a excluir do seu banco de dados!</p>
                            <p>Tem certeza que deseja excluir?</p>
                        </div>
                        <div slot="footer">
                            <Button type="error" size="large" long :loading="modal3.loading" @click="del('drink')">Excluir</Button>
                        </div>
                        </Modal>
                        <Modal
                          v-model="modalNewDrink"
                          title="Cadastrar novo Drink"
                          :loading="loading"
                          @on-ok="asyncOK('drink')"
                          cancel-text="Cancelar">
                          <Form label-position="left" :label-width="100">
                            <FormItem label="Nome">
                                <Input v-model="novoDrink.nome"></Input>
                            </FormItem>
                            <FormItem label="Descrição">
                                <Input v-model="novoDrink.descricao"></Input>
                            </FormItem>
                            <FormItem label="Selecione as bebidas">
                            <Select v-model="novoDrink.bebidas" multiple style="width:260px">
                              <Option v-for="item in drinks" :value="item.nome" :key="item.nome">{{ item.nome }}</Option>
                            </Select>
                            </FormItem>
                            <FormItem v-for="(item, index) in novoDrink.bebidas"  :key="item.nome" :label="item">
                              <InputNumber :max="100" :min="0" :step="10" v-model="novoDrink.volumes[index]">%</InputNumber>
                            </FormItem>
                            <FormItem label="Volume">
                                <InputNumber :max="400" :min="400" v-model="novoDrink.volume"></InputNumber>
                            </FormItem>
                        </Form>
                      </Modal>
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
import Vue from 'vue'
export default {
  data () {
    return {
      loading: true,
      novoDrink: {
        nome: null,
        bebidas: [],
        volumes: [0,0,0],
        descricao: null,
        volume: 400
      },
      novaBebida: {
        nome: null,
        posicao: null,
        preco: null,
        volume: null,
        remaining_quantity: null
      },
      orders: null,
      modalNewBebida: false,
      modalNewDrink: false,
      modal2: {
        bool: false,
        index: null,
        loading: false
      },
      modal3: {
        bool: false,
        index: null,
        loading: false
      },
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
                    this.modal2.bool = true
                    this.modal2.index = params.index
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
                    this.modal3.bool = true
                    this.modal3.index = params.index
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
    atualize () {
      console.log('INICIOU O COMPUTED')
      this.user = this.$store.getters.returnUser
      oboe({
        url: `//dev-pi2-api.herokuapp.com/users/`,
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
        url: `//dev-pi2-api.herokuapp.com/compra/`,
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
        url: `//dev-pi2-api.herokuapp.com/bebida/`,
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
        url: `//dev-pi2-api.herokuapp.com/drink/`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.user.token
        }
      })
      .done((res) => {
        this.cardapio = res
        this.data2 = res
        console.log('AEHOOO', this.data2)
        for(let x in this.data2){
          for(let y in this.data2[x].proporcao){
            this.data2[x].proporcao[y] = `${this.data2[x].proporcao[y].bebida} : ${this.data2[x].proporcao[y].volume} mL`
          }
        }
      })
      .fail((errorReport) => {
        console.log(errorReport)
      })
    },
    asyncOK (type) {
      if(type == 'bebida') {
        oboe({
          url: `//dev-pi2-api.herokuapp.com/bebida/`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': this.user.token
          },
          body: this.novaBebida
        })
        .done((res) => {
          this.modalNewBebida = false
          this.$Message.success('Criado com Sucesso');
          this.atualize()
        })
        .fail((errorReport) => {
          console.log(errorReport)
        })
      } else if(type == 'drink'){
        let totalVolumeDrink = 0
        for(let x in this.novoDrink.volumes){
          totalVolumeDrink += this.novoDrink.volumes[x]
        }
        if( totalVolumeDrink == 100 ){
          let drink = this.novoDrink
          drink['proporcao'] = []
          for(let x in this.novoDrink.bebidas){
            let volumeInML = (this.novoDrink.volumes[x]*this.novoDrink.volume)/100
            drink.proporcao.push({'bebida': this.novoDrink.bebidas[x], 'volume': volumeInML})
          }
          delete drink['bebidas']
          delete drink['volumes']
          console.log(drink)
          oboe({
            url: `//dev-pi2-api.herokuapp.com/drink/`,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': this.user.token
            },
            body: drink
          })
          .done((res, status) => {
            this.modalNewDrink = false
            if(res.nome == drink.nome){
              this.$Message.success('Criado com Sucesso');
            }
            this.novoDrink = {
              nome: null,
              bebidas: [],
              volumes: [0,0,0],
              descricao: null,
              volume: 400
            }
            this.atualize()
          })
          .fail((errorReport) => {
            this.modalNewDrink = false
            this.$Message.error('Ocorreu algum erro durante o processamento!');
            console.log(errorReport)
          })
        } else {
          this.modalNewDrink = false
          this.$Message.error('O volume total precisa ser 100%!');
        }
      }
    },
    del (type) {
      console.log('lalaa', type, this.modal3)
      let url
      if(type == 'bebida'){
        url = `//dev-pi2-api.herokuapp.com/bebida/${this.drinks[this.modal2.index].nome}`
        this.modal2.loading = true
      } else {
        url = `//dev-pi2-api.herokuapp.com/drink/${this.cardapio[this.modal3.index].nome}`        
        this.modal3.loading = true
      }
      console.log('aqui está a url: ', url)
      oboe({
        url: url,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.user.token
        }
      })
      .done((res) => {
        this.modal2.loading = false
        this.modal2.bool = false
        this.modal3.loading = false
        this.modal3.bool = false
        this.$Message.success('Excluído com Sucesso!');
        this.atualize()
      })
      .fail((errorReport) => {
        console.log(errorReport)
      })
    },
    setGraphics () {
      for(let x in this.drinks){
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
    this.atualize()
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