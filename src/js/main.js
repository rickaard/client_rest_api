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
editFormEl.addEventListener('submit', editCourse);

addModalBtn.addEventListener('click', () => {
    addModalEl.style.display = 'block';
})

// Modal close button
closeModalBtns.forEach(element => {
    element.addEventListener('click', () => {
        element.parentElement.parentElement.style.display = 'none';
    })
})

// If press outside of the modal -> close it
window.onclick = function(event) {
    if (event.target == addModalEl || event.target == editModalEl) {
        addModalEl.style.display = "none";
        editModalEl.style.display = "none";
    }
  }

// Fetch content (the courses)
// And display it in the table
function fetchContent()  {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        let courses = data.map((item, index) => {
            return `
            <tr class="course_wrapper">
                <td class="course-code">${item.course_code}</td>
                <td class="course-name">${item.course_name}</td>
                <td class="course-progress">${item.course_progress}</td>
                <td class="course-syllabus"><a target="_blank" href="${item.course_syllabus}">Webblänk</a></td>
                <td class="course-delete"><button id="${item.id}" class="btn btn-small btn-warning" onClick="deleteCourse(${item.id})"><i class="fas fa-trash-alt"></i></button></td>
                <td class="course-edit"><button class="btn btn-small btn-sucess" onClick="editModal('${item.course_code}', '${item.course_name}', '${item.course_progress}', '${item.course_syllabus}', ${item.id})"><i class="fas fa-edit"></i></button></td>
            </tr>
            `
        }).join("");
        outputEl.innerHTML = courses;
    })
    .catch(error => console.log(error))
}

// Convert the argument to a JSON object
function convertToJson(codeInput, nameInput, progressInput, syllabusInput, id = undefined) {
    let course_code = codeInput;
    let course_name = nameInput;
    let course_progress = progressInput;
    let course_syllabus = syllabusInput;

    let jsonStr;

    if (id == undefined) {
        jsonStr = JSON.stringify({
            'code': course_code,
            'name': course_name,
            'progress': course_progress,
            'syllabus': course_syllabus,
        });
    } else {
        jsonStr = JSON.stringify({
            'code': course_code,
            'name': course_name,
            'progress': course_progress,
            'syllabus': course_syllabus,
            'id': id
        });
    }
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
        fetchContent(); // Fetching all the courses again when a new course is added
        formEl.reset(); // Resets the input fields in the form
        addModalEl.style.display = 'none'; // Hide the modal again
    })
    .catch(err => console.log(err))
}

// Open edit modal
function editModal(code, name, progress, syllabus, id) {
    // Fill the form with correct values
    document.querySelector('#edit-course-form > div > #course_code').value = code;
    document.querySelector('#edit-course-form > div > #course_name').value = name;
    document.querySelector('#edit-course-form > div > #course_progress').value = progress;
    document.querySelector('#edit-course-form > div > #course_syllabus').value = syllabus;
    document.querySelector('#edit-course-form > div > #course_id').value = id;
    editModalEl.style.display = 'block';
}


// Edit course
function editCourse(event) {
    event.preventDefault();
    
    let jsonStr = convertToJson(document.querySelector('#edit-course-form > div > #course_code').value, document.querySelector('#edit-course-form > div > #course_name').value, document.querySelector('#edit-course-form > div > #course_progress').value, document.querySelector('#edit-course-form > div > #course_syllabus').value, document.querySelector('#edit-course-form > div > #course_id').value);

    fetch(url, {
        method: 'PUT',
        header: {
            'Content-Type': 'application/json'
        },
        body: jsonStr
    })
    .then(resp => resp.json())
    .then(data => {
        fetchContent(); // Fetch the content again to re-display the new updated data
        editModalEl.style.display = 'none'; // Hide the edit modal
    })
}

// Delete course
function deleteCourse(id) {
    fetch(url+id, {
        method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(data => {
        fetchContent(); // Fetching all the courses again when a course is removed 
    })
    .catch(err => console.log(err))
}

// Event listener on every delete-button, call the deleteCourse function on click
document.querySelectorAll('.course-delete > button').forEach(element => {
    element.addEventListener('click', deleteCourse);
    deleteCourse()
});


