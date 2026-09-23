import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'

function Result({ name, job, resetForRetry,registLists }) {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  // 結果未作成のまま /result を直接開いた場合
  if (!job) {
    return <Navigate to="/" replace />
  }

  return (
    <section className="result-page">
      <h2>{name.trim() ? `${name}さんの転生結果` : '転生結果'}</h2>

      <p>職業：{job.name}</p>

      <img
        className="job-image"
        src={`/pict/${job.pict}`}
        alt={`${job.name}の画像`}
      />
      <p>
        シナリオ：
        {job.scenario.split(/<br\s*\/?>/i).map((line, index, lines) => (
          <span key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
      <button onClick={registLists}>登録する</button>
      <button onClick={resetForRetry}>もう一度転生する</button>

      <br />

    </section>
  )
}

export default Result