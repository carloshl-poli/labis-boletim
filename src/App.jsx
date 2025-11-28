import React, { useState, useMemo } from 'react';

// --- Ícones SVG Inline ---
const Icons = {
    Calendar: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
    MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    AlertTriangle: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>,
    ExternalLink: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>,
    Info: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>,
    FileText: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
};

// --- Dados das Publicações (Atualizados com Links Reais) ---
const rawData = [
    {
        id: 1,
        title: "ESOCITE 2026 (XVI Jornadas Latino-Americanas)",
        location: "Bogotá, Colômbia",
        eventDate: "24-26 Junho 2026",
        deadline: "2025-11-30",
        type: "Conferência",
        tags: ["CTS Latino-americano", "Crise", "Política"],
        description: "O principal evento da Associação Latino-americana de Estudos Sociais da Ciência e da Tecnologia.",
        details: {
            focus: "¿Qué ciencias y tecnologías son posibles en medio de las crisis?",
            submission: "Resumo Estendido (Ponencia). Espanhol ou Português.",
            critical: "Deadline RÍGIDO. Restam poucos dias."
        },
        links: [
            { label: "Site Oficial", url: "https://esocite2026.com/" },
            { label: "Submissão de Trabalhos", url: "https://esocite2026.com/ponencias/" }
        ]
    },
    {
        id: 2,
        title: "SASE 2026 (Society for the Advancement of Socio-Economics)",
        location: "Bordeaux, França (Híbrido)",
        eventDate: "Julho de 2026",
        deadline: "2025-12-16",
        type: "Conferência",
        tags: ["Socioeconomia", "Globalização", "Poder"],
        description: "O maior encontro global de socioeconomia, reunindo sociologia, ciência política e economia heterodoxa.",
        details: {
            focus: "Fighting Divisions: Conflict and Power in a Post Globalisation Order.",
            submission: "Abstract Estendido (~1000 palavras). Inglês Obrigatório.",
            critical: "Verifique Mini-Conferences antes de submeter."
        },
        links: [
            { label: "Informações Gerais", url: "https://sase.org/events/2026-bordeaux/#general" },
            { label: "Diretrizes de Submissão", url: "https://sase.org/events/2026-bordeaux/#submissions" }
        ]
    },
    {
        id: 3,
        title: "Revista Brasileira de Estudos CTS (ESOCITE)",
        location: "Revista Científica",
        eventDate: "Edição 1º/2025",
        deadline: "2025-12-17",
        type: "Periódico",
        tags: ["Nacional", "Políticas Públicas", "Educação CTS"],
        description: "Publicação oficial da Associação Brasileira de Estudos Sociais das Ciências e das Tecnologias.",
        details: {
            focus: "Políticas públicas, Ética, Educação, Gênero e Sustentabilidade.",
            submission: "Artigo Completo (5k-8k palavras). Autor principal deve ser Doutor.",
            critical: "Duplo-cego. Preprints são aceitos."
        },
        links: [
            { label: "Edital e Submissão", url: "https://revistabrasileiradeestudoscts.com/revista/about/submissions" }
        ]
    },
    {
        id: 4,
        title: "ACM FAccT 2026 (Fairness, Accountability, and Transparency)",
        location: "Montreal, Canadá (Híbrido)",
        eventDate: "Junho de 2026",
        deadline: "2026-01-08",
        type: "Conferência",
        tags: ["Computação", "Justiça", "Sociotécnico"],
        description: "Principal conferência interdisciplinar focada na natureza sociotécnica da computação (CS + Humanas).",
        details: {
            focus: "Fairness, Accountability e Transparency. Auditoria de algoritmos.",
            submission: "Abstract Obrigatório em 08/01. Full Paper em 13/01.",
            critical: "Anonimização rigorosa. Template ACM."
        },
        links: [
            { label: "Site Oficial", url: "https://facctconference.org/2026/" },
            { label: "Call for Papers", url: "https://facctconference.org/2026/cfp.html" },
            { label: "Author Guide", url: "https://facctconference.org/2026/authorguide.html" }
        ]
    },
    {
        id: 5,
        title: "AOM 2026 (Academy of Management Annual Meeting)",
        location: "Filadélfia, EUA (Presencial)",
        eventDate: "31 Jul - 4 Ago 2026",
        deadline: "2026-01-13",
        type: "Conferência",
        tags: ["Administração", "Organizações", "Inovação"],
        description: "O maior congresso de administração do mundo. Foco nas divisões CTO e TIM.",
        details: {
            focus: "Divisões CTO, TIM e SIM são as indicadas para o LabIS.",
            submission: "Full Paper (~15k palavras) ou Simpósio.",
            critical: "Deadline RÍGIDO (17:00 ET). Escolha a divisão certa."
        },
        links: [
            { label: "Site do Evento", url: "https://www.aom.org/events/annual-meeting/aom-2026/" },
            { label: "Edital Oficial (PDF)", url: "https://www.aom.org/wp-content/uploads/2025/11/2026_Call_for_Submissions.pdf" }
        ]
    },
    {
        id: 6,
        title: "ICT4D Conference 2026",
        location: "Nairobi, Quênia (Híbrido)",
        eventDate: "20-22 Maio 2026",
        deadline: "2026-01-16",
        type: "Prática/ONG",
        tags: ["Desenvolvimento", "Extensão", "ODS"],
        description: "Focada em prática e impacto humanitário, ideal para projetos de extensão.",
        details: {
            focus: "Dados, Impacto e Futuros Digitais. Estudos de caso reais.",
            submission: "Abstract/Proposta. Aceita relatos de experiência.",
            critical: "Valoriza lições aprendidas e aplicação real."
        },
        links: [
            { label: "Site Oficial do Evento", url: "https://ict4dconference.secure-platform.com/site" }
        ]
    },
    {
        id: 7,
        title: "IWPP 5 Ottawa 2026 (Public Policy)",
        location: "Ottawa, Canadá",
        eventDate: "6-8 Julho 2026",
        deadline: "2026-01-20",
        type: "Workshop",
        tags: ["Políticas Públicas", "Imersão", "Feedback"],
        description: "Formato de imersão em workshops verticais. Excelente para teses em andamento.",
        details: {
            focus: "Digital Governance, Policy Design.",
            submission: "Abstract para Workshop específico.",
            critical: "Não submeter o mesmo paper para múltiplos workshops."
        },
        links: [
            { label: "Página Oficial do IWPP 5", url: "https://www.ippapublicpolicy.org/conference/iwpp5-ottawa-2026/25" }
        ]
    },
    {
        id: 8,
        title: "RAMICS 2026 (Monetary Innovation)",
        location: "Rio de Janeiro, Brasil (Botafogo)",
        eventDate: "8-12 Junho 2026",
        deadline: "2026-01-31",
        type: "Conferência",
        tags: ["Moedas Sociais", "Local", "Economia Solidária"],
        description: "Evento local (PESC/UFRJ). Oportunidade perfeita para apresentar sem custos de viagem.",
        details: {
            focus: "Pluralidade das Moedas Sociais, Blockchain Social.",
            submission: "Resumo (Abstract).",
            critical: "Aceita Relatos de Experiência (Extensão)."
        },
        links: [
            { label: "Site Oficial (UFRJ/COS)", url: "https://sites.google.com/cos.ufrj.br/ramicsrio2026/" }
        ]
    }
];

// Componente: Badge de Categoria
const CategoryBadge = ({ type }) => {
    let colors = "bg-gray-100 text-gray-800";
    if (type === "Conferência") colors = "bg-blue-100 text-blue-800 border border-blue-200";
    if (type === "Periódico") colors = "bg-purple-100 text-purple-800 border border-purple-200";
    if (type === "Workshop") colors = "bg-orange-100 text-orange-800 border border-orange-200";
    if (type === "Prática/ONG") colors = "bg-green-100 text-green-800 border border-green-200";

    return (
        <span className={`px-2 py-1 rounded-md text-xs font-semibold ${colors}`}>
            {type}
        </span>
    );
};

// Componente: Card de Oportunidade
const OpportunityCard = ({ item }) => {
    // Cálculo de dias restantes
    const calculateDaysLeft = (deadlineStr) => {
        const deadline = new Date(deadlineStr);
        const today = new Date(); // Data atual
        const diffTime = deadline - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        return diffDays;
    };

    const daysLeft = calculateDaysLeft(item.deadline);
    
    // Definição de Urgência Visual
    let urgencyClass = "border-l-4 border-gray-300"; // Padrão
    let urgencyText = "text-gray-500";
    
    if (daysLeft < 0) {
        urgencyClass = "border-l-4 border-gray-400 opacity-60 grayscale"; // Expirado
    } else if (daysLeft <= 7) {
        urgencyClass = "border-l-4 border-red-500 bg-red-50"; // Crítico
        urgencyText = "text-red-700 font-bold";
    } else if (daysLeft <= 30) {
        urgencyClass = "border-l-4 border-yellow-500"; // Atenção
        urgencyText = "text-yellow-700 font-bold";
    } else {
        urgencyClass = "border-l-4 border-green-500"; // Confortável
        urgencyText = "text-green-700";
    }

    const formatDisplayDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}/${month}/${year}`;
    };

    return (
        <div className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-5 mb-4 flex flex-col md:flex-row gap-4 ${urgencyClass}`}>
            
            {/* Coluna Principal: Info */}
            <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex gap-2 items-center flex-wrap">
                        <CategoryBadge type={item.type} />
                        {item.tags.map(tag => (
                            <span key={tag} className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                    <Icons.MapPin /> {item.location}
                </p>

                <div className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {item.description}
                </div>

                {/* Bloco de Detalhes (Fundo cinza claro) */}
                <div className="bg-gray-50 rounded p-3 text-sm border border-gray-100 space-y-2">
                    <div className="flex gap-2 items-start">
                        <span className="text-indigo-600 mt-0.5"><Icons.Info /></span>
                        <p><span className="font-semibold text-gray-800">Foco:</span> {item.details.focus}</p>
                    </div>
                    <div className="flex gap-2 items-start">
                        <span className="text-indigo-600 mt-0.5"><Icons.FileText /></span>
                        <p><span className="font-semibold text-gray-800">Submissão:</span> {item.details.submission}</p>
                    </div>
                </div>
            </div>

            {/* Coluna Lateral: Prazo e Ação */}
            <div className="md:w-64 border-t md:border-t-0 md:border-l border-gray-100 md:pl-4 pt-4 md:pt-0 flex flex-col justify-between shrink-0">
                <div>
                    <div className="mb-1 text-xs uppercase tracking-wide text-gray-500 font-semibold">Deadline</div>
                    <div className="text-2xl font-mono font-bold text-gray-800 mb-1">
                        {formatDisplayDate(item.deadline)}
                    </div>
                    <div className={`text-sm mb-4 flex items-center gap-1.5 ${urgencyText}`}>
                        <Icons.Clock />
                        {daysLeft < 0 ? "Expirado" : daysLeft === 0 ? "Hoje!" : `${daysLeft} dias restantes`}
                    </div>

                    <div className="mb-1 text-xs uppercase tracking-wide text-gray-500 font-semibold">Data do Evento</div>
                    <div className="text-sm text-gray-700 font-medium flex items-center gap-1.5">
                        <Icons.Calendar />
                        {item.eventDate}
                    </div>
                </div>

                {/* Botões Dinâmicos */}
                <div className="mt-4 md:mt-0 flex flex-col gap-2">
                    {daysLeft >= 0 ? (
                        <>
                            {item.links.map((link, index) => (
                                <a 
                                    key={index}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`w-full text-sm font-medium py-2 px-4 rounded transition-colors flex items-center justify-center gap-2 text-center
                                        ${index === 0 
                                            ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                                            : "bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-200"
                                        }`}
                                >
                                    {link.label} <Icons.ExternalLink />
                                </a>
                            ))}
                        </>
                    ) : (
                        <button disabled className="w-full bg-gray-200 text-gray-500 text-sm font-medium py-2 px-4 rounded cursor-not-allowed">
                            Encerrado
                        </button>
                    )}
                    
                    {item.details.critical.includes("RÍGIDO") && daysLeft >= 0 && (
                        <div className="mt-1 text-xs text-red-600 bg-red-50 p-1.5 rounded text-center border border-red-100 font-medium">
                            ⚠️ Prazo Rígido
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Componente Principal: App
const App = () => {
    const [filterMonth, setFilterMonth] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // Lógica de Filtro
    const filteredOpportunities = useMemo(() => {
        return rawData.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            
            if (!matchesSearch) return false;

            if (filterMonth === 'all') return true;
            
            const deadlineMonth = new Date(item.deadline).getMonth(); // 0-11
            const deadlineYear = new Date(item.deadline).getFullYear();

            // Mapeamento simples para o demo (Novembro=10, Dezembro=11, Janeiro=0)
            if (filterMonth === 'nov' && deadlineMonth === 10 && deadlineYear === 2025) return true;
            if (filterMonth === 'dez' && deadlineMonth === 11 && deadlineYear === 2025) return true;
            if (filterMonth === 'jan' && deadlineMonth === 0 && deadlineYear === 2026) return true;
            
            return false;
        });
    }, [filterMonth, searchTerm]);

    // Ordenar por data mais próxima
    const sortedOpportunities = filteredOpportunities.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    return (
        <div className="min-h-screen pb-10 font-sans text-gray-900 bg-gray-50">
            {/* Header Institucional */}
            <header className="bg-slate-900 text-white shadow-lg border-b-4 border-indigo-500">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <div className="bg-indigo-500 w-2 h-8 rounded-sm"></div>
                                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">LabIS <span className="text-indigo-400 font-light">Boletim</span></h1>
                            </div>
                            <p className="text-slate-400 text-sm md:text-base pl-5">Oportunidades de Publicação & Eventos Acadêmicos</p>
                        </div>
                        <div className="text-right hidden md:block">
                            <div className="text-sm text-slate-400">Edição Atual</div>
                            <div className="font-mono text-lg font-bold text-white">28/11/2025</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Barra de Controle (Filtros) */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Navegação por Mês */}
                        <nav className="flex bg-gray-100 p-1 rounded-lg">
                            <button 
                                onClick={() => setFilterMonth('all')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filterMonth === 'all' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Todas
                            </button>
                            <button 
                                onClick={() => setFilterMonth('nov')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${filterMonth === 'nov' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Nov <span className="text-xs bg-red-100 text-red-700 px-1.5 rounded-full hidden sm:inline-block">Urgente</span>
                            </button>
                            <button 
                                onClick={() => setFilterMonth('dez')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filterMonth === 'dez' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Dez
                            </button>
                            <button 
                                onClick={() => setFilterMonth('jan')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filterMonth === 'jan' ? 'bg-white text-indigo-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Jan
                            </button>
                        </nav>

                        {/* Busca */}
                        <div className="relative w-full md:w-64">
                            <input 
                                type="text" 
                                placeholder="Buscar por título ou tag..." 
                                className="w-full pl-3 pr-10 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute right-3 top-1.5 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Lista Principal */}
            <main className="container mx-auto px-4 py-8 max-w-5xl">
                
                {/* Aviso de Contexto LabIS */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-8 flex gap-3 items-start">
                    <span className="text-indigo-600 shrink-0 mt-0.5"><Icons.Info /></span>
                    <div className="text-sm text-indigo-900">
                        <p className="font-semibold">Lembrete para integrantes do LabIS:</p>
                        <ul className="list-disc list-inside mt-1 space-y-1 text-indigo-800">
                            <li>Verifiquem se as chamadas exigem titulação mínima (ex: Doutor para Revista BR CTS).</li>
                            <li>Priorizem divisões "Sociotécnicas" (CTO, TIM, SIM) em grandes congressos como o AOM.</li>
                            <li>Relatos de experiência de projetos de extensão são bem-vindos na ICT4D e RAMICS.</li>
                        </ul>
                    </div>
                </div>

                {sortedOpportunities.length > 0 ? (
                    <div>
                        {sortedOpportunities.map(item => (
                            <OpportunityCard key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-lg">Nenhuma oportunidade encontrada para este filtro.</p>
                        <button onClick={() => {setFilterMonth('all'); setSearchTerm('')}} className="mt-2 text-indigo-600 hover:underline">
                            Limpar filtros
                        </button>
                    </div>
                )}
            </main>

            <footer className="bg-white border-t border-gray-200 mt-auto">
                <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
                    <p>LabIS - Laboratório de Informática e Sociedade | PESC/UFRJ</p>
                    <p className="mt-1 text-xs">Atualizado em 28/11/2025</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
