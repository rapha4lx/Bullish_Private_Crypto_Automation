const barElementChecker = () => {
    const barElement = document.querySelector('.kyc-bar');
 
    console.log({ bar: barElement, exists: !barElement})
    if (!barElement) {
      sendFocusRequest(true);
   } else {
       location.reload();
    }
 }
 
 let bRunning = false;
 
 chrome.storage.local.get(["bRunning"]).then((result) => {
   console.log("Value is: " + result.bRunning);
   bRunning = result.bRunning;
   if (bRunning) {
     return sleep(5000); // Aguarda 5 segundos
   }
 }).then(() => {
   const hasUrlChanged = checkURL();
   console.log({ hasUrlChanged });
   
   if (!hasUrlChanged) {
     barElementChecker();
   }
 }).catch((error) => {
   console.error("Error:", error);
 });