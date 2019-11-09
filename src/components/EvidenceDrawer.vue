<template>
    <div>
        <v-sheet
                :height="screenHeight"
                class="overflow-hidden"
                style="position: relative;"
        >
            <!--Static main page-->
            <v-card>
                <v-card-title class="card-title">
                    {{drug.toUpperCase()}}
                </v-card-title>
                <v-card-text>
                    <DrugEvidence></DrugEvidence>
                    <GenEvidence
                            :screenHeight="screenHeight"
                            :screenWidth="screenWidth"
                            @show-gene-details="showGeneDetails">
                    </GenEvidence>
                    <TransEvidence></TransEvidence>
                </v-card-text>
            </v-card>

            <!--Dynamic drawer-->
            <v-navigation-drawer
                    v-model="displayGeneDrawer"
                    absolute
                    temporary
                    right
                    :width="overlayWidth"
            >
                <VariantDetailDrawer
                        :variant="selectedVariant"
                        :drug="drug"
                        :cardWidth="overlayWidth">
                </VariantDetailDrawer>
            </v-navigation-drawer>
        </v-sheet>
    </div>
</template>

<script>
    import DrugEvidence from './DrugEvidence.vue'
    import GenEvidence from './GenEvidence.vue'
    import TransEvidence from './TransEvidence.vue'
    import VariantDetailDrawer from './VariantDetailDrawer.vue'

    export default {
        name: "EvidenceDrawer",
        components: {
            DrugEvidence,
            GenEvidence,
            TransEvidence,
            VariantDetailDrawer
        },
        props: {
            drug: {
                type: String,
                default: ''
            },
            screenWidth: {
                type: Number,
                default: 500
            },
            screenHeight: {
                type: Number,
                default: 500
            }
        },
        data:() => {
            return {
                selectedGene: '',
                selectedVariant: null,
                displayGeneDrawer: false
            }
        },
        computed: {
            overlayWidth: function() {
                return this.screenWidth * 0.7;
            }
        },
        methods: {
            showGeneDetails: function(variant) {
                this.selectedGene = variant.gene;
                this.selectedVariant = variant;
                this.displayGeneDrawer = true;
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
</style>