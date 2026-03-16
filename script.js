// ===== PWA INSTALL =====
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('install-banner').classList.add('show');
});

document.getElementById('install-btn').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    deferredPrompt = null;
    document.getElementById('install-banner').classList.remove('show');
  }
});

document.getElementById('close-banner').addEventListener('click', () => {
  document.getElementById('install-banner').classList.remove('show');
});

// ===== DATA =====
const phases = [
  {
    id: 1,
    tag: "Fase 01 · Fundamentos",
    icon: "🌱",
    title: "Lógica & Python",
    subtitle: "Base sólida em programação, raciocínio algorítmico e matemática essencial para IA.",
    duration: "3–4 meses",
    color: "#1AD4A4",
    topics: [
      { section: "Lógica de Programação", items: ["Algoritmos e pensamento computacional", "Condicionais, laços e funções", "Estruturas básicas de dados"] },
      { section: "Python", items: ["Tipos, listas, dicionários, sets", "OOP: classes, herança, polimorfismo", "Bibliotecas: os, json, re, datetime"] },
      { section: "Matemática para IA", items: ["Álgebra Linear: vetores e matrizes", "Cálculo: derivadas e gradiente", "Estatística e probabilidade"] }
    ],
    resources: ["CS50 (Harvard/edX)", "Curso em Vídeo", "Khan Academy", "3Blue1Brown", "Livro: Entendendo Algoritmos"],
    project: "Script Python para automatizar tarefas do dia a dia (renomear arquivos, processar CSVs, fazer scraping básico)."
  },
  {
    id: 2,
    tag: "Fase 02 · Desenvolvimento",
    icon: "⚙️",
    title: "Engenharia de Software",
    subtitle: "Práticas modernas de desenvolvimento: APIs, bancos de dados, testes e boas práticas.",
    duration: "4–5 meses",
    color: "#6c63ff",
    topics: [
      { section: "Algoritmos & Complexidade", items: ["Busca e ordenação (BFS, DFS, QuickSort)", "Árvores, grafos, heap", "Notação Big-O e análise de complexidade"] },
      { section: "Banco de Dados", items: ["SQL avançado: JOINs, índices, subconsultas", "PostgreSQL e MongoDB na prática", "ORM com SQLAlchemy"] },
      { section: "APIs & Web", items: ["REST com FastAPI / Flask", "Autenticação JWT e OAuth2", "Documentação OpenAPI/Swagger"] },
      { section: "Boas Práticas", items: ["Git, GitHub, pull requests, code review", "Clean Code, SOLID, Design Patterns", "Testes com pytest e TDD básico", "Docker e docker-compose"] }
    ],
    resources: ["LeetCode (easy/medium)", "SQLZoo", "FastAPI Docs", "Livro: Clean Code", "Pro Git (gratuito)"],
    project: "API REST completa com autenticação, banco PostgreSQL e testes automatizados — publicada no GitHub."
  },
  {
    id: 3,
    tag: "Fase 03 · Inteligência Artificial",
    icon: "🧠",
    title: "Machine Learning & IA",
    subtitle: "Do ML clássico ao deep learning, NLP e visão computacional com projetos práticos.",
    duration: "5–6 meses",
    color: "#ffa94d",
    topics: [
      { section: "Machine Learning Clássico", items: ["Supervisionado, não-supervisionado, RL", "Regressão, KNN, SVM, Random Forest", "Métricas: F1, ROC-AUC, RMSE", "Overfitting, validação cruzada, regularização"] },
      { section: "Análise de Dados", items: ["NumPy e álgebra linear numérica", "Pandas: manipulação e limpeza de dados", "Visualização: Matplotlib, Seaborn, Plotly", "Feature engineering"] },
      { section: "Deep Learning", items: ["Redes neurais, backpropagation", "PyTorch: tensores, autograd, módulos", "CNNs para visão computacional", "RNNs e LSTMs para séries temporais"] },
      { section: "NLP", items: ["Tokenização, embeddings, TF-IDF", "BERT e Transformers via Hugging Face", "Pipeline de NLP com spaCy"] }
    ],
    resources: ["Curso ML Andrew Ng (Coursera)", "Fast.ai (gratuito)", "Hugging Face docs", "Livro: Hands-On ML (Géron)", "Kaggle datasets"],
    project: "Pipeline de ML completo: análise exploratória + modelo preditivo + classificador de sentimentos em avaliações de produtos."
  },
  {
    id: 4,
    tag: "Fase 04 · Avançado",
    icon: "🚀",
    title: "LLMs & MLOps",
    subtitle: "Modelos de linguagem, agentes autônomos, fine-tuning e deploy de modelos em produção.",
    duration: "4–6 meses",
    color: "#ff6b6b",
    topics: [
      { section: "Large Language Models", items: ["Arquitetura Transformer e atenção", "GPT, BERT, LLaMA: diferenças e usos", "Prompt Engineering: zero/few-shot, CoT", "RAG: LLMs + bases de conhecimento", "Fine-tuning com LoRA/QLoRA"] },
      { section: "Agentes de IA", items: ["LangChain, LlamaIndex, CrewAI", "Tools, plugins e APIs externas", "Multi-agent systems", "Avaliação e guardrails"] },
      { section: "MLOps & Deploy", items: ["Versionamento: MLflow, W&B", "Docker + Kubernetes básico", "APIs de ML com FastAPI + Gunicorn", "Cloud: AWS SageMaker / Google Vertex AI", "Monitoramento: data drift, degradação"] },
      { section: "Tópicos Avançados (escolha)", items: ["Visão: YOLO, modelos de difusão", "Reinforcement Learning: PPO, Gymnasium", "Graph Neural Networks", "IA Responsável: SHAP, LIME, fairness"] }
    ],
    resources: ["Paper: Attention Is All You Need", "DeepLearning.AI (LLM courses)", "LangChain docs", "Livro: Designing ML Systems (Huyen)", "Made With ML (Mohandas)"],
    project: "Agente autônomo com RAG que pesquisa na web, resume documentos e responde perguntas — deployado como API pública."
  }
];

// ===== RENDER PHASE CARDS =====
const grid = document.getElementById('phases-grid');

phases.forEach(p => {
  const card = document.createElement('div');
  card.className = 'phase-card';
  card.style.setProperty('--card-accent', p.color);
  card.innerHTML = `
    <div class="card-phase-tag">${p.tag}</div>
    <div class="card-icon">${p.icon}</div>
    <div class="card-title">${p.title}</div>
    <div class="card-subtitle">${p.subtitle}</div>
    <div class="card-footer">
      <span class="card-duration">⏱ ${p.duration}</span>
      <span class="card-arrow">→</span>
    </div>
  `;
  card.addEventListener('click', () => openDetail(p));
  grid.appendChild(card);
});

// ===== DETAIL MODAL =====
function openDetail(p) {
  document.getElementById('detail-overlay').style.setProperty('--detail-accent', p.color);
  document.getElementById('detail-overlay').classList.add('open');
  document.getElementById('d-tag').textContent = p.tag;
  document.getElementById('d-title').textContent = p.icon + ' ' + p.title;
  document.getElementById('d-meta').innerHTML = `
    <span class="detail-badge">⏱ ${p.duration}</span>
    <span class="detail-badge">📚 ${p.resources.length} recursos</span>
    <span class="detail-badge">🛠 Projeto incluído</span>
  `;
  let bodyHTML = '';
  p.topics.forEach(t => {
    bodyHTML += `<div>
      <div class="detail-section-title">${t.section}</div>
      <div class="topic-list">
        ${t.items.map(i => `<div class="topic-item"><span class="topic-dot"></span>${i}</div>`).join('')}
      </div>
    </div>`;
  });
  bodyHTML += `<div>
    <div class="detail-section-title">Recursos Recomendados</div>
    <div class="resource-chips">${p.resources.map(r => `<span class="resource-chip">${r}</span>`).join('')}</div>
  </div>
  <div>
    <div class="detail-section-title">Projeto Prático</div>
    <div class="project-box">🛠 ${p.project}</div>
  </div>`;
  document.getElementById('d-body').innerHTML = bodyHTML;
}

function closeDetail() {
  document.getElementById('detail-overlay').classList.remove('open');
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('detail-overlay')) closeDetail();
}
// ===== RENDER ROADMAP =====
const roadmapContent = document.getElementById('roadmap-content');
const phaseColors = ["#1AD4A4", "#6c63ff", "#ffa94d", "#ff6b6b"];

phases.forEach((p, pi) => {
  const pDiv = document.createElement('div');
  pDiv.className = 'roadmap-phase';
  pDiv.style.setProperty('--phase-color', phaseColors[pi]);
  pDiv.dataset.phaseIndex = pi;

  const topics = p.topics.flatMap(t => t.items.map(i => ({ section: t.section, label: i })));

  pDiv.innerHTML = `
    <div class="roadmap-phase-header" onclick="togglePhase(this)">
      <div class="phase-number" style="--phase-color:${phaseColors[pi]}">${pi + 1}</div>
      <div class="phase-name">${p.icon} ${p.title} <span style="color:var(--muted);font-weight:400;font-size:0.8rem">· ${p.duration}</span></div>
      <div class="phase-toggle">▾</div>
    </div>
    <div class="phase-progress-bar">
      <div class="phase-progress-fill" style="width:0%; background:${phaseColors[pi]}"></div>
    </div>
    <div class="roadmap-items">
      ${topics.map((t, ti) => `
        <div class="roadmap-item" data-phase="${pi}" data-item="${ti}">
          <div class="roadmap-item-header">
            <div class="item-status" onclick="toggleStatus(this, event)" title="Marcar como feito"></div>
            <div class="item-title">${t.label}</div>
            <button class="item-expand-btn" onclick="toggleItemBody(this, event)">+ notas</button>
          </div>
          <div class="roadmap-item-body">
            <textarea class="notes-area" placeholder="Anotações sobre '${t.label}'..."></textarea>
            <div class="attach-area">
              <label class="attach-btn">
                📎 Anexar arquivo
                <input type="file" class="file-input" multiple onchange="handleFiles(this)">
              </label>
              <div class="attached-files" id="files-${pi}-${ti}"></div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  roadmapContent.appendChild(pDiv);
});

function togglePhase(header) {
  header.parentElement.classList.toggle('collapsed');
}

function toggleStatus(el, e) {
  e.stopPropagation();
  el.classList.toggle('done');
  el.textContent = el.classList.contains('done') ? '✓' : '';
  
  const phase = el.closest('.roadmap-phase');
  updatePhaseProgress(phase);
  updateRoadmapProgress();
  saveRoadmapState();
}

function updatePhaseProgress(phaseElement) {
  const items = phaseElement.querySelectorAll('.item-status');
  const doneItems = phaseElement.querySelectorAll('.item-status.done');
  const percentage = items.length > 0 ? Math.round((doneItems.length / items.length) * 100) : 0;
  
  const progressBar = phaseElement.querySelector('.phase-progress-fill');
  progressBar.style.width = percentage + '%';
}

function updateRoadmapProgress() {
  const allPhases = document.querySelectorAll('.roadmap-phase');
  let totalPercentage = 0;
  
  allPhases.forEach(phase => {
    const items = phase.querySelectorAll('.item-status');
    const doneItems = phase.querySelectorAll('.item-status.done');
    const phasePercentage = items.length > 0 ? (doneItems.length / items.length) * 100 : 0;
    totalPercentage += phasePercentage;
  });
  
  const avg = allPhases.length > 0 ? Math.round(totalPercentage / allPhases.length) : 0;
  document.getElementById('roadmap-pct').textContent = avg + '%';
  document.getElementById('roadmap-fill').style.width = avg + '%';
}

function saveRoadmapState() {
  const state = {};
  document.querySelectorAll('.roadmap-item').forEach(item => {
    const phase = item.dataset.phase;
    const itemIndex = item.dataset.item;
    const key = `roadmap-${phase}-${itemIndex}`;
    const isDone = item.querySelector('.item-status').classList.contains('done');
    state[key] = isDone;
  });
  localStorage.setItem('roadmap-state', JSON.stringify(state));
}

function loadRoadmapState() {
  const saved = localStorage.getItem('roadmap-state');
  if (saved) {
    const state = JSON.parse(saved);
    Object.keys(state).forEach(key => {
      if (state[key]) {
        const [, phase, item] = key.split('-');
        const itemEl = document.querySelector(`.roadmap-item[data-phase="${phase}"][data-item="${item}"]`);
        if (itemEl) {
          const status = itemEl.querySelector('.item-status');
          status.classList.add('done');
          status.textContent = '✓';
        }
      }
    });
    
    document.querySelectorAll('.roadmap-phase').forEach(updatePhaseProgress);
    updateRoadmapProgress();
  }
}

function toggleItemBody(btn, e) {
  e.stopPropagation();
  const body = btn.closest('.roadmap-item').querySelector('.roadmap-item-body');
  body.classList.toggle('open');
  btn.textContent = body.classList.contains('open') ? '− fechar' : '+ notas';
}

function handleFiles(input) {
  const container = input.closest('.attach-area').querySelector('.attached-files');
  Array.from(input.files).forEach(file => {
    const chip = document.createElement('div');
    chip.className = 'file-chip';
    chip.innerHTML = `📄 ${file.name} <span class="file-chip-remove" onclick="this.parentElement.remove()">✕</span>`;
    container.appendChild(chip);
  });
  input.value = '';
}
// ===== PROGRESS CARDS =====
// Render progress cards HTML
const progressGrid = document.getElementById('progress-grid');
const progressCardsData = [
  {
    id: 'card1',
    icon: '🐍',
    title: 'Python Fundamentos',
    subtitle: 'Fase 1 · Linguagem principal',
    color: '#1AD4A4',
    milestones: ['Variáveis e tipos de dados', 'Funções e controle de fluxo', 'Orientação a Objetos', 'Manipulação de arquivos']
  },
  {
    id: 'card2',
    icon: '📐',
    title: 'Matemática para IA',
    subtitle: 'Fase 2 · Álgebra Linear + Cálculo',
    color: '#6c63ff',
    milestones: ['Vetores e matrizes', 'Derivadas e gradiente', 'Probabilidade e Bayes']
  },
  {
    id: 'card3',
    icon: '🏗️',
    title: 'Estruturas de Dados',
    subtitle: 'Fase 3 · Algoritmos',
    color: '#ffa94d',
    milestones: ['Arrays e listas ligadas', 'Árvores e grafos', 'Big-O notation']
  },
  {
    id: 'card4',
    icon: '🤖',
    title: '(Preencha como quiser)',
    subtitle: 'Fase - · Preencha como quiser',
    color: '#ff6b6b',
    milestones: ['Milestone 1', 'Milestone 2', 'Milestone 3']
  }
];

progressCardsData.forEach(cardData => {
  const card = document.createElement('div');
  card.className = 'prog-card';
  card.style.setProperty('--prog-color', cardData.color);
  card.dataset.cardId = cardData.id;
  card.innerHTML = `
    <div class="prog-card-top">
      <span class="prog-card-icon">${cardData.icon}</span>
      <span class="prog-percent">0%</span>
    </div>
    <div>
      <div class="prog-card-title">${cardData.title}</div>
      <div class="prog-card-sub">${cardData.subtitle}</div>
    </div>
    <div class="progress-bar-track">
      <div class="progress-bar-fill" style="width:0%"></div>
    </div>
    <div class="prog-milestones">
      ${cardData.milestones.map(m => `
        <div class="milestone">
          <span class="milestone-check"></span>
          ${m}
        </div>
      `).join('')}
    </div>
    <div class="notes-section">
      <div class="notes-history" data-notes-id="${cardData.id}-notes"></div>
      <div class="notes-input-container">
        <input type="text" class="notes-input" placeholder="Adicionar anotação..." data-input-id="${cardData.id}">
        <button class="notes-add-btn" onclick="addNote('${cardData.id}')">Adicionar</button>
      </div>
    </div>
    <div class="attachments-section">
      <div class="attachments-history" data-attachments-id="${cardData.id}-attachments"></div>
      <label class="attach-btn">
        📎 Anexar arquivo
        <input type="file" class="file-input" multiple onchange="handleAttachment(this, '${cardData.id}')">
      </label>
    </div>
  `;
  progressGrid.appendChild(card);
});

function initProgressCards() {
  document.querySelectorAll('.prog-card').forEach(card => {
    const cardId = card.dataset.cardId;
    const checkboxes = card.querySelectorAll('.milestone-check');
    const percentDisplay = card.querySelector('.prog-percent');
    const progressBar = card.querySelector('.progress-bar-fill');
    
    loadCardState(cardId, checkboxes);
    
    checkboxes.forEach((check, index) => {
      check.addEventListener('click', function () {
        this.classList.toggle('checked');
        this.textContent = this.classList.contains('checked') ? '✓' : '';
        
        saveCardState(cardId, checkboxes);
        updateCardProgress(card, checkboxes, percentDisplay, progressBar);
        updateOverallProgress();
      });
    });
    
    updateCardProgress(card, checkboxes, percentDisplay, progressBar);
  });
  
  updateOverallProgress();
  loadAllNotes();
  loadAllAttachments();
}

function updateCardProgress(card, checkboxes, percentDisplay, progressBar) {
  const total = checkboxes.length;
  const checked = Array.from(checkboxes).filter(cb => cb.classList.contains('checked')).length;
  const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;
  
  percentDisplay.textContent = percentage + '%';
  progressBar.style.width = percentage + '%';
  card.dataset.progress = percentage;
}

function saveCardState(cardId, checkboxes) {
  const state = Array.from(checkboxes).map(cb => cb.classList.contains('checked'));
  localStorage.setItem(`progress-${cardId}`, JSON.stringify(state));
}

function loadCardState(cardId, checkboxes) {
  const saved = localStorage.getItem(`progress-${cardId}`);
  if (saved) {
    const state = JSON.parse(saved);
    checkboxes.forEach((cb, i) => {
      if (state[i]) {
        cb.classList.add('checked');
        cb.textContent = '✓';
      }
    });
  }
}

function updateOverallProgress() {
  const allCards = document.querySelectorAll('.prog-card');
  let total = 0;
  allCards.forEach(card => total += parseInt(card.dataset.progress || 0));
  const avg = allCards.length > 0 ? Math.round(total / allCards.length) : 0;
  document.getElementById('overall-pct').textContent = avg + '%';
  document.getElementById('overall-fill').style.width = avg + '%';
}

// Notes management
function addNote(cardId) {
  const input = document.querySelector(`[data-input-id="${cardId}"]`);
  const text = input.value.trim();
  
  if (!text) return;
  
  const timestamp = new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const note = {
    text: text,
    timestamp: timestamp,
    id: Date.now()
  };
  
  const notesJson = localStorage.getItem(`notes-${cardId}`);
  const notes = notesJson ? JSON.parse(notesJson) : [];
  notes.push(note);
  localStorage.setItem(`notes-${cardId}`, JSON.stringify(notes));
  
  displayNotes(cardId);
  input.value = '';
}

function removeNote(cardId, noteId) {
  const notesJson = localStorage.getItem(`notes-${cardId}`);
  let notes = notesJson ? JSON.parse(notesJson) : [];
  notes = notes.filter(n => n.id !== noteId);
  localStorage.setItem(`notes-${cardId}`, JSON.stringify(notes));
  displayNotes(cardId);
}

function displayNotes(cardId) {
  const container = document.querySelector(`[data-notes-id="${cardId}-notes"]`);
  const notesJson = localStorage.getItem(`notes-${cardId}`);
  const notes = notesJson ? JSON.parse(notesJson) : [];
  
  container.innerHTML = notes.slice().reverse().map(note => `
    <div class="note-entry">
      <div class="note-content">
        <span class="note-timestamp">${note.timestamp}</span>
        <div class="note-text">${note.text}</div>
      </div>
      <span class="note-remove" onclick="removeNote('${cardId}', ${note.id})">✕</span>
    </div>
  `).join('');
}

function loadAllNotes() {
  ['card1', 'card2', 'card3', 'card4'].forEach(cardId => {
    displayNotes(cardId);
  });
}

document.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && e.target.classList.contains('notes-input')) {
    const cardId = e.target.dataset.inputId;
    addNote(cardId);
  }
});

// Attachments management
function handleAttachment(input, cardId) {
  const files = Array.from(input.files);
  
  if (files.length === 0) return;
  
  const timestamp = new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  const attachmentsJson = localStorage.getItem(`attachments-${cardId}`);
  const attachments = attachmentsJson ? JSON.parse(attachmentsJson) : [];
  
  files.forEach(file => {
    const attachment = {
      name: file.name,
      timestamp: timestamp,
      id: Date.now() + Math.random()
    };
    attachments.push(attachment);
  });
  
  localStorage.setItem(`attachments-${cardId}`, JSON.stringify(attachments));
  
  displayAttachments(cardId);
  input.value = '';
}

function displayAttachments(cardId) {
  const container = document.querySelector(`[data-attachments-id="${cardId}-attachments"]`);
  const attachmentsJson = localStorage.getItem(`attachments-${cardId}`);
  const attachments = attachmentsJson ? JSON.parse(attachmentsJson) : [];
  
  container.innerHTML = attachments.slice().reverse().map(attachment => `
    <div class="attachment-entry">
      <div class="attachment-info">
        <span class="attachment-timestamp">${attachment.timestamp}</span>
        <div class="attachment-name">📄 ${attachment.name}</div>
      </div>
      <span class="attachment-remove" onclick="removeAttachment('${cardId}', ${attachment.id})">✕</span>
    </div>
  `).join('');
}

function removeAttachment(cardId, attachmentId) {
  const attachmentsJson = localStorage.getItem(`attachments-${cardId}`);
  let attachments = attachmentsJson ? JSON.parse(attachmentsJson) : [];
  attachments = attachments.filter(a => a.id !== attachmentId);
  localStorage.setItem(`attachments-${cardId}`, JSON.stringify(attachments));
  displayAttachments(cardId);
}

function loadAllAttachments() {
  ['card1', 'card2', 'card3', 'card4'].forEach(cardId => {
    displayAttachments(cardId);
  });
}
// ===== MATH CALCULATOR =====
function parseVector(str) {
  return str.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x));
}

function parseMatrix(str) {
  return str.split(';').map(row => 
    row.split(',').map(x => parseFloat(x.trim())).filter(x => !isNaN(x))
  ).filter(row => row.length > 0);
}

function calculateVectorOps() {
  const vecA = parseVector(document.getElementById('vectorA').value);
  const vecB = parseVector(document.getElementById('vectorB').value);
  const result = document.getElementById('vector-result');
  
  if (vecA.length === 0 || vecB.length === 0) {
    result.textContent = 'Erro: Digite vetores válidos';
    return;
  }
  
  if (vecA.length !== vecB.length) {
    result.textContent = 'Erro: Vetores devem ter a mesma dimensão';
    return;
  }
  
  const sum = vecA.map((v, i) => v + vecB[i]);
  const diff = vecA.map((v, i) => v - vecB[i]);
  const magA = Math.sqrt(vecA.reduce((acc, v) => acc + v*v, 0)).toFixed(2);
  const magB = Math.sqrt(vecB.reduce((acc, v) => acc + v*v, 0)).toFixed(2);
  
  result.innerHTML = `
    <strong>Soma (A + B):</strong> [${sum.join(', ')}]<br>
    <strong>Subtração (A - B):</strong> [${diff.join(', ')}]<br>
    <strong>Magnitude |A|:</strong> ${magA}<br>
    <strong>Magnitude |B|:</strong> ${magB}
  `;
}

function calculateMatrixOps() {
  const matA = parseMatrix(document.getElementById('matrixA').value);
  const matB = parseMatrix(document.getElementById('matrixB').value);
  const result = document.getElementById('matrix-result');
  
  if (matA.length === 0 || matB.length === 0) {
    result.textContent = 'Erro: Digite matrizes válidas';
    return;
  }
  
  if (matA.length !== matB.length || matA[0].length !== matB[0].length) {
    result.textContent = 'Erro: Matrizes devem ter as mesmas dimensões';
    return;
  }
  
  const sum = matA.map((row, i) => row.map((val, j) => val + matB[i][j]));
  const diff = matA.map((row, i) => row.map((val, j) => val - matB[i][j]));
  
  result.innerHTML = `
    <strong>Soma (A + B):</strong><br>${sum.map(row => '[' + row.join(', ') + ']').join('<br>')}<br><br>
    <strong>Subtração (A - B):</strong><br>${diff.map(row => '[' + row.join(', ') + ']').join('<br>')}
  `;
}

function calculateProducts() {
  const vecU = parseVector(document.getElementById('vectorU').value);
  const vecV = parseVector(document.getElementById('vectorV').value);
  const result = document.getElementById('product-result');
  
  if (vecU.length === 0 || vecV.length === 0) {
    result.textContent = 'Erro: Digite vetores válidos';
    return;
  }
  
  if (vecU.length !== vecV.length) {
    result.textContent = 'Erro: Vetores devem ter a mesma dimensão';
    return;
  }
  
  const dot = vecU.reduce((acc, v, i) => acc + v * vecV[i], 0);
  
  let crossMsg = '';
  if (vecU.length === 3 && vecV.length === 3) {
    const cross = [
      vecU[1] * vecV[2] - vecU[2] * vecV[1],
      vecU[2] * vecV[0] - vecU[0] * vecV[2],
      vecU[0] * vecV[1] - vecU[1] * vecV[0]
    ];
    crossMsg = `<br><strong>Produto Vetorial (U × V):</strong> [${cross.map(v => v.toFixed(2)).join(', ')}]`;
  }
  
  result.innerHTML = `
    <strong>Produto Escalar (U · V):</strong> ${dot.toFixed(2)}${crossMsg}
  `;
}

function calculateLinearAlgebra() {
  const mat = parseMatrix(document.getElementById('matrixDet').value);
  const result = document.getElementById('linear-result');
  
  if (mat.length === 0) {
    result.textContent = 'Erro: Digite uma matriz válida';
    return;
  }
  
  const transpose = mat[0].map((_, colIndex) => mat.map(row => row[colIndex]));
  
  let detMsg = '';
  if (mat.length === 2 && mat[0].length === 2) {
    const det = mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0];
    detMsg = `<strong>Determinante:</strong> ${det.toFixed(2)}<br><br>`;
  }
  
  result.innerHTML = `
    ${detMsg}
    <strong>Transposta:</strong><br>${transpose.map(row => '[' + row.join(', ') + ']').join('<br>')}
  `;
}

// ===== NEURAL NETWORK VISUALIZER =====
function runNeuralNetwork() {
  const code = document.getElementById('nn-code').value;
  const output = document.getElementById('nn-output');
  const canvas = document.getElementById('nn-canvas');
  
  output.innerHTML = '';
  
  const logs = [];
  const originalLog = console.log;
  console.log = function(...args) {
    logs.push(args.join(' '));
    originalLog.apply(console, args);
  };
  
  try {
    eval(code);
    
    if (logs.length > 0) {
      output.innerHTML = logs.map(log => `<div>${log}</div>`).join('');
    }
    
    let network = null;
    try {
      network = eval('createNeuralNetwork()');
    } catch (e) {}
    
    if (network && network.layers && Array.isArray(network.layers)) {
      drawNeuralNetwork(canvas, network);
    }
    
  } catch (error) {
    output.innerHTML = `<div style="color: var(--accent3);">❌ Erro: ${error.message}</div>`;
  } finally {
    console.log = originalLog;
  }
}

function drawNeuralNetwork(canvas, network) {
  const ctx = canvas.getContext('2d');
  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = canvas.offsetHeight;
  
  ctx.clearRect(0, 0, width, height);
  
  const layers = network.layers;
  const maxNeurons = Math.max(...layers);
  const layerSpacing = width / (layers.length + 1);
  const neuronRadius = 12;
  
  ctx.strokeStyle = '#ffffff18';
  ctx.lineWidth = 1;
  
  for (let l = 0; l < layers.length - 1; l++) {
    const currentLayer = layers[l];
    const nextLayer = layers[l + 1];
    const x1 = layerSpacing * (l + 1);
    const x2 = layerSpacing * (l + 2);
    
    for (let i = 0; i < currentLayer; i++) {
      const y1 = (height / (currentLayer + 1)) * (i + 1);
      
      for (let j = 0; j < nextLayer; j++) {
        const y2 = (height / (nextLayer + 1)) * (j + 1);
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }
  }
  
  const colors = ['#1AD4A4', '#6c63ff', '#ffa94d', '#ff6b6b'];
  
  layers.forEach((layerSize, layerIndex) => {
    const x = layerSpacing * (layerIndex + 1);
    const color = colors[layerIndex % colors.length];
    
    for (let i = 0; i < layerSize; i++) {
      const y = (height / (layerSize + 1)) * (i + 1);
      
      ctx.beginPath();
      ctx.arc(x, y, neuronRadius, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    
    ctx.fillStyle = '#e8e8f0';
    ctx.font = '12px Space Mono';
    ctx.textAlign = 'center';
    const label = layerIndex === 0 ? 'Entrada' : 
                  layerIndex === layers.length - 1 ? 'Saída' : 
                  `Oculta ${layerIndex}`;
    ctx.fillText(`${label} (${layerSize})`, x, height - 10);
  });
}

function clearNNOutput() {
  document.getElementById('nn-output').innerHTML = '';
  const canvas = document.getElementById('nn-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
// ===== TICKETS MANAGEMENT =====
let tickets = [];
let editingTicketId = null;
let ticketFiles = [];
let selectedColor = '#6c63ff';
let currentAttendant = null;
let currentFilter = 'all';
let autoSyncInterval = null;

// Login System
function performLogin() {
  const nameInput = document.getElementById('attendant-name');
  const name = nameInput.value.trim();
  
  if (!name) {
    alert('Por favor, digite seu nome');
    return;
  }
  
  currentAttendant = name;
  localStorage.setItem('current-attendant', name);
  
  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('tickets-main').style.display = 'block';
  document.getElementById('current-attendant').textContent = name;
  
  loadTickets();
  startAutoSync();
  
  showSyncNotification(`Bem-vindo(a), ${name}! 👋`, 'success');
}

function performLogout() {
  if (confirm('Deseja realmente sair do sistema?')) {
    currentAttendant = null;
    localStorage.removeItem('current-attendant');
    
    stopAutoSync();
    
    document.getElementById('login-screen').style.display = 'flex';
    document.getElementById('tickets-main').style.display = 'none';
    document.getElementById('attendant-name').value = '';
  }
}

function checkLoginStatus() {
  const savedAttendant = localStorage.getItem('current-attendant');
  if (savedAttendant) {
    currentAttendant = savedAttendant;
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('tickets-main').style.display = 'block';
    document.getElementById('current-attendant').textContent = savedAttendant;
    startAutoSync();
  }
}

// Auto Sync System
function startAutoSync() {
  // Sync every 30 seconds
  autoSyncInterval = setInterval(() => {
    if (dropboxToken && currentAttendant) {
      autoSyncFromCloud();
    }
  }, 30000); // 30 seconds
  
  // Initial sync
  if (dropboxToken) {
    autoSyncFromCloud();
  }
}

function stopAutoSync() {
  if (autoSyncInterval) {
    clearInterval(autoSyncInterval);
    autoSyncInterval = null;
  }
}

async function autoSyncFromCloud() {
  if (!dropboxToken) return;
  
  try {
    const response = await fetch('https://content.dropboxapi.com/2/files/download', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${dropboxToken}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: DROPBOX_FILE_PATH
        })
      }
    });
    
    if (response.ok) {
      const textData = await response.text();
      const data = JSON.parse(textData);
      
      if (data.data && data.data.tickets) {
        const remoteTickets = JSON.parse(data.data.tickets);
        
        // Merge tickets (keep local changes priority for tickets being edited)
        tickets = remoteTickets;
        localStorage.setItem('tickets-eliana', data.data.tickets);
        
        renderTickets();
        updateStats();
        
        console.log('Auto-sync completed:', new Date().toLocaleTimeString());
      }
    }
  } catch (error) {
    console.log('Auto-sync skipped:', error.message);
  }
}

// Auto-save when changes happen
function autoSaveToCloud() {
  if (dropboxToken && currentAttendant) {
    setTimeout(() => {
      syncToCloud();
    }, 2000); // Save after 2 seconds of inactivity
  }
}

function loadTickets() {
  const saved = localStorage.getItem('tickets-eliana');
  if (saved) {
    tickets = JSON.parse(saved);
  }
  renderTickets();
  updateStats();
}

function saveTickets() {
  localStorage.setItem('tickets-eliana', JSON.stringify(tickets));
  renderTickets();
  updateStats();
  autoSaveToCloud(); // Auto-save to cloud
}

function filterTickets(filter) {
  currentFilter = filter;
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');
  
  renderTickets();
}

function updateStats() {
  const available = tickets.filter(t => t.status === 'available').length;
  const inProgress = tickets.filter(t => t.status === 'in-progress').length;
  const completed = tickets.filter(t => t.status === 'completed').length;
  
  document.getElementById('stat-available').textContent = available;
  document.getElementById('stat-in-progress').textContent = inProgress;
  document.getElementById('stat-completed').textContent = completed;
}

function renderTickets() {
  const board = document.getElementById('tickets-board');
  const emptyState = document.getElementById('empty-state');
  
  // Filter tickets
  let filteredTickets = tickets;
  if (currentFilter === 'available') {
    filteredTickets = tickets.filter(t => t.status === 'available');
  } else if (currentFilter === 'in-progress') {
    filteredTickets = tickets.filter(t => t.status === 'in-progress' && t.attendant === currentAttendant);
  } else if (currentFilter === 'completed') {
    filteredTickets = tickets.filter(t => t.status === 'completed');
  }
  
  if (filteredTickets.length === 0) {
    board.style.display = 'none';
    emptyState.style.display = 'block';
    return;
  }
  
  board.style.display = 'grid';
  emptyState.style.display = 'none';
  
  board.innerHTML = filteredTickets.map(ticket => {
    const status = ticket.status || 'available';
    const statusLabel = {
      'available': 'Disponível',
      'in-progress': 'Em Atendimento',
      'completed': 'Concluído'
    }[status];
    
    let actionButtons = '';
    if (status === 'available') {
      actionButtons = `
        <div class="ticket-actions-bottom">
          <button class="ticket-pull-btn" onclick="pullTicket('${ticket.id}')">🎯 Puxar Chamado</button>
        </div>
      `;
    } else if (status === 'in-progress' && ticket.attendant === currentAttendant) {
      actionButtons = `
        <div class="ticket-actions-bottom">
          <button class="ticket-complete-btn" onclick="completeTicket('${ticket.id}')">✅ Concluir</button>
          <button class="ticket-release-btn" onclick="releaseTicket('${ticket.id}')">↩️ Devolver</button>
        </div>
      `;
    }
    
    return `
      <div class="ticket-card ${status}" style="--ticket-color: ${ticket.color}">
        <div class="ticket-status-badge ${status}">${statusLabel}</div>
        
        <div class="ticket-header" style="margin-top: 1.5rem;">
          <div class="ticket-title">${ticket.title}</div>
          ${status !== 'in-progress' || ticket.attendant === currentAttendant ? `
            <div class="ticket-actions">
              <button class="ticket-edit-btn" onclick="editTicket('${ticket.id}')" title="Editar">✎</button>
              <button class="ticket-delete-btn" onclick="deleteTicket('${ticket.id}')" title="Excluir">✕</button>
            </div>
          ` : ''}
        </div>
        
        ${ticket.description ? `<div class="ticket-description">${ticket.description}</div>` : ''}
        
        ${ticket.attachments && ticket.attachments.length > 0 ? `
          <div class="ticket-attachments">
            ${ticket.attachments.map(file => `
              <div class="ticket-attachment-chip">📎 ${file.name}</div>
            `).join('')}
          </div>
        ` : ''}
        
        <div class="ticket-meta">
          <div>🕒 ${ticket.date}</div>
          ${ticket.attendant ? `<div class="ticket-attendant">👤 ${ticket.attendant}</div>` : ''}
        </div>
        
        ${actionButtons}
      </div>
    `;
  }).join('');
}

function pullTicket(ticketId) {
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return;
  
  if (ticket.status !== 'available') {
    showSyncNotification('Este chamado não está mais disponível', 'error');
    return;
  }
  
  ticket.status = 'in-progress';
  ticket.attendant = currentAttendant;
  ticket.startedAt = new Date().toLocaleString('pt-BR');
  
  saveTickets();
  showSyncNotification(`Chamado "${ticket.title}" assumido! 🎯`, 'success');
}

function completeTicket(ticketId) {
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return;
  
  if (ticket.attendant !== currentAttendant) {
    showSyncNotification('Você não pode concluir este chamado', 'error');
    return;
  }
  
  if (confirm(`Concluir o chamado "${ticket.title}"?`)) {
    ticket.status = 'completed';
    ticket.completedAt = new Date().toLocaleString('pt-BR');
    
    saveTickets();
    showSyncNotification(`Chamado "${ticket.title}" concluído! ✅`, 'success');
  }
}

function releaseTicket(ticketId) {
  const ticket = tickets.find(t => t.id === ticketId);
  if (!ticket) return;
  
  if (ticket.attendant !== currentAttendant) {
    showSyncNotification('Você não pode devolver este chamado', 'error');
    return;
  }
  
  if (confirm(`Devolver o chamado "${ticket.title}" para a fila?`)) {
    ticket.status = 'available';
    ticket.attendant = null;
    ticket.startedAt = null;
    
    saveTickets();
    showSyncNotification(`Chamado "${ticket.title}" devolvido à fila`, 'success');
  }
}

function openTicketModal(ticketId = null) {
  const modal = document.getElementById('ticket-modal');
  const modalTitle = document.getElementById('modal-title');
  const titleInput = document.getElementById('ticket-title-input');
  const descInput = document.getElementById('ticket-description-input');
  const filesList = document.getElementById('ticket-files-list');
  
  editingTicketId = ticketId;
  ticketFiles = [];
  
  if (ticketId) {
    const ticket = tickets.find(t => t.id === ticketId);
    if (ticket) {
      modalTitle.textContent = 'Editar Chamado';
      titleInput.value = ticket.title;
      descInput.value = ticket.description || '';
      selectedColor = ticket.color;
      ticketFiles = [...(ticket.attachments || [])];
      
      document.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.toggle('selected', opt.dataset.color === selectedColor);
      });
      
      renderTicketFiles();
    }
  } else {
    modalTitle.textContent = 'Novo Chamado';
    titleInput.value = '';
    descInput.value = '';
    selectedColor = '#6c63ff';
    filesList.innerHTML = '';
    
    document.querySelectorAll('.color-option').forEach(opt => {
      opt.classList.toggle('selected', opt.dataset.color === '#6c63ff');
    });
  }
  
  modal.classList.add('open');
}

function closeTicketModal() {
  document.getElementById('ticket-modal').classList.remove('open');
  editingTicketId = null;
  ticketFiles = [];
}

function handleTicketModalClick(e) {
  if (e.target === document.getElementById('ticket-modal')) {
    closeTicketModal();
  }
}

function saveTicket() {
  const title = document.getElementById('ticket-title-input').value.trim();
  const description = document.getElementById('ticket-description-input').value.trim();
  
  if (!title) {
    alert('Por favor, adicione um título ao chamado');
    return;
  }
  
  const timestamp = new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
  
  if (editingTicketId) {
    const ticketIndex = tickets.findIndex(t => t.id === editingTicketId);
    if (ticketIndex !== -1) {
      tickets[ticketIndex] = {
        ...tickets[ticketIndex],
        title,
        description,
        color: selectedColor,
        attachments: ticketFiles,
        updatedAt: timestamp
      };
    }
  } else {
    const newTicket = {
      id: Date.now().toString(),
      title,
      description,
      color: selectedColor,
      attachments: ticketFiles,
      date: timestamp,
      createdAt: timestamp,
      status: 'available', // New tickets start as available
      attendant: null,
      startedAt: null,
      completedAt: null
    };
    tickets.unshift(newTicket);
  }
  
  saveTickets();
  closeTicketModal();
  showSyncNotification('Chamado salvo com sucesso! 📝', 'success');
}

function editTicket(ticketId) {
  openTicketModal(ticketId);
}

function deleteTicket(ticketId) {
  if (confirm('Tem certeza que deseja excluir este chamado?')) {
    tickets = tickets.filter(t => t.id !== ticketId);
    saveTickets();
  }
}

function handleTicketFiles(input) {
  const files = Array.from(input.files);
  
  files.forEach(file => {
    ticketFiles.push({
      name: file.name,
      size: file.size,
      type: file.type,
      id: Date.now() + Math.random()
    });
  });
  
  renderTicketFiles();
  input.value = '';
}

function renderTicketFiles() {
  const filesList = document.getElementById('ticket-files-list');
  
  filesList.innerHTML = ticketFiles.map(file => `
    <div class="file-item">
      <span>📄 ${file.name}</span>
      <span class="file-remove" onclick="removeTicketFile(${file.id})">✕</span>
    </div>
  `).join('');
}

function removeTicketFile(fileId) {
  ticketFiles = ticketFiles.filter(f => f.id !== fileId);
  renderTicketFiles();
}

// Color picker
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', function() {
      document.querySelectorAll('.color-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      this.classList.add('selected');
      selectedColor = this.dataset.color;
    });
  });
});
// ===== DROPBOX SYNC =====
let dropboxToken = localStorage.getItem('dropbox-token') || '';
const DROPBOX_FILE_PATH = '/ai_dev_path_data.json';

function openSyncModal() {
  const modal = document.getElementById('sync-modal');
  const tokenInput = document.getElementById('dropbox-token-input');
  
  tokenInput.value = dropboxToken;
  modal.classList.add('open');
  
  updateSyncStatus();
  updateLastSyncTime();
}

function closeSyncModal() {
  document.getElementById('sync-modal').classList.remove('open');
}

function handleSyncModalClick(e) {
  if (e.target === document.getElementById('sync-modal')) {
    closeSyncModal();
  }
}

function saveToken() {
  const token = document.getElementById('dropbox-token-input').value.trim();
  
  if (!token) {
    showSyncNotification('Por favor, insira um token válido', 'error');
    return;
  }
  
  dropboxToken = token;
  localStorage.setItem('dropbox-token', token);
  
  updateSyncStatus();
  showSyncNotification('Token salvo com sucesso!', 'success');
}

async function testConnection() {
  if (!dropboxToken) {
    showSyncNotification('Configure o token primeiro', 'error');
    return;
  }
  
  try {
    setSyncButtonState('syncing');
    
    const response = await fetch('https://api.dropboxapi.com/2/users/get_current_account', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${dropboxToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      showSyncNotification(`✅ Conectado como: ${data.name.display_name}`, 'success');
      setSyncButtonState('success');
      updateSyncStatus(true);
      
      document.getElementById('sync-upload-btn').disabled = false;
      document.getElementById('sync-download-btn').disabled = false;
      
      // Reset button state after 2 seconds
      setTimeout(() => setSyncButtonState('default'), 2000);
    } else {
      const errorData = await response.text();
      console.error('Dropbox auth error:', errorData);
      throw new Error('Token inválido ou expirado');
    }
  } catch (error) {
    console.error('Connection test error:', error);
    showSyncNotification('❌ Erro: ' + error.message, 'error');
    setSyncButtonState('error');
    updateSyncStatus(false);
    setTimeout(() => setSyncButtonState('default'), 2000);
  }
}

async function syncToCloud() {
  if (!dropboxToken) {
    showSyncNotification('Configure o token primeiro', 'error');
    return;
  }
  
  try {
    setSyncButtonState('syncing');
    
    // Coletar todos os dados
    const allData = {
      version: '4.0',
      timestamp: new Date().toISOString(),
      data: {
        progress: {},
        notes: {},
        attachments: {},
        roadmap: localStorage.getItem('roadmap-state'),
        tickets: localStorage.getItem('tickets-eliana')
      }
    };
    
    // Coletar dados de progresso
    ['card1', 'card2', 'card3', 'card4'].forEach(cardId => {
      allData.data.progress[cardId] = localStorage.getItem(`progress-${cardId}`);
      allData.data.notes[cardId] = localStorage.getItem(`notes-${cardId}`);
      allData.data.attachments[cardId] = localStorage.getItem(`attachments-${cardId}`);
    });
    
    console.log('Uploading data to Dropbox...', allData);
    
    // Upload para Dropbox
    const response = await fetch('https://content.dropboxapi.com/2/files/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${dropboxToken}`,
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
          path: DROPBOX_FILE_PATH,
          mode: 'overwrite',
          autorename: false,
          mute: false
        })
      },
      body: JSON.stringify(allData, null, 2)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('Upload successful:', result);
      
      const timestamp = new Date().toLocaleString('pt-BR');
      localStorage.setItem('last-sync-time', timestamp);
      updateLastSyncTime();
      
      showSyncNotification('✅ Dados enviados com sucesso!', 'success');
      setSyncButtonState('success');
      
      setTimeout(() => setSyncButtonState('default'), 2000);
    } else {
      const errorText = await response.text();
      console.error('Upload error:', errorText);
      throw new Error('Falha no upload: ' + response.status);
    }
  } catch (error) {
    console.error('Sync to cloud error:', error);
    showSyncNotification('❌ Erro ao enviar: ' + error.message, 'error');
    setSyncButtonState('error');
    setTimeout(() => setSyncButtonState('default'), 2000);
  }
}

async function syncFromCloud() {
  if (!dropboxToken) {
    showSyncNotification('Configure o token primeiro', 'error');
    return;
  }
  
  if (!confirm('Isso substituirá todos os dados locais pelos dados da nuvem. Deseja continuar?')) {
    return;
  }
  
  try {
    setSyncButtonState('syncing');
    
    const response = await fetch('https://content.dropboxapi.com/2/files/download', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${dropboxToken}`,
        'Dropbox-API-Arg': JSON.stringify({
          path: DROPBOX_FILE_PATH
        })
      }
    });
    
    if (response.ok) {
      // O Dropbox retorna o conteúdo do arquivo como texto no body
      const textData = await response.text();
      const data = JSON.parse(textData);
      
      if (data.data) {
        // Restaurar progresso
        if (data.data.progress) {
          Object.keys(data.data.progress).forEach(key => {
            if (data.data.progress[key]) {
              localStorage.setItem(`progress-${key}`, data.data.progress[key]);
            }
          });
        }
        
        // Restaurar notas
        if (data.data.notes) {
          Object.keys(data.data.notes).forEach(key => {
            if (data.data.notes[key]) {
              localStorage.setItem(`notes-${key}`, data.data.notes[key]);
            }
          });
        }
        
        // Restaurar anexos
        if (data.data.attachments) {
          Object.keys(data.data.attachments).forEach(key => {
            if (data.data.attachments[key]) {
              localStorage.setItem(`attachments-${key}`, data.data.attachments[key]);
            }
          });
        }
        
        // Restaurar roadmap
        if (data.data.roadmap) {
          localStorage.setItem('roadmap-state', data.data.roadmap);
        }
        
        // Restaurar tickets
        if (data.data.tickets) {
          localStorage.setItem('tickets-eliana', data.data.tickets);
        }
      }
      
      const timestamp = new Date().toLocaleString('pt-BR');
      localStorage.setItem('last-sync-time', timestamp);
      updateLastSyncTime();
      
      showSyncNotification('Dados restaurados! Recarregando página...', 'success');
      setSyncButtonState('success');
      
      setTimeout(() => {
        location.reload();
      }, 1500);
    } else {
      const errorText = await response.text();
      console.error('Dropbox error:', errorText);
      throw new Error('Arquivo não encontrado na nuvem ou erro de permissão');
    }
  } catch (error) {
    console.error('Sync error:', error);
    showSyncNotification('Erro ao baixar: ' + error.message, 'error');
    setSyncButtonState('error');
    setTimeout(() => setSyncButtonState('default'), 2000);
  }
}

function disconnectDropbox() {
  if (!confirm('Deseja desconectar do Dropbox? O token será removido.')) {
    return;
  }
  
  dropboxToken = '';
  localStorage.removeItem('dropbox-token');
  document.getElementById('dropbox-token-input').value = '';
  
  document.getElementById('sync-upload-btn').disabled = true;
  document.getElementById('sync-download-btn').disabled = true;
  
  updateSyncStatus(false);
  showSyncNotification('Desconectado do Dropbox', 'success');
}

function updateSyncStatus(connected = null) {
  const statusEl = document.getElementById('sync-status');
  
  if (connected === null) {
    connected = !!dropboxToken;
  }
  
  if (connected) {
    statusEl.className = 'sync-status connected';
    statusEl.innerHTML = `
      <div class="sync-status-icon">✅</div>
      <div class="sync-status-text">
        <div style="font-weight: 600; color: var(--accent2);">Status: Conectado</div>
        <div style="font-size: 0.75rem; color: var(--muted);">Pronto para sincronizar</div>
      </div>
    `;
    
    document.getElementById('sync-upload-btn').disabled = false;
    document.getElementById('sync-download-btn').disabled = false;
  } else {
    statusEl.className = 'sync-status disconnected';
    statusEl.innerHTML = `
      <div class="sync-status-icon">⚪</div>
      <div class="sync-status-text">
        <div style="font-weight: 600;">Status: Não Configurado</div>
        <div style="font-size: 0.75rem; color: var(--muted);">Configure o token para habilitar a sincronização</div>
      </div>
    `;
    
    document.getElementById('sync-upload-btn').disabled = true;
    document.getElementById('sync-download-btn').disabled = true;
  }
}

function updateLastSyncTime() {
  const lastSync = localStorage.getItem('last-sync-time');
  const el = document.getElementById('sync-last-sync');
  
  if (lastSync) {
    el.textContent = `Última sincronização: ${lastSync}`;
  } else {
    el.textContent = 'Nunca sincronizado';
  }
}

function setSyncButtonState(state) {
  const fab = document.getElementById('sync-fab');
  const icon = document.getElementById('sync-icon');
  const tooltip = document.getElementById('sync-tooltip');
  
  fab.className = 'sync-fab';
  
  switch (state) {
    case 'syncing':
      fab.classList.add('syncing');
      icon.textContent = '🔄';
      tooltip.textContent = 'Sincronizando...';
      break;
    case 'success':
      fab.classList.add('success');
      icon.textContent = '✓';
      tooltip.textContent = 'Sincronizado!';
      break;
    case 'error':
      fab.classList.add('error');
      icon.textContent = '✕';
      tooltip.textContent = 'Erro na sincronização';
      break;
    default:
      icon.textContent = '☁️';
      tooltip.textContent = 'Sincronizar com Dropbox';
  }
}

function showSyncNotification(message, type) {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed;
    top: 80px;
    right: 2rem;
    background: ${type === 'success' ? 'var(--accent2)' : 'var(--accent3)'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    font-size: 0.85rem;
    font-family: var(--font-mono);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  `;
  notif.textContent = message;
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(400px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(400px); opacity: 0; }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(notif);
  
  setTimeout(() => {
    notif.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

if (dropboxToken) {
  updateSyncStatus(true);
}

// ===== TAB NAVIGATION =====
function switchTab(idx) {
  document.querySelectorAll('.page').forEach((p, i) => {
    p.classList.toggle('active', i === idx);
  });
  document.querySelectorAll('.nav-tab').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
  if (idx === 2) {
    setTimeout(() => {
      updateOverallProgress();
    }, 100);
  }
  if (idx === 4) {
    checkLoginStatus();
    if (currentAttendant) {
      renderTickets();
      updateStats();
    }
  }
}

function switchPracticeTab(idx) {
  document.querySelectorAll('.practice-panel').forEach((p, i) => {
    p.classList.toggle('active', i === idx);
  });
  document.querySelectorAll('.practice-tab').forEach((t, i) => {
    t.classList.toggle('active', i === idx);
  });
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', e => { 
  if (e.key === 'Escape') {
    closeDetail();
    closeTicketModal();
    closeSyncModal();
  }
});

// ===== INITIALIZATION =====
initProgressCards();
loadRoadmapState();
checkLoginStatus(); // Check if user is already logged in
if (currentAttendant) {
  loadTickets();
}

