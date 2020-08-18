// This display's current date 
let CurrentDay = moment().format();

// Local storage for input
function getLocalStorage(x) {
  let input = localStorage.getItem(x);
  if (input) {
    // console log
    console.log('Updating', x, 'with this from local storage', input)
    $(`#text${x}`).text(input);
  }
}
// This Function is for the current day
$(document).ready(function () {
  $("#currentDay").text(moment().format("dddd, MMMM Do YYYY"));
  // console log
  console.log('The current time is', moment().hours())
  let currentHour = moment().hours()
  for (let i = 9; i < 18; i++) {


    // create a row
    let row = $(`<div data-time=${i} id='${i}' class="row time-block"></div>`);

    // create a column
    let col1 = $('<div class="col-sm-2 hour">' + i + 'am' + '</div>');

    if (i > 12) {
      let newDisplay = i - 12
      newDisplay += 'pm'
      col1.text(newDisplay)
    }

    //create column 2
    let col2 = $(`<textarea id=text${i} class="description col-sm-8" placeholder="Add your event here..."></textarea>`);
    if (i == currentHour) {
      col2.addClass("present");
    } else if (currentHour > i) {
      col2.addClass("past");
    } else if (currentHour < i) {
      col2.addClass('future')
    }
    //create column 3
    let col3 = $(`<button id=${i}  class="saveButton col-sm-2 fas fa-save"></button>`)

    row.append(col1);
    row.append(col2);
    row.append(col3);

    // Adds rows to container
    $(".container").append(row);

    getLocalStorage(i);
  }


  let saveButton = $('.saveButton');
  saveButton.on('click', function () {
    let eventId = $(this).attr('id');
    let eventText = $(this).siblings('.description').val();
    // console log 
    console.log('Saving', eventText, 'to local storage', eventId)
    localStorage.setItem(eventId, eventText);
  });

});