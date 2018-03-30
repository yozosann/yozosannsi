<template>
  <div>
    <p class="card">
      {{text}}
    </p>
  </div>
</template>

<script>
export default {
  props: ['text'],
  watch: {
    text() {
      console.log(11)
    }
  },
  created() {
    console.log(this.text);
  }
}
</script>

<style>
.card {
  padding: 10px;
}
</style>
