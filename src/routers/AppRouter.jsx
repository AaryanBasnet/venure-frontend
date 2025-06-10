import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

export default function AppRouter() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path='/state' element={<StateManage />}>

        </Route>
        <Route element={}
    </Routes>
    </BrowserRouter>
  )
}
