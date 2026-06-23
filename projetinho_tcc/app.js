/* ============================================================
   DEVFOX — Protótipo de Frontend Funcional (SPA Estática)
   Simula em memória o que, em produção, viria da API REST.
   ============================================================ */

   const ICONS = {
    home:'home', map:'map', target:'target', trophy:'trophy', store:'shopping-bag',
    user:'user', settings:'settings', bell:'bell', mail:'mail', lock:'lock',
    eye:'eye', eyeOff:'eye-off', userPlus:'user-plus', arrowRight:'arrow-right',
    chevronRight:'chevron-right', flame:'flame', star:'star', layers:'layers',
    award:'award', zap:'zap', lightbulb:'lightbulb', checkCircle:'check-circle',
    circle:'circle', code:'code-2', refresh:'refresh-cw', send:'send', pencil:'edit-3',
    image:'image', shirt:'shirt', logout:'log-out', x:'x', check:'check', clock:'clock',
    sparkles:'sparkles', maximize:'maximize-2', braces:'braces', swords:'swords',
    terminal:'terminal-square', quote:'quote', gift:'gift', barChart:'bar-chart-2',
    shuffle:'shuffle', play:'play', arrowLeft:'arrow-left'
};

function icon(name, cls){ return '<i data-lucide="'+(ICONS[name]||name)+'" class="lucide '+(cls||'')+'"></i>'; }

/* ---------- DADOS (Mocks) ---------- */
const trilhasData = [
    {id:'logica', nome:'Lógica de Programação', desc:'Fundamentos essenciais para desenvolver seu raciocínio lógico.', nivel:'Iniciante', modulos:7, moduloAtual:4, progresso:60, iconKey:'code', color:'#ea580c', exerciseId:'soma-dois-numeros'},
    {id:'html', nome:'HTML', desc:'Estrutura e conteúdo de páginas web com HTML.', nivel:'Iniciante', modulos:8, progresso:35, badge:'HTML', color:'#e44d26'},
    {id:'css', nome:'CSS', desc:'Estilize suas páginas e crie layouts modernos.', nivel:'Iniciante', modulos:6, progresso:20, badge:'CSS', color:'#2965f1'},
    {id:'js', nome:'JavaScript Básico', desc:'Aprenda os conceitos fundamentais da linguagem JavaScript.', nivel:'Iniciante', modulos:8, progresso:35, badge:'JS', color:'#f0db4f', textDark:true},
    {id:'loops', nome:'Estruturas de Repetição', desc:'Domine loops e estruturas de repetição para tornar seu código mais eficiente.', nivel:'Intermediário', modulos:6, progresso:20, iconKey:'refresh', color:'#7c3aed'},
    {id:'funcoes', nome:'Funções e Métodos', desc:'Organize seu código em funções e métodos reutilizáveis.', nivel:'Intermediário', modulos:6, progresso:15, iconKey:'braces', color:'#0284c7'},
    {id:'praticos', nome:'Desafios Práticos', desc:'Resolva desafios práticos e aplique seus conhecimentos.', nivel:'Avançado', modulos:10, progresso:15, iconKey:'swords', color:'#16a34a'},
    {id:'final', nome:'Projeto Final', desc:'Desenvolva um projeto completo aplicando tudo que aprendeu.', nivel:'Avançado', modulos:1, progresso:0, iconKey:'lock', color:'#b91c1c', locked:true},
];

const exercisesData = {
    'soma-dois-numeros': {
        trilha:'Lógica de Programação', breadcrumbTrilha:'logica', categoria:'Variáveis e Operadores',
        licaoAtual:4, licaoTotal:7, titulo:'Soma de Dois Números',
        descricao:'Crie um algoritmo que leia dois números e exiba a soma deles na tela.',
        objetivo:'Utilize variáveis e o operador de soma para calcular o resultado.',
        dificuldade:'Fácil', recompensa:150,
        starter:'let numero1 = 10;\nlet numero2 = 5;\n\n// complete o código abaixo\n',
        esperado:'15',
        dica:'Use o operador + para somar os valores das variáveis numero1 e numero2. Em seguida, exiba o resultado com console.log().',
        exemplo:'console.log(numero1 + numero2);'
    },
    'par-ou-impar': {
        trilha:'Desafios Práticos', categoria:'Lógica · Condicionais',
        licaoAtual:1, licaoTotal:1, titulo:'Par ou Ímpar',
        descricao:'Verifique se um número é par ou ímpar e exiba o resultado.',
        objetivo:'Utilize o operador de módulo (%) para verificar a divisibilidade por 2.',
        dificuldade:'Fácil', recompensa:150,
        starter:'let numero = 7;\n\n// complete o código abaixo\n',
        esperado:'Ímpar',
        dica:'O operador % retorna o resto da divisão. Se numero % 2 for igual a 0, o número é par; caso contrário, é ímpar.',
        exemplo:'console.log(numero % 2 === 0 ? "Par" : "Ímpar");'
    },
    'fatorial': {
        trilha:'Desafios Práticos', categoria:'Lógica · Laços de Repetição',
        licaoAtual:1, licaoTotal:1, titulo:'Fatorial de um Número',
        descricao:'Calcule o fatorial de um número utilizando um laço de repetição.',
        objetivo:'Multiplique os números de 1 até o valor informado, acumulando o resultado.',
        dificuldade:'Médio', recompensa:200,
        starter:'let numero = 5;\nlet resultado = 1;\n\n// complete o código abaixo (use um laço for)\n',
        esperado:'120',
        dica:'Crie um for que vai de 1 até numero, multiplicando "resultado" a cada repetição.',
        exemplo:'for (let i = 1; i <= numero; i++) {\n  resultado = resultado * i;\n}\nconsole.log(resultado);'
    },
    'contagem-vogais': {
        trilha:'Desafios Práticos', categoria:'Strings · Manipulação de Texto',
        licaoAtual:1, licaoTotal:1, titulo:'Contagem de Vogais',
        descricao:'Conte quantas vogais existem dentro de um texto.',
        objetivo:'Percorra o texto e conte as ocorrências das vogais a, e, i, o, u.',
        dificuldade:'Médio', recompensa:180,
        starter:'let texto = "Programacao";\n\n// complete o código abaixo\n',
        esperado:'5',
        dica:'Você pode usar uma expressão regular: texto.match(/[aeiou]/gi) retorna um array com todas as vogais encontradas.',
        exemplo:'let vogais = texto.match(/[aeiou]/gi) || [];\nconsole.log(vogais.length);'
    }
};

const navItems = [
    {view:'dashboard', label:'Início', i:'home'},
    {view:'trilhas', label:'Trilhas', i:'map'},
    {view:'desafios', label:'Desafios', i:'target'},
    {view:'ranking', label:'Ranking', i:'trophy'},
    {view:'loja', label:'Loja', i:'store'},
    {view:'perfil', label:'Perfil', i:'user'},
    {view:'config', label:'Configurações', i:'settings'},
];

/* ---------- ESTADO GLOBAL ---------- */
const state = {
    loggedIn:false,
    authMode:'login',
    authError:'',
    showPass:false,
    view:'dashboard',
    prevView:'dashboard',
    selectedTrilha:'html',
    currentExerciseId:null,
    exerciseCode:'',
    exerciseResult:null, 
    consoleOutput:'',
    showExample:false,
    user:{
        nome:'Murilo', titulo:'Dev Aprendiz', nivel:12, xp:2150, xpProximo:2800,
        sequencia:12, conquistas:28, trilhasCount:3, desafiosConcluidos:45, xpTotal:18450
    },
    activity:[
        {icon:'checkCircle', color:'green', title:'Concluiu a aula', sub:'Variáveis e Tipos Primitivos', time:'há 2h'},
        {icon:'zap', color:'orange', title:'Ganhou +150 XP', sub:'Por concluir uma aula', time:'há 2h'},
        {icon:'star', color:'purple', title:'Desbloqueou conquista', sub:'Sequência de 7 dias', time:'há 1d'},
        {icon:'map', color:'blue', title:'Iniciou nova trilha', sub:'Lógica de Programação', time:'há 2d'},
    ]
};

/* ---------- HELPERS ---------- */
function fmt(n){ return n.toLocaleString('pt-BR'); }
function initials(name){ return name.trim().split(' ').map(w=>w[0]).slice(0,2).join('').toUpperCase(); }
function trilhaIcon(t){
    if(t.badge){ return '<div class="tr-icon" style="background:'+t.color+'"><span style="font-size:'+(t.badge.length>2?'.85rem':'1.05rem')+'; color:'+(t.textDark?'#1a1a1a':'#fff')+'">'+t.badge+'</span></div>'; }
    return '<div class="tr-icon" style="background:'+t.color+'">'+icon(t.iconKey)+'</div>';
}
function nivelClass(n){ return n==='Intermediário' ? 'amber' : (n==='Avançado' ? 'red' : ''); }

function addXP(amount){
    const u = state.user;
    u.xp += amount; u.xpTotal += amount; u.desafiosConcluidos += 1;
    while(u.xp >= u.xpProximo){ u.xp -= u.xpProximo; u.nivel += 1; u.xpProximo += 250; }
}

function showToast(msg){
    const host = document.getElementById('toastHost');
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = icon('checkCircle') + '<span>'+msg+'</span>';
    host.appendChild(t);
    setTimeout(()=>{ t.style.opacity='0'; t.style.transition='opacity .3s ease'; setTimeout(()=>t.remove(),300); }, 3200);
}

/* ---------- ILUSTRAÇÕES SVG ---------- */
function foxMark(size){
    size = size || 28;
    return '<svg width="'+size+'" height="'+size+'" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">'+
      ''+
      '<polygon points="20,45 25,15 45,40" fill="#ea580c"/>'+
      '<polygon points="80,45 75,15 55,40" fill="#ea580c"/>'+
      '<polygon points="23,40 27,20 41,37" fill="#f97316"/>'+
      '<polygon points="77,40 73,20 59,37" fill="#f97316"/>'+
      ''+
      '<polygon points="20,45 50,70 15,65" fill="#f1f5f9"/>'+
      '<polygon points="80,45 50,70 85,65" fill="#f1f5f9"/>'+
      ''+
      '<polygon points="20,45 80,45 50,70" fill="#f97316"/>'+
      '<polygon points="35,45 65,45 50,58" fill="#ea580c"/>'+
      ''+
      '<circle cx="38" cy="48" r="4" fill="#0f172a"/>'+
      '<circle cx="62" cy="48" r="4" fill="#0f172a"/>'+
      ''+
      '<polygon points="46,65 54,65 50,70" fill="#0f172a"/>'+
    '</svg>';
  }

  function foxIllustration(){
    return '<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" class="visual-fox">'+
      '<defs><linearGradient id="foxGrad" x1="0" y1="0" x2="0" y2="1">'+
      '<stop offset="0%" stop-color="#f97316"/><stop offset="100%" stop-color="#ea580c"/></linearGradient></defs>'+
      ''+
      '<polygon points="60,130 80,40 140,110" fill="#ea580c"/>'+
      '<polygon points="240,130 220,40 160,110" fill="#ea580c"/>'+
      '<polygon points="70,120 85,55 130,105" fill="#475569"/>'+
      '<polygon points="230,120 215,55 170,105" fill="#475569"/>'+
      ''+
      '<polygon points="50,130 150,210 30,190" fill="#f1f5f9"/>'+
      '<polygon points="250,130 150,210 270,190" fill="#f1f5f9"/>'+
      ''+
      '<polygon points="50,130 250,130 150,210" fill="url(#foxGrad)"/>'+
      ''+
      '<polygon points="110,130 190,130 150,165" fill="#fbebde" opacity=".3"/>'+
      ''+
      '<ellipse cx="115" cy="140" rx="7" ry="9" fill="#0f172a"/>'+
      '<ellipse cx="185" cy="140" rx="7" ry="9" fill="#0f172a"/>'+
      '<circle cx="117" cy="138" r="2.5" fill="#fff"/>'+
      '<circle cx="187" cy="138" r="2.5" fill="#fff"/>'+
      ''+
      '<polygon points="138,198 162,198 150,210" fill="#0f172a"/>'+
    '</svg>';
  }

  function mascotIllustration(){
    return '<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg" class="mascot-fox">'+
      ''+
      '<ellipse cx="100" cy="205" rx="55" ry="10" fill="#000" opacity=".2"/>'+
      ''+
      '<polygon points="45,90 55,30 95,75" fill="#ea580c"/>'+
      '<polygon points="155,90 145,30 105,75" fill="#ea580c"/>'+
      '<polygon points="52,82 60,42 90,72" fill="#fbebde"/>'+
      '<polygon points="148,82 140,42 110,72" fill="#fbebde"/>'+
      ''+
      '<rect x="65" y="125" width="70" height="75" rx="16" fill="#1e293b"/>'+
      ''+
      '<text x="100" y="165" fill="#f97316" font-family="monospace" font-weight="bold" font-size="16" text-anchor="middle">&lt;/&gt;</text>'+
      ''+
      '<polygon points="40,90 100,150 25,135" fill="#f1f5f9"/>'+
      '<polygon points="160,90 100,150 175,135" fill="#f1f5f9"/>'+
      ''+
      '<polygon points="40,90 160,90 100,150" fill="#f97316"/>'+
      ''+
      '<circle cx="75" cy="105" r="6" fill="#1e293b"/>'+
      '<circle cx="125" cy="105" r="6" fill="#1e293b"/>'+
      '<circle cx="77" cy="103" r="2" fill="#fff"/>'+
      '<circle cx="127" cy="103" r="2" fill="#fff"/>'+
      ''+
      '<circle cx="100" cy="142" r="4.5" fill="#1e293b"/>'+
    '</svg>';
  }

function starDots(){
    let s=''; const positions=[[8,12],[22,6],[40,18],[60,9],[78,15],[90,24],[15,40],[35,55],[55,38],[70,50],[85,60],[12,70],[30,80],[50,72],[65,85],[88,78],[20,92],[45,90],[75,95]];
    positions.forEach(p=>{ s += '<span style="left:'+p[0]+'%; top:'+p[1]+'%;"></span>'; });
    return s;
}

/* ---------- COMPONENTES DE TELA (RENDER) ---------- */
function render(){
    const root = document.getElementById('app');
    root.innerHTML = state.loggedIn ? renderShell() : renderAuth();
    if(window.lucide) lucide.createIcons();
    if(state.view==='atividade'){
        const ta = document.getElementById('codeEditor');
        if(ta){ syncGutter(ta); }
    }
}

function renderAuth(){
    const isLogin = state.authMode==='login';
    return '<div id="authScreen">'+
        '<div id="authForm">'+
            ''+
            '<div class="logo-mark" style="margin-bottom: 40px; font-family: \'Sora\', sans-serif; font-size: 1.8rem; font-weight: 800; color: #fff;">'+
                'Dev<span style="color: #f97316;">Fox</span>'+ 
            '</div>'+
            (isLogin ?
                ('<div><div class="auth-title">Bem-vindo de volta!</div><p class="auth-sub">Faça login para continuar sua jornada de aprendizado.</p></div>'+
                '<form data-form="login" novalidate>'+
                    '<div class="field"><label for="loginEmail">E-mail</label><div class="input-wrap">'+icon('mail')+'<input id="loginEmail" type="email" placeholder="Digite seu e-mail" autocomplete="username"></div></div>'+
                    '<div class="field" style="margin-top:16px"><label for="loginPass">Senha</label><div class="input-wrap">'+icon('lock')+
                        '<input id="loginPass" type="'+(state.showPass?'text':'password')+'" placeholder="Digite sua senha" autocomplete="current-password">'+
                        '<button type="button" data-action="toggle-pass">'+icon(state.showPass?'eyeOff':'eye')+'</button></div></div>'+
                    '<div class="row-between-sm" style="margin-top:14px"><label class="checkbox-line"><input type="checkbox"> Lembrar-me</label><a href="#" class="link-orange" data-action="noop">Esqueci minha senha</a></div>'+
                    '<div class="auth-error">'+(state.authError||'')+'</div>'+
                    '<button type="submit" class="btn btn-primary btn-block" style="margin-top:6px">Entrar '+icon('arrowRight')+'</button>'+
                    '<div class="divider" style="margin:18px 0">ou</div>'+
                    '<button type="button" class="btn btn-outline btn-block" data-action="show-signup">'+icon('userPlus')+' Criar uma conta</button>'+
                '</form>'+
                '<p class="auth-hint">Modo demonstração — digite qualquer e-mail e senha para entrar.</p>'+
                '<p class="auth-foot">Precisa de ajuda? Fale com o <a href="#" class="link-orange" data-action="noop">suporte</a>.</p>')
            :
                ('<div><div class="auth-title">Crie sua conta</div><p class="auth-sub">Comece sua jornada de aprendizado em programação hoje.</p></div>'+
                '<form data-form="signup" novalidate>'+
                    '<div class="field"><label for="suNome">Nome</label><div class="input-wrap">'+icon('user')+'<input id="suNome" type="text" placeholder="Como podemos te chamar?" autocomplete="name"></div></div>'+
                    '<div class="field" style="margin-top:16px"><label for="suEmail">E-mail</label><div class="input-wrap">'+icon('mail')+'<input id="suEmail" type="email" placeholder="Digite seu e-mail" autocomplete="email"></div></div>'+
                    '<div class="field" style="margin-top:16px"><label for="suPass">Senha</label><div class="input-wrap">'+icon('lock')+'<input id="suPass" type="password" placeholder="Crie uma senha" autocomplete="new-password"></div></div>'+
                    '<div class="field" style="margin-top:16px"><label for="suPass2">Confirmar senha</label><div class="input-wrap">'+icon('lock')+'<input id="suPass2" type="password" placeholder="Repita a senha" autocomplete="new-password"></div></div>'+
                    '<div class="auth-error">'+(state.authError||'')+'</div>'+
                    '<button type="submit" class="btn btn-primary btn-block" style="margin-top:14px">Criar conta '+icon('arrowRight')+'</button>'+
                    '<div class="divider" style="margin:18px 0">ou</div>'+
                    '<button type="button" class="btn btn-outline btn-block" data-action="show-login">Já tenho uma conta</button>'+
                '</form>')
            )+
        '</div>'+
        '<div id="authVisual">'+
        /*colocar imagem ↓*/
            '<img src="img/image.png" alt="Ilustração DevFox" class="auth-side-image">'+
            '<div class="visual-stars">'+starDots()+'</div>'+
            '<div class="code-chip c1">const dev = new DevFox();</div>'+
            '<div class="code-chip c2">streak++; // 12 dias seguidos</div>'+
        '</div>'+
    '</div>';
}

function renderShell(){
    return '<div id="appShell">' + renderSidebar() + '<main id="mainArea">' + renderView() + '</main></div>';
}

function renderSidebar(){
    const u = state.user;
    const navHtml = navItems.map(n=>{
        const active = state.view===n.view ? ' active' : '';
        return '<a href="#" class="nav-link'+active+'" data-action="nav" data-view="'+n.view+'">'+icon(n.i)+'<span>'+n.label+'</span></a>';
    }).join('');
    return '<aside id="sidebar">'+
        '<div class="sidebar-logo"><div class="logo-mark">'+foxMark(28)+'<span class="name" style="font-size:1.2rem">Dev<span class="fox">Fox</span></span></div></div>'+
        '<nav>'+navHtml+'</nav>'+
        '<div class="sidebar-foot">'+
            '<div class="card" style="padding:14px;">'+
                '<div class="user-mini" style="cursor:pointer" data-action="nav" data-view="perfil">'+
                    '<div class="avatar">'+initials(u.nome)+'</div>'+
                    '<div><div class="user-mini-name">'+u.nome+'</div><div class="user-mini-role">'+u.titulo+'</div></div>'+
                '</div>'+
                '<div class="mini-level"><span>Nível '+u.nivel+'</span><span>'+fmt(u.xp)+' / '+fmt(u.xpProximo)+' XP</span></div>'+
                '<div class="progress-track"><div class="progress-fill" style="width:'+Math.min(100,(u.xp/u.xpProximo*100))+'%"></div></div>'+
                '<div class="mini-stats" style="margin-top:12px">'+
                    '<div class="mini-stat">'+icon('flame')+'<b>'+u.sequencia+'</b>Sequência</div>'+
                    '<div class="mini-stat">'+icon('star')+'<b>'+u.conquistas+'</b>Conquistas</div>'+
                    '<div class="mini-stat">'+icon('layers')+'<b>'+u.trilhasCount+'</b>Trilhas</div>'+
                '</div>'+
            '</div>'+
            '<button class="btn btn-ghost btn-block btn-sm" data-action="logout">'+icon('logout')+' Sair</button>'+
        '</div>'+
    '</aside>';
}

function renderView(){
    switch(state.view){
        case 'dashboard': return renderDashboard();
        case 'trilhas': return renderTrilhas();
        case 'atividade': return renderAtividade();
        case 'perfil': return renderPerfil();
        default: return renderPlaceholder(state.view);
    }
}

function renderDashboard(){
    const u = state.user;
    const trilhaAtual = trilhasData.find(t=>t.id==='logica');
    const desafios = ['par-ou-impar','fatorial','contagem-vogais'].map(id=>exercisesData[id]);
    return topbar('Olá, '+u.nome+'!', 'Continue sua jornada e evolua suas habilidades.') +
    '<div class="hero">'+
        '<div><h2>Seu próximo avanço <span>está te esperando.</span></h2>'+
        '<p>Aprenda. Pratique. Construa. Evolua como um verdadeiro dev.</p>'+
        '<div class="hero-actions">'+
            '<button class="btn btn-primary" data-action="open-exercise" data-id="soma-dois-numeros">Continuar aprendendo '+icon('arrowRight')+'</button>'+
            '<button class="btn btn-outline" data-action="nav" data-view="trilhas">Explorar trilhas</button>'+
        '</div></div>'+
        ''+
        '<div class="hero-art">'+
            /*colocar imagem ↓*/
            '<img src="img/image.png" alt="DevFox" class="visual-fox">'+
        '</div>'+
    '</div>'+
    '<div class="stat-grid">'+
        statCard('award','Nível', u.nivel, u.titulo)+
        statCard('zap','XP', fmt(u.xp), 'de '+fmt(u.xpProximo)+' XP', true, u.xp/u.xpProximo*100)+
        statCard('flame','Sequência', u.sequencia, 'dias seguidos')+
        statCard('star','Conquistas', u.conquistas, 'em 72 disponíveis')+
    '</div>'+
    '<div class="dash-grid">'+
        '<div>'+
            '<div class="panel">'+
                '<div class="section-title"><h3>Continue aprendendo</h3></div>'+
                '<div class="track-resume" data-action="open-exercise" data-id="'+trilhaAtual.exerciseId+'">'+
                    '<div class="track-icon">'+icon('code')+'</div>'+
                    '<div class="track-info"><div class="eyebrow">Trilha em andamento</div><h4>'+trilhaAtual.nome+'</h4><p>'+trilhaAtual.desc+'</p></div>'+
                    '<div class="track-pct">'+trilhaAtual.progresso+'%</div>'+
                '</div>'+
                '<div class="track-progress-row"><span>Módulo '+trilhaAtual.moduloAtual+' de '+trilhaAtual.modulos+'</span><div class="progress-track"><div class="progress-fill" style="width:'+trilhaAtual.progresso+'%"></div></div><span>'+trilhaAtual.progresso+'% concluído</span></div>'+
            '</div>'+
            '<div class="panel">'+
                '<div class="section-title"><h3>Desafios em destaque</h3></div>'+
                desafios.map(d=>{
                    return '<div class="list-item" data-action="open-exercise" data-id="'+keyOf(d)+'">'+
                        '<div class="list-icon">'+icon('target')+'</div>'+
                        '<div class="list-text"><h5>'+d.titulo+'</h5><p>'+d.categoria+'</p></div>'+
                        '<div class="list-xp">+'+d.recompensa+' XP</div>'+icon('chevronRight','faint')+
                    '</div>';
                }).join('')+
                '<div style="text-align:center; margin-top:10px"><a href="#" class="link-orange" style="font-size:.84rem" data-action="nav" data-view="desafios">Ver todos os desafios</a></div>'+
            '</div>'+
        '</div>'+
        '<div>'+
            '<div class="panel">'+
                '<div class="section-title"><h3>'+icon('trophy')+' Top Ranking</h3><a href="#" data-action="nav" data-view="ranking">Ver ranking</a></div>'+
                rankRow(1,'LucasDev',5420,true)+rankRow(2,'BeatrizCode',4310,true)+rankRow(3,'RafaDev',3980,true)+rankRow(4,u.nome,u.xp,false,true)+
            '</div>'+
            '<div class="panel">'+
                '<div class="section-title"><h3>Acesso rápido</h3></div>'+
                '<div class="quick-grid">'+
                    quickBtn('map','Trilhas','trilhas')+quickBtn('target','Desafios','desafios')+quickBtn('trophy','Ranking','ranking')+quickBtn('store','Loja','loja')+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';
}

function keyOf(d){ for(const k in exercisesData){ if(exercisesData[k]===d) return k; } return ''; }
function statCard(ic,label,value,sub,withBar,pct){
    return '<div class="card stat-card"><div class="stat-top">'+icon(ic)+'<span>'+label+'</span></div>'+
        '<div class="stat-value">'+value+'</div><div class="stat-sub">'+sub+'</div>'+
        (withBar?'<div class="stat-bar progress-track"><div class="progress-fill" style="width:'+pct+'%"></div></div>':'')+
    '</div>';
}
function rankRow(num,name,xp,isTop3,isMe){
    return '<div class="rank-row'+(isMe?' me':'')+'">'+
        '<div class="rank-num'+(num===1?' gold':'')+'">'+num+'</div>'+
        '<div class="rank-avatar">'+initials(name)+'</div>'+
        '<div class="rank-name">'+name+'</div>'+
        '<div class="rank-xp">'+fmt(xp)+' XP</div>'+
    '</div>';
}
function quickBtn(ic,label,view){
    return '<button class="quick-btn" data-action="nav" data-view="'+view+'">'+icon(ic)+'<span>'+label+'</span></button>';
}

function renderTrilhas(){
    const sel = trilhasData.find(t=>t.id===state.selectedTrilha) || trilhasData[1];
    return topbar('Trilhas de Aprendizado','Escolha uma trilha ou continue de onde parou. Aprenda, pratique e evolua.') +
    '<div class="trilhas-grid"><div>'+
        '<h3 style="font-size:1rem; font-weight:700; margin-bottom:14px;">Todas as trilhas</h3>'+
        trilhasData.map(t=>{
            const selCls = (t.id===state.selectedTrilha && !t.locked) ? ' selected' : '';
            const lockedCls = t.locked ? ' locked' : '';
            const action = t.locked ? '' : (t.exerciseId ? ' data-action="open-exercise" data-id="'+t.exerciseId+'"' : ' data-action="select-trilha" data-trilha="'+t.id+'"');
            const btn = t.locked ? '<button class="btn btn-ghost btn-sm" disabled>'+icon('lock')+' Bloqueada</button>'
                : (t.progresso>0 ? '<button class="btn btn-primary btn-sm">Continuar</button>' : '<button class="btn btn-outline btn-sm">Explorar</button>');
            return '<div class="trilha-row'+selCls+lockedCls+'"'+action+'>'+
                trilhaIcon(t)+
                '<div class="tr-body"><h4>'+t.nome+'</h4><p>'+t.desc+'</p>'+
                    '<div class="tr-meta"><span class="badge-dot '+nivelClass(t.nivel)+'">'+t.nivel+'</span><span>'+t.modulos+' módulos</span></div>'+
                '</div>'+
                '<div class="tr-right">'+(t.locked?'<span class="faint" style="font-size:.78rem">Bloqueada</span>':'<span class="tr-pct">'+t.progresso+'%</span>')+
                    (t.locked?'':'<div class="progress-track tr-track"><div class="progress-fill" style="width:'+t.progresso+'%"></div></div>')+
                    btn+
                '</div>'+
            '</div>';
        }).join('')+
        '<div class="panel" style="margin-top:22px">'+
            '<div class="section-title"><h3>Recomendadas para você</h3></div>'+
            '<div class="reco-grid">'+
                recoCard('play','Próxima lição','Variáveis e Tipos de Dados','Lógica de Programação · Módulo 2','open-exercise','soma-dois-numeros')+
                recoCard('shuffle','Continue praticando','Desafio: Soma de Números','Desafios Práticos · 150 XP','open-exercise','soma-dois-numeros')+
                recoCard('code','Sugestão para você','DOM: Manipulação Básica','JavaScript Básico · Módulo 4','select-trilha','js')+
            '</div>'+
        '</div>'+
    '</div>'+
    '<div>'+
        '<div class="detail-card card">'+
            '<div class="detail-icon" style="background:'+sel.color+'">'+(sel.badge?('<span style="font-size:'+(sel.badge.length>2?'1rem':'1.3rem')+'; color:'+(sel.textDark?'#1a1a1a':'#fff')+'">'+sel.badge+'</span>'):icon(sel.iconKey))+'</div>'+
            '<h4>'+sel.nome+'</h4><p>'+sel.desc+'</p>'+
            '<div class="tr-meta" style="margin-bottom:16px"><span class="badge-dot '+nivelClass(sel.nivel)+'">'+sel.nivel+'</span><span>'+sel.modulos+' módulos</span></div>'+
            (sel.locked ? '<button class="btn btn-ghost btn-block" disabled>'+icon('lock')+' Bloqueada</button>' :
                '<button class="btn btn-primary btn-block" data-action="'+(sel.exerciseId?'open-exercise':'select-trilha')+'" data-id="'+(sel.exerciseId||'')+'" data-trilha="'+sel.id+'">'+(sel.progresso>0?'Continuar':'Explorar')+'</button>')+
        '</div>'+
    '</div></div>';
}

function recoCard(ic,eyebrow,title,sub,action,id){
    return '<div class="card reco-card" data-action="'+action+'" data-id="'+id+'" data-trilha="'+id+'">'+
        '<div class="eyebrow">'+icon(ic)+' '+eyebrow+'</div><h5>'+title+'</h5><p>'+sub+'</p></div>';
}

function renderAtividade(){
    const ex = exercisesData[state.currentExerciseId] || exercisesData['soma-dois-numeros'];
    const pct = Math.round((ex.licaoAtual/ex.licaoTotal)*100);
    const diffCls = ex.dificuldade==='Médio' ? 'medio' : (ex.dificuldade==='Difícil' ? 'dificil' : '');
    const consoleCls = state.exerciseResult==='ok' ? 'ok' : (state.exerciseResult==='fail' ? 'fail' : 'idle');
    const consoleIcon = state.exerciseResult==='ok' ? icon('checkCircle') : (state.exerciseResult==='fail' ? icon('x') : icon('terminal'));
    return topbar('Atividade','Resolva o desafio e avance na sua trilha de aprendizado.') +
    '<div class="crumb"><a href="#" data-action="nav" data-view="trilhas">Trilhas</a>'+icon('chevronRight')+'<span>'+ex.trilha+'</span>'+icon('chevronRight')+'<b>'+ex.categoria+'</b></div>'+
    '<div class="card progress-pill"><span class="faint" style="font-size:.85rem; font-weight:600">Lição '+ex.licaoAtual+' de '+ex.licaoTotal+'</span><div class="progress-track"><div class="progress-fill" style="width:'+pct+'%"></div></div><span style="font-weight:700; font-size:.85rem">'+pct+'%</span></div>'+
    '<div class="activity-grid"><div>'+
        '<div class="card exercise-card">'+
            '<div class="ex-head"><div class="ex-icon">'+icon('code')+'</div><div><h3>'+ex.titulo+'</h3><p>'+ex.descricao+'</p></div></div>'+
            (state.exerciseResult==='ok' ? '<div class="feedback-banner ok">'+icon('checkCircle')+' Resposta correta! Você ganhou +'+ex.recompensa+' XP.</div>' : '')+
            (state.exerciseResult==='fail' ? '<div class="feedback-banner fail">'+icon('x')+' Quase lá. Confira a saída esperada e tente novamente.</div>' : '')+
            '<div class="editor-label">Editor de código <span class="lang-pill">'+icon('code')+' JavaScript</span></div>'+
            '<div class="editor-box">'+
                '<div class="editor-gutter" id="gutter"></div>'+
                '<textarea id="codeEditor" class="editor-area" spellcheck="false">'+escapeHtml(state.exerciseCode)+'</textarea>'+
            '</div>'+
            '<div class="console-label">Sua resposta (saída do console)</div>'+
            '<div class="console-box '+consoleCls+'">'+consoleIcon+'<span>'+(state.consoleOutput || 'A saída do seu código aparecerá aqui...')+'</span></div>'+
            '<div class="console-label">Saída esperada</div>'+
            '<div class="console-box idle" style="color:#86efac">'+icon('terminal')+'<span>'+ex.esperado+'</span></div>'+
            '<div class="ex-actions">'+
                '<button class="btn btn-ghost" data-action="back">'+icon('arrowLeft')+' Voltar</button>'+
                '<button class="btn btn-primary" data-action="submit-answer">Enviar resposta '+icon('send')+'</button>'+
            '</div>'+
        '</div>'+
    '</div>'+
    '<div>'+
        '<div class="aside-card card">'+
            '<h4>'+icon('target')+' Sobre o desafio</h4>'+
            '<div style="margin-bottom:14px"><div class="aside-row" style="margin-bottom:4px"><b>Objetivo</b></div><p class="faint" style="font-size:.82rem; line-height:1.55">'+ex.objetivo+'</p></div>'+
            '<div class="aside-row"><span>Dificuldade</span><span class="diff-pill '+diffCls+'">'+ex.dificuldade+'</span></div>'+
            '<div class="reward-row"><span class="label">Recompensa</span><span class="val">+'+ex.recompensa+' XP</span></div>'+
            '<button class="btn btn-outline btn-block" data-action="use-hint">'+icon('lightbulb')+' Usar dica</button>'+
        '</div>'+
        '<div class="aside-card card">'+
            '<h4>'+icon('checkCircle')+' Passos para concluir</h4>'+
            stepRow('done','Ler o enunciado')+
            stepRow(state.exerciseResult==='ok'?'done':'active','Escrever a lógica')+
            stepRow(state.exerciseResult==='ok'?'done':'todo','Testar a resposta')+
        '</div>'+
        '<div class="aside-card card hint-box" id="hintBox">'+
            '<h4>'+icon('lightbulb')+' Dica</h4><p>'+ex.dica+'</p>'+
            (state.showExample ? '<div class="example-reveal">'+escapeHtml(ex.exemplo)+'</div>' : '')+
            '<button class="btn btn-ghost btn-block btn-sm" data-action="show-example">'+icon('image')+' '+(state.showExample?'Ocultar exemplo':'Mostrar exemplo')+'</button>'+
        '</div>'+
    '</div></div>';
}

function stepRow(status,label){
    const n = status==='active' ? '2' : '3';
    const dot = status==='done' ? icon('check') : n;
    return '<div class="step-row '+status+'"><div class="step-dot '+status+'">'+dot+'</div><span>'+label+'</span></div>';
}
function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function renderPerfil(){
    const u = state.user;
    const badges = [
        {ic:'star', title:'Código Iniciante', desc:'Complete sua primeira aula', date:'05/05/2025', color:'#ea580c'},
        {ic:'trophy', title:'Primeiro Desafio', desc:'Conclua seu primeiro desafio', date:'08/05/2025', color:'#2563eb'},
        {ic:'star', title:'Sequência de 7', desc:'Mantenha 7 dias de sequência', date:'12/05/2025', color:'#9333ea'},
        {ic:'award', title:'Explorador', desc:'Inicie 3 trilhas diferentes', date:'15/05/2025', color:'#d97706'},
    ];
    const actColors = {green:'#22c55e', orange:'#f97316', purple:'#a855f7', blue:'#3b82f6'};
    return topbar('Perfil','Gerencie sua conta, acompanhe seu progresso e conquistas.') +
    '<div class="profile-grid"><div>'+
        '<div class="card profile-head">'+
            '<div class="avatar-lg">'+initials(u.nome)+'</div>'+
            '<div class="profile-id">'+
                '<h2>'+u.nome+' <span class="lvl-tag">Nível '+u.nivel+'</span></h2>'+
                '<div class="role">'+u.titulo+'</div>'+
                '<div class="profile-xp">'+fmt(u.xp)+' / '+fmt(u.xpProximo)+' XP</div>'+
                '<div class="progress-track" style="max-width:320px"><div class="progress-fill" style="width:'+(u.xp/u.xpProximo*100)+'%"></div></div>'+
            '</div>'+
            '<div class="profile-actions"><button class="btn btn-outline btn-sm">'+icon('pencil')+' Editar perfil</button><button class="btn btn-ghost btn-sm">'+icon('image')+' Alterar avatar</button></div>'+
            '<div class="mini-row">'+
                mstat('flame', u.sequencia, 'Sequência atual')+mstat('star', u.conquistas, 'Conquistas')+mstat('map', u.trilhasCount, 'Trilhas concluídas')+mstat('target', u.desafiosConcluidos, 'Desafios concluídos')+
            '</div>'+
        '</div>'+
        '<div class="panel"><div class="section-title"><h3>Conquistas</h3><a href="#" data-action="noop">Ver todas</a></div>'+
            '<div class="badge-grid">'+badges.map(b=>'<div class="card badge-card"><div class="badge-hex" style="background:'+b.color+'">'+icon(b.ic)+'</div><h5>'+b.title+'</h5><p>'+b.desc+'</p><div class="date">'+b.date+'</div></div>').join('')+'</div>'+
        '</div>'+
        '<div class="panel"><div class="section-title"><h3>Estatísticas</h3></div>'+
            '<div class="estat-grid">'+
                estatCard('zap','XP total', fmt(u.xpTotal), '+1.250 esta semana')+
                estatCard('target','Desafios concluídos', u.desafiosConcluidos, '+8 esta semana')+
                estatCard('map','Trilhas concluídas', u.trilhasCount, '+1 esta semana')+
                estatCard('flame','Sequência atual', u.sequencia+' dias', 'Melhor: '+u.sequencia+' dias')+
            '</div>'+
        '</div>'+
        '<div class="card quote-box">'+icon('quote')+'<p>Cada linha de código te aproxima do seu melhor.<small>Continue aprendendo e evoluindo!</small></p></div>'+
    '</div>'+
    '<div>'+
        '<div class="card mascot-card"><h4>Mascote</h4><div class="sub">Seu companheiro de jornada</div>'+mascotIllustration()+
            '<button class="btn btn-outline btn-block btn-sm">'+icon('shirt')+' Personalizar mascote</button></div>'+
        '<div class="panel"><div class="section-title"><h3>Atividade recente</h3><a href="#" data-action="noop">Ver todas</a></div>'+
            state.activity.slice(0,6).map(a=>{
                const c = actColors[a.color];
                return '<div class="recent-row"><div class="recent-icon" style="background:'+c+'22; color:'+c+'">'+icon(a.icon)+'</div><div class="recent-text"><h6>'+a.title+'</h6><p>'+a.sub+'</p></div><div class="recent-time">'+a.time+'</div></div>';
            }).join('')+
            '<button class="btn btn-ghost btn-block btn-sm" style="margin-top:12px">Ver todas as atividades</button>'+
        '</div>'+
    '</div></div>';
}

function mstat(ic,val,label){ return '<div class="mstat">'+icon(ic)+'<div><b>'+val+'</b><span>'+label+'</span></div></div>'; }
function estatCard(ic,label,val,delta){ return '<div class="card estat-card"><div class="lab">'+icon(ic)+'<span>'+label+'</span></div><div class="v">'+val+'</div><div class="delta">'+delta+'</div></div>'; }

function renderPlaceholder(view){
    const map = {desafios:['target','Desafios'], ranking:['trophy','Ranking'], loja:['store','Loja'], config:['settings','Configurações']};
    const m = map[view] || ['home','Página'];
    return topbar(m[1], '') + '<div class="card placeholder"><div class="ico">'+icon(m[0])+'</div><h3>'+m[1]+' em construção</h3><p>Esta área será conectada à API REST e ao banco de dados na próxima etapa do desenvolvimento do DevFox.</p><button class="btn btn-primary" data-action="nav" data-view="dashboard">Voltar ao início</button></div>';
}

function topbar(title, sub){
    return '<div class="topbar"><div><h1>'+title+'</h1>'+(sub?'<p>'+sub+'</p>':'')+'</div><button class="bell-btn">'+icon('bell')+'</button></div>';
}

/* ---------- MARCADOR DE LINHAS (GUTTER) ---------- */
function syncGutter(ta){
    const gutter = document.getElementById('gutter');
    if(!gutter) return;
    function update(){
        const lines = ta.value.split('\n').length;
        let s='';
        for(let i=1;i<=lines;i++){ s += i + '\n'; }
        gutter.textContent = s;
        gutter.scrollTop = ta.scrollTop;
    }
    update();
    ta.addEventListener('input', ()=>{ state.exerciseCode = ta.value; update(); });
    ta.addEventListener('scroll', ()=>{ gutter.scrollTop = ta.scrollTop; });
}

/* ---------- MOTOR DE EVALUATION ---------- */
function runExercise(){
    const ex = exercisesData[state.currentExerciseId];
    const code = state.exerciseCode;
    let output = '';
    const fakeConsole = { log:function(){ output += Array.prototype.slice.call(arguments).map(String).join(' ') + '\n'; } };
    try{
        const fn = new Function('console', code);
        fn(fakeConsole);
        output = output.trim();
    }catch(e){
        output = 'Erro: ' + e.message;
    }
    state.consoleOutput = output || '(nenhuma saída — use console.log())';
    if(output === ex.esperado){
        state.exerciseResult = 'ok';
        addXP(ex.recompensa);
        state.activity.unshift({icon:'checkCircle', color:'green', title:'Concluiu o desafio', sub:ex.titulo, time:'agora'});
        state.activity.unshift({icon:'zap', color:'orange', title:'Ganhou +'+ex.recompensa+' XP', sub:'Por concluir um desafio', time:'agora'});
        showToast('Resposta correta! +'+ex.recompensa+' XP');
    } else {
        state.exerciseResult = 'fail';
    }
    render();
}

/* ---------- INTERCEPTADOR DE EVENTOS (CLIQUE) ---------- */
document.addEventListener('click', function(e){
    const el = e.target.closest('[data-action]');
    if(!el) return;
    const action = el.getAttribute('data-action');
    if(action==='noop'){ e.preventDefault(); return; }
    e.preventDefault();

    switch(action){
        case 'nav':
            state.view = el.getAttribute('data-view');
            window.scrollTo(0,0);
            render();
            break;
        case 'toggle-pass':
            state.showPass = !state.showPass;
            render();
            break;
        case 'show-signup':
            state.authMode='signup'; state.authError=''; render();
            break;
        case 'show-login':
            state.authMode='login'; state.authError=''; render();
            break;
        case 'logout':
            state.loggedIn=false; state.authMode='login'; state.view='dashboard'; render();
            break;
        case 'select-trilha':
            state.selectedTrilha = el.getAttribute('data-trilha');
            render();
            break;
        case 'open-exercise':{
            const id = el.getAttribute('data-id');
            if(!id || !exercisesData[id]) return;
            state.prevView = state.view;
            state.currentExerciseId = id;
            state.exerciseCode = exercisesData[id].starter;
            state.exerciseResult = null;
            state.consoleOutput = '';
            state.showExample = false;
            state.view = 'atividade';
            window.scrollTo(0,0);
            render();
            break;
        }
        case 'back':
            state.view = state.prevView || 'trilhas';
            render();
            break;
        case 'submit-answer':
            runExercise();
            break;
        case 'show-example':
            state.showExample = !state.showExample;
            render();
            break;
        case 'use-hint':{
            const hb = document.getElementById('hintBox');
            if(hb){ hb.scrollIntoView({behavior:'smooth', block:'center'}); hb.style.borderColor='var(--orange)'; setTimeout(()=>{hb.style.borderColor='';},1200); }
            break;
        }
    }
});

/* ---------- INTERCEPTADOR DE FORMULÁRIOS (SUBMIT) ---------- */
document.addEventListener('submit', function(e){
    const form = e.target.closest('form');
    if(!form) return;
    e.preventDefault();
    const kind = form.getAttribute('data-form');
    if(kind==='login'){
        const email = document.getElementById('loginEmail').value.trim();
        const pass = document.getElementById('loginPass').value.trim();
        if(!email || !pass){ state.authError='Preencha e-mail e senha para continuar.'; render(); return; }
        state.authError=''; state.loggedIn=true; state.view='dashboard'; render();
    } else if(kind==='signup'){
        const nome = document.getElementById('suNome').value.trim();
        const email = document.getElementById('suEmail').value.trim();
        const p1 = document.getElementById('suPass').value;
        const p2 = document.getElementById('suPass2').value;
        if(!nome || !email || !p1 || !p2){ state.authError='Preencha todos os campos.'; render(); return; }
        if(p1 !== p2){ state.authError='As senhas não coincidem.'; render(); return; }
        state.authError='';
        state.user = {nome:nome, titulo:'Dev Iniciante', nivel:1, xp:0, xpProximo:500, sequencia:0, conquistas:0, trilhasCount:0, desafiosConcluidos:0, xpTotal:0};
        state.activity = [{icon:'sparkles', color:'orange', title:'Conta criada', sub:'Bem-vindo ao DevFox', time:'agora'}];
        state.loggedIn=true; state.view='dashboard'; render();
    }
});

// Inicialização Automática da SPA
render();