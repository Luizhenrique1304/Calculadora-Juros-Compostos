const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 100; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 3,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";

  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animateParticles);
}
animateParticles();

let chart;

function calculate() {
  const principal = parseFloat(document.getElementById("principal").value) || 0;
  const contribution = parseFloat(document.getElementById("contribution").value) || 0;
  const rate = parseFloat(document.getElementById("rate").value) / 100 || 0;
  const time = parseInt(document.getElementById("time").value) || 0;

  if (time <= 0) {
    alert("Preencha o tempo corretamente!");
    return;
  }

  let values = [];
  let labels = [];
  let total = principal;

  for (let i = 1; i <= time; i++) {
    total = total * (1 + rate) + contribution;
    values.push(total.toFixed(2));
    labels.push("Mês " + i);
  }

  document.getElementById("result").innerText = 
    `Total acumulado após ${time} meses: R$ ${total.toFixed(2)}`;

  if (chart) chart.destroy(); 
  const ctxChart = document.getElementById('chart').getContext('2d');
  chart = new Chart(ctxChart, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Evolução do Patrimônio (R$)',
        data: values,
        borderColor: '#ffb703',
        backgroundColor: 'rgba(255,183,3,0.3)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true }
      }
    }
  });
}
