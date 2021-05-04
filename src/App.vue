<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/campaign">Campaign</router-link> |
    <router-link to="/campaign/create">Create Campaign</router-link>
  </div>
  <Header></Header>
  <main class="flex-shrink-0">
    <router-view/>
  </main>
  <Footer></Footer>
</template>

<script lang="ts">
import Footer from  '@/components/Footer.vue'
import Header from  '@/components/Header.vue'
import {defineComponent, onMounted} from "vue";
import {useStore} from "vuex";
import {RootState} from "@/store";

export default defineComponent({
  name: "App",
  components: {
    Footer,
    Header,
  },
  setup() {
    const store = useStore<RootState>()
    onMounted(() => {
      store.dispatch('account/init')
      store.dispatch('campaigns/init')
    })
  },
})

</script>

<style>
@import'~bootstrap/dist/css/bootstrap.css';

@media screen{
  html,body,#app{
    height: 100% !important;
  }
  #app {
    display: flex;
    flex-direction: column;
  }
  .container{max-width:1160px;margin:0 auto;padding:0 30px;}
  .button{border-radius:100px;padding:12px 16px;border:1px solid;display:inline-block;font-size:14px;line-height:20px;font-weight:600;}
  .button.button--block{display:block;text-align:center;width:100%;}
  .button.button--disabled,.button:disabled{cursor:default;pointer-events:none;}
  .button.button--primary svg *{fill: #ffffff;}
  .button.button--primary.button--disabled,.button.button--primary:disabled{background-color:#ff9ab2;border-color:#ff9ab2;}
  .button svg{margin-top:-2px;}
  .button.button--balance{display:inline-flex;align-items:center;padding:8px 16px;}
  .button.button--balance .address{font-size:12px;line-height:18px;display:inline-flex;align-items:center;padding:5px 12px;border-radius:100px;margin-left:8px;}
  .button.button--balance .address svg{margin-left:8px;}
  .button.button--balance .address{background-color:#ffeaef;color:black;}
  .button.button--balance .address svg *{fill:black;}
  .button.button--connect{color: #ffffff; background-color: transparent}
  .button.button--balance{color: #ffffff; background-color: transparent}

  .countdown {
    color: #333;
    margin: 0 auto;
    text-align: center;
  }

  .countdown-section {
    display: inline-block;
    font-size: 10px;
    list-style-type: none;
    padding: 1em;
    text-transform: uppercase;
  }

  .countdown-section span {
    display: block;
    font-size: 2rem;
  }
}
</style>
