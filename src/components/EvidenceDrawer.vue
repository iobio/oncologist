<template>
    <div>
        <v-sheet
                :height="screenHeight"
                style="position: relative;"
        >
            <!--Static main page-->
            <v-card>
                <v-card-title class="card-title">
                    {{drug.toUpperCase()}}
                </v-card-title>
                <v-card-text>
                    <DrugEvidence
                    :fileName="screenFile"
                    :pdxIds="pdxIds">
                    </DrugEvidence>
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
                    app
                    temporary
                    right
                    :width="overlayWidth"
            >
                <VariantDetailDrawer
                        :variant="selectedVariant"
                        :transcript="selectedTranscript"
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
            },
            screenFile: {
                type: String,
                default: ''
            },
            pdxIds: {
                type: Array,
                default: null
            },
        },
        data:() => {
            return {
                selectedGene: '',
                selectedVariant: null,
                selectedTranscript: null,
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
                this.selectedTranscript = this.getSlimmedTranscript(variant.gene);
                this.displayGeneDrawer = true;
            },
            // TODO: change this into actual call to backend
            getSlimmedTranscript: function(gene) {
                if (gene === 'VHL') {
                    return {
                        end: 10193904,
                        features: [
                            {
                                end: 10183871,
                                feature_type: 'exon',
                                seq_id: 'chr3',
                                start: 10182692,
                                strand: '+',
                                transcript_id: 'ENST00000256474.2'
                            },
                            {
                                end: 10183871,
                                feature_type: 'CDS',
                                seq_id: 'chr3',
                                start: 10183532,
                                strand: '+',
                                transcript_id: 'ENST00000256474.2'
                            },
                            {
                                end: 10183534,
                                feature_type: "start_codon",
                                seq_id: 'chr3',
                                start: 10183532,
                                strand: '+',
                                transcript_id: 'ENST00000256474.2'
                            },
                            {
                                end: 10188320,
                                feature_type: 'exon',
                                seq_id: 'chr3',
                                start: 10188198,
                                strand: '+',
                                transcript_id: 'ENST00000256474.2'
                            },
                            {
                                end: 10188320,
                                feature_type: 'CDS',
                                seq_id: 'chr3',
                                start: 10188198,
                                strand: '+',
                                transcript_id: 'ENST00000256474.2'
                            },
                            {
                                end: 10193904,
                                feature_type: 'exon',
                                seq_id: 'chr3',
                                start: 10191471,
                                strand: '+',
                                transcript_id: 'ENST00000256474.2'
                            },
                            {
                                end: 10191649,
                                feature_type: 'CDS',
                                seq_id: 'chr3',
                                start: 10191471,
                                strand: '+',
                                transcript_id: 'ENST00000256474.2'
                            },
                            {
                                end: 10191649,
                                feature_type: 'stop_codon',
                                seq_id: 'chr3',
                                start: 10191647,
                                strand: '+',
                                transcript_id: 'ENST00000256474.2'
                            },
                            {
                                end: 10183532,
                                feature_type: 'UTR',
                                seq_id: 'chr3',
                                start: 10182692,
                                strand: '+',
                                transcript_id: 'ENST00000256474.2'
                            },
                            {
                                end: 10193904,
                                feature_type: 'UTR',
                                seq_id: 'chr3',
                                start: 10191649,
                                strand: '+',
                                transcript_id: 'ENST00000256474.2'
                            }
                        ],
                        feature_type: 'transcript',
                        isCanonical: true,
                        seq_id: 'chr3',
                        start: 10182692,
                        strand: '+',
                        transcript_id: 'ENST00000256474.2',
                        transcript_type: 'protein_coding',
                        xref: 'NM_000551'
                    }
                } else if (gene === 'MITD1') {
                    return {
                        end: 99785726,
                        features: [
                            {
                                end: 99797521,
                                feature_type: 'exon',
                                seq_id: 'chr2',
                                start: 99797294,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99797444,
                                feature_type: 'CDS',
                                seq_id: 'chr2',
                                start: 99797294,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99797444,
                                feature_type: "start_codon",
                                seq_id: 'chr2',
                                start: 99797442,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99790479,
                                feature_type: 'exon',
                                seq_id: 'chr2',
                                start: 99790378,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99790479,
                                feature_type: 'CDS',
                                seq_id: 'chr2',
                                start: 99790378,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99788109,
                                feature_type: 'exon',
                                seq_id: 'chr2',
                                start: 99787973,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99788109,
                                feature_type: 'CDS',
                                seq_id: 'chr2',
                                start: 99787973,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99787892,
                                feature_type: 'exon',
                                seq_id: 'chr2',
                                start: 99787806,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99787892,
                                feature_type: 'CDS',
                                seq_id: 'chr2',
                                start: 99787806,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99787115,
                                feature_type: 'exon',
                                seq_id: 'chr2',
                                start: 99787000,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99787115,
                                feature_type: 'CDS',
                                seq_id: 'chr2',
                                start: 99787000,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99786073,
                                feature_type: 'exon',
                                seq_id: 'chr2',
                                start: 99786013,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99786073,
                                feature_type: 'CDS',
                                seq_id: 'chr2',
                                start: 99786013,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99785933,
                                feature_type: 'exon',
                                seq_id: 'chr2',
                                start: 99785726,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99785933,
                                feature_type: 'CDS',
                                seq_id: 'chr2',
                                start: 99785838,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99785840,
                                feature_type: 'stop_codon',
                                seq_id: 'chr2',
                                start: 99785838,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99785838,
                                feature_type: 'UTR',
                                seq_id: 'chr2',
                                start: 99785726,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            },
                            {
                                end: 99797521,
                                feature_type: 'UTR',
                                seq_id: 'chr2',
                                start: 99797444,
                                strand: '-',
                                transcript_id: "ENST00000289359.2"
                            }
                        ],
                        feature_type: 'transcript',
                        isCanonical: true,
                        seq_id: 'chr2',
                        start: 99797521,
                        strand: '-',
                        transcript_id: "ENST00000289359.2",
                        transcript_type: 'protein_coding',
                        xref: "NM_138798"
                    }
                } else if (gene === 'CCNE1') {
                    // TODO: update this if put gene viz back in
                    return {
                        end: 30315215,
                        features: [],
                        feature_type: 'transcript',
                        isCanonical: true,
                        seq_id: 'chr19',
                        start: 30302805,
                        strand: '+',
                        transcript_id: 'ENST00000256474.2',
                        transcript_type: 'protein_coding',
                        xref: 'NM_000551'
                    }
                }
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