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
            
            function createModal(i, rowData,group,amountplus) {
                const mymodelid = document.createElement('div');
                mymodelid.id = "myModal"+group + i;
                mymodelid.classList.add('modal');
            
                const modal_content = document.createElement('div');
                modal_content.classList.add('modal-content');
                modal_content.id = 'matchid'+group + (i / 2 + 1 + amountplus);
            
                const close_span = document.createElement('span');
                close_span.classList.add('close');
                close_span.innerHTML = '&times;';
                close_span.addEventListener('click', function () { closeModal(i,group); });
            
                const map_pick_label = document.createElement('p');
                map_pick_label.classList.add("map_pick_label");
                map_pick_label.innerHTML = 'Map pick';
            
                const img_pick = document.createElement('img');
                img_pick.classList.add("map_pick");
                img_pick.src = "image/" + rowData[i / 2 + 1].c[0].v + ".jpg";
            
                modal_content.appendChild(close_span);
                modal_content.appendChild(map_pick_label);
                modal_content.appendChild(img_pick);
                mymodelid.appendChild(modal_content);
            
                return mymodelid;
            }
            
            function createMatchup(i, valueA, valueB, rowData, containerClass,group,amountplus) {
                const container = document.querySelector(containerClass);
                const matchupsContainer = document.createElement('div');
                matchupsContainer.classList.add('matchups');
                matchupsContainer.appendChild(createModal(i, rowData,group,amountplus));
            
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
                createMatchup(i, valueA, valueB, rowData, '.w0-l0',"A",0);
            }
            for (let i = 0; i < 8; i += 2) {
                createMatchup(i, valueC, valueD, rowData, '.w1-l0',"B",8);
            }
            for (let i = 8; i < 16; i += 2) {
                createMatchup(i, valueC, valueD, rowData, '.w0-l1',"B",8);
            }
            for (let i = 0; i < 4; i += 2) {
                createMatchup(i, valueE, valueF, rowData, '.w2-l0',"C",16);
            }
            for (let i = 4; i < 12; i += 2) {
                createMatchup(i, valueE, valueF, rowData, '.w1-l1',"C",16);
            }
            for (let i = 12; i < 16; i += 2) {
                createMatchup(i, valueE, valueF, rowData, '.w0-l2',"C",16);
            }
            for (let i = 0; i < 6; i += 2) {
                createMatchup(i, valueG, valueH, rowData, '.w2-l1',"D",24);
            }
            for (let i = 6; i < 12; i += 2) {
                createMatchup(i, valueG, valueH, rowData, '.w1-l2',"D",24);
            }
            for (let i = 0; i < 6; i += 2) {
                createMatchup(i, valueI, valueJ, rowData, '.w2-l2',"E",30);
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