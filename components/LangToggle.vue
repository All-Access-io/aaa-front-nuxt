<script setup lang="ts">
withDefaults(defineProps<{
  variant: 'default' | 'circle'
}>(), {
  variant: 'default',
})

const i18nLocale = useI18nLocale()
const currentIcon = computed(() => {
  if (i18nLocale.locale.value === 'en')
    return 'i-circle-flags-us'
  else if (i18nLocale.locale.value === 'zh')
    return 'i-circle-flags-cn'
  else
    return 'i-circle-flags-my'
})
</script>

<template>
  <template v-if="variant === 'default'">
    <Select :model-value="i18nLocale.locale.value" @update:model-value="i18nLocale.setLocale">
      <SelectTrigger class="">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">
            <div class="flex items-center gap-x-2">
              <i class="i-circle-flags-us" />
              English
            </div>
          </SelectItem>
          <SelectItem value="zh">
            <div class="flex items-center gap-x-2">
              <i class="i-circle-flags-cn" />
              Chinese
            </div>
          </SelectItem>
          <SelectItem value="ms">
            <div class="flex items-center gap-x-2">
              <i class="i-circle-flags-my" />
              Bahasa Malaysia
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </template>
  <template v-else>
    <Menubar class="border-0">
      <MenubarMenu>
        <MenubarTrigger class="aspect-square rounded-full hover:cursor-pointer">
          <i :class="currentIcon" />
        </MenubarTrigger>

        <MenubarContent>
          <MenubarItem class="hover:cursor-pointer" @click="i18nLocale.setLocale('en')">
            <div class="flex items-center gap-x-2">
              <i class="i-circle-flags-us" />
              English
            </div>
          </MenubarItem>
          <MenubarItem class="hover:cursor-pointer" @click="i18nLocale.setLocale('zh')">
            <div class="flex items-center gap-x-2">
              <i class="i-circle-flags-cn" />
              Chinese
            </div>
          </MenubarItem>
          <MenubarItem class="hover:cursor-pointer" @click="i18nLocale.setLocale('ms')">
            <div class="flex items-center gap-x-2">
              <i class="i-circle-flags-my" />
              Bahasa Malaysia
            </div>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  </template>
</template>
