
import Typed from 'typed.js'
import $ from 'jquery'
import AOS from 'aos'

//  typing animaton 
const strings_for_small_window = ["I am</br> Shivam", "A</br> Web</br> Developer", "Loves Design", "Don't drink</br> &#9749; ^500", "&#128515; ^800"]
const strings_for_big_window = ["I am Shivam Gupta", "A Web Developer", "Loves Design", "Don't drink</br> <span class='highlight'>&#9749;<span> ^500", "<span class='highlight'>&#128515;</span> ^800"]


let windowWidth = window.innerWidth

let strings = windowWidth < 400 ? 
                  strings_for_small_window : 
                  strings_for_big_window 

window.addEventListener('resize',() => {
    windowWidth = window.innerWidth

    strings = windowWidth < 400 ? 
                      strings_for_small_window : 
                      strings_for_big_window 
})


var options = {
    strings,
    typeSpeed: 85,
    backSpeed: 30,
    backDelay: 500,
    loop: true,
    cursorChar: "|"
}

var typed = new Typed("#type span", options);                    



// sending email
(() => {
    emailjs.init("user_Bj1KkG8QDUlmCDLCuEicg");
})()

const $form = $("#send-email")
const $check = $("#check")

$form.submit(e => {
    e.preventDefault()

    const message = e.target.message.value
    const name = e.target.name.value
    const emailId = e.target.email.value

    
    if(validateEmail(emailId)){
        emailjs.send(
            "gmail", 
            "template_RCBgJhG1",
            {
                "from_name": name,
                "to_name": "shivam gupta",
                "message_html": message,
                "reply_to": emailId
            }
        )
            .then(() => {
                $check.css('visibility','visible')
                setTimeout(() => $check.css('visibility','hidden'),2000)
            })
            
    }
})

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// AOS
AOS.init({
    duration: 500,
    easing: 'ease-in',
});

// scroll animations for navbar
const $landing = $("#landing")
const $showcase = $("#showcase")
const $letsConnect = $("#lets-connect")
const $homeBtn = $("#_home")
const $showcaseBtn = $("#_showcase")
const $connectBtn = $("#_connect")
const timeTakenToScroll = 750 


$homeBtn.click(function() {
    $('html, body').animate({
        scrollTop: $landing.offset().top
    }, timeTakenToScroll)
})

$showcaseBtn.click(function() {
    $('html, body').animate({
        scrollTop: $showcase.offset().top
    }, timeTakenToScroll)
})

$connectBtn.click(function() {
    $('html, body').animate({
        scrollTop: $letsConnect.offset().top+140
    }, timeTakenToScroll)
})