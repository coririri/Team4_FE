import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { getPopularStores, getSearchedStore } from '../apis/search';
import {
  getGPTReview,
  getReviews, getStoreDetail,
} from '../apis/storeDetail';
import { getReviewDetail, writeReview } from '../apis/review';
import { PostWriteReviewInfo } from '../types/review';
import { getLikedStore } from '../apis/likedStore';

export function useSearchStore(searchString: string) {
  return useInfiniteQuery({
    queryKey: ['searchStore', { searchString }],
    queryFn: async ({ pageParam = 10000 }) => getSearchedStore(searchString, pageParam),
    getNextPageParam: (lastPage) => (
      lastPage.paging.hasNext ? lastPage.paging.nextCursor : null
    ),
  });
}

export function useStoreDetail(storeId: number) {
  return useQuery({
    queryKey: ['storeDetail', { storeId }],
    queryFn: async () => getStoreDetail(storeId),
  });
}

export function useStoreReview(storeId: number) {
  return useInfiniteQuery({
    queryKey: ['storeReview', { storeId }],
    queryFn: async ({ pageParam = 10000 }) => getReviews(storeId, pageParam),
    getNextPageParam: (lastPage) => (
      lastPage.paging.hasNext ? lastPage.paging.nextCursor : null
    ),
  });
}

export function useWriteReview() {
  return useMutation({
    mutationKey: ['writeReview'],
    mutationFn: async ({
      storeId,
      reviewData,
    }: {
      storeId: number,
      reviewData: PostWriteReviewInfo[]
    }) => writeReview(storeId, reviewData),
  });
}

export function useGPTReview(storeId: number) {
  return useQuery({
    queryKey: ['GPTReview', { storeId }],
    queryFn: async () => getGPTReview(storeId),
  });
}

export function usePopularStores() {
  return useQuery({
    queryKey: ['popularStores'],
    queryFn: async () => getPopularStores(),
  });
}

export function useReviewDetail(storeId: number, reviewId: number) {
  return useQuery({
    queryKey: ['reviewDetail', { storeId, reviewId }],
    queryFn: async () => getReviewDetail(storeId, reviewId),
  });
}

export function useLikedStore(token: string | null) {
  return useInfiniteQuery({
    queryKey: ['likedReview', { token }],
    queryFn: async ({ pageParam = 10000 }) => getLikedStore(token, pageParam),
    getNextPageParam: (lastPage) => (
      lastPage.paging.hasNext ? lastPage.paging.nextCursor : null
    ),
  });
}
