import {Link} from 'react-router-dom'

function Home({
  name,
  setName,
  attack,
  setAttack,
  defence,
  setDefence,
  magic,
  setMagic,
  holy,
  setHoly,
  gift,
  jobs,
  decideJob,
}) {

  return (

    <section className="home-page">
      <h2 className='title'>異世界転生アプリ</h2>
      <div className="left">
        <img src="/pict/god.png" alt="女神の画像" />

        <p>ようこそ、勇敢なる魂よ。</p>
        <p>あなたはこれから、未知なる異世界へと転生します。</p>
        <p>
          転生にあたり、私はあなたに
          <br />
          <strong>100ポイントの能力値</strong>を授けましょう。
        </p>
        <p>
          攻撃、防御、魔力……<br />
          どの能力にどれだけ振り分けるかは、あなた自身で決めてください。
        </p>
        <p>ただし、覚えておきなさい。</p>
        <p> <strong>能力値が高いことが、必ずしも幸せな人生につながるとは限りません。</strong></p>
        <p>
          どのような能力を選び、<br />
          どのように生き、<br />
          どのような運命を切り開いていくのか。
        </p>

        <p>そこにこそ、あなた自身の人生の価値があるのです。</p>

        <p>さあ、あなたの物語を始めましょう。</p>

        <p>
          <strong>あなたに、神の祝福があらんことを。</strong>
        </p>
      </div>
      <div className="right">
        <br />
        <label htmlFor='name'>名前: </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='お名前を教えてください'
        />

        <p>パラメータ {gift}/100</p>
        <p className="status-row">
          <button onClick={
            () => gift >= 10 ? setAttack(attack + 10) : setAttack(attack)}>+10
          </button>
          <button onClick={
            () => setAttack(Math.max(0, attack - 10))}>-10
          </button>
          <span>攻撃力:{attack}</span>
        </p>
        <p className="status-row">
          <button onClick={
            () => gift >= 10 ? setDefence(defence + 10) : setDefence(defence)}>+10
          </button>
          <button onClick={
            () => setDefence(Math.max(0, defence - 10))}>-10
          </button>
          <span>防御力:{defence}</span>
        </p>
        <p className="status-row">
          <button onClick={
            () => gift >= 10 ? setMagic(magic + 10) : setMagic(magic)}>+10
          </button>
          <button onClick={
            () => setMagic(Math.max(0, magic - 10))}>-10
          </button>
          <span>魔法力:{magic}</span>
        </p>
        <p className="status-row">
          <button onClick={
            () => gift >= 10 ? setHoly(holy + 10) : setHoly(holy)}>+10
          </button>
          <button onClick={
            () => setHoly(Math.max(-100, holy - 10))}>-10
          </button>
          <span>清き心:{holy}</span>
        </p>
        <button onClick={decideJob} disabled={jobs.length === 0}>
          決定
        </button>
        <br />
        <br />
        <br />
         <p><Link to="/history">過去の転生履歴を見る</Link></p>
      </div>
    </section>
  );
}
export default Home