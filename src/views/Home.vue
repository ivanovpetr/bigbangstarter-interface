<template>
  <div class="home">
    <CampaignList></CampaignList>
  </div>
</template>

<script lang="ts">
import CampaignList from "@/components/CampaignList.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: "Home",
  components: {
    CampaignList
  },
})
</script>
