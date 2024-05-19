document.addEventListener('DOMContentLoaded', function(){
  let SHEET_TITLE_QUALIFIER = 'Sheet3';
  let SHEET_RANGE_A = 'A1:U37';
  let SHEET_ID = '1s2Lyk37v-hZcg7-_ag8S1Jq3uaeRR8u-oG0zviSc26E';
  let FULL_URL_A_1 = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${SHEET_TITLE_QUALIFIER}&range=${SHEET_RANGE_A}`;
  
  fetch(FULL_URL_A_1)
    .then((res) => res.text())
    .then((rep) => {
      let data = JSON.parse(rep.substr(47).slice(0, -2));
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
        console.log('matchid'+group+(i+1));
        
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
      
    
    });
  });