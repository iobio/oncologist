<template>
    <v-card class="my-1 ml-1">
        <v-card-title style="font-family: Raleway; color: #888888">
            DRUG SCORES
        </v-card-title>
        <v-card-text>
            <div :id="divId"></div>
        </v-card-text>
    </v-card>
</template>

<script>
    import d3 from '@/assets/d3';
    import drugHeatmap from '../d3/DrugHeatmap.d3.js'
    export default {
        name: "DrugScores.vue",
        props: {
            fileName: {
                type: String,
                default: null
            },
            drugList: {
                type: Array,
                default: null
            }
        },
        data: () => {
            return {
                divId: 'drug-map',
                heatmap: null
            }
        },
        methods: {
            drawHeatmap: function() {
                const self = this;
                const evidenceTypes = ["Drug Screen Evidence", "Genomic Evidence", "Expression Evidence"];
                const largeBlockSize = 8;
                const cardWidth = 800;
                const cardHeight = 450;
                const colors = ['#b2182b','#ef8a62','#fddbc7','#f7f7f7','#d1e5f0','#67a9cf','#2166ac'];
                const colShift = false;
                self.heatmap = new drugHeatmap(d3, self.divId, self.drugList, evidenceTypes, self.fileName, largeBlockSize, cardHeight, cardWidth, colors, colShift)
                    .on('drugClick', function(drug) { self.$emit('drugClick', drug); })
            }
        },
        mounted: function() {
            this.drawHeatmap();
        }
    }
</script>

<style scoped>
    rect.bordered {
        stroke: #E6E6E6;
        stroke-width:2px;
    }

    text.mono {
        font-size: 9pt;
        font-family: Raleway;
        fill: #888;
    }

    text.axis-drugs {
        fill: #000;
    }

    text.axis-evid {
        fill: #000;
    }
</style>