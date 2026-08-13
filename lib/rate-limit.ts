// lib/rate-limit.ts
type RateLimitInfo = {
  count: number;
  resetTime: number;
};

const limits = new Map<string, RateLimitInfo>();

export function checkRateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const userLimit = limits.get(ip);

  if (!userLimit) {
    limits.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (now > userLimit.resetTime) {
    limits.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (userLimit.count >= limit) {
    return false;
  }

  userLimit.count += 1;
  return true;
}
