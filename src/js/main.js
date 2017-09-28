
import Typed from 'typed.js'
import $ from 'jquery'

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

