<template>
  <router-view></router-view>
</template>

<script>
export default {
  data() {

    return {
      store: this.$store.state.app,
    }
  },
  created() {

    this.store.dispatch('app/init')

console.log(this.$store.state);

  },
};
</script>