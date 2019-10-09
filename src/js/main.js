"use strict";

// Declare element variables
const outputEl = document.querySelector('#fetch_output');

// API URL
const url = 'http://localhost/api/index.php/courses/';

// Call fetch function when DOM is finnished loading the DOM tree
window.addEventListener('DOMContentLoaded', fetchContent);


// Fetch content (the courses)
function fetchContent()  {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log('fetchContent',data)
        let courses = data.map((item, index) => {
            return `
            <tr class="course_wrapper">
                <td class="course-code">${item.course_code}</td>
                <td class="course-name">${item.course_name}</td>
                <td class="course-progress">${item.course_progress}</td>
                <td class="course-syllabus"><a target="_blank" href="${item.course_syllabus}">Webblänk</a></td>
                <td class="course-delete"><button id="${item.id}" class="btn btn-small btn-warning">X</button></td>
            </tr>
            `
        }).join("");
        outputEl.innerHTML += courses;
    })
    .catch(error => console.log(error))
}





// Post new course
const addCourse = (event) => {
    event.preventDefault();
    console.log('poop2');
}

// Edit course

// Delete course
function deleteCourse(event) {
    console.log('poop');
}


document.querySelectorAll('.course-delete').forEach(element => {
    element.addEventListener('click', deleteCourse);
    console.log(element);
    deleteCourse()
});


// Event listeners
document.querySelector('#submitBtn').addEventListener('click', addCourse);