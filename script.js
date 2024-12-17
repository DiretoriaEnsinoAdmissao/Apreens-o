
// Sistema de Login
const validUsers = {
  "lacroix.v": { nome: "<@807714970061373490>" },
  "petrov.m": { nome: "<@1115867304664772648>" },
  "ramos.d": { nome: "<@1029757912966504509>" },
  "veitosa.v": { nome: "<@238298169836830720>" },
  "feijao.r": { nome: "<@1119273905312505968>" },
  "caruzoofc": { nome: "<@338052079249653782>" }, // Padronizado para minúsculas
  "dea": { nome: "<@338052079249653782>" },
};

let loggedInUser = null; // Armazenar usuário logado

document.getElementById("loginButton").addEventListener("click", function () {
  const loginInput = document.getElementById("login").value.trim().toLowerCase(); // Força minúsculas
  const user = validUsers[loginInput];

  if (user) {
    loggedInUser = user.nome; // Armazena o nome do usuário logado
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("formContainer").style.display = "block"; // Mostra o formulário
    document.getElementById("loginErrorMessage").style.display = "none"; // Oculta a mensagem de erro
  } else {
    document.getElementById("loginErrorMessage").textContent =
      "Usuário não encontrado. Tente novamente.";
    document.getElementById("loginErrorMessage").style.display = "block"; // Mostra mensagem de erro
  }
});




document
  .getElementById("form")
  .addEventListener("submit", async function (e) {
    e.preventDefault(); // Previne o envio padrão do formulário

    const imageUpload = document.getElementById('imageUpload');
    const linkInput = document.querySelector('textarea[name="Arquivo"]');
    const messageElement = document.getElementById("message");

    // Verifica se o link está vazio e se nenhuma imagem foi selecionada
    if (linkInput.value.trim() === '' && imageUpload.files.length === 0) {
      messageElement.textContent = 'Por favor, envie uma imagem ou insira um link.';
      messageElement.style.display = 'block'; // Mostra a mensagem
      messageElement.style.backgroundColor = '#FFCCCB'; // Cor de fundo para erro
      messageElement.style.color = '#000000'; // Cor do texto
	  messageElement.style.textAlign = 'center'; // Centraliza o texto
	  messageElement.scrollIntoView({ behavior: 'smooth' });
      return; // Impede o envio do formulário
    }

    messageElement.style.display = 'none'; // Esconde a mensagem se o formulário for válido

    document.getElementById("submit-button").disabled = true;

    // Coleta os dados do formulário
    var formData = new FormData(this);
    var keyValuePairs = [];
    for (var pair of formData.entries()) {
      keyValuePairs.push(pair[0] + "=" + pair[1]);
    }

    var formDataString = keyValuePairs.join("&");

    // Exibir a mensagem de "Enviando..."
    messageElement.textContent = "Relatório de apreensão em processamento. Por favor, aguarde...";
    messageElement.style.display = "block";
    messageElement.style.backgroundColor = "#FFFFE0"; /* Amarelo */
    messageElement.style.color = "#000000"; /* Preto */
	messageElement.style.textAlign = 'center';
	messageElement.scrollIntoView({ behavior: 'smooth' });

    try {
      // Envia os dados para o Google Apps Script
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzDLqz4iwNn-JX5OOt6FKnOXaBGVY-TnXSaL3pqQzqsIFCVjba4HN6FU1S3c9ZmzgQ/exec",
        {
          redirect: "follow",
          method: "POST",
          body: formDataString,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao enviar para o Google Apps Script");
      }

      // Coleta dados para enviar ao webhook do Discord
      const Operacao = formData.get("Nome da operação");
      const DataHora = formData.get("Data e Hora");
      const Arquivo = formData.get("Arquivo");
          const materiais = [];
            if (formData.get("Maconha")) materiais.push(`Maconha: ${formData.get("Maconha")}`);
            if (formData.get("Cocaína")) materiais.push(`Cocaína: ${formData.get("Cocaína")}`);
            if (formData.get("Notas Marcadas")) materiais.push(`Notas Marcadas: ${formData.get("Notas Marcadas")}`);
            if (formData.get("Produto Químico")) materiais.push(`Produto Químico: ${formData.get("Produto Químico")}`);
            if (formData.get("Cannabis")) materiais.push(`Cannabis: ${formData.get("Cannabis")}`);
            if (formData.get("Kevlar")) materiais.push(`Kevlar: ${formData.get("Kevlar")}`);
            if (formData.get("Folha de Coca")) materiais.push(`Folha de Coca: ${formData.get("Folha de Coca")}`);
            if (formData.get("Pneu Blindado")) materiais.push(`Pneu Blindado: ${formData.get("Pneu Blindado")}`);
            if (formData.get("Adubo")) materiais.push(`Adubo: ${formData.get("Adubo")}`);
            if (formData.get("Peças de Carro")) materiais.push(`Peças de Carro: ${formData.get("Peças de Carro")}`);
            if (formData.get("C4")) materiais.push(`C4: ${formData.get("C4")}`);
            if (formData.get("Lock Pick")) materiais.push(`Lock Pick: ${formData.get("Lock Pick")}`);
            if (formData.get("Ticket")) materiais.push(`Ticket: ${formData.get("Ticket")}`);
            if (formData.get("Supressor")) materiais.push(`Supressor: ${formData.get("Supressor")}`);
            if (formData.get("Laser")) materiais.push(`Laser: ${formData.get("Laser")}`);
            if (formData.get("Colete")) materiais.push(`Colete: ${formData.get("Colete")}`);
            if (formData.get("9 MM")) materiais.push(`9 MM: ${formData.get("9 MM")}`);
            if (formData.get("357 Magnum")) materiais.push(`357 Magnum: ${formData.get("357 Magnum")}`);
            if (formData.get(".45 ACP")) materiais.push(`.45 ACP: ${formData.get(".45 ACP")}`);
            if (formData.get("12 MM")) materiais.push(`12 MM: ${formData.get("12 MM")}`);
            if (formData.get("5.56 MM")) materiais.push(`5.56 MM: ${formData.get("5.56 MM")}`);
            if (formData.get("7.62 MM")) materiais.push(`7.62 MM: ${formData.get("7.62 MM")}`);
            if (formData.get("Pen Drive militar")) materiais.push(`Pen Drive militar: ${formData.get("Pen Drive militar")}`);
            if (formData.get("Pen Drive Lojinha")) materiais.push(`Pen Drive Lojinha: ${formData.get("Pen Drive Lojinha")}`);
            if (formData.get("Pen Drive Joalheira")) materiais.push(`Pen Drive Joalheira: ${formData.get("Pen Drive Joalheira")}`);
            if (formData.get("molotov")) materiais.push(`molotov: ${formData.get("molotov")}`);
            if (formData.get("USP")) materiais.push(`USP: ${formData.get("USP")}`);
            if (formData.get("Glock")) materiais.push(`Glock: ${formData.get("Glock")}`);
            if (formData.get("Sig Sauer")) materiais.push(`Sig Sauer: ${formData.get("Sig Sauer")}`);
            if (formData.get("Five Seven")) materiais.push(`Five Seven: ${formData.get("Five Seven")}`);
            if (formData.get("Revolver")) materiais.push(`Revolver: ${formData.get("Revolver")}`);
            if (formData.get("Desert")) materiais.push(`Desert: ${formData.get("Desert")}`);
            if (formData.get("Double Tec-9")) materiais.push(`Double Tec-9: ${formData.get("Double Tec-9")}`);
            if (formData.get("Uzi")) materiais.push(`Uzi: ${formData.get("Uzi")}`);
            if (formData.get("MP5")) materiais.push(`MP5: ${formData.get("MP5")}`);
            if (formData.get("Mossberg")) materiais.push(`Mossberg: ${formData.get("Mossberg")}`);
            if (formData.get("AA12")) materiais.push(`AA12: ${formData.get("AA12")}`);
            if (formData.get("M16")) materiais.push(`M16: ${formData.get("M16")}`);
            if (formData.get("Imbel IA2")) materiais.push(`Imbel IA2: ${formData.get("Imbel IA2")}`);
            if (formData.get("G36C")) materiais.push(`G36C: ${formData.get("G36C")}`);
            if (formData.get("SG 553")) materiais.push(`SG 553: ${formData.get("SG 553")}`);
            if (formData.get("AR-15")) materiais.push(`AR-15: ${formData.get("AR-15")}`);
            if (formData.get("AK-47")) materiais.push(`AK-47: ${formData.get("AK-47")}`);
            if (formData.get("Rocket")) materiais.push(`Rocket: ${formData.get("Rocket")}`);
            if (formData.get("Molotov")) materiais.push(`Molotov: ${formData.get("Molotov")}`);
            if (formData.get("Placa Clonada")) materiais.push(`Placa Clonada: ${formData.get("Placa Clonada")}`);
            if (formData.get("Faca")) materiais.push(`Faca: ${formData.get("Faca")}`);
            if (formData.get("Cutelo")) materiais.push(`Cutelo: ${formData.get("Cutelo")}`);
            if (formData.get("Bilhete")) materiais.push(`Bilhete: ${formData.get("Bilhete")}`);
            if (formData.get("Algema")) materiais.push(`Algema: ${formData.get("Algema")}`);
            if (formData.get("Soco Inglês")) materiais.push(`Soco Inglês: ${formData.get("Soco Inglês")}`);
            if (formData.get("Taco de baseball")) materiais.push(`Taco de baseball: ${formData.get("Taco de baseball")}`);
            if (formData.get("Spray de Pimenta")) materiais.push(`Spray de Pimenta: ${formData.get("Spray de Pimenta")}`);
            if (formData.get("Lixadeira")) materiais.push(`Lixadeira: ${formData.get("Lixadeira")}`);
            if (formData.get("Radio")) materiais.push(`Radio: ${formData.get("Radio")}`);
			if (formData.get("Dinamite")) materiais.push(`Dinamite: ${formData.get("Dinamite")}`);
			if (formData.get("Pre-pago")) materiais.push(`Pre-pago: ${formData.get("Pre-pago")}`);
			if (formData.get("Peças de Pisto")) materiais.push(`Peças de Pisto: ${formData.get("Peças de Pisto")}`);
			if (formData.get("Peças de Fuzil")) materiais.push(`Peças de Fuzil: ${formData.get("Peças de Fuzil")}`);
			if (formData.get("Peça de Submetralhadora")) materiais.push(`Peça de Submetralhadora: ${formData.get("Peça de Submetralhadora")}`);
			if (formData.get("Peças de Espingardas")) materiais.push(`Peças de Espingardas: ${formData.get("Peças de Espingardas")}`);

      // Preparando os dados para o webhook do Discord
      const webhookURL =
        "https://discordapp.com/api/webhooks/1316143693618741369/whjpDFYlNM7Rg3PJcPaD82spA2J80XGnArG2WrSdMk95iRCZ5qzzpTz96oFDiObSCrPd";
      const webhookData = new FormData();
      webhookData.append(
        "content",
        `📁**Relatório de Apreensão**\n- **Nome da Operação:** ${Operacao}\n- **Ocorrido:** ${DataHora}\n- **Link:**\n> -# **${Arquivo ? Arquivo : ""}**\n- **Materiais:** ${
          materiais.length > 0
            ? "\n> " +
              materiais
                .map((material) => "-# " + material)
                .join("\n> ")
            : ""
        }\n- **Responsável pelo Relatório:** ${loggedInUser}`
      );

      // Adiciona as imagens (se fornecidas) como anexos ao webhook
      const imageFiles = document.getElementById("imageUpload").files;
      for (let i = 0; i < imageFiles.length; i++) {
        webhookData.append(`file${i}`, imageFiles[i]);
      }

      // Envia dados para o webhook do Discord
      const webhookResponse = await fetch(webhookURL, {
        method: "POST",
        body: webhookData,
      });

      if (!webhookResponse.ok) {
        throw new Error("Falha ao enviar. Possível que imagens são muito pesadas. Tente fazer o upload das imagens e utilizar o link.");
      }

      messageElement.textContent = "Relatório de apreensão enviado com sucesso! Obrigado pela sua contribuição.";
      messageElement.style.backgroundColor = "#98FB98";
      messageElement.style.color = "#000000";
      messageElement.style.display = "block";
	  messageElement.style.textAlign = 'center';
	  messageElement.scrollIntoView({ behavior: 'smooth' });

      // Temporizador para esconder a mensagem após 3 segundos
      setTimeout(function () {
        messageElement.textContent = "";
        messageElement.style.display = "none";
      }, 3000);

      // Reinicia o formulário após o envio
      this.reset();
    } catch (error) {
      messageElement.textContent = error.message;
      messageElement.style.backgroundColor = "#FFCCCB";
      messageElement.style.color = "#000000";
      messageElement.style.display = "block";
	  messageElement.scrollIntoView({ behavior: 'smooth' });


      // Temporizador
      setTimeout(function () {
        messageElement.textContent = "";
        messageElement.style.display = "none";
      }, 10000);
    } finally {
      document.getElementById("submit-button").disabled = false; // Habilita o botão de enviar novamente
    }
  });

// Campos de input para os itens
const itemsData = {
  'Entorpecentes': [
      { label: 'Maconha', name: 'Maconha', placeholder: 'Qtd.' },
      { label: 'Cocaína', name: 'Cocaína', placeholder: 'Qtd.' }
  ],
  'Notas-Marcadas': [
      { label: 'Notas Marcadas', name: 'Notas Marcadas', placeholder: 'Qtd.' }
  ],
'Mercadorias': [
    { label: 'Cannabis', name: 'Cannabis', placeholder: 'Qtd.' },
    { label: 'Produto Químico', name: 'Produto Químico', placeholder: 'Qtd.' },
    { label: 'Adubo', name: 'Adubo', placeholder: 'Qtd.' },
    { label: 'Kevlar', name: 'Kevlar', placeholder: 'Qtd.' },
    { label: 'Folha de Coca', name: 'Folha de Coca', placeholder: 'Qtd.' },
    { label: 'Pneu Blindado', name: 'Pneu Blindado', placeholder: 'Qtd.' },
    { label: 'Peças de Carro', name: 'Peças de Carro', placeholder: 'Qtd.' },
    { label: 'C4', name: 'C4', placeholder: 'Qtd.' },
    { label: 'Lock Pick', name: 'Lock Pick', placeholder: 'Qtd.' },
    { label: 'Bilhete', name: 'Bilhete', placeholder: 'Qtd.' },
    { label: 'Supressor', name: 'Supressor', placeholder: 'Qtd.' },
    { label: 'Laser', name: 'Laser', placeholder: 'Qtd.' },
    { label: 'Colete', name: 'Colete', placeholder: 'Qtd.' },
    { label: 'Molotov', name: 'Molotov', placeholder: 'Qtd.' },
    { label: 'Dinamite', name: 'Dinamite', placeholder: 'Qtd.' }
],

'Pen-Drive': [
    { label: 'Pen Drive militar', name: 'Pen Drive militar', placeholder: 'Qtd.' },
    { label: 'Pen Drive Lojinha', name: 'Pen Drive Lojinha', placeholder: 'Qtd.' },
    { label: 'Pen Drive Joalheira', name: 'Pen Drive Joalheira', placeholder: 'Qtd.' }
],

'Armamento': [
    { label: 'USP', name: 'USP', placeholder: 'Qtd.' },
    { label: 'Glock', name: 'Glock', placeholder: 'Qtd.' },
    { label: 'Sig Sauer', name: 'Sig Sauer', placeholder: 'Qtd.' },
    { label: 'Five Seven', name: 'Five Seven', placeholder: 'Qtd.' },
    { label: 'Revolver', name: 'Revolver', placeholder: 'Qtd.' },
    { label: 'Desert', name: 'Desert', placeholder: 'Qtd.' },
    { label: 'Double Tec-9', name: 'Double Tec-9', placeholder: 'Qtd.' },
    { label: 'Uzi', name: 'Uzi', placeholder: 'Qtd.' },
    { label: 'MP5', name: 'MP5', placeholder: 'Qtd.' },
    { label: 'Mossberg', name: 'Mossberg', placeholder: 'Qtd.' },
    { label: 'AA12', name: 'AA12', placeholder: 'Qtd.' },
    { label: 'M16', name: 'M16', placeholder: 'Qtd.' },
    { label: 'Imbel IA2', name: 'Imbel IA2', placeholder: 'Qtd.' },
    { label: 'G36C', name: 'G36C', placeholder: 'Qtd.' },
    { label: 'SG 553', name: 'SG 553', placeholder: 'Qtd.' },
    { label: 'AR-15', name: 'AR-15', placeholder: 'Qtd.' },
    { label: 'AK-47', name: 'AK-47', placeholder: 'Qtd.' },
    { label: 'Rocket', name: 'Rocket', placeholder: 'Qtd.' }
],
'Municao': [
    { label: '9 MM', name: '9 MM', placeholder: 'Qtd.' },
    { label: '357 Magnum', name: '357 Magnum', placeholder: 'Qtd.' },
    { label: '.45 ACP', name: '.45 ACP', placeholder: 'Qtd.' },
    { label: '12 MM', name: '12 MM', placeholder: 'Qtd.' },
    { label: '5.56 MM', name: '5.56 MM', placeholder: 'Qtd.' },
    { label: '7.62 MM', name: '7.62 MM', placeholder: 'Qtd.' }
],
'Peças-de-Armas': [
  { label: 'Peças de Pisto', name: 'Peças de Pisto', placeholder: 'Qtd.' },
  { label: 'Peças de Fuzil', name: 'Peças de Fuzil', placeholder: 'Qtd.' },
  { label: 'Peça de Submetralhadora', name: 'Peça de Submetralhadora', placeholder: 'Qtd.' },
  { label: 'Peças de Espingardas', name: 'Peças de Espingardas', placeholder: 'Qtd.' }
],
  'Usou-para-fins-ilegais': [
    { label: 'Placa Clonada', name: 'Placa Clonada', placeholder: 'Qtd.' },
    { label: 'Faca', name: 'Faca', placeholder: 'Qtd.' },
    { label: 'Cutelo', name: 'Cutelo', placeholder: 'Qtd.' },
    { label: 'Algema', name: 'Algema', placeholder: 'Qtd.' },
    { label: 'Soco Inglês', name: 'Soco Inglês', placeholder: 'Qtd.' },
    { label: 'Taco de baseball', name: 'Taco de baseball', placeholder: 'Qtd.' },
    { label: 'Spray de Pimenta', name: 'Spray de Pimenta', placeholder: 'Qtd.' },
    { label: 'Lixadeira', name: 'Lixadeira', placeholder: 'Qtd.' },
    { label: 'Radio', name: 'Radio', placeholder: 'Qtd.' },
    { label: 'Pre-pago', name: 'Pre-pago', placeholder: 'Qtd.' }
  ]
};


// Armazenar os valores preenchidos
var filledValues = {};

// Exibir campos conforme os itens selecionados
function showFields() {
  var items = document.getElementById('items');
  var selectedOptions = Array.from(items.selectedOptions).map(option => option.value);

  var container = document.getElementById('inputFieldsContainer');
  if (container) {
      container.innerHTML = ''; // não limpa
      if (selectedOptions.length > 0) {
          selectedOptions.forEach(option => {
              var row = document.createElement('div');
              row.classList.add('category-row'); // Classe CSS para linha da categoria
              container.appendChild(row);

              var fields = itemsData[option];
              fields.forEach(({ label, placeholder }) => {
                  var fieldElement = document.createElement('div');
                  fieldElement.classList.add('input-field'); // Nova classe para os campos de entrada

                  var input = document.createElement('input');
                  input.classList.add('custom-input'); // Classe única para evitar conflitos
                  input.type = 'number';
                  input.name = label; // Define o nome do campo como o título do item
                  input.min = 0;
                  input.placeholder = placeholder;

                  // Recuperar valor preenchido, se existir
                  if (filledValues[label] !== undefined) {
                      input.value = filledValues[label];
                  }

                  var labelElement = document.createElement('label');
                  labelElement.classList.add('label');
                  labelElement.textContent = label;

                  fieldElement.appendChild(labelElement);
                  fieldElement.appendChild(input);
                  row.appendChild(fieldElement);

                  // Adicionar listener para atualizar os valores preenchidos
                  input.addEventListener('input', (e) => {
                      filledValues[label] = e.target.value;
                  });
              });
          });

          container.style.display = 'flex';
          container.style.flexDirection = 'column'; // Ajusta a direção para que as categorias fiquem uma abaixo da outra
      } else {
          container.style.display = 'none';
      }
  }
}
