import type { Me } from "../types/lp";
import { getCurrentUser, sleep } from "./mockDb";

export async function getMe(): Promise<Me | null> {
  await sleep(200);
  return getCurrentUser();
}