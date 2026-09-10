/**
 * Recreio Shopping (ALLOS) — Base de Dados Oficial Unificada
 * Versão: 2.1.0
 */

const STORES_DATABASE = [
  {
    id: 1,
    name: "C&A Modas",
    category: "Moda",
    floor: "L1",
    logo: "CA",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/images/mos/cea_1704907027___Bmb06S26gXH0i8umQ_zAG.jpg",
    description: "Moda feminina, masculina e infantil, tecnologia e beleza com as melhores tendências e preços acessíveis.",
    whatsapp: "5521998761001",
    hours: "10h às 22h",
    petFriendly: true,
    tag: "Mega Store Âncora"
  },
  {
    id: 2,
    name: "Bacio di Latte Gelato",
    category: "Gastronomia",
    floor: "L1",
    logo: "BDL",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/files/Recreio-Shopping/Arquivos-Wise-It/Lojas-logos/1081793739/701454.jpeg",
    description: "Gelatos artesanais italianos com ingredientes nobres importados, cafés especiais e casquinhas artesanais recheadas com chocolate belga.",
    whatsapp: "5521998761002",
    hours: "10h às 22h",
    petFriendly: true,
    tag: "Gelato Artesanal"
  },
  {
    id: 3,
    name: "Burger King",
    category: "Gastronomia",
    floor: "L2",
    logo: "BK",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/files/Recreio-Shopping/Arquivos-Wise-It/Lojas-logos/1081779595/701686.jpeg",
    description: "Hambúrgueres grelhados no fogo como churrasco, o famoso Whopper, batatas crocantes e sobremesas deliciosas na Praça de Alimentação.",
    whatsapp: "5521998761003",
    hours: "10h às 22h",
    petFriendly: false,
    tag: "Grelhado no Fogo"
  },
  {
    id: 4,
    name: "Mamma Jamma Pizzaria",
    category: "Gastronomia",
    floor: "L1",
    logo: "MJ",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/images/mos/Nova_Logo_Mamma_Jamma_Avatar___1-_zKWU_R3LoZZ7XVow_x.jpeg",
    description: "Pizzaria rústica artesanal com forno a lenha, farinha italiana 00, drinks autorais e mesas na Varanda Recreio.",
    whatsapp: "5521998761004",
    hours: "12h às 23h",
    petFriendly: true,
    tag: "Varanda ao Ar Livre"
  },
  {
    id: 5,
    name: "Avatim Aromas",
    category: "Beleza",
    floor: "L1",
    logo: "AV",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/images/mos/logo_avatim-cheiros-da-terra_WMILKK%20%281%29___wyGNc0m6luufUVNNe0fIX.png",
    description: "Aromas da terra, perfumes de ambientes, difusores e cosméticos com essências nobres e bioativos naturais.",
    whatsapp: "5521998761005",
    hours: "10h às 22h",
    petFriendly: true,
    tag: "Bem-Estar & Aromas"
  },
  {
    id: 6,
    name: "Alice Salazar Store",
    category: "Beleza",
    floor: "L2",
    logo: "AS",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/images/mos/alice___WCbuWwMV_itq3pNgHi8G7.png",
    description: "Maquiagens profissionais, dermocosméticos e produtos de beleza desenvolvidos pela renomada maquiadora Alice Salazar.",
    whatsapp: "5521998761006",
    hours: "10h às 22h",
    petFriendly: true,
    tag: "Make & Skincare"
  },
  {
    id: 7,
    name: "Cheirin Bão Cafés",
    category: "Gastronomia",
    floor: "L1",
    logo: "CB",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/images/mos/CHEIRIN%20B%C3%83O___cTg4fPlqSll0J8lm0190y.png",
    description: "Autêntico café colonial mineiro, pães de queijo recheados, broas artesanais e cafés especiais moídos na hora.",
    whatsapp: "5521998761007",
    hours: "10h às 22h",
    petFriendly: true,
    tag: "Cafés Especiais"
  },
  {
    id: 8,
    name: "Lecadô Doceria",
    category: "Gastronomia",
    floor: "L1",
    logo: "LC",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/images/mos/logo_lecado___NbdxaORicHdwNqYIsnbiK.png",
    description: "Tortas finas clássicas, doces artesanais, salgadinhos de festa quentinhos e bolos confeitados com tradição carioca.",
    whatsapp: "5521998761008",
    hours: "10h às 22h",
    petFriendly: true,
    tag: "Doceria & Bolos"
  },
  {
    id: 9,
    name: "Oki Oka Culinária Japonesa",
    category: "Gastronomia",
    floor: "L1",
    logo: "OK",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/images/mos/OKI%20OKA___G7EMb5G9Mc-VvLu3S4WB9.png",
    description: "Sashimis frescos, combinados contemporâneos de sushi, temakis e pratos orientais quentes preparados com excelência.",
    whatsapp: "5521998761009",
    hours: "11h às 22h",
    petFriendly: true,
    tag: "Sushi & Cozinha Asiática"
  },
  {
    id: 10,
    name: "Empada Carioca",
    category: "Gastronomia",
    floor: "L1",
    logo: "EC",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/images/mos/EMPADA%20CARIOCA___iYzh91vxfCX5s-wEGpbF7.png",
    description: "Empadas de massa podre recheadas com camarão, frango, palmito e queijo, além de sucos naturais e lanches rápidos.",
    whatsapp: "5521998761010",
    hours: "10h às 22h",
    petFriendly: true,
    tag: "Lanches & Salgados"
  },
  {
    id: 11,
    name: "HNT Frango Crocante",
    category: "Gastronomia",
    floor: "L2",
    logo: "HN",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/images/mos/LOGO%20HNT___1q63_yiZJ0xkvpndUh5EX.png",
    description: "O mais crocante frango frito com temperos especiais, baldes para a família, molhos artesanais e acompanhamentos.",
    whatsapp: "5521998761011",
    hours: "11h às 22h",
    petFriendly: false,
    tag: "Fast Casual"
  },
  {
    id: 12,
    name: "Mate do Rô",
    category: "Gastronomia",
    floor: "L1",
    logo: "MR",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/images/mos/mate___ZWfY1XZWtme1_JazwXXKD.jpg",
    description: "O autêntico mate da praia do Rio de Janeiro geladinho, com limão ou batido, acompanhado de biscoito de polvilho.",
    whatsapp: "5521998761012",
    hours: "10h às 22h",
    petFriendly: true,
    tag: "Tradição Carioca"
  },
  {
    id: 13,
    name: "Recreio Offices",
    category: "Serviços",
    floor: "L3",
    logo: "RO",
    image: "https://recreioshopping.com.br/data/files/E6/45/AF/D5/BFE3591036DEB1598659F9C2/RecreioOffices_Bannerhome_375x230px.png",
    description: "Mais de 500 consultórios médicos, odontologia, clínicas especializadas, agências e escritórios com acesso direto ao mall.",
    whatsapp: "5521998761013",
    hours: "08h às 20h",
    petFriendly: true,
    tag: "Negócios & Saúde"
  },
  {
    id: 14,
    name: "Cinesystem VIP a Laser",
    category: "Lazer",
    floor: "L3",
    logo: "CS",
    image: "https://recreioshopping.com.br/data/files/74/90/23/80/47E50A10BB92540ABCDBF9C2/Semana_do_Cinema_900x395.jpg",
    description: "6 salas digitais com tecnologia Laser 4K, poltronas VIP reclináveis, som imersivo Dolby e bomboniere completa.",
    whatsapp: "5521998761014",
    hours: "13h às 22h30",
    petFriendly: false,
    tag: "Cinema & Cultura"
  },
  {
    id: 15,
    name: "Pão de Açúcar Gourmet",
    category: "Serviços",
    floor: "L1",
    logo: "PA",
    image: "https://recreioshopping.com.br/data/files/86/F2/57/A6/CDCC2710A2980A27A51BF9C2/mapa_Recreio0.jpg",
    description: "Supermercado completo com adega selecionada com sommelier, padaria artesanal, queijos nobres e hortifrúti fresco.",
    whatsapp: "5521998761015",
    hours: "07h às 22h",
    petFriendly: false,
    tag: "Gourmet & Mercado"
  },
  {
    id: 16,
    name: "Pet Park Recreio",
    category: "Lazer",
    floor: "L1",
    logo: "PP",
    image: "https://recreioshopping.com.br/data/files/5F/03/AE/EB/95E33810CE8A9338180808FF/Banner%20FPD%20940x380px%20-Pet%20Park.png",
    description: "Área arborizada e cercada ao ar livre dedicada ao lazer dos animais, com brinquedos de agility, bancos e bebedouros caninos.",
    whatsapp: "5521998761016",
    hours: "10h às 22h",
    petFriendly: true,
    tag: "Pet Friendly Gratuito"
  }
];

const MOVIES_DATABASE = [
  {
    id: 101,
    title: "Authentic Games No Império Desconectado",
    rating: "Livre",
    ratingColor: "bg-emerald-500",
    duration: "85 min",
    genre: "Aventura • Família",
    poster: "https://ingresso-a.akamaihd.net/prd/img/movie/authentic-games-no-imperio-desconectado/336226b6-94cf-4bd3-8fb8-19a32bcfae51.webp",
    sessionsToday: ["14:00 (Laser • Dub)", "16:10 (Laser • Dub)", "18:20 (Laser • Dub)"],
    trailerUrl: "https://www.youtube.com/embed/Way9Dexny3w?autoplay=1",
    synopsis: "Authentic e seus companheiros são transportados para uma dimensão desconectada e precisam usar sua imaginação e habilidades gamer para restaurar o equilíbrio do império virtual."
  },
  {
    id: 102,
    title: "Homem-Aranha: Um Novo Dia",
    rating: "12",
    ratingColor: "bg-blue-600",
    duration: "135 min",
    genre: "Ação • Super-Herói",
    poster: "https://ingresso-a.akamaihd.net/prd/img/movie/homem-aranha-um-novo-dia/257f9c31-7c31-4bfd-b903-2b398f4830dc.webp",
    sessionsToday: ["15:30 VIP (Laser • Dub)", "18:30 VIP (Laser • Leg)", "21:30 VIP (Laser • Leg)"],
    trailerUrl: "https://www.youtube.com/embed/LEjhY15eCx0?autoplay=1",
    synopsis: "Peter Parker enfrenta as consequências de suas escolhas anteriores enquanto um novo grupo de vilões surge ameaçando a segurança de Nova York e de seus entes mais queridos."
  },
  {
    id: 103,
    title: "Cordélicos - A Origem do Cabra da Peste",
    rating: "14",
    ratingColor: "bg-orange-500",
    duration: "105 min",
    genre: "Animação • Aventura Brasileira",
    poster: "https://ingresso-a.akamaihd.net/prd/img/movie/cordelicos-a-origem-do-cabra-da-peste/254bb1a2-3c87-49af-a254-8da194d8961a.webp",
    sessionsToday: ["14:30 (Laser • Nac)", "17:00 (Laser • Nac)", "19:30 (Laser • Nac)"],
    trailerUrl: "https://www.youtube.com/embed/73_1biulkYk?autoplay=1",
    synopsis: "Embalado pelas xilogravuras e pela rima do cordel nordestino, heróis improváveis partem em uma jornada mística pelo sertão contra forças sobrenaturais ancestrais."
  },
  {
    id: 104,
    title: "Coyote vs. Acme",
    rating: "Livre",
    ratingColor: "bg-emerald-500",
    duration: "98 min",
    genre: "Comédia • Animação",
    poster: "https://ingresso-a.akamaihd.net/prd/img/movie/coyote-vs-acme/6d8c7366-d4cb-408c-b3c8-43f2eabcf709.webp",
    sessionsToday: ["13:45 (Laser • Dub)", "16:00 (Laser • Dub)", "18:15 (Laser • Dub)", "20:30 (Laser • Dub)"],
    trailerUrl: "https://www.youtube.com/embed/4rgYUipGJNo?autoplay=1",
    synopsis: "Após décadas de produtos defeituosos explodindo em sua cara na tentativa de capturar o Papa-Léguas, o Coiote decide contratar um advogado e processar a todo-poderosa Corporação ACME."
  },
  {
    id: 105,
    title: "Colegas E O Herdeiro",
    rating: "Livre",
    ratingColor: "bg-emerald-500",
    duration: "102 min",
    genre: "Comédia • Drama Nacional",
    poster: "https://ingresso-a.akamaihd.net/prd/img/movie/colegas-e-o-herdeiro/f4a88278-a1f4-4311-84ff-bdb6ce141ae8.webp",
    sessionsToday: ["15:00 VIP (Nac)", "17:40 VIP (Nac)", "20:20 VIP (Nac)"],
    trailerUrl: "https://www.youtube.com/embed/qQlr9-rF32A?autoplay=1",
    synopsis: "A continuação do aclamado sucesso brasileiro traz novas aventuras emocionantes e lições inesquecíveis sobre amizade, superação e inclusão em um road-movie repleto de afeto."
  },
  {
    id: 106,
    title: "Minha Melhor Amiga",
    rating: "12",
    ratingColor: "bg-blue-600",
    duration: "110 min",
    genre: "Drama • Família",
    poster: "https://ingresso-a.akamaihd.net/prd/img/movie/minha-melhor-amiga/744ead14-7a69-4a43-8812-7792e5d9c9c9.webp",
    sessionsToday: ["16:30 VIP (Laser • Leg)", "19:10 VIP (Laser • Dub)", "21:45 VIP (Laser • Leg)"],
    trailerUrl: "https://www.youtube.com/embed/YPY7J-flzE8?autoplay=1",
    synopsis: "Duas amigas inseparáveis de infância descobrem que a força de sua conexão é capaz de superar qualquer adversidade quando um grande segredo do passado vem à tona."
  }
];

const DINING_DATABASE = [
  {
    id: 201,
    name: "Bacio di Latte Gelato & Caffè",
    type: "Gelateria & Cafeteria Italiana",
    tag: "cafes",
    tagLabel: "Gelato Italiano Puro",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/files/Recreio-Shopping/Arquivos-Wise-It/Lojas-logos/1081793739/701454.jpeg",
    desc: "Autêntico gelato italiano produzido diariamente com ingredientes puros selecionados, casquinhas artesanais e cafés especiais na Varanda e no mall.",
    hours: "Seg a Dom: 10h às 22h",
    features: ["Gelato Artesanal", "Cafés Nobres", "Opções Sem Açúcar", "Pet Friendly"],
    whatsapp: "5521998761002"
  },
  {
    id: 202,
    name: "Mamma Jamma Pizzaria",
    type: "Pizzaria Artesanal & Forno a Lenha",
    tag: "varanda",
    tagLabel: "Varanda ao Ar Livre",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/images/mos/Nova_Logo_Mamma_Jamma_Avatar___1-_zKWU_R3LoZZ7XVow_x.jpeg",
    desc: "Massa de fermentação lenta de 48 horas, azeites italianos aromatizados, drinks autorais e clima descontraído com vista para o paisagismo do shopping.",
    hours: "Seg a Dom: 12h às 23h",
    features: ["Mesas Externas", "Drinks de Verão", "Pet Friendly", "Chopp Artesanal"],
    whatsapp: "5521998761004"
  },
  {
    id: 203,
    name: "Burger King Recreio",
    type: "Fast Casual & Hambúrgueres",
    tag: "happyhour",
    tagLabel: "Grelhado no Fogo",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/files/Recreio-Shopping/Arquivos-Wise-It/Lojas-logos/1081779595/701686.jpeg",
    desc: "O sabor inconfundível do hambúrguer grelhado no fogo, batatas crocantes, refil de refrigerante e linha exclusiva de sobremesas na Praça de Alimentação.",
    hours: "Seg a Dom: 10h às 22h",
    features: ["Grelhado no Fogo", "Refil de Bebidas", "Combo Família", "App Exclusivo"],
    whatsapp: "5521998761003"
  },
  {
    id: 204,
    name: "Cheirin Bão Cafés & Delícias",
    type: "Cafeteria & Empório Mineiro",
    tag: "cafes",
    tagLabel: "Café Mineiro",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/images/mos/CHEIRIN%20B%C3%83O___cTg4fPlqSll0J8lm0190y.png",
    desc: "Cafés especiais premiados cultivados na Serra da Mantiqueira, broas de milho, doces de leite artesanais e ambiente acolhedor.",
    hours: "Seg a Dom: 10h às 22h",
    features: ["Pão de Queijo Recheado", "Café Coado", "Tomadas para Laptop", "Wi-Fi Rápido"],
    whatsapp: "5521998761007"
  },
  {
    id: 205,
    name: "Lecadô Doceria & Tortas",
    type: "Confeitaria & Tortas Nobres",
    tag: "cafes",
    tagLabel: "Doceria Tradicional",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/images/mos/logo_lecado___NbdxaORicHdwNqYIsnbiK.png",
    desc: "Mais de 40 sabores de tortas doces, baby tortas, brigadeiros gourmets e coxinhas douradas recheadas para sua sobremesa.",
    hours: "Seg a Dom: 10h às 22h",
    features: ["Tortas Inteiras", "Fatias Especiais", "Salgados Quentinhos", "Take Away"],
    whatsapp: "5521998761008"
  },
  {
    id: 206,
    name: "Oki Oka Gastronomia Japonesa",
    type: "Culinária Oriental & Sushi",
    tag: "varanda",
    tagLabel: "Varanda Gourmet",
    image: "https://elephant-file-storage.nyc3.digitaloceanspaces.com/public/images/mos/OKI%20OKA___G7EMb5G9Mc-VvLu3S4WB9.png",
    desc: "Combinados contemporâneos, peças maçaricadas trufadas, ceviches e carta de drinks especiais na Varanda Gourmet do Recreio.",
    hours: "Seg a Dom: 12h às 23h",
    features: ["Sushi Fresco", "Drinks Autorais", "Mesas ao Ar Livre", "Pet Friendly"],
    whatsapp: "5521998761009"
  }
];

const EVENTS_DATABASE = [
  {
    id: 301,
    title: "Sunset Recreio na Varanda",
    type: "music",
    typeLabel: "Música & Sunset",
    badgeColor: "bg-coral-500",
    date: "Sexta e Sábado • 18h às 21h",
    startISO: "20260911T210000Z",
    endISO: "20260911T240000Z",
    location: "Varanda Gourmet • Recreio Shopping",
    image: "https://recreioshopping.com.br/data/files/F0/00/D3/B5/AAA40A1002D5210AC968F9C2/banner_agendaDesk_900x354px.jpg",
    desc: "Pocket shows ao vivo com o melhor da Bossa Nova, MPB acústica e Jazz no deck externo ao entardecer. Entrada gratuita com chopp artesanal e boa gastronomia."
  },
  {
    id: 302,
    title: "Clubinho Teatrinho Infantil",
    type: "kids",
    typeLabel: "Infantil & Família",
    badgeColor: "bg-ocean-600",
    date: "Todo Domingo • 16h00",
    startISO: "20260913T190000Z",
    endISO: "20260913T203000Z",
    location: "Praça de Eventos • Piso L1",
    image: "https://recreioshopping.com.br/data/files/3B/D7/0B/B5/F158F910C9A327F9C968F9C2/imgDesk_900x354px.jpg",
    desc: "Peças teatrais interativas, contação de histórias com figurinos temáticos e oficinas lúdicas de artes para as crianças soltarem a imaginação com segurança."
  },
  {
    id: 303,
    title: "Circuito Sabores & Festival de Fatias",
    type: "music",
    typeLabel: "Gastronomia & Lazer",
    badgeColor: "bg-palm-600",
    date: "Quinta a Domingo • 12h às 22h",
    startISO: "20260912T150000Z",
    endISO: "20260912T250000Z",
    location: "Varanda Gourmet Deck",
    image: "https://recreioshopping.com.br/data/files/27/30/29/0B/69C7E810BAC9A7E88659F9C2/Banner%20FPD%20940x380px%20-%20Floresta.png",
    desc: "Circuito gastronômico reunindo as melhores receitas de massas e fatias artesanais com harmonização de vinhos e cervejas especiais sob o céu do Recreio."
  },
  {
    id: 304,
    title: "Encontro Pet & Agility no Pet Park",
    type: "pet",
    typeLabel: "Pet Friendly",
    badgeColor: "bg-gold-500",
    date: "Todo Sábado • 15h",
    startISO: "20260912T180000Z",
    endISO: "20260912T200000Z",
    location: "Pet Park Recreio Shopping",
    image: "https://recreioshopping.com.br/data/files/5F/03/AE/EB/95E33810CE8A9338180808FF/Banner%20FPD%20940x380px%20-Pet%20Park.png",
    desc: "Circuito de agility com adestrador comportamental, fotos gratuitas dos pets, brindes exclusivos e feira de adoção com ONGs parceiras da região."
  }
];

const FLOOR_MAPS_DATABASE = {
  L1_0: {
    title: "Piso L1 — Térreo & Alameda",
    desc: "Principal acesso de pedestres, estacionamento térreo, polo de conveniência diária, Pão de Açúcar, agências bancárias e farmácias.",
    image: "https://recreioshopping.com.br/data/files/86/F2/57/A6/CDCC2710A2980A27A51BF9C2/mapa_Recreio0.jpg",
    stores: ["Pão de Açúcar", "Mamma Jamma", "Coco Bambu", "Track & Field", "Granado", "Arezzo", "C&A"],
    facilities: [
      { name: "Carrinho Bebê", icon: "https://recreioshopping.com.br/data/files/4B/05/2E/A5/97FE071022BDED07A51BF9C2/carrinho-bebe.png" },
      { name: "Cadeira Rodas", icon: "https://recreioshopping.com.br/data/files/B3/05/3A/A5/97FE071022BDED07A51BF9C2/CADEIRA-RODAS-EMPRESTIMO.png" },
      { name: "Banheiro Família", icon: "https://recreioshopping.com.br/data/files/BD/F4/17/A5/97FE071022BDED07A51BF9C2/Banheiro-Familia.png" },
      { name: "Abafadores TEA (SAC)", lucide: "headphones" },
      { name: "Achados & Perdidos", icon: "https://recreioshopping.com.br/data/files/33/F4/B1/A5/97FE071022BDED07A51BF9C2/achados-e-perdidos.png" }
    ]
  },
  L1_1: {
    title: "Piso L1 — Expansão & Varanda Gourmet",
    desc: "Polo gastronômico a céu aberto com deck arborizado, restaurantes de alta gastronomia, chopp artesanal e praça de convivência.",
    image: "https://recreioshopping.com.br/data/files/80/E7/66/7D/0F927810AA788278180808FF/mapa_Recreio1.jpg",
    stores: ["Coco Bambu Varanda", "Mamma Jamma Deck", "Outback Steakhouse", "Do Batista", "Bacio di Latte", "Cheirin Bão"],
    facilities: [
      { name: "Pet Park", lucide: "dog" },
      { name: "Deck ao Ar Livre", lucide: "sun" },
      { name: "Sanitários", icon: "https://recreioshopping.com.br/data/files/BD/F4/17/A5/97FE071022BDED07A51BF9C2/Banheiro-Familia.png" },
      { name: "Ponto Táxi", lucide: "car" }
    ]
  },
  L2: {
    title: "Piso L2 — Moda, Joias & Coworking",
    desc: "O coração da moda carioca: grandes marcas femininas e masculinas, joalherias, tecnologia e Espaço Família completo.",
    image: "https://recreioshopping.com.br/data/files/B0/71/5A/5C/3048C710A09535C7A51BF9C2/mapa_Recreio_L2.jpg",
    stores: ["Farm Rio", "Osklen", "Richards", "Reserva", "Vivara & Life", "iPlace Apple", "Camicado", "Avatim"],
    facilities: [
      { name: "Fraldário VIP", icon: "https://recreioshopping.com.br/data/files/4D/15/59/B5/97FE071022BDED07A51BF9C2/fraldario.png" },
      { name: "Banheiro Família", icon: "https://recreioshopping.com.br/data/files/BD/F4/17/A5/97FE071022BDED07A51BF9C2/Banheiro-Familia.png" },
      { name: "Espaço Coworking", lucide: "laptop" },
      { name: "Abafadores TEA (Espaço Cliente)", lucide: "headphones" }
    ]
  },
  L3: {
    title: "Piso L3 — Cinesystem VIP & Bodytech",
    desc: "Complexo de entretenimento e bem-estar: 6 salas Cinesystem com tecnologia Laser 4K, bilheterias expressas e academia Bodytech.",
    image: "https://recreioshopping.com.br/data/files/DE/00/7F/A4/1F927810AA788278180808FF/mapa_Recreio_L3.jpg",
    stores: ["Cinesystem VIP Laser", "Bodytech", "Game Point Kids", "Bomboniere Cinesystem"],
    facilities: [
      { name: "Elevadores Panorâmicos", lucide: "chevrons-up-down" },
      { name: "Sanitários PCD", icon: "https://recreioshopping.com.br/data/files/B3/05/3A/A5/97FE071022BDED07A51BF9C2/CADEIRA-RODAS-EMPRESTIMO.png" },
      { name: "Bilheteria Express", lucide: "ticket" },
      { name: "Escadas Rolantes", lucide: "arrow-up-right" }
    ]
  }
};

const ARTICLES_DATABASE = [
  {
    id: 1,
    tag: "Lazer & Grandes Eventos",
    title: "Rock In Rio | Transporte Primeira Classe no Recreio Shopping",
    date: "Ponto Oficial Confirmado",
    image: "https://recreioshopping.com.br/data/files/56/95/2D/D6/9A280A104B4CE60AC968F9C2/Banner%20Fique%20por%20dentro%20-%20Desktop%20900x395.jpg.jpeg",
    content: `
      <p class="font-medium text-slate-800">O Recreio Shopping é o ponto de embarque e desembarque oficial do serviço Primeira Classe para o Rock in Rio, garantindo conveniência e tranquilidade absoluta para você.</p>
      <p>Os ônibus executivos contam com ar-condicionado, poltronas estofadas reclináveis e acesso direto e exclusivo até os portões da Cidade do Rock, evitando bloqueios de trânsito.</p>
      <p>Para sua comodidade, os passageiros do Primeira Classe contam com vagas no estacionamento ALLOS com tarifa controlada, banheiros higienizados e opções de lanche na Praça de Alimentação e na Varanda Gourmet com horário de atendimento ampliado nos dias dos shows.</p>
    `
  },
  {
    id: 2,
    tag: "Cinema VIP",
    title: "Semana do Cinema | Cinesystem com Ingressos Promocionais",
    date: "Campanha Especial",
    image: "https://recreioshopping.com.br/data/files/74/90/23/80/47E50A10BB92540ABCDBF9C2/Semana_do_Cinema_900x395.jpg",
    content: `
      <p class="font-medium text-slate-800">Chegou a oportunidade perfeita para curtir toda a magia do cinema nas salas mais tecnológicas da Zona Oeste do Rio de Janeiro.</p>
      <p>O Cinesystem Recreio Shopping participa da Semana do Cinema com ingressos a valores promocionais em todas as salas 2D, 3D e salas VIP Laser, além de descontos especiais nos combos de pipoca e refrigerante na bomboniere.</p>
      <p>Venha viver a experiência do som imersivo Dolby e projeção 4K com poltronas reclináveis automáticas de couro no Piso L3.</p>
    `
  },
  {
    id: 3,
    tag: "Cuidado Animal & Social",
    title: "CastraPet Rio: Parceria Oficial para Castração Gratuita de Cães e Gatos",
    date: "Ação Comunitária",
    image: "https://recreioshopping.com.br/data/files/5F/03/AE/EB/95E33810CE8A9338180808FF/Banner%20FPD%20940x380px%20-Pet%20Park.png",
    content: `
      <p class="font-medium text-slate-800">O Recreio Shopping recebeu com orgulho a unidade móvel do CastraPet Rio, em parceria com o Governo do Estado.</p>
      <p>Foram centenas de animais atendidos gratuitamente com exames pré-operatórios, cirurgias de esterilização e microchipagem preventiva, reforçando nossa postura de acolhimento e proteção aos pets.</p>
      <p>O evento aconteceu anexo ao nosso Pet Park ao ar livre, reunindo veterinários qualificados e oferecendo orientações sobre posse responsável.</p>
    `
  },
  {
    id: 4,
    tag: "Gastronomia",
    title: "Festival de Fatias: O Melhor da Pizza e Massas Artesanais",
    date: "Varanda Gourmet",
    image: "https://recreioshopping.com.br/data/files/27/30/29/0B/69C7E810BAC9A7E88659F9C2/Banner%20FPD%20940x380px%20-%20Floresta.png",
    content: `
      <p class="font-medium text-slate-800">Uma viagem gastronômica pela autêntica cozinha italiana no polo da Varanda Gourmet do Recreio Shopping.</p>
      <p>Os chefs dos nossos restaurantes prepararam fatias exclusivas com massas fermentadas por 48h, azeites aromatizados, ingredientes locais frescos e harmonizações de chopp e cervejas artesanais.</p>
      <p>Tudo isso em um ambiente aberto e descontraído, com a brisa do mar e apresentações musicais acústicas ao vivo.</p>
    `
  },
  {
    id: 5,
    tag: "Inclusão & Neurodiversidade",
    title: "Em Parceria com a Neurovida: A Árvore da Esperança no Recreio",
    date: "Responsabilidade Social",
    image: "https://recreioshopping.com.br/data/files/49/90/25/8C/943D5910CDF20D59B998F9C2/fique%20por%20dentro%20940%20x%20380.png",
    content: `
      <p class="font-medium text-slate-800">Um gesto de acolhimento e sensibilização para transformar nossa comunidade em um lugar mais inclusivo.</p>
      <p>Em conjunto com o Instituto Neurovida, inauguramos a Árvore da Esperança no Piso L1, conscientizando visitantes sobre o Transtorno do Espectro Autista (TEA) e outras condições do neurodesenvolvimento.</p>
      <p>O shopping disponibiliza gratuitamente no SAC kits sensoriais com brinquedos reguladores, abafadores sonoros e cordão de girassol para atendimento prioritário.</p>
    `
  },
  {
    id: 6,
    tag: "Institucional ALLOS",
    title: "Empodera Ela: Valorização do Empreendedorismo Feminino",
    date: "Movimento ALLOS",
    image: "https://recreioshopping.com.br/data/files/11/A6/E9/89/14680A1027B7480AC968F9C2/WhatsApp%20Image%202026-09-09%20at%2009.41.24.jpeg",
    content: `
      <p class="font-medium text-slate-800">Fortalecer mulheres que lideram e transformam o comércio é um dos compromissos centrais da ALLOS.</p>
      <p>O movimento Empodera Ela reuniu feira de expositoras locais, workshops sobre inovação e gestão de marcas, além de depoimentos inspiradores de lojistas do próprio shopping.</p>
      <p>A iniciativa estimula a independência financeira e celebra a criatividade das mulheres do Recreio dos Bandeirantes.</p>
    `
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    STORES_DATABASE,
    MOVIES_DATABASE,
    DINING_DATABASE,
    EVENTS_DATABASE,
    FLOOR_MAPS_DATABASE,
    ARTICLES_DATABASE
  };
}
