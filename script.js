const display = document.getElementById('display');
const grid = document.querySelector('.grid');

const isOperator = (ch) => ['+', '-', '*', '/'].includes(ch);

function append(value) {
  const last = display.value.slice(-1);
  if (isOperator(last) && isOperator(value)) {
    display.value = display.value.slice(0, -1) + value; 
    return;
  }
  display.value += value;
}
function clearAll() { display.value = ''; }
function deleteLast() { display.value = display.value.slice(0, -1); }

function isSafeExpression(str) {
  return /^[0-9+\-*/.() ]*$/.test(str);
}

function calculate() {
  const expr = display.value.trim();
  if (!expr) return;
  if (!isSafeExpression(expr)) { display.value = 'Error'; return; }

  try {
    const result = eval(expr); 
    if (!isFinite(result) || isNaN(result)) display.value = 'Error';
    else display.value = String(result);
  } catch {
    display.value = 'Error';
  }
}


grid.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const action = btn.getAttribute('data-action');
  const value = btn.getAttribute('data-value');

  if (action === 'clear') return clearAll();
  if (action === 'delete') return deleteLast();
  if (action === 'equals') return calculate();
  if (value) return append(value);
});


document.addEventListener('keydown', (e) => {
  const { key } = e;
  if (/[0-9]/.test(key)) append(key);
  else if (['+', '-', '*', '/', '(', ')', '.'].includes(key)) append(key);
  else if (key === 'Enter' || key === '=') calculate();
  else if (key === 'Backspace') deleteLast();
  else if (key === 'Escape') clearAll();
});


const toggleBtn = document.getElementById('toggle-theme');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});
