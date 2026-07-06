
function generarTicket() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const details = document.getElementById('details').value;

  const services = document.querySelectorAll('.serviceOpt:checked');
  if (services.length === 0) {
    alert("Selecciona al menos un servicio");
    return;
  }

  let total = 0;
  let lista = '';

  services.forEach(s => {
    const [nombre, precio] = s.value.split('|');
    total += Number(precio);
    lista += `- ${nombre} ($${precio})\n`;
  });

  const ticket =
`SOLICITUD DE SERVICIO — BIO-US / Universe City

Cliente: ${name}
Email: ${email}
Teléfono: ${phone}

Servicios solicitados:
${lista}
Total estimado: $${total} MXN

Comentarios:
${details || 'Ninguno'}

Condiciones:
• Software original
• Sin KMS ni cracks
• Trabajo ético y documentado

Fecha: ${new Date().toLocaleString()}
`;

  document.getElementById('ticketText').textContent = ticket;
  document.getElementById('ticket').style.display = 'block';

  // Gmail
  const subject = encodeURIComponent("Solicitud de servicio técnico");
  const body = encodeURIComponent(ticket);
  document.getElementById('gmailLink').href =
    `mailto:TUEMAIL@gmail.com?subject=${subject}&body=${body}`;

  // WhatsApp
  document.getElementById('waLink').href =
    `https://wa.me/52TUNUMERO?text=${body}`;
}

function generarPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  const text = document.getElementById('ticketText').textContent;

  pdf.setFont("courier");
  pdf.setFontSize(10);
  pdf.text(text, 10, 10, { maxWidth: 190 });

  pdf.save("solicitud_servicio_BIOUS.pdf");
}


