/* ============================================================
   MODELO DE DADOS
   ============================================================ */
const SAVED_DATA_KEY = 'curriculo-facil-data-v1';
let data = {
  fullName:'Seu Nome Completo',
  role:'Cargo desejado',
  email:'voce@email.com',
  phone:'(11) 90000-0000',
  location:'São Paulo, SP',
  linkedin:'linkedin.com/in/seunome',
  photo:'',
  summary:'Escreva aqui um resumo curto sobre sua trajetória, principais habilidades e o que você busca profissionalmente.',
  experience:[
    {id:1, role:'Cargo', company:'Empresa', dates:'2022 — atual', desc:'Descreva suas principais responsabilidades e resultados.'}
  ],
  education:[
    {id:1, course:'Curso / Formação', school:'Instituição', dates:'2018 — 2022'}
  ],
  skills:'Comunicação, Organização, Excel',
  languages:'Português (nativo), Inglês (avançado)'
};
let expCounter=1, eduCounter=1;

/* ============================================================
   MODELOS (TEMPLATES)
   ============================================================ */
const templates = [
  {id:'executivo', name:'Executivo Clássico', structure:'executivo', desc:'Serifado, centrado, sóbrio',
    colors:['#1e3a5f','#3d4f7d','#2b2b2b','#556b2f'], accent:0,
    layoutOpts:[{key:'showPhoto',label:'Mostrar foto',default:true}]},
  {id:'sidebar', name:'Sidebar Moderno', structure:'sidebar', desc:'Coluna lateral com contato',
    colors:['#0f766e','#1e3a5f','#7c2d3c','#3d4f7d'], accent:0,
    layoutOpts:[{key:'showPhoto',label:'Mostrar foto',default:true},{key:'sideRight',label:'Coluna à direita',default:false}]},
  {id:'minimal', name:'Minimalista', structure:'minimal', desc:'Espaço em branco, discreto',
    colors:['#2b2b2b','#556b2f','#1e3a5f','#7c2d3c'], accent:0,
    layoutOpts:[{key:'showPhoto',label:'Mostrar foto',default:true}]},
  {id:'criativo', name:'Criativo Colorido', structure:'criativo', desc:'Bloco de cor no topo',
    colors:['#a0522d','#0f766e','#7c2d3c','#3d4f7d'], accent:0,
    layoutOpts:[{key:'showPhoto',label:'Mostrar foto',default:true}]},
  {id:'corporativo', name:'Corporativo', structure:'corporativo', desc:'Faixa lateral, direto ao ponto',
    colors:['#1a2b4a','#1e3a5f','#556b2f','#2b2b2b'], accent:0,
    layoutOpts:[{key:'showPhoto',label:'Mostrar foto',default:true}]},
  {id:'elegante', name:'Elegante Serif', structure:'elegante', desc:'Tipografia refinada, centrado',
    colors:['#6b2d5c','#7c2d3c','#1a2b4a','#556b2f'], accent:0,
    layoutOpts:[{key:'showPhoto',label:'Mostrar foto',default:true}]},
  {id:'tech', name:'Tech / Dev', structure:'tech', desc:'Cabeçalho escuro, estilo terminal',
    colors:['#0e7490','#556b2f','#a0522d','#6b2d5c'], accent:0,
    layoutOpts:[{key:'showPhoto',label:'Mostrar foto',default:true}]},
  {id:'compacto', name:'Compacto Duas Colunas', structure:'compacto', desc:'Denso, aproveita o espaço',
    colors:['#556b2f','#1e3a5f','#7c2d3c','#a0522d'], accent:0,
    layoutOpts:[{key:'showPhoto',label:'Mostrar foto',default:true}]},
  {id:'timeline', name:'Timeline Vertical', structure:'timeline', desc:'Linha do tempo para experiências',
    colors:['#7c2d3c','#0f766e','#1a2b4a','#a0522d'], accent:0,
    layoutOpts:[{key:'showPhoto',label:'Mostrar foto',default:true}]},
  {id:'cartao', name:'Cartão de Perfil', structure:'cartao', desc:'Foto em destaque, cartão suave',
    colors:['#3d4f7d','#0f766e','#a0522d','#6b2d5c'], accent:0,
    layoutOpts:[{key:'showPhoto',label:'Mostrar foto',default:true}]},
  {id:'branco', name:'Em branco', structure:'minimal', desc:'Comece do zero',
    colors:['#2b2b2b','#1e3a5f','#556b2f','#7c2d3c'], accent:0,
    layoutOpts:[{key:'showPhoto',label:'Mostrar foto',default:true}], blank:true}
];

// 50 variações novas usando as estruturas já testadas do editor.
const extraTemplates = [
  ['Aura Editorial','elegante','Elegante e editorial','elegante',['#8b5e83','#27374d','#a0522d']],['Âncora Executivo','executivo','Clássico e confiável','executivo',['#16324f','#6b4f3a','#3d4f7d']],['Norte Minimal','minimal','Minimalista e claro','minimal',['#1f2937','#0f766e','#7c2d3c']],['Verde Essencial','minimal','Natural e profissional','minimal',['#365314','#556b2f','#0f766e']],['Ponto Focal','criativo','Criativo e marcante','criativo',['#c2410c','#be185d','#0f766e']],['Terracota Studio','criativo','Quente e autoral','criativo',['#9a3412','#a0522d','#7c2d3c']],['Onda Digital','tech','Tecnologia e produto','tech',['#0891b2','#0e7490','#2563eb']],['Terminal Pro','tech','Código e engenharia','tech',['#16a34a','#556b2f','#6b2d5c']],['Linha Direta','corporativo','Objetivo e corporativo','corporativo',['#1e40af','#1a2b4a','#374151']],['Azul Conselho','corporativo','Sério e estratégico','corporativo',['#1d4ed8','#1e3a5f','#0f766e']],['Coluna Impacto','sidebar','Contato em destaque','sidebar',['#be123c','#7c2d3c','#6b2d5c']],['Verde Conexão','sidebar','Humano e moderno','sidebar',['#047857','#0f766e','#365314']],['Ritmo Profissional','timeline','Trajetória em destaque','timeline',['#db2777','#7c2d3c','#6b2d5c']],['Marco Azul','timeline','Evolução e carreira','timeline',['#2563eb','#1e3a5f','#0e7490']],['Duas Margens','compacto','Compacto e versátil','compacto',['#a16207','#556b2f','#a0522d']],['Grid Editorial','compacto','Informação bem organizada','compacto',['#334155','#1e3a5f','#7c2d3c']],['Perfil Íris','cartao','Cartão autoral','cartao',['#7c3aed','#6b2d5c','#3d4f7d']],['Perfil Solar','cartao','Leve e acolhedor','cartao',['#d97706','#a0522d','#7c2d3c']],['Forma Clássica','executivo','Elegância tradicional','executivo',['#44403c','#2b2b2b','#1e3a5f']],['Forma Contemporânea','executivo','Clássico atualizado','executivo',['#0f766e','#1e3a5f','#7c2d3c']],['Muse Serif','elegante','Refinado e artístico','elegante',['#9f1239','#6b2d5c','#7c2d3c']],['Noir Elegante','elegante','Escuro e sofisticado','elegante',['#262626','#2b2b2b','#1a2b4a']],['Brisa Clean','minimal','Fresco e funcional','minimal',['#0284c7','#0e7490','#1e3a5f']],['Mono Focus','minimal','Direto ao ponto','minimal',['#171717','#2b2b2b','#374151']],['Cor de Fundo','criativo','Expressivo e visual','criativo',['#7e22ce','#6b2d5c','#be185d']],['Laranja Ativo','criativo','Energia e ação','criativo',['#ea580c','#a0522d','#d97706']],['Dev Stack','tech','Portfólio técnico','tech',['#4f46e5','#0e7490','#6b2d5c']],['Open Source','tech','Comunidade e código','tech',['#15803d','#556b2f','#0e7490']],['Office Prime','corporativo','Executivo e limpo','corporativo',['#475569','#1a2b4a','#2b2b2b']],['Corporate Light','corporativo','Institucional e claro','corporativo',['#0369a1','#1e3a5f','#0f766e']],['Side Note','sidebar','Visual e organizado','sidebar',['#9333ea','#6b2d5c','#3d4f7d']],['Side Balance','sidebar','Equilíbrio e clareza','sidebar',['#ca8a04','#556b2f','#a0522d']],['Jornada','timeline','História profissional','timeline',['#ea580c','#a0522d','#7c2d3c']],['Trilha Verde','timeline','Crescimento contínuo','timeline',['#16a34a','#365314','#0f766e']],['Compact Flow','compacto','Fluxo e síntese','compacto',['#0891b2','#0e7490','#1e3a5f']],['Duas Colunas Pro','compacto','Densidade profissional','compacto',['#be123c','#7c2d3c','#6b2d5c']],['Card Moderno','cartao','Perfil contemporâneo','cartao',['#0d9488','#0f766e','#3d4f7d']],['Card Monograma','cartao','Presença e personalidade','cartao',['#be185d','#7c2d3c','#6b2d5c']],['Executive Navy','executivo','Autoridade e confiança','executivo',['#172554','#1e3a5f','#1a2b4a']],['Executive Olive','executivo','Clássico natural','executivo',['#3f6212','#556b2f','#365314']],['Editorial Rose','elegante','Delicado e marcante','elegante',['#be123c','#7c2d3c','#6b2d5c']],['Editorial Stone','elegante','Neutro e sofisticado','elegante',['#57534e','#2b2b2b','#44403c']],['White Space','minimal','Respiro e foco','minimal',['#64748b','#1e3a5f','#2b2b2b']],['Mono Resume','minimal','Monocromático e forte','minimal',['#111827','#2b2b2b','#374151']],['Pop Criativo','criativo','Jovem e vibrante','criativo',['#db2777','#be185d','#7c3aed']],['Blue Canvas','criativo','Cor e confiança','criativo',['#2563eb','#1e3a5f','#0e7490']],['Code Green','tech','Tecnologia sustentável','tech',['#22c55e','#16a34a','#0f766e']],['Code Purple','tech','Digital e ousado','tech',['#8b5cf6','#6b2d5c','#7c3aed']],['Timeline Ink','timeline','Sóbrio e progressivo','timeline',['#334155','#1e3a5f','#2b2b2b']],['Timeline Coral','timeline','Acolhedor e direto','timeline',['#f97316','#a0522d','#be123c']]
].map(([name,structure,desc,category,colors], index)=>({id:'extra-'+(index+1),name,structure,desc,category,colors,accent:0,layoutOpts:[{key:'showPhoto',label:'Mostrar foto',default:true}]}));
templates.push(...extraTemplates);
const categoryByStructure = {minimal:'minimal',executivo:'executivo',criativo:'criativo',tech:'tech',sidebar:'sidebar',timeline:'timeline',compacto:'compacto',cartao:'cartao',elegante:'elegante',corporativo:'corporativo'};
templates.forEach(t=>{ if(!t.category) t.category = categoryByStructure[t.structure] || 'minimal'; });
let galleryQuery = '';
let galleryCategory = 'Todos';

try { const saved = localStorage.getItem(SAVED_DATA_KEY); if (saved) data = {...data, ...JSON.parse(saved)}; } catch (e) {}
let currentTemplate = null;
let currentOptions = {};

/* ============================================================
   THUMBNAILS DA GALERIA (mini-representações CSS)
   ============================================================ */
function thumbSVG(t){
  const c = t.colors[t.accent];
  const layouts = {
    executivo:`<div class="thumb-block" style="left:20%;top:12%;width:60%;height:8px;background:${c}"></div>
      <div class="thumb-line" style="left:30%;top:26%;width:40%;height:5px"></div>
      <div class="thumb-line" style="left:12%;top:42%;width:76%;height:4px"></div>
      <div class="thumb-line" style="left:12%;top:50%;width:76%;height:4px"></div>
      <div class="thumb-line" style="left:12%;top:64%;width:50%;height:4px"></div>`,
    sidebar:`<div class="thumb-block" style="left:0;top:0;width:32%;height:100%;background:${c}"></div>
      <div class="thumb-line" style="left:40%;top:14%;width:45%;height:6px"></div>
      <div class="thumb-line" style="left:40%;top:30%;width:50%;height:4px"></div>
      <div class="thumb-line" style="left:40%;top:38%;width:50%;height:4px"></div>
      <div class="thumb-line" style="left:40%;top:58%;width:35%;height:4px"></div>`,
    minimal:`<div class="thumb-line" style="left:10%;top:16%;width:38%;height:7px;background:#333"></div>
      <div class="thumb-line" style="left:10%;top:30%;width:80%;height:1px"></div>
      <div class="thumb-line" style="left:10%;top:42%;width:70%;height:4px"></div>
      <div class="thumb-line" style="left:10%;top:50%;width:70%;height:4px"></div>
      <div class="thumb-line" style="left:10%;top:66%;width:50%;height:4px"></div>`,
    criativo:`<div class="thumb-block" style="left:0;top:0;width:100%;height:34%;background:${c}"></div>
      <div class="thumb-line" style="left:10%;top:46%;width:75%;height:4px"></div>
      <div class="thumb-line" style="left:10%;top:54%;width:75%;height:4px"></div>
      <div class="thumb-line" style="left:10%;top:70%;width:45%;height:4px"></div>`,
    corporativo:`<div class="thumb-block" style="left:0;top:0;width:6%;height:100%;background:${c}"></div>
      <div class="thumb-line" style="left:14%;top:14%;width:50%;height:6px"></div>
      <div class="thumb-block" style="left:14%;top:30%;width:35%;height:6px;background:#eee"></div>
      <div class="thumb-line" style="left:14%;top:46%;width:70%;height:4px"></div>
      <div class="thumb-line" style="left:14%;top:54%;width:70%;height:4px"></div>`,
    elegante:`<div class="thumb-line" style="left:25%;top:16%;width:50%;height:6px;background:#333"></div>
      <div class="thumb-block" style="left:44%;top:30%;width:12%;height:2px;background:${c}"></div>
      <div class="thumb-line" style="left:20%;top:42%;width:60%;height:4px"></div>
      <div class="thumb-line" style="left:20%;top:50%;width:60%;height:4px"></div>
      <div class="thumb-line" style="left:20%;top:64%;width:40%;height:4px"></div>`,
    tech:`<div class="thumb-block" style="left:0;top:0;width:100%;height:30%;background:#161b22"></div>
      <div class="thumb-line" style="left:10%;top:10%;width:40%;height:5px;background:#fff"></div>
      <div class="thumb-line" style="left:10%;top:20%;width:25%;height:4px;background:${c}"></div>
      <div class="thumb-line" style="left:10%;top:44%;width:70%;height:4px"></div>
      <div class="thumb-line" style="left:10%;top:52%;width:70%;height:4px"></div>`,
    compacto:`<div class="thumb-line" style="left:10%;top:12%;width:40%;height:5px"></div>
      <div class="thumb-line" style="left:10%;top:28%;width:38%;height:4px"></div>
      <div class="thumb-line" style="left:10%;top:36%;width:38%;height:4px"></div>
      <div class="thumb-line" style="left:54%;top:28%;width:36%;height:4px"></div>
      <div class="thumb-line" style="left:54%;top:36%;width:36%;height:4px"></div>`,
    timeline:`<div class="thumb-line" style="left:14%;top:10%;width:12%;height:80%;width:2px;background:${c}"></div>
      <div class="thumb-line" style="left:24%;top:16%;width:60%;height:5px"></div>
      <div class="thumb-line" style="left:24%;top:36%;width:55%;height:5px"></div>
      <div class="thumb-line" style="left:24%;top:56%;width:55%;height:5px"></div>`,
    cartao:`<div class="thumb-block" style="left:8%;top:10%;width:84%;height:22%;background:${c}22;border-radius:6px"></div>
      <div class="thumb-line" style="left:14%;top:44%;width:70%;height:4px"></div>
      <div class="thumb-line" style="left:14%;top:52%;width:70%;height:4px"></div>
      <div class="thumb-line" style="left:14%;top:68%;width:45%;height:4px"></div>`
  };
  return layouts[t.structure] || '';
}

function renderGallery(){
  const grid = document.getElementById('galleryGrid');
  const filtered = templates.filter(t=>{
    const matchesCategory = galleryCategory === 'Todos' || (t.category || 'Clássicos') === galleryCategory;
    const haystack = `${t.name} ${t.desc} ${t.category || ''}`.toLowerCase();
    return matchesCategory && haystack.includes(galleryQuery.toLowerCase());
  });
  const count = document.getElementById('modelCount');
  if(count) count.textContent = `${filtered.length} ${filtered.length === 1 ? 'modelo encontrado' : 'modelos encontrados'}`;
  grid.innerHTML = filtered.map(t=>{
    if(t.blank){
      return `<div class="card blank" onclick="chooseTemplate('${t.id}')">
        <div class="thumb"><span class="plus">+</span></div>
        <div class="card-name"><b>Começar do zero</b><span>Página em branco, edite tudo</span></div>
      </div>`;
    }
    return `<div class="card" data-category="${t.category || 'Clássicos'}" onclick="chooseTemplate('${t.id}')">
      <div class="thumb" style="background:#fafaf8;">${thumbSVG(t)}</div>
      <div class="card-name"><b>${t.name}</b><span>${t.desc}</span></div>
    </div>`;
  }).join('');
}

function filterGallery(query){ galleryQuery = query; renderGallery(); }
function setGalleryCategory(category, button){
  galleryCategory = category;
  document.querySelectorAll('.filter-chip').forEach(chip=>chip.classList.remove('active'));
  if(button) button.classList.add('active');
  renderGallery();
}

function chooseTemplate(id){
  currentTemplate = templates.find(t=>t.id===id);
  currentOptions = {};
  currentTemplate.layoutOpts.forEach(o=> currentOptions[o.key]=o.default);
  currentOptions.colorIndex = currentTemplate.accent;
  currentOptions.textStrong = '#1c1c1c';
  currentOptions.textBody = '#333333';
  document.getElementById('viewGallery').classList.remove('active');
  document.getElementById('viewEditor').classList.add('active');
  document.getElementById('stepTag1').classList.remove('active');
  document.getElementById('stepTag2').classList.add('active');
  document.getElementById('topActions').style.display='flex';
  setMobileTab('edit');
  renderPanel();
  renderPreview();
}

function goToGallery(){
  document.getElementById('viewEditor').classList.remove('active');
  document.getElementById('viewGallery').classList.add('active');
  document.getElementById('stepTag1').classList.add('active');
  document.getElementById('stepTag2').classList.remove('active');
  document.getElementById('topActions').style.display='none';
}

/* ---------- alternador Editar / Visualizar no celular ---------- */
function setMobileTab(tab){
  const grid = document.getElementById('editorGrid');
  grid.className = 'editor mobile-mode-' + tab;
  document.querySelectorAll('.mtab').forEach(b=> b.classList.toggle('active', b.dataset.tab===tab));
  requestAnimationFrame(scalePreview);
}

/* encolhe o conteúdo do currículo para sempre caber em uma única folha A4 */
function fitResumeToPage(){
  const resume = document.getElementById('resume');
  if(!resume) return;
  resume.style.transform = 'none';
  const natural = resume.scrollHeight;
  const maxH = 1123;
  if(natural > maxH){
    const scale = Math.max(maxH / natural, 0.55);
    resume.style.transform = 'scale(' + scale + ')';
  }
}

/* encolhe a folha A4 para caber na tela, sem cortar conteúdo */
function scalePreview(){
  const wrap = document.getElementById('pageShellWrap');
  const shell = document.getElementById('pageShell');
  if(!wrap || !shell) return;
  if(window.innerWidth <= 880){
    const scale = wrap.clientWidth / 794;
    shell.style.transform = 'scale(' + scale + ')';
    wrap.style.height = (shell.offsetHeight * scale) + 'px';
  } else {
    shell.style.transform = '';
    wrap.style.height = '';
  }
}
let resizeTimer;
window.addEventListener('resize', ()=>{
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(scalePreview, 120);
});

/* ============================================================
   PAINEL DE EDIÇÃO
   ============================================================ */
function renderPanel(){
  const p = document.getElementById('panel');
  let html = '';

  // aparência
  html += `<div class="panel-section">
    <h3>Cores</h3>
    <div class="field"><label>Cor de destaque (títulos de seção, ícones)</label></div>
    <div class="swatches">
      ${currentTemplate.colors.map((c,i)=>`<span class="swatch ${i===currentOptions.colorIndex?'active':''}" style="background:${c}" onclick="setColor(${i})"></span>`).join('')}
    </div>
    <div class="row2" style="margin-top:16px;">
      <div class="field">
        <label>Cor do nome e títulos</label>
        <input type="color" value="${currentOptions.textStrong}" oninput="setTextColor('textStrong', this.value)" style="width:100%;height:34px;padding:2px;border:1px solid var(--line);border-radius:6px;background:#fdfdfc;">
      </div>
      <div class="field">
        <label>Cor do texto do corpo</label>
        <input type="color" value="${currentOptions.textBody}" oninput="setTextColor('textBody', this.value)" style="width:100%;height:34px;padding:2px;border:1px solid var(--line);border-radius:6px;background:#fdfdfc;">
      </div>
    </div>
    <div class="small-note">Nas áreas com fundo colorido do modelo (ex.: barra lateral, cabeçalho escuro), o texto continua branco automaticamente para manter a leitura.</div>
    ${currentTemplate.layoutOpts.length ? `<div style="margin-top:16px;">
      ${currentTemplate.layoutOpts.map(o=>`
        <div class="toggle-row">
          <input type="checkbox" id="opt_${o.key}" ${currentOptions[o.key]?'checked':''} onchange="setOption('${o.key}', this.checked)">
          <label for="opt_${o.key}" style="margin:0;">${o.label}</label>
        </div>`).join('')}
    </div>` : ''}
  </div>`;

  // foto
  html += `<div class="panel-section">
    <h3>Foto (opcional)</h3>
    <div class="photo-upload">
      <img class="photo-preview" id="photoPreview" src="${data.photo || 'https://placehold.co/88x88/eee/999?text=%20'}">
      <label class="btn">Enviar foto<input type="file" accept="image/*" style="display:none" onchange="uploadPhoto(event)"></label>
    </div>
  </div>`;

  // dados pessoais
  html += `<div class="panel-section">
    <h3>Dados pessoais</h3>
    <div class="field"><label>Nome completo</label><input value="${esc(data.fullName)}" oninput="upd('fullName',this.value)"></div>
    <div class="field"><label>Cargo / área desejada</label><input value="${esc(data.role)}" oninput="upd('role',this.value)"></div>
    <div class="row2">
      <div class="field"><label>E-mail</label><input value="${esc(data.email)}" oninput="upd('email',this.value)"></div>
      <div class="field"><label>Telefone</label><input value="${esc(data.phone)}" oninput="upd('phone',this.value)"></div>
    </div>
    <div class="row2">
      <div class="field"><label>Cidade / UF</label><input value="${esc(data.location)}" oninput="upd('location',this.value)"></div>
      <div class="field"><label>LinkedIn / site</label><input value="${esc(data.linkedin)}" oninput="upd('linkedin',this.value)"></div>
    </div>
  </div>`;

  // resumo
  html += `<div class="panel-section">
    <h3>Resumo profissional</h3>
    <div class="field"><textarea oninput="upd('summary',this.value)">${esc(data.summary)}</textarea></div>
  </div>`;

  // experiência
  html += `<div class="panel-section"><h3>Experiência profissional</h3>`;
  data.experience.forEach(item=>{
    html += `<div class="entry-block">
      <button class="remove" onclick="removeItem('experience',${item.id})">✕</button>
      <div class="field"><label>Cargo</label><input value="${esc(item.role)}" oninput="updItem('experience',${item.id},'role',this.value)"></div>
      <div class="field"><label>Empresa</label><input value="${esc(item.company)}" oninput="updItem('experience',${item.id},'company',this.value)"></div>
      <div class="field"><label>Período</label><input value="${esc(item.dates)}" oninput="updItem('experience',${item.id},'dates',this.value)"></div>
      <div class="field"><label>Descrição</label><textarea oninput="updItem('experience',${item.id},'desc',this.value)">${esc(item.desc)}</textarea></div>
    </div>`;
  });
  html += `<button class="add-btn" onclick="addItem('experience')">+ Adicionar experiência</button></div>`;

  // educação
  html += `<div class="panel-section"><h3>Educação</h3>`;
  data.education.forEach(item=>{
    html += `<div class="entry-block">
      <button class="remove" onclick="removeItem('education',${item.id})">✕</button>
      <div class="field"><label>Curso / Formação</label><input value="${esc(item.course)}" oninput="updItem('education',${item.id},'course',this.value)"></div>
      <div class="field"><label>Instituição</label><input value="${esc(item.school)}" oninput="updItem('education',${item.id},'school',this.value)"></div>
      <div class="field"><label>Período</label><input value="${esc(item.dates)}" oninput="updItem('education',${item.id},'dates',this.value)"></div>
    </div>`;
  });
  html += `<button class="add-btn" onclick="addItem('education')">+ Adicionar formação</button></div>`;

  // habilidades e idiomas
  html += `<div class="panel-section">
    <h3>Habilidades</h3>
    <div class="field"><textarea oninput="upd('skills',this.value)">${esc(data.skills)}</textarea></div>
    <div class="small-note">Separe por vírgula.</div>
  </div>`;
  html += `<div class="panel-section">
    <h3>Idiomas</h3>
    <div class="field"><textarea oninput="upd('languages',this.value)">${esc(data.languages)}</textarea></div>
    <div class="small-note">Separe por vírgula.</div>
  </div>`;

  p.innerHTML = html;
}

function esc(s){ return (s||'').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function persistData(){ try { localStorage.setItem(SAVED_DATA_KEY, JSON.stringify(data)); } catch (e) {} }
function upd(field,val){ data[field]=val; persistData(); renderPreview(); }
function updItem(list,id,field,val){
  const item = data[list].find(x=>x.id===id);
  if(item){ item[field]=val; persistData(); renderPreview(); }
}
function addItem(list){
  if(list==='experience'){ expCounter++; data.experience.push({id:expCounter, role:'Cargo', company:'Empresa', dates:'', desc:''}); }
  else { eduCounter++; data.education.push({id:eduCounter, course:'Curso', school:'Instituição', dates:''}); }
  persistData(); renderPanel(); renderPreview();
}
function removeItem(list,id){
  data[list] = data[list].filter(x=>x.id!==id);
  persistData();
  renderPanel(); renderPreview();
}
function setColor(i){ currentOptions.colorIndex=i; renderPanel(); renderPreview(); }
function setTextColor(key,val){ currentOptions[key]=val; renderPreview(); }
function setOption(key,val){ currentOptions[key]=val; renderPreview(); }
function uploadPhoto(e){
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = ()=>{ data.photo = reader.result; persistData(); renderPanel(); renderPreview(); };
  reader.readAsDataURL(file);
}

/* ============================================================
   RENDERIZAÇÃO DO CURRÍCULO
   ============================================================ */
function hexToRgb(hex){
  hex = hex.replace('#','');
  const bigint = parseInt(hex,16);
  return [(bigint>>16)&255,(bigint>>8)&255,bigint&255];
}
function shade(hex, amt){
  const [r,g,b] = hexToRgb(hex);
  const f = v => Math.max(0,Math.min(255, Math.round(v*(1+amt))));
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}

function skillsHTML(){
  return data.skills.split(',').map(s=>s.trim()).filter(Boolean)
    .map(s=>`<span class="r-skill-tag">${esc(s)}</span>`).join('');
}
function langHTML(){
  return data.languages.split(',').map(s=>s.trim()).filter(Boolean)
    .map(s=>`<div class="r-lang-item">${esc(s)}</div>`).join('');
}
function expHTML(){
  return data.experience.map(i=>`
    <div class="r-exp-item">
      <div class="r-exp-top"><span>${esc(i.role)}</span><span>${esc(i.dates)}</span></div>
      <div class="r-exp-sub">${esc(i.company)}</div>
      <div class="r-exp-desc">${esc(i.desc)}</div>
    </div>`).join('');
}
function eduHTML(){
  return data.education.map(i=>`
    <div class="r-edu-item">
      <div class="r-exp-top"><span>${esc(i.course)}</span><span>${esc(i.dates)}</span></div>
      <div class="r-exp-sub">${esc(i.school)}</div>
    </div>`).join('');
}
function contactLine(sep){
  return [data.email,data.phone,data.location,data.linkedin].filter(Boolean).join(sep);
}
function photoImg(cls){
  return data.photo ? `<img class="photo ${cls}" src="${data.photo}">` : `<div class="photo ${cls}" style="background:#ddd;"></div>`;
}

function renderPreview(){
  const t = currentTemplate;
  const acc = t.colors[currentOptions.colorIndex];
  const accDark = shade(acc,-0.35);
  const accLight = shade(acc,0.5);
  const el = document.getElementById('resume');
  el.style.setProperty('--acc', acc);
  el.style.setProperty('--acc-dark', accDark);
  el.style.setProperty('--acc-light', accLight);
  el.style.setProperty('--acc-10', acc+'1a');
  el.style.setProperty('--text-strong', currentOptions.textStrong);
  el.style.setProperty('--text-body', currentOptions.textBody);

  const showPhoto = currentOptions.showPhoto;
  let html = '';

  switch(t.structure){
    case 'executivo':
      el.className = 's-executivo';
      html = `
        <div class="head">
          ${showPhoto?photoImg('exec-photo'):''}
          <h1 class="r-name">${esc(data.fullName)}</h1>
          <div class="r-role">${esc(data.role)}</div>
          <div class="r-contact">${contactLine(' · ')}</div>
        </div>
        <section><div class="r-sectitle">Resumo</div><div class="r-summary">${esc(data.summary)}</div></section>
        <section><div class="r-sectitle">Experiência</div>${expHTML()}</section>
        <section><div class="r-sectitle">Educação</div>${eduHTML()}</section>
        <section><div class="r-sectitle">Habilidades</div>${skillsHTML()}</section>
        <section><div class="r-sectitle">Idiomas</div>${langHTML()}</section>`;
      break;

    case 'sidebar':
      el.className = 's-sidebar' + (currentOptions.sideRight ? ' side-right' : '');
      if(currentOptions.sideRight) el.style.flexDirection='row-reverse'; else el.style.flexDirection='row';
      html = `
        <div class="side">
          ${showPhoto?photoImg('photo'):''}
          <div class="r-name">${esc(data.fullName)}</div>
          <div class="r-role">${esc(data.role)}</div>
          <div class="r-contact">${data.email}<br>${data.phone}<br>${data.location}<br>${data.linkedin}</div>
          <div class="r-sectitle">Habilidades</div>${skillsHTML()}
          <div class="r-sectitle">Idiomas</div>${langHTML()}
        </div>
        <div class="main">
          <section><div class="r-sectitle">Resumo</div><div class="r-summary">${esc(data.summary)}</div></section>
          <section><div class="r-sectitle">Experiência</div>${expHTML()}</section>
          <section><div class="r-sectitle">Educação</div>${eduHTML()}</section>
        </div>`;
      break;

    case 'minimal':
      el.className = 's-minimal';
      html = `
        <div class="head">
          <div class="head-row">
            ${showPhoto?photoImg('small-photo'):''}
            <div class="head-text">
              <h1 class="r-name">${esc(data.fullName)}</h1>
              <div class="r-role">${esc(data.role)}</div>
              <div class="r-contact">${[data.email,data.phone,data.location].filter(Boolean).map(c=>`<span>${c}</span>`).join('')}</div>
            </div>
          </div>
        </div>
        <section><div class="r-sectitle">Resumo</div><div class="r-summary" style="margin-top:8px;">${esc(data.summary)}</div></section>
        <section><div class="r-sectitle">Experiência</div><div style="margin-top:10px;">${expHTML()}</div></section>
        <section><div class="r-sectitle">Educação</div><div style="margin-top:10px;">${eduHTML()}</div></section>
        <section><div class="r-sectitle">Habilidades</div><div style="margin-top:10px;">${skillsHTML()}</div></section>
        <section><div class="r-sectitle">Idiomas</div><div style="margin-top:10px;">${langHTML()}</div></section>`;
      break;

    case 'criativo':
      el.className = 's-criativo';
      html = `
        <div class="head">
          <div class="head-row">
            ${showPhoto?photoImg('small-photo'):''}
            <div class="head-text">
              <h1 class="r-name">${esc(data.fullName)}</h1>
              <div class="r-role">${esc(data.role)}</div>
              <div class="r-contact">${contactLine('  •  ')}</div>
            </div>
          </div>
        </div>
        <div class="body">
          <section><div class="r-sectitle">Resumo</div><div class="r-summary">${esc(data.summary)}</div></section>
          <section><div class="r-sectitle">Experiência</div>${expHTML()}</section>
          <section><div class="r-sectitle">Educação</div>${eduHTML()}</section>
          <section><div class="r-sectitle">Habilidades</div>${skillsHTML()}</section>
          <section><div class="r-sectitle">Idiomas</div>${langHTML()}</section>
        </div>`;
      break;

    case 'corporativo':
      el.className = 's-corporativo';
      html = `
        <div class="head">
          <div class="head-row">
            ${showPhoto?photoImg('small-photo'):''}
            <div class="head-text">
              <h1 class="r-name">${esc(data.fullName)}</h1>
              <div class="r-role">${esc(data.role)}</div>
              <div class="r-contact">${contactLine(' · ')}</div>
            </div>
          </div>
        </div>
        <div class="body">
          <section><div class="r-sectitle">Resumo</div><div class="r-summary" style="margin-top:8px;">${esc(data.summary)}</div></section>
          <section><div class="r-sectitle">Experiência</div><div style="margin-top:8px;">${expHTML()}</div></section>
          <section><div class="r-sectitle">Educação</div><div style="margin-top:8px;">${eduHTML()}</div></section>
          <section><div class="r-sectitle">Habilidades</div><div style="margin-top:8px;">${skillsHTML()}</div></section>
          <section><div class="r-sectitle">Idiomas</div><div style="margin-top:8px;">${langHTML()}</div></section>
        </div>`;
      break;

    case 'elegante':
      el.className = 's-elegante';
      html = `
        <div class="head">
          ${showPhoto?photoImg('eleg-photo'):''}
          <h1 class="r-name">${esc(data.fullName)}</h1>
          <div class="r-role">${esc(data.role)}</div>
        </div>
        <div class="divider"></div>
        <div class="r-contact">${contactLine('   ·   ')}</div>
        <section style="margin-top:30px;"><div class="r-sectitle">Resumo</div><div class="r-summary" style="text-align:center;">${esc(data.summary)}</div></section>
        <section><div class="r-sectitle">Experiência</div>${expHTML()}</section>
        <section><div class="r-sectitle">Educação</div>${eduHTML()}</section>
        <section><div class="r-sectitle">Habilidades</div><div style="text-align:center;">${skillsHTML()}</div></section>
        <section><div class="r-sectitle">Idiomas</div><div style="text-align:center;">${langHTML()}</div></section>`;
      break;

    case 'tech':
      el.className = 's-tech';
      html = `
        <div class="head">
          <div class="head-row">
            ${showPhoto?photoImg('small-photo'):''}
            <div class="head-text">
              <h1 class="r-name">${esc(data.fullName)}</h1>
              <div class="r-role">${esc(data.role)}</div>
              <div class="r-contact">${contactLine('  |  ')}</div>
            </div>
          </div>
        </div>
        <div class="body">
          <section><div class="r-sectitle">summary</div><div class="r-summary">${esc(data.summary)}</div></section>
          <section><div class="r-sectitle">experience</div>${expHTML()}</section>
          <section><div class="r-sectitle">education</div>${eduHTML()}</section>
          <section><div class="r-sectitle">skills</div>${skillsHTML()}</section>
          <section><div class="r-sectitle">languages</div>${langHTML()}</section>
        </div>`;
      break;

    case 'compacto':
      el.className = 's-compacto';
      html = `
        <div class="head">
          <div class="head-row">
            ${showPhoto?photoImg('small-photo'):''}
            <div class="head-text">
              <h1 class="r-name">${esc(data.fullName)}</h1>
              <div class="r-role">${esc(data.role)}</div>
              <div class="r-contact">${contactLine(' · ')}</div>
            </div>
          </div>
        </div>
        <div class="cols">
          <div>
            <section><div class="r-sectitle">Experiência</div>${expHTML()}</section>
            <section><div class="r-sectitle">Educação</div>${eduHTML()}</section>
          </div>
          <div>
            <section><div class="r-sectitle">Resumo</div><div class="r-summary">${esc(data.summary)}</div></section>
            <section><div class="r-sectitle">Habilidades</div>${skillsHTML()}</section>
            <section><div class="r-sectitle">Idiomas</div>${langHTML()}</section>
          </div>
        </div>`;
      break;

    case 'timeline':
      el.className = 's-timeline';
      html = `
        <div class="head">
          <div class="head-row">
            ${showPhoto?photoImg('small-photo'):''}
            <div class="head-text">
              <h1 class="r-name">${esc(data.fullName)}</h1>
              <div class="r-role">${esc(data.role)}</div>
              <div class="r-contact">${contactLine(' · ')}</div>
            </div>
          </div>
        </div>
        <section><div class="r-sectitle">Resumo</div><div class="r-summary">${esc(data.summary)}</div></section>
        <section><div class="r-sectitle">Experiência</div><div class="tl">${expHTML()}</div></section>
        <section><div class="r-sectitle">Educação</div><div class="tl">${eduHTML()}</div></section>
        <section><div class="r-sectitle">Habilidades</div>${skillsHTML()}</section>
        <section><div class="r-sectitle">Idiomas</div>${langHTML()}</section>`;
      break;

    case 'cartao':
      el.className = 's-cartao';
      html = `
        <div class="head">
          ${showPhoto?photoImg('photo'):''}
          <div>
            <div class="r-name">${esc(data.fullName)}</div>
            <div class="r-role">${esc(data.role)}</div>
            <div class="r-contact">${contactLine(' · ')}</div>
          </div>
        </div>
        <section><div class="r-sectitle">Resumo</div><div class="r-summary">${esc(data.summary)}</div></section>
        <section><div class="r-sectitle">Experiência</div>${expHTML()}</section>
        <section><div class="r-sectitle">Educação</div>${eduHTML()}</section>
        <section><div class="r-sectitle">Habilidades</div>${skillsHTML()}</section>
        <section><div class="r-sectitle">Idiomas</div>${langHTML()}</section>`;
      break;
  }
  el.innerHTML = html;
  fitResumeToPage();
  scalePreview();
}

/* ============================================================
   EXPORTAÇÃO
   ============================================================ */
function printResume(){ window.print(); }

async function downloadPDF(){
  const source = document.getElementById('resume');
  if(!source || !window.html2canvas || !window.jspdf) return;

  // Captura um clone com dimensões físicas fixas. Isso evita que o overflow
  // do preview seja interpretado como uma segunda página pelo html2canvas.
  const frame = document.createElement('div');
  frame.style.cssText = 'position:fixed;left:-10000px;top:0;width:794px;height:1123px;overflow:hidden;background:#fff;z-index:-1;';
  const clone = source.cloneNode(true);
  clone.style.transform = 'none';
  clone.style.width = '794px';
  clone.style.minHeight = '0';
  clone.style.height = 'auto';
  frame.appendChild(clone);
  document.body.appendChild(frame);

  try{
    await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
    const naturalHeight = Math.max(clone.scrollHeight, clone.offsetHeight, 1);
    const fit = Math.min(1, 1123 / naturalHeight);
    clone.style.transformOrigin = 'top left';
    clone.style.transform = `scale(${fit})`;
    await new Promise(resolve=>requestAnimationFrame(resolve));

    const canvas = await html2canvas(frame, {
      scale:2,
      width:794,
      height:1123,
      windowWidth:794,
      windowHeight:1123,
      backgroundColor:'#ffffff',
      useCORS:true,
      scrollX:0,
      scrollY:0
    });
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({orientation:'portrait', unit:'pt', format:'a4', compress:true});
    pdf.addImage(canvas.toDataURL('image/jpeg',0.95),'JPEG',0,0,595.28,841.89);
    const filename = (data.fullName || 'curriculo').trim().replace(/\s+/g,'_') + '.pdf';
    pdf.save(filename);
  }catch(error){
    console.error('Não foi possível gerar o PDF:', error);
    alert('Não foi possível gerar o PDF agora. Tente novamente em alguns segundos.');
  }finally{
    frame.remove();
  }
}

/* ============================================================
   INIT
   ============================================================ */
renderGallery();
