import styled from "@emotion/styled";

import { Route, Routes } from 'react-router-dom'

import {Preview} from "./views/Preview.tsx";
import {Qr} from "./views/Qr.tsx";
import {CreateCompetitionInfo} from "./views/CreateCompetitionInfo.tsx";
import './App.css'

function App() {

  return <Routes>
    <Route path="/" element={<Preview />} />
    <Route path="/qr" element={<Qr />} />
    <Route path="/create" element={<CreateCompetitionInfo />} />
  </Routes>
}

export default App
