<template>
  <div class="col mb-3">
    <div class="card card-cover h-100 overflow-hidden shadow-lg">
      <div class="d-flex flex-column h-100 pt-3 pb-3 text-shadow-1">
        <div class="container-fluid">
          <div class="row justify-content-end mb-3">
            <span class="col-4 badge bg-info text-dark">In progress</span>
          </div>
          <div class="row">
            <h2 class="fs-2 text-dark mb-3 display-6 lh-1 fw-bold">Campaign {{campaign.id}}</h2>
          </div>
          <div class="row">
            <div class="col">
              <span class="fw-bold">Ends in</span>
            </div>
          </div>
          <div class="row text-dark text-center">
            <div class="col countdown-section"><span>{{timeLeft.days()}}</span>days</div>
            <div class="col countdown-section"><span>{{timeLeft.hours()}}</span>Hours</div>
            <div class="col countdown-section"><span>{{timeLeft.minutes()}}</span>Minutes</div>
            <div class="col countdown-section"><span>{{timeLeft.seconds()}}</span>Seconds</div>
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
import {defineComponent, computed, PropType} from 'vue'
import {CampaignData} from "@/store/modules/campaigns"
import moment from "moment"
import {ethers, BigNumber} from "ethers";

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
    const timeLeft = computed(() => {
      const campaignDatesDiff = props.campaign.startedAt.diff(props.campaign.finishedAt)
      if (campaignDatesDiff > 0) {
        return moment.duration(campaignDatesDiff)
      } else {
        return moment.duration(0)
      }
    })

    return {
      targetEthers,
      fundedEthers,
      fundedPercentage,
      timeLeft
    }
  }
})
</script>

<style scoped>

</style>