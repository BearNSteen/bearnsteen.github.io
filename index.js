const sensitiveInfo = {
  // ... other sensitive info ...
  contactEmail: "dcglendon@gmail.com",
  contactLinkedIn: "linkedin.com/in/dglendon",
  contactGitHub: "https://github.com/BearNSteen"
};

const jobsData = [
  {
      title: "Data Annotator, DataAnnotation",
      period: "January 2024 - Present",
      backgroundImage: "images/black.png",
      responsibilities: [
          "Perform AI testing routines based on detailed instructions to ensure accurate and efficient AI learning",
          "Deliver consistent high-quality work, maintaining precision and attention to detail",
          "Label and categorize large datasets for machine learning model training",
          "Analyze and interpret complex data to identify patterns and trends",
          "Collaborate with AI developers to refine annotation guidelines and improve data quality",
          "Contribute to the development and improvement of AI models through accurate data annotation",
          "Adhere to strict confidentiality and data security protocols"
      ]
  },
  {
      title: "Software Development Engineer Intern, Amazon",
      period: "June 2022 - September 2022",
      backgroundImage: "images/amazonblack.png",
      responsibilities: [
          "Developed a scalable solution for payment instrument verification for pre-orders and subscriptions",
          "Advised professional software engineers on their projects, demonstrating leadership skills",
          "Consistently delivered high-quality work according to SCRUM methodologies",
          "Implemented innovative solutions to complex problems, aligning with \"Invent and Simplify\" principle",
          "Collaborated effectively with cross-functional teams to ensure project success",
          "Contributed to code reviews and participated in technical discussions",
          "Adhered to Amazon's high bar for engineering excellence and best practices"
      ]
  },
  {
      title: "Computer Science Teaching Assistant, Oregon State University",
      period: "September 2021 - June 2022",
      backgroundImage: "images/orange.png",
      responsibilities: [
          "Assisted in teaching introductory Computer Science courses focusing on Python",
          "Guided students through fundamental CS concepts from basic algorithms to testing methodologies",
          "Conducted office hours to provide one-on-one support and clarification on course materials",
          "Graded assignments manually, providing detailed feedback to enhance student learning",
          "Facilitated problem-solving sessions, helping students develop critical thinking skills",
          "Collaborated with professors to improve course content and teaching strategies",
          "Mentored students, fostering their growth and interest in Computer Science"
      ]
  }
];

const projectsData = [
    {
      title: "Creatures of Habbitt (Godot Rhythm RPG)",
      image: "path/to/creatures-of-habbitt-image.jpg",
      description: "Created a Rhythm RPG using Godot engine (GDScript, which is like Python), demonstrating my ability to quickly learn and apply new technologies.",
      link: "#",
      technologies: ["Godot", "GDScript", "Game Development"]
    },
    {
      title: "AI-Powered Application",
      image: "path/to/ai-application-image.jpg",
      description: "Developed an AI application using Python and machine learning libraries. This project showcased my skills in AI development and problem-solving.",
      link: "#",
      technologies: ["Python", "Machine Learning", "AI"]
    },
    {
      title: "We're Watching (Reality Show Simulator)",
      image: "path/to/were-watching-image.jpg",
      description: "Developed a web-based simulator for the fake \"We're Watching\" reality TV show using JavaScript and HTML/CSS. This project demonstrates my skills in web development and game logic implementation.",
      link: "watching/game.html",
      technologies: ["JavaScript", "HTML", "CSS", "Web Development"]
    }
  ];

function generateJobsHTML() {
  const jobsContainer = document.getElementById('jobs-container');
  jobsData.forEach(job => {
      const jobDiv = document.createElement('div');
      jobDiv.className = 'job';
      jobDiv.style.backgroundImage = `url('${job.backgroundImage}')`;

      jobDiv.innerHTML = `
          <h3 class="job-title">${job.title} <span class="toggle-icon">▼</span></h3>
          <div class="job-content" style="display: none;">
              <p>${job.period}</p>
              <ul>
                  ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
              </ul>
          </div>
      `;

      jobsContainer.appendChild(jobDiv);

      // Add click event listener to the title
      const title = jobDiv.querySelector('.job-title');
      const content = jobDiv.querySelector('.job-content');
      const icon = title.querySelector('.toggle-icon');

      title.addEventListener('click', function(event) {
          event.stopPropagation();
          content.style.display = content.style.display === 'none' ? 'block' : 'none';
          icon.textContent = content.style.display === 'none' ? '▼' : '▲';
      });
  });
}

function generateProjectsHTML() {
  const projectsContainer = document.getElementById('projects-container');
  projectsData.forEach(project => {
      const projectDiv = document.createElement('div');
      projectDiv.className = 'project';

      projectDiv.innerHTML = `
          <h3 class="project-title">${project.title} <span class="toggle-icon">▼</span></h3>
          <div class="project-content" style="display: none;">
              <img src="${project.image}" alt="${project.title}" class="project-image">
              <p class="project-description">${project.description}</p>
              <a href="${project.link}" target="_blank" class="project-link">View Project</a>
              <div class="project-technologies">
                  ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
              </div>
          </div>
      `;

      projectsContainer.appendChild(projectDiv);

      // Add click event listener to the title
      const title = projectDiv.querySelector('.project-title');
      const content = projectDiv.querySelector('.project-content');
      const icon = title.querySelector('.toggle-icon');

      title.addEventListener('click', function(event) {
          event.stopPropagation();
          content.style.display = content.style.display === 'none' ? 'block' : 'none';
          icon.textContent = content.style.display === 'none' ? '▼' : '▲';
      });
  });
}

document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('click', function() {
      const experience = this.getAttribute('data-experience');
      alert(`Experience: ${experience}`);
    });
  });

document.querySelectorAll('.job').forEach(job => {
  job.addEventListener('mouseover', (e) => {
      let tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = e.currentTarget.getAttribute('title');
      document.body.appendChild(tooltip);
      
      let rect = e.currentTarget.getBoundingClientRect();
      tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
      tooltip.style.top = (rect.bottom + 5) + 'px';
  });

  job.addEventListener('mouseout', () => {
      let tooltip = document.querySelector('.tooltip');
      if (tooltip) tooltip.remove();
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Handle individual projects
  generateJobsHTML();
  generateProjectsHTML();

  const nameElement = document.getElementById('myname');
  if (nameElement && nameElement.textContent === 'Redacted') {
      nameElement.textContent = 'Dan Glendon';
  }

  const banner = document.getElementById('constructionBanner');
  const today = new Date();
  const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear().toString().substr(-2)}`;

  banner.innerHTML = banner.innerHTML.replace(/\d{1,2}\/\d{1,2}\/\d{2}/, formattedDate);

  // Inject contact information
  document.getElementById('contact-email').textContent = sensitiveInfo.contactEmail;
  document.getElementById('contact-linkedin').textContent = sensitiveInfo.contactLinkedIn;
  document.getElementById('contact-github').textContent = sensitiveInfo.contactGitHub;
  generateJobsHTML();
  generateProjectsHTML();
});
