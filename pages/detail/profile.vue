<script setup lang="ts">
const authStore = useAuthStore()
const { logout } = authStore
const userInfo = computed(() => authStore.userInfo)
</script>

<template>
  <div>
    <AppMobilePageHeader>
      <template #leftText>
        <div class="font-semibold uppercase tracking-wider">
          account details
        </div>
      </template>
    </AppMobilePageHeader>
    <div class="mx-auto w-full max-w-md">
      <div class="relative h-full">
        <div class="container flex flex-col gap-y-3 space-y-3 pb-5 pt-8">
          <div class="flex w-full max-w-sm flex-col gap-1.5">
            <Label for="email" class="text-lg font-medium">Email</Label>
            <Input
              id="email" v-model="userInfo.Email"
              class="w-full bg-muted py-6 font-medium text-primary focus-visible:ring-0" readonly
            />
          </div>

          <div class="hidden w-full max-w-sm items-center gap-1.5">
            <Label for="instagram" class="text-lg font-medium">Instagram account</Label>
            <InputWithIcon
              id="instagram" value="@mrnicholashon"
              class="w-full bg-muted py-6 font-medium text-primary focus-visible:ring-0" readonly
            >
              <template #endIcon>
                <AppCommonPopConfirm>
                  <Button
                    variant="secondary"
                    class="bg-background font-montserrat text-xs font-semibold uppercase tracking-widest text-primary"
                    size="xs"
                  >
                    disconnect
                  </Button>
                </AppCommonPopConfirm>
              </template>
            </InputWithIcon>
          </div>

          <div class="hidden w-full max-w-sm items-center gap-1.5">
            <Label for="x" class="text-lg font-medium">X account</Label>
            <InputWithIcon
              id="x" class="w-full py-6 font-medium text-primary focus-visible:ring-0" readonly
              placeholder="link your account"
            >
              <template #endIcon>
                <Button
                  variant="primaryY"
                  class="px-3 font-montserrat text-xs font-semibold uppercase tracking-widest text-primary" size="xs"
                >
                  connect
                </Button>
              </template>
            </InputWithIcon>
          </div>

          <AppProfileReferralCodeEdit />

          <AppCommonPopConfirm @confirm="logout(true)">
            <Button variant="ghost" class="font-montserrat font-semibold uppercase tracking-widest text-primary">
              <i class="i-mdi-logout mr-2 rotate-180" /> Logout
            </Button>
          </AppCommonPopConfirm>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
