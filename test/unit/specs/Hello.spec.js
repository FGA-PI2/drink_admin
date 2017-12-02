import Vue from 'vue'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}
import MyComponent from 'src/MyComponent'{{#if_eq lintConfig "airbnb"}};{{/if_eq}}

describe('MyComponent.vue', () => {
  it('should have msg data set to Hi!', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(MyComponent){{#if_eq lintConfig "airbnb"}},{{/if_eq}}
    }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
    expect(vm.$children[0].msg)
      .to.equal('Hi!'){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
  }){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
}){{#if_eq lintConfig "airbnb"}};{{/if_eq}}
