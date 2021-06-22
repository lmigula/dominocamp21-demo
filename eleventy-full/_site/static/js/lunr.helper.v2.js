let idx = undefined;
let docs = undefined;

let doSearch = () => {

    let search = document.getElementById('search').value
    let resultDiv = document.getElementById("searchResults");
    resultDiv.innerHTML = '';
    console.log('doSearch()', search);
    console.log('idx', idx)
    let results = idx.search(search);

    console.log('results', results);
    if (results) {
        let data = [];
        results.forEach(element => {
            let found = docs.find(doc => doc.unid == element.ref);
            if (found) {
                found.score = element.score;

                data.push(found);
            }
        });
        let list = `<table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
        <thead>
    <tr>
      <th>Score</th>
      <th class="mdl-data-table__cell--non-numeric">Name</th>
    </tr>
  </thead>
  <tbody>
        `;
        data.forEach(element => {
            list += `<tr>
            <td class="mdl-data-table__cell">${element.score}</td>
            <td class="mdl-data-table__cell--non-numeric">
                <a href="/names/${element.unid}/">
                ${element.firstname} ${element.lastname}
              </a>
              </td>
              </tr>`

        });
        list += '</table>';
        resultDiv.innerHTML = list;
        console.log('data', data);
    }


    return false;
}

let init = async () => {
    let index = await fetch('/index.json');
    let indexData = await index.json();
    idx = lunr.Index.load(indexData);

    let docsData = await fetch('/data.json');
    docs = await docsData.json();
}
console.log('load.. v2');

init().then(res => {
    console.log('initiaded');
})