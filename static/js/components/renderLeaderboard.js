
export function renderLeaderboard() {
    const page = document.getElementById('page')
    page.replaceChildren();

    const table = document.createElement('table')
    table.innerHTML = `
        <table>
        <tr>
        <th>Quiz Name</th>
        <th>User</th>
        <th>Score</th>
        </tr>
    `;
    page.appendChild(table);
    axios.get('http://localhost:3000/api/leaderboard').then((response)=>{
        console.log(response.data);
        const rows = response.data;
        for (let row of rows) {
            const tableRow = document.createElement('tr');
            tableRow.innerHTML = `
                <td>${row.quiz}</td>
                <td>${row.user}</td>
                <td>${Math.round(row.avg * 100)}%</td>
            `;
            table.appendChild(tableRow);
        }
    })

}