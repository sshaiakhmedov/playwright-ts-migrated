/**
 * Search-related test data for Mvideo tests.
 */
export const SEARCH_QUERIES = {
  ROBOT_VACUUM: 'робот пылесос',
  NONSENSE: 'фывапролдж123абв',
} as const;

export type SearchQueryKey = keyof typeof SEARCH_QUERIES;
export type SearchQueryValue = typeof SEARCH_QUERIES[SearchQueryKey];
