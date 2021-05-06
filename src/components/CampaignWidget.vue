<template>
  <div class="col mb-3">
    <div class="card card-cover h-100 overflow-hidden shadow-lg">
      <div class="d-flex flex-column h-100 pt-3 pb-3 text-shadow-1">
        <div class="container-fluid">
          <div class="row justify-content-end mb-3">
            <span v-if="inProgress" class="col-4 badge bg-info text-dark">In progress</span>
            <span v-else-if="finished && succeed" class="col-4 badge bg-success">Succeed</span>
            <span v-else-if="finished && !succeed" class="col-4 badge bg-danger">Failed</span>
            <span v-else class="col-4 badge bg-info text-dark">Not started</span>
          </div>
          <div class="row">
            <router-link :to="{name: 'Campaign', params: {id: campaign.id}}">
              <h2 class="fs-2 text-dark mb-3 display-6 lh-1 fw-bold">Campaign {{campaign.id}}</h2>
            </router-link>
          </div>
          <div v-if="!finished" class="row">
            <div class="col">
              <span v-if="inProgress" class="fw-bold">Ends in</span>
              <span v-else class="fw-bold">Starts in</span>
            </div>
          </div>
          <div v-if="!finished" class="row text-dark text-center">
            <div class="col countdown-section"><span>{{days}}</span>days</div>
            <div class="col countdown-section"><span>{{hours}}</span>Hours</div>
            <div class="col countdown-section"><span>{{minutes}}</span>Minutes</div>
            <div class="col countdown-section"><span>{{seconds}}</span>Seconds</div>
          </div>
          <div class="row">
            <div class="col">
              <div class="progress">
                <div class="progress-bar" role="progressbar" v-bind:style="{width: fundedPercentage + '%'}"  v-bind:aria-valuenow="fundedPercentage" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <p class="text-dark">{{fundedEthers}}/{{ targetEthers }}</p>
            </div>
            <div class="col">
              <p class="text-dark text-end">{{fundedPercentage}}%</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, PropType, ref, watch} from 'vue'
import {CampaignData} from "@/store/modules/campaigns"
import moment from "moment"
import {ethers} from "ethers";

export default defineComponent({
  name: "CampaignWidget",
  props: {
    campaign: {
      type: Object as PropType<CampaignData>,
      required: true
    }
  },
  setup(props) {
    const targetEthers = computed(() => {
      return ethers.utils.formatEther(props.campaign.target)
    })
    const fundedEthers = computed(() => {
      return ethers.utils.formatEther(props.campaign.funded)
    })
    const fundedPercentage = computed(() => {
      return props.campaign.funded.div(props.campaign.target.div(100)).toNumber()
    })

    let days = ref(0), hours = ref(0), minutes = ref(0), seconds = ref(0)
    setInterval(() => {
      const now = moment().unix()
      let campaignDatesDiff
      if (now <= props.campaign.startedAt.unix()){
        campaignDatesDiff = props.campaign.startedAt.diff(moment())
      } else {
        campaignDatesDiff = props.campaign.finishedAt.diff(moment())
      }
      let duration
      if (campaignDatesDiff > 0) {
        duration = moment.duration(campaignDatesDiff)
      } else {
        duration = moment.duration(0)
      }
      days.value = duration.days()
      hours.value = duration.hours()
      minutes.value = duration.minutes()
      seconds.value = duration.seconds()

    }, 1000)

    const inProgress = computed(() => {
      const now = moment().unix()
      return now > props.campaign.startedAt.unix() && now < props.campaign.finishedAt.unix()
    })

    const finished = computed(() => {
      const now = moment().unix()
      return now >= props.campaign.finishedAt.unix()
    })

    const succeed = computed(() => {
      return props.campaign.target.lte(props.campaign.funded)
    })


    return {
      targetEthers,
      fundedEthers,
      fundedPercentage,

      days,
      hours,
      minutes,
      seconds,

      inProgress,
      finished,
      succeed
    }
  }
})
</script>

<style scoped>

</style>