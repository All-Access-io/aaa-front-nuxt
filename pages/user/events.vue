<script setup lang="ts">

</script>

<template>
  <div class="container max-w-lg py-8">
    <section class="space-y-1">
      <div class="font-poppins text-3xl font-medium">
        Discover Events
      </div>
      <div class="leading-tight">
        Every week, we feature some of our favourite festivals around the world. You can also check out some great
        events from the community.
      </div>
    </section>

    <section>
      <Tabs default-value="all">
        <TabsList class="flex items-center justify-start overflow-x-auto bg-background pl-0 font-poppins">
          <TabsTrigger
            value="all"
            class="px-[8px] py-px text-sm data-[state=active]:bg-primary-green data-[state=active]:font-semibold data-[state=active]:text-primary"
          >
            All
          </TabsTrigger>
          <TabsTrigger
            value="gg"
            class="px-[8px]  py-px text-sm data-[state=active]:bg-primary-green data-[state=active]:font-semibold data-[state=active]:text-primary"
          >
            GG Exclusive
          </TabsTrigger>
          <TabsTrigger
            value="today"
            class="px-[8px] py-px text-sm data-[state=active]:bg-primary-green data-[state=active]:font-semibold data-[state=active]:text-primary"
          >
            Today
          </TabsTrigger>
          <TabsTrigger
            value="online"
            class="px-[8px] py-px text-sm data-[state=active]:bg-primary-green data-[state=active]:font-semibold data-[state=active]:text-primary"
          >
            Online-only
          </TabsTrigger>
          <TabsTrigger
            value="free"
            class="px-[8px]  py-px text-sm data-[state=active]:bg-primary-green data-[state=active]:font-semibold data-[state=active]:text-primary"
          >
            Free
          </TabsTrigger>
        </TabsList>
        <InputWithIcon placeholder="Search" class="w-full rounded-3xl">
          <template #startIcon>
            <i class="i-mdi-magnify" />
          </template>
        </InputWithIcon>
        <div class="flex-1 overflow-y-auto">
          <TabsContent value="all" class="space-y-3">
            <AppEventsCard
              date="22 JUN 2024"
              title="AMA with Anthony and Donny Pangilinan"
              description="Exclusive interview about GG the movie."
              is-ended
            />
            <AppEventsCard
              is-live
              date="24 JUN 2024, 5.00 PM"
              title="GG The Movie City Tour with Donny - Cebu 🇵🇭"
              description="Come meet Donny and the cast of GG the movie"
              is-free
            />
            <AppEventsCard
              date="26 JUN 2024, 10:00 PM"
              title="GG The Movie Netflix Watch Party!"
              description="GG The Movie officially Premiers on Netflix."
              is-free
              is-online
            />
            <AppEventsCard
              is-live
              date="24 JUN 2024, 5.00 PM"
              title="GG The Movie City Tour with Donny - Bacolod 🇵🇭"
              description="Come meet Donny and the cast of GG the movie"
              is-free
              is-online
            />
          </TabsContent>
        </div>
      </Tabs>
    </section>
  </div>
</template>

<style>
</style>
