<template>
  <div class="ms-auto">
    <div v-if="accountAddress" class="button button--balance" data-target="navbar.balanceButton" href="javascript:void(0)">
      <span data-target="navbar.balance" class="balancePing">{{ accountBalance }} ETH</span>
      <div class="address">
        <span data-target="navbar.address">{{ shrinkAddress(accountAddress) }}</span>
        <div class="address-copy" data-action="click->navbar#copyToClipboard">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10.6673 0.666504H2.66732C1.93398 0.666504 1.33398 1.2665 1.33398 1.99984V11.3332H2.66732V1.99984H10.6673V0.666504ZM12.6673 3.33317H5.33398C4.60065 3.33317 4.00065 3.93317 4.00065 4.6665V13.9998C4.00065 14.7332 4.60065 15.3332 5.33398 15.3332H12.6673C13.4007 15.3332 14.0007 14.7332 14.0007 13.9998V4.6665C14.0007 3.93317 13.4007 3.33317 12.6673 3.33317ZM12.6673 13.9998H5.33398V4.6665H12.6673V13.9998Z" fill="#FF3465"></path>
          </svg>
        </div>
      </div>
    </div>
    <ConnectButton
        v-else
        @click="connectAccount"
    ></ConnectButton>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import ConnectButton from "./ConnectButton.vue"
@Options({
  components:{
    ConnectButton,
  },
  name: "Account",
},)
export default class Account extends Vue {
  connectAccount(): any {
    this.$store.dispatch('account/connect')
  }
  shrinkAddress(address: string): string {
    return address.substr(0, 5) + "..." + address.substr(address.length-5, 5)
  }
  get accountAddress() {
    return this.$store.state.account.address;
  }
  get accountBalance() {
    return this.$store.state.account.balance;
  }
}
</script>

<style scoped>

</style>