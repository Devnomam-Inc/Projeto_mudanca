<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulário de Mudança</title>
  <link rel="stylesheet" href="styles.css">
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#007BFF">
</head>
<body>
  <div class="form-container">
    <h1>Formulário de Mudança</h1>
    <form id="form-mudanca">
      <fieldset>
        <legend>Dados Pessoais</legend>
        <label for="nome">Nome Completo:</label>
        <input type="text" id="nome" name="nome" required>

        <label for="celular">Celular:</label>
        <input type="tel" id="celular" name="celular" required placeholder="(XX) XXXXX-XXXX">

        <label for="endereco_atual">Endereço Atual (com CEP):</label>
        <input type="text" id="endereco_atual" name="endereco_atual" required>

        <label for="endereco_destino">Endereço de Destino (com CEP):</label>
        <input type="text" id="endereco_destino" name="endereco_destino" required>

        <label for="cpf_cnpj">CPF:</label>
        <input type="text" id="cpf_cnpj" name="cpf_cnpj" required placeholder="XXX.XXX.XXX-XX">
      </fieldset>

      <fieldset>
        <legend>Detalhes da Mudança</legend>
        <label for="tipo_mudanca">Tipo de Mudança:</label>
        <select id="tipo_mudanca" name="tipo_mudanca" required>
          <option value="residencial">Residencial</option>
          <option value="comercial">Comercial</option>
        </select>

        <label for="data_mudanca">Data da Mudança:</label>
        <input type="date" id="data_mudanca" name="data_mudanca" required>

        <label for="volume">Volume:</label>
        <select id="volume" name="volume" required>
          <option value="pequeno">Pequeno</option>
          <option value="medio">Médio</option>
          <option value="grande">Grande</option>
        </select>

        <label for="servicos_adicionais">Serviços Adicionais:</label>
        <div class="checkbox-group">
          <input type="checkbox" id="montagem" name="servicos_adicionais" value="Montagem/Desmontagem">
          <label for="montagem">Mont./Desmont.</label>

          <input type="checkbox" id="embalagem" name="servicos_adicionais" value="Embalagem">
          <label for="embalagem">Embalagem</label>
        </div>

        <label for="observacoes">Observações:</label>
        <textarea id="observacoes" name="observacoes" rows="5"></textarea>
      </fieldset>

      <button type="submit">Enviar</button>
    </form>
    <div class="success-message" id="success-message" style="display: none;">E-mail enviado com sucesso!</div>
    <div class="error-message" id="error-message" style="display: none;">Erro ao enviar o e-mail. Tente novamente.</div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
  <script src="script.js"></script>
  <script>
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker registrado!'))
        .catch(error => console.error('Erro ao registrar o Service Worker:', error));
    }
  </script>
</body>
</html>