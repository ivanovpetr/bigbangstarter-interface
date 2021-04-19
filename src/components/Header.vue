<template>
  <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex justify-content-between">
        <div class="container-fluid d-flex align-items-center">
          <h1 class="d-flex align-items-center fs-4 text-white mb-0">
            BigBangStarter
          </h1>
          <Account></Account>
        </div>
      </div>
    </div>
  </header>
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