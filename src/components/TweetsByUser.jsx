import { useState } from 'react'
import { fetchTweetsByUserId } from '../api'

export default function TweetsByUser() {
  const [userId, setUserId] = useState('')
  const [tweets, setTweets] = useState([])
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const onFetch = async (e) => {
    e.preventDefault()
    setErr(''); setTweets([])
    if (!userId) return setErr('userId girin')
    setLoading(true)
    try {
      const data = await fetchTweetsByUserId(userId.trim())
      setTweets(Array.isArray(data) ? data : [])
    } catch (e) {
      setErr(e.message || 'Hata')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="container">
      <header className="header">
        <h1 className="title">Tweets by User</h1>
        <p className="subtitle">Kullanıcı id'si ile tweetleri getir</p>
      </header>

      <form onSubmit={onFetch} className="form">
        <input
          type="number"
          inputMode="numeric"
          placeholder="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="input"
          aria-label="User ID"
        />
        <button type="submit" disabled={loading} className="btn">
          {loading ? 'Yükleniyor…' : 'Fetch'}
        </button>
      </form>

      {err && <div className="alert" role="alert">⚠️ {err}</div>}

      {!loading && tweets.length === 0 && !err && (
        <div className="empty">Gösterilecek tweet yok.</div>
      )}

      <ul className="grid">
        {tweets.map(t => (
          <li key={t.id} className="card">
            <div className="meta">
              <span className="badge">#{t.id}</span>
              <span className="muted">
                user #{t.userId}{t.username ? ` • ${t.username}` : ''}
              </span>
            </div>
            <p className="content">{t.content}</p>
            <div className="footer">
              <span className="muted">
                {t.createdAt ? new Date(t.createdAt).toLocaleString() : ''}
              </span>
              <span className="muted">❤️ {t.likeCount ?? 0}</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}
