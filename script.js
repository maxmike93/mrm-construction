const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const counterValue = document.querySelector(".visitor-counter-value");

async function loadDailyVisitorCounter() {
  if (!counterValue) {
    return;
  }

  counterValue.textContent = "...";

  const chicagoDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());

  const namespace = "mrm-construction-site";
  const key = `daily-visits-${chicagoDate}`;
  const url = `https://api.countapi.xyz/hit/${namespace}/${key}`;

  try {
    const response = await fetch(url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Counter request failed: ${response.status}`);
    }

    const data = await response.json();
    counterValue.textContent = String(data.value ?? 0);
  } catch (error) {
    counterValue.textContent = "N/A";
  }
}

loadDailyVisitorCounter();
