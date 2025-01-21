// Inicializa o EmailJS
emailjs.init("tHArcRaXc2OD5e6TV"); // Substitua pela sua chave pública

// Envio do formulário
document.getElementById('form-mudanca').addEventListener('submit', function(event) {
  event.preventDefault();

  const form = event.target;
  const formData = {
    nome: form.nome.value,
    celular: form.celular.value,
    endereco_atual: form.endereco_atual.value,
    endereco_destino: form.endereco_destino.value,
    cpf_cnpj: form.cpf_cnpj.value,
    tipo_mudanca: form.tipo_mudanca.value,
    data_mudanca: form.data_mudanca.value,
    volume: form.volume.value,
    servicos_adicionais: [
      form.montagem.checked ? 'Montagem/Desmontagem' : '',
      form.embalagem.checked ? 'Embalagem' : ''
    ].filter(Boolean).join(', '),
    observacoes: form.observacoes.value
  };

  emailjs.send('service_wxgzbzc', 'template_v7v7sbm', formData)
    .then(() => {
      document.getElementById('success-message').style.display = 'block';
      document.getElementById('error-message').style.display = 'none';
      form.reset();
    })
    .catch(() => {
      document.getElementById('success-message').style.display = 'none';
      document.getElementById('error-message').style.display = 'block';
    });
});

// Registrar o service worker para PWA
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js')
    .then(() => console.log('Service Worker registrado!'))
    .catch(err => console.error('Erro ao registrar o Service Worker:', err));
}