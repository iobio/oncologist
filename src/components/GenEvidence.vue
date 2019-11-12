<template>
    <v-card>
        <v-card-title class="card-title">
            Genomic Vulnerabilities
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col
                        v-for="v in variants"
                        :key="v.gene"
                        cols="auto"
                        class="target-col"
                        v-on:click="$emit('show-gene-details', v)"
                >
                    <v-row>
                        <i class="material-icons" style="font-size: 96px; color: #b2182b">gps_fixed</i>
                    </v-row>
                    <v-row justify="center">
                        <span class="gene-label">{{v.gene}}</span>
                        <span :style="{paddingBottom: '20px', color: v.typeColor}">{{v.type}}</span>
                    </v-row>
                    <v-row v-if="v.isSubclonal" justify="center" style="margin-left: -20px">
                        <i class="material-icons" style="font-size: 22px; color: #daa520">warning</i>
                        <span style="padding-left: 2px">Subclonal</span>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "GenEvidence",
        components: {},
        props: {
            screenWidth: {
                type: Number,
                default: 500
            },
            screenHeight: {
                type: Number,
                default: 500
            }
        },
        data: () => {
            return {
                variants: [
                    { gene: 'VHL', type: '3\'SNP', chrom: '3', start: 10141008, end: 10153670,
                        ref: 'C', alt: 'G', typeColor: '#daa520', isSubclonal: false,
                        features: [ {start: 10150429, end: 10150430, level: 1, type: 'SNP', impact: 'MODERATE' } ] },
                    { gene: 'MITD1', type: 'FS', chrom: '2', start: 99174427, end: 99174429,
                        ref: 'ATG', alt: 'AG', typeColor: 'red', isSubclonal: true,
                        features: [ {start: 0, end: 0, level: 1} ] }
                ]
            }
        },
        computed: {},
        methods: {}
    }
</script>
<style scoped lang="sass">
    .card-title
        font-family: Raleway
        color: #888
        padding-bottom: 5px
    .target-col
        margin: 20px 40px
    .gene-label
        font-family: Quicksand
        font-size: 32px
        padding-top: 10px
</style>