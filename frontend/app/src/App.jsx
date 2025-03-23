import { } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'

import Layout from '@/components/Layout'
import Homepge from '@/pages/Homepge'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Homepge />} />
      </Route>
    </Routes>
  )
}

export default App
