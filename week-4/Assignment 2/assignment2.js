async function ajax(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`出錯! status code: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function render(data) {
  const showDataElement = document.getElementById('showData');

  data.map((obj) => {
    const divElement = document.createElement('div');

    for (const key in obj) {
      const pElement = document.createElement('p');
      pElement.innerHTML = `${key}: ${obj[key]}`;
      divElement.appendChild(pElement);
    }
    showDataElement.appendChild(divElement);
  });
}

const url =
  'https://remote-assignment.s3.ap-northeast-1.amazonaws.com/products';
ajax(url).then((data) => {
  render(data);
});
