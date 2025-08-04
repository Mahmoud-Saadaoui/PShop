import { useQuery } from "@tanstack/react-query"
import { fetchBanners } from "../api/bannerApi"

// Fetch Banners Mutation
export const useFetchBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: () => fetchBanners(),
    staleTime: 1000 * 60 * 10,
  })
}