<script setup lang="ts">
import { client } from './api';

const data = ref('');

client.GET('/').then((res) => {
  data.value = res.data?.message || '';
});
</script>

<template>
  <div>
    {{ data }}
  </div>
</template>

<style scoped>

</style>
