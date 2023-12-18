import $api from "@/http"

export const getPostData = async (post_service: string) => {
  return await $api.get(`/orders/${post_service}`)
}