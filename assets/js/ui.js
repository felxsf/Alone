function qs(s, r=document){return r.querySelector(s)}
function qsa(s, r=document){return Array.from(r.querySelectorAll(s))}

/* --- Modal System --- */
function openModal(id){
  const el=qs(`#modal-${id}`)
  if(!el)return
  el.setAttribute('aria-hidden','false')
  el.classList.add('is-open')
  const focusables=qsa('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])', el)
  const first=focusables[0]
  const last=focusables[focusables.length-1]
  el.dataset.first=first?first.outerHTML:''
  el.dataset.last=last?last.outerHTML:''
  ;(qs('.modal__content', el)||el).focus()
  
  function onKey(e){
    if(e.key==='Escape'){closeModal(el)}
    if(e.key==='Tab'){
      const active=document.activeElement
      if(e.shiftKey&&active===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&active===last){e.preventDefault();first.focus()}
    }
  }
  el.addEventListener('keydown', onKey)
  el.dataset.keyHandler='true'
}

function closeModal(el){
  if(!el)return
  el.setAttribute('aria-hidden','true')
  el.classList.remove('is-open')
}

qsa('[data-open-modal]').forEach(b=>{
  b.addEventListener('click',()=>openModal(b.getAttribute('data-open-modal')))
})

qsa('[data-close-modal]').forEach(b=>{
  b.addEventListener('click',()=>{
    const m=b.closest('.modal')
    closeModal(m)
  })
})

document.addEventListener('click',e=>{
  const t=e.target
  if(t.matches('.modal__overlay')){closeModal(t.closest('.modal'))}
})

/* --- Form Validation --- */
function setValid(el, valid, message){
  if(valid){
    el.classList.remove('is-invalid')
    el.classList.add('is-valid')
    el.setAttribute('aria-invalid','false')
    const err=el.parentElement.querySelector('.error-text')
    if(err)err.remove()
  }else{
    el.classList.remove('is-valid')
    el.classList.add('is-invalid')
    el.setAttribute('aria-invalid','true')
    let err=el.parentElement.querySelector('.error-text')
    if(!err){
      err=document.createElement('p')
      err.className='error-text'
      el.parentElement.appendChild(err)
    }
    err.textContent=message||'Campo inválido'
  }
}

function validateEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

const form=qs('#demo-form')
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault()
    const name=qs('#name', form)
    const email=qs('#email', form)
    const country=qs('#country', form)
    let ok=true
    if(!name.value.trim()){setValid(name,false,'El nombre es obligatorio');ok=false}else setValid(name,true)
    if(!validateEmail(email.value.trim())){setValid(email,false,'Formato de email inválido');ok=false}else setValid(email,true)
    if(!country.value){setValid(country,false,'Selecciona un país');ok=false}else setValid(country,true)
    if(ok){
      showToast('Formulario enviado con éxito', 'success')
      form.reset()
      qsa('.is-valid', form).forEach(el=>el.classList.remove('is-valid'))
    }
  })
  
  const reset=qs('#reset-form')
  if(reset){
    reset.addEventListener('click',()=>{
      form.reset()
      qsa('.is-valid, .is-invalid', form).forEach(el=>{
        el.classList.remove('is-valid')
        el.classList.remove('is-invalid')
        el.removeAttribute('aria-invalid')
      })
      qsa('.error-text', form).forEach(el=>el.remove())
    })
  }
}

const modalNew=qs('#modal-form')
if(modalNew){
  const mf=qs('#modal-form-element', modalNew)
  mf.addEventListener('submit',e=>{
    e.preventDefault()
    const title=qs('#title', mf)
    const type=qs('#type', mf)
    let ok=true
    if(!title.value.trim()){setValid(title,false,'El título es obligatorio');ok=false}else setValid(title,true)
    if(!type.value){setValid(type,false,'Selecciona un tipo');ok=false}else setValid(type,true)
    if(ok){
      closeModal(modalNew)
      mf.reset()
      qsa('.is-valid', mf).forEach(el=>el.classList.remove('is-valid'))
      showToast('Elemento guardado correctamente', 'success')
    }
  })
}

/* --- Tabs System --- */
function initTabs() {
  const tabLists = qsa('[role="tablist"]');
  tabLists.forEach(list => {
    const tabs = qsa('[role="tab"]', list);
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        const targetId = tab.getAttribute('aria-controls');
        const parent = list.parentElement; // Assuming container wraps list and panels
        
        // Deactivate all tabs in this list
        tabs.forEach(t => {
          t.setAttribute('aria-selected', 'false');
          t.classList.remove('active');
          t.setAttribute('tabindex', '-1');
        });

        // Hide all panels controlled by this list
        tabs.forEach(t => {
          const panelId = t.getAttribute('aria-controls');
          const panel = document.getElementById(panelId);
          if (panel) {
            panel.hidden = true;
            panel.classList.remove('active');
          }
        });

        // Activate clicked tab
        tab.setAttribute('aria-selected', 'true');
        tab.classList.add('active');
        tab.removeAttribute('tabindex');

        // Show target panel
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.hidden = false;
          targetPanel.classList.add('active');
        }
      });
      
      // Keyboard navigation
      tab.addEventListener('keydown', (e) => {
        const idx = tabs.indexOf(tab);
        let nextIdx = null;
        
        if (e.key === 'ArrowRight') {
          nextIdx = (idx + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft') {
          nextIdx = (idx - 1 + tabs.length) % tabs.length;
        }
        
        if (nextIdx !== null) {
          e.preventDefault();
          tabs[nextIdx].focus();
          tabs[nextIdx].click();
        }
      });
    });
  });
}

/* --- Accordion System --- */
function initAccordions() {
  const accordions = qsa('.accordion');
  accordions.forEach(acc => {
    const headers = qsa('.accordion-header', acc);
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const expanded = header.getAttribute('aria-expanded') === 'true';
        const controls = header.getAttribute('aria-controls');
        const panel = document.getElementById(controls);
        
        // Toggle current
        header.setAttribute('aria-expanded', !expanded);
        if (panel) {
          panel.hidden = expanded; // If was expanded, now hidden
          panel.style.display = expanded ? 'none' : 'block';
        }
        
        // Optional: Close others (accordion behavior vs collapsible)
        // For strictly one open at a time:
        /*
        headers.forEach(h => {
          if (h !== header) {
            h.setAttribute('aria-expanded', 'false');
            const p = document.getElementById(h.getAttribute('aria-controls'));
            if(p) { p.hidden = true; p.style.display = 'none'; }
          }
        });
        */
      });
    });
  });
}

/* --- Toast System --- */
function showToast(message, type = 'info') {
  let container = qs('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span>${message}</span>
    <button class="toast-close" aria-label="Cerrar">&times;</button>
  `;
  
  container.appendChild(toast);
  
  // Animation in
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });
  
  // Close logic
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  });
  
  // Auto dismiss
  setTimeout(() => {
    if (document.body.contains(toast)) {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }
  }, 5000);
}

// Expose globally for demo usage
window.showToast = showToast;

// Demo buttons for toasts
qsa('[data-toast]').forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.getAttribute('data-toast');
    const msg = btn.getAttribute('data-message') || 'Notificación del sistema';
    showToast(msg, type);
  });
});

/* --- Switches --- */
/* Native checkboxes used in HTML, no JS required for toggle state */

/* --- ScrollSpy & Navigation --- */
function initScrollSpy() {
  const sections = qsa('section[id]');
  const navLinks = qsa('.nav-link');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: "-20% 0px -50% 0px" });
  
  sections.forEach(s => observer.observe(s));
}

function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'Volver arriba');
  document.body.appendChild(btn);
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* --- Header Scroll Effect --- */
function initHeaderScroll() {
  const header = qs('.ds-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --- Typing Effect --- */
function initTypingEffect() {
  const elements = qsa('[data-typing]');
  elements.forEach(el => {
    const text = el.getAttribute('data-typing') || el.textContent;
    el.textContent = '';
    let i = 0;
    
    function type() {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
        setTimeout(type, 50 + Math.random() * 50);
      }
    }
    
    // Start when visible
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          type();
          observer.unobserve(el);
        }
      });
    });
    
    observer.observe(el);
  });
}

/* --- Interactive Terminal --- */
function initTerminal() {
  const input = qs('#term-input');
  const output = qs('#term-output');
  if (!input || !output) return;

  const commands = {
    'help': 'Comandos disponibles: help, about, status, clear, date',
    'about': 'Alone UI System v1.0. Desarrollado para interfaces futuristas.',
    'status': 'Todos los sistemas operativos. Integridad del casco: 100%.',
    'date': () => new Date().toLocaleString(),
    'clear': () => { output.innerHTML = ''; return ''; }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim().toLowerCase();
      if (!cmd) return;

      // Print command
      output.innerHTML += `<div class="term-line"><span class="term-prompt">></span> ${input.value}</div>`;

      // Process command
      if (commands[cmd]) {
        const response = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
        if (response) {
          output.innerHTML += `<div class="term-response">${response}</div>`;
        }
      } else {
        output.innerHTML += `<div class="term-error">Comando no reconocido: ${cmd}</div>`;
      }

      input.value = '';
      output.scrollTop = output.scrollHeight;
    }
  });
}

/* --- Initialization --- */
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initAccordions();
  // initSwitches(); // Native handling
  initScrollSpy();
  initBackToTop();
  initHeaderScroll();
  initTypingEffect();
  // initSystemWidget(); // Removed
  initTerminal();
  
  // Initial state for tabs (show first)
  qsa('[role="tablist"]').forEach(list => {
    const firstTab = list.querySelector('[role="tab"]');
    if (firstTab && !list.querySelector('[aria-selected="true"]')) {
      firstTab.click();
    }
  });
});
