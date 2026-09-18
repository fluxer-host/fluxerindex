(function () {
  const wrap = document.querySelector(".card-search-wrap");
  const input = document.getElementById("card-search");
  const desc = document.getElementById("search-desc");
  const grid = document.querySelector(".card-grid");
  const empty = document.querySelector(".search-empty");
  if (!input || !grid) return;
  if (wrap) wrap.hidden = false;
  const cards = grid.querySelectorAll(".card");

  function filter() {
    const q = input.value.trim().toLowerCase();
    let n = 0;
    for (let i = 0; i < cards.length; i++) {
      let hay = cards[i].getAttribute("data-search") || "";
      if (desc && desc.checked) hay += " " + (cards[i].getAttribute("data-description") || "");
      const on = !q || hay.toLowerCase().indexOf(q) !== -1;
      cards[i].hidden = !on;
      if (on) n++;
    }
    grid.hidden = n === 0;
    if (empty) empty.hidden = n > 0;
  }

  input.addEventListener("input", filter);
  if (desc) desc.addEventListener("change", filter);
})();
