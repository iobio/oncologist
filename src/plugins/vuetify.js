import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
            primary: '#2166ac',
            darkPrimary: '#194d81',
            secondary: '#b2182b',
            gray: '#E9EAEC'
        },
      },
      icons: {
          iconfont: 'mdi',
      },
    },
});
