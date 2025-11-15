<template>
    <h1>Admin hallintapaneeli</h1>
    <DashboardStats />
</template>

<script lang="ts">
import AuthenticatedView from '~/mixins/authenticatedView.vue';

export default {
    mixins: [AuthenticatedView]
}
</script>