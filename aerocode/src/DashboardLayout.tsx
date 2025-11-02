import { NavLink, Outlet } from 'react-router-dom';
import './Dashboard.css';

function DashboardLayout() {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Aerocode</h2>
        <nav>
          <ul>
            <li><NavLink to="/dashboard" end>Início</NavLink></li>
            <li><NavLink to="/dashboard/aeronaves">Aeronaves</NavLink></li>
            <li><NavLink to="/dashboard/pecas">Peças</NavLink></li>
            <li><NavLink to="/dashboard/etapas">Etapas de Produção</NavLink></li>
            <li><NavLink to="/dashboard/testes">Controle de Testes</NavLink></li>
            <li><NavLink to="/dashboard/relatorios">Relatórios</NavLink></li>
            <li><NavLink to="/dashboard/funcionarios">Funcionários</NavLink></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;