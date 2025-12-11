<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import DashboardLayout from '@modules/Dashboard/resources/js/layouts/DashboardLayout.vue';

const title = 'Dashboard';
</script>
<template>
    <Head :title="$t(title)" />
    <DashboardLayout :title="title" :breadcrumbs="[{ label: title }]">
        <div class="flex h-full flex-1 flex-col gap-4 p-4 pt-0">
            <h1>Settings</h1>
            <div class="grid auto-rows-min gap-4 md:grid-cols-3">
                <div class="bg-muted/50 aspect-video rounded-xl" />
                <div class="bg-muted/50 aspect-video rounded-xl" />
                <div class="bg-muted/50 aspect-video rounded-xl" />
            </div>
            <div
                class="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min"
            />
        </div>
    </DashboardLayout>
</template>
