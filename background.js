chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
        id: "analisar-imagem",
        title: "Analisar com Oráculo",
        contexts: ["image"]
    });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === "analisar-imagem") {
        console.log("Capturando imagem...");
        
        // Envia a URL da imagem para o seu back-end
        try {
            const response = await fetch("SUA_URL_DO_SERVIDOR_AQUI/oraculo-api", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl: info.srcUrl })
            });
            const data = await response.json();
            console.log("Dados recebidos da IA:", data);
        } catch (error) {
            console.error("Erro ao enviar imagem:", error);
        }
    }
});
