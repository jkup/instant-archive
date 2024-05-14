chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
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
          const listUrlElement = doc.querySelector(
            'a[href^="https://archive.ph/https://"]'
          );

          if (!listUrlElement) {
            throw new Error("List URL element not found");
          }

          const listUrl = listUrlElement.href;
          console.log("List URL:", listUrl); // Log the list URL

          // Fetch the list page to get the newest archived URL
          fetch(listUrl)
            .then((response) => response.text())
            .then((listText) => {
              console.log("List page text:", listText); // Log the list page text
              const listDoc = parser.parseFromString(listText, "text/html");
              const newestUrlElement = listDoc.querySelector(
                'a[href^="https://archive.ph/"]'
              );

              if (!newestUrlElement) {
                throw new Error("Newest URL element not found");
              }

              const newestUrl = newestUrlElement.href;
              console.log("Newest archived URL:", newestUrl); // Log the newest archived URL
              window.location.href = newestUrl;
            });
        })
        .catch((error) => console.error("Error archiving page:", error));
    },
  });
});
