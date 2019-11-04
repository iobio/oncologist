<template>
    <div id="patient-history-card">
        <v-card>
            <v-card-title>Patient History</v-card-title>
                <v-card-text>
                    <v-layout>
                        <v-flex xs4>
                            <v-layout class="pt-hx-row">
                                <v-flex xs4>
                                    <span class="pt-hx-label">Patient ID:</span>
                                </v-flex>
                                <v-flex xs8>
                                    <span class="pt-hx-value">TOW19</span>
                                </v-flex>
                            </v-layout>
                            <v-layout class="pt-hx-row">
                                <v-flex xs4>
                                    <span class="pt-hx-label">Date of Birth:</span>
                                </v-flex>
                                <v-flex xs8>
                                    <span class="pt-hx-value">05/05/1955</span>
                                </v-flex>
                            </v-layout>
                            <v-layout class="pt-hx-row">
                                <v-flex xs4>
                                    <span class="pt-hx-label">Sex:</span>
                                </v-flex>
                                <v-flex xs8>
                                    <span class="pt-hx-value">Female</span>
                                </v-flex>
                            </v-layout>
                            <v-layout class="pt-hx-row">
                                <v-flex xs4>
                                    <span class="pt-hx-label">Cancer Type:</span>
                                </v-flex>
                                <v-flex xs8>
                                    <span class="pt-hx-value">Breast</span>
                                </v-flex>
                            </v-layout>
                            <v-layout class="pt-hx-row">
                                <v-flex xs4>
                                    <span class="pt-hx-label">Sub-Type:</span>
                                </v-flex>
                                <v-flex xs8>
                                    <span class="pt-hx-value">HER2+</span>
                                </v-flex>
                            </v-layout>
                            <v-layout class="pt-hx-row">
                                <v-flex xs4>
                                    <span class="pt-hx-label">Primary Location:</span>
                                </v-flex>
                                <v-flex xs8>
                                    <span class="pt-hx-value">Left breast</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs8>
                            <v-timeline>
                                <v-timeline-item
                                        v-for="n in 3"
                                        :key="n"
                                        color="primary"
                                        small
                                >
                                    <template v-slot:opposite>
                                        <span>Tus eu perfecto</span>
                                    </template>
                                    <div class="py-4">
                                        <h3 :class="`font-weight-light mb-4`"></h3>
                                        <div>
                                            Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
                                        </div>
                                    </div>
                                </v-timeline-item>
                            </v-timeline>
                        </v-flex>
                    </v-layout>
                </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "PatientHistory.vue"
    }
</script>

<style scoped lang="sass">
    #patient-history-card
        font-family: Raleway

    .pt-hx-label
        font-family: Raleway

    .pt-hx-value
        font-size: 18px

    .pt-hx-row
        padding-top: 5px
        padding-bottom: 5px
</style>