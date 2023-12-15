import $api from "@/http"

export const getNovaPostData = async () => {
  return await $api.get(`/orders/nova_post`)
}

export const getUkrPostData = async () => {
  return await $api.get(`/orders/urk_post`)
}