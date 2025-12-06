async function loadHeader() {
  const headerContainer = document.createElement("div");
  document.body.prepend(headerContainer);

  const res = await fetch("components/header.html");
  const html = await res.text();
  headerContainer.innerHTML = html;
}

loadHeader();
