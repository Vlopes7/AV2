import { mockAeronaves, tipoTeste } from './mockData';

function Testes() {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Resultado do teste registrado com sucesso!");
  };

  return (
    <div>
      <h1>Controle de Qualidade (Testes)</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="aeronaveId">Selecione a Aeronave</label>
            <select id="aeronaveId" name="aeronaveId" required>
              <option value="">-- Selecione --</option>
              {mockAeronaves.map(a => <option key={a.codigo} value={a.codigo}>{a.modelo} ({a.codigo})</option>)}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="tipoTeste">Tipo de Teste</label>
            <select id="tipoTeste" name="tipoTeste" required>
              <option value="">-- Selecione --</option>
              {Object.values(tipoTeste).map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Resultado</label>
            <select name="resultado" required>
                <option value="Aprovado">Aprovado</option>
                <option value="Reprovado">Reprovado</option>
            </select>
          </div>
          <button type="submit">Registrar Teste</button>
        </form>
      </div>
    </div>
  );
}

export default Testes;