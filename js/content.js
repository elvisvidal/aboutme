// Function to load and render content
async function loadContent() {
  try {
    const response = await fetch('/data/content.json');
    const data = await response.json();

    // Render About section
    document.querySelector('#about h1').innerHTML = `${
      data.about.name.split(' ')[0]
    } <span class="text-primary">${data.about.name.split(' ')[1]}</span>`;
    document.querySelector(
      '#about .subheading'
    ).innerHTML = `${data.about.location} · <a href="mailto:${data.about.email}">${data.about.email}</a>`;
    document.querySelector('#about .lead').textContent = data.about.description;

    // Render social icons
    const socialIcons = document.querySelector('#about .social-icons');
    socialIcons.innerHTML = `
            <a class="social-icon" target="_blank" aria-label="Follow me on LinkedIn" href="${data.about.social.linkedin}"><i class="fab fa-linkedin-in"></i></a>
            <a class="social-icon" target="_blank" aria-label="Follow me on Github" href="${data.about.social.github}"><i class="fab fa-github"></i></a>
            <a class="social-icon" target="_blank" aria-label="Follow me on Facebook" href="${data.about.social.facebook}"><i class="fab fa-facebook-f"></i></a>
        `;

    // Render Experience section
    const experienceSection = document.querySelector(
      '#experience .resume-section-content'
    );
    experienceSection.innerHTML = '<h2 class="mb-5">Experience</h2>';

    data.experience.forEach((exp) => {
      const experienceHtml = `
                <div class="d-flex flex-column flex-md-row justify-content-between mb-5">
                    <div class="flex-grow-1">
                        <h3 class="mb-0">${exp.title}</h3>
                        <div class="subheading mb-3">${exp.company}, ${
        exp.location
      }</div>
                        <p>${exp.description}</p>
                        ${
                          exp.achievements
                            ? `
                            <ul>
                                ${exp.achievements
                                  .map(
                                    (achievement) => `
                                    <li>
                                        <p><b>${achievement.title}:</b> ${achievement.description}</p>
                                    </li>
                                `
                                  )
                                  .join('')}
                            </ul>
                        `
                            : ''
                        }
                    </div>
                    <div class="flex-shrink-0">
                        <span class="text-primary">${exp.period}</span>
                    </div>
                </div>
            `;
      experienceSection.innerHTML += experienceHtml;
    });

    // Render Skills section
    const skillsSection = document.querySelector(
      '#skills .resume-section-content'
    );
    skillsSection.innerHTML = `
            <h2 class="mb-5">Skills</h2>
            <div class="subheading mb-3">Programming Languages & Tools</div>
            <ul class="list-inline dev-icons">
                ${data.skills.programmingLanguages
                  .map(
                    (lang) => `
                    <li title="${lang.name}" class="list-inline-item">
                        <i class="fab ${lang.icon}"></i>
                    </li>
                `
                  )
                  .join('')}
            </ul>
            <div class="subheading mb-3">Workflow</div>
            <ul class="fa-ul mb-0">
                ${data.skills.workflow
                  .map(
                    (item) => `
                    <li>
                        <span class="fa-li"><i class="fas fa-check"></i></span>
                        ${item}
                    </li>
                `
                  )
                  .join('')}
            </ul>
        `;

    // Render Interests section
    const interestsSection = document.querySelector(
      '#interests .resume-section-content'
    );
    interestsSection.innerHTML = `
            <h2 class="mb-5">Interests</h2>
            <p>${data.interests.outdoor}</p>
            <p class="mb-0">${data.interests.indoor}</p>
        `;

    // Render Certifications section
    const certificationsSection = document.querySelector(
      '#certifications .resume-section-content'
    );
    certificationsSection.innerHTML = `
            <h2 class="mb-5">Certifications</h2>
            <ul class="fa-ul mb-0">
                ${data.certifications
                  .map(
                    (cert) => `
                    <li>
                        <span class="fa-li"><i class="fas fa-trophy text-warning"></i></span>
                        ${cert.name} - ${cert.provider} - ${cert.year}
                    </li>
                `
                  )
                  .join('')}
            </ul>
        `;
  } catch (error) {
    console.error('Error loading content:', error);
  }
}

// Load content when the page is ready
document.addEventListener('DOMContentLoaded', loadContent);
