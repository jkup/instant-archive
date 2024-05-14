(() => {
  const url = window.location.href;

  fetch(`https://archive.ph/submit/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ url }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((text) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      // Extract the archive URL from the meta tags
      const metaTag = doc.querySelector('meta[property="og:url"]');
      if (!metaTag) {
        throw new Error("Archive URL meta tag not found");
      }

      const archiveUrl = metaTag.content;
      window.location.href = archiveUrl;
    })
    .catch((error) => console.error("Error archiving page:", error));
})();
