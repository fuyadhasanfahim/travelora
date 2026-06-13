/* Minimal structured logger usable from API routes. */
export const log = {
  info(scope: string, msg: string, meta?: Record<string, unknown>) {
    console.log(JSON.stringify({ level: "info", scope, msg, ...meta }));
  },
  warn(scope: string, msg: string, meta?: Record<string, unknown>) {
    console.warn(JSON.stringify({ level: "warn", scope, msg, ...meta }));
  },
  error(scope: string, msg: string, meta?: Record<string, unknown>) {
    console.error(JSON.stringify({ level: "error", scope, msg, ...meta }));
  },
};
