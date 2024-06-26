document.querySelectorAll('.skill').forEach(skill => {
    skill.addEventListener('click', function() {
      const experience = this.getAttribute('data-experience');
      alert(`Experience: ${experience}`);
    });
  });