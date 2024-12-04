<script setup lang="ts">
const emits = defineEmits<{
  confirm: []
  cancel: []
}>()
const open = ref(false)
function handleCancel() {
  open.value = false
  emits('cancel')
}
function handleConfirm() {
  open.value = false
  emits('confirm')
}
</script>

<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <slot />
    </PopoverTrigger>
    <PopoverContent class="flex w-fit flex-col items-center p-2">
      <slot name="description" />
      <div class="flex w-full items-center justify-end gap-x-2">
        <Button variant="secondary" size="sm" class="text-xs" @click="handleCancel">
          Cancel
        </Button>
        <Button size="sm" class="text-xs" @click="handleConfirm">
          Confirm
        </Button>
      </div>
    </PopoverContent>
  </Popover>
</template>

<style>
</style>
