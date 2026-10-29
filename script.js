
const hero = document.querySelector(".hero");
const heroSky = document.querySelector(".hero-sky");
const heroContent = document.querySelector(".hero-content");

const layer1 = document.querySelector(".layer-1");
const layer2 = document.querySelector(".layer-2");
const layer3 = document.querySelector(".layer-3");

const story = document.querySelector(".story");
const storyImage = document.querySelector(".story-image");
const rocks = document.querySelectorAll(".floating-rock");

let ticking = false;

function updateParallax() {
  const scrollY = window.scrollY;

  // Move the hero background and mountains at different speeds.
  if (hero && scrollY < hero.offsetHeight) {
    heroSky.style.transform =
      `translate3d(0, ${scrollY * 0.18}px, 0)`;

    layer1.style.transform =
      `translate3d(0, ${scrollY * -0.12}px, 0)`;

    layer2.style.transform =
      `translate3d(0, ${scrollY * -0.28}px, 0)`;

    layer3.style.transform =
      `translate3d(0, ${scrollY * -0.45}px, 0)`;

    heroContent.style.transform =
      `translate3d(-50%, calc(-50% + ${scrollY * -0.2}px), 0)`;
  }

  // Give the story background its own parallax movement.
  if (story) {
    const storyRect = story.getBoundingClientRect();
    const storyOffset = window.innerHeight - storyRect.top;

    storyImage.style.transform =
      `translate3d(0, ${storyOffset * -0.12}px, 0)`;

    rocks.forEach((rock, index) => {
      const speed = 0.08 + index * 0.07;

      rock.style.transform =
        `translate3d(0, ${storyOffset * -speed}px, 0)`;
    });
  }

  ticking = false;
}

function requestParallaxUpdate() {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
}

window.addEventListener("scroll", requestParallaxUpdate, {
  passive: true
});

window.addEventListener("resize", requestParallaxUpdate);

updateParallax();
