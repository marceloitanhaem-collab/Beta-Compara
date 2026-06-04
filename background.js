chrome.contextMenus.create({
  id: "analisar-imagem",
  title: "Analisar com Oráculo",
  contexts: ["image"]
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "analisar-imagem") {
    console.log("Imagem capturada:", info.srcUrl);
    // Aqui é onde a mágica acontece
    alert("Enviando para análise...");
  }
});
