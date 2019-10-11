"use strict";var outputEl=document.querySelector("#fetch_output"),submitBtn=document.querySelector("#submitBtn"),formEl=document.querySelector("#add-course-form"),editFormWrapper=document.querySelector(".edit-form"),editFormEl=document.querySelector("#edit-course-form"),editModalEl=document.querySelector(".edit-modal"),addModalEl=document.querySelector(".add-modal"),addModalBtn=document.querySelector("#add-modal-btn"),closeModalBtns=document.querySelectorAll(".close"),url="http://rickaard.se/webbutveckling/webbutveckling3/moment5/api/index.php/courses/";function fetchContent(){fetch(url).then(function(e){return e.json()}).then(function(e){var t=e.map(function(e,t){return'\n            <tr class="course_wrapper">\n                <td class="course-code">'.concat(e.course_code,'</td>\n                <td class="course-name">').concat(e.course_name,'</td>\n                <td class="course-progress">').concat(e.course_progress,'</td>\n                <td class="course-syllabus"><a target="_blank" href="').concat(e.course_syllabus,'">Webblänk</a></td>\n                <td class="course-delete"><button id="').concat(e.id,'" class="btn btn-small btn-warning" onClick="deleteCourse(').concat(e.id,')"><i class="fas fa-trash-alt"></i></button></td>\n                <td class="course-edit"><button class="btn btn-small btn-sucess" onClick="editModal(\'').concat(e.course_code,"', '").concat(e.course_name,"', '").concat(e.course_progress,"', '").concat(e.course_syllabus,"', ").concat(e.id,')"><i class="fas fa-edit"></i></button></td>\n            </tr>\n            ')}).join("");outputEl.innerHTML=t}).catch(function(e){return console.log(e)})}function convertToJson(e,t,o,n){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:void 0,r=e,u=t,d=o,l=n;return null==c?JSON.stringify({code:r,name:u,progress:d,syllabus:l}):JSON.stringify({code:r,name:u,progress:d,syllabus:l,id:c})}function addCourse(e){e.preventDefault();var t=convertToJson(document.querySelector("#course_code").value,document.querySelector("#course_name").value,document.querySelector("#course_progress").value,document.querySelector("#course_syllabus").value);fetch(url,{method:"POST",headers:{"Content-Type":"application/json"},body:t}).then(function(e){return e.json()}).then(function(e){fetchContent(),formEl.reset(),addModalEl.style.display="none"}).catch(function(e){return console.log(e)})}function editModal(e,t,o,n,c){document.querySelector("#edit-course-form > div > #course_code").value=e,document.querySelector("#edit-course-form > div > #course_name").value=t,document.querySelector("#edit-course-form > div > #course_progress").value=o,document.querySelector("#edit-course-form > div > #course_syllabus").value=n,document.querySelector("#edit-course-form > div > #course_id").value=c,editModalEl.style.display="block"}function editCourse(e){e.preventDefault();var t=convertToJson(document.querySelector("#edit-course-form > div > #course_code").value,document.querySelector("#edit-course-form > div > #course_name").value,document.querySelector("#edit-course-form > div > #course_progress").value,document.querySelector("#edit-course-form > div > #course_syllabus").value,document.querySelector("#edit-course-form > div > #course_id").value);fetch(url,{method:"PUT",header:{"Content-Type":"application/json"},body:t}).then(function(e){return e.json()}).then(function(e){fetchContent(),editModalEl.style.display="none"})}function deleteCourse(e){fetch(url+e,{method:"DELETE"}).then(function(e){return e.json()}).then(function(e){fetchContent()}).catch(function(e){return console.log(e)})}window.addEventListener("DOMContentLoaded",fetchContent),formEl.addEventListener("submit",addCourse),editFormEl.addEventListener("submit",editCourse),addModalBtn.addEventListener("click",function(){addModalEl.style.display="block"}),closeModalBtns.forEach(function(e){e.addEventListener("click",function(){e.parentElement.parentElement.style.display="none"})}),window.onclick=function(e){e.target!=addModalEl&&e.target!=editModalEl||(addModalEl.style.display="none",editModalEl.style.display="none")},document.querySelectorAll(".course-delete > button").forEach(function(e){e.addEventListener("click",deleteCourse),deleteCourse()});
//# sourceMappingURL=maps/main.js.map
