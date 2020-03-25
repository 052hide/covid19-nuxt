<template>
  <div class="the-layout">
    <main class="main-container">
      <nuxt :nuxt-child-key="$route.fullPath" />
    </main>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import 'vue-material-design-icons/styles.css'

@Component
export default class Default extends Vue {}
</script>

<style lang="scss" scoped>
.main-container {
  @apply pb-8;
  @screen lg {
    @apply mx-auto my-0;
    width: theme('screens.lg');
  }
}
</style>
