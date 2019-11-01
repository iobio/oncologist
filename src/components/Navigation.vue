<template>
    <div>
        test
        <v-app-bar color="blue">
            test2
            <!--<v-toolbar-title v-text="title" style="margin-right: 0px"></v-toolbar-title>-->
            <!--<v-toolbar-title v-text="betaTitle" id="beta-title"></v-toolbar-title>-->
        </v-app-bar>
    </div>
</template>

<script>
    export default {
        name: "Navigation",
        components: {},
        props: {},
        data() {
            return {
                title: 'oncologist.iobio',
                betaTitle: 'beta',
            }
        }
    }
</script>

<style scoped lang="sass">
</style>