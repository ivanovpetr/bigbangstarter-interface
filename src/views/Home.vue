<template>
  <div class="home">
    <Header></Header>
    <CampaignList></CampaignList>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Footer from  '@/components/Footer.vue'
import Header from  '@/components/Header.vue'
import CampaignList from "@/components/CampaignList.vue";

@Options({
  components: {
    HelloWorld,
    Footer,
    Header,
    CampaignList
  },
  name: "Home"
})
export default class Home extends Vue {

}
</script>
