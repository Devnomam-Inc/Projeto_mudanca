function buscarEndereco(cepId, ruaId, bairroId, cidadeId, estadoId, numeroId) {
    const cep = document.getElementById(cepId);
    const rua = document.getElementById(ruaId);
    const bairro = document.getElementById(bairroId);
    const cidade = document.getElementById(cidadeId);
    const estado = document.getElementById(estadoId);
    const numero = document.getElementById(numeroId);
  
    cep.addEventListener("input", () => {
      const valor = cep.value.replace(/\D/g, "");
      if (valor.length === 8) {
        fetch(`https://viacep.com.br/ws/${valor}/json/`)
          .then((res) => res.json())
          .then((data) => {
            if (data.erro) {
              alert("CEP não encontrado.");
              return;
            }
            rua.value = data.logradouro || "";
            bairro.value = data.bairro || "";
            cidade.value = data.localidade || "";
            estado.value = data.uf || "";
            numero.focus();
          })
          .catch(() => alert("Erro ao buscar o CEP."));
      }
    });
  }
  
  // EmailJS
  emailjs.init("tHArcRaXc2OD5e6TV");
  
  document.addEventListener("DOMContentLoaded", () => {
    buscarEndereco("cep_atual", "endereco_atual", "bairro_atual", "cidade_atual", "estado_atual", "numero_atual");
    buscarEndereco("cep_destino", "endereco_destino", "bairro_destino", "cidade_destino", "estado_destino", "numero_destino");
  
    // Preenche dropdown de volume
    const volumeSelect = document.getElementById("volume");
    for (let i = 1; i <= 60; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = `${i} m³`;
      volumeSelect.appendChild(option);
    }
  
    document.getElementById("form-mudanca").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const successMessage = document.getElementById("success-message");
      const errorMessage = document.getElementById("error-message");
  
      const formData = new FormData(this);
      const formObject = Object.fromEntries(formData.entries());

     // Captura múltiplos checkboxes de serviços adicionais
     const servicosCheckboxes = document.querySelectorAll('input[name="servicos_adicionais"]:checked');
     formObject.servicos_adicionais = Array.from(servicosCheckboxes).map(cb => cb.value).join(', ');

  
      emailjs
        .send("service_wxgzbzc", "template_wygyhjq", formObject)
        .then(() => {
          successMessage.style.display = "block";
          errorMessage.style.display = "none";
          this.reset();
        })
        .catch(() => {
          successMessage.style.display = "none";
          errorMessage.style.display = "block";
        });
    });
    document.getElementById("enviar-whatsapp").addEventListener("click", function () {
      const form = document.getElementById("form-mudanca");
      const formData = new FormData(form);
      const formObject = Object.fromEntries(formData.entries());
    
      // Captura múltiplos serviços adicionais
      const servicosCheckboxes = document.querySelectorAll('input[name="servicos_adicionais"]:checked');
      const servicosAdicionais = Array.from(servicosCheckboxes).map(cb => cb.value).join(', ');
    
      // Monte a mensagem
      const mensagem = `
    *Formulário de Mudança:*
    👤 Nome: ${formObject.nome}
    📱 Celular: ${formObject.celular}
    
    🏠 *Endereço Atual:*
    CEP: ${formObject.cep_atual}
    Endereço: ${formObject.endereco_atual}, Nº ${formObject.numero_atual}, ${formObject.complemento_atual || 'N/A'}
    Bairro: ${formObject.bairro_atual}
    Cidade/Estado: ${formObject.cidade_atual} - ${formObject.estado_atual}
    
    🚚 *Endereço de Destino:*
    CEP: ${formObject.cep_destino}
    Endereço: ${formObject.endereco_destino}, Nº ${formObject.numero_destino}, ${formObject.complemento_destino || 'N/A'}
    Bairro: ${formObject.bairro_destino}
    Cidade/Estado: ${formObject.cidade_destino} - ${formObject.estado_destino}
    
    📦 Tipo de Mudança: ${formObject.tipo_mudanca}
    📏 Volume: ${formObject.volume} m³
    🛠 Serviços Adicionais: ${servicosAdicionais || 'Nenhum'}
    🗓 Data da Mudança: ${formObject.data_mudanca}
    
    📝 Observações:
    ${formObject.observacoes || 'Nenhuma'}
      `;
    
      // Número do WhatsApp com DDI e DDD (exemplo: 5511999999999)
      const numeroWhatsapp = "5511981035615";
      const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagem)}`;
    
      window.open(linkWhatsapp, "_blank");
    });
    
  });
