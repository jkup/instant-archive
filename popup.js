document.getElementById("archiveButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    chrome.scripting.executeScript({
      target: { tabId: activeTab.id },
      function: () => {
        const url = window.location.href;
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
            window.location.href = archiveUrl;
          })
          .catch((error) => console.error("Error archiving page:", error));
      },
    });
  });
});
