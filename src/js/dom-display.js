export const domDisplay = (function () {
  initialRenderContent();

  function initialRenderContent() {
    const createDisplayTitle = document.createElement("h1");
    const createDisplayDescription = document.createElement("h3");

    createDisplayTitle.classList.add("display-title");
    createDisplayDescription.classList.add("display-description");

    createDisplayDescription.textContent = `Please Select The Sidebar Menu On The Left`;
    createDisplayTitle.textContent = `What To Do Today ?`;

    const contentEl = document.querySelector(".main .content");
    contentEl.append(createDisplayTitle, createDisplayDescription);
  }

  function renderMainContent(content) {
    const currentDisplayTitle = document.querySelector(".display-title");
    const currentDisplayDescription = document.querySelector(
      ".display-description"
    );

    console.log(currentDisplayTitle, currentDisplayDescription);

    switch (content) {
      case "all":
        currentDisplayTitle.innerHTML = `<i class="fa-solid fa-cubes-stacked"></i>All Tasks`;
        currentDisplayDescription.textContent = "No Current Task";
        break;

      case "today":
        currentDisplayTitle.innerHTML = `<i class="fa-solid fa-calendar-day"></i>Today`;
        currentDisplayDescription.textContent = "No Current Task";
        break;

      case "week":
        currentDisplayTitle.innerHTML = `<i class="fa-solid fa-calendar-week"></i>Next 7 Days`;
        currentDisplayDescription.textContent = "No Current Task";
        break;

      case "important":
        currentDisplayTitle.innerHTML = `<i class="fa-solid fa-star"></i>Important`;
        currentDisplayDescription.textContent = "No Current Task";
        break;

      case "completed":
        currentDisplayTitle.innerHTML = `<i class="fa-solid fa-square-check"></i>Completed`;
        currentDisplayDescription.textContent = "No Current Task";
        break;

      default:
        break;
    }

    console.log(content);
  }

  function renderSidebarProject() {}

  function renderModal() {
    console.log("modal rendered");
  }

  return { renderSidebarProject, renderMainContent, renderModal };
})();
