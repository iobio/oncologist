<template>
    <div>
        <v-sheet
                :height="screenHeight"
                class="overflow-hidden"
                style="position: relative;"
        >
            <!--Static main page-->
            <v-layout>
                <v-flex xs7>
                    <PatientMetaData/>
                    <DrugScores style="overflow-x: scroll"
                            :fileName="FILENAME"
                            :drugList="DRUGS"
                            @drugClick="onDrugClick">
                    </DrugScores>
                </v-flex>
                <v-flex xs5>
                    <PatientTimeline/>
                </v-flex>
            </v-layout>

            <!--Dynamic drawer-->
            <v-navigation-drawer
                    v-model="displayEvidenceDrawer"
                    absolute
                    temporary
                    right
                    :width="overlayWidth"
            >
                <EvidencePanel
                    :drug="selectedDrug"
                    :cardWidth="overlayWidth">
                </EvidencePanel>
            </v-navigation-drawer>
        </v-sheet>
    </div>
</template>

<script>
    import PatientMetaData from './PatientMetaData.vue'
    import PatientTimeline from './PatientTimeline.vue'
    import DrugScores from './DrugScores.vue'
    import EvidencePanel from './EvidencePanel.vue'

    export default {
        name: "Home.vue",
        components: {
            PatientMetaData,
            PatientTimeline,
            DrugScores,
            EvidencePanel
        },
        data: () => {
            return {
                FILENAME: 'http://localhost:8000/tow19example.tsv',
                DRUGS: ['Everolimus', 'Bevacizumab', 'Trastuzumab', 'Palbociclib', 'Ribociclib', 'Olaparib', 'Neratinib', 'Pertuzumab'],
                displayEvidenceDrawer: false,
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
                displayDrawerWidth: 0,
                selectedDrug: ''
            };
        },
        watch: {
            displayEvidenceDrawer: function () {
                if (this.displayEvidenceDrawer) {
                    this.displayDrawerWidth = window.innerWidth * 0.75;
                } else {
                    this.displayDrawerWidth = 0;
                }
            }
        },
        methods: {
          onDrugClick: function(drug) {
              this.displayEvidenceDrawer = true;
              this.selectedDrug = drug;
          }
        },
        computed: {
            overlayWidth: function() {
                return this.screenWidth * 0.8;
            }
        }
    }
</script>

<style scoped>

</style>