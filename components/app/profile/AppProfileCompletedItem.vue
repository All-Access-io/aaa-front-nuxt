<script setup lang="ts">
defineProps<{
  task: Api.Task.Task
  referrer?: string
}>()
</script>

<template>
  <div
    v-if="task"
    class="relative flex cursor-pointer flex-col gap-y-2 rounded-md border bg-muted-foreground/10 p-4 py-2"
    @click="navigateTo(`/detail/tasks/${task.Id}`)"
  >
    <div class="flex items-center gap-x-3">
      <img v-if="true" src="~/assets/images/stamp-tick.png" class="size-10 translate-y-0.5">
      <!-- <img v-else class="size-12 rounded-md" :src="imgUrl"> -->
      <div class="w-full">
        <div class="flex items-center justify-between">
          <span class="text-1xs font-semibold">
            <template v-if="task?.Tag">
              <ScrollArea class="w-60">
                <div class="flex gap-x-1">
                  <AppCommonTag v-for="tag in task.Tag.filter(v => v)" :key="tag" :status="tag" class="text-2xs">
                    {{ tag }}
                  </AppCommonTag>
                  <AppCommonTag v-if="task.Recurring > 0" status="completed" size="xs" />
                </div>
                <ScrollBar orientation="horizontal" class="h-1.5" />
              </ScrollArea>
            </template>
          </span>
          <!-- <div v-if="status === 'claimed'" class="whitespace-nowrap text-1xs">
            {{ date }}
          </div> -->
        </div>
        <div class="font-poppins text-lg font-medium leading-tight">
          {{ task.Title }}
        </div>
      </div>
    </div>
    <div v-if="task.PointsGet" class="flex items-center justify-between">
      <AppAAACurrency :value="task.PointsGet" is-earned />
      <div class="text-1xs">
        <!-- {{ date }} -->
      </div>
    </div>
  </div>
</template>

<style>
</style>
