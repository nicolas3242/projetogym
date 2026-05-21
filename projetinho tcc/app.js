/* ============================================
   CODEQUEST — app.js
   Lógica principal da plataforma
   ============================================ */

// ============================================
// ESTADO DO USUÁRIO (simula banco de dados)
// ============================================

const USERS_DB = {
  'demo@codequest.com': { name: 'Demo User', password: '123456', xp: 420, streak: 7, hearts: 5, gems: 230, licoes: 12, nivel: 4, conquistas: 4 }
};

let currentUser = null;

// ============================================
// BANCO DE EXERCÍCIOS
// ============================================

const QUESTIONS = {
  html: [
    {
      type: 'multiple',
      title: 'Fundamentos HTML',
      instruction: 'Qual tag HTML é usada para criar um parágrafo?',
      options: ['<div>', '<p>', '<span>', '<h1>'],
      correct: 1,
      explanation: 'A tag <p> define um parágrafo no HTML.',
      xp: 10
    },
    {
      type: 'multiple',
      title: 'Estrutura HTML',
      instruction: 'Qual é a tag raiz de todo documento HTML?',
      options: ['<body>', '<head>', '<html>', '<main>'],
      correct: 2,
      explanation: 'A tag <html> é o elemento raiz que contém todo o documento.',
      xp: 10
    },
    {
      type: 'multiple',
      title: 'Links em HTML',
      instruction: 'Qual atributo define o destino de um link <a>?',
      options: ['src', 'href', 'link', 'url'],
      correct: 1,
      explanation: 'O atributo href define a URL de destino do link.',
      xp: 15
    },
    {
      type: 'fill',
      title: 'Completar o Código',
      instruction: 'Complete a tag correta para inserir uma imagem:',
      code: '<_____ src="foto.jpg" alt="Descrição">',
      answer: 'img',
      xp: 15
    },
    {
      type: 'multiple',
      title: 'Listas HTML',
      instruction: 'Qual tag cria uma lista NÃO ordenada (com bolinhas)?',
      options: ['<ol>', '<ul>', '<li>', '<list>'],
      correct: 1,
      explanation: '<ul> cria uma lista não ordenada. <ol> cria listas ordenadas (números).',
      xp: 10
    },
    {
      type: 'multiple',
      title: 'Semântica HTML5',
      instruction: 'Qual tag semântica representa o cabeçalho de uma página?',
      options: ['<top>', '<nav>', '<header>', '<section>'],
      correct: 2,
      explanation: '<header> é a tag semântica para o cabeçalho da página ou seção.',
      xp: 20
    },
    {
      type: 'fill',
      title: 'Títulos',
      instruction: 'Complete: para criar o título mais importante da página, use:',
      code: '<_____>Bem-vindo ao CodeQuest</_____>',
      answer: 'h1',
      xp: 10
    },
    {
      type: 'multiple',
      title: 'Formulários',
      instruction: 'Qual tag HTML é usada para criar uma caixa de texto de linha única?',
      options: ['<textarea>', '<textbox>', '<input>', '<field>'],
      correct: 2,
      explanation: '<input type="text"> cria uma caixa de texto de linha única.',
      xp: 15
    }
  ],
  css: [
    {
      type: 'multiple',
      title: 'Cores em CSS',
      instruction: 'Como definir a cor do texto de um elemento em CSS?',
      options: ['text-color: blue', 'font-color: blue', 'color: blue', 'style: blue'],
      correct: 2,
      explanation: 'A propriedade "color" define a cor do texto em CSS.',
      xp: 10
    },
    {
      type: 'multiple',
      title: 'Box Model',
      instruction: 'Qual propriedade CSS define o espaçamento interno de um elemento?',
      options: ['margin', 'padding', 'spacing', 'inner'],
      correct: 1,
      explanation: 'padding define espaçamento interno; margin define espaçamento externo.',
      xp: 15
    },
    {
      type: 'fill',
      title: 'Seletores',
      instruction: 'Para selecionar um elemento com a classe "botao", use:',
      code: '_____.botao { background: green; }',
      answer: '.',
      xp: 10
    }
  ],
  js: [
    {
      type: 'multiple',
      title: 'Variáveis JS',
      instruction: 'Qual palavra-chave moderna é usada para declarar uma variável em JavaScript?',
      options: ['var', 'let', 'def', 'int'],
      correct: 1,
      explanation: '"let" e "const" são as formas modernas de declarar variáveis no JS.',
      xp: 10
    }
  ]
};

// ============================================
// FRASES MOTIVACIONAIS
// ============================================

const QUOTES = [
  { text: '"A jornada de mil milhas começa com um único passo."', author: 'Lao-Tsé' },
  { text: '"Código é poesia."', author: 'WordPress' },
  { text: '"Primeiro faça funcionar, depois faça rápido."', author: 'Kent Beck' },
  { text: '"Qualquer tolo pode escrever código que um computador entenda. Bons programadores escrevem código que humanos entendem."', author: 'Martin Fowler' },
  { text: '"Aprender a programar é o melhor investimento que você pode fazer."', author: 'Bill Gates' },
  { text: '"O sucesso é a soma de pequenos esforços repetidos dia após dia."', author: 'Robert Collier' }
];

// ============================================
// ESTADO DA LIÇÃO ATUAL
// ============================================

let currentLesson = { trail: null, questions: [], current: 0, score: 0 };

// ============================================
// AUTENTICAÇÃO
// ============================================

function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.querySelector(`.auth-tab:${tab === 'login' ? 'first-child' : 'last-child'}`).classList.add('active');
  document.getElementById(`tab-${tab}`).classList.add('active');
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-pass').value;

  if (!email || !pass) { showToast('⚠️ Preencha todos os campos!'); return; }

  const user = USERS_DB[email];
  if (!user || user.password !== pass) {
    showToast('❌ Email ou senha incorretos!');
    return;
  }

  currentUser = { email, ...user };
  enterApp();
}

function doRegister() {
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass = document.getElementById('reg-pass').value;

  if (!name || !email || !pass) { showToast('⚠️ Preencha todos os campos!'); return; }
  if (pass.length < 6) { showToast('⚠️ Senha deve ter 6+ caracteres!'); return; }
  if (USERS_DB[email]) { showToast('⚠️ Email já cadastrado!'); return; }

  USERS_DB[email] = { name, password: pass, xp: 0, streak: 1, hearts: 5, gems: 0, licoes: 0, nivel: 1, conquistas: 0 };
  currentUser = { email, ...USERS_DB[email] };
  showToast('🎉 Conta criada! Bem-vindo ao CodeQuest!');
  enterApp();
}

function doLogout() {
  currentUser = null;
  document.getElementById('app').classList.add('hidden');
  document.getElementById('auth-screen').classList.remove('hidden');
  showToast('👋 Até logo!');
}

function enterApp() {
  document.getElementById('auth-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  updateUI();
  showPage('home');
  showToast(`🎉 Bem-vindo, ${currentUser.name.split(' ')[0]}!`);
}

// ============================================
// ATUALIZAÇÃO DA UI
// ============================================

function updateUI() {
  if (!currentUser) return;
  const first = currentUser.name.split(' ')[0];
  const initial = first[0].toUpperCase();

  // Sidebar
  document.getElementById('sidebar-avatar').textContent = initial;
  document.getElementById('sidebar-name').textContent = first;
  document.getElementById('sidebar-xp').textContent = `⚡ ${currentUser.xp} XP`;

  // Top bar
  document.getElementById('top-streak').textContent = currentUser.streak;
  document.getElementById('top-xp').textContent = currentUser.xp;
  document.getElementById('top-hearts').textContent = currentUser.hearts;
  document.getElementById('top-gems').textContent = currentUser.gems;

  // Home
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite';
  document.getElementById('welcome-msg').textContent = `${greeting}, ${first}! 👋`;
  document.getElementById('home-streak').textContent = currentUser.streak;
  document.getElementById('pc-xp').textContent = currentUser.xp;
  document.getElementById('pc-licoes').textContent = currentUser.licoes;

  // Nível
  const nivel = calcNivel(currentUser.xp);
  const { current: xpAtual, next: xpProx, pct } = nivel;
  document.getElementById('level-badge').textContent = `${getNivelIcon(nivel.nivel)} Nível ${nivel.nivel}`;
  document.getElementById('level-bar').style.width = pct + '%';
  document.getElementById('xp-to-next').textContent = (xpProx - currentUser.xp) + ' XP';

  // Perfil
  document.getElementById('profile-avatar').textContent = initial;
  document.getElementById('profile-name').textContent = currentUser.name;
  document.getElementById('profile-email').textContent = currentUser.email;
  document.getElementById('stat-xp').textContent = currentUser.xp;

  // Quote
  const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  document.getElementById('daily-quote').textContent = q.text;
  document.querySelector('.mc-author').textContent = `— ${q.author}`;
}

function calcNivel(xp) {
  const thresholds = [0, 100, 200, 350, 500, 700, 1000, 1400, 1900, 2500];
  let nivel = 1;
  for (let i = 1; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) nivel = i + 1;
    else break;
  }
  const current = thresholds[nivel - 1] || 0;
  const next = thresholds[nivel] || current + 500;
  const pct = Math.round(((xp - current) / (next - current)) * 100);
  return { nivel, current, next, pct };
}

function getNivelIcon(nivel) {
  const icons = ['🥉', '🥉', '🥈', '🥈', '🥇', '🥇', '💎', '💎', '👑', '👑'];
  return icons[Math.min(nivel - 1, icons.length - 1)];
}

// ============================================
// NAVEGAÇÃO
// ============================================

function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  document.getElementById(`page-${page}`).classList.add('active');
  const navItem = document.querySelector(`[data-page="${page}"]`);
  if (navItem) navItem.classList.add('active');

  // Fechar sidebar mobile
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
  }
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
}

// ============================================
// SISTEMA DE TRILHAS
// ============================================

function openTrail(trail) {
  const locked = { js: true, php: true, python: true };
  if (locked[trail]) {
    showToast('🔒 Complete as trilhas anteriores primeiro!');
    return;
  }

  const questions = QUESTIONS[trail];
  if (!questions || questions.length === 0) {
    showToast('⚠️ Trilha em construção!');
    return;
  }

  currentLesson = {
    trail,
    questions: shuffle([...questions]),
    current: 0,
    score: 0,
    totalXp: 0
  };

  openLesson();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// ============================================
// SISTEMA DE LIÇÕES
// ============================================

function openLesson() {
  document.getElementById('lesson-modal').classList.remove('hidden');
  renderQuestion();
}

function closeLesson() {
  document.getElementById('lesson-modal').classList.add('hidden');
  if (currentLesson.totalXp > 0) {
    showToast(`✅ Lição encerrada! +${currentLesson.totalXp} XP ganhos`);
  }
}

function renderQuestion() {
  const { questions, current } = currentLesson;
  if (current >= questions.length) {
    finishLesson();
    return;
  }

  const q = questions[current];
  const progress = Math.round((current / questions.length) * 100);
  document.getElementById('lesson-bar').style.width = progress + '%';

  const container = document.getElementById('lesson-content');

  if (q.type === 'multiple') {
    container.innerHTML = `
      <div class="lesson-type-badge">📝 Múltipla Escolha</div>
      <div class="lesson-title">${q.title}</div>
      <div class="lesson-instruction">${q.instruction}</div>
      <div class="options-grid">
        ${q.options.map((opt, i) => `
          <button class="option-btn" onclick="selectOption(this, ${i})" data-index="${i}">
            <span class="option-letter">${['A','B','C','D'][i]}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
    `;
  } else if (q.type === 'fill') {
    container.innerHTML = `
      <div class="lesson-type-badge">✏️ Preencher Lacuna</div>
      <div class="lesson-title">${q.title}</div>
      <div class="lesson-instruction">${q.instruction}</div>
      <div class="code-block">${formatCode(q.code)}</div>
      <div style="margin-top: 1rem;">
        <label style="font-weight: 800; font-size: 0.9rem; display: block; margin-bottom: 0.5rem; color: var(--text-muted);">Sua resposta:</label>
        <input class="blank-input" id="fill-answer" placeholder="Digite aqui..." 
          onkeypress="if(event.key==='Enter') checkAnswer()">
      </div>
    `;
    setTimeout(() => {
      const inp = document.getElementById('fill-answer');
      if (inp) inp.focus();
    }, 100);
  }

  // Reset btn
  const btn = document.getElementById('check-btn');
  btn.textContent = 'Verificar';
  btn.disabled = false;
  btn.style.background = '';

  currentLesson.selectedAnswer = null;
}

function formatCode(code) {
  return code
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(_____)/g, '<span style="background:#CE82FF33;border-bottom:2px solid #CE82FF;padding:0 4px;border-radius:4px;">_____</span>')
    .replace(/(&lt;\/?[a-zA-Z0-9]+)/g, '<span class="tag">$1</span>')
    .replace(/(src|href|alt|class|id|type)=/g, '<span class="attr">$1</span>=')
    .replace(/"([^"]*)"/g, '"<span class="str">$1</span>"');
}

function selectOption(btn, index) {
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  currentLesson.selectedAnswer = index;
}

function checkAnswer() {
  const q = currentLesson.questions[currentLesson.current];
  let correct = false;

  if (q.type === 'multiple') {
    if (currentLesson.selectedAnswer === null) {
      showToast('⚠️ Selecione uma opção!');
      return;
    }
    correct = currentLesson.selectedAnswer === q.correct;

    document.querySelectorAll('.option-btn').forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correct) btn.classList.add('correct');
      else if (i === currentLesson.selectedAnswer && !correct) btn.classList.add('wrong');
    });
  } else if (q.type === 'fill') {
    const input = document.getElementById('fill-answer');
    if (!input || !input.value.trim()) {
      showToast('⚠️ Digite uma resposta!');
      return;
    }
    const answer = input.value.trim().toLowerCase().replace(/[<>\/]/g, '');
    correct = answer === q.answer.toLowerCase().replace(/[<>\/]/g, '');
    input.disabled = true;
    input.style.borderColor = correct ? 'var(--green)' : 'var(--red)';
    input.style.background = correct ? 'var(--green-light)' : 'var(--red-light)';
  }

  showResult(correct, q);
}

function showResult(correct, q) {
  const xpGained = correct ? q.xp : 0;
  if (correct) {
    currentLesson.score++;
    currentLesson.totalXp += xpGained;
  }

  document.getElementById('result-icon').textContent = correct ? '🎉' : '😅';
  document.getElementById('result-title').textContent = correct ? ['Incrível! ✨', 'Correto! 🎯', 'Perfeito! 💯', 'Muito bem! 🌟'][Math.floor(Math.random()*4)] : 'Quase lá!';
  document.getElementById('result-msg').textContent = correct ? q.explanation : `A resposta correta era: ${q.type === 'fill' ? q.answer : q.options[q.correct]}`;
  document.getElementById('result-xp').textContent = correct ? `+${xpGained} XP` : 'Sem XP desta vez';
  document.getElementById('result-xp').style.background = correct ? 'var(--green-light)' : 'var(--red-light)';
  document.getElementById('result-xp').style.color = correct ? 'var(--green-dark)' : 'var(--red-dark)';

  if (correct && currentUser) {
    currentUser.xp += xpGained;
    currentUser.gems += 2;
    updateUI();
  } else if (!correct && currentUser) {
    currentUser.hearts = Math.max(0, currentUser.hearts - 1);
    updateUI();
  }

  document.getElementById('lesson-modal').classList.add('hidden');
  document.getElementById('result-modal').classList.remove('hidden');
}

function nextQuestion() {
  document.getElementById('result-modal').classList.add('hidden');
  currentLesson.current++;

  if (currentLesson.current >= currentLesson.questions.length) {
    finishLesson();
  } else {
    document.getElementById('lesson-modal').classList.remove('hidden');
    renderQuestion();
  }
}

function finishLesson() {
  if (currentUser) {
    currentUser.licoes++;
    updateUI();
  }
  document.getElementById('lesson-modal').classList.add('hidden');
  document.getElementById('result-modal').classList.add('hidden');

  const total = currentLesson.questions.length;
  const score = currentLesson.score;
  const xp = currentLesson.totalXp;
  const accuracy = Math.round((score / total) * 100);

  showFinishModal(score, total, xp, accuracy);
}

function showFinishModal(score, total, xp, accuracy) {
  document.getElementById('result-modal').classList.remove('hidden');
  document.getElementById('result-icon').textContent = accuracy >= 80 ? '🏆' : accuracy >= 60 ? '🎯' : '📚';
  document.getElementById('result-title').textContent = accuracy >= 80 ? 'Lição Completa!' : 'Bom esforço!';
  document.getElementById('result-msg').textContent = `${score}/${total} corretas • ${accuracy}% de precisão`;
  document.getElementById('result-xp').textContent = `+${xp} XP total`;
  document.getElementById('result-xp').style.background = 'var(--green-light)';
  document.getElementById('result-xp').style.color = 'var(--green-dark)';

  const btn = document.getElementById('result-btn');
  btn.textContent = 'Ver Progresso';
  btn.onclick = () => {
    document.getElementById('result-modal').classList.add('hidden');
    showPage('home');
    currentLesson = { trail: null, questions: [], current: 0, score: 0, totalXp: 0 };
  };
}

// ============================================
// TOAST
// ============================================

let toastTimeout = null;

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.remove('hidden');
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.add('hidden'), 2500);
}

// ============================================
// INIT
// ============================================

window.addEventListener('DOMContentLoaded', () => {
  // Animação de entrada nos elementos
  document.querySelectorAll('.auth-feature').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    setTimeout(() => {
      el.style.transition = 'all 0.4s ease';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 600 + i * 100);
  });
});
