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
                        <Row>
                          <Col span="8">
                              <Card>
                                  <p slot="title">{{drinks[0].nome}}</p>
                                  <canvas id="myChart" width="100" height="100"></canvas>
                              </Card>
                          </Col>
                          <Col span="8">
                              <Card>
                                  <p slot="title">{{drinks[1].nome}}</p>
                                  <canvas id="myChart2" width="100" height="100"></canvas>
                              </Card>
                          </Col>
                          <Col span="8">
                              <Card dis-hover>
                                  <p slot="title">{{drinks[2].nome}}</p>
                                  <canvas id="myChart3" width="100" height="100"></canvas>
                              </Card>
                          </Col>
                      </Row>
                    </div>
                    <div v-if="option === '2'">
                      <h2>DRINKS ADMIN</h2>
                    </div>
                    <div v-if="option === '3'">
                      <h2>USERS ADMIN</h2>
                    </div>
                    </div>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </Col>
        </Row>
    </div>
</template>
<script>
import Chart from 'chart.js'
import oboe from 'oboe'
export default {
  data () {
    return {
      user: null,
      spanLeft: 5,
      spanRight: 19,
      drinks: null,
      option: '1'
    }
  },
  methods: {
    setGraphics () {
      var ctx = document.getElementById('myChart')
      var ctx2 = document.getElementById('myChart2')
      var ctx3 = document.getElementById('myChart3')
      var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [50, 50],
            backgroundColor: ['Green', 'white']
          }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
            'Restante',
            ''
          ]
        }
      })
      var myChart2 = new Chart(ctx2, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [50, 50],
            backgroundColor: ['Orange', 'white']
          }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
            'Restante',
            ''
          ]
        }
      })
      var myChart3 = new Chart(ctx3, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [50, 50],
            backgroundColor: ['Blue', 'white']
          }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
          labels: [
            'Restante',
            ''
          ]
        }
      })
      console.log(myChart, myChart2, myChart3)
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
      console.log(res)
      this.drinks = res
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