<template>
  <div class="container" id="custom-cards">
    <div class="row justify-content-center">
      <div class="col-6">
        <h2 class="mt-5 pb-2">Create campaign</h2>
        <form @submit.prevent="handleCreateCampaign">
          <div class="mb-3">
            <label for="ownerAddress" class="form-label">Owner address</label>
            <input v-model="owner" type="text" class="form-control" id="ownerAddress">
          </div>
          <div class="mb-3">
            <label for="campaignTarget" class="form-label">Target</label>
            <input v-model="target" type="text" class="form-control" id="campaignTarget">
          </div>
          <div class="mb-3">
            <label for="startedAt" class="form-label">StartedAt</label>
            <input v-model="startDate" type="datetime-local" class="form-control" id="startedAt">
          </div>
          <div class="mb-3">
            <label for="finishedAt" class="form-label">FinishedAt</label>
            <input v-model="finishDate" type="datetime-local" class="form-control" id="finishedAt">
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import {defineComponent, ref} from "vue";
import Funding from "../api/funding";
import { Web3Provider } from '@ethersproject/providers';
import moment from "moment";
import {ethers, BigNumber} from "ethers"

export default defineComponent( {
  name: "CampaignForm",
  setup() {
    const startDate = ref("")
    const finishDate = ref("")
    const owner = ref("0x0")
    const target = ref("10")
    async function handleCreateCampaign() {
      const response = await Funding.createCampaign(
          new Web3Provider(window.ethereum),
            owner.value,
            ethers.utils.parseEther(target.value),
            BigNumber.from(moment(startDate.value).unix()),
            BigNumber.from(moment(finishDate.value).unix())
            )
    }

    return {
      handleCreateCampaign,

      startDate,
      finishDate,
      owner,
      target,
    }
  }
})
</script>

<style scoped>

</style>