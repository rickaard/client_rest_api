"use strict";var outputEl=document.querySelector("#fetch_output"),submitBtn=document.querySelector("#submitBtn"),formEl=document.querySelector("#add-course-form"),editFormWrapper=document.querySelector(".edit-form"),editFormEl=document.querySelector("#edit-course-form"),editModalEl=document.querySelector(".edit-modal"),addModalEl=document.querySelector(".add-modal"),addModalBtn=document.querySelector("#add-modal-btn"),closeModalBtns=document.querySelectorAll(".close"),url="http://localhost/api/index.php/courses/";function fetchContent(){fetch(url).then(function(e){return e.json()}).then(function(e){console.log("fetchContent",e);var o=e.map(function(e,o){return'\n            <tr class="course_wrapper">\n                <td class="course-code">'.concat(e.course_code,'</td>\n                <td class="course-name">').concat(e.course_name,'</td>\n                <td class="course-progress">').concat(e.course_progress,'</td>\n                <td class="course-syllabus"><a target="_blank" href="').concat(e.course_syllabus,'">Webblänk</a></td>\n                <td class="course-delete"><button id="').concat(e.id,'" class="btn btn-small btn-warning" onClick="deleteCourse(').concat(e.id,')">X</button></td>\n                <td class="course-delete"><button class="btn btn-small btn-warning" onClick="editModal(\'').concat(e.course_code,"', '").concat(e.course_name,"', '").concat(e.course_progress,"', '").concat(e.course_syllabus,"', ").concat(e.id,')">E</button></td>\n            </tr>\n            ')}).join("");outputEl.innerHTML=o}).catch(function(e){return console.log(e)})}function convertToJson(e,o,t,n){var c=e,r=o,l=t,u=n;return JSON.stringify({code:c,name:r,progress:l,syllabus:u})}function addCourse(e){e.preventDefault();var o=convertToJson(document.querySelector("#course_code").value,document.querySelector("#course_name").value,document.querySelector("#course_progress").value,document.querySelector("#course_syllabus").value);fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:o}).then(function(e){return e.json()}).then(function(e){console.log(e),fetchContent(),formEl.reset(),addModalEl.style.display="none"}).catch(function(e){return console.log(e)})}function editModal(e,o,t,n,c){document.querySelector("#edit-course-form > div > #course_code").value=e,document.querySelector("#edit-course-form > div > #course_name").value=o,document.querySelector("#edit-course-form > div > #course_progress").value=t,document.querySelector("#edit-course-form > div > #course_syllabus").value=n,document.querySelector("#edit-course-form > div > #course_id").value=c,editModalEl.style.display="block",console.log(e,o,t,n,c)}function editCourse(e){console.log(e)}function deleteCourse(e){console.log(e),fetch(url+e,{method:"DELETE"}).then(function(e){return e.json()}).then(function(e){console.log(e),fetchContent()}).catch(function(e){return console.log(e)})}window.addEventListener("DOMContentLoaded",fetchContent),formEl.addEventListener("submit",addCourse),addModalBtn.addEventListener("click",function(){addModalEl.style.display="block"}),closeModalBtns.forEach(function(e){e.addEventListener("click",function(){e.parentElement.parentElement.style.display="none"})}),window.onclick=function(e){e.target!=addModalEl&&e.target!=editModalEl||(addModalEl.style.display="none",editModalEl.style.display="none")},document.querySelectorAll(".course-delete > button").forEach(function(e){e.addEventListener("click",deleteCourse),console.log(e),deleteCourse()});
//# sourceMappingURL=maps/main.js.map