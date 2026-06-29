/* ============================================================
   i18n.js — Dicionário de traduções PT / EN
   Edite os textos aqui. Cada chave é usada via data-i18n no HTML.
   ============================================================ */

const I18N = {
  pt: {
    /* --- Navegação / geral --- */
    "nav.home": "Início",
    "nav.about": "Sobre",
    "nav.resume": "Currículo",
    "nav.contact": "Contato",
    "nav.projects": "Projetos",
    "nav.cta": "Trabalhe comigo",
    "footer.rights": "Todos os direitos reservados.",
    "footer.built": "Feito com café e código.",

    /* --- HOME / Hero --- */
    "home.hello": "Olá, eu sou",
    "home.role": "Desenvolvedor Full Stack",
    "home.tagline": "Levo soluções digitais para empresas: resolvo problemas, otimizo processos e construo sistemas escaláveis — de ponta a ponta.",
    "home.cta.primary": "Ver currículo",
    "home.cta.secondary": "Entrar em contato",

    /* --- HOME / Stats --- */
    "home.stats.1": "anos de experiência",
    "home.stats.2": "projetos internacionais · Japão",
    "home.stats.3": "tecnologias no stack",
    "home.stats.4": "projetos · imobiliário, logística, saas, games e fintech",

    /* --- HOME / Sobre curto --- */
    "home.about.title": "Um pouco sobre mim",
    "home.about.text": "Sou desenvolvedor full stack de Rio de Janeiro, com foco em sistemas de larga escala. Da automação industrial ao desenvolvimento web e mobile, gosto de transformar operações complexas em produtos digitais que entregam resultado de verdade.",

    /* --- HOME / Tecnologias --- */
    "home.tech.title": "Tecnologias",
    "home.tech.subtitle": "Ferramentas que uso no dia a dia",
    "home.tech.mobile": "Mobile",
    "home.tech.frontend": "Frontend & Web",
    "home.tech.backend": "Backend & Banco de dados",
    "home.tech.devops": "DevOps & Ferramentas",

    /* --- HOME / Serviços --- */
    "home.services.title": "Serviços prestados",
    "home.services.subtitle": "Como posso te ajudar",
    "home.services.1.title": "Desenvolvimento Web",
    "home.services.1.text": "Sites e sistemas web modernos e responsivos com React, Vue.js e JavaScript, com foco em usabilidade e performance.",
    "home.services.2.title": "Aplicativos iOS",
    "home.services.2.text": "Apps nativos para iPhone com Swift, SwiftUI e UIKit, incluindo modernização de sistemas legados.",
    "home.services.3.title": "APIs & Backend",
    "home.services.3.text": "APIs e back-ends robustos com Node.js, PHP/Laravel e bancos MySQL e MongoDB.",
    "home.services.4.title": "Sistemas de Gestão",
    "home.services.4.text": "Plataformas administrativas e dashboards para gerir operações de larga escala e apoiar decisões com dados.",

    /* --- HOME / Parceiros --- */
    "home.partners.title": "Parceiros",
    "home.partners.subtitle": "Empresas com quem colaboro",
    "home.partners.byterain": "ByteRain",
    "home.partners.byterain.desc": "[PLACEHOLDER] Descreva a parceria com a ByteRain aqui.",
    "home.partners.loopera": "loopera",
    "home.partners.loopera.desc": "[PLACEHOLDER] Descreva a parceria com a loopera aqui.",

    /* --- PROJETOS --- */
    "projects.title": "Meus Projetos",
    "projects.subtitle": "O que eu já construí",
    "projects.pro.title": "Projetos Profissionais",
    "projects.pro.note": "Trabalhos para empresas e clientes — alguns sob NDA, sem link público.",
    "projects.personal.title": "Projetos Pessoais",
    "projects.private": "projeto privado",
    "projects.visit": "acessar",
    "projects.pro1.name": "Plataforma Imobiliária (Japão)",
    "projects.pro1.meta": "Front-End · Back-End · App iOS · 2022 – 2025",
    "projects.pro1.desc": "Plataforma administrativa interna para matriz e filiais, hoje gerenciando 15 mil+ propriedades. 65% de redução no tempo de contratos e 47% de aumento na satisfação. Modernização de apps (UIKit → SwiftUI).",
    "projects.pro2.name": "Cootraporter",
    "projects.pro2.meta": "Front-End · Back-End · 2021 – 2024",
    "projects.pro2.desc": "Sistema de gestão logística (cargas, cooperados, notas e pagamentos) para frota de 120+ veículos e ~500 entregas diárias, com dashboards estratégicos para a diretoria.",
    "projects.pro3.name": "Egnex / Nexomobi",
    "projects.pro3.meta": "Front-End · Back-End · 2022 – 2023",
    "projects.pro3.desc": "Recuperação e evolução de sistema legado: correção de bugs e desenvolvimento de funcionalidades pendentes.",
    "projects.per1.name": "WePlanner",
    "projects.per1.meta": "Projeto pessoal",
    "projects.per1.desc": "Plataforma de gestão e planejamento colaborativo: dashboard, automações e múltiplos serviços em monorepo. Construída com Turborepo (NestJS + Next.js), Prisma e PostgreSQL.",
    "projects.per2.name": "RPG Gaming — Worlds RPG",
    "projects.per2.meta": "Projeto pessoal · dev.worldsrpg.com",
    "projects.per2.desc": "Plataforma de RPG multiplayer com aplicação web, painel administrativo e API em arquitetura de microsserviços. Monorepo Turborepo com Next.js, NestJS, TypeScript e PostgreSQL.",

    /* --- SOBRE --- */
    "about.title": "Sobre mim",
    "about.subtitle": "Da curiosidade ao código",
    "about.intro": "Sou o João Vitor, desenvolvedor full stack do Rio de Janeiro. Comecei pela base — eletrônica e automação — e fui subindo até construir sistemas que hoje rodam em escala internacional. Esta é a trajetória que me trouxe até aqui.",
    "about.timeline.title": "Minha trajetória",
    "about.t1.year": "2016 – 2020",
    "about.t1.title": "Onde tudo começou",
    "about.t1.text": "Curso Técnico em Automação Industrial na ETERJ, programando microcontroladores em C/C++ com Arduino. Foi ali que a lógica e o hardware despertaram minha vontade de construir coisas que funcionam de verdade.",
    "about.t2.year": "2021",
    "about.t2.title": "A virada para o software",
    "about.t2.text": "Ingresso no Bacharelado em Engenharia de Computação (Universidade Cândido Mendes) e os primeiros passos no desenvolvimento web — JavaScript, HTML5, CSS3 e os primeiros projetos reais.",
    "about.t3.year": "2021 – 2024",
    "about.t3.title": "Atuação no mercado",
    "about.t3.text": "Desenvolvimento full stack na Cootraporter (sistema logístico para 120+ veículos e ~500 entregas diárias) e na Egnex/Nexomobi, recuperando e evoluindo sistemas legados em produção.",
    "about.t4.year": "2022 – Hoje",
    "about.t4.title": "Escala internacional",
    "about.t4.text": "Projeto internacional no setor imobiliário (Japão): plataforma que hoje gerencia mais de 15 mil propriedades, com modernização de apps iOS (UIKit → SwiftUI) e ganhos expressivos de eficiência. Sigo evoluindo em sistemas de larga escala, mobile e back-end.",
    "about.values.title": "O que me move",
    "about.values.1": "Código limpo e bem testado",
    "about.values.2": "Aprendizado contínuo",
    "about.values.3": "Foco na experiência do usuário",
    "about.values.4": "Entregas com qualidade e prazo",

    /* --- CURRÍCULO --- */
    "resume.title": "Currículo",
    "resume.subtitle": "Resumo profissional",
    "resume.download": "Baixar currículo (PDF)",
    "resume.summary.title": "Resumo",
    "resume.summary.text": "Desenvolvedor Full Stack com experiência sólida na criação e otimização de sistemas de larga escala para os setores imobiliário e logístico. Comprovada capacidade de liderar a modernização de aplicações, gerando ganhos expressivos de eficiência operacional e satisfação do cliente em projetos internacionais.",
    "resume.experience.title": "Experiência",
    "resume.exp1.role": "Desenvolvedor Full Stack — Front-End, Back-End e App",
    "resume.exp1.company": "Projeto Internacional · Setor Imobiliário (Japão) · Remoto · 2022 – 2025",
    "resume.exp1.text": "Desenvolvi a plataforma administrativa interna de matriz e filiais — hoje gerenciando mais de 15 mil propriedades, com 65% de redução no tempo de processamento de contratos e 47% de aumento na satisfação do cliente. Conduzi a modernização dos apps (migração de UIKit para SwiftUI) e a refatoração do site, com melhorias de usabilidade e performance.",
    "resume.exp2.role": "Desenvolvedor Full Stack",
    "resume.exp2.company": "Cootraporter · Cooperativa de Transporte de Cargas · Remoto · 2021 – 2024",
    "resume.exp2.text": "Desenvolvi o sistema de gestão interna (cargas, cooperados, notas e pagamentos) para uma frota de 120+ veículos e ~500 entregas diárias, gerando redução de custos. Criei dashboards estratégicos para apoiar a tomada de decisão da diretoria.",
    "resume.exp3.role": "Desenvolvedor Full Stack",
    "resume.exp3.company": "Egnex / Nexomobi · Remoto · 2022 – 2023",
    "resume.exp3.text": "Recuperação e evolução de sistema legado: correção de bugs e desenvolvimento de funcionalidades pendentes.",
    "resume.skills.title": "Principais habilidades",
    "resume.education.title": "Formação",
    "resume.edu1.course": "Bacharelado em Engenharia de Computação",
    "resume.edu1.school": "Universidade Cândido Mendes · Rio de Janeiro · 2021 – 2025",
    "resume.edu2.course": "Técnico em Automação Industrial",
    "resume.edu2.school": "ETERJ · Rio de Janeiro · 2016 – 2020",
    "resume.langs.title": "Idiomas",
    "resume.langs.pt": "Português — Nativo",
    "resume.langs.en": "Inglês — Básico a Intermediário (leitura técnica)",

    /* --- CONTATO --- */
    "contact.title": "Vamos conversar",
    "contact.subtitle": "Disponível para projetos freelance",
    "contact.text": "Tem um projeto em mente ou quer trabalhar comigo? Escolha o canal que preferir.",
    "contact.email.label": "Email",
    "contact.whatsapp.label": "WhatsApp",
    "contact.linkedin.label": "LinkedIn",
    "contact.github.label": "GitHub",
    "contact.cta.action": "Abrir",
    "contact.availability": "Disponível para novos projetos",
  },

  en: {
    /* --- Navigation / general --- */
    "nav.home": "Home",
    "nav.about": "About",
    "nav.resume": "Resume",
    "nav.contact": "Contact",
    "nav.projects": "Projects",
    "nav.cta": "Work with me",
    "footer.rights": "All rights reserved.",
    "footer.built": "Built with coffee and code.",

    /* --- HOME / Hero --- */
    "home.hello": "Hi, I'm",
    "home.role": "Full Stack Developer",
    "home.tagline": "I bring digital solutions to businesses: solving problems, streamlining processes and building scalable systems — end to end.",
    "home.cta.primary": "View resume",
    "home.cta.secondary": "Get in touch",

    /* --- HOME / Stats --- */
    "home.stats.1": "years of experience",
    "home.stats.2": "international projects · Japan",
    "home.stats.3": "technologies in stack",
    "home.stats.4": "sectors · real estate, logistics & games",

    /* --- HOME / Short about --- */
    "home.about.title": "A bit about me",
    "home.about.text": "I'm a full stack developer from Rio de Janeiro, focused on large-scale systems. From industrial automation to web and mobile development, I enjoy turning complex operations into digital products that deliver real results.",

    /* --- HOME / Tech --- */
    "home.tech.title": "Technologies",
    "home.tech.subtitle": "Tools I use every day",
    "home.tech.mobile": "Mobile",
    "home.tech.frontend": "Frontend & Web",
    "home.tech.backend": "Backend & Database",
    "home.tech.devops": "DevOps & Tools",

    /* --- HOME / Services --- */
    "home.services.title": "Services",
    "home.services.subtitle": "How I can help you",
    "home.services.1.title": "Web Development",
    "home.services.1.text": "Modern, responsive websites and web systems with React, Vue.js and JavaScript, focused on usability and performance.",
    "home.services.2.title": "iOS Apps",
    "home.services.2.text": "Native iPhone apps with Swift, SwiftUI and UIKit, including legacy system modernization.",
    "home.services.3.title": "APIs & Backend",
    "home.services.3.text": "Robust APIs and back-ends with Node.js, PHP/Laravel and MySQL and MongoDB databases.",
    "home.services.4.title": "Management Systems",
    "home.services.4.text": "Admin platforms and dashboards to manage large-scale operations and support data-driven decisions.",

    /* --- HOME / Partners --- */
    "home.partners.title": "Partners",
    "home.partners.subtitle": "Companies I collaborate with",
    "home.partners.byterain": "ByteRain",
    "home.partners.byterain.desc": "[PLACEHOLDER] Describe the ByteRain partnership here.",
    "home.partners.loopera": "loopera",
    "home.partners.loopera.desc": "[PLACEHOLDER] Describe the loopera partnership here.",

    /* --- PROJECTS --- */
    "projects.title": "My Projects",
    "projects.subtitle": "What I've built",
    "projects.pro.title": "Professional Work",
    "projects.pro.note": "Work for companies and clients — some under NDA, no public link.",
    "projects.personal.title": "Personal Projects",
    "projects.private": "private project",
    "projects.visit": "visit",
    "projects.pro1.name": "Real Estate Platform (Japan)",
    "projects.pro1.meta": "Front-End · Back-End · iOS App · 2022 – 2025",
    "projects.pro1.desc": "Internal admin platform for headquarters and branches, now managing 15,000+ properties. 65% reduction in contract time and 47% increase in satisfaction. App modernization (UIKit → SwiftUI).",
    "projects.pro2.name": "Cootraporter",
    "projects.pro2.meta": "Front-End · Back-End · 2021 – 2024",
    "projects.pro2.desc": "Logistics management system (cargo, members, invoices and payments) for a fleet of 120+ vehicles and ~500 daily deliveries, with strategic dashboards for the board.",
    "projects.pro3.name": "Egnex / Nexomobi",
    "projects.pro3.meta": "Front-End · Back-End · 2022 – 2023",
    "projects.pro3.desc": "Recovery and evolution of a legacy system: bug fixing and development of pending features.",
    "projects.per1.name": "WePlanner",
    "projects.per1.meta": "Personal project",
    "projects.per1.desc": "Collaborative planning and management platform: dashboard, automations and multiple services in a monorepo. Built with Turborepo (NestJS + Next.js), Prisma and PostgreSQL.",
    "projects.per2.name": "RPG Gaming — Worlds RPG",
    "projects.per2.meta": "Personal project · dev.worldsrpg.com",
    "projects.per2.desc": "Multiplayer RPG platform with a web app, admin panel and API in a microservices architecture. Turborepo monorepo with Next.js, NestJS, TypeScript and PostgreSQL.",

    /* --- ABOUT --- */
    "about.title": "About me",
    "about.subtitle": "From curiosity to code",
    "about.intro": "I'm João Vitor, a full stack developer from Rio de Janeiro. I started from the ground up — electronics and automation — and worked my way up to building systems that now run at international scale. This is the journey that brought me here.",
    "about.timeline.title": "My journey",
    "about.t1.year": "2016 – 2020",
    "about.t1.title": "Where it all began",
    "about.t1.text": "Technical course in Industrial Automation at ETERJ, programming microcontrollers in C/C++ with Arduino. That's where logic and hardware sparked my drive to build things that actually work.",
    "about.t2.year": "2021",
    "about.t2.title": "The turn to software",
    "about.t2.text": "Started my Computer Engineering degree (Universidade Cândido Mendes) and took my first steps in web development — JavaScript, HTML5, CSS3 and my first real projects.",
    "about.t3.year": "2021 – 2024",
    "about.t3.title": "Working in the field",
    "about.t3.text": "Full stack development at Cootraporter (a logistics system for 120+ vehicles and ~500 daily deliveries) and at Egnex/Nexomobi, recovering and evolving legacy systems in production.",
    "about.t4.year": "2022 – Today",
    "about.t4.title": "International scale",
    "about.t4.text": "International project in the real estate sector (Japan): a platform that now manages over 15,000 properties, with iOS app modernization (UIKit → SwiftUI) and major efficiency gains. I keep growing in large-scale systems, mobile and back-end.",
    "about.values.title": "What drives me",
    "about.values.1": "Clean, well-tested code",
    "about.values.2": "Continuous learning",
    "about.values.3": "Focus on user experience",
    "about.values.4": "Quality delivery on time",

    /* --- RESUME --- */
    "resume.title": "Resume",
    "resume.subtitle": "Professional summary",
    "resume.download": "Download resume (PDF)",
    "resume.summary.title": "Summary",
    "resume.summary.text": "Full Stack Developer with solid experience building and optimizing large-scale systems for the real estate and logistics sectors. Proven ability to lead application modernization, driving major gains in operational efficiency and customer satisfaction on international projects.",
    "resume.experience.title": "Experience",
    "resume.exp1.role": "Full Stack Developer — Front-End, Back-End and App",
    "resume.exp1.company": "International Project · Real Estate (Japan) · Remote · 2022 – 2025",
    "resume.exp1.text": "Built the internal admin platform for headquarters and branches — now managing over 15,000 properties, with a 65% reduction in contract processing time and a 47% increase in customer satisfaction. Led app modernization (UIKit → SwiftUI migration) and the website refactor, with usability and performance improvements.",
    "resume.exp2.role": "Full Stack Developer",
    "resume.exp2.company": "Cootraporter · Freight Transport Cooperative · Remote · 2021 – 2024",
    "resume.exp2.text": "Built the internal management system (cargo, members, invoices and payments) for a fleet of 120+ vehicles and ~500 daily deliveries, reducing costs. Created strategic dashboards to support the board's decision-making.",
    "resume.exp3.role": "Full Stack Developer",
    "resume.exp3.company": "Egnex / Nexomobi · Remote · 2022 – 2023",
    "resume.exp3.text": "Recovery and evolution of a legacy system: bug fixing and development of pending features.",
    "resume.skills.title": "Core skills",
    "resume.education.title": "Education",
    "resume.edu1.course": "Bachelor's in Computer Engineering",
    "resume.edu1.school": "Universidade Cândido Mendes · Rio de Janeiro · 2021 – 2025",
    "resume.edu2.course": "Technical Degree in Industrial Automation",
    "resume.edu2.school": "ETERJ · Rio de Janeiro · 2016 – 2020",
    "resume.langs.title": "Languages",
    "resume.langs.pt": "Portuguese — Native",
    "resume.langs.en": "English — Basic to Intermediate (technical reading)",

    /* --- CONTACT --- */
    "contact.title": "Let's talk",
    "contact.subtitle": "Available for freelance projects",
    "contact.text": "Got a project in mind or want to work with me? Pick the channel you prefer.",
    "contact.email.label": "Email",
    "contact.whatsapp.label": "WhatsApp",
    "contact.linkedin.label": "LinkedIn",
    "contact.github.label": "GitHub",
    "contact.cta.action": "Open",
    "contact.availability": "Available for new projects",
  },
};

/* Aplica as traduções no DOM */
function applyI18n(lang) {
  const dict = I18N[lang] || I18N.pt;
  document.documentElement.lang = lang === "en" ? "en" : "pt-BR";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  // Atributos (ex.: aria-label, title, placeholder) via data-i18n-attr="attr:key"
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    el.getAttribute("data-i18n-attr").split(";").forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (attr && key && dict[key] !== undefined) el.setAttribute(attr, dict[key]);
    });
  });
}

window.I18N = I18N;
window.applyI18n = applyI18n;
