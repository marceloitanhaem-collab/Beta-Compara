// Remove menus anteriores para evitar o erro de duplicidade
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
    console.log("Imagem capturada com sucesso!");
    // Aqui não usamos mais o alert()
    console.log("URL da imagem:", info.srcUrl);
  }
});
