import { Link } from 'react-router-dom'

function History({ jobLists, openHistoryResult }) {
    return (
        <section className="history-page">
            <h2>転生履歴</h2>

            {jobLists.length === 0 ? (
                <p>まだ転生履歴はありません。</p>
            ) : (
                <ol>
                    {[...jobLists].reverse().map((item) => (
                        <li key={item.id}>
                            <p>
                                <Link to="/result" onClick={(event) => {
                                    event.preventDefault()
                                    openHistoryResult(item)
                                }}>
                                    {item.name}/
                                    職業:{item.job.name}
                                </Link>
                            </p>
                            <p>
                                攻撃力:{item.attack}/
                                防御力:{item.defence}/
                                魔法力:{item.magic}/
                                清き心:{item.holy}

                            </p>

                        </li>
                    ))}
                </ol>
            )}
            <Link to="/">Homeへ戻る</Link>
        </section>
    )
}
export default History