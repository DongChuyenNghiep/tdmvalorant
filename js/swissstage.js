document.addEventListener('DOMContentLoaded', function () {
    let SHEET_TITLE = 'Swiss Stage';
    let SHEET_RANGE = 'A2:L50';
    let SHEET_ID = '1s2Lyk37v-hZcg7-_ag8S1Jq3uaeRR8u-oG0zviSc26E';
    let FULL_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE}&range=${SHEET_RANGE}`;

    fetch(FULL_URL)
        .then((res) => res.text())
        .then((rep) => {
            let jsonData = JSON.parse(rep.substr(47).slice(0, -2));
            let rowData = jsonData.table.rows.slice(35, 44); // Slice to get only rows A37:A57
            let valueA = [];
            let valueB = [];
            let valueC = [];
            let valueD = [];
            let valueE = [];
            let valueF = [];
            let valueG = [];
            let valueH = [];
            let valueI = [];
            let valueJ = [];
            let valueK = {};
            let valueL = [];
            let valueM = [];
            for (let i = 0; i < 16; i++) {
                valueA.push(jsonData.table.rows[i]?.c[0]?.v ?? null);
                valueB.push(jsonData.table.rows[i]?.c[1]?.v ?? null);
                valueC.push(jsonData.table.rows[i]?.c[2]?.v ?? null);
                valueD.push(jsonData.table.rows[i]?.c[3]?.v ?? null);
                valueE.push(jsonData.table.rows[i]?.c[4]?.v ?? null);
                valueF.push(jsonData.table.rows[i]?.c[5]?.v ?? null);

            }
            for (let i = 0; i < 8; i++) {
                valueK[jsonData.table.rows[i]?.c[10]?.v ?? null] = jsonData.table.rows[i]?.c[11]?.v ?? null;

            }
            for (let position in valueK) {
                valueL.push({ position: parseInt(position), logo: valueK[position] });
            }
            for (let k = 0; k < 12; k++) {
                valueG.push(jsonData.table.rows[k]?.c[6]?.v ?? null);
                valueH.push(jsonData.table.rows[k]?.c[7]?.v ?? null);
            }
            for (let k = 0; k < 6; k++) {
                valueI.push(jsonData.table.rows[k]?.c[8]?.v ?? null);
                valueJ.push(jsonData.table.rows[k]?.c[9]?.v ?? null);
            }
            for (let i = 8; i < 16; i++) {
                valueM.push(jsonData.table.rows[i]?.c[11]?.v ?? null);
            }
            // Create matchups container
            const matchupsContainer = document.createElement('div');
            matchupsContainer.classList.add('matchups');

            // Loop to create each matchup
            for (let i = 0; i < 16; i += 2) {
                let mymodelid = document.createElement('div');
                mymodelid.id = "myModal"+i;
                mymodelid.classList.add('modal'); 
                let modal_content = document.createElement('div');
                modal_content.classList.add('modal-content');
                modal_content.id = 'matchid'+(i / 2 + 1);
                let close_span = this.createElement('span');
                close_span.classList.add('close');
                close_span.addEventListener('click', function() {
                    closeModal(i);
                });
                let map_pick_label = document.createElement('p');
                map_pick_label.classList.add("map_pick_label");
                map_pick_label.innerHTML = 'Map pick';
                let img_pick = document.createElement('img');
                img_pick.classList.add("map_pick");
                img_pick.src = "image/"+rowData[i/2+1].c[0].v + ".jpg";
                close_span.innerHTML = '&times;';
                modal_content.appendChild(close_span);
                modal_content.appendChild(map_pick_label)
                modal_content.appendChild(img_pick);
                mymodelid.appendChild(modal_content);
                const container = document.querySelector('.w0-l0');
                // Create matchups container
                link_info_match = document.createElement('a');
                link_info_match.classList.add('link-match-info');
                link_info_match.onclick = function() { openModal(i); };
                const matchupsContainer = document.createElement('div');
                matchupsContainer.classList.add('matchups');
                matchupsContainer.appendChild(mymodelid);
                // Create matchup div
                const matchupDiv = document.createElement('div');
                matchupDiv.classList.add('matchup');

                // Create first team div
                const team1Div = document.createElement('div');
                team1Div.classList.add('team');

                // Create logo-team div for team 1
                const logoTeam1Div = document.createElement('div');
                logoTeam1Div.classList.add('logo-team');
                const logoTeam1Img = document.createElement('img');
                const regex = /\/d\/(.+?)\/view/;
                let link_drive_image = valueA[i]; // Use even value cell
                const logoteamA = link_drive_image.match(regex);
                const fileIdA = logoteamA[1];
                logoTeam1Img.src = `https://drive.google.com/thumbnail?id=${fileIdA}`;
                logoTeam1Img.alt = '';
                logoTeam1Div.appendChild(logoTeam1Img);
                team1Div.appendChild(logoTeam1Div);

                // Create score div for team 1
                const score1Div = document.createElement('div');
                score1Div.classList.add('score');
                const score1P = document.createElement('p');
                score1P.textContent = valueB[i]; // Set score for team 1
                score1Div.appendChild(score1P);
                team1Div.appendChild(score1Div);

                // Append team 1 div to matchup div
                matchupDiv.appendChild(team1Div);

                // Create second team div
                const team2Div = document.createElement('div');
                team2Div.classList.add('team');

                // Create logo-team div for team 2
                const logoTeam2Div = document.createElement('div');
                logoTeam2Div.classList.add('logo-team');
                const logoTeam2Img = document.createElement('img');
                const link_drive_image_B = valueA[i + 1];
                const logoteamB = link_drive_image_B.match(regex);
                const fileIdB = logoteamB[1];
                logoTeam2Img.src = `https://drive.google.com/thumbnail?id=${fileIdB}`;
                logoTeam2Img.alt = '';
                logoTeam2Div.appendChild(logoTeam2Img);
                team2Div.appendChild(logoTeam2Div);

                // Create score div for team 2
                const score2Div = document.createElement('div');
                score2Div.classList.add('score');
                const score2P = document.createElement('p');
                score2P.textContent = valueB[i + 1]; // Set score for team 2
                score2Div.appendChild(score2P);
                team2Div.appendChild(score2Div);
                // Append team 2 div to matchup div
                matchupDiv.appendChild(team2Div);
                // Append matchup div to matchups container
                link_info_match.appendChild(matchupDiv);
                matchupsContainer.appendChild(link_info_match);
                // Append matchups container to the container with class w0-l0
                container.appendChild(matchupsContainer);
            }
            for (let i = 0; i < 8; i += 2) {
                const container = document.querySelector('.w1-l0');
                // Create matchups container
                const matchupsContainer = document.createElement('div');
                matchupsContainer.classList.add('matchups');
                // Create matchup div
                const matchupDiv = document.createElement('div');
                matchupDiv.classList.add('matchup');

                // Create first team div
                const team1Div = document.createElement('div');
                team1Div.classList.add('team');

                // Create logo-team div for team 1
                const logoTeam1Div = document.createElement('div');
                logoTeam1Div.classList.add('logo-team');
                const logoTeam1Img = document.createElement('img');
                const regex = /\/d\/(.+?)\/view/;
                let link_drive_image = valueC[i]; // Use even value cell
                const logoteamA = link_drive_image.match(regex);
                const fileIdA = logoteamA[1];
                logoTeam1Img.src = `https://drive.google.com/thumbnail?id=${fileIdA}`;
                logoTeam1Img.alt = '';
                logoTeam1Div.appendChild(logoTeam1Img);
                team1Div.appendChild(logoTeam1Div);

                // Create score div for team 1
                const score1Div = document.createElement('div');
                score1Div.classList.add('score');
                const score1P = document.createElement('p');
                score1P.textContent = valueD[i]; // Set score for team 1
                score1Div.appendChild(score1P);
                team1Div.appendChild(score1Div);

                // Append team 1 div to matchup div
                matchupDiv.appendChild(team1Div);

                // Create second team div
                const team2Div = document.createElement('div');
                team2Div.classList.add('team');

                // Create logo-team div for team 2
                const logoTeam2Div = document.createElement('div');
                logoTeam2Div.classList.add('logo-team');
                const logoTeam2Img = document.createElement('img');
                const link_drive_image_B = valueC[i + 1];
                const logoteamB = link_drive_image_B.match(regex);
                const fileIdB = logoteamB[1];
                logoTeam2Img.src = `https://drive.google.com/thumbnail?id=${fileIdB}`;
                logoTeam2Img.alt = '';
                logoTeam2Div.appendChild(logoTeam2Img);
                team2Div.appendChild(logoTeam2Div);

                // Create score div for team 2
                const score2Div = document.createElement('div');
                score2Div.classList.add('score');
                const score2P = document.createElement('p');
                score2P.textContent = valueD[i + 1]; // Set score for team 2
                score2Div.appendChild(score2P);
                team2Div.appendChild(score2Div);
                // Append team 2 div to matchup div
                matchupDiv.appendChild(team2Div);
                // Append matchup div to matchups container
                matchupsContainer.appendChild(matchupDiv);
                // Append matchups container to the container with class w0-l0
                container.appendChild(matchupsContainer);
            }
            for (let i = 8; i < 16; i += 2) {
                const container = document.querySelector('.w0-l1');
                // Create matchups container
                const matchupsContainer = document.createElement('div');
                matchupsContainer.classList.add('matchups');
                // Create matchup div
                const matchupDiv = document.createElement('div');
                matchupDiv.classList.add('matchup');

                // Create first team div
                const team1Div = document.createElement('div');
                team1Div.classList.add('team');

                // Create logo-team div for team 1
                const logoTeam1Div = document.createElement('div');
                logoTeam1Div.classList.add('logo-team');
                const logoTeam1Img = document.createElement('img');
                const regex = /\/d\/(.+?)\/view/;
                let link_drive_image = valueC[i]; // Use even value cell
                const logoteamA = link_drive_image.match(regex);
                const fileIdA = logoteamA[1];
                logoTeam1Img.src = `https://drive.google.com/thumbnail?id=${fileIdA}`;
                logoTeam1Img.alt = '';
                logoTeam1Div.appendChild(logoTeam1Img);
                team1Div.appendChild(logoTeam1Div);

                // Create score div for team 1
                const score1Div = document.createElement('div');
                score1Div.classList.add('score');
                const score1P = document.createElement('p');
                score1P.textContent = valueD[i]; // Set score for team 1
                score1Div.appendChild(score1P);
                team1Div.appendChild(score1Div);

                // Append team 1 div to matchup div
                matchupDiv.appendChild(team1Div);

                // Create second team div
                const team2Div = document.createElement('div');
                team2Div.classList.add('team');

                // Create logo-team div for team 2
                const logoTeam2Div = document.createElement('div');
                logoTeam2Div.classList.add('logo-team');
                const logoTeam2Img = document.createElement('img');
                const link_drive_image_B = valueC[i + 1];
                const logoteamB = link_drive_image_B.match(regex);
                const fileIdB = logoteamB[1];
                logoTeam2Img.src = `https://drive.google.com/thumbnail?id=${fileIdB}`;
                logoTeam2Img.alt = '';
                logoTeam2Div.appendChild(logoTeam2Img);
                team2Div.appendChild(logoTeam2Div);

                // Create score div for team 2
                const score2Div = document.createElement('div');
                score2Div.classList.add('score');
                const score2P = document.createElement('p');
                score2P.textContent = valueD[i + 1]; // Set score for team 2
                score2Div.appendChild(score2P);
                team2Div.appendChild(score2Div);
                // Append team 2 div to matchup div
                matchupDiv.appendChild(team2Div);
                // Append matchup div to matchups container
                matchupsContainer.appendChild(matchupDiv);
                // Append matchups container to the container with class w0-l0
                container.appendChild(matchupsContainer);
            }
            for (let i = 0; i < 4; i += 2) {
                const container = document.querySelector('.w2-l0');
                // Create matchups container
                const matchupsContainer = document.createElement('div');
                matchupsContainer.classList.add('matchups');
                // Create matchup div
                const matchupDiv = document.createElement('div');
                matchupDiv.classList.add('matchup');

                // Create first team div
                const team1Div = document.createElement('div');
                team1Div.classList.add('team');

                // Create logo-team div for team 1
                const logoTeam1Div = document.createElement('div');
                logoTeam1Div.classList.add('logo-team');
                const logoTeam1Img = document.createElement('img');
                const regex = /\/d\/(.+?)\/view/;
                let link_drive_image = valueE[i]; // Use even value cell
                const logoteamA = link_drive_image.match(regex);
                const fileIdA = logoteamA[1];
                logoTeam1Img.src = `https://drive.google.com/thumbnail?id=${fileIdA}`;
                logoTeam1Img.alt = '';
                logoTeam1Div.appendChild(logoTeam1Img);
                team1Div.appendChild(logoTeam1Div);

                // Create score div for team 1
                const score1Div = document.createElement('div');
                score1Div.classList.add('score');
                const score1P = document.createElement('p');
                score1P.textContent = valueF[i]; // Set score for team 1
                score1Div.appendChild(score1P);
                team1Div.appendChild(score1Div);

                // Append team 1 div to matchup div
                matchupDiv.appendChild(team1Div);

                // Create second team div
                const team2Div = document.createElement('div');
                team2Div.classList.add('team');

                // Create logo-team div for team 2
                const logoTeam2Div = document.createElement('div');
                logoTeam2Div.classList.add('logo-team');
                const logoTeam2Img = document.createElement('img');
                const link_drive_image_B = valueE[i + 1];
                const logoteamB = link_drive_image_B.match(regex);
                const fileIdB = logoteamB[1];
                logoTeam2Img.src = `https://drive.google.com/thumbnail?id=${fileIdB}`;
                logoTeam2Img.alt = '';
                logoTeam2Div.appendChild(logoTeam2Img);
                team2Div.appendChild(logoTeam2Div);

                // Create score div for team 2
                const score2Div = document.createElement('div');
                score2Div.classList.add('score');
                const score2P = document.createElement('p');
                score2P.textContent = valueF[i + 1]; // Set score for team 2
                score2Div.appendChild(score2P);
                team2Div.appendChild(score2Div);
                // Append team 2 div to matchup div
                matchupDiv.appendChild(team2Div);
                // Append matchup div to matchups container
                matchupsContainer.appendChild(matchupDiv);
                // Append matchups container to the container with class w0-l0
                container.appendChild(matchupsContainer);
            }
            for (let i = 4; i < 12; i += 2) {
                const container = document.querySelector('.w1-l1');
                // Create matchups container
                const matchupsContainer = document.createElement('div');
                matchupsContainer.classList.add('matchups');
                // Create matchup div
                const matchupDiv = document.createElement('div');
                matchupDiv.classList.add('matchup');

                // Create first team div
                const team1Div = document.createElement('div');
                team1Div.classList.add('team');

                // Create logo-team div for team 1
                const logoTeam1Div = document.createElement('div');
                logoTeam1Div.classList.add('logo-team');
                const logoTeam1Img = document.createElement('img');
                const regex = /\/d\/(.+?)\/view/;
                let link_drive_image = valueE[i]; // Use even value cell
                const logoteamA = link_drive_image.match(regex);
                const fileIdA = logoteamA[1];
                logoTeam1Img.src = `https://drive.google.com/thumbnail?id=${fileIdA}`;
                logoTeam1Img.alt = '';
                logoTeam1Div.appendChild(logoTeam1Img);
                team1Div.appendChild(logoTeam1Div);

                // Create score div for team 1
                const score1Div = document.createElement('div');
                score1Div.classList.add('score');
                const score1P = document.createElement('p');
                score1P.textContent = valueF[i]; // Set score for team 1
                score1Div.appendChild(score1P);
                team1Div.appendChild(score1Div);

                // Append team 1 div to matchup div
                matchupDiv.appendChild(team1Div);

                // Create second team div
                const team2Div = document.createElement('div');
                team2Div.classList.add('team');

                // Create logo-team div for team 2
                const logoTeam2Div = document.createElement('div');
                logoTeam2Div.classList.add('logo-team');
                const logoTeam2Img = document.createElement('img');
                const link_drive_image_B = valueE[i + 1];
                const logoteamB = link_drive_image_B.match(regex);
                const fileIdB = logoteamB[1];
                logoTeam2Img.src = `https://drive.google.com/thumbnail?id=${fileIdB}`;
                logoTeam2Img.alt = '';
                logoTeam2Div.appendChild(logoTeam2Img);
                team2Div.appendChild(logoTeam2Div);

                // Create score div for team 2
                const score2Div = document.createElement('div');
                score2Div.classList.add('score');
                const score2P = document.createElement('p');
                score2P.textContent = valueF[i + 1]; // Set score for team 2
                score2Div.appendChild(score2P);
                team2Div.appendChild(score2Div);
                // Append team 2 div to matchup div
                matchupDiv.appendChild(team2Div);
                // Append matchup div to matchups container
                matchupsContainer.appendChild(matchupDiv);
                // Append matchups container to the container with class w0-l0
                container.appendChild(matchupsContainer);
            }
            for (let i = 12; i < 16; i += 2) {
                const container = document.querySelector('.w0-l2');
                // Create matchups container
                const matchupsContainer = document.createElement('div');
                matchupsContainer.classList.add('matchups');
                // Create matchup div
                const matchupDiv = document.createElement('div');
                matchupDiv.classList.add('matchup');

                // Create first team div
                const team1Div = document.createElement('div');
                team1Div.classList.add('team');

                // Create logo-team div for team 1
                const logoTeam1Div = document.createElement('div');
                logoTeam1Div.classList.add('logo-team');
                const logoTeam1Img = document.createElement('img');
                const regex = /\/d\/(.+?)\/view/;
                let link_drive_image = valueE[i]; // Use even value cell
                const logoteamA = link_drive_image.match(regex);
                const fileIdA = logoteamA[1];
                logoTeam1Img.src = `https://drive.google.com/thumbnail?id=${fileIdA}`;
                logoTeam1Img.alt = '';
                logoTeam1Div.appendChild(logoTeam1Img);
                team1Div.appendChild(logoTeam1Div);

                // Create score div for team 1
                const score1Div = document.createElement('div');
                score1Div.classList.add('score');
                const score1P = document.createElement('p');
                score1P.textContent = valueF[i]; // Set score for team 1
                score1Div.appendChild(score1P);
                team1Div.appendChild(score1Div);

                // Append team 1 div to matchup div
                matchupDiv.appendChild(team1Div);

                // Create second team div
                const team2Div = document.createElement('div');
                team2Div.classList.add('team');

                // Create logo-team div for team 2
                const logoTeam2Div = document.createElement('div');
                logoTeam2Div.classList.add('logo-team');
                const logoTeam2Img = document.createElement('img');
                const link_drive_image_B = valueE[i + 1];
                const logoteamB = link_drive_image_B.match(regex);
                const fileIdB = logoteamB[1];
                logoTeam2Img.src = `https://drive.google.com/thumbnail?id=${fileIdB}`;
                logoTeam2Img.alt = '';
                logoTeam2Div.appendChild(logoTeam2Img);
                team2Div.appendChild(logoTeam2Div);

                // Create score div for team 2
                const score2Div = document.createElement('div');
                score2Div.classList.add('score');
                const score2P = document.createElement('p');
                score2P.textContent = valueF[i + 1]; // Set score for team 2
                score2Div.appendChild(score2P);
                team2Div.appendChild(score2Div);
                // Append team 2 div to matchup div
                matchupDiv.appendChild(team2Div);
                // Append matchup div to matchups container
                matchupsContainer.appendChild(matchupDiv);
                // Append matchups container to the container with class w0-l0
                container.appendChild(matchupsContainer);
            }
            for (let i = 0; i < 6; i += 2) {
                const container = document.querySelector('.w2-l1');
                // Create matchups container
                const matchupsContainer = document.createElement('div');
                matchupsContainer.classList.add('matchups');
                // Create matchup div
                const matchupDiv = document.createElement('div');
                matchupDiv.classList.add('matchup');

                // Create first team div
                const team1Div = document.createElement('div');
                team1Div.classList.add('team');

                // Create logo-team div for team 1
                const logoTeam1Div = document.createElement('div');
                logoTeam1Div.classList.add('logo-team');
                const logoTeam1Img = document.createElement('img');
                const regex = /\/d\/(.+?)\/view/;
                let link_drive_image = valueG[i]; // Use even value cell
                const logoteamA = link_drive_image.match(regex);
                const fileIdA = logoteamA[1];
                logoTeam1Img.src = `https://drive.google.com/thumbnail?id=${fileIdA}`;
                logoTeam1Img.alt = '';
                logoTeam1Div.appendChild(logoTeam1Img);
                team1Div.appendChild(logoTeam1Div);

                // Create score div for team 1
                const score1Div = document.createElement('div');
                score1Div.classList.add('score');
                const score1P = document.createElement('p');
                score1P.textContent = valueH[i]; // Set score for team 1
                score1Div.appendChild(score1P);
                team1Div.appendChild(score1Div);

                // Append team 1 div to matchup div
                matchupDiv.appendChild(team1Div);

                // Create second team div
                const team2Div = document.createElement('div');
                team2Div.classList.add('team');

                // Create logo-team div for team 2
                const logoTeam2Div = document.createElement('div');
                logoTeam2Div.classList.add('logo-team');
                const logoTeam2Img = document.createElement('img');
                const link_drive_image_B = valueG[i + 1];
                const logoteamB = link_drive_image_B.match(regex);
                const fileIdB = logoteamB[1];
                logoTeam2Img.src = `https://drive.google.com/thumbnail?id=${fileIdB}`;
                logoTeam2Img.alt = '';
                logoTeam2Div.appendChild(logoTeam2Img);
                team2Div.appendChild(logoTeam2Div);

                // Create score div for team 2
                const score2Div = document.createElement('div');
                score2Div.classList.add('score');
                const score2P = document.createElement('p');
                score2P.textContent = valueH[i + 1]; // Set score for team 2
                score2Div.appendChild(score2P);
                team2Div.appendChild(score2Div);
                // Append team 2 div to matchup div
                matchupDiv.appendChild(team2Div);
                // Append matchup div to matchups container
                matchupsContainer.appendChild(matchupDiv);
                // Append matchups container to the container with class w0-l0
                container.appendChild(matchupsContainer);
            }
            for (let i = 6; i < 12; i += 2) {
                const container = document.querySelector('.w1-l2');
                // Create matchups container
                const matchupsContainer = document.createElement('div');
                matchupsContainer.classList.add('matchups');
                // Create matchup div
                const matchupDiv = document.createElement('div');
                matchupDiv.classList.add('matchup');

                // Create first team div
                const team1Div = document.createElement('div');
                team1Div.classList.add('team');

                // Create logo-team div for team 1
                const logoTeam1Div = document.createElement('div');
                logoTeam1Div.classList.add('logo-team');
                const logoTeam1Img = document.createElement('img');
                const regex = /\/d\/(.+?)\/view/;
                let link_drive_image = valueG[i]; // Use even value cell
                const logoteamA = link_drive_image.match(regex);
                const fileIdA = logoteamA[1];
                logoTeam1Img.src = `https://drive.google.com/thumbnail?id=${fileIdA}`;
                logoTeam1Img.alt = '';
                logoTeam1Div.appendChild(logoTeam1Img);
                team1Div.appendChild(logoTeam1Div);

                // Create score div for team 1
                const score1Div = document.createElement('div');
                score1Div.classList.add('score');
                const score1P = document.createElement('p');
                score1P.textContent = valueH[i]; // Set score for team 1
                score1Div.appendChild(score1P);
                team1Div.appendChild(score1Div);

                // Append team 1 div to matchup div
                matchupDiv.appendChild(team1Div);

                // Create second team div
                const team2Div = document.createElement('div');
                team2Div.classList.add('team');

                // Create logo-team div for team 2
                const logoTeam2Div = document.createElement('div');
                logoTeam2Div.classList.add('logo-team');
                const logoTeam2Img = document.createElement('img');
                const link_drive_image_B = valueG[i + 1];
                const logoteamB = link_drive_image_B.match(regex);
                const fileIdB = logoteamB[1];
                logoTeam2Img.src = `https://drive.google.com/thumbnail?id=${fileIdB}`;
                logoTeam2Img.alt = '';
                logoTeam2Div.appendChild(logoTeam2Img);
                team2Div.appendChild(logoTeam2Div);

                // Create score div for team 2
                const score2Div = document.createElement('div');
                score2Div.classList.add('score');
                const score2P = document.createElement('p');
                score2P.textContent = valueH[i + 1]; // Set score for team 2
                score2Div.appendChild(score2P);
                team2Div.appendChild(score2Div);
                // Append team 2 div to matchup div
                matchupDiv.appendChild(team2Div);
                // Append matchup div to matchups container
                matchupsContainer.appendChild(matchupDiv);
                // Append matchups container to the container with class w0-l0
                container.appendChild(matchupsContainer);
            }
            for (let i = 0; i < 6; i += 2) {
                const container = document.querySelector('.w2-l2');
                // Create matchups container
                const matchupsContainer = document.createElement('div');
                matchupsContainer.classList.add('matchups');
                // Create matchup div
                const matchupDiv = document.createElement('div');
                matchupDiv.classList.add('matchup');

                // Create first team div
                const team1Div = document.createElement('div');
                team1Div.classList.add('team');

                // Create logo-team div for team 1
                const logoTeam1Div = document.createElement('div');
                logoTeam1Div.classList.add('logo-team');
                const logoTeam1Img = document.createElement('img');
                const regex = /\/d\/(.+?)\/view/;
                let link_drive_image = valueI[i]; // Use even value cell
                const logoteamA = link_drive_image.match(regex);
                const fileIdA = logoteamA[1];
                logoTeam1Img.src = `https://drive.google.com/thumbnail?id=${fileIdA}`;
                logoTeam1Img.alt = '';
                logoTeam1Div.appendChild(logoTeam1Img);
                team1Div.appendChild(logoTeam1Div);

                // Create score div for team 1
                const score1Div = document.createElement('div');
                score1Div.classList.add('score');
                const score1P = document.createElement('p');
                score1P.textContent = valueJ[i]; // Set score for team 1
                score1Div.appendChild(score1P);
                team1Div.appendChild(score1Div);

                // Append team 1 div to matchup div
                matchupDiv.appendChild(team1Div);

                // Create second team div
                const team2Div = document.createElement('div');
                team2Div.classList.add('team');

                // Create logo-team div for team 2
                const logoTeam2Div = document.createElement('div');
                logoTeam2Div.classList.add('logo-team');
                const logoTeam2Img = document.createElement('img');
                const link_drive_image_B = valueI[i + 1];
                const logoteamB = link_drive_image_B.match(regex);
                const fileIdB = logoteamB[1];
                logoTeam2Img.src = `https://drive.google.com/thumbnail?id=${fileIdB}`;
                logoTeam2Img.alt = '';
                logoTeam2Div.appendChild(logoTeam2Img);
                team2Div.appendChild(logoTeam2Div);

                // Create score div for team 2
                const score2Div = document.createElement('div');
                score2Div.classList.add('score');
                const score2P = document.createElement('p');
                score2P.textContent = valueJ[i + 1]; // Set score for team 2
                score2Div.appendChild(score2P);
                team2Div.appendChild(score2Div);
                // Append team 2 div to matchup div
                matchupDiv.appendChild(team2Div);
                // Append matchup div to matchups container
                matchupsContainer.appendChild(matchupDiv);
                // Append matchups container to the container with class w0-l0
                container.appendChild(matchupsContainer);
            }

            // Create eliminate-teams container
            eli = document.querySelector('.eliminate');
            const eliminateTeamsContainer = document.createElement('div');
            eliminateTeamsContainer.classList.add('eliminate-teams');

            // Create all-teams containeradvanceTeamsContainer
            const allTeamsContainerEli = document.createElement('div');
            allTeamsContainerEli.classList.add('all-teams-eli');

            // Loop through teams and create team elements
            valueM.forEach(teamName => {
                // Create team div
                const teamDiv = document.createElement('div');
                teamDiv.classList.add('team');

                // Create logo-team div
                const logoTeamDiv = document.createElement('div');
                logoTeamDiv.classList.add('logo-team');

                // Create team image
                const teamImg = document.createElement('img');
                const regex = /\/d\/(.+?)\/view/;
                let link_drive_image = teamName; // Use even value cell
                const logoteamA = link_drive_image.match(regex);
                const fileIdA = logoteamA[1];
                teamImg.src = `https://drive.google.com/thumbnail?id=${fileIdA}`;
                teamImg.alt = '';

                // Append team image to logo-team div
                logoTeamDiv.appendChild(teamImg);

                // Append logo-team div to team div
                teamDiv.appendChild(logoTeamDiv);

                // Append team div to all-teams container
                allTeamsContainerEli.appendChild(teamDiv);
            });

            // Append all-teams container to eliminate-teams container
            eliminateTeamsContainer.appendChild(allTeamsContainerEli);

            // Append eliminate-teams container to the document body or any other desired parent element
            eli.appendChild(eliminateTeamsContainer);


            adva = document.querySelector('.advance');
            const advanceTeamsContainer = document.createElement('div');
            advanceTeamsContainer.classList.add('advance-teams');

            // Create all-teams-win container
            const allTeamsWinContainer = document.createElement('div');
            allTeamsWinContainer.classList.add('all-teams-win');

            // Team data (position and logo)

            console.log(valueL);
            // Loop through teamsData and create team elements
            valueL.forEach(team => {
                // Create team div
                const teamDiv = document.createElement('div');
                teamDiv.classList.add('team');

                // Create position div
                const posDiv = document.createElement('div');
                posDiv.classList.add('pos');
                const posP = document.createElement('p');
                posP.textContent = team.position;
                posDiv.appendChild(posP);

                // Create logo-team div
                const logoTeamDiv = document.createElement('div');
                logoTeamDiv.classList.add('logo-team');

                // Create team image
                const teamImg = document.createElement('img');
                const regex = /\/d\/(.+?)\/view/;
                let link_drive_image = team.logo; // Use even value cell
                const logoteamA = link_drive_image.match(regex);
                const fileIdA = logoteamA[1];
                teamImg.src = `https://drive.google.com/thumbnail?id=${fileIdA}`;
                teamImg.alt = '';


                // Append elements to team div
                teamDiv.appendChild(posDiv);
                logoTeamDiv.appendChild(teamImg);
                teamDiv.appendChild(logoTeamDiv);

                // Append team div to all-teams-win container
                allTeamsWinContainer.appendChild(teamDiv);
            });

            // Append all-teams-win container to advance-teams container
            advanceTeamsContainer.appendChild(allTeamsWinContainer);

            // Append advance-teams container to the document body or any other desired parent element
            adva.appendChild(advanceTeamsContainer);

        });
});
function openModal(modalNum) {
    var modal = document.getElementById("myModal" + modalNum);
    modal.style.display = "block";
  }
  
  // Function to close the modal
  function closeModal(modalNum) {
    var modal = document.getElementById("myModal" + modalNum);
    modal.style.display = "none";
  }
  
  // Close the modal when clicking outside of it
  window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = "none";
    }
  }