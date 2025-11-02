import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

import DashboardLayout from './DashboardLayout';
import WelcomeDashboard from './WelcomeDashboard';
import Employees from './Employees';
import Aircrafts from './Aircrafts';
import NotImplemented from './NotImplemented';
import Pecas from './Pecas';
import Etapas from './Etapas';
import Testes from './Testes';
import Relatorios from './Relatorios';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<WelcomeDashboard />} />
          <Route path="aeronaves" element={<Aircrafts />} />
          <Route path="pecas" element={<Pecas />} />
          <Route path="etapas" element={<Etapas />} />
          <Route path="testes" element={<Testes />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="funcionarios" element={<Employees />} />
          <Route path="*" element={<NotImplemented />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
