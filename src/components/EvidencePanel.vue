<template>
    <v-card width="panelWidth">
        <v-card-title class="card-title">
            {{drug.toUpperCase()}}
        </v-card-title>
        <v-card-text>
            <DrugEvidence></DrugEvidence>
            <GenEvidence></GenEvidence>
            <TransEvidence></TransEvidence>
        </v-card-text>
    </v-card>
</template>

<script>
    import DrugEvidence from './DrugEvidence.vue'
    import GenEvidence from './GenEvidence.vue'
    import TransEvidence from './TransEvidence.vue'

    export default {
        name: "EvidencePanel",
        components: {
            DrugEvidence,
            GenEvidence,
            TransEvidence
        },
        props: {
            drug: {
                type: String,
                default: ''
            },
            panelWidth: {
                type: Number,
                default: 500
            }
        }
    }
</script>

<style scoped lang="sass">
    .card-title
        font-family: Quicksand
        font-size: 32px
        font-weight: 400
        color: #888
        padding-bottom: 15px
</style>