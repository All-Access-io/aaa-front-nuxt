<script setup lang="ts">
</script>

<template>
  <div>
    <AppPageDetails
      title="GG The Movie City Tour with Donny - Cebu 🇵🇭" exclusive="GG: The Movie"
      img-url="/images/gg-movie-square.png" img-class="h-[500px] -translate-y-10"
      description="Come meet Donny and the cast of GG the movie."
    >
      <template #leftText>
        <div class="font-semibold uppercase tracking-wider">
          events
        </div>
      </template>
      <div>
        <div class="mb-2 font-poppins text-2xl font-medium">
          Event Details
        </div>
        <div class="space-y-2">
          <div class="flex items-center gap-x-1">
            <i class="i-custom-gps-icon" />
            <div class="text-xs">
              Nustar Premiere Cinema, Cebu
            </div>
          </div>
          <div class="flex items-center gap-x-1">
            <img src="~/assets/images/calendar-icon.png" class="size-4">
            <div class="text-xs">
              26 JUNE 2024, 2:00 PM, GMT+8
            </div>
          </div>
          <div class="flex items-center gap-x-1">
            <img src="/images/gg-icon.png" class="size-4 rounded">
            <div class="text-xs">
              GG: The Movie Official
            </div>
            <div class="text-1xs text-primary-neon">
              Verified
            </div>
          </div>
        </div>
      </div>
      <AppCommonHashTags :hash-tags="['#GGMovieCityTour', '#GGExclusive']" />

      <div class="flex w-full flex-col gap-y-1 rounded-md bg-primary-green p-4">
        <div class="flex w-full items-center justify-between">
          <div class="font-poppins text-lg font-medium">
            Get Ticket
          </div>
          <div class="flex items-center text-xs font-medium">
            Ticket Details
            icon
          </div>
        </div>
        <div class="text-sm">
          This event requires a ticket to join.
        </div>
        <div class="flex flex-col gap-y-2">
          <div class="flex w-full items-center justify-between rounded-md bg-primary-yellow p-4">
            <div>
              <div class="font-poppins text-lg font-medium">
                Normal Entry
              </div>
              <AppAAACurrency :value="1000" />
            </div>
            <div class="grid grid-cols-[1fr,50px,1fr]">
              <Button variant="ghost">
                <i class="i-mdi-minus" />
              </Button>
              <Input value="0" class="text-center" />
              <Button variant="ghost">
                <i class="i-mdi-plus" />
              </Button>
            </div>
          </div>

          <div class="flex w-full items-center justify-between rounded-md bg-primary-yellow p-4">
            <div>
              <div class="font-poppins text-lg font-medium">
                VIP Entry
              </div>
              <AppAAACurrency :value="2500" />
            </div>
            <div class="grid grid-cols-[1fr,50px,1fr]">
              <Button variant="ghost">
                <i class="i-mdi-minus" />
              </Button>
              <Input value="0" class="text-center" />
              <Button variant="ghost">
                <i class="i-mdi-plus" />
              </Button>
            </div>
          </div>

          <Button variant="primaryY" class="mt-2">
            Get Ticket
          </Button>
          <div class="text-center text-xs">
            Ticket sale closes at 6:00 p.m. 10/06/2024
          </div>
          <AppCommonAvatarsList text="are going" class="text-primary" />
        </div>
      </div>

      <AppClaimRewardItem
        ready-to-claim img-url="/images/reward-2.png" title="GG Exclusive Mass Shirt"
        description="Prove your loyalty with by repping our exclusive movie merchandise!" exclusive="GG FAN EXCLUSIVE"
        criteria="FIRST 5 FAAANS" :fan-value="20" point-type="aaa"
      />

      <div class="rounded-lg border border-primary-green p-4">
        <div class="mb-2 font-poppins text-xl font-medium">
          Earn more with this event
        </div>
        <Tabs default-value="tasks">
          <TabsList class="grid w-full grid-cols-2 bg-primary-yellow">
            <TabsTrigger value="tasks" class="data-[state=active]:bg-primary data-[state=active]:text-primary-yellow">
              Tasks
            </TabsTrigger>
            <TabsTrigger
              disabled value="rewards"
              class="data-[state=active]:bg-primary data-[state=active]:text-primary-yellow"
            >
              Rewards
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tasks">
            <AppProfileTaskCard
              :task="{
                Id: 1,
                Title: 'Scan the Code at GG The Movie City Tour with Donny - Cebu 🇵🇭',
                // questImage: '~/assets/images/nav-scan.svg',
                Tag: ['#GGExclusive'],
                Points: 1500,
                Description: '',
                QuestType: 2,
              }"
            />
          </TabsContent>
        </Tabs>
        <div class="mt-2 flex flex-col items-center justify-center">
          <div class="text-lg font-bold uppercase tracking-wider">
            more event ask by
          </div>
          <div class="rounded-md bg-muted p-1 text-xs font-medium">
            GG: The Movie Official
          </div>
        </div>
      </div>
    </AppPageDetails>
  </div>
</template>

<style></style>
