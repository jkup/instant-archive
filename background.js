chrome.action.onClicked.addListener((tab) => {
  const url = tab.url;
  fetch(`https://archive.ph/submit/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ url }),
  })
    .then((response) => response.text())
    .then((text) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");
      const archiveUrl = doc.querySelector(
        'a[href^="https://archive.ph/"]'
      ).href;
      chrome.tabs.update(tab.id, { url: archiveUrl });
    })
    .catch((error) => console.error("Error archiving page:", error));
});
