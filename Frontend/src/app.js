fetch('http://localhost:8000/results')
  .then((response) => response.json())
  .then((data) => {
      let output;
      data.forEach(data => {
          output += `
          <div class='group'>
            <a href='https://www.amazon.com${data.productLink}'><image class='group-hover:w-96 ease-in duration-200 w-40' src='${data.productImage}'></a>
            <p class=' w-60 pt-2'>${data.productName}</p>
          </div>
            
          `;
    
      })
      document.querySelector('.result').innerHTML = output;
  });