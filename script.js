// Função para buscar o endereço através do CEP
function buscarEndereco(cepInputId, enderecoId, bairroId, cidadeId, estadoId, numeroId) {
  const cepInput = document.getElementById(cepInputId);
  const enderecoInput = document.getElementById(enderecoId);
  const bairroInput = document.getElementById(bairroId);
  const cidadeInput = document.getElementById(cidadeId);
  const estadoSelect = document.getElementById(estadoId);
  const numeroInput = document.getElementById(numeroId);

  cepInput.addEventListener("input", function (event) {
    const cep = event.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => {
          if (!response.ok) throw new Error("Erro ao buscar o CEP");
          return response.json();
        })
        .then((data) => {
          if (data.erro) {
            alert("CEP não encontrado!");
          } else {
            // Preenche os campos com os dados retornados
            enderecoInput.value = data.logradouro || "";
            bairroInput.value = data.bairro || "";
            cidadeInput.value = data.localidade || "";
            estadoSelect.value = data.uf || "";

            // Foca automaticamente no campo número
            numeroInput.focus();
          }
        })
        .catch(() => alert("Erro ao buscar o CEP. Verifique sua conexão e tente novamente."));
    }
  });
}

// Inicializa os eventos de busca de endereço para ambos os campos de CEP
document.addEventListener("DOMContentLoaded", function () {
  buscarEndereco(
    "cep_atual",
    "endereco_atual",
    "bairro_atual",
    "cidade_atual",
    "estado_atual",
    "numero_atual"
  );
  buscarEndereco(
    "cep_destino",
    "endereco_destino",
    "bairro_destino",
    "cidade_destino",
    "estado_destino",
    "numero_destino"
  );
});

// Função para exibir mensagens de sucesso ou erro
document.getElementById("form-mudanca").addEventListener("submit", function (event) {
  event.preventDefault(); // Previne o envio padrão do formulário

  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  // Validação simples dos campos obrigatórios
  const nome = document.getElementById("nome").value.trim();
  const celular = document.getElementById("celular").value.trim();

  if (nome && celular) {
    successMessage.style.display = "block";
    errorMessage.style.display = "none";
  } else {
    successMessage.style.display = "none";
    errorMessage.style.display = "block";
  }
});

// Inicializa o EmailJS
emailjs.init("tHArcRaXc2OD5e6TV");

// Adiciona evento para envio do formulário via EmailJS
document.getElementById("form-mudanca").addEventListener("submit", function (event) {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  // Obtém os dados do formulário
  const formData = new FormData(this);
  const formObject = Object.fromEntries(formData.entries());

  // Configura o envio do email
  emailjs
    .send("service_wxgzbzc", "template_wygyhjq", formObject)
    .then(
      function (response) {
        alert("Obrigado por entrar em contato! Retornaremos em breve.");
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        alert("Erro ao enviar mensagem. Tente novamente.");
        console.error("FAILED...", error);
      }
    );
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(() => {
    console.log('Service Worker registrado com sucesso.');
  }).catch((error) => {
    console.error('Falha ao registrar o Service Worker:', error);
  });
}

const cacheName = 'pwa-cache-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(filesToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});