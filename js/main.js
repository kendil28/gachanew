// ===== NAVIGATION =====
function setActive(el, page) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
  console.log('Navigate to:', page);
}

function navigate(page) {
  console.log('Navigate to:', page);
}

// Character uses animated ash.webp — no JS animation needed
