'use client';
import { useSyncExternalStore } from "react";
import { rapStack } from "../utils/RAPStack";
import type { RadarAttackPair } from "~/server/api/schemas/radar";

const EMPTY: RadarAttackPair[] = []

export function useStack() {
  const stack = useSyncExternalStore(
    (cb) => rapStack.subscribe(cb),
    () => rapStack.getSnapshot(),
    () => EMPTY, 
)

  const latest = stack.length > 0 ? stack[stack.length - 1] : null

  return { stack, latest }
}
