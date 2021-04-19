<template>
  <div class="container py-5" id="custom-cards">
    <h2 class="pb-2 border-bottom">Campaigns</h2>

    <div class="row row-cols-3 align-items-stretch py-5">
      <CampaignWidget v-for="c of campaigns" :campaign="c"></CampaignWidget>
    </div>

  </div>
</template>

<script lang="ts">

import {computed, defineComponent} from "vue"
import {useStore} from "vuex";
import {RootState} from "@/store";
import CampaignWidget from "@/components/CampaignWidget.vue";

export default defineComponent({
  name: "CampaignList",
  components: {
    CampaignWidget,
  },
  setup() {
    const store = useStore<RootState>()

    const campaigns = computed(() => {
      return store.getters["campaigns/campaigns"]
    })

    return {
      campaigns
    }
  }
})

</script>

<style scoped>

</style>