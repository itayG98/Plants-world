function validateMail(mail) {
	if (mail)
		return true
	return false
}

$(document).ready(function() {
  const imageNames = ["slide00.png", "slide01.png", "slide02.png", "slide03.png"];
  const heroSection = $(".hero-section");
  let intervalId = null; // Store the interval ID
  let currentImageIndex = 0;
  let intervalTime = 4 * 1000;
  const form = $("form.form")
  const scrollToTopBtn = $("#scrollToTopBtn");



  function updateImage() {
    const nextImageIndex = (currentImageIndex + 1) % imageNames.length;
    const nextImageName = imageNames[nextImageIndex];
    const nextImageUrl = `assets/images/${nextImageName}`;

    heroSection.css("background-image", `url('${nextImageUrl}')`);

    currentImageIndex = nextImageIndex;
  }

  function startCarousel() {
    intervalId = setInterval(updateImage, intervalTime);
  }

  function stopCarousel() {
    clearInterval(intervalId);
    intervalId = null;
  }

	// Remove the preloader and fade body and footer in
  $(".preloader").fadeOut(500, function() {
    $("main,footer").css("opacity", 1); // Fade in the body content after preloader disappears
  });
  // Start the carousel on page load
  startCarousel();

  heroSection.hover(function() {
    // Stop the interval on hover
    stopCarousel();
  }, function() {
    // Restart the interval on unhover, using current image index
    intervalId = setInterval(updateImage, intervalTime, currentImageIndex);
  });
	
  $(".preloader").fadeOut(500, function() {
    $("main,footer").css("opacity", 1); // Fade in the body content after preloader disappears
  });
	
  $("button[type='submit']").on('click', function() {
	event.preventDefault()
	const errors = []; // Array to store error messages
	const email = form.find("input[type='email']").val();
	if (validateMail(email)){
		$("#successModal").modal("show");
	}
	else {
	const errorList = $("#errorList");
    errorList.empty(); // Clear any previous errors
    errorList.append(`<li class='li'>The Email address is mandatory field</li>`);
	$("#failureModal").modal("show");
	}
  })


  // Show button when scrolled down
$(window).scroll(function() {
    const scrollTop = $(window).scrollTop(); // Get current scroll position
    const documentHeight = $(document).height(); // Get document height
    const windowHeight = $(window).height(); // Get window height

    // Show button when scrolled down and near bottom
    if (scrollTop + windowHeight >= documentHeight - 200) { // Within 200px from bottom
      scrollToTopBtn.fadeIn(500);
    } else {
      scrollToTopBtn.fadeOut(500);
    }
  });

  // Click event to scroll to top
scrollToTopBtn.click(function() {
  $("html, body").animate({ scrollTop: 0 }, {
    duration: 200, // Adjust duration for desired speed (in milliseconds)
    easing: "swing"
  });
});
});
