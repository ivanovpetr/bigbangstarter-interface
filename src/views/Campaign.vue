<template>
  <div class="container py-5" id="custom-cards">
    <Header></Header>
    <div class="container">
      <div class="row">
        <div class="col">
          <CampaignDescription></CampaignDescription>
        </div>
        <div class="col-4">
          <CampaignSummary></CampaignSummary>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Footer from  '@/components/Footer.vue'
import CampaignSummary from '@/components/CampaignSummary.vue'
import CampaignDescription from '@/components/CampaignDescription.vue'

@Options({
  components: {
    Footer,
    CampaignSummary,
    CampaignDescription,
  },
})
export default class Campaign extends Vue {}
</script>
