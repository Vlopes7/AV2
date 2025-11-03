import { useState } from 'react';
import { mockAeronaves, type Peca, type Etapa, producao, statusPeca } from './mockData';

interface RelatoriosProps {
  pecas: Peca[];
  etapas: Etapa[];
}

function Relatorios({ pecas, etapas }: RelatoriosProps) {
  const [report, setReport] = useState<string>('');
  const [selectedAeronaveId, setSelectedAeronaveId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const aeronaveId = Number(formData.get('aeronaveId'));
    const autor = formData.get('autor') as string;
    const aeronave = mockAeronaves.find(a => a.codigo === aeronaveId);

    if (!aeronave) return;

    const etapasPendentes = etapas.filter(et => et.aeronaveId === aeronaveId && et.status !== producao.Concluido);
    const pecasNaoProntas = pecas.filter(p => p.aeronaveId === aeronaveId && p.status !== statusPeca.Pronta);

    let reportContent = `--- RELATÓRIO DA AERONAVE ${aeronave.modelo} (${aeronave.codigo}) ---\n\n`;

    if (etapasPendentes.length === 0 && pecasNaoProntas.length === 0) {
      reportContent += `Situação: Aeronave pronta para entrega.\nTodos os testes aprovados.\nTodas as etapas concluídas.\n\nAutor: ${autor}`;
    } else {
      reportContent += `ERRO: A aeronave ${aeronave.modelo} (${aeronave.codigo}) não pode ser liberada.\n\nMotivos:\n`;
      if (etapasPendentes.length > 0) {
        reportContent += `- Etapas não concluídas: ${etapasPendentes.map(e => e.nome).join(', ')}\n`;
      }
      if (pecasNaoProntas.length > 0) {
        reportContent += `- Peças não prontas: ${pecasNaoProntas.map(p => p.nome).join(', ')}\n`;
      }
    }
    setReport(reportContent);
  };

  return (
    <div>
      <h1>Geração de Relatórios</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="aeronaveId">Selecione a Aeronave</label>
            <select id="aeronaveId" name="aeronaveId" value={selectedAeronaveId} onChange={e => setSelectedAeronaveId(e.target.value)} required>
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