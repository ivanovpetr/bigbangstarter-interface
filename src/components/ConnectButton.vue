<template>
  <button class="button button--connect" data-target="navbar.balanceButton" id="balanceButton">
    <span data-target="navbar.balance" class="balancePing">Connect Wallet</span>
  </button>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
@Options({
  name: "ConnectButton",
},)
export default class ConnectButton extends Vue {
}
</script>

<style scoped>

</style>