document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-links a');

  function setActive() {
    const currentPath = location.pathname.split('/').pop() || 'index.html';
    const currentHash = location.hash;

    links.forEach(a => {
      try {
        const url = new URL(a.href, location.origin);
        const linkPath = url.pathname.split('/').pop() || 'index.html';
        const linkHash = url.hash;

        if (linkPath === currentPath) {
          if (linkHash) {
            if (linkHash === currentHash) {
              a.classList.add('active');
            } else {
              a.classList.remove('active');
            }
          } else {
            if (!currentHash) {
              a.classList.add('active');
            } else {
              a.classList.remove('active');
            }
          }
        } else {
          a.classList.remove('active');
        }
      } catch (e) {
        // ignore URL parse errors
      }
    });
  }

  setActive();
  window.addEventListener('hashchange', setActive);
  window.addEventListener('popstate', setActive);

  links.forEach(a => {
    a.addEventListener('click', () => setTimeout(setActive, 10));
  });
});

// Lightbox (view-only)
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.createElement('div');
  modal.id = 'lightbox-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.8);display:none;align-items:center;justify-content:center;z-index:2000;';
  modal.innerHTML = `<div style="max-width:90%;max-height:90%;position:relative">
      <img id="lightbox-img" style="max-width:100%;max-height:100%;display:block;border-radius:8px" src="" alt="">
    </div>`;
  document.body.appendChild(modal);

  const lbImg = modal.querySelector('#lightbox-img');

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  document.querySelectorAll('.lightbox-img').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      modal.style.display = 'flex';
    });
  });
});
