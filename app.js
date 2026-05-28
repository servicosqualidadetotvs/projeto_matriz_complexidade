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
const fileUpload = document.getElementById('fileUpload');
const extractButton = document.getElementById('extractButton');
const extractedData = document.getElementById('extractedData');
const evUploadSection = document.getElementById('evUploadSection');
const existsEvMatrixRadios = Array.from(document.getElementsByName('existsEvMatrix'));
const customizacaoValue = document.getElementById('customizacaoValue');
const integradosValue = document.getElementById('integradosValue');
const migracaoValue = document.getElementById('migracaoValue');

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

const templateLinks = {
  'MIT013': 'https://docs.google.com/spreadsheets/d/1X-b-NeCWBMJs5NCI3xnpqb0qp0J988QZSCP-iTocHWc/copy',
  'MIT065': 'https://docs.google.com/spreadsheets/d/1fzjtCx9Iv3IioiDqPsLfl85AiMDcYSrZr5PJByDvjYw/copy',
  'MIT021': 'https://docs.google.com/document/d/1w6MLAmDR0wO0V_InLfwTjeKgMbDhiYp4XpEIryBwz0k/copy',
  'MIT024': 'https://docs.google.com/presentation/d/1AOZBj2Gw1swncW6IWJMc-Dij8FaLfzC7WwSunW9dRQc/copy',
  'MIT030': 'https://docs.google.com/document/d/1xiZ7iJBsYti5oLtNV-lA1P7Ew-zUuOPHZJuQF5iQNqM/copy',
  'MIT032': 'https://drive.google.com/file/d/1WMWaAjgzoSAL5uurq7ZR6_LDBh22Qv6L/view?usp=sharing',
  'MIT005': 'https://docs.google.com/document/d/1OBLItP969bwSDD6BiFvXkQZfSqHGbQm3jCDwdpKLHjQ/copy',
  'MIT008 / 007': 'https://docs.google.com/presentation/d/1y-Hk9C25V1g-_r9eEfFmmh2jYNkNHdHgFg_zbXnYyoA/copy',
  'MIT006': 'https://docs.google.com/spreadsheets/d/129SS_U2uvyOiqG0q3r_0QUwPjYiC82sBL2L6OcgDRDE/copy',
  'MIT010': 'https://docs.google.com/document/d/1HAMy3d3azSP1EJx1XhYsNd-_rSrZ2k3VAjv9Fm6Lnxo/copy',
  'MIT031': 'https://docs.google.com/document/d/1YsIei5gGQ_yEtLH1d4yuIi5HWz2bxyEFiGtCFIA0c4/copy',
  'MIT062': 'https://docs.google.com/document/d/1EDDMgOx5BAfTplsAMXPoJ3OReNNku--pDWTP89ODZoA/copy',
  'MIT043': 'https://docs.google.com/document/d/1KXUlYLb0Hmd2zduoAlpkMPdCmiyiY8qWTND_y3gOx4o/copy',
  'MIT044': 'https://docs.google.com/document/d/1kBLTabtNTVE-NPFnyENTMxVn__EXuWkoh-1Qc_phmIQ/copy',
  'MIT045': 'https://docs.google.com/spreadsheets/d/17PaWk6QYnX135L8pSqGw_KahFiyltjXZunMMK22mlU8/copy',
  'MIT053': 'https://docs.google.com/spreadsheets/d/1tNI9F1pHq6p3y-vkHHC1woFwxkqCZz4XWUQUhtCUrc8/copy',
  'MIT055': 'https://docs.google.com/spreadsheets/d/1GTQzKjCIw1nwGt6HJSby3GYEfg-TwLeG45xezxelLhU/copy',
  'MIT054': 'https://docs.google.com/spreadsheets/d/1xyakTWIlSvAtqMDMDuOhE_U1DNoh4FlS-qHR9c_21VQ/copy',
  'MIT041': 'https://docs.google.com/document/d/1WJURsOWgPNbmWBgj1KsTKMEZQSp16k6UOjKsXlYAu18/copy'
};

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

function updateEvMatrixVisibility() {
  const selectedValue = existsEvMatrixRadios.find(radio => radio.checked)?.value;
  const shouldShow = selectedValue === 'Sim';
  evUploadSection.classList.toggle('hidden', !shouldShow);

  if (!shouldShow) {
    fileUpload.value = '';
    extractedData.classList.add('hidden');
    clearEvFields();
  }
}

function clearEvFields() {
  customizacaoValue.value = '';
  integradosValue.value = '';
  migracaoValue.value = '';
}

function fillEvFields(data) {
  if (!data || !data.evValues) {
    clearEvFields();
    return;
  }

  const { customizacao, integrados, migracao } = data.evValues;
  console.log('fillEvFields - raw extracted values:', { customizacao, integrados, migracao });
  const mapCustomizacaoLabel = (score) => {
    if (score == null) return '';
    const n = Number(score);
    if (isNaN(n)) return '';
    if (n >= 10) return 'Extremo';
    if (n >= 7) return 'Alto';
    if (n >= 4) return 'Moderado';
    return 'Baixo';
  };

  const mapIntegradosMigracaoLabel = (score) => {
    if (score == null) return '';
    const n = Number(score);
    if (isNaN(n)) return '';
    if (n >= 13) return 'Extremo';
    if (n >= 9) return 'Alto';
    if (n >= 5) return 'Moderado';
    return 'Baixo';
  };

  const labelCustom = mapCustomizacaoLabel(customizacao);
  const labelIntegrados = mapIntegradosMigracaoLabel(integrados);
  const labelMigracao = mapIntegradosMigracaoLabel(migracao);

  console.log('fillEvFields - mapped labels:', { labelCustom, labelIntegrados, labelMigracao });

  customizacaoValue.value = labelCustom;
  integradosValue.value = labelIntegrados;
  migracaoValue.value = labelMigracao;

  possuiCustomizacao.checked = !!labelCustom && labelCustom !== 'Baixo';
  possuiIntegracao.checked = !!labelIntegrados && labelIntegrados !== 'Baixo';
  possuiLegado.checked = !!labelMigracao && labelMigracao !== 'Baixo';
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
        <td>${templateLinks[template.code] ? `<a href="${templateLinks[template.code]}" target="_blank" rel="noopener noreferrer">${template.name}</a>` : template.name}</td>
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
  clearEvFields();
  updateVisibility();
  setExportButtonsEnabled(false);
}

async function extractPdfData() {
  if (!fileUpload.files || !fileUpload.files[0]) {
    alert('Selecione um arquivo PDF primeiro.');
    return;
  }

  try {
    const file = fileUpload.files[0];
    const arrayBuffer = await file.arrayBuffer();
    
    // Configurar pdf.js
    if (typeof pdfjsLib === 'undefined') {
      alert('Biblioteca PDF.js não está disponível.');
      return;
    }
    
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
    
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    let fullText = '';
    
    // Extrair texto de todas as páginas
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n';
    }
    
    // Processar o texto para extrair estrutura
    const extractedContent = parseComplexityData(fullText);
    
    console.log('Texto extraído do PDF (primeiros 500 chars):', fullText.substring(0, 500));
    console.log('Dados parseados:', extractedContent);
    
    fillEvFields(extractedContent);
    extractedData.classList.add('hidden');
    
  } catch (error) {
    alert('Erro ao processar PDF: ' + (error.message || error));
    console.error(error);
  }
}

function parseComplexityData(text) {
  const rawText = text.replace(/\r\n?/g, '\n').replace(/\t/g, ' ');
  const normalizedText = rawText
    .replace(/\n{2,}/g, '\n')
    .replace(/[ ]{2,}/g, ' ')
    .replace(/ \n/g, '\n')
    .replace(/\n /g, '\n')
    .trim();
  const singleLineText = normalizedText.replace(/\n+/g, ' ');

  const lines = normalizedText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return null;

  const data = {
    title: '',
    evaluator: '',
    complexityLevel: '',
    totalScore: 0,
    implications: '',
    sections: [],
    evValues: {
      customizacao: null,
      integrados: null,
      migracao: null
    }
  };

  // Título e avaliador via texto contínuo
  const titleEvalMatch = singleLineText.match(/RESULTADO(?: DA AVALIAÇÃO)?\s*[:\-–]?\s*([^\d]+?)\s+por\s+([A-ZÁÉÍÓÚ][^\d]+?)(?=\s+(BAIXA|MÉDIA|ALTA|EXTREMA)|\s+\d+\s+pontos|$)/i);
  if (titleEvalMatch) {
    data.title = titleEvalMatch[1].trim();
    data.evaluator = titleEvalMatch[2].trim();
  }

  // Título fallback a partir da linha após RESULTADO
  if (!data.title) {
    const resultadoLine = lines.findIndex(line => line.toUpperCase().includes('RESULTADO'));
    if (resultadoLine >= 0 && resultadoLine + 1 < lines.length) {
      const candidate = lines[resultadoLine + 1];
      if (!candidate.toLowerCase().startsWith('por ')) {
        data.title = candidate;
      }
    }
  }

  // Avaliador fallback se não identificado no bloco contínuo
  if (!data.evaluator) {
    const evaluatorMatch = singleLineText.match(/\bpor\s+([A-ZÁÉÍÓÚ][^\d]+?)(?=\s+(BAIXA|MÉDIA|ALTA|EXTREMA)|\s+\d+\s+pontos|$)/i);
    if (evaluatorMatch) {
      data.evaluator = evaluatorMatch[1].trim();
    }
  }

  // Nível de complexidade
  const levelMatch = singleLineText.match(/\b(BAIXA|MÉDIA|ALTA|EXTREMA)\b/i);
  if (levelMatch) {
    data.complexityLevel = levelMatch[1].toUpperCase();
  }

  // Pontuação total
  const scoreMatch = singleLineText.match(/(\d{1,3})\s+pontos/i);
  if (scoreMatch) {
    data.totalScore = parseInt(scoreMatch[1], 10);
  }

  // Implicações / risco
  const implicationsMatch = singleLineText.match(/IMPLICA(?:Ç(?:O|ÕES)|ÇÕES)(?:\s*[\/\-:]\s*RISCO)?\s*[:\-–]?\s*(.+?)(?=(?:\d\.\s+[A-ZÁÉÍÓÚ])|(?:\b[A-E]\.\s)|$)/i);
  if (implicationsMatch) {
    data.implications = implicationsMatch[1].trim();
  } else {
    const riskIndex = lines.findIndex(line => /IMPLICA(?:Ç(?:O|ÕES)|ÇÕES)|RISCO/i.test(line));
    if (riskIndex >= 0 && riskIndex + 1 < lines.length) {
      data.implications = lines[riskIndex + 1];
    }
  }

  const sectionRegex = /(?<number>\d+)\.\s+(?<title>[A-ZÁÉÍÓÚ][A-ZÁÉÍÓÚÇÉÁÃÕÔÜÍÚ0-9\s\/\-\(\)]*?)(?:\s+(?<points>\d{1,3})\s*pts?)?(?=\s+[A-E]\.\s|\s+\d+\.\s|$)/g;
  const sectionMatches = [];

  let sectionMatch;
  while ((sectionMatch = sectionRegex.exec(singleLineText)) !== null) {
    sectionMatches.push({
      index: sectionMatch.index,
      end: sectionRegex.lastIndex,
      title: sectionMatch.groups.title.trim(),
      points: sectionMatch.groups.points ? parseInt(sectionMatch.groups.points, 10) : 0
    });
  }

  for (let i = 0; i < sectionMatches.length; i++) {
    const section = sectionMatches[i];
    const nextSection = sectionMatches[i + 1];
    const sectionBody = singleLineText.slice(section.end, nextSection ? nextSection.index : singleLineText.length).trim();

    const items = [];
    const itemRegex = /([A-E])\.\s+(.+?)\s+(\d+\s*[×xX]\s*\d+)\s+([A-ZÁÉÍÓÚ]+)\s+(\d{1,3})/g;
    let itemMatch;
    while ((itemMatch = itemRegex.exec(sectionBody)) !== null) {
      items.push({
        label: `${itemMatch[1]}.`,
        description: itemMatch[2].trim(),
        calculation: itemMatch[3].trim(),
        level: itemMatch[4].trim(),
        score: parseInt(itemMatch[5], 10)
      });
    }

    data.sections.push({
      title: section.title,
      points: section.points,
      items
    });
  }

  // Caso não encontre seções, tente extrair itens globalmente
  if (data.sections.length === 0) {
    const globalItems = [];
    const itemRegex = /([A-E])\.\s+(.+?)\s+(\d+\s*[×xX]\s*\d+)\s+([A-ZÁÉÍÓÚ]+)\s+(\d{1,3})/g;
    let itemMatch;
    while ((itemMatch = itemRegex.exec(singleLineText)) !== null) {
      globalItems.push({
        label: `${itemMatch[1]}.`,
        description: itemMatch[2].trim(),
        calculation: itemMatch[3].trim(),
        level: itemMatch[4].trim(),
        score: parseInt(itemMatch[5], 10)
      });
    }
    if (globalItems.length > 0) {
      data.sections.push({
        title: 'Itens extraídos',
        points: 0,
        items: globalItems
      });
    }
  }

  const evValues = {
    customizacao: null,
    integrados: null,
    migracao: null
  };

  const normalizeText = str => (str || '').toUpperCase().replace(/\s+/g, ' ').trim();

  const findSectionScore = (sectionRegex) => {
    const sectionMatch = normalizedText.match(sectionRegex);
    if (!sectionMatch) return null;
    const sectionText = sectionMatch[0];

    const scorePattern = /\d+\s*[×xX]\s*\d+\s+[A-ZÁÉÍÓÚ]+\s+(\d{1,3})\b/;
    const scoreMatch = sectionText.match(scorePattern);
    if (scoreMatch) {
      return parseInt(scoreMatch[1], 10);
    }

    const numbers = Array.from(sectionText.matchAll(/(\d{1,3})\b/g), m => parseInt(m[1], 10)).filter(n => !Number.isNaN(n));
    return numbers.length ? numbers[numbers.length - 1] : null;
  };

  evValues.customizacao = findSectionScore(/B\.\s*GRAU DE CUSTOMIZAÇÃO[\s\S]*?(?=(?:[A-E]\.\s*[A-ZÁÉÍÓÚ]|$))/i);
  evValues.integrados = findSectionScore(/C\.\s*QUANTIDADE DE PROCESSOS INTEGRADOS[\s\S]*?(?=(?:[A-E]\.\s*[A-ZÁÉÍÓÚ]|$))/i);
  evValues.migracao = findSectionScore(/E\.\s*MIGRAÇÃO DE DADOS\s*\(VOLUME\/QUALIDADE\)[\s\S]*?(?=(?:[A-E]\.\s*[A-ZÁÉÍÓÚ]|$))/i);

  console.log('parseComplexityData - section-only evValues:', evValues);

  data.evValues = evValues;

  console.log('parseComplexityData - evValues:', evValues);

  const hasValidData = data.title || data.sections.length > 0 || data.totalScore > 0 || data.complexityLevel;
  console.log('Validação final - hasValidData:', hasValidData);
  console.log('  title:', !!data.title, '|', data.title);
  console.log('  sections:', data.sections.length);
  console.log('  totalScore:', data.totalScore);
  console.log('  complexityLevel:', data.complexityLevel);

  return hasValidData ? data : null;
}

function displayExtractedData(data) {
  const hasData = data && (data.title || data.evaluator || data.complexityLevel || data.totalScore > 0 || data.implications || data.sections.length > 0);
  if (!hasData) {
    extractedData.innerHTML = '<p>Nenhum dado válido foi extraído do documento.</p>';
    extractedData.classList.remove('hidden');
    return;
  }
  
  let html = '<div class="complexity-scorecard">';
  
  // Cabeçalho
  if (data.title) {
    html += `<h2>${escapeHtml(data.title)}</h2>`;
  }
  if (data.evaluator) {
    html += `<p class="evaluator">por ${escapeHtml(data.evaluator)}</p>`;
  }
  
  // Nível de complexidade em destaque
  if (data.complexityLevel) {
    html += `<div class="complexity-level">
      <div class="level-label">NÍVEL DE COMPLEXIDADE</div>
      <div class="level-badge ${data.complexityLevel.toLowerCase()}">${escapeHtml(data.complexityLevel)}</div>
    </div>`;
  }
  
  // Pontuação total
  if (data.totalScore > 0) {
    html += `<p class="total-score">Pontuação total: <strong>${data.totalScore}</strong> pontos</p>`;
  }
  
  // Implicações/Risco
  if (data.implications) {
    html += `<div class="implications">
      <h3>IMPLICAÇÕES / RISCO</h3>
      <p>${escapeHtml(data.implications)}</p>
    </div>`;
  }
  
  // Seções com itens
  if (data.sections.length > 0) {
    html += '<div class="sections">';
    
    for (const section of data.sections) {
      html += `<div class="section">
        <div class="section-header">
          <h3>${escapeHtml(section.title)}</h3>
          ${section.points > 0 ? `<span class="section-points">${section.points} pts</span>` : ''}
        </div>`;
      
      if (section.items.length > 0) {
        html += '<div class="items">';
        for (const item of section.items) {
          html += `<div class="item">
            <div class="item-label">${escapeHtml(item.label)}</div>`;
          
          if (item.description) {
            html += `<div class="item-description">${escapeHtml(item.description)}</div>`;
          }
          
          html += `<div class="item-footer">`;
          if (item.calculation) {
            html += `<span class="calculation">${escapeHtml(item.calculation)}</span>`;
          }
          if (item.level) {
            html += `<span class="level ${item.level.toLowerCase()}">${escapeHtml(item.level)}</span>`;
          }
          if (item.score > 0) {
            html += `<span class="score">${item.score}</span>`;
          }
          html += `</div></div>`;
        }
        html += '</div>';
      }
      
      html += '</div>';
    }
    
    html += '</div>';
  }
  
  html += '</div>';
  
  extractedData.innerHTML = html;
  extractedData.classList.remove('hidden');
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

tipoServico.addEventListener('change', updateVisibility);
generateButton.addEventListener('click', generateMatriz);
resetButton.addEventListener('click', resetForm);
exportPngButton.addEventListener('click', exportAsPng);
exportPdfButton.addEventListener('click', exportAsPdf);
extractButton.addEventListener('click', extractPdfData);
existsEvMatrixRadios.forEach(radio => radio.addEventListener('change', updateEvMatrixVisibility));

const initializePage = () => {
  updateVisibility();
  updateEvMatrixVisibility();
  setExportButtonsEnabled(false);
};

document.addEventListener('DOMContentLoaded', initializePage);

if (document.readyState !== 'loading') {
  initializePage();
}
