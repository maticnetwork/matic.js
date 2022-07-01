<template>
  <div class="b-index row content-center content-v-center">
    <div>
      <i class="fas fa-spinner fa-spin" style="font-size: 70px"></i>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$router.replace('docs/get-started')
  },
}
</script>

<style>
.b-index {
  height: 500px;
}
</style>