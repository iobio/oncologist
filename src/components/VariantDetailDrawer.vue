<template>
    <v-card class="detail-card" style="overflow-y: scroll; padding-bottom: 50px">
        <v-card-title style="padding-left: 20px; padding-top: 20px">
            <span class="card-title">{{drug.toUpperCase() + ':'}}</span>
            <span class="sub-title">{{variant ? variant.gene : ''}}</span>
            <span class="super-title">{{variant ? variant.type : ''}}</span>
        </v-card-title>
        <v-card-text>
            <v-card class="detail-card mb-1">
                <v-card-title class="sub-card-title">Gene Details</v-card-title>
                <v-card-text>
                    <v-container fluid style="margin-top: -35px; padding-bottom: 0">
                        <v-row style="margin-top: -35px">
                            <v-col class="d-flex" cols="12" sm="9">
                                <!--spacer-->
                            </v-col>
                            <v-col class="d-flex" cols="12" sm="3">
                                <v-select
                                        :items="geneSourceList"
                                        label="Source"
                                        placeholder="Gene Cards"
                                        outlined>
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-row style="margin-top: -40px">
                        <div class="gene-summary-title">
                            {{geneSummary.title}}
                        </div>
                        <div class="gene-summary-body">
                            {{geneSummary.body}}
                        </div>
                    </v-row>
                </v-card-text>
            </v-card>
            <v-card class="detail-card mb-1">
                <v-card-title>
                    <v-container fluid style="padding-top: 0">
                        <v-row>
                            <v-col class="d-flex sub-card-title" sm="5" style="padding-left:0; padding-top: 0">
                                Variant Details
                            </v-col>
                            <v-col class="d-flex" style="margin-top: 5px; padding-top: 0" sm="5">
                                {{variantLocation}}
                            </v-col>
                            <v-col class="d-flex" style="margin-top: 5px; font-size: 18px; padding-top: 0" sm="2">
                                <a href="http://oncogene.iobio.io" target="_blank">Launch Oncogene<i
                                        class="material-icons"
                                        style="font-size: 14px; padding-left: 2px;">open_in_new</i></a>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-title>
                <v-card-text>
                    <div :id="varVizId"></div>
                    <div :id="geneVizId"></div>
                    <v-layout class="pt-hx-row" style="padding-top: 10px;">
                        <v-flex xs2>
                            <span class="pt-hx-label">Type:</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-value">3' UTR</span>
                        </v-flex>
                        <v-flex xs4>
                            <span class="var-col-hdr">Tumor Sample</span>
                        </v-flex>
                        <v-flex xs4>
                            <span class="var-col-hdr">Normal Sample</span>
                        </v-flex>
                    </v-layout>
                    <v-layout class="pt-hx-row">
                        <v-flex xs2>
                            <span class="pt-hx-label">Is Somatic:</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-value">True</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-label">Ref Reads Count:</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-value">47</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-label">Ref Reads Count:</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-value">49</span>
                        </v-flex>
                    </v-layout>
                    <v-layout class="pt-hx-row">
                        <v-flex xs2>
                            <span class="pt-hx-label">Is Clonal:</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-value">True</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-label">Alt Reads Count:</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-value">32</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-label">Alt Reads Count:</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-value">0</span>
                        </v-flex>
                    </v-layout>
                    <v-layout class="pt-hx-row">
                        <v-flex xs2>
                            <span class="pt-hx-label">In COSMIC:</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-value">No</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-label">Variant Allele Freq:</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-value">0.40</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-label">Variant Allele Freq:</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-value">0</span>
                        </v-flex>
                    </v-layout>
                    <v-layout class="pt-hx-row">
                        <v-flex xs2>
                            <span class="pt-hx-label">In ClinVar:</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-value">No</span>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
            <v-card class="detail-card mb-1">
                <v-card-title class="sub-card-title">Gene-Drug Interactions</v-card-title>
                <v-card-text>
                    <v-data-table
                            :headers="headers"
                            :items="interactions"
                            hide-default-footer
                            class="elevation-1"
                    >
                        <template v-slot:item.pmid="{ item }">
                            <a :href="getLink(item.pmid)" target="_blank">{{ 'pmid: ' + item.pmid }}</a>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-card-text>
    </v-card>
</template>

<script>
    import d3 from '@/assets/d3';
    import variantViz from '../d3/Variant.d3.js'
    import geneViz from '../d3/Gene.d3.js'

    export default {
        name: "VariantDetailDrawer",
        props: {
            variant: {
                type: Object,
                default: null
            },
            drug: {
                type: String,
                default: ''
            }
        },
        data: () => {
            return {
                geneSourceList: ['GeneCards'],
                variantTrack: null,
                varVizId: 'variant-viz',
                geneTrack: null,
                geneVizId: 'gene-viz',
                variantData: [
                    {
                        features: [
                            {
                                start: 0,
                                end: 0,
                                type: 'SNP',
                                id: 'snp_1',
                                level: 1
                            }
                        ]
                    }
                ],
                headers: [
                    { text: 'Type', value: 'type' },
                    { text: 'Source', value: 'source' },
                    { text: 'Link', value: 'pmid' },
                ],
                interactions: [
                    {
                        type: 'Supportive',
                        source: 'DGIdb:CKB, DGIdb:CIViC',
                        pmid: 26951305
                    },
                ]
            }
        },
        computed: {
            geneSummary: function () {
                // TODO: actually do backend service call here
                if (this.variant == null) {
                    return '';
                }

                if (this.variant.gene === 'VHL') {
                    return {
                        title: 'VHL: Von Hippel-Lindau Tumor Suppressor',
                        body: 'VHL (Von Hippel-Lindau Tumor Suppressor) is a Protein Coding gene. ' +
                        'Diseases associated with VHL include Von Hippel-Lindau Syndrome and Erythrocytosis,' +
                        ' Familial, 2. Among its related pathways are Cellular Senescence (REACTOME) and Amplification' +
                        ' and Expansion of Oncogenic Pathways as Metastatic Traits. Gene Ontology (GO) annotations' +
                        ' related to this gene include enzyme binding and ubiquitin-protein transferase activity. ' +
                        'An important paralog of this gene is VHLL.'
                    };
                } else if (this.variant.gene === 'MITD1') {
                    return {
                        title: 'MITD1: Microtubule Interacting And Trafficking Domain Containing 1',
                        body: 'MITD1 (Microtubule Interacting And Trafficking Domain Containing 1) ' +
                        'is a Protein Coding gene. Diseases associated with MITD1 include Lipoyltransferase ' +
                        '1 Deficiency. Gene Ontology (GO) annotations related to this gene include ' +
                        'protein homodimerization activity and phosphatidylinositol binding.'
                    };
                } else {
                    return 'Could not retrieve gene summary.';
                }
            },
            variantLocation() {
                if (this.variant == null) {
                    return '';
                } else {
                    return 'chr' + this.variant.chrom + ':' + this.variant.features[0].start + '-' + this.variant.features[0].end
                        + ' ' + this.variant.ref + '->' + this.variant.alt;
                }
            }
        },
        methods: {
            drawViz: function () {

                // Draw variant viz
                let selection = d3.select('#' + this.varVizId).datum([this.variant]);
                this.variantTrack = new variantViz(d3, this.varVizId, selection);

                // Draw gene viz
                selection = d3.select('#' + this.geneVizId).datum([this.gene]);
                this.geneTrack = new geneViz(d3, this.geneVizId, selection);
            },
            getLink: function(pmid) {
                return 'https://www.ncbi.nlm.nih.gov/pubmed/?term=' + pmid;
            }
        },
        watch: {
            variant: function () {
                if (this.variant != null) {
                    this.drawViz();
                }
            }
        }
    }
</script>

<style scoped lang="sass">
    .detail-card
        font-family: Quicksand
        color: #888
        .card-title
            font-size: 32px
            font-weight: 400
            margin-top: 5px
            color: #2166ac
        .sub-title
            font-size: 42px
            font-weight: 400
        .super-title
            font-size: 20px
            padding-bottom: 10px
        .sub-card-title
            font-size: 30px
        .gene-summary-title
            font-size: 24px
            padding-left: 16px
            padding-right: 16px
            padding-bottom: 10px
        .gene-summary-body
            font-size: 16px
            padding-left: 16px
            padding-right: 16px

    .pt-hx-value
        font-size: 18px
        text-align: left
    .pt-hx-row
        padding-bottom: 5px
        padding-left: 10px
        font-size: 16px
        text-align: justify
    .var-col-hdr
        font-weight: bold
        text-decoration: underline
        text-align: left
</style>