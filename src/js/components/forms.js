const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validateField=field=>{
  let message='';
  if(field.required && field.type==='checkbox' && !field.checked) message='Please confirm before continuing.';
  else if(field.required && !field.value.trim()) message='This field needs an answer.';
  else if(field.type==='email' && field.value && !emailPattern.test(field.value)) message='Enter a valid email address.';
  else if(field.type==='url' && field.value){try{new URL(field.value);}catch{message='Include a full URL such as https://…';}}
  const error=field.closest('label')?.querySelector('.field-error'); if(error)error.textContent=message;field.setAttribute('aria-invalid',String(Boolean(message)));return !message;
};

export const initForms = () => {
  document.querySelectorAll('.big-form').forEach(form=>{
    form.addEventListener('submit',async event=>{event.preventDefault();if(form.querySelector('.honeypot input')?.value)return;const fields=[...form.querySelectorAll('input:not([type="hidden"]),select,textarea')].filter(f=>!f.closest('.honeypot'));const valid=fields.map(validateField).every(Boolean);if(!valid){form.querySelector('[aria-invalid="true"]')?.focus();return;}const button=form.querySelector('[type="submit"]');const status=form.querySelector('.form-status');button.disabled=true;button.dataset.label=button.textContent;button.textContent='Sending…';await new Promise(resolve=>setTimeout(resolve,800));status.textContent='Received. A real human will get back to you soon.';form.reset();button.textContent='Sent ✓';setTimeout(()=>{button.textContent=button.dataset.label;button.disabled=false;},1800);});
    form.querySelectorAll('input,select,textarea').forEach(field=>field.addEventListener('blur',()=>validateField(field)));
  });
  document.querySelectorAll('.newsletter').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault();const input=form.querySelector('input');const status=form.querySelector('[role="status"]');if(!emailPattern.test(input.value)){status.textContent='That email is missing a useful part.';input.setAttribute('aria-invalid','true');return;}input.setAttribute('aria-invalid','false');status.textContent='Welcome in. Check your inbox, not your dignity.';form.reset();}));
};
