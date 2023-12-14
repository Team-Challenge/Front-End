import $api from "@/http"

export const getDeliveryData = async () => {
  return await $api.get(`/orders/nova_post`)
}