import { useState } from 'react';
import { mockEtapas, mockAeronaves, producao, type Etapa } from './mockData';
import Modal from './Modal';

function Etapas() {
  const [etapas, setEtapas] = useState<Etapa[]>(mockEtapas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialEtapaState: Omit<Etapa, 'id' | 'status'> = {
    nome: '',
    dataPrevista: '',
    aeronaveId: mockAeronaves[0]?.codigo || 0,
  };
  const [newEtapa, setNewEtapa] = useState(initialEtapaState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEtapa(prev => ({
      ...prev,
      [name]: name === 'aeronaveId' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Etapa = {
      ...newEtapa,
      id: Math.floor(Math.random() * 10000) + 100,
      status: producao.Pendente,
    };
    setEtapas(prev => [...prev, newEntry]);
    setNewEtapa(initialEtapaState); // Limpa o formulário
    setIsModalOpen(false);
  };

  const openModal = () => {
    setNewEtapa(initialEtapaState); // Garante que o formulário esteja limpo ao abrir
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Etapas de Produção</h1>

      <Modal title="Criar Nova Etapa" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome da Etapa</label>
            <input type="text" id="nome" name="nome" onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="dataPrevista">Data de Conclusão Prevista</label>
            <input type="date" id="dataPrevista" name="dataPrevista" onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="aeronaveId">Aeronave</label>
            <select id="aeronaveId" name="aeronaveId" value={newEtapa.aeronaveId} onChange={handleInputChange}>
              {mockAeronaves.map(a => <option key={a.codigo} value={a.codigo}>{a.modelo} ({a.codigo})</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="funcionarios">Funcionários Designados (separados por vírgula)</label>
            <input type="text" id="funcionarios" name="funcionarios" placeholder="Ex: João Silva, Maria Souza" />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </Modal>

      <div className="card">
        <div className="table-actions">
            <button onClick={openModal}>Criar Nova Etapa</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Data Prevista</th>
              <th>Status</th>
              <th>Aeronave ID</th>
            </tr>
          </thead>
          <tbody>
            {etapas.map((etapa) => (
              <tr key={etapa.id}>
                <td>{etapa.id}</td>
                <td>{etapa.nome}</td>
                <td>{etapa.dataPrevista}</td>
                <td>{etapa.status}</td>
                <td>{etapa.aeronaveId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Etapas;