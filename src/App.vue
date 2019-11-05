<template>
  <v-app>
    <v-app-bar app dark color=darkPrimary>
      <v-toolbar-title class="headline text-uppercase">
        <span id="title">Oncologist.iobio</span>
      </v-toolbar-title>
      <v-toolbar-title style="padding-bottom:15px">
        <span id="beta-title">beta</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span style="color: red; font-style: italic; font-weight: 600; text-align: center">NOT A DIAGNOSTIC TOOL</span>
      <v-btn
        text
        href="http://iobio.io"
        target="_blank"
      >
        <span class="mr-2">an iobio project</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <Home/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/Home';

export default {
  name: 'App',
  components: {
    Home,
  },
  data: () => ({
    //
  }),
};
</script>
<style scoped lang="sass">
  #title
    font-family: Quicksand
    font-weight: 500

  #beta-title
    font-style: italic
    font-size: 16px
    margin-right: 5px
    margin-left: 0px
    color: yellow
</style>
