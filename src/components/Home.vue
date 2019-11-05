<template>
    <div>
        <v-layout>
            <v-flex xs7>
                <PatientMetaData/>
                <DrugScores
                        :fileName="FILENAME"
                        :drugList="DRUGS">
                </DrugScores>
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
        },
        data: () => {
            return {
              FILENAME:  'http://localhost:8000/tsvExample.tsv',
              DRUGS: ['Everolimus', 'Bevacizumab', 'Trastuzumab', 'Palbociclib', 'Ribociclib', 'Olaparib', 'Neratinib', 'Pertuzumab']
            };
        }
    }
</script>

<style scoped>

</style>