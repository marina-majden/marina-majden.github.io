
// JS Templates
// Ternary Operator
(splitPhrase[i] != ' ') ? (li.appendChild(document.createTextNode(splitPhrase[i])), li.classList.add('letter'))// Style the li
      :(splitPhrase[i] == ' ')? (li.classList.add('space'), phrase.appendChild(document.createElement('UL')), word++)
      :null;// Count words

//Email Validation
document.getElementById('mail').addEventListener('keyup', function(){//real-time email validation
    let emailVal = document.getElementById('mail');
    if(document.getElementById('mail-error')){
        document.getElementById('mail-error').remove()
    }
    if (!emailVal.value.match(/^\w+[.]?[@][A-Za-z]+[.][A-Za-z]{3}$/)) {
        let emailErrorMsg = document.createRange().createContextualFragment(
        `<p id="mail-error">*ERROR: Looks like your email is either incomplete or not properly formatted!*</p>`
        );
        document.querySelector('form fieldset').insertBefore(emailErrorMsg, emailVal.nextSibling );
    }
});

// Pagination
function showStudents(students, currPage){
  
  for (let i = 0; i < students.length; i++) {
    students[i].style.display = 'none';
    if (i >= (currPage*10)-10 && i < currPage*10 ) {
      students[i].style.display = 'block';
    }

  }
}
// Clickable Video Transcript
//select Span elements for 
var transcript = document.querySelectorAll("span");
//style player and controls
video.addEventListener("timeupdate", function () {
    for (var _i = 0; _i < transcript.length; _i += 1) {
      transcript[_i].style.cursor = "text";
      if (video.currentTime > transcript[_i].getAttribute("data-start") && video.currentTime < transcript[_i].getAttribute("data-end")) {
        transcript[_i].style.color = "lightgreen";
      } else {
        transcript[_i].style.color = "";
      }
    }
  });


// Click event for body text - allows jumping to that part of the video
for (var i = 0; i < transcript.length; i += 1) {
    transcript[i].addEventListener("click", function (event) {
      video.currentTime = event.target.getAttribute("data-start");
    });                
  }

// Random Color Generator
//Function for generating a hex number for new random bG colors
function randomBgHex(){
  let randomHex = Math.floor(Math.random()*900000) + 100000;
  document.querySelector('body').style.backgroundColor = `#${randomHex}`;
}//end randomBgHex

// Random Quote Function From Array
function getRandomQuote(QuotesArray){
  let random = Math.floor(Math.random() * QuotesArray.length);
  let randomPhrase = QuotesArray[random];
  return randomPhrase;
}//end getRandomQuote
