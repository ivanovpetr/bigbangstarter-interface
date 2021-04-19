<template>
  <footer class="container py-5">
    <div class="row">
      <div class="col-12 col-md">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="d-block mb-2" role="img" viewBox="0 0 24 24"><title>Product</title><circle cx="12" cy="12" r="10"></circle><path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83m13.79-4l-5.74 9.94"></path></svg>
        <small class="d-block mb-3 text-muted">© 2021</small>
      </div>
      <div class="col-6 col-md">
        <h5>Social</h5>
        <ul class="list-unstyled text-small">
          <li><a class="link-secondary" href="#">Twitter</a></li>
          <li><a class="link-secondary" href="#">Medium</a></li>
          <li><a class="link-secondary" href="#">Telegram</a></li>
        </ul>
      </div>
      <div class="col-6 col-md">
        <h5>Company</h5>
        <ul class="list-unstyled text-small">
          <li><a class="link-secondary" href="#">About us</a></li>
          <li><a class="link-secondary" href="#">Start your campaign</a></li>
        </ul>
      </div>
      <div class="col-6 col-md">
        <h5>Help</h5>
        <ul class="list-unstyled text-small">
          <li><a class="link-secondary" href="#">Support</a></li>
          <li><a class="link-secondary" href="#">Terms of use</a></li>
          <li><a class="link-secondary" href="#">Privacy policy</a></li>
        </ul>
      </div>
      <div class="col-6 col-md">
        <h5>Developers</h5>
        <ul class="list-unstyled text-small">
          <li><a class="link-secondary" href="#">Documentation</a></li>
          <li><a class="link-secondary" href="#">Github</a></li>
          <li><a class="link-secondary" href="#">Privacy</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
@Options({
  name: "Footer",
},)
export default class Footer extends Vue {
}
</script>

<style scoped>

</style>