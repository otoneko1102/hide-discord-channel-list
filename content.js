let isEnable = true;

function addToggleButton() {
  if (document.getElementById("sidebar-toggle-button")) return;

  const button = document.createElement("button");
  button.id = "sidebar-toggle-button";
  button.textContent = "☰";
  button.title = "チャンネルリストを非表示";

  setButtonTheme(button);

  button.style.width = "48px";
  button.style.height = "48px";
  button.style.fontSize = "35px";
  button.style.border = "none";
  button.style.borderRadius = "50%";
  button.style.cursor = "pointer";
  button.style.position = "fixed";
  button.style.top = "10px";
  button.style.left = "12px";
  button.style.zIndex = "9000";
  button.style.display = "flex";
  button.style.alignItems = "center";
  button.style.justifyContent = "center";
  button.style.lineHeight = "50px";
  button.style.transition = "all 0.3s ease";

  button.addEventListener("mouseover", () => {
    const { hoverBackground, hoverColor } = getHoverTheme();
    button.style.backgroundColor = hoverBackground;
    button.style.color = hoverColor;
    button.style.borderRadius = "18px";
  });

  button.addEventListener("mouseout", () => {
    setButtonTheme(button);
    button.style.borderRadius = "50%";
  });

  button.addEventListener("click", () => {
    toggleVisibility();
    button.title = isEnable ? "チャンネルリストを表示" : "チャンネルリストを非表示";
    isEnable = !isEnable;
  });

  const scrollerElement = document.querySelector('[class*="scroller_"]');
  if (scrollerElement) {
    scrollerElement.insertBefore(button, scrollerElement.firstChild);
  }

  const scrollElements = document.querySelectorAll('[class*="scroller_"]');
  scrollElements.forEach((element) => {
    element.style.marginTop = "65px";
  });

  observeHtmlClassChanges(button);
}

function toggleVisibility() {
  const sidebarElements = document.querySelectorAll('div[class*="sidebar_"]');
  sidebarElements.forEach((sidebar) => {
    const currentDisplay = getComputedStyle(sidebar).display;
    sidebar.style.display = currentDisplay === "none" ? "" : "none";
  });
}

function setButtonTheme(button) {
  const htmlElement = document.querySelector("html");
  if (htmlElement && htmlElement.className.includes("theme-light")) {
    // Lightテーマ用スタイル
    button.style.backgroundColor = "#f2f2f2";
    button.style.color = "#313338";
  } else {
    // Darkテーマ用スタイル
    button.style.backgroundColor = "#313338";
    button.style.color = "#ffffff";
  }
}

function getHoverTheme() {
  return {
    hoverBackground: "#5865f2",
    hoverColor: "#ffffff",
  };
}

function observeHtmlClassChanges(button) {
  const htmlElement = document.querySelector("html");

  if (!htmlElement) return;

  const observer = new MutationObserver(() => {
    setButtonTheme(button);
  });

  observer.observe(htmlElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
}

function monitorUnreadMentionsIndicator() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes) {
        mutation.addedNodes.forEach((node) => {
          if (
            node.nodeType == 1 &&
            node.classList &&
            [...node.classList].some((className) => className.includes("unreadMentionsIndicatorTop_"))
          ) {
            node.style.zIndex = "10000";
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function initialize() {
  const intervalId = setInterval(() => {
    const htmlElement = document.querySelector("html");

    if (htmlElement && htmlElement.classList.contains("show-redesigned-icons")) {
      addToggleButton();
      clearInterval(intervalId);
    }
  }, 1000);

  monitorUnreadMentionsIndicator();
}

initialize();
