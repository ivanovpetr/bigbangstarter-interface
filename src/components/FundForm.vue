<template>
  <div class="row">
    <div class="col-12">
      <div class="input-group mb-3">
        <input v-model="amount" type="number" class="form-control" id="floatingInputInvalid" placeholder="0">
      </div>
    </div>
    <div class="col-12">
      <div class="d-grid gap-2">
        <button @click="handleFund" class="btn btn-primary" type="button">Fund</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "FundForm",
  emits: ['fund'],
  setup(props, { emit }) {
    let amount = ref(null)
    async function handleFund(){
      emit('fund', amount.value)
    }
    return {
      amount,

      handleFund
    }
  }
})
</script>

<style scoped>

</style>