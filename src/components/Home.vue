<template>
    <div>
        <v-sheet
                :height="screenHeight"
                class="overflow-auto"
                style="position: relative;"
        >
            <!--Static main page-->
            <v-layout>
                <v-flex xs8>
                    <PatientMetaData/>
                    <DrugScores style="overflow-x: scroll"
                            :fileName="SCORE_FILE"
                            :drugList="DRUGS"
                            @drugClick="onDrugClick">
                    </DrugScores>
                </v-flex>
                <v-flex xs4>
                    <PatientTimeline/>
                </v-flex>
            </v-layout>

            <!--Dynamic drawer-->
            <v-navigation-drawer
                    v-model="displayEvidenceDrawer"
                    app
                    temporary
                    right
                    :width="overlayWidth"
            >
                <EvidenceDrawer
                    :drug="selectedDrug"
                    :screenWidth="screenWidth"
                    :screenHeight="screenHeight"
                    :screenFile="SCREEN_FILE"
                    :pdxIds="PDX_IDS">
                </EvidenceDrawer>
            </v-navigation-drawer>
        </v-sheet>
    </div>
</template>

<script>
    import PatientMetaData from './PatientMetaData.vue'
    import PatientTimeline from './PatientTimeline.vue'
    import DrugScores from './DrugScores.vue'
    import EvidenceDrawer from './EvidenceDrawer.vue'

    export default {
        name: "Home.vue",
        components: {
            PatientMetaData,
            PatientTimeline,
            DrugScores,
            EvidenceDrawer
        },
        data: () => {
            return {
                SCORE_FILE: 'http://localhost:8000/tow19example.tsv',
                SCREEN_FILE: 'http://localhost:8000/drugScreenExample.tsv',
                DRUGS: ['Everolimus', 'Bevacizumab', 'Trastuzumab', 'Palbociclib', 'Ribociclib', 'Olaparib', 'Neratinib', 'Pertuzumab'],
                PDX_IDS: ['BCM5471', 'BCM4888', 'HCI-032', 'HCI-005', 'TOW19', 'HCI-019', 'HCI-003', 'HCI-012', 'HCI-016', 'HCI-001', 'TOW26', 'HCI-017', 'HCI-023', 'HCI-027', 'HCI-002', 'HCI-025', 'HCI-010', 'HCI-011', 'HCI-015'],
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