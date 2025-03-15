chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    // chrome.tabs.create({ url: "https://discord.gg/yKW8wWKCnS" });
  }

  if (details.reason === "update") {
    // chrome.tabs.create({ url: "https://discord.gg/yKW8wWKCnS" });
  }
});
