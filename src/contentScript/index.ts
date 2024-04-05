console.info('contentScript is running')

function createPlusButton(problemId: string) {
    const button = document.createElement('button');
    button.textContent = '+';
    button.addEventListener('click', function() {
      // Logic to add the problem to the list
      // This could involve storing the problemId in browser storage or sending it to a server
      console.info(`Adding problem ${problemId} to the list`);
    });
    return button;
}

const rows = document.querySelectorAll('div[role="row"]');
  rows.forEach(row => {
    // Find the anchor tag that contains the problem number and title
   
    const linkElement = row.getElementsByClassName('h-5');
    console.info(linkElement);
    // const problemText = linkElement ? linkElement.textContent : null;

    // const problemNumberMatch = problemText ? problemText.match(/^(\d+)\./) : null;
    // const problemNumber = problemNumberMatch ? problemNumberMatch[1] : 'unknown';
    
    // const plusButton = createPlusButton(problemNumber);
    // row.appendChild(plusButton);
  });