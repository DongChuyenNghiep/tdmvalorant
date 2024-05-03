document.addEventListener('DOMContentLoaded', async function() {
    try {
        const fetchAndCreateTableRows = async (fullURL, startIndex, targetID) => {
            const res = await fetch(fullURL);
            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
            }
            const rep = await res.text();
            const data = JSON.parse(rep.substr(47).slice(0, -2));
            const dataBody = document.getElementById(targetID);
            
            for (let i = startIndex; i < startIndex + 5; i++) {
                const rowData = data.table.rows[i].c;
                const row = document.createElement('tr');
                let agent = document.createElement('img');
                let ign_col = document.createElement('div');
                ign_col.classList.add('first-col');
                let IGN = document.createElement('span');
                IGN.textContent = rowData[1].v;
                agent.classList.add('agent-pick');
                agent.src = 'agent/'+rowData[0].v+'.png';
                let hs = document.createElement('td');
                hs.textContent = rowData[6].v;
                ign_col.appendChild(agent);
                ign_col.appendChild(IGN);
                let first_col = document.createElement('td');
                first_col.appendChild(ign_col);
                row.appendChild(first_col);
                for (let j = 2; j < rowData.length; j++) {
                    const cell = document.createElement('td');
                    cell.textContent = rowData[j].v;
                    row.appendChild(cell);
                }
                
                
                dataBody.appendChild(row);
            }
        };

        const sheets = [
            { title: 'Bảng A', range: 'B2:L101', targetLeft: 'team-left-A-', targetRight: 'team-right-A-' },
        ];

        const SHEET_ID = '1QggU0zafsVUpV7f-YDYHg5jAfxKAMWZgk57JZSvCVuU';
        const fetchPromises = sheets.map(async (sheet) => {
            const fullURL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${sheet.title}&range=${sheet.range}`;
            
            const res = await fetch(fullURL);
            if (!res.ok) {
                console.error(`Failed to fetch ${sheet.title} data: ${res.status} ${res.statusText}`);
                return; // Move to the next sheet in case of a fetch failure
            }

            const rep = await res.text();
            const data = JSON.parse(rep.substr(47).slice(0, -2));
            
            const leftPromises = [];
            const rightPromises = [];
            for (let i = 0; i < 10; i++) {
                leftPromises.push(fetchAndCreateTableRows(fullURL, i * 10, `${sheet.targetLeft}${i + 1}`));
                rightPromises.push(fetchAndCreateTableRows(fullURL, (i * 10) + 5, `${sheet.targetRight}${i + 1}`));
            }

            await Promise.all([...leftPromises, ...rightPromises]);
        });

        await Promise.all(fetchPromises);
    } catch (error) {
        console.error('Error occurred:', error);
    }
});
