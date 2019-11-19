<template>
    <v-card class="my-1 mx-1">
        <v-card-title style="font-family: Raleway; color: #888888; padding-bottom: 5px">
            TIMELINE
        </v-card-title>
        <v-card-text>
            <v-timeline>
                <v-timeline-item
                        v-for="item in timelineItems"
                        :key="item.title"
                        color="primaryDark"
                        small
                >
                    <template v-slot:opposite>
                        <span class="timeline-card-date">{{item.date}}</span>
                    </template>
                    <v-card>
                        <v-card-text>
                            <div :class="{alignRight: isOdd(item.index), 'timeline-card-title': true}">
                                <span :style="{fontSize: '18px'}">{{item.title}}</span>
                            </div>
                            <div :class="{alignRight: isOdd(item.index)}">
                                <div>{{item.notes}}</div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>
    </v-card>
</template>

<script>
    export default {
        name: "PatientTimeline",
        components: {},
        data: () => {
            return {
                timelineItems: [
                    { index: 0, title: 'Initial Diagnosis', date: 'Day 0', notes: 'Diagnosed at HCI by Dr. Joe Smith'},
                    { index: 1, title: 'Surgery', date: 'Day 32', notes: 'Double mastectomy performed at HCI'},
                    { index: 2, title: 'Treatment I', date: 'Day 45', notes: 'Paclitaxel administered at HCI'},
                    { index: 3, title: 'Treatment II', date: 'Day 75', notes: 'Paclitaxel administered at HCI'},
                    { index: 4, title: 'Treatment III', date: 'Day 105', notes: 'Paclitaxel administered at HCI'},
                    { index: 5, title: 'Screening', date: 'Day 105', notes: 'No detectable signs of cancer'},
                    { index: 6, title: 'Relapse', date: 'Day 224', notes: 'Cancer detected in left lymph node'}
                ]
            }
        },
        methods: {
            isOdd: (index) => {
                return (index % 2 !== 0);
            }
        }
    }
</script>

<style scoped lang="sass">
    .alignRight
        text-align: right
        padding-right: 10px
    .timeline-card-title
        color: #194d81
        margin: -16px -16px 10px -16px
        background-color: #e9eaec
        height: 35px
        padding-top: 8px
        padding-left: 10px
    .timeline-card-date
        font-weight: 500
        font-size: 22px
        font-family: Quicksand
        color: #194d81
</style>