import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
            primary: '#1b5e20',
            secondary: '#5e1b59',
            gray: '#E9EAEC'
        },
      },
      icons: {
          iconfont: 'mdi',
      },
    },
});
