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
console.log(day, nameOfMonth, thisMonthsNumberOfDays);

// year progress
let yearProgress = Math.floor(daysIntoYear(date) / 365 * 100)




// Changing Value within DOM
document.getElementById('activeDate').textContent =  `${today}`
document.getElementById('year-progress').style = `width: ${yearProgress}%`
document.getElementById('year-progress').textContent = `${yearProgress}%`
document.getElementById('remainingDay').textContent = `${365 - daysIntoYear(date)}`
document.getElementById('moodBlock-month').textContent = nameOfMonth

// generate moodblocks
let moodBlocks = document.getElementById('moodBlocks')

for(let i=1; i<=thisMonthsNumberOfDays; i++){
  let gridContainer = document.createElement('div')
  gridContainer.className = 'grid-container justify-content-center'
  
  let blockRowDate = document.createElement('div')
  blockRowDate.id = `blockRowDate-${i}`
  blockRowDate.appendChild(document.createTextNode(i))
  
  // append element to gridContainer
  gridContainer.appendChild(blockRowDate)
  for(let j=1; j<=12; j++){
    let gridItem = document.createElement('div')
    gridItem.id = `gi-${j}`
    if(i == day){
      gridItem.className = 'grid-item-today'
    } else {
      gridItem.className = 'grid-item'
    }
    gridContainer.appendChild(gridItem)
  }
  
  moodBlocks.appendChild(gridContainer)
}
// console.log(gridContainer)
