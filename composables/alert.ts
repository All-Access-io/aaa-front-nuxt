import type { AlertVariants } from "~/components/ui/alert"


interface AlertParams {
  variant?: AlertVariants
  title?: string
  description?: string
}

export function useAlert() {
  const showAlert = ref(true)
  const alertVariant = ref<AlertVariants>()
  const _title = ref('')
  const _description = ref('')

  return {
    showAlert,
    alertVariant,
    title: computed(() => _title.value),
    description: computed(() => _description.value),

    alert({variant, title = '', description = ''}: AlertParams) {
      showAlert.value = true
      alertVariant.value = variant
      _title.value = title
      _description.value = description
    },
  }
}
