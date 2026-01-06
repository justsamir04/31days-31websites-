
const projects = [
  {
    id: 1,
    title: "flowers",
    year: "01",
    image:
      "https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWVzdGhldGljfGVufDB8fDB8fHww"
  },
  {
    id: 2,
    title: "Random bridge",
    year: "02",
    image:
      "https://images.unsplash.com/photo-1461696114087-397271a7aedc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWVzdGhldGljfGVufDB8fDB8fHww"
  },
  {
    id: 3,
    title: "Beach",
    year: "03",
    image:
      "https://plus.unsplash.com/premium_photo-1720694818685-60a176ddfedf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 4,
    title: "river",
    year: "04",
    image:
      "https://images.unsplash.com/photo-1569154107747-fb00e3b3430d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 5,
    title: "Highway",
    year: "05",
    image:
      "https://images.unsplash.com/photo-1504253492562-cbc4dc540fcb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 6,
    title: "sunset",
    year: "06",
    image:
      "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 7,
    title: "Random road",
    year: "07",
    image:
      "https://plus.unsplash.com/premium_photo-1673285285994-6bfff235db97?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 8,
    title: "Rain",
    year: "08",
    image:
      "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 9,
    title: "Night",
    year: "09",
    image:
      "https://images.unsplash.com/photo-1606764765380-105d13e2918b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njl8fGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 10,
    title: "Home",
    year: "10",
    image:
      "https://images.unsplash.com/photo-1578504771781-b04176969805?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGFlc3RoZXRpY3xlbnwwfHwwfHx8MA%3D%3D"
  }
];

document.addEventListener("DOMContentLoaded", function () {
  const projectsContainer = document.querySelector(".projects-container");
  const backgroundImage = document.getElementById("background-image");

  // Render projects
  renderProjects(projectsContainer);

  // Initialize animations
  initialAnimation();

  // Preload images
  preloadImages();

  // Add hover events to project items
  setupHoverEvents(backgroundImage, projectsContainer);
});

// Render project items
function renderProjects(container) {
  projects.forEach((project) => {
    const projectItem = document.createElement("div");
    projectItem.classList.add("project-item");
    projectItem.dataset.id = project.id;
    projectItem.dataset.image = project.image;

    projectItem.innerHTML = `
      <div class="project-title">${project.title}</div>
      <div class="project-year">${project.year}</div>
    `;

    container.appendChild(projectItem);
  });
}

// Initial animation for project items
function initialAnimation() {
  const projectItems = document.querySelectorAll(".project-item");

  // Set initial state
  projectItems.forEach((item, index) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(20px)";

    // Animate in with staggered delay
    setTimeout(() => {
      item.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
    }, index * 60);
  });
}

// Setup hover events for project items
function setupHoverEvents(backgroundImage, projectsContainer) {
  const projectItems = document.querySelectorAll(".project-item");
  let currentImage = null;
  let zoomTimeout = null;

  // Preload all images to ensure immediate display
  const preloadedImages = {};
  projects.forEach((project) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = project.image;
    preloadedImages[project.id] = img;
  });

  projectItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      const imageUrl = this.dataset.image;

      // Clear any pending zoom timeout
      if (zoomTimeout) {
        clearTimeout(zoomTimeout);
      }

      // Reset transform and transition
      backgroundImage.style.transition = "none";
      backgroundImage.style.transform = "scale(1.2)";

      // Immediately show the new image
      backgroundImage.src = imageUrl;
      backgroundImage.style.opacity = "1";

      // Force browser to acknowledge the scale reset before animating
      // This ensures the zoom effect happens every time
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Re-enable transition and animate to scale 1.0
          backgroundImage.style.transition =
            "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          backgroundImage.style.transform = "scale(1.0)";
        });
      });

      // Update current image
      currentImage = imageUrl;
    });
  });

  // Handle mouse leaving the projects container
  projectsContainer.addEventListener("mouseleave", function () {
    // Hide the image
    backgroundImage.style.opacity = "0";
    currentImage = null;
  });
}

// Preload images
function preloadImages() {
  projects.forEach((project) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = project.image;
  });
}
