import { useState } from 'react';
import { mockAeronaves } from './mockData';

function Relatorios() {
  const [report, setReport] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const aeronaveId = Number(formData.get('aeronaveId'));
    const autor = formData.get('autor') as string;
    const aeronave = mockAeronaves.find(a => a.codigo === aeronaveId);

    if (!aeronave) return;

    const random = Math.random();
    if (random > 0.5) {
      setReport(`--- RELATÓRIO DA AERONAVE ${aeronave.modelo} (${aeronave.codigo}) ---\n\nSituação: Aeronave pronta para entrega.\nTodos os testes aprovados.\nTodas as etapas concluídas.\n\nAutor: ${autor}`);
    } else {
      setReport(`ERRO: A aeronave ${aeronave.modelo} (${aeronave.codigo}) não pode ser liberada.\n\nMotivos:\n- Etapas não concluídas: Instalação de aviônicos\n- Peças não prontas: Assentos da classe econômica`);
    }
  };

  return (
    <div>
      <h1>Geração de Relatórios</h1>
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
            <label htmlFor="autor">Autor do Relatório</label>
            <input type="text" id="autor" name="autor" defaultValue="Usuário Padrão" required />
          </div>
          <button type="submit" className="btn-primary">Gerar Relatório</button>
        </form>
      </div>

      {report && (
        <div className="card" style={{ marginTop: '2rem' }}>
          <h2>Resultado do Relatório</h2>
          <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f4f4f4', padding: '1rem', borderRadius: '4px' }}>{report}</pre>
        </div>
      )}
    </div>
  );
}

export default Relatorios;