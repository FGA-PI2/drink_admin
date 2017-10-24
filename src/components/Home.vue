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
                        <h2>Bem-Vindo {{user.nome}}!</h2>
                        <Row>
                          <Col span="8">
                              <Card>
                                <p slot="title">Posição #1 {{drinks[0].nome}}</p>
                                  <i-circle :percent="drinksSize[0].size">
                                    <span class="demo-Circle-inner" style="font-size:24px">{{drinksSize[0].size}}%</span>
                                </i-circle>
                              </Card>
                          </Col>
                          <Col span="8">
                              <Card>
                                  <p slot="title">Posição #2 {{drinks[1].nome}}</p>
                                  <i-circle :percent="drinksSize[1].size" stroke-color="#4db8ff">
                                    <span class="demo-Circle-inner" style="font-size:24px">{{drinksSize[1].size}}%</span>
                                </i-circle>
                              </Card>
                          </Col>
                          <Col span="8">
                              <Card dis-hover>
                                  <p slot="title">Posição #3 {{drinks[2].nome}}</p>
                                  <i-circle :percent="drinksSize[2].size">
                                    <span class="demo-Circle-inner" style="font-size:24px">{{drinksSize[2].size}}%</span>
                                </i-circle>
                              </Card>
                          </Col>
                      </Row>
                    </div>
                    <div v-if="option === '2'">
                      <Row>
                        <Col span="11">
                            <Card>
                                <p slot="title">Bebidas</p>
                                <Table :columns="columns1" :data="data1"></Table>
                            </Card>
                        </Col>
                        <Col span="11" offset="2">
                            <Card dis-hover>
                                <p slot="title">Drinks</p>
                                <p>卡片内容</p>
                                <p>卡片内容</p>
                                <p>卡片内容</p>
                            </Card>
                        </Col>
                    </Row>
                    </div>
                    <div v-if="option === '3'">
                      <h2>USERS ADMIN</h2>
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
      user: null,
      spanLeft: 5,
      spanRight: 19,
      drinks: null,
      option: '1',
      drinksSize: [
        {size: 0},
        {size: 0},
        {size: 0}
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
                    alert(params.index)
                  }
                }
              }, 'Excluir')
            ])
          }
        }
      ],
      data1: []
    }
  },
  methods: {
    setGraphics () {
      for (var i = 0; i <= 80; i++) {
        this.drinksSize[0].size++
        this.drinksSize[1].size++
        this.drinksSize[2].size++
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