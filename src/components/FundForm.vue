<template>
  <div class="row">
    <div class="col-12">
      <div class="input-group mb-3">
        <input type="number" class="form-control" id="floatingInputInvalid" placeholder="0">
        <span class="input-group-text">1/2</span>
        <span class="input-group-text">MAX</span>
      </div>
    </div>
    <div class="col-12">
      <div class="d-grid gap-2">
        <button class="btn btn-primary" type="button">Fund</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
@Options({
  name: "FundForm",
},)
export default class FundForm extends Vue {

}
</script>

<style scoped>

</style>