// Limpa menus anteriores para evitar erro de duplicidade
chrome.contextMenus.removeAll(() => {
  chrome.contextMenus.create({
    id: "analisar-imagem",
    title: "Analisar com Oráculo",
    contexts: ["image"]
  });
});

// Escuta o clique
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "analisar-imagem") {
    // Usamos console.log em vez de alert() para evitar o erro
    console.log("Imagem capturada para processamento!");
    console.log("URL:", info.srcUrl);
  }
});
