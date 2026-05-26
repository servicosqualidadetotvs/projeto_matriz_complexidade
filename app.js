const form = document.getElementById('matrizForm');
const tipoServico = document.getElementById('tipoServico');
const horasGroup = document.getElementById('horasGroup');
const horas = document.getElementById('horas');
const gestaoGroup = document.getElementById('gestaoGroup');
const possuiIntegracao = document.getElementById('possuiIntegracao');
const possuiLegado = document.getElementById('possuiLegado');
const possuiCustomizacao = document.getElementById('possuiCustomizacao');
const generateButton = document.getElementById('generateButton');
const resetButton = document.getElementById('resetButton');
const exportPngButton = document.getElementById('exportPngButton');
const exportPdfButton = document.getElementById('exportPdfButton');
const exportActions = document.getElementById('exportActions');
const resultArea = document.getElementById('resultArea');
const resultInfo = document.getElementById('resultInfo');

function setExportButtonsEnabled(enabled) {
  exportPngButton.disabled = !enabled;
  exportPdfButton.disabled = !enabled;
  exportActions.classList.toggle('hidden', !enabled);
}

const templates = [
  { phase: 'Preparação', code: 'MIT065', name: 'Transição Comercial', acceptance: 'Assinatura (Física/Dig.)', required: 'Não', note: 'Melhor Prática', A: 'X', B: 'X', C: 'X', D: 'X', E: 'X', F: null, G: null, H: null },
  { phase: 'Preparação', code: 'MIT021', name: 'Termo de Abertura', acceptance: 'Assinatura (Física/Dig.)', required: 'Não', note: 'Melhor Prática', A: null, B: 'X', C: null, D: null, E: null, F: null, G: null, H: null },
  { phase: 'Preparação', code: 'MIT030', name: 'Plano de Projeto', acceptance: 'Assinatura (Física/Dig.)', required: 'Não', note: 'Melhor Prática', A: 'X', B: null, C: null, D: null, E: null, F: null, G: null, H: null },
  { phase: 'Preparação', code: 'MIT032', name: 'Cronograma do Projeto', acceptance: 'Elaborado', required: 'Sim', note: null, A: 'X', B: 'X', C: 'X', D: 'X', E: 'X', F: null, G: null, H: null },
  { phase: 'Preparação', code: 'MIT013', name: 'Gestão de Riscos - Monitoramento e Controle', acceptance: 'Elaborado', required: 'Sim', note: null, A: 'X', B: 'X', C: 'M', D: 'M', E: 'M', F: null, G: null, H: null },
  { phase: 'Preparação', code: 'MIT024', name: 'Guia de Boas Vindas', acceptance: 'Envio por e-mail', required: 'Sim', note: null, A: 'X', B: 'X', C: 'X', D: 'X', E: 'X', F: null, G: null, H: null },
  { phase: 'Refinamento', code: 'MIT041', name: 'Diagrama dos Processos', acceptance: 'Assinatura (Física/Dig.)', required: 'Sim', note: null, A: 'X', B: 'X', C: 'X', D: null, E: null, F: null, G: null, H: null },
  { phase: 'Refinamento', code: 'MIT044', name: 'Especificação de Customização', acceptance: 'Assinatura (Física/Dig.)', required: 'Sim*', note: 'Quando Aplicável', A: null, B: null, C: null, D: null, E: null, F: 'X', G: null, H: null },
  { phase: 'Monitoramento e controle', code: 'MIT031', name: 'Solicitação de Mudança', acceptance: 'Assinatura (Física/Dig.)', required: 'Sim*', note: 'Quando Aplicável', A: 'X', B: 'X', C: 'X', D: 'X', E: 'X', F: 'X', G: null, H: null },
  { phase: 'Monitoramento e controle', code: 'MIT008 / 007', name: 'Status Report / Status Report - One Page', acceptance: 'Envio por e-mail', required: 'Sim', note: null, A: 'X', B: 'X', C: 'M', D: 'M', E: 'M', F: null, G: null, H: null },
  { phase: 'Realização', code: 'MIT043', name: 'Plano de Configuração', acceptance: 'Elaborado', required: 'Não', note: 'Melhor Prática', A: 'X', B: 'X', C: null, D: null, E: null, F: null, G: null, H: null },
  { phase: 'Realização', code: 'MIT045', name: 'Roteiro de Testes', acceptance: 'Elaborado', required: 'Sim', note: null, A: 'X', B: 'X', C: 'M', D: 'M', E: 'M', F: null, G: null, H: null },
  { phase: 'Realização', code: 'MIT010', name: 'Homologação - Termo de Validação', acceptance: 'Assinatura (Física/Dig.)', required: 'Não', note: 'Melhor Prática', A: 'X', B: 'X', C: null, D: null, E: null, F: null, G: null, H: null },
  { phase: 'Realização', code: 'MIT037', name: 'Roteiro de Capacitação', acceptance: 'Assinatura (Física/Dig.)', required: 'Sim', note: null, A: 'X', B: 'X', C: 'X', D: 'X', E: 'M', F: null, G: null, H: null },
  { phase: 'Realização', code: 'MIT053', name: 'Roteiro de Conversão', acceptance: 'N/A', required: 'Não', note: 'Melhor Prática', A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: null },
  { phase: 'Realização', code: 'MIT055', name: 'Roteiro de Interface', acceptance: 'N/A', required: 'Não', note: 'Melhor Prática', A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: null },
  { phase: 'Realização', code: 'MIT054', name: 'Plano de Virada e Rollback', acceptance: 'Aprovação por e-mail', required: 'Sim', note: null, A: 'X', B: 'X', C: null, D: null, E: null, F: null, G: null, H: null },
  { phase: 'Operação', code: 'MIT010', name: 'Go-live - Termo de Validação ', acceptance: 'Assinatura (Física/Dig.)', required: 'Sim', note: null, A: 'X', B: 'X', C: 'X', D: 'X', E: 'X', F: null, G: null, H: null },
  { phase: 'Operação', code: 'MA009', name: 'Comunicação interna de Go Live', acceptance: 'Envio por e-mail', required: 'Não', note: 'Melhor Prática', A: 'X', B: 'X', C: null, D: null, E: null, F: null, G: null, H: null },
  { phase: 'Operação', code: 'MA081', name: 'Transição para Suporte', acceptance: 'Envio por e-mail', required: 'Não', note: 'Melhor Prática', A: 'X', B: 'X', C: 'X', D: 'M', E: null, F: null, G: null, H: null },
  { phase: 'Operação', code: 'MIT062', name: 'Certificado de Conclusão', acceptance: 'Assinatura (Física/Dig.)', required: 'Sim', note: null, A: 'X', B: 'X', C: 'X', D: 'X', E: 'X', F: 'X', G: null, H: null },
  { phase: 'Monitoramento e controle', code: 'MIT005', name: 'Ata de Reunião', acceptance: 'Aprovação por e-mail', required: 'Não', note: 'Melhor Prática', A: 'M', B: 'M', C: 'M', D: 'M', E: 'M', F: 'M', G: null, H: null },
  { phase: 'Monitoramento e controle', code: 'MIT006', name: 'Lista de Retrospectiva', acceptance: 'N/A', required: 'Não', note: 'Melhor Prática', A: 'X', B: 'X', C: 'X', D: 'X', E: 'X', F: null, G: null, H: null },
  { phase: 'Monitoramento e controle', code: 'MIT010', name: 'Marco/Entrega - Termo de Validação', acceptance: 'Assinatura (Física/Dig.)', required: 'Sim', note: null, A: 'X', B: 'X', C: 'X', D: null, E: null, F: null, G: null, H: null },
  { phase: 'Monitoramento e controle', code: 'MIT010', name: 'Suspensão - Termo de Validação ', acceptance: 'Assinatura (Física/Dig.)', required: 'Sim*', note: 'Quando Aplicável', A: 'X', B: 'X', C: 'X', D: 'X', E: 'X', F: 'X', G: null, H: null },
  { phase: 'N/A', code: 'MSF001', name: 'Welcome Sprint', acceptance: 'Apresentado ao cliente', required: 'Sim', note: null, A: null, B: null, C: null, D: null, E: null, F: null, G: 'X', H: 'X' },
  { phase: 'N/A', code: 'MSF002', name: 'Book One Page', acceptance: 'Assinatura (Física/Dig.)', required: 'Sim', note: 'Aba Status Report - Periodicidade Mensal', A: null, B: null, C: null, D: null, E: null, F: null, G: 'X', H: null },
  { phase: 'N/A', code: 'MSF003', name: 'Relatório de Atendimento', acceptance: 'Envio por e-mail', required: 'Sim', note: null, A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: 'X' },
  { phase: 'N/A', code: 'MSF004', name: 'Extrato de Consumo', acceptance: 'Assinatura (Física/Dig.)', required: 'Sim', note: 'Periodicidade trimestral', A: null, B: null, C: null, D: null, E: null, F: null, G: null, H: 'X' },
  { phase: 'N/A', code: 'MSF005', name: 'Status Report - email', acceptance: 'Envio por e-mail', required: 'Não', note: null, A: null, B: null, C: null, D: null, E: null, F: null, G: 'X', H: 'X' },
  { phase: 'N/A', code: 'MSF006', name: 'Boas Vindas - email', acceptance: 'Envio por e-mail', required: 'Não', note: null, A: null, B: null, C: null, D: null, E: null, F: null, G: 'X', H: 'X' }
];

const profileColumnKey = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G',
  H: 'H'
};

function updateVisibility() {
  const serviceType = tipoServico.value;

  if (serviceType === 'Implantação Tradicional') {
    horasGroup.classList.remove('hidden');
    horasGroup.hidden = false;
  } else {
    horasGroup.classList.add('hidden');
    horasGroup.hidden = true;
    horas.value = '';
  }

  if (serviceType === 'Serviços Recorrente') {
    gestaoGroup.classList.remove('hidden');
    gestaoGroup.hidden = false;
  } else {
    gestaoGroup.classList.add('hidden');
    gestaoGroup.hidden = true;
  }
}

function mapProfile(values) {
  const { tipoServico, horas, possuiGestao } = values;

  if (tipoServico === 'Implantação Tradicional') {
    if (horas === 'Mais de 1000') return 'A';
    if (horas === 'De 200 a 1000') return 'B';
    if (horas === 'Menos de 200') return 'C';
    return null;
  }

  if (tipoServico === 'Rollout') return 'D';
  if (tipoServico === 'Upgrade de Release') return 'E';
  if (tipoServico === 'Customização') return 'F';
  if (tipoServico === 'Serviços Recorrente') {
    return possuiGestao === 'Sim' ? 'G' : 'H';
  }

  return null;
}

function generateMatriz() {
  const values = {
    tipoServico: tipoServico.value,
    horas: horas.value,
    possuiGestao: form.possuiGestao.value,
    possuiIntegracao: possuiIntegracao.checked,
    possuiLegado: possuiLegado.checked,
    possuiCustomizacao: possuiCustomizacao.checked
  };

  const profile = mapProfile(values);
  if (!profile) {
    renderMessage('Não foi possível identificar o tipo de serviço. Verifique os campos e tente novamente.');
    return;
  }

  const selected = templates.filter(template => {
    const flag = template[profileColumnKey[profile]];
    return typeof flag === 'string' && flag.trim().toUpperCase() === 'X';
  });

  if (values.tipoServico !== 'Serviços Recorrente') {
    if (values.possuiIntegracao) includeTemplate(selected, 'MIT055');
    if (values.possuiLegado) includeTemplate(selected, 'MIT053');
    if (values.possuiCustomizacao) includeTemplate(selected, 'MIT044');
  }

  renderResult(selected, profile);
}

async function exportAsPng() {
  if (!resultArea.innerHTML.trim()) {
    renderMessage('Gere a matriz antes de tentar exportar.');
    return;
  }

  try {
    const html2canvasFn = window.html2canvas;
    if (!html2canvasFn) {
      renderMessage('Biblioteca html2canvas não foi carregada.');
      return;
    }

    const canvas = await html2canvasFn(resultArea, {
      backgroundColor: '#ffffff',
      scale: 2
    });
    const link = document.createElement('a');
    link.download = 'matriz-de-complexidade.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    renderMessage('Erro ao gerar PNG: ' + (error.message || error));
    console.error(error);
  }
}

async function exportAsPdf() {
  if (!resultArea.innerHTML.trim()) {
    renderMessage('Gere a matriz antes de tentar exportar.');
    return;
  }

  try {
    const html2canvasFn = window.html2canvas;
    if (!html2canvasFn) {
      renderMessage('Biblioteca html2canvas não foi carregada.');
      return;
    }

    const canvas = await html2canvasFn(resultArea, {
      backgroundColor: '#ffffff',
      scale: 2
    });

    const imgData = canvas.toDataURL('image/png');
    const jsPDFConstructor = window.jspdf?.jsPDF || window.jspdf || window.jsPDF;
    if (!jsPDFConstructor) {
      renderMessage('Biblioteca jsPDF não está disponível para exportação.');
      return;
    }

    const pdf = new jsPDFConstructor({ orientation: 'landscape', unit: 'pt', format: 'a4' });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const ratio = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
    const imgWidth = canvas.width * ratio;
    const imgHeight = canvas.height * ratio;
    const marginX = (pageWidth - imgWidth) / 2;
    const marginY = (pageHeight - imgHeight) / 2;
    pdf.addImage(imgData, 'PNG', marginX, marginY, imgWidth, imgHeight);
    pdf.save('matriz-de-complexidade.pdf');
  } catch (error) {
    renderMessage('Erro ao gerar PDF: ' + (error.message || error));
    console.error(error);
  }
}

function includeTemplate(resultList, code) {
  const exists = resultList.some(item => item.code === code && item.name);
  if (!exists) {
    const template = templates.find(item => item.code === code);
    if (template) resultList.push(template);
  }
}

function renderMessage(message) {
  resultInfo.innerHTML = `<div class="message">${message}</div>`;
  resultArea.innerHTML = '';
}

function renderResult(resultList, profile) {
  resultInfo.innerHTML = `Perfil selecionado: <strong>${profile}</strong> (${tipoServico.value})`;

  if (resultList.length === 0) {
    renderMessage('Nenhum documento aplicável.');
    setExportButtonsEnabled(false);
    return;
  }

  setExportButtonsEnabled(true);
  const rows = resultList
    .sort((a, b) => {
      const order = {
        'Preparação': 0,
        'Refinamento': 1,
        'Realização': 2,
        'Operação': 3,
        'Monitoramento e controle': 4,
        'N/A': 5
      };
      const pa = order[a.phase] ?? 99;
      const pb = order[b.phase] ?? 99;
      if (pa !== pb) return pa - pb;
      return a.code.localeCompare(b.code);
    })
    .map(template => {
      const note = template.note == null ? '' : template.note;
      let rowClass = '';
      if (template.required === 'Sim') rowClass = 'required-sim';
      else if (template.required === 'Sim*') rowClass = 'required-sim-asterisco';
      else if (template.required === 'Não') rowClass = 'required-nao';
      return `
      <tr class="${rowClass}">
        <td>${template.phase}</td>
        <td>${template.code}</td>
        <td>${template.name}</td>
        <td>${template.acceptance}</td>
        <td>${template.required}</td>
        <td>${note}</td>
      </tr>
    `
    })
    .join('');

  resultArea.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Fase</th>
          <th>Código</th>
          <th>Nome do Template</th>
          <th>Forma de Aceite</th>
          <th>Obrigatório?</th>
          <th>Observação</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function resetForm() {
  form.reset();
  resultInfo.innerHTML = '';
  resultArea.innerHTML = '';
  possuiIntegracao.checked = false;
  possuiLegado.checked = false;
  possuiCustomizacao.checked = false;
  updateVisibility();
  setExportButtonsEnabled(false);
}

tipoServico.addEventListener('change', updateVisibility);
generateButton.addEventListener('click', generateMatriz);
resetButton.addEventListener('click', resetForm);
exportPngButton.addEventListener('click', exportAsPng);
exportPdfButton.addEventListener('click', exportAsPdf);

const initializePage = () => {
  updateVisibility();
  setExportButtonsEnabled(false);
};

document.addEventListener('DOMContentLoaded', initializePage);

if (document.readyState !== 'loading') {
  initializePage();
}
