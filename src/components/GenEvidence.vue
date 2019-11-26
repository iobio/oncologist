<template>
    <v-card class="mb-1">
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
                        <i class="material-icons" style="font-size: 96px; color: #b2182b">{{getSymbol(v.type)}}</i>
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
                // NOTE: these are GRCh37 coords
                variants: [
                    { gene: 'MITD1', type: 'FS', chrom: '2', start: 99776890, end: 99798521,
                        ref: 'ATG', alt: 'AG', typeColor: 'red', isSubclonal: true,
                        features: [ {start: 99785726, end: 99785727, level: 1, type: 'DEL', impact: 'HIGH' } ] },
                    { gene: 'CCNE1', type: 'AMP', chrom: '19', start: 30302805, end: 30315215,
                        ref: 'C', alt: 'G', typeColor: 'red', isSubclonal: false,
                        features: [ {start: 30315000, end: 30315100, level: 1, type: 'COMPLEX', impact: 'HIGH' } ] },
                ]
            }
        },
        computed: {},
        methods: {
            getSymbol: function(variantType) {
                // TODO: add more symbols here
                if (variantType === 'AMP') {
                    return 'trending_up';
                } else {
                    return 'gps_fixed';
                }
            }
        }
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