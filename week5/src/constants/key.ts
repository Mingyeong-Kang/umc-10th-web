export const LOCAL_STORAGE_KEY = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

export const QUERY_KEY = {
  lps: ["lps"] as const,
  lpDetail: (lpId: number) => ["lpDetail", lpId] as const,
  lpComments: (lpId: number) => ["lpComments", lpId] as const,
  myInfo: ["myInfo"] as const,
};