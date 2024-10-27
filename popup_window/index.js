
const bRunningState = document.querySelector("#bRunningState");

window.onload = async function (){
  let bRunning_local = await ExtensionService.getLocal('bRunning')
  if (bRunning_local !== null)
    bRunningState.checked = bRunning_local.bRunning
}

bRunningState.addEventListener('click', async () => {
  let state = bRunningState.checked;
  await ExtensionService.setLocal('bRunning', state)
})