export const CONFIG = {
    apiKey: process.env.API_KEY!,
    baseUrl: process.env.API_URL,
    pollingInterval: Number(process.env.POLL_INTERVAL_MS),
}