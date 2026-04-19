import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export const signInRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10m"),
  prefix: "ratelimit:signInRateLimit",
});

export const resendVerificationEmailRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "10m"),
  prefix: "ratelimit:resendVerification",
});
