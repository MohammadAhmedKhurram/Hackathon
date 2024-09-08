"use strict";
// DOM elements selection
var resumeForm = document.getElementById('resumeForm');
var personalInfo = document.getElementById('personalInfo');
var educationInfo = document.getElementById('educationInfo');
var skillsInfo = document.getElementById('skillsInfo');
var workExperienceInfo = document.getElementById('workExperienceInfo');
var workExperienceContainer = document.getElementById('workExperienceContainer');
var addExperienceBtn = document.getElementById('addExperienceBtn');
// Function to update resume preview
var updateResumePreview = function () {
    // Extract personal information
    var fullName = document.getElementById('fullName').value;
    var title = document.getElementById('title').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    // Extract education information
    var school = document.getElementById('school').value;
    var degree = document.getElementById('degree').value;
    var year = document.getElementById('year').value;
    // Extract skills
    var skills = document.getElementById('skills').value.split(',');
    // Extract work experiences
    var workExperienceDivs = document.querySelectorAll('.work-experience');
    var workExperienceHTML = '<h3>Work Experience</h3>';
    workExperienceDivs.forEach(function (div) {
        var jobTitle = div.querySelector('input[placeholder="Job Title"]').value;
        var company = div.querySelector('input[placeholder="Company"]').value;
        var startYear = div.querySelector('input[placeholder="Start Year"]').value;
        var startMonth = div.querySelector('input[placeholder="Start Month"]').value;
        var endYear = div.querySelector('input.end-year').value;
        var endMonth = div.querySelector('input.end-month').value;
        var currentlyEmployed = div.querySelector('input.currentlyEmployed').checked;
        // Format end date if currently employed
        var endDate = currentlyEmployed ? 'Present' : "".concat(endMonth, " ").concat(endYear);
        workExperienceHTML += "<p>".concat(jobTitle, " at ").concat(company, " (").concat(startMonth, " ").concat(startYear, " - ").concat(endDate, ")</p>");
    });
    // Update resume with collected information
    personalInfo.innerHTML = "\n        <h3>".concat(fullName, "</h3>\n        <p>").concat(title, "</p>\n        <p>Email: ").concat(email, "</p>\n        <p>Phone: ").concat(phone, "</p>\n    ");
    educationInfo.innerHTML = "\n        <h3>Education</h3>\n        <p>".concat(degree, ", ").concat(school, " (").concat(year, ")</p>\n    ");
    skillsInfo.innerHTML = "\n        <h3>Skills</h3>\n        <ul>".concat(skills.map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join(''), "</ul>\n    ");
    workExperienceInfo.innerHTML = workExperienceHTML;
    // Show resume preview
    document.getElementById('resumePreview').style.display = 'block';
};
// Event listeners for input fields to update resume preview in real-time
document.querySelectorAll('#resumeForm input').forEach(function (input) {
    input.addEventListener('input', updateResumePreview);
});
// Function to add new work experience fields
var addNewExperienceFields = function () {
    var newExperienceDiv = document.createElement('div');
    newExperienceDiv.classList.add('work-experience');
    newExperienceDiv.innerHTML = "\n        <input type=\"text\" placeholder=\"Job Title\" required>\n        <input type=\"text\" placeholder=\"Company\" required>\n        <input type=\"text\" placeholder=\"Start Year\" required>\n        <input type=\"text\" placeholder=\"Start Month\" required>\n        <input type=\"text\" placeholder=\"End Year\" class=\"end-year\">\n        <input type=\"text\" placeholder=\"End Month\" class=\"end-month\">\n        <label>\n            <input type=\"checkbox\" class=\"currentlyEmployed\"> Currently Employed\n        </label>\n    ";
    workExperienceContainer.appendChild(newExperienceDiv);
    // Add event listeners for new inputs
    newExperienceDiv.querySelectorAll('input').forEach(function (input) {
        input.addEventListener('input', updateResumePreview);
    });
};
// Add event listener for "Add Experience" button
addExperienceBtn.addEventListener('click', addNewExperienceFields);
