const commandInput = document.getElementById('commandInput');

commandInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    const command = commandInput.value.trim();
    processCommand(command);
    commandInput.value = '';
  }
});

function processCommand(command) {
  switch(command) {
    case 'help':
      printOutput('Available commands: help, social, info');
      break;
    case 'social':
      printOutput('Visit our social media pages for updates!');
      break;
    case 'info':
      printOutput('This is a terminal simulation.');
      break;
    default:
      printOutput('Command not found. Type "help" for available commands.');
  }
}

function printOutput(output) {
  const terminal = document.querySelector('.terminal');
  const outputDiv = document.createElement('div');
  outputDiv.textContent = output;
  terminal.appendChild(outputDiv);
}
