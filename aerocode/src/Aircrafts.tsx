import { useState } from 'react';
import { mockAeronaves, tipoAeronave, type Aeronave } from './mockData';
import Modal from './Modal';

function Aircrafts() {
  const [aeronaves, setAeronaves] = useState<Aeronave[]>(mockAeronaves);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialAircraftState: Omit<Aeronave, 'codigo'> = {
    modelo: '',
    tipo: tipoAeronave.Comercial,
    capacidade: 0,
    autonomia: 0,
  };
  const [newAircraft, setNewAircraft] = useState(initialAircraftState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewAircraft(prev => ({
      ...prev,
      [name]: name === 'capacidade' || name === 'autonomia' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Aeronave = {
      ...newAircraft,
      codigo: Math.floor(Math.random() * 1000) + 100, // Gera um código aleatório
    };
    setAeronaves(prev => [...prev, newEntry]);
    setNewAircraft(initialAircraftState); // Limpa o formulário
    setIsModalOpen(false);
  };

  const openModal = () => {
    setNewAircraft(initialAircraftState); // Garante que o formulário esteja limpo ao abrir
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Gerenciamento de Aeronaves</h1>

      <Modal title="Cadastrar Nova Aeronave" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="modelo">Modelo</label>
            <input type="text" id="modelo" name="modelo" onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="tipo">Tipo</label>
            <select id="tipo" name="tipo" value={newAircraft.tipo} onChange={handleInputChange}>
              {Object.values(tipoAeronave).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="capacidade">Capacidade</label>
            <input type="number" id="capacidade" name="capacidade" onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="autonomia">Autonomia/Alcance (km)</label>
            <input type="number" id="autonomia" name="autonomia" onChange={handleInputChange} required />
          </div>
          <button type="submit">Salvar</button>
        </form>
      </Modal>

      <div className="card">
        <div className="table-actions">
            <button onClick={openModal}>Cadastrar Nova Aeronave</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Modelo</th>
              <th>Tipo</th>
              <th>Capacidade</th>
              <th>Alcance (km)</th>
            </tr>
          </thead>
          <tbody>
            {aeronaves.map((a) => (
              <tr key={a.codigo}>
                <td>{a.codigo}</td>
                <td>{a.modelo}</td>
                <td>{a.tipo}</td>
                <td>{a.capacidade} passageiros</td>
                <td>{a.autonomia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Aircrafts;