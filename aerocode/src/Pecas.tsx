import { useState } from 'react';
import { mockPecas, mockAeronaves, tipoPeca, statusPeca, type Peca } from './mockData';
import Modal from './Modal';

function Pecas() {
  const [pecas, setPecas] = useState<Peca[]>(mockPecas);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialPecaState: Omit<Peca, 'id'> = {
    nome: '',
    tipo: tipoPeca.Nacional,
    fornecedor: '',
    status: statusPeca.Producao,
    aeronaveId: mockAeronaves[0]?.codigo || 0,
  };
  const [newPeca, setNewPeca] = useState(initialPecaState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPeca(prev => ({
      ...prev,
      [name]: name === 'aeronaveId' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Peca = {
      ...newPeca,
      id: Math.floor(Math.random() * 10000) + 100,
    };
    setPecas(prev => [...prev, newEntry]);
    setNewPeca(initialPecaState);
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta peça?")) {
      setPecas(pecas.filter((p) => p.id !== id));
    }
  };

  const openModal = () => {
    setNewPeca(initialPecaState);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Gerenciamento de Peças</h1>

      <Modal title="Cadastrar Nova Peça" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome da Peça</label>
            <input type="text" id="nome" name="nome" onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="tipo">Tipo</label>
            <select id="tipo" name="tipo" value={newPeca.tipo} onChange={handleInputChange}>
              {Object.values(tipoPeca).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fornecedor">Fornecedor</label>
            <input type="text" id="fornecedor" name="fornecedor" onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="aeronaveId">Aeronave Associada</label>
            <select id="aeronaveId" name="aeronaveId" value={newPeca.aeronaveId} onChange={handleInputChange}>
              {mockAeronaves.map(a => <option key={a.codigo} value={a.codigo}>{a.modelo} ({a.codigo})</option>)}
            </select>
          </div>
          <button type="submit" className="btn-primary">Salvar</button>
        </form>
      </Modal>

      <div className="card">
        <div className="table-actions">
            <button className="btn-primary" onClick={openModal}>Cadastrar Nova Peça</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Fornecedor</th>
              <th>Status</th>
              <th>Aeronave ID</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pecas.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
                <td>{p.tipo}</td>
                <td>{p.fornecedor}</td>
                <td>{p.status}</td>
                <td>{p.aeronaveId}</td>
                <td className="actions-cell">
                  <button className="btn-danger" onClick={() => handleDelete(p.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pecas;