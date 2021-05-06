<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Ninth navbar example">
    <div class="container-xl">
      <a class="navbar-brand" href="#">BigBangStarter</a>
      <div class="collapse navbar-collapse" id="navbarsExample07XL">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{name: 'Home'}" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'CreateCampaign'}" class="nav-link">Create Campaign</router-link>
          </li>
        </ul>
        <Account></Account>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import Account from "./Account.vue"

@Options({
  name: "Header",
  components: {
    Account,
  }
},)

export default class Header extends Vue{
}
</script>

<style scoped>

</style>