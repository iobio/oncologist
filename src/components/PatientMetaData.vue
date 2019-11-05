<template>
    <div id="patient-data-card" class="my-1 ml-1">
        <v-card height="180" style="font-family: Raleway; color: #888888">
            <v-card-title>PATIENT INFORMATION</v-card-title>
                <v-card-text>
                    <v-layout class="pt-hx-row">
                        <v-flex xs4>
                            <span class="pt-hx-label">Patient ID:</span>
                        </v-flex>
                        <v-flex xs8>
                            <span class="pt-hx-value">TOW19</span>
                        </v-flex>
                        <v-flex xs4>
                            <span class="pt-hx-label">Cancer Type:</span>
                        </v-flex>
                        <v-flex xs8>
                            <span class="pt-hx-value">Breast</span>
                        </v-flex>
                    </v-layout>
                    <v-layout class="pt-hx-row">
                        <v-flex xs2>
                            <span class="pt-hx-label">Date of Birth:</span>
                        </v-flex>
                        <v-flex xs4>
                            <span class="pt-hx-value">xx/xx/1955</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-label">Sub-Type:</span>
                        </v-flex>
                        <v-flex xs4>
                            <span class="pt-hx-value">Triple Negative</span>
                        </v-flex>
                    </v-layout>
                    <v-layout class="pt-hx-row">
                        <v-flex xs2>
                            <span class="pt-hx-label">Sex:</span>
                        </v-flex>
                        <v-flex xs4>
                            <span class="pt-hx-value">Female</span>
                        </v-flex>
                        <v-flex xs2>
                            <span class="pt-hx-label">Primary Location:</span>
                        </v-flex>
                        <v-flex xs4>
                            <span class="pt-hx-value">Left breast</span>
                        </v-flex>
                    </v-layout>
                </v-card-text>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "PatientMetaData.vue",
        components: {},
        props: {},
        data: () => {
            return {}
        },
        methods: {
        }
    }
</script>

<style scoped lang="sass">
    #patient-history-card
        font-family: Raleway

    .pt-hx-value
        font-size: 18px

    .pt-hx-row
        padding-bottom: 5px


</style>