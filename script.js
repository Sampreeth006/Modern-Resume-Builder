// ========================================
// Modern Resume Builder 
// ========================================

let selectedTemplate = 'modern';
let photoDataURL = '';
let previewMinimized = false;
let isDarkTheme = false;
let currentThemeColor = '#3b82f6';

// ========================================
// Theme Functions
// ========================================

// Theme color update
function updateThemeColor(color) {
    currentThemeColor = color;
    document.documentElement.style.setProperty('--primary-color', color);
    document.getElementById('themeColor').value = color;
    updateLivePreview();
}

// Toggle end date for current job
function toggleEndDate(checkbox) {
    const endDateInput = checkbox.closest('.dynamic-field').querySelector('[name="expEnd"]');
    if (checkbox.checked) {
        endDateInput.value = 'Present';
        endDateInput.disabled = true;
        endDateInput.style.background = '#f1f5f9';
    } else {
        endDateInput.value = '';
        endDateInput.disabled = false;
        endDateInput.style.background = '';
    }
    updateLivePreview();
}

// Theme toggle (Light/Dark)
function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    const body = document.body;
    const themeBtn = document.getElementById('themeToggle');
    const themeText = document.getElementById('themeText');
    const icon = themeBtn.querySelector('i');
    
    if (isDarkTheme) {
        body.classList.add('dark-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        themeText.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        themeText.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

// Template selection
function selectTemplate(template) {
    selectedTemplate = template;
    document.querySelectorAll('.template-tab').forEach(tab => tab.classList.remove('active'));
    event.target.closest('.template-tab').classList.add('active');
    updateLivePreview();
}

// ========================================
// Initialization & Event Listeners
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        toggleTheme();
    }
    
    // Photo upload handler
    document.getElementById('photoUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                photoDataURL = event.target.result;
                document.getElementById('previewImg').src = photoDataURL;
                document.getElementById('imagePreview').classList.add('show');
                updateLivePreview();
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Add real-time input listeners for live preview
    const formInputs = document.querySelectorAll('input, textarea, select');
    formInputs.forEach(input => {
        input.addEventListener('input', debounce(updateLivePreview, 500));
        
        // Add focus listener to scroll preview to relevant section
        input.addEventListener('focus', function() {
            scrollPreviewToSection(this);
        });
    });
    
    // Initial preview
    updateLivePreview();
});

// ========================================
// Helper Functions
// ========================================

// Debounce function to limit how often preview updates
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce helper for inline calls
let debounceTimer;
function debounceUpdate() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(updateLivePreview, 500);
}

// Scroll preview to match the focused form section
function scrollPreviewToSection(input) {
    const previewContent = document.getElementById('livePreview');
    const previewContainer = document.querySelector('.preview-content');
    
    if (!previewContent || !previewContainer) return;
    
    let scrollPosition = 0;
    
    if (input.id === 'fullName' || input.id === 'jobTitle') {
        scrollPosition = 0;
    } else if (input.id === 'summary') {
        scrollPosition = previewContent.scrollHeight * 0.15;
    } else if (input.name && input.name.startsWith('exp')) {
        scrollPosition = previewContent.scrollHeight * 0.3;
    } else if (input.name && input.name.startsWith('edu')) {
        scrollPosition = previewContent.scrollHeight * 0.55;
    } else if (input.name && input.name.startsWith('skill')) {
        scrollPosition = previewContent.scrollHeight * 0.1;
    } else if (input.name && input.name.startsWith('cert')) {
        scrollPosition = previewContent.scrollHeight * 0.75;
    }
    
    previewContainer.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
    });
}

// ========================================
// Dynamic Field Management
// ========================================

// Add new experience field
function addExperience() {
    const container = document.getElementById('experienceContainer');
    const newField = document.createElement('div');
    newField.className = 'dynamic-field';
    newField.innerHTML = `
        <button class="btn btn-remove btn-sm float-end" onclick="this.parentElement.remove(); updateLivePreview();">
            <i class="fas fa-times"></i>
        </button>
        <div class="mb-2">
            <input type="text" class="form-control mb-2" placeholder="Job Title" name="expTitle" oninput="debounceUpdate()">
        </div>
        <div class="mb-2">
            <input type="text" class="form-control mb-2" placeholder="Company Name" name="expCompany" oninput="debounceUpdate()">
        </div>
        <div class="row mb-2">
            <div class="col-6">
                <label class="form-label small">Start Date</label>
                <input type="month" class="form-control" placeholder="Start Date" name="expStart" oninput="debounceUpdate()">
            </div>
            <div class="col-6">
                <label class="form-label small">End Date</label>
                <input type="month" class="form-control" placeholder="End Date" name="expEnd" oninput="debounceUpdate()">
            </div>
        </div>
        <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" name="expCurrent" onchange="toggleEndDate(this)">
            <label class="form-check-label">Currently working here</label>
        </div>
        <textarea class="form-control" rows="3" placeholder="Describe your responsibilities and achievements" name="expDesc" oninput="debounceUpdate()"></textarea>
    `;
    container.appendChild(newField);
    updateLivePreview();
}

// Add new education field
function addEducation() {
    const container = document.getElementById('educationContainer');
    const newField = document.createElement('div');
    newField.className = 'dynamic-field';
    newField.innerHTML = `
        <button class="btn btn-remove btn-sm float-end" onclick="this.parentElement.remove(); updateLivePreview();">
            <i class="fas fa-times"></i>
        </button>
        <div class="mb-2">
            <input type="text" class="form-control mb-2" placeholder="Degree" name="eduDegree" oninput="debounceUpdate()">
        </div>
        <div class="mb-2">
            <input type="text" class="form-control mb-2" placeholder="Institution" name="eduSchool" oninput="debounceUpdate()">
        </div>
        <div class="row mb-2">
            <div class="col-6">
                <label class="form-label small">Graduation Year</label>
                <input type="number" class="form-control" placeholder="Year" name="eduYear" min="1950" max="2050" oninput="debounceUpdate()">
            </div>
            <div class="col-6">
                <input type="text" class="form-control" placeholder="GPA (optional)" name="eduGPA" oninput="debounceUpdate()">
            </div>
        </div>
    `;
    container.appendChild(newField);
    updateLivePreview();
}

// Add new skill field
function addSkill() {
    const container = document.getElementById('skillsContainer');
    const newField = document.createElement('div');
    newField.className = 'dynamic-field';
    newField.innerHTML = `
        <button class="btn btn-remove btn-sm float-end" onclick="this.parentElement.remove(); updateLivePreview();">
            <i class="fas fa-times"></i>
        </button>
        <div class="row">
            <div class="col-8">
                <input type="text" class="form-control" placeholder="Skill Name" name="skillName" oninput="debounceUpdate()">
            </div>
            <div class="col-4">
                <select class="form-select" name="skillLevel" onchange="updateLivePreview()">
                    <option value="90">Expert</option>
                    <option value="75" selected>Advanced</option>
                    <option value="60">Intermediate</option>
                    <option value="40">Beginner</option>
                </select>
            </div>
        </div>
    `;
    container.appendChild(newField);
    updateLivePreview();
}

// Add new certification field
function addCertification() {
    const container = document.getElementById('certificationsContainer');
    const newField = document.createElement('div');
    newField.className = 'dynamic-field';
    newField.innerHTML = `
        <button class="btn btn-remove btn-sm float-end" onclick="this.parentElement.remove(); updateLivePreview();">
            <i class="fas fa-times"></i>
        </button>
        <input type="text" class="form-control mb-2" placeholder="Certification Name" name="certName" oninput="debounceUpdate()">
        <input type="text" class="form-control" placeholder="Issuing Organization & Year" name="certOrg" oninput="debounceUpdate()">
    `;
    container.appendChild(newField);
    updateLivePreview();
}

// ========================================
// Data Collection
// ========================================

// Collect form data
function collectFormData() {
    const data = {
        fullName: document.getElementById('fullName').value,
        jobTitle: document.getElementById('jobTitle').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        summary: document.getElementById('summary').value,
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        portfolio: document.getElementById('portfolio').value,
        twitter: document.getElementById('twitter').value,
        photo: photoDataURL,
        experiences: [],
        education: [],
        skills: [],
        certifications: []
    };

    // Collect experience data
    document.querySelectorAll('#experienceContainer .dynamic-field').forEach(field => {
        data.experiences.push({
            title: field.querySelector('[name="expTitle"]').value,
            company: field.querySelector('[name="expCompany"]').value,
            start: field.querySelector('[name="expStart"]').value,
            end: field.querySelector('[name="expEnd"]').value,
            description: field.querySelector('[name="expDesc"]').value
        });
    });

    // Collect education data
    document.querySelectorAll('#educationContainer .dynamic-field').forEach(field => {
        data.education.push({
            degree: field.querySelector('[name="eduDegree"]').value,
            school: field.querySelector('[name="eduSchool"]').value,
            year: field.querySelector('[name="eduYear"]').value,
            gpa: field.querySelector('[name="eduGPA"]').value
        });
    });

    // Collect skills data
    document.querySelectorAll('#skillsContainer .dynamic-field').forEach(field => {
        data.skills.push({
            name: field.querySelector('[name="skillName"]').value,
            level: field.querySelector('[name="skillLevel"]').value
        });
    });

    // Collect certifications data
    document.querySelectorAll('#certificationsContainer .dynamic-field').forEach(field => {
        data.certifications.push({
            name: field.querySelector('[name="certName"]').value,
            org: field.querySelector('[name="certOrg"]').value
        });
    });

    return data;
}

// ========================================
// Resume Generation
// ========================================

// Update live preview
function updateLivePreview() {
    const data = collectFormData();
    let resumeHTML = '';
    
    if (selectedTemplate === 'modern') {
        resumeHTML = generateModernTemplate(data);
    } else if (selectedTemplate === 'classic') {
        resumeHTML = generateClassicTemplate(data);
    } else if (selectedTemplate === 'minimal') {
        resumeHTML = generateMinimalTemplate(data);
    } else if (selectedTemplate === 'creative') {
        resumeHTML = generateCreativeTemplate(data);
    } else if (selectedTemplate === 'professional') {
        resumeHTML = generateProfessionalTemplate(data);
    }
    
    const previewElement = document.getElementById('livePreview');
    previewElement.innerHTML = resumeHTML;
}

// Generate final resume
function generateFinalResume() {
    const data = collectFormData();
    let resumeHTML = '';
    
    if (selectedTemplate === 'modern') {
        resumeHTML = generateModernTemplate(data);
    } else if (selectedTemplate === 'classic') {
        resumeHTML = generateClassicTemplate(data);
    } else if (selectedTemplate === 'minimal') {
        resumeHTML = generateMinimalTemplate(data);
    } else if (selectedTemplate === 'creative') {
        resumeHTML = generateCreativeTemplate(data);
    } else if (selectedTemplate === 'professional') {
        resumeHTML = generateProfessionalTemplate(data);
    }
    
    document.getElementById('resumeOutput').innerHTML = resumeHTML;
    document.getElementById('form-view').style.display = 'none';
    document.getElementById('cv-view').style.display = 'block';
}

// ========================================
// Template 1: Modern
// ========================================

function generateModernTemplate(data) {
    const photoSrc = data.photo || 'https://via.placeholder.com/180';
    const themeColor = currentThemeColor;
    
    let experienceHTML = '';
    data.experiences.forEach(exp => {
        if (exp.title || exp.company) {
            experienceHTML += `
                <div class="mb-4">
                    <h4 style="color: #1e293b; font-size: 1.2rem; font-weight: 600; margin-bottom: 5px;">${exp.title}</h4>
                    <p style="color: #64748b; font-weight: 500; margin-bottom: 5px;">${exp.company}</p>
                    <p style="color: #94a3b8; font-size: 0.9rem; margin-bottom: 10px;">
                        <i class="far fa-calendar"></i> ${exp.start} - ${exp.end}
                    </p>
                    <p style="color: #475569;">${exp.description}</p>
                </div>
            `;
        }
    });

    let educationHTML = '';
    data.education.forEach(edu => {
        if (edu.degree || edu.school) {
            educationHTML += `
                <div class="mb-3">
                    <h4 style="color: #1e293b; font-size: 1.1rem; font-weight: 600; margin-bottom: 5px;">${edu.degree}</h4>
                    <p style="color: #64748b; margin-bottom: 3px;">${edu.school}</p>
                    <p style="color: #94a3b8; font-size: 0.9rem;">
                        ${edu.year}${edu.gpa ? ' | GPA: ' + edu.gpa : ''}
                    </p>
                </div>
            `;
        }
    });

    let skillsHTML = '';
    data.skills.forEach(skill => {
        if (skill.name) {
            skillsHTML += `
                <div class="skill-item">
                    <div class="skill-name">
                        <span>${skill.name}</span>
                        <span>${skill.level}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" style="width: ${skill.level}%; background: ${themeColor};"></div>
                    </div>
                </div>
            `;
        }
    });

    let certificationsHTML = '';
    data.certifications.forEach(cert => {
        if (cert.name) {
            certificationsHTML += `
                <div class="mb-2">
                    <p style="margin: 0; color: white; font-weight: 500;">${cert.name}</p>
                    <p style="margin: 0; color: rgba(255,255,255,0.7); font-size: 0.85rem;">${cert.org}</p>
                </div>
            `;
        }
    });

    return `
        <div class="cv-template">
            <div class="template-modern">
                <div class="template-sidebar" style="background: linear-gradient(180deg, ${themeColor} 0%, #334155 100%);">
                    <div class="profile-img-container">
                        <img src="${photoSrc}" alt="Profile Photo">
                    </div>
                    
                    <div class="template-contact">
                        ${data.email ? `<div class="contact-item"><i class="fas fa-envelope"></i> <span>${data.email}</span></div>` : ''}
                        ${data.phone ? `<div class="contact-item"><i class="fas fa-phone"></i> <span>${data.phone}</span></div>` : ''}
                        ${data.location ? `<div class="contact-item"><i class="fas fa-map-marker-alt"></i> <span>${data.location}</span></div>` : ''}
                    </div>

                    ${skillsHTML ? `
                        <div class="sidebar-section-title">Skills</div>
                        ${skillsHTML}
                    ` : ''}

                    ${data.linkedin || data.github || data.portfolio || data.twitter ? `
                        <div class="sidebar-section-title">Links</div>
                        ${data.linkedin ? `<div class="contact-item"><i class="fab fa-linkedin"></i> <a href="${data.linkedin}" style="color: white; text-decoration: none;">LinkedIn</a></div>` : ''}
                        ${data.github ? `<div class="contact-item"><i class="fab fa-github"></i> <a href="${data.github}" style="color: white; text-decoration: none;">GitHub</a></div>` : ''}
                        ${data.portfolio ? `<div class="contact-item"><i class="fas fa-globe"></i> <a href="${data.portfolio}" style="color: white; text-decoration: none;">Portfolio</a></div>` : ''}
                        ${data.twitter ? `<div class="contact-item"><i class="fab fa-twitter"></i> <a href="${data.twitter}" style="color: white; text-decoration: none;">Twitter</a></div>` : ''}
                    ` : ''}

                    ${certificationsHTML ? `
                        <div class="sidebar-section-title">Certifications</div>
                        ${certificationsHTML}
                    ` : ''}
                </div>

                <div class="template-main">
                    <div class="template-name">${data.fullName}</div>
                    <div style="text-align: center; color: #64748b; font-size: 1.2rem; margin-bottom: 30px;">${data.jobTitle}</div>

                    ${data.summary ? `
                        <div class="template-section">
                            <div class="template-section-title" style="color: ${themeColor}; border-bottom-color: ${themeColor};">Professional Summary</div>
                            <p style="color: #475569; line-height: 1.6;">${data.summary}</p>
                        </div>
                    ` : ''}

                    ${experienceHTML ? `
                        <div class="template-section">
                            <div class="template-section-title" style="color: ${themeColor}; border-bottom-color: ${themeColor};">Work Experience</div>
                            ${experienceHTML}
                        </div>
                    ` : ''}

                    ${educationHTML ? `
                        <div class="template-section">
                            <div class="template-section-title" style="color: ${themeColor}; border-bottom-color: ${themeColor};">Education</div>
                            ${educationHTML}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// ========================================
// Template 2: Classic
// ========================================

function generateClassicTemplate(data) {
    const photoSrc = data.photo || 'https://via.placeholder.com/150';
    const themeColor = currentThemeColor;
    
    let experienceHTML = '';
    data.experiences.forEach(exp => {
        if (exp.title || exp.company) {
            experienceHTML += `
                <div style="margin-bottom: 20px;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <h4 style="margin: 0; font-size: 1.1rem; color: #2c3e50;">${exp.title}</h4>
                        <span style="color: #7f8c8d; font-size: 0.9rem;">${exp.start} - ${exp.end}</span>
                    </div>
                    <p style="margin: 5px 0; color: #34495e; font-weight: 500;">${exp.company}</p>
                    <p style="margin: 8px 0 0 0; color: #555; line-height: 1.6;">${exp.description}</p>
                </div>
            `;
        }
    });

    let educationHTML = '';
    data.education.forEach(edu => {
        if (edu.degree || edu.school) {
            educationHTML += `
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <h4 style="margin: 0; font-size: 1.05rem; color: #2c3e50;">${edu.degree}</h4>
                        <span style="color: #7f8c8d; font-size: 0.9rem;">${edu.year}</span>
                    </div>
                    <p style="margin: 5px 0; color: #34495e;">${edu.school}${edu.gpa ? ' | GPA: ' + edu.gpa : ''}</p>
                </div>
            `;
        }
    });

    let skillsHTML = '';
    data.skills.forEach(skill => {
        if (skill.name) {
            skillsHTML += `<span style="display: inline-block; background: #ecf0f1; padding: 6px 14px; margin: 4px; border-radius: 4px; font-size: 0.9rem; color: #2c3e50;">${skill.name}</span>`;
        }
    });

    let certificationsHTML = '';
    data.certifications.forEach(cert => {
        if (cert.name) {
            certificationsHTML += `
                <div style="margin-bottom: 10px;">
                    <strong style="color: #2c3e50;">${cert.name}</strong>
                    <p style="margin: 3px 0 0 0; color: #7f8c8d; font-size: 0.9rem;">${cert.org}</p>
                </div>
            `;
        }
    });

    return `
        <div class="cv-template">
            <div style="max-width: 850px; margin: 0 auto; background: white; padding: 50px; font-family: Georgia, serif;">
                <div style="text-align: center; border-bottom: 3px solid ${themeColor}; padding-bottom: 20px; margin-bottom: 30px;">
                    ${data.photo ? `<img src="${photoSrc}" alt="Profile" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; border: 3px solid ${themeColor};">` : ''}
                    <h1 style="margin: 0 0 5px 0; font-size: 2.5rem; color: #2c3e50; font-weight: 700;">${data.fullName}</h1>
                    <p style="margin: 0; font-size: 1.2rem; color: #7f8c8d; font-style: italic;">${data.jobTitle}</p>
                    <div style="margin-top: 15px; color: #555; font-size: 0.95rem;">
                        ${data.email ? `<span style="margin: 0 15px;"><i class="fas fa-envelope"></i> ${data.email}</span>` : ''}
                        ${data.phone ? `<span style="margin: 0 15px;"><i class="fas fa-phone"></i> ${data.phone}</span>` : ''}
                        ${data.location ? `<span style="margin: 0 15px;"><i class="fas fa-map-marker-alt"></i> ${data.location}</span>` : ''}
                    </div>
                </div>

                ${data.summary ? `
                    <div style="margin-bottom: 30px;">
                        <h2 style="color: ${themeColor}; font-size: 1.5rem; border-bottom: 2px solid #bdc3c7; padding-bottom: 8px; margin-bottom: 15px;">Professional Summary</h2>
                        <p style="color: #555; line-height: 1.8; text-align: justify;">${data.summary}</p>
                    </div>
                ` : ''}

                ${experienceHTML ? `
                    <div style="margin-bottom: 30px;">
                        <h2 style="color: ${themeColor}; font-size: 1.5rem; border-bottom: 2px solid #bdc3c7; padding-bottom: 8px; margin-bottom: 15px;">Work Experience</h2>
                        ${experienceHTML}
                    </div>
                ` : ''}

                ${educationHTML ? `
                    <div style="margin-bottom: 30px;">
                        <h2 style="color: ${themeColor}; font-size: 1.5rem; border-bottom: 2px solid #bdc3c7; padding-bottom: 8px; margin-bottom: 15px;">Education</h2>
                        ${educationHTML}
                    </div>
                ` : ''}

                ${skillsHTML ? `
                    <div style="margin-bottom: 30px;">
                        <h2 style="color: ${themeColor}; font-size: 1.5rem; border-bottom: 2px solid #bdc3c7; padding-bottom: 8px; margin-bottom: 15px;">Skills</h2>
                        <div>${skillsHTML}</div>
                    </div>
                ` : ''}

                ${certificationsHTML ? `
                    <div style="margin-bottom: 30px;">
                        <h2 style="color: ${themeColor}; font-size: 1.5rem; border-bottom: 2px solid #bdc3c7; padding-bottom: 8px; margin-bottom: 15px;">Certifications</h2>
                        ${certificationsHTML}
                    </div>
                ` : ''}

                ${data.linkedin || data.github || data.portfolio || data.twitter ? `
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 2px solid #ecf0f1;">
                        ${data.linkedin ? `<a href="${data.linkedin}" style="color: ${themeColor}; text-decoration: none; margin: 0 10px;"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
                        ${data.github ? `<a href="${data.github}" style="color: ${themeColor}; text-decoration: none; margin: 0 10px;"><i class="fab fa-github"></i> GitHub</a>` : ''}
                        ${data.portfolio ? `<a href="${data.portfolio}" style="color: ${themeColor}; text-decoration: none; margin: 0 10px;"><i class="fas fa-globe"></i> Portfolio</a>` : ''}
                        ${data.twitter ? `<a href="${data.twitter}" style="color: ${themeColor}; text-decoration: none; margin: 0 10px;"><i class="fab fa-twitter"></i> Twitter</a>` : ''}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// ========================================
// Template 3: Minimal
// ========================================

function generateMinimalTemplate(data) {
    const themeColor = currentThemeColor;
    
    let experienceHTML = '';
    data.experiences.forEach(exp => {
        if (exp.title || exp.company) {
            experienceHTML += `
                <div style="margin-bottom: 25px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                        <strong style="font-size: 1.05rem; color: #000;">${exp.title} - ${exp.company}</strong>
                        <span style="color: #666; font-size: 0.9rem;">${exp.start} - ${exp.end}</span>
                    </div>
                    <p style="margin: 0; color: #444; line-height: 1.7;">${exp.description}</p>
                </div>
            `;
        }
    });

    let educationHTML = '';
    data.education.forEach(edu => {
        if (edu.degree || edu.school) {
            educationHTML += `
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between;">
                        <strong style="color: #000;">${edu.degree} - ${edu.school}</strong>
                        <span style="color: #666; font-size: 0.9rem;">${edu.year}${edu.gpa ? ' | ' + edu.gpa : ''}</span>
                    </div>
                </div>
            `;
        }
    });

    let skillsHTML = '';
    data.skills.forEach(skill => {
        if (skill.name) {
            skillsHTML += skill.name + ' • ';
        }
    });
    if (skillsHTML) {
        skillsHTML = skillsHTML.slice(0, -3);
    }

    let certificationsHTML = '';
    data.certifications.forEach(cert => {
        if (cert.name) {
            certificationsHTML += `<div style="margin-bottom: 8px;"><strong>${cert.name}</strong> - ${cert.org}</div>`;
        }
    });

    return `
        <div class="cv-template">
            <div style="max-width: 800px; margin: 0 auto; background: white; padding: 60px 50px; font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6;">
                <div style="margin-bottom: 40px;">
                    <h1 style="margin: 0 0 5px 0; font-size: 2.8rem; color: #000; font-weight: 300; letter-spacing: -1px;">${data.fullName}</h1>
                    <p style="margin: 0 0 15px 0; font-size: 1.1rem; color: #666;">${data.jobTitle}</p>
                    <div style="color: #666; font-size: 0.95rem;">
                        ${data.email ? `${data.email}` : ''}
                        ${data.phone ? ` • ${data.phone}` : ''}
                        ${data.location ? ` • ${data.location}` : ''}
                    </div>
                    ${data.linkedin || data.github || data.portfolio ? `
                        <div style="margin-top: 8px; font-size: 0.9rem;">
                            ${data.linkedin ? `<a href="${data.linkedin}" style="color: #000; text-decoration: none; margin-right: 15px;">LinkedIn</a>` : ''}
                            ${data.github ? `<a href="${data.github}" style="color: #000; text-decoration: none; margin-right: 15px;">GitHub</a>` : ''}
                            ${data.portfolio ? `<a href="${data.portfolio}" style="color: #000; text-decoration: none;">Portfolio</a>` : ''}
                        </div>
                    ` : ''}
                </div>

                ${data.summary ? `
                    <div style="margin-bottom: 35px;">
                        <h2 style="font-size: 1.1rem; color: #000; font-weight: 600; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">Summary</h2>
                        <p style="margin: 0; color: #444;">${data.summary}</p>
                    </div>
                ` : ''}

                ${experienceHTML ? `
                    <div style="margin-bottom: 35px;">
                        <h2 style="font-size: 1.1rem; color: #000; font-weight: 600; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">Experience</h2>
                        ${experienceHTML}
                    </div>
                ` : ''}

                ${educationHTML ? `
                    <div style="margin-bottom: 35px;">
                        <h2 style="font-size: 1.1rem; color: #000; font-weight: 600; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;">Education</h2>
                        ${educationHTML}
                    </div>
                ` : ''}

                ${skillsHTML ? `
                    <div style="margin-bottom: 35px;">
                        <h2 style="font-size: 1.1rem; color: #000; font-weight: 600; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">Skills</h2>
                        <p style="margin: 0; color: #444;">${skillsHTML}</p>
                    </div>
                ` : ''}

                ${certificationsHTML ? `
                    <div style="margin-bottom: 35px;">
                        <h2 style="font-size: 1.1rem; color: #000; font-weight: 600; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px;">Certifications</h2>
                        ${certificationsHTML}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// ========================================
// Template 4: Creative
// ========================================

function generateCreativeTemplate(data) {
    const photoSrc = data.photo || 'https://via.placeholder.com/150';
    const themeColor = currentThemeColor;
    
    let experienceHTML = '';
    data.experiences.forEach(exp => {
        if (exp.title || exp.company) {
            experienceHTML += `
                <div style="margin-bottom: 25px; padding-left: 20px; border-left: 4px solid ${themeColor};">
                    <h4 style="margin: 0; font-size: 1.2rem; color: ${themeColor}; font-weight: 700;">${exp.title}</h4>
                    <p style="margin: 5px 0; color: #555; font-weight: 600;">${exp.company}</p>
                    <p style="margin: 5px 0; color: #888; font-size: 0.9rem; font-style: italic;">${exp.start} - ${exp.end}</p>
                    <p style="margin: 10px 0 0 0; color: #444; line-height: 1.7;">${exp.description}</p>
                </div>
            `;
        }
    });

    let educationHTML = '';
    data.education.forEach(edu => {
        if (edu.degree || edu.school) {
            educationHTML += `
                <div style="margin-bottom: 20px;">
                    <h4 style="margin: 0; font-size: 1.1rem; color: ${themeColor}; font-weight: 700;">${edu.degree}</h4>
                    <p style="margin: 5px 0; color: #555; font-weight: 600;">${edu.school}</p>
                    <p style="margin: 3px 0; color: #888; font-size: 0.9rem;">${edu.year}${edu.gpa ? ' | GPA: ' + edu.gpa : ''}</p>
                </div>
            `;
        }
    });

    let skillsHTML = '';
    data.skills.forEach(skill => {
        if (skill.name) {
            skillsHTML += `<span style="display: inline-block; background: ${themeColor}; color: white; padding: 8px 16px; margin: 5px; border-radius: 20px; font-size: 0.9rem; font-weight: 500;">${skill.name}</span>`;
        }
    });

    let certificationsHTML = '';
    data.certifications.forEach(cert => {
        if (cert.name) {
            certificationsHTML += `
                <div style="margin-bottom: 12px;">
                    <strong style="color: ${themeColor};">✓ ${cert.name}</strong>
                    <p style="margin: 3px 0 0 0; color: #666; font-size: 0.9rem;">${cert.org}</p>
                </div>
            `;
        }
    });

    return `
        <div class="cv-template">
            <div style="max-width: 900px; margin: 0 auto; background: white; padding: 0; font-family: 'Segoe UI', Arial, sans-serif;">
                <div style="background: linear-gradient(135deg, ${themeColor} 0%, #6b21a8 100%); color: white; padding: 60px 50px; position: relative; overflow: hidden;">
                    <div style="position: absolute; top: -50px; right: -50px; width: 200px; height: 200px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                    <div style="position: absolute; bottom: -30px; left: -30px; width: 150px; height: 150px; background: rgba(255,255,255,0.1); border-radius: 50%;"></div>
                    ${data.photo ? `<img src="${photoSrc}" alt="Profile" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 5px solid white; margin-bottom: 20px; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">` : ''}
                    <h1 style="margin: 0; font-size: 3rem; font-weight: 800; position: relative; z-index: 1;">${data.fullName}</h1>
                    <p style="margin: 10px 0 20px 0; font-size: 1.4rem; font-weight: 300; position: relative; z-index: 1;">${data.jobTitle}</p>
                    <div style="display: flex; gap: 20px; flex-wrap: wrap; position: relative; z-index: 1;">
                        ${data.email ? `<span><i class="fas fa-envelope"></i> ${data.email}</span>` : ''}
                        ${data.phone ? `<span><i class="fas fa-phone"></i> ${data.phone}</span>` : ''}
                        ${data.location ? `<span><i class="fas fa-map-marker-alt"></i> ${data.location}</span>` : ''}
                    </div>
                </div>

                <div style="padding: 50px;">
                    ${data.summary ? `
                        <div style="margin-bottom: 40px;">
                            <h2 style="color: ${themeColor}; font-size: 1.8rem; font-weight: 700; margin-bottom: 15px; display: flex; align-items: center; gap: 10px;">
                                <span style="width: 6px; height: 30px; background: ${themeColor}; border-radius: 3px;"></span>
                                About Me
                            </h2>
                            <p style="color: #444; line-height: 1.8; font-size: 1.05rem;">${data.summary}</p>
                        </div>
                    ` : ''}

                    ${experienceHTML ? `
                        <div style="margin-bottom: 40px;">
                            <h2 style="color: ${themeColor}; font-size: 1.8rem; font-weight: 700; margin-bottom: 20px; display: flex; align-items: center; gap: 10px;">
                                <span style="width: 6px; height: 30px; background: ${themeColor}; border-radius: 3px;"></span>
                                Experience
                            </h2>
                            ${experienceHTML}
                        </div>
                    ` : ''}

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                        ${educationHTML ? `
                            <div>
                                <h2 style="color: ${themeColor}; font-size: 1.5rem; font-weight: 700; margin-bottom: 20px;">Education</h2>
                                ${educationHTML}
                            </div>
                        ` : ''}

                        ${certificationsHTML ? `
                            <div>
                                <h2 style="color: ${themeColor}; font-size: 1.5rem; font-weight: 700; margin-bottom: 20px;">Certifications</h2>
                                ${certificationsHTML}
                            </div>
                        ` : ''}
                    </div>

                    ${skillsHTML ? `
                        <div style="margin-top: 40px;">
                            <h2 style="color: ${themeColor}; font-size: 1.5rem; font-weight: 700; margin-bottom: 20px;">Skills</h2>
                            <div>${skillsHTML}</div>
                        </div>
                    ` : ''}

                    ${data.linkedin || data.github || data.portfolio || data.twitter ? `
                        <div style="margin-top: 40px; padding-top: 30px; border-top: 3px solid ${themeColor};">
                            <h3 style="color: ${themeColor}; margin-bottom: 15px;">Connect With Me</h3>
                            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                                ${data.linkedin ? `<a href="${data.linkedin}" style="color: ${themeColor}; text-decoration: none; font-weight: 600;"><i class="fab fa-linkedin"></i> LinkedIn</a>` : ''}
                                ${data.github ? `<a href="${data.github}" style="color: ${themeColor}; text-decoration: none; font-weight: 600;"><i class="fab fa-github"></i> GitHub</a>` : ''}
                                ${data.portfolio ? `<a href="${data.portfolio}" style="color: ${themeColor}; text-decoration: none; font-weight: 600;"><i class="fas fa-globe"></i> Portfolio</a>` : ''}
                                ${data.twitter ? `<a href="${data.twitter}" style="color: ${themeColor}; text-decoration: none; font-weight: 600;"><i class="fab fa-twitter"></i> Twitter</a>` : ''}
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
}

// ========================================
// Template 5: Professional
// ========================================

function generateProfessionalTemplate(data) {
    const photoSrc = data.photo || 'https://via.placeholder.com/100';
    const themeColor = currentThemeColor;
    
    let experienceHTML = '';
    data.experiences.forEach(exp => {
        if (exp.title || exp.company) {
            experienceHTML += `
                <div style="margin-bottom: 20px; page-break-inside: avoid;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 5px;">
                        <h4 style="margin: 0; font-size: 1.1rem; color: #000; font-weight: 700;">${exp.title}</h4>
                        <span style="color: #666; font-size: 0.95rem; white-space: nowrap;">${exp.start} - ${exp.end}</span>
                    </div>
                    <p style="margin: 3px 0 8px 0; color: ${themeColor}; font-weight: 600; font-size: 1rem;">${exp.company}</p>
                    <p style="margin: 0; color: #444; line-height: 1.7;">${exp.description}</p>
                </div>
            `;
        }
    });

    let educationHTML = '';
    data.education.forEach(edu => {
        if (edu.degree || edu.school) {
            educationHTML += `
                <div style="margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline;">
                        <h4 style="margin: 0; font-size: 1.05rem; color: #000; font-weight: 700;">${edu.degree}</h4>
                        <span style="color: #666; font-size: 0.9rem;">${edu.year}</span>
                    </div>
                    <p style="margin: 3px 0; color: ${themeColor}; font-weight: 600;">${edu.school}${edu.gpa ? ' | GPA: ' + edu.gpa : ''}</p>
                </div>
            `;
        }
    });

    let skillsHTML = '';
    data.skills.forEach(skill => {
        if (skill.name) {
            skillsHTML += `<li style="margin-bottom: 5px; color: #444;">${skill.name}</li>`;
        }
    });

    let certificationsHTML = '';
    data.certifications.forEach(cert => {
        if (cert.name) {
            certificationsHTML += `
                <div style="margin-bottom: 10px;">
                    <strong style="color: #000;">${cert.name}</strong>
                    <p style="margin: 2px 0 0 0; color: #666; font-size: 0.9rem;">${cert.org}</p>
                </div>
            `;
        }
    });

    return `
        <div class="cv-template">
            <div style="max-width: 850px; margin: 0 auto; background: white; padding: 50px; font-family: 'Times New Roman', serif;">
                <div style="border-bottom: 4px solid ${themeColor}; padding-bottom: 25px; margin-bottom: 30px; text-align: center;">
                    ${data.photo ? `<img src="${photoSrc}" alt="Profile" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; border: 3px solid ${themeColor};">` : ''}
                    <h1 style="margin: 0 0 8px 0; font-size: 2.5rem; color: #000; font-weight: 700; letter-spacing: 1px;">${data.fullName}</h1>
                    <p style="margin: 0 0 15px 0; font-size: 1.2rem; color: ${themeColor}; font-weight: 600;">${data.jobTitle}</p>
                    <div style="color: #555; font-size: 0.95rem;">
                        ${data.email ? `${data.email}` : ''}
                        ${data.phone ? ` | ${data.phone}` : ''}
                        ${data.location ? ` | ${data.location}` : ''}
                    </div>
                </div>

                ${data.summary ? `
                    <div style="margin-bottom: 30px;">
                        <h2 style="color: ${themeColor}; font-size: 1.4rem; font-weight: 700; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid ${themeColor};">PROFESSIONAL SUMMARY</h2>
                        <p style="color: #333; line-height: 1.8; text-align: justify;">${data.summary}</p>
                    </div>
                ` : ''}

                ${experienceHTML ? `
                    <div style="margin-bottom: 30px;">
                        <h2 style="color: ${themeColor}; font-size: 1.4rem; font-weight: 700; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid ${themeColor};">PROFESSIONAL EXPERIENCE</h2>
                        ${experienceHTML}
                    </div>
                ` : ''}

                ${educationHTML ? `
                    <div style="margin-bottom: 30px;">
                        <h2 style="color: ${themeColor}; font-size: 1.4rem; font-weight: 700; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 2px solid ${themeColor};">EDUCATION</h2>
                        ${educationHTML}
                    </div>
                ` : ''}

                ${skillsHTML ? `
                    <div style="margin-bottom: 30px;">
                        <h2 style="color: ${themeColor}; font-size: 1.4rem; font-weight: 700; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid ${themeColor};">SKILLS</h2>
                        <ul style="margin: 0; padding-left: 20px; columns: 2; column-gap: 30px;">
                            ${skillsHTML}
                        </ul>
                    </div>
                ` : ''}

                ${certificationsHTML ? `
                    <div style="margin-bottom: 30px;">
                        <h2 style="color: ${themeColor}; font-size: 1.4rem; font-weight: 700; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 2px solid ${themeColor};">CERTIFICATIONS</h2>
                        ${certificationsHTML}
                    </div>
                ` : ''}

                ${data.linkedin || data.github || data.portfolio || data.twitter ? `
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #ddd; text-align: center;">
                        ${data.linkedin ? `<a href="${data.linkedin}" style="color: ${themeColor}; text-decoration: none; margin: 0 15px;">LinkedIn</a>` : ''}
                        ${data.github ? `<a href="${data.github}" style="color: ${themeColor}; text-decoration: none; margin: 0 15px;">GitHub</a>` : ''}
                        ${data.portfolio ? `<a href="${data.portfolio}" style="color: ${themeColor}; text-decoration: none; margin: 0 15px;">Portfolio</a>` : ''}
                        ${data.twitter ? `<a href="${data.twitter}" style="color: ${themeColor}; text-decoration: none; margin: 0 15px;">Twitter</a>` : ''}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// ========================================
// Utility Functions
// ========================================

// Edit resume - go back to form
function editResume() {
    document.getElementById('form-view').style.display = 'block';
    document.getElementById('cv-view').style.display = 'none';
}

// Download resume as HTML file
function downloadResume() {
    const resumeContent = document.getElementById('resumeOutput').innerHTML;
    const fullHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume - ${document.getElementById('fullName').value}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .template-modern { display: grid; grid-template-columns: 35% 65%; min-height: 100vh; }
        .template-sidebar { background: linear-gradient(180deg, #1e293b 0%, #334155 100%); color: white; padding: 40px 30px; }
        .template-main { padding: 40px; background: white; }
        .profile-img-container { width: 180px; height: 180px; margin: 0 auto 30px; border-radius: 50%; overflow: hidden; border: 5px solid rgba(255,255,255,0.2); box-shadow: 0 10px 30px rgba(0,0,0,0.3); }
        .profile-img-container img { width: 100%; height: 100%; object-fit: cover; }
        .template-name { font-size: 2rem; font-weight: 700; margin-bottom: 10px; text-align: center; }
        .template-contact { margin: 20px 0; padding: 20px; background: rgba(255,255,255,0.1); border-radius: 10px; }
        .contact-item { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-size: 0.9rem; }
        .template-section { margin-bottom: 30px; }
        .template-section-title { color: #3b82f6; font-size: 1.5rem; font-weight: 700; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 3px solid #3b82f6; }
        .sidebar-section-title { color: white; font-size: 1.3rem; font-weight: 700; margin: 25px 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid rgba(255,255,255,0.3); }
        .skill-item { margin-bottom: 15px; }
        .skill-name { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 0.9rem; }
        .skill-bar { height: 8px; background: rgba(255,255,255,0.2); border-radius: 10px; overflow: hidden; }
        .skill-progress { height: 100%; background: linear-gradient(90deg, #06b6d4, #3b82f6); border-radius: 10px; }
        @media (max-width: 768px) { .template-modern { grid-template-columns: 1fr; } }
        @media print {
            body { background: white; }
            .template-modern { box-shadow: none; }
        }
    </style>
</head>
<body>
    ${resumeContent}
</body>
</html>`;
    
    const blob = new Blob([fullHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Resume_${document.getElementById('fullName').value.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Toggle preview minimize/maximize
function togglePreview() {
    const container = document.querySelector('.preview-container');
    const icon = document.getElementById('previewToggleIcon');
    previewMinimized = !previewMinimized;
    
    if (previewMinimized) {
        container.classList.add('minimized');
        icon.classList.remove('fa-compress-alt');
        icon.classList.add('fa-expand-alt');
    } else {
        container.classList.remove('minimized');
        icon.classList.remove('fa-expand-alt');
        icon.classList.add('fa-compress-alt');
    }
}