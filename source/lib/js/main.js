$(document).ready(function() {
  $('.tweets').twitter({
    count : 1
  });
  
  setActiveProject();
});

function setActiveProject() {
  var currentProject = $('.project.active');
  
  if(currentProject.length > 0) {
    var nextProject = (currentProject.next().length > 0 ? currentProject.next() : $('.project:eq(0)'));
    
    currentProject.removeClass('active');
    nextProject.addClass('active');
  }
  
  else {
    var i = Math.floor(Math.random() * $('.project').length);
    
    $('.project:eq(' + i + ')').addClass('active');
  }
  
  startCarouselTimer();
}

function startCarouselTimer() {
  setTimeout(setActiveProject, 10000);
}