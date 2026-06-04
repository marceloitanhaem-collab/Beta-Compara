// Remove o menu antigo antes de criar um novo para evitar duplicatas
chrome.contextMenus.removeAll(() => {
  chrome.contextMenus.create({
    id: "analisar-imagem",
    title: "Analisar com Oráculo",
    contexts: ["image"]
  });
});

// Escuta o clique no botão
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "analisar-imagem") {
    console.log("Imagem capturada para análise:", info.srcUrl);
    
    // Em vez de alert(), usamos um log ou uma notificação
    console.log("Processando imagem...");
  }
});
