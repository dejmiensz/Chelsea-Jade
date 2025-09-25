
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if(id.length>1){
      const el = document.querySelector(id);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth'});
      }
    }
  });
});

// Multi-step form logic
const form = document.getElementById('msform');
if(form){
  const fieldsets = Array.from(form.querySelectorAll('fieldset'));
  const progress = Array.from(document.querySelectorAll('#progressbar li'));
  let current = 0;

  const show = (i)=>{
    fieldsets.forEach((fs,idx)=> fs.classList.toggle('active', idx===i));
    progress.forEach((li,idx)=> li.classList.toggle('active', idx<=i));
    if(i===2){
      const val = id => (document.getElementById(id)?.value || '').trim();
      const escapeHtml = (str)=> str.replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
      document.getElementById('review').innerHTML = `
        <strong>Review your enquiry</strong><br>
        Name: ${escapeHtml(val('f_name'))}<br>
        Company: ${escapeHtml(val('f_company')) || '—'}<br>
        Email: ${escapeHtml(val('f_email'))}<br>
        Industry: ${escapeHtml(val('f_industry')) || '—'}<br>
        Service: ${escapeHtml(val('f_service'))}<br>
        Message: ${escapeHtml(val('f_message')) || '—'}
      `;
    }
  };
  form.addEventListener('click', (e)=>{
    if(e.target.classList.contains('next')){
      e.preventDefault();
      const val = id => (document.getElementById(id)?.value || '').trim();
      if(current===0 && (!val('f_name') || !val('f_email'))) return alert('Please enter your name and email.');
      current = Math.min(current+1, fieldsets.length-1);
      show(current);
    }
    if(e.target.classList.contains('prev')){
      e.preventDefault();
      current = Math.max(current-1, 0);
      show(current);
    }
  });
  document.getElementById('submitBtn').addEventListener('click', ()=>{
    const result = document.getElementById('result');
    result.textContent = 'Sending...';
    setTimeout(()=>{
      result.textContent = 'Thanks! Your enquiry has been received. We will reply within one business day.';
      form.reset();
      current = 0;
      show(current);
    }, 900);
  });
  show(current);
}
