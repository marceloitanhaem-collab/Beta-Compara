// Cria o botão no menu de contexto (clique direito na imagem)
chrome.contextMenus.create({
  id: "enviarParaOraculo",
  title: "Analisar com M.ia.Tech",
  contexts: ["image"]
});

// Escuta o clique no botão
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "enviarParaOraculo") {
    
    // Limpa a string da imagem
    const base64Data = info.srcUrl.split(',')[1] || info.srcUrl;

    try {
      const response = await fetch("https://ltiqfthblsoktgvbvkgu.supabase.co/functions/v1/oraculo-api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          imageBase64: base64Data, 
          prompt: "Descreva esta imagem" 
        })
      });

      const data = await response.json();
      console.log("Resposta do Gemini:", data);
      
      // Envia a resposta como uma notificação
      chrome.notifications.create({
        type: 'basic',
        iconUrl: '', 
        title: 'M.ia.Tech - Análise',
        message: data.text || "Análise concluída com sucesso!"
      });
      
    } catch (err) {
      console.error("Erro na comunicação:", err);
    }
  }
});
