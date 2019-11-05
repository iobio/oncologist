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
                self.heatmap = new drugHeatmap(self.divId, self.drugList, self.fileName);
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