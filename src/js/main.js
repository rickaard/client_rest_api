"use strict";

// Declare element variables
const outputEl = document.querySelector('#fetch_output');

const submitBtn = document.querySelector('#submitBtn');
const formEl = document.querySelector('#add-course-form');
const editFormWrapper = document.querySelector('.edit-form');
const editFormEl = document.querySelector('#edit-course-form');
const editModalEl = document.querySelector('.edit-modal');
const addModalEl = document.querySelector('.add-modal');
const addModalBtn = document.querySelector('#add-modal-btn');
const closeModalBtns = document.querySelectorAll('.close');


// API URL
const url = 'http://localhost/api/index.php/courses/';

// Call fetch function when DOM is finnished loading the DOM tree 
window.addEventListener('DOMContentLoaded', fetchContent);
// Event listeners
formEl.addEventListener('submit', addCourse);

addModalBtn.addEventListener('click', () => {
    addModalEl.style.display = 'block';
})

// Modal close button
closeModalBtns.forEach(element => {
    element.addEventListener('click', () => {
        element.parentElement.parentElement.style.display = 'none';
    })
})

window.onclick = function(event) {
    if (event.target == addModalEl || event.target == editModalEl) {
        addModalEl.style.display = "none";
        editModalEl.style.display = "none";
    }
  }

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
                <td class="course-delete"><button id="${item.id}" class="btn btn-small btn-warning" onClick="deleteCourse(${item.id})">X</button></td>
                <td class="course-delete"><button class="btn btn-small btn-warning" onClick="editModal('${item.course_code}', '${item.course_name}', '${item.course_progress}', '${item.course_syllabus}', ${item.id})">E</button></td>
            </tr>
            `
        }).join("");
        outputEl.innerHTML = courses;
    })
    .catch(error => console.log(error))
}

// Convert the argument to a JSON object
function convertToJson(codeInput, nameInput, progressInput, syllabusInput) {
    let course_code = codeInput;
    let course_name = nameInput;
    let course_progress = progressInput;
    let course_syllabus = syllabusInput;

    let jsonStr = JSON.stringify({
        'code': course_code,
        'name': course_name,
        'progress': course_progress,
        'syllabus': course_syllabus
    });
    return jsonStr;
}


// Post new course
function addCourse (event) {
    event.preventDefault();

    let jsonStr = convertToJson(document.querySelector('#course_code').value, document.querySelector('#course_name').value, document.querySelector('#course_progress').value, document.querySelector('#course_syllabus').value)

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonStr
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data); // SKRIV UT ATT KURS ÄR TILLAGD ---------------------- OBSBSBOSBSOBSOBSOBSOBSOBS FIXA
        fetchContent(); // Fetching all the courses again when a new course is added
        formEl.reset(); // Resets the input fields in the form
        addModalEl.style.display = 'none';
    })
    .catch(err => console.log(err))
}

// Open edit modal
function editModal(code, name, progress, syllabus, id) {
    // console.log(code, name, progress, syllabus, id);

    document.querySelector('#edit-course-form > div > #course_code').value = code;
    document.querySelector('#edit-course-form > div > #course_name').value = name;
    document.querySelector('#edit-course-form > div > #course_progress').value = progress;
    document.querySelector('#edit-course-form > div > #course_syllabus').value = syllabus;
    document.querySelector('#edit-course-form > div > #course_id').value = id;

    editModalEl.style.display = 'block';
    console.log(code, name, progress, syllabus, id);
}


// Edit course
function editCourse(code) {
    // event.preventDefault();
    
    console.log(code);
    

    // fetch(url, {
    //     method: 'PUT',
    //     header: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: jsonStr
    // })
    // .then(resp => resp.json())
    // .then(data => {
    //     console.log(data);
    //     fetchContent();
    //     // reset form inputs
    // })
}

// Delete course
function deleteCourse(id) {
    console.log(id);
    fetch(url+id, {
        method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        fetchContent(); // Fetching all the courses again when a course is removed 
    })
    .catch(err => console.log(err))
}


document.querySelectorAll('.course-delete > button').forEach(element => {
    element.addEventListener('click', deleteCourse);
    console.log(element);
    deleteCourse()
});


