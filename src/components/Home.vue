<template>
    <div>
        <v-layout>
            <v-flex xs7>
                <PatientMetaData/>
                <DrugScores/>
            </v-flex>
            <v-flex xs5>
                <PatientTimeline/>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    import PatientMetaData from './PatientMetaData.vue'
    import PatientTimeline from './PatientTimeline.vue'
    import DrugScores from './DrugScores.vue'

    export default {
        name: "Home.vue",
        components: {
            PatientMetaData,
            PatientTimeline,
            DrugScores
        }
    }
</script>

<style scoped>

</style>