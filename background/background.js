
// Service worker (background.js)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // Verifica se a ação é 'getAllTabs'
    if (message.action === 'getAllTabs') {
        // Recupera todas as abas abertas
        chrome.tabs.query({lastFocusedWindow: true}, (tabs) => {
            // Envia a lista de abas de volta
            sendResponse({ tabs: tabs });
        });
        // Retorna true para indicar que a resposta será enviada de forma assíncrona
        return true; // Isso é importante para manter a conexão aberta
    }

    // Verifica se a mensagem é para focar uma aba
    if (message.focusTab === true && sender.tab) {
        const tabId = sender.tab.id;
        const windowId = sender.tab.windowId;

        // Foca a aba que enviou a mensagem
        chrome.windows.update(windowId, { focused: true }, () => {
            chrome.tabs.update(tabId, { active: true });
            // A resposta pode ser enviada aqui após focar a aba
            sendResponse({ status: 'Tab focused' });
        });
        return true; // Mantém a conexão aberta até que o callback seja chamado
    } else {
        // Se não houver ação a ser tomada
        sendResponse({ status: 'No action taken' });
    }

    return true; // Isso deve estar no final do listener para todas as mensagens
});
