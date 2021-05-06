<template>
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
          <span class="text-success fs-3 display-6 lh-1 fw-bold">Raised {{fundedEthers}} ETH</span>
        </div>
        <div class="row mb-3"><div class="col"><span>Target is {{targetEthers}} ETH</span></div></div>
        <div class="row">
          <div class="col">
            <span class="fw-bold">Participants</span>
          </div>
        </div>
        <div class="row">
          <div class="col"><span class="fs-1">{{numberOfParticipants}}</span></div>
        </div>
        <div class="row">
          <div class="col">
            <span class="fw-bold">Ends in</span>
          </div>
        </div>
        <div class="row text-dark text-center">
          <div class="col-3 countdown-section"><span>{{days}}</span>days</div>
          <div class="col-3 countdown-section"><span>{{hours}}</span>Hours</div>
          <div class="col-3 countdown-section"><span>{{ minutes }}</span>Minutes</div>
          <div class="col-3 countdown-section"><span>{{ seconds }}</span>Seconds</div>
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
            <p>{{fundedEthers}}/{{ targetEthers }}</p>
          </div>
          <div class="col">
            <p class="text-end">{{fundedPercentage}}%</p>
          </div>
        </div>
        <div class="row"><div class="col text-end"><span class="fs-6">Your fundings were: {{ transactionSum }}</span></div></div>
        <div v-if="finished" class="row"><div class="col text-end"><span class="fs-6">Available to withdraw: {{ toWithdraw }}</span></div></div>
        <div v-if="showWithdrawButton" class="row">
          <div class="col">
            <div class="d-grid gap-2">
              <button @click="handleWithdraw" type="button" class="btn btn-success">Withdraw {{toWithdraw}} ETH</button>
            </div>
          </div>
        </div>
        <FundForm v-if="inProgress"></FundForm>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, PropType, ref} from "vue";
import FundForm from "./FundForm.vue";
import campaigns, {CampaignData} from "@/store/modules/campaigns";
import {BigNumber, ethers} from "ethers";
import moment from "moment";
import {useStore} from "vuex";
import {RootState} from "@/store";
import {Web3Provider} from "@ethersproject/providers";
import Funding from "@/api/funding";
import {formatEther, getAddress} from "ethers/lib/utils";
import account from "@/store/modules/account";

export default defineComponent ({
  name: "CampaignSummary",
  props: {
    campaign: {
      type: Object as PropType<CampaignData>,
      required: true
    }
  },
  components: {
    FundForm
  },
  setup(props) {
    const store = useStore<RootState>()
    onMounted(() => {
      store.dispatch('account/fetchFundingBalance', props.campaign.id)
      store.dispatch('campaigns/fetchFundingTransactionsByCampaignId', props.campaign.id)
    })

    //setup timer
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

    const targetEthers = computed(() => {
      return ethers.utils.formatEther(props.campaign.target)
    })
    const fundedEthers = computed(() => {
      return ethers.utils.formatEther(props.campaign.funded)
    })
    const fundedPercentage = computed(() => {
      return props.campaign.funded.div(props.campaign.target.div(100)).toNumber()
    })
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
    const accountAddress = computed(() => {
      return store.getters['account/address']
    })
    const numberOfParticipants = computed(() => {
      return store.getters['campaigns/numberOfUniqueParticipants'](props.campaign.id)
    })
    const showWithdrawButton = computed(() => {
      return (isOwner(accountAddress.value) && succeed.value && finished.value && !props.campaign.collectedByOwner) || ((!succeed.value && finished.value) && store.getters["account/fundingBalance"](props.campaign.id).gt(0))
    })
    const transactionSum = computed(() => {
      const sum = store.getters['campaigns/transactionSum'](props.campaign.id, store.getters['account/address'])
      return ethers.utils.formatEther(sum)
    })
    const toWithdraw = computed(() => {
      if (!finished.value){
        return '0.0'
      }

      if (isOwner(accountAddress.value)) {
        if (succeed.value && !props.campaign.collectedByOwner) {
          return formatEther(props.campaign.funded)
        } else {
          return '0.0'
        }
      } else {
        const balance =  store.getters["account/fundingBalance"](props.campaign.id)
        if (balance.gte(0)) {
          if (!succeed.value) {
            return formatEther(balance)
          } else {
            return '0.0'
          }
        } else {
          return '-'
        }
      }

    })

    function isOwner(address: string): boolean {
      return getAddress(props.campaign.owner) === getAddress(address)
    }

    async function handleWithdraw() {
      const response = await Funding.withdraw(
          new Web3Provider((<any>window).ethereum),
          BigNumber.from(props.campaign.id)
      )
      console.log(response)
    }



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
      succeed,

      accountAddress,
      showWithdrawButton,
      toWithdraw,
      numberOfParticipants,
      transactionSum,

      handleWithdraw
    }
  }
})
</script>

<style scoped>

</style>