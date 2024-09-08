// DOM elements selection
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const personalInfo = document.getElementById('personalInfo') as HTMLElement;
const educationInfo = document.getElementById('educationInfo') as HTMLElement;
const skillsInfo = document.getElementById('skillsInfo') as HTMLElement;
const workExperienceInfo = document.getElementById('workExperienceInfo') as HTMLElement;
const workExperienceContainer = document.getElementById('workExperienceContainer') as HTMLElement;
const addExperienceBtn = document.getElementById('addExperienceBtn') as HTMLButtonElement;

// Function to update resume preview
const updateResumePreview = () => {
    // Extract personal information
    const fullName = (document.getElementById('fullName') as HTMLInputElement).value;
    const title = (document.getElementById('title') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;

    // Extract education information
    const school = (document.getElementById('school') as HTMLInputElement).value;
    const degree = (document.getElementById('degree') as HTMLInputElement).value;
    const year = (document.getElementById('year') as HTMLInputElement).value;

    // Extract skills
    const skills = (document.getElementById('skills') as HTMLInputElement).value.split(',');

    // Extract work experiences
    const workExperienceDivs = document.querySelectorAll('.work-experience') as NodeListOf<HTMLDivElement>;
    let workExperienceHTML = '<h3>Work Experience</h3>';

    workExperienceDivs.forEach(div => {
        const jobTitle = (div.querySelector('input[placeholder="Job Title"]') as HTMLInputElement).value;
        const company = (div.querySelector('input[placeholder="Company"]') as HTMLInputElement).value;
        const startYear = (div.querySelector('input[placeholder="Start Year"]') as HTMLInputElement).value;
        const startMonth = (div.querySelector('input[placeholder="Start Month"]') as HTMLInputElement).value;
        const endYear = (div.querySelector('input.end-year') as HTMLInputElement).value;
        const endMonth = (div.querySelector('input.end-month') as HTMLInputElement).value;
        const currentlyEmployed = (div.querySelector('input.currentlyEmployed') as HTMLInputElement).checked;

        // Format end date if currently employed
        const endDate = currentlyEmployed ? 'Present' : `${endMonth} ${endYear}`;

        workExperienceHTML += `<p>${jobTitle} at ${company} (${startMonth} ${startYear} - ${endDate})</p>`;
    });

    // Update resume with collected information
    personalInfo.innerHTML = `
        <h3>${fullName}</h3>
        <p>${title}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
    `;
    educationInfo.innerHTML = `
        <h3>Education</h3>
        <p>${degree}, ${school} (${year})</p>
    `;
    skillsInfo.innerHTML = `
        <h3>Skills</h3>
        <ul>${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}</ul>
    `;
    workExperienceInfo.innerHTML = workExperienceHTML;

    // Show resume preview
    document.getElementById('resumePreview')!.style.display = 'block';
};

// Event listeners for input fields to update resume preview in real-time
document.querySelectorAll('#resumeForm input').forEach(input => {
    input.addEventListener('input', updateResumePreview);
});

// Function to add new work experience fields
const addNewExperienceFields = () => {
    const newExperienceDiv = document.createElement('div');
    newExperienceDiv.classList.add('work-experience');
    newExperienceDiv.innerHTML = `
        <input type="text" placeholder="Job Title" required>
        <input type="text" placeholder="Company" required>
        <input type="text" placeholder="Start Year" required>
        <input type="text" placeholder="Start Month" required>
        <input type="text" placeholder="End Year" class="end-year">
        <input type="text" placeholder="End Month" class="end-month">
        <label>
            <input type="checkbox" class="currentlyEmployed"> Currently Employed
        </label>
    `;
    workExperienceContainer.appendChild(newExperienceDiv);

    // Add event listeners for new inputs
    newExperienceDiv.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', updateResumePreview);
    });
};

// Add event listener for "Add Experience" button
addExperienceBtn.addEventListener('click', addNewExperienceFields);
