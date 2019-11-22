// console.log('Haloo! suskses di load')
// console.log(new Date().getMonth());
let date = new Date();
let day = date.getDate();
let year = date.getFullYear();
let month = date.getMonth();
let nameOfMonth = date.toLocaleString('en-US', { month: 'long' });
let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
let today = date.toLocaleDateString('en-US',options)

function getNumberOfDays (year, month) {
  return new Date(year, month+1, 0).getDate()
}
function daysIntoYear(date){
  return (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 24 / 60 / 60 / 1000;
}

let thisMonthsNumberOfDays = getNumberOfDays(year, month)
// year progress
let yearProgress = Math.floor(daysIntoYear(date) / 365 * 100)


// Changing Value within DOM
document.getElementById('activeDate').textContent =  `${today}`
document.getElementById('year-progress').style = `width: ${yearProgress}%`
document.getElementById('year-progress').textContent = `${yearProgress}%`
document.getElementById('remainingDay').textContent = `${365 - daysIntoYear(date)}`
document.getElementById('moodBlock-month').textContent = nameOfMonth

// Generate random number between min and max
function random(min, max) {  
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function ord(n) {
  return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}

// generate for (now random) moodblocks
let moodBlocks = document.getElementById('moodBlocks')

for(let i=1; i<=thisMonthsNumberOfDays; i++){
  let gridContainer = document.createElement('div')
  gridContainer.className = 'grid-container justify-content-center'
  gridContainer.id = 'gridContainer-'+i
  
  let blockRowDate = document.createElement('div')
  blockRowDate.id = `blockRowDate-${i}`
  blockRowDate.appendChild(document.createTextNode(i))
  


  // append element to gridContainer
  gridContainer.appendChild(blockRowDate)
  let moodId = 0
  let moodArray = ['Amazing', 'Great', 'Average','Difficult','Very Though']
  for(let j=1; j<=12; j++){
    let gridItem = document.createElement('div')

    if(j<4 && i<day){
      moodId = random(1,3)
      gridItem.setAttribute('title',`on ${ord(i)}, my Morning was: ${moodArray[moodId-1]}`)
    }else if(j<7 && i<day){
      moodId = random(1,4)
      gridItem.setAttribute('title',`on ${ord(i)}, my Noon was: ${moodArray[moodId-1]}`)
    }else if(j<10 && i<day){
      moodId = random(1,5)
      gridItem.setAttribute('title',`on ${ord(i)}, my Afternoon was: ${moodArray[moodId-1]}`)
    }else if(j<=12 && i<day) {
      moodId = random(1,5)
      gridItem.setAttribute('title',`on ${ord(i)}, my Evening was: ${moodArray[moodId-1]}`)
    }

    gridItem.id = `gi-${j}`
    // jquery initialize tooltip on every brick
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })
    gridItem.setAttribute('data-toggle','tooltip')
    gridItem.setAttribute('data-placement','right')
    if(i == day){
      gridItem.className = `grid-item-today moodType-${moodId}`
    } else {
      gridItem.className = `grid-item moodType-${moodId}`
    }
    gridContainer.appendChild(gridItem)
  }
  
  moodBlocks.appendChild(gridContainer)
}
// console.log(gridContainer)
