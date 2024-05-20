document.addEventListener('DOMContentLoaded', async function() {
    const SHEET_ID = '1s2Lyk37v-hZcg7-_ag8S1Jq3uaeRR8u-oG0zviSc26E';

    const sheets = [
        { title: 'Match', range: 'A2:M201', processData: processStatVongBangData },
        { title: 'Swiss Stage', range: 'A2:L52', processData: processSwissStageData },
        { title: 'Sheet3', range: 'A1:U37', processData: processLienquanAData }
    ];

    const fetchSheetData = async (title, range) => {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${title}&range=${range}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from sheet: ${title}`);
        }
        const text = await response.text();
        const jsonData = JSON.parse(text.substr(47).slice(0, -2));
        return jsonData;
    };

    try {
        const fetchPromises = sheets.map(sheet => fetchSheetData(sheet.title, sheet.range));
        const results = await Promise.all(fetchPromises);
        
        results.forEach((data, index) => {
            sheets[index].processData(data);
        });
    } catch (error) {
        console.error('Error occurred:', error);
    }
});

async function processStatVongBangData(data) {
    // Process and display data for stat_vong_bang.js
    try {
        const fetchAndCreateTableRows = async (data, startIndex, targetID) => {
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
            { title: 'Match', range: 'A2:M201', targetLeft: 'team-left-A-', targetRight: 'team-right-A-' },
        ];

        const SHEET_ID = '1s2Lyk37v-hZcg7-_ag8S1Jq3uaeRR8u-oG0zviSc26E';
        const fetchPromises = sheets.map(async (sheet) => {
            const fullURL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${sheet.title}&range=${sheet.range}`;
            
            const res = await fetch(fullURL);
            if (!res.ok) {
                throw new Error(`Failed to fetch ${sheet.title} data: ${res.status} ${res.statusText}`);
            }

            const rep = await res.text();
            const data = JSON.parse(rep.substr(47).slice(0, -2));
            return { sheet, data };
        });

        const sheetsData = await Promise.all(fetchPromises);

        const processSheetPromises = sheetsData.flatMap(({ sheet, data }) => {
            const leftPromises = [];
            const rightPromises = [];
            for (let i = 0; i < 20; i++) {
                leftPromises.push(fetchAndCreateTableRows(data, i * 10, `${sheet.targetLeft}${i + 1}`));
                rightPromises.push(fetchAndCreateTableRows(data, (i * 10) + 5, `${sheet.targetRight}${i + 1}`));
            }
            return [...leftPromises, ...rightPromises];
        });

        await Promise.all(processSheetPromises);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}


function processSwissStageData(data) {
    let rowData = data.table.rows.slice(35, 44);
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
                valueA.push(data.table.rows[i]?.c[0]?.v ?? null);
                valueB.push(data.table.rows[i]?.c[1]?.v ?? null);
                valueC.push(data.table.rows[i]?.c[2]?.v ?? null);
                valueD.push(data.table.rows[i]?.c[3]?.v ?? null);
                valueE.push(data.table.rows[i]?.c[4]?.v ?? null);
                valueF.push(data.table.rows[i]?.c[5]?.v ?? null);

            }
            for (let i = 0; i < 8; i++) {
                valueK[data.table.rows[i]?.c[10]?.v ?? null] = data.table.rows[i]?.c[11]?.v ?? null;

            }
            for (let position in valueK) {
                valueL.push({ position: parseInt(position), logo: valueK[position] });
            }
            for (let k = 0; k < 12; k++) {
                valueG.push(data.table.rows[k]?.c[6]?.v ?? null);
                valueH.push(data.table.rows[k]?.c[7]?.v ?? null);
            }
            for (let k = 0; k < 6; k++) {
                valueI.push(data.table.rows[k]?.c[8]?.v ?? null);
                valueJ.push(data.table.rows[k]?.c[9]?.v ?? null);
            }
            for (let i = 8; i < 16; i++) {
                valueM.push(data.table.rows[i]?.c[11]?.v ?? null);
            }
            // Create matchups container
            const matchupsContainer = document.createElement('div');
            matchupsContainer.classList.add('matchups');

            // Loop to create each matchup
            function createTeamDiv(logoSrc, score) {
                const teamDiv = document.createElement('div');
                teamDiv.classList.add('team');
            
                const logoTeamDiv = document.createElement('div');
                logoTeamDiv.classList.add('logo-team');
                const logoImg = document.createElement('img');
                logoImg.src = logoSrc;
                logoImg.alt = '';
                logoTeamDiv.appendChild(logoImg);
                teamDiv.appendChild(logoTeamDiv);
            
                const scoreDiv = document.createElement('div');
                scoreDiv.classList.add('score');
                const scoreP = document.createElement('p');
                scoreP.textContent = score;
                scoreDiv.appendChild(scoreP);
                teamDiv.appendChild(scoreDiv);
            
                return teamDiv;
            }
            
            function createModal(i, rowData, group, amountplus, col) {
                const mymodelid = document.createElement('div');
                mymodelid.id = "myModal" + group + i;
                mymodelid.classList.add('modal');
            
                const modal_content = document.createElement('div');
                modal_content.classList.add('modal-content');
                modal_content.id = 'matchid' + group + (i / 2 + 1 + amountplus);
            
                const close_span = document.createElement('span');
                close_span.classList.add('close');
                close_span.innerHTML = '&times;';
                close_span.addEventListener('click', function () { closeModal(i, group); });
            
                const map_pick_label = document.createElement('p');
                map_pick_label.classList.add("map_pick_label");
                map_pick_label.innerHTML = 'Map pick';
            
                const img_pick = document.createElement('img');
                img_pick.classList.add("map_pick");
            
                // Debugging output

            
                if (rowData[i / 2 + 1] && rowData[i / 2 + 1].c && rowData[i / 2 + 1].c[col]) {

                    img_pick.src = "image/" + rowData[i / 2 + 1].c[col].v + ".jpg";
                }
            
                modal_content.appendChild(close_span);
                modal_content.appendChild(map_pick_label);
                modal_content.appendChild(img_pick);
                mymodelid.appendChild(modal_content);
            
                return mymodelid;
            }
            
            function createMatchup(i, valueA, valueB, rowData, containerClass,group,amountplus,col) {
                const container = document.querySelector(containerClass);
                const matchupsContainer = document.createElement('div');
                matchupsContainer.classList.add('matchups');
                matchupsContainer.appendChild(createModal(i, rowData,group,amountplus,col));
            
                const link_info_match = document.createElement('a');
                link_info_match.classList.add('link-match-info');
                link_info_match.onclick = function () { openModal(i,group); };
            
                const matchupDiv = document.createElement('div');
                matchupDiv.classList.add('matchup');
            
                const regex = /\/d\/(.+?)\/view/;
            
                let link_drive_image_A = valueA[i];
                const fileIdA = link_drive_image_A.match(regex)[1];
                const logoSrcA = `https://drive.google.com/thumbnail?id=${fileIdA}`;
                const team1Div = createTeamDiv(logoSrcA, valueB[i]);
                matchupDiv.appendChild(team1Div);
            
                let link_drive_image_B = valueA[i + 1];
                const fileIdB = link_drive_image_B.match(regex)[1];
                const logoSrcB = `https://drive.google.com/thumbnail?id=${fileIdB}`;
                const team2Div = createTeamDiv(logoSrcB, valueB[i + 1]);
                matchupDiv.appendChild(team2Div);
            
                link_info_match.appendChild(matchupDiv);
                matchupsContainer.appendChild(link_info_match);
                container.appendChild(matchupsContainer);
            }
            
            for (let i = 0; i < 16; i += 2) {
                createMatchup(i, valueA, valueB, rowData, '.w0-l0',"A",0,0);
            }
            for (let i = 0; i < 8; i += 2) {
                createMatchup(i, valueC, valueD, rowData, '.w1-l0',"B",8,1);
            }
            for (let i = 8; i < 16; i += 2) {
                createMatchup(i, valueC, valueD, rowData, '.w0-l1',"B",8,1);
            }
            for (let i = 0; i < 4; i += 2) {
                createMatchup(i, valueE, valueF, rowData, '.w2-l0',"C",16,3);
            }
            for (let i = 4; i < 12; i += 2) {
                createMatchup(i, valueE, valueF, rowData, '.w1-l1',"C",16,4);
            }
            for (let i = 12; i < 16; i += 2) {
                createMatchup(i, valueE, valueF, rowData, '.w0-l2',"C",16,5);
            }
            for (let i = 0; i < 6; i += 2) {
                createMatchup(i, valueG, valueH, rowData, '.w2-l1',"D",24,6);
            }
            for (let i = 6; i < 12; i += 2) {
                createMatchup(i, valueG, valueH, rowData, '.w1-l2',"D",24,7);
            }
            for (let i = 0; i < 6; i += 2) {
                createMatchup(i, valueI, valueJ, rowData, '.w2-l2',"E",30,8);
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
}

function processLienquanAData(data) {
    function getGroup(i) {
        if (i < 8) {
          return 'A';
        } else if (i < 16) {
          return 'B';
        } else if (i < 24) {
          return 'C';
        } else if (i < 30) { // Change this condition to cover 25 to 32 inclusive
          return 'D';
        } else {
          return 'E';
        }
      }

      for (let i = 0; i < data.table.rows.length; i++) {
        let group = getGroup(i);
        let dataBody = document.getElementById('matchid'+group+(i+1));
        let rowData = data.table.rows[i].c;
        
        let link = document.createElement('div');
        link.classList.add('showWords1')
  
  
        let rowDiv = document.createElement('div');
        rowDiv.classList.add('row2');
        // Create a container div for each row
        let rowDiv1 = document.createElement('div');
        rowDiv1.classList.add('row1');
  
        // Create a team div to wrap the team logo and name
        let teamDiv1 = document.createElement('div');
        teamDiv1.classList.add('team');
  
        // Create an image element for the team logo
        let img1 = document.createElement('img');
        img1.classList.add('team-logo');
        let imglogo_left = rowData[0].v;
        const regex = /\/d\/(.+?)\/view/;
        const logoteam_left = imglogo_left.match(regex);
            const fileId_left = logoteam_left[1];
        img1.src = `https://drive.google.com/thumbnail?id=${fileId_left}`; // Set the image source from the data
        img1.alt = rowData[1].v + ' Logo'; // Set the alt text based on the team name
        teamDiv1.appendChild(img1);
        let span1 = document.createElement('span');
        span1.classList.add('team-name');
        teamDiv1.appendChild(span1);
        rowDiv1.appendChild(teamDiv1);
  
  
  
        // Append the team div to the row div
  
  
        // Create a score container div
        let scoreContainerDiv = document.createElement('div');
        scoreContainerDiv.classList.add('score-container');
  
        // Create a parent span to group score-left, 'gach', score-right, and winner
        let scoreSpan = document.createElement('span');
        scoreSpan.classList.add('score');
  
        let span2 = document.createElement('span');
        span2.textContent = rowData[3].v;
        span2.classList.add('score-left'); // Add the 'score-left' class
  
        let gachSpan = document.createElement('span');
        gachSpan.textContent = '-';
        gachSpan.classList.add('gach'); // Add the 'gach' class
  
        let span3 = document.createElement('span');
        span3.textContent = rowData[4].v;
        span3.classList.add('score-right'); // Add the 'score-right' class
  
        let winnerSpan = document.createElement('span');
        let loseSpan = document.createElement('span');
        winnerSpan.classList.add('winner');
        loseSpan.classList.add('loser');
        // Check for the winner condition
  
        // Create a team div to wrap the team name and logo
        let teamDiv2 = document.createElement('div');
        teamDiv2.classList.add('team');
        let span4 = document.createElement('span');
        span4.classList.add('team-name');
        teamDiv2.appendChild(span4);
        rowDiv1.appendChild(teamDiv2);
  
        function updateTextContent() {
          if (window.innerWidth > 768) {
            span1.textContent = rowData[1].v;
            span4.textContent = rowData[6].v;
          } else {
            span1.textContent = rowData[2].v;
            span4.textContent = rowData[5].v;
          }
        }
        // Initial setup based on window width
        updateTextContent();
  
        // Update text content on window resize
        window.addEventListener('resize', updateTextContent);
        // Create an image element for the team logo
        let img2 = document.createElement('img');
        img2.classList.add('team-logo');
        let imglogo_right = rowData[7].v;
        const logoteam_right = imglogo_right.match(regex);
        const fileId_right = logoteam_right[1];
        img2.src = `https://drive.google.com/thumbnail?id=${fileId_right}`; // Set the image source from the data
        img2.alt = rowData[6].v + ' Logo'; // Set the alt text based on the team name
        teamDiv2.appendChild(img2);
  
        if (parseInt(rowData[3].v) > parseInt(rowData[4].v)) {
          img2.classList.add('loser-darker');
          span4.classList.add('loser-darker');
          img1.classList.add('winner-brighter');
          span1.classList.add('winner-brighter');
          winnerSpan.textContent = '<'; // Set the text for winnerSpan
          loseSpan.textContent = '\u2009'; // Set the text for loseSpan
          // Add the 'winner' class
          scoreSpan.appendChild(winnerSpan);
          scoreSpan.appendChild(span2);
          scoreSpan.appendChild(gachSpan);
          scoreSpan.appendChild(span3);
          scoreSpan.appendChild(loseSpan)
  
        }
  
        else if (parseInt(rowData[3].v) < parseInt(rowData[4].v)) {
          img1.classList.add('loser-darker');
          span1.classList.add('loser-darker');
          img2.classList.add('winner-brighter');
          span4.classList.add('winner-brighter');
          winnerSpan.textContent = '>'; // Set the text for winnerSpan
          loseSpan.textContent = '\u2009'; // Set the text for loseSpan
          winnerSpan.classList.add('loser'); // Add the 'winner' class
          scoreSpan.appendChild(loseSpan)
          scoreSpan.appendChild(span2);
          scoreSpan.appendChild(gachSpan);
          scoreSpan.appendChild(span3);
          scoreSpan.appendChild(winnerSpan);
        } else {
          // No winner, just display the scores with 'gach' in the middle
          scoreSpan.appendChild(span2);
          scoreSpan.appendChild(gachSpan);
          scoreSpan.appendChild(span3);
        }
  
        scoreContainerDiv.appendChild(scoreSpan);
        rowDiv1.appendChild(scoreContainerDiv);
  
  
        //create score info breakdown
        let score_break_down = document.createElement('div');
        score_break_down.classList.add('wordBox1');
        let team_left = document.createElement('div');
        team_left.classList.add('team-left');
        let team1 = document.createElement('p');
        team1.classList.add('team-name');
        team1.textContent = rowData[1].v;
        team_left.appendChild(team1);

 



        let stat_left = document.createElement('div');
        stat_left.classList.add('stat-left');
        let kda_left = document.createElement('p');
        kda_left.classList.add('kda');
        kda_left.textContent = `K/D/A: ${rowData[15].v}/${rowData[17].v}/${rowData[19].v}`;
        stat_left.appendChild(kda_left);
        team_left.appendChild(stat_left);
        
  
  
  
        let table_left = document.createElement('table');
        table_left.classList.add('team1');
        let thead_left = document.createElement('thead');
        let th_thead_left0 = document.createElement('th');
        
        let th_thead_left1 = document.createElement('th');
        th_thead_left1.classList.add("first-col");
        th_thead_left1.textContent = 'AVG Score';
        let th_thead_left2 = document.createElement('th');
        th_thead_left2.textContent = 'K';
        let th_thead_left3 = document.createElement('th');
        th_thead_left3.textContent = 'D';
        let th_thead_left4 = document.createElement('th');
        th_thead_left4.textContent = 'A';
        let th_thead_left5 = document.createElement('th');
        th_thead_left5.textContent = '+/-';
        let th_thead_left6 = document.createElement('th');
        th_thead_left6.textContent = 'K/D';
        let th_thead_left7 = document.createElement('th');
        th_thead_left7.textContent = 'ADR';
        let th_thead_left8 = document.createElement('th');
        th_thead_left8.textContent = 'HS';
        let th_thead_left9 = document.createElement('th');
        th_thead_left9.textContent = 'KAST (%)';
        let th_thead_left10 = document.createElement('th');
        th_thead_left10.textContent = 'FK';
        let th_thead_left11 = document.createElement('th');
        th_thead_left11.textContent = 'MK';
        let tbody_left = document.createElement('tbody');
        tbody_left.id = `team-left-A-${i + 1}`;
        let tr_table_left = document.createElement('tr');
        tr_table_left.classList.add('title');

        let team_right = document.createElement('div');
        team_right.classList.add('team-right');
        let team2 = document.createElement('p');
        team2.classList.add('team-name');
        team2.textContent = rowData[6].v;
        team_right.appendChild(team2)

  
        
        let stat_right = document.createElement('div');
        stat_right.classList.add('stat-right');
        let kda_right = document.createElement('p');
        kda_right.classList.add('kda');
        kda_right.textContent = `K/D/A: ${rowData[16].v}/${rowData[18].v}/${rowData[20].v}`;
        stat_right.appendChild(kda_right);
        team_right.appendChild(stat_right);

  
  
  
        let table_right = document.createElement('table');
        table_right.classList.add('team2');
  
  
        let th_thead_right0 = document.createElement('th');
        let thead_right = document.createElement('thead');
        let th_thead_right1 = document.createElement('th');
        th_thead_right1.classList.add("first-col");
        th_thead_right1.textContent = 'AVG Score';
        let th_thead_right2 = document.createElement('th');
        th_thead_right2.textContent = 'K';
        let th_thead_right3 = document.createElement('th');
        th_thead_right3.textContent = 'D';
        let th_thead_right4 = document.createElement('th');
        th_thead_right4.textContent = 'A';
        let th_thead_right5 = document.createElement('th');
        th_thead_right5.textContent = '+/-';
        let th_thead_right6 = document.createElement('th');
        th_thead_right6.textContent = 'K/D';
        let th_thead_right7 = document.createElement('th');
        th_thead_right7.textContent = 'ADR';
        let th_thead_right8 = document.createElement('th');
        th_thead_right8.textContent = 'HS';
        let th_thead_right9 = document.createElement('th');
        th_thead_right9.textContent = 'KAST (%)';
        let th_thead_right10 = document.createElement('th');
        th_thead_right10.textContent = 'FK';
        let th_thead_right11 = document.createElement('th');
        th_thead_right11.textContent = 'MK';
        let tbody_right = document.createElement('tbody');
        tbody_right.id = `team-right-A-${i + 1}`;
        let tr_table_right = document.createElement('tr');
        tr_table_right.classList.add('title');
  
  
  
        thead_left.appendChild(tr_table_left);
        tr_table_left.appendChild(th_thead_left0);
        tr_table_left.appendChild(th_thead_left1);
        tr_table_left.appendChild(th_thead_left2);
        tr_table_left.appendChild(th_thead_left3);
        tr_table_left.appendChild(th_thead_left4);
        tr_table_left.appendChild(th_thead_left5);
        tr_table_left.appendChild(th_thead_left6);
        tr_table_left.appendChild(th_thead_left7);
        tr_table_left.appendChild(th_thead_left8);
        tr_table_left.appendChild(th_thead_left9);
        tr_table_left.appendChild(th_thead_left10);
        tr_table_left.appendChild(th_thead_left11);
        table_left.appendChild(thead_left);
        table_left.appendChild(tbody_left);
        team_left.appendChild(table_left);
        score_break_down.appendChild(team_left);
        let div_table_left = document.createElement('div');
        div_table_left.classList.add('wrapper');
        div_table_left.appendChild(table_left);
        team_left.appendChild(div_table_left);
  
  
        thead_right.appendChild(tr_table_right);
        tr_table_right.appendChild(th_thead_right0);
        tr_table_right.appendChild(th_thead_right1);
        tr_table_right.appendChild(th_thead_right2);
        tr_table_right.appendChild(th_thead_right3);
        tr_table_right.appendChild(th_thead_right4);
        tr_table_right.appendChild(th_thead_right5);
        tr_table_right.appendChild(th_thead_right6);
        tr_table_right.appendChild(th_thead_right7);
        tr_table_right.appendChild(th_thead_right8);
        tr_table_right.appendChild(th_thead_right9);
        tr_table_right.appendChild(th_thead_right10);
        tr_table_right.appendChild(th_thead_right11);
        table_right.appendChild(thead_right);
        table_right.appendChild(tbody_right);
        team_right.appendChild(table_right);
        score_break_down.appendChild(team_right);
        let div_table_right = document.createElement('div');
        div_table_right.classList.add('wrapper');
        div_table_right.appendChild(table_right);
        team_right.appendChild(div_table_right);
  
        // Append the team div to the row div
        rowDiv1.appendChild(teamDiv2);
        rowDiv.appendChild(rowDiv1);
        rowDiv.appendChild(score_break_down);
        link.appendChild(rowDiv)
        // Append the row div to the dataBody
        dataBody.appendChild(link);
      }
}
function openModal(modalNum,group) {
    var modal = document.getElementById("myModal"+group + modalNum);
    modal.style.display = "block";
  }
  
  // Function to close the modal
  function closeModal(modalNum,group) {
    var modal = document.getElementById("myModal"+group + modalNum);
    modal.style.display = "none";
  }
  
  // Close the modal when clicking outside of it
  window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
      event.target.style.display = "none";
    }
  }