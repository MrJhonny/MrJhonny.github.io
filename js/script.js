const commandInput = document.getElementById('commandInput');
commandInput.focus();

commandInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    const command = commandInput.value.trim();
    processCommand(command);
    commandInput.value = '';
  }
});

let welcomeMessageShown = false;

function printOutput(output) {
  const terminal = document.querySelector('.terminal');
  const outputDiv = document.createElement('div');
  outputDiv.innerHTML = output;

  // Agregar el nuevo resultado al final de la terminal
  terminal.appendChild(outputDiv);
}

function showWelcomeMessage() {
  if (!welcomeMessageShown) {
    printOutput('Welcome to the terminal simulation. Type "help" for available commands.');
    welcomeMessageShown = true; // Actualizar la bandera
  }
}

function processCommand(command) {
  const terminal = document.querySelector('.terminal');

  // Ejecutar el comando
  switch (command) {
    case 'help':
      printOutput('Available commands: help, social, info, date');
      break;
    case 'social':
      printOutput('Visita mis redes sociales para que estemos en contacto!');
      printOutput('<br>');
      printOutput('Facebook: <i class="fa-brands fa-facebook"></i> <a href="https://web.facebook.com/jhon.vidal.90226">Facebook</a>');
      printOutput('Whatsapp: <i class="fa-brands fa-whatsapp"></i> <a href="https://api.whatsapp.com/send?phone=56959059544">Whatsapp</a>');
      printOutput('Instagram: <i class="fa-brands fa-instagram"></i></i> <a href="https://www.instagram.com/logic_null">Instagram</a>');
      printOutput('LinkedIn: <i class="fa-brands fa-linkedin-in"></i> <a href="https://www.linkedin.com/in/jhon-muller">LinkedIn</a>');
      printOutput('Github: <i class="fab fa-github"></i> <a href="https://github.com/MrJhonny">Github</a>');
      printOutput('Curriculum: <i class="fa-brands fa-linkedin-in"></i> <a href="./assets/docs/CV_Ingles_Jhon-Muller.pdf">Curriculum</a>');

      break;
    case 'info':
      printOutput('This is a terminal simulation.');
      break;
    case 'date':
      getDateAndWeather();
      break;
    case 'clear':
      clearTerminal();
      break;
    case '':
      printOutput('<br>');
      break;
    default:
      printOutput('Command not found. Type "help" for available commands.');
      break;
  }
}

function clearTerminal() {
  location.reload(); // Recargar la página
}

function getDateAndWeather() {
  // Obtener la hora actual
  const currentTime = new Date().toLocaleTimeString();

  // Simulando datos meteorológicos (puedes reemplazar esto con una API real)
  const weatherEmoji = '☀️'; // Emojis o ASCII art representando el clima actual

  const weatherInfo = `Current time: ${currentTime}<br>Weather: ${weatherEmoji}`;

  printOutput(weatherInfo);
}
