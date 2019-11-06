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
                    <DrugScores
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
            >
                <v-list-item>
                    <v-list-item-avatar>
                        <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title>John Leider</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list dense>

                </v-list>
            </v-navigation-drawer>
        </v-sheet>
    </div>
</template>

<script>
    import PatientMetaData from './PatientMetaData.vue'
    import PatientTimeline from './PatientTimeline.vue'
    import DrugScores from './DrugScores.vue'

    export default {
        name: "Home.vue",
        components: {
            PatientMetaData,
            PatientTimeline,
            DrugScores
        },
        data: () => {
            return {
                FILENAME: 'http://localhost:8000/tow19example.tsv',
                DRUGS: ['Everolimus', 'Bevacizumab', 'Trastuzumab', 'Palbociclib', 'Ribociclib', 'Olaparib', 'Neratinib', 'Pertuzumab'],
                displayEvidenceDrawer: true,
                screenWidth: window.innerWidth,
                screenHeight: window.innerHeight,
                displayDrawerWidth: 0
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
              console.log('message rcvd' + drug);
              // TODO: what to do with this
          }
        },
        computed: {}
    }
</script>

<style scoped>

</style>