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
  const projectTitles = document.querySelectorAll('.project-title');
  
  projectTitles.forEach(title => {
      title.addEventListener('click', function(event) {
          event.stopPropagation(); // Prevent triggering parent section's click event
          const content = this.nextElementSibling;
          const icon = this.querySelector('.toggle-icon');
          
          content.style.display = content.style.display === 'none' ? 'block' : 'none';
          icon.textContent = content.style.display === 'none' ? '▼' : '▲';
      });
  });
});