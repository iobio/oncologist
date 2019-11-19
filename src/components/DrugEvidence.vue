<template>
    <v-card class="mb-1" style="padding-bottom: 5px;">
        <v-card-title class="card-title">
            Drug Screening
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
        name: "DrugEvidence",
        props: {
            fileName: {
                type: String,
                default: null
            },
            pdxIds: {
                type: Array,
                default: null
            }
        },
        data: () => {
            return {
                divId: 'screen-map',
                heatmap: null
            }
        },
        methods: {
            drawHeatmap: function() {
                const self = this;
                const concentrations = ['50', '10', '2', '0.4', '0.08', '0.016', '0.0032', '0.00016', '0'];
                const smallBlockSize = 16;
                const cardWidth = 750;  // TODO: make this scale accordingly
                const cardHeight = 600;
                const colors = ['#b2182b','#d6604d','#f4a582','#fddbc7','#f7f7f7','#d1e5f0','#92c5de','#4393c3','#2166ac'];
                const colShift = true;
                self.heatmap = new drugHeatmap(d3, self.divId, self.pdxIds, concentrations, self.fileName, smallBlockSize, cardHeight, cardWidth, colors, colShift);
            }
        },
        mounted: function() {
            this.drawHeatmap();
        }
    }
</script>

<style scoped lang="sass">
    .card-title
        font-family: Raleway
        color: #888
        padding-bottom: 5px
</style>