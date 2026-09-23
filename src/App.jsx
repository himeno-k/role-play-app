import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import History from './pages/History'

function App() {
  const navigate = useNavigate();
  const [attack, setAttack] = useState(0);
  const [defence, setDefence] = useState(0);
  const [magic, setMagic] = useState(0);
  const [holy, setHoly] = useState(0);
  const [name, setName] = useState('');
  const [job, setJob] = useState(null);
  const [jobs, setJobs] = useState([]);



  const gift = 100 - (attack + defence + magic + holy);
  const STORAGE_KEY = 'jobLists';
  const [jobLists, setJobLists] = useState(() => {
    const savedJobLists = localStorage.getItem(STORAGE_KEY)
    return savedJobLists ? JSON.parse(savedJobLists) : []
  })




  useEffect(() => {
    console.log('useEffect が実行されました')
    fetch('/jobs.csv')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`CSVの読み込み失敗: ${response.status}`)
        }

        return response.text()
      })
      .then((text) => {
        console.log('CSVの内容:', text)

        const [, ...rows] = text.trim().split('\n')

        const jobData = rows.map((row) => {
          const [name, scenario, pict] = row.trim().split(',')
          return { name, scenario, pict }
        })

        console.log('変換後の職業データ:', jobData)
        setJobs(jobData)
      })
      .catch((error) => {
        console.error(error)
        alert('職業データの読み込みに失敗しました。')
      })
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobLists))
  }, [jobLists])

  const getJobName = () => {
    if (holy >= 30) {
      if (magic >= 40) {
        return "僧侶";
      }
      return "勇者";
    }
    if (holy >= 0) {
      if (defence >= 40) {
        return "戦士";
      }
      if (magic >= 50) {
        return "魔法使い";
      }
      if (attack >= 50) {
        return "射手";
      }
      if (attack + defence + magic >= 20) {
        return "女王";
      }
      return "村人";
    }
    if (attack >= 50) {
      if (magic >= 50) {
        return "闇の魔法使い";
      }
      if (defence >= 50) {
        return "闇の戦士";
      }
      return "魔王";
    }
    return "国王"

  };

  const decideJob = () => {
    const jobName = getJobName()
    const selectedJob = jobs.find((item) => item.name === jobName)

    setJob(selectedJob ?? {
      name: jobName,
      scenario: 'シナリオが見つかりません。',
    },
    )
    navigate('/result')
  }
  const resetForRetry = () => {
    setAttack(0)
    setDefence(0)
    setMagic(0)
    setHoly(0)
    setJob(null)

    navigate('/')
    window.scrollTo(0, 0)
  }

  const registLists = () => {
    if (!job) return

    const newJob = {
      id: Date.now(),
      name: name.trim() || 'no name',
      attack,
      defence,
      magic,
      holy,
      job: { ...job },
    }

    setJobLists((currentLists) => {
      const newLists = [...currentLists, newJob]
      if (newLists.length > 20) {
        return newLists.slice(1)
      }
      return newLists
    })
    navigate('/history')
    window.scroll(0, 0)
 


  }

  const openHistoryResult = (history) => {
    console.log('クリックした履歴:',history)
    setName(history.name)
    setAttack(history.attack)
    setDefence(history.defence)
    setMagic(history.magic)
    setHoly(history.holy)
    setJob(history.job)

    navigate('/result')
    window.scrollTo(0, 0)
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            name={name}
            setName={setName}
            attack={attack}
            setAttack={setAttack}
            defence={defence}
            setDefence={setDefence}
            magic={magic}
            setMagic={setMagic}
            holy={holy}
            setHoly={setHoly}
            gift={gift}
            jobs={jobs}
            decideJob={decideJob}
          />
        }
      />

      <Route
        path="/result"
        element={
          <Result
            name={name}
            job={job}
            resetForRetry={resetForRetry}
            registLists={registLists}
          />}
      />
      <Route
        path="/history"
        element={
          <History
            jobLists={jobLists}
            openHistoryResult={openHistoryResult}
          />}
      />
    </Routes>
  )
}
export default App





