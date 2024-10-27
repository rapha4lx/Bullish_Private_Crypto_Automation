const sleep = ms => new Promise(r => setTimeout(r, ms));

function sendFocusRequest(shouldFocus) {
  chrome.runtime.sendMessage({ focusTab: shouldFocus }, (response) => {
      console.log(response.status);
  });
}

function getAllTabs() {
  chrome.runtime.sendMessage({ action: 'getAllTabs' }, (response) => {
      if (response.tabs) {
          console.log('All tabs:', response.tabs);
          // Aqui você pode manipular a lista de abas
          // Por exemplo, criar um menu para alternar entre as abas
          response.tabs.forEach(tab => {
              console.log(`Tab Title: ${tab.title}, Tab ID: ${tab.id}`);
              // Você pode criar elementos de UI para alternar entre as abas
          });
      }
  });
}

const checkURL = () => {
  // Verifica se a URL atual é diferente da URL desejada
  if (window.location.href !== "https://www.sandbox.game/en/events/alpha-season-4/") {
    // Redireciona para a URL desejada
    window.location.href = "https://www.sandbox.game/en/events/alpha-season-4/";
    return 1;
  }
  return 0;
};

class ExtensionService {

  static getLocal = (key) => {
      return new Promise((resolve, reject) => {
          chrome.storage.local.get([key], (result) => {
              if (chrome.runtime.lastError)
                  reject(chrome.runtime.lastError);

              const researches = result ?? null;
              resolve(researches);
          });
      });
  }

  static setLocal = async (key, value) => {
      return new Promise((resolve, reject) => {
          chrome.storage.local.set({ [key]: value }, () => {           
              if (chrome.runtime.lastError)
                  reject(chrome.runtime.lastError);
              resolve(value);
          });
      });
  }

  // static clearPages = () => {
  //     return toPromise((resolve, reject) => {
  //         chrome.storage.local.remove([PAGES_KEY], () => {
  //             if (chrome.runtime.lastError)
  //                 reject(chrome.runtime.lastError);
  //             resolve();
  //         });
  //     });
  // }
}