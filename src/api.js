const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export async function fetchTweetsByUserId(userId) {
  const res = await fetch(`${BASE}/tweet/findByUserId?userId=${encodeURIComponent(userId)}`)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`HTTP ${res.status} - ${text || res.statusText}`)
  }
  return res.json()
}
