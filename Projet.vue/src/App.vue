<template>
  <div id="app">
    <!-- Header visible on all views -->
    <AppHeader />

    <!-- Here the active view (IntroView, Chapter1View, etc.) appears -->
    <RouterView />
  </div>
</template>

<script>
import AppHeader from './components/layout/AppHeader.vue';

export default {
  name: 'App',
  components: {
    AppHeader
  }
};
</script>
