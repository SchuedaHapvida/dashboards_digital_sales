export const meta = {
  empresa: "Hapvida NotreDame Intermédica",
  canal: "WhatsApp (Gupshup)",
  periodo: "01/05 – 09/06/2026",
  geradoEm: "Jun/2026",
};

export const kpis = {
  totalChats: 48868,
  chatsEncerrados: 47473,
  vendas: 1402,
  agendamentos: 2977,
  taxaConversaoGeral: 2.87,
  taxaConversaoTagueados: 11.8,
  chatsTagueados: 11917,
  percentTagueados: 24.4,
  agentesAtivos: 50,
  equipesAtivas: 78,
};

export const funilConversao = [
  { etapa: "Chats Iniciados", valor: 48868, cor: "#003087" },
  { etapa: "Chats Encerrados", valor: 47473, cor: "#1B4DB0" },
  { etapa: "Com Tag de Encerramento", valor: 11917, cor: "#2563EB" },
  { etapa: "Agendamentos", valor: 2977, cor: "#F47920" },
  { etapa: "Vendas Realizadas", valor: 1402, cor: "#16A34A" },
];

export const tagsEncerramento = [
  { tag: "Agendamento", count: 2977, percent: 25.0, cor: "#F47920" },
  { tag: "Enc. sem interação", count: 2823, percent: 23.7, cor: "#94A3B8" },
  { tag: "Sem interesse", count: 1815, percent: 15.2, cor: "#EF4444" },
  { tag: "Esclarecimento de Dúvida", count: 1534, percent: 12.9, cor: "#3B82F6" },
  { tag: "Venda Realizada", count: 1402, percent: 11.8, cor: "#16A34A" },
  { tag: "Já possui plano", count: 1078, percent: 9.0, cor: "#8B5CF6" },
  { tag: "Boleto", count: 155, percent: 1.3, cor: "#F59E0B" },
  { tag: "Sem cartão", count: 86, percent: 0.7, cor: "#EC4899" },
  { tag: "Teste", count: 47, percent: 0.4, cor: "#D1D5DB" },
];

export const agentes = [
  { nome: "Glayane Silva", chats: 2355, vendas: 222, conversao: 9.4 },
  { nome: "Victoria Regia", chats: 1668, vendas: 191, conversao: 11.5 },
  { nome: "Cláudia Galvão", chats: 2193, vendas: 170, conversao: 7.8 },
  { nome: "Emanuele Souza", chats: 1468, vendas: 139, conversao: 9.5 },
  { nome: "Lara de Lima", chats: 1340, vendas: 81, conversao: 6.0 },
  { nome: "Marilene Santos", chats: 1339, vendas: 85, conversao: 6.3 },
  { nome: "Josiene Dourado", chats: 932, vendas: 62, conversao: 6.7 },
  { nome: "Vania Gabriela", chats: 1008, vendas: 59, conversao: 5.9 },
  { nome: "Yan Vasconcelos", chats: 1292, vendas: 48, conversao: 3.7 },
  { nome: "Emerson Soares", chats: 1480, vendas: 42, conversao: 2.8 },
  { nome: "Lumma Roberta", chats: 1152, vendas: 38, conversao: 3.3 },
  { nome: "Vanessa Ribeiro", chats: 975, vendas: 35, conversao: 3.6 },
  { nome: "Mikaele Rodrigues", chats: 1126, vendas: 29, conversao: 2.6 },
  { nome: "Amanda Vitoria", chats: 959, vendas: 23, conversao: 2.4 },
  { nome: "Louise Mendonça", chats: 1034, vendas: 16, conversao: 1.5 },
];

export const origens = [
  { origem: "Espontâneo", chats: 6661, vendas: 691, conversao: 10.4 },
  { origem: "Site Padrão", chats: 3276, vendas: 231, conversao: 7.1 },
  { origem: "LP de Parceiro", chats: 806, vendas: 47, conversao: 5.8 },
];

export const volumeHorario = [
  { hora: "00h", volume: 120 },
  { hora: "01h", volume: 45 },
  { hora: "02h", volume: 20 },
  { hora: "03h", volume: 15 },
  { hora: "04h", volume: 12 },
  { hora: "05h", volume: 18 },
  { hora: "06h", volume: 85 },
  { hora: "07h", volume: 320 },
  { hora: "08h", volume: 890 },
  { hora: "09h", volume: 2145 },
  { hora: "10h", volume: 11868 },
  { hora: "11h", volume: 8543 },
  { hora: "12h", volume: 4444 },
  { hora: "13h", volume: 6509 },
  { hora: "14h", volume: 3150 },
  { hora: "15h", volume: 3882 },
  { hora: "16h", volume: 2890 },
  { hora: "17h", volume: 1987 },
  { hora: "18h", volume: 980 },
  { hora: "19h", volume: 456 },
  { hora: "20h", volume: 234 },
  { hora: "21h", volume: 145 },
  { hora: "22h", volume: 98 },
  { hora: "23h", volume: 67 },
];
