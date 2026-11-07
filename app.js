const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
  nav.classList.toggle('is-open', !open);
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
  });
});

const audienceCopy = {
  talent: {
    panel: 'tab-talent',
    text: 'Build a career with intention—from the roles you take to the relationships that move your story forward.',
  },
  athletes: {
    panel: 'tab-athletes',
    text: 'Bring your voice, values, and ambitions beyond competition through representation and thoughtful NIL opportunities.',
  },
  brands: {
    panel: 'tab-brands',
    text: 'Connect with talent and athletes in ways that feel credible, considered, and worth remembering.',
  },
};
const tabs = [...document.querySelectorAll('.audience-tab')];
const panel = document.querySelector('.audience-panel');
const panelText = panel.querySelector('p');

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => {
      item.classList.remove('is-active');
      item.setAttribute('aria-selected', 'false');
      item.setAttribute('tabindex', '-1');
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    panel.setAttribute('aria-labelledby', tab.id);
    panelText.textContent = audienceCopy[tab.dataset.audience].text;
  });
  tab.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const step = event.key === 'ArrowRight' ? 1 : -1;
    tabs[(index + step + tabs.length) % tabs.length].focus();
    tabs[(index + step + tabs.length) % tabs.length].click();
  });
});

const form = document.querySelector('#inquiry-form');
const success = document.querySelector('#form-success');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#inquiry-name').value.trim();
  success.querySelector('strong').textContent = `Your introduction is ready${name ? `, ${name.split(/\s+/)[0]}` : ''}.`;
  form.hidden = true;
  success.hidden = false;
});
document.querySelector('#reset-form').addEventListener('click', () => {
  form.reset();
  form.hidden = false;
  success.hidden = true;
});
document.querySelector('#year').textContent = new Date().getFullYear();
