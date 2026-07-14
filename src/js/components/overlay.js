const focusables = root => [...root.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')];

export const createOverlay = ({panel,openers,closer,backdrop,onOpen,onClose}) => {
  let lastFocus;
  let open=false;
  const setOpen = value => {
    if (open===value) return;
    open=value;
    if (value) {
      lastFocus=document.activeElement; panel.hidden=false; backdrop.hidden=false; panel.setAttribute('aria-hidden','false'); document.documentElement.classList.add('is-locked'); onOpen?.();
      dispatchEvent(new CustomEvent('mm:overlay',{detail:{open:true}}));
      requestAnimationFrame(()=>focusables(panel)[0]?.focus());
    } else {
      panel.setAttribute('aria-hidden','true'); document.documentElement.classList.remove('is-locked'); onClose?.();
      dispatchEvent(new CustomEvent('mm:overlay',{detail:{open:false}}));
      setTimeout(()=>{panel.hidden=true;backdrop.hidden=true;lastFocus?.focus();},450);
    }
  };
  openers.forEach(button=>button.addEventListener('click',()=>setOpen(true)));
  closer?.addEventListener('click',()=>setOpen(false));
  backdrop.addEventListener('click',()=>setOpen(false));
  panel.addEventListener('keydown',event=>{
    if (event.key==='Escape') setOpen(false);
    if (event.key!=='Tab') return;
    const nodes=focusables(panel); const first=nodes[0]; const last=nodes.at(-1);
    if (event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
    if (!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
  });
  return {open:()=>setOpen(true),close:()=>setOpen(false),isOpen:()=>open};
};
