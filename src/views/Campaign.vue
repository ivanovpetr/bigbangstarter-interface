<template>
  <div class="container py-5" id="custom-cards">
    <div class="container">
      <div v-if="campaign" class="row">
        <div class="col">
          <CampaignDescription :campaignId="campaign.id"></CampaignDescription>
        </div>
        <div class="col-4">
          <CampaignSummary :campaign="campaign"></CampaignSummary>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed} from "vue";
import { useRouter } from 'vue-router';
import CampaignSummary from '@/components/CampaignSummary.vue'
import CampaignDescription from '@/components/CampaignDescription.vue'
import {useStore} from "vuex";
import {RootState} from "@/store";
import {CampaignData} from "@/store/modules/campaigns";

export default defineComponent({
  name: "Campaign",
  components: {
    CampaignDescription,
    CampaignSummary
  },
  setup() {
    const router = useRouter();
    const store = useStore<RootState>()
    const campaign = computed(() => {
      return <CampaignData>store.getters["campaigns/campaignById"](+router.currentRoute.value.params.id)
    })
    return {
      campaign
    }
  }
})
</script>
