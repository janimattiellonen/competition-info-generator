import { Route, Routes } from 'react-router-dom'

import {CreateCompetitionInfo} from "./views/CreateCompetitionInfo.tsx";
import './App.css'

function App() {
  return <Routes>
    <Route path="/" element={<CreateCompetitionInfo />} />
  </Routes>
}

export default App
