
const bRunningState = document.querySelector("#bRunningState");
console.log(bRunningState);

chrome.storage.local.get(["bRunning"]).then((result) => {
  console.log("Value is: " + result.bRunning);
  bRunningState.checked = result.bRunning;
});

bRunningState.addEventListener('click', () => {
  let state = bRunningState.checked;
  chrome.storage.local.set({bRunning: state}).then((value) => {
    console.log("value is set");
    console.log(state);
  });
})