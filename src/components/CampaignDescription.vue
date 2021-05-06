<template>
<div>
  <h1>Campaign {{campaignId}}</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias blanditiis consequuntur distinctio doloribus illum inventore, ipsa, ipsum magnam maiores nisi numquam odio pariatur qui quia ratione, sit tempore unde velit!</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam, asperiores aspernatur autem consequatur consequuntur cupiditate deserunt exercitationem illum laboriosam nostrum numquam officia, omnis pariatur possimus quam sed ullam, unde.</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab aspernatur commodi consequatur minima quibusdam vitae! Consequuntur earum eveniet, id iste necessitatibus non omnis, perspiciatis porro sequi, sit ullam voluptatibus.</p>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "CampaignDescription",
  props: {
    campaignId: {
      type: Number,
      required: true,
    }
  },
  // setup() {
  //
  // }
})
</script>

<style scoped>

</style>