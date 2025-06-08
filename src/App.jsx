import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router'
import DashBoard from './pages/dashboard/dashboard'
import TableUser from './pages/ReduxUser/TableUser'
import RegisterExpert from './pages/Form/RegisterExpert'



export default function App() {
	return (
		<Routes>
			<Route path="/" element={<DashBoard />} index />
			<Route path="/redux" element={<TableUser />}/>
			<Route path="/form" element={<RegisterExpert />} />
		</Routes>
	)
}
