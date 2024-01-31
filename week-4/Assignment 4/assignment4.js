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
  const properties = ['name', 'visibility', 'description', 'topics'];
  const showDataElement = document.getElementById('box-container');
  data.map((obj) => {
    const divElement = document.createElement('div');

    properties.forEach((property) => {
      const childDivElement = document.createElement('div');
      if (property !== 'topics') {
        childDivElement.innerHTML = `${obj[property]}`;
      } else {
        obj[property].forEach((topic) => {
          console.log(topic);
          const topicDivElement = document.createElement('div');
          topicDivElement.innerHTML = `${topic}`;
          childDivElement.appendChild(topicDivElement);
        });
      }
      divElement.appendChild(childDivElement);
    });
    showDataElement.appendChild(divElement);
  });
  pageNumber++;
}
function getData() {
  const url = `https://api.github.com/orgs/facebook/repos?per_page=5&page=${pageNumber}`;
  ajax(url).then((data) => {
    render(data);
  });
}
let pageNumber = 1;

const btnElement = document.getElementById('btn-getData');
btnElement.addEventListener('click', getData);

getData();
