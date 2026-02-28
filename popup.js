const actionBtn = document.getElementById("actionBtn");
const resultBox = document.getElementById("result");
const siteNameEl = document.getElementById("siteName");

const defaultText = "Extract & Copy";

actionBtn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });

  if (!result) return;

  siteNameEl.textContent = result.site;

  if (!result.valid) {
    resultBox.value = "You must access a specific post.";
    return;
  }

  resultBox.value = result.tags || "No tags available.";

  if (result.tags) {
    await navigator.clipboard.writeText(result.tags);

    actionBtn.textContent = "Copied!";
    actionBtn.disabled = true;

    setTimeout(() => {
      actionBtn.textContent = "Extract & Copy";
      actionBtn.disabled = false;
    }, 1500);
  }
});
