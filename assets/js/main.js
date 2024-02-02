/* <!-- MousePointer --> */
{
  // Mouse-Pointer - Start
  var $circle = $(".circle");
  var $follow = $(".circle-follow");

  function moveCircle(e) {
    TweenLite.to($circle, 0.3, {
      x: e.clientX,
      y: e.clientY,
    });
    TweenLite.to($follow, 0.7, {
      x: e.clientX,
      y: e.clientY,
    });
  }

  $(document).ready(function () {
    $(".hero-banner").on("mouseenter", function () {
      $(".circle").addClass("d-none");
      $(".circle-follow").addClass("d-none");
    });
    $(".hero-banner").on("mouseleave", function () {
      $(".circle").removeClass("d-none");
      $(".circle-follow").removeClass("d-none");
      $(window).on("mousemove", moveCircle);
    });

    //   myScheduleSwiper
    // $(".myScheduleSwiper").on("mouseenter", function () {
    //   $(".circle").addClass("d-none");
    //   $(".circle-follow").addClass("d-none");
    // });
    // $(".myScheduleSwiper").on("mouseleave", function () {
    //   console.log("test out");
    //   $(".circle").removeClass("d-none");
    //   $(".circle-follow").removeClass("d-none");
    //   $(window).on("mousemove", moveCircle);
    // });

    $(window).on("mousemove", moveCircle);
  });
  // Mouse-Pointer - End
}

/* <!-- NavigationBar --> */
{
  // NavigationBar Hide/Show Functionality - Start
  var header = document.querySelector("header nav");
  const hideNav = () => {
    header.classList.remove("fade-up-header");
  };
  document.querySelector("body").addEventListener("wheel", hideNav);
  document.querySelector("body").addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || "ArrowUp") {
      hideNav();
    }
  });

  // inViewport definition
  (function ($, win) {
    $.fn.inViewport = function (cb) {
      return this.each(function (i, el) {
        function visPx() {
          var elH = $(el).outerHeight(),
            H = $(win).height(),
            r = el.getBoundingClientRect(),
            t = r.top,
            b = r.bottom;
          return cb.call(
            el,
            Math.max(0, t > 0 ? Math.min(elH, H - t) : b < H ? b : H)
          );
        }
        visPx();
        $(win).on("resize scroll", visPx);
      });
    };
  })(jQuery, window);

  let count = 0;
  const hideNavigation = () => {
    $("#homePage").inViewport(function (px) {
      if (px >= window.innerHeight) {
        header.classList.remove("fade-up-header");
      } else {
        if (count === 0) {
          let timeOut = setTimeout(() => {
            header.classList.add("fade-up-header");
            count = 0;
          }, 6000);
          count = count + 1;
        }
      }
    });
  };

  document.querySelector("body").addEventListener("wheel", hideNavigation);
  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || "ArrowUp") {
      hideNavigation();
    }
  });

  // NavigationBar Hide/Show Functionality - End
}

/* <!-- FullPage-Scrolling --> */
{
  // FullPage - FullScreenScrolling - start
  if ($(window).width() >= 768) {
    var myFullpage = new fullpage("#fullpage", {
      autoScrolling: true,
      scrollHorizontally: true,
      licenseKey: "YOUR LICENSE KEY HERE",
    });
  }
  // FullPage - FullScreenScrolling - end
}

/* <!-- Hero-Banner --> */
{
  // Swiper HeroPage - start
  var sliderThumbnail = new Swiper(".slider-thumbnail", {
    slidesPerView: 3,
    spaceBetween: 30,
  });

  var slider = new Swiper(".slider", {
    slidesPerView: 1,
    navigation: false,
    thumbs: {
      swiper: sliderThumbnail,
    },
  });

  slider.on("slideChange", () => {
    let prevIndex = slider.previousIndex;
    let prevSlide = slider.slides[prevIndex];
    let prevSlideBtn = prevSlide.querySelector(".soundBtn");

    let playingVideoId = prevSlideBtn.getAttribute("data-btnId");
    videojs(playingVideoId).ready(function () {
      let muted = this.muted(true);
    });
    console.log(prevSlideBtn.classList);

    let flag = prevSlideBtn.classList.contains("soundBtn__muteBtn");

    if (flag) {
      prevSlideBtn.textContent = "Unmute";
      prevSlideBtn.classList.remove("soundBtn__muteBtn")
      prevSlideBtn.classList.add("soundBtn__unmuteBtn");
    }
    console.log(prevSlideBtn.classList);
  });

  // Swiper HeroPage - end

  // MuteButton Homepage - Toggle - start
  // Get the mute button and the specific section div
  const muteButton = document.querySelector(".swiper-slide-active .muteButton");
  const specificSection = document.querySelectorAll(
    ".swiper-slide .specificSection"
  );
  let isMuted = true;

  // Function to update mute button position and handle fade
  function updateMuteButtonPosition(event, muteBtn, ele) {
    const rect = ele.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    gsap.to(muteBtn, {
      duration: 0.2,
      x: offsetX - 20 + "px",
      y: offsetY - 20 + "px",
    });
  }

  // Function to toggle mute/unmute state and Audio
  var allMuteBtns = document.querySelectorAll(".muteButton");
  allMuteBtns.forEach((allMuteEle) => {
    allMuteEle.textContent = "Unmute";
    allMuteEle.addEventListener("click", (e) => {
      // VideoJS play/mute sound on click
      let flag = e.target.classList.contains("soundBtn__unmuteBtn");
      let videoId = e.target.getAttribute("data-btnId");
      videojs(videoId).ready(function () {
        if (flag) {
          let unmuted = this.muted(false);
        } else {
          let muted = this.muted(true);
        }
      });

      // Display Text Muted or Unmuted on Button
      isMuted = !isMuted;
      e.target.textContent = isMuted ? "Unmute" : "Mute";

      if (!isMuted) {
        e.target.classList.remove("soundBtn__unmuteBtn");
        e.target.classList.add("soundBtn__muteBtn");
      } else {
        e.target.classList.remove("soundBtn__muteBtn");
        e.target.classList.add("soundBtn__unmuteBtn");
      }
    });
  });

  // Event listeners
  specificSection.forEach((ele) => {
    ele.addEventListener("mousemove", (event) => {
      var parent = ele.closest(".swiper-slide");
      var mutedBtn2 = parent.querySelector(".muteButton");
      updateMuteButtonPosition(event, mutedBtn2, ele);
      mutedBtn2.style.opacity = 1; // Show the button
    });

    ele.addEventListener("mouseleave", () => {
      var parent = ele.closest(".swiper-slide");
      var mutedBtn2 = parent.querySelector(".muteButton");
      gsap.to(mutedBtn2, { duration: 0.1, opacity: 0 }); // Fade out the button
    });
  });

  // MuteButton Homepage - Toggle - end

  /* Mobile - Layout */
  // Swiper-1
  var mobileSwipe1Home = new Swiper(".mobileSwiper1Home", {
    spaceBetween: 30,
    allowTouchMove: false,
    effect: "fade",
    speed: 400,
  });

  // Swiper-2
  var mobileSwipe2Home = new Swiper(".mobileSwiper2Home", {
    spaceBetween: 30,
    effect: "creative",
    speed: 400,
    // For Dev: keyboard
    keyboard: {
      enabled: true,
    },
    creativeEffect: {
      prev: {
        translate: [0, 0, 0],
        opacity: 0,
        scale: 0.9,
      },
      next: {
        translate: ["0%", 0, 0],
        scale: 1,
        opacity: 0,
      },
    },
  });

  // Binding swiper1 and swiper2
  mobileSwipe2Home.on("slideNextTransitionStart", () => {
    mobileSwipe1Home.slideNext();
  });
  mobileSwipe2Home.on("slidePrevTransitionStart", () => {
    mobileSwipe1Home.slidePrev();
  });

  // Pause Video on swipe
  let vjsPlayBtns = document.querySelectorAll('[data-btngrp="vjsPlayBtn"]');
  for (let i = 0; i < vjsPlayBtns.length; i++) {
    if (vjsPlayBtns[i].tagName === "VIDEO") {
      let vidId = vjsPlayBtns[i].dataset.videoid;
      let absId = `#${vidId}`;
      let player = videojs(absId);
      mobileSwipe2Home.on("slideNextTransitionStart", () => {
        player.pause();
        player.load();
      });
      mobileSwipe2Home.on("slidePrevTransitionStart", () => {
        player.pause();
        player.load();
      });
    }
  }

  // Play or Pause Video on touch
  for (let i = 0; i < vjsPlayBtns.length; i++) {
    if (vjsPlayBtns[i].tagName === "VIDEO") {
      let vidId = vjsPlayBtns[i].dataset.videoid;
      let absId = `#${vidId}`;
      let player = videojs(absId);
      player.on("touchstart", function () {
        if (player.paused()) {
          player.play();
        } else {
          player.pause();
        }
      });
    }
  }
}

/* <!-- Show-Section --> */
{
  // Swiper - Shows-Section - Old&New Shows - Start
  var swiper = new Swiper(".mySwiper", {
    // loop: true,
    keyboard: {
      enabled: true,
    },
    // slidesPerView: 5,
    slidesOffsetBefore: 300,
    slidesOffsetAfter: 300,
    spaceBetween: 30,
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  });
  // Swiper - Shows-Section - Old&New Shows - End

  // Shows-Section Tab Indicator - Start
  const indicator = document.querySelector(".nav-indicator");
  const indicator2 = document.querySelector(".rect");
  const items = document.querySelectorAll(".nav-item--role");

  function handleIndicator(el) {
    items.forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("style");
    });
    indicator.style.width = `${el.offsetLeft + 50}px`;
    indicator2.style.left = `${el.offsetLeft + 30}px`;
    el.classList.add("active");
    el.style.color = el.getAttribute("active-color");
  }

  items.forEach((item, index) => {
    item.addEventListener("click", (e) => {
      handleIndicator(e.target);
    });
    item.classList.contains("active") && handleIndicator(item);
  });
  // Shows-Section Tab Indicator - End

  // ForMobile
  if ($(window).width() <= 768) {
    const indicator = document.querySelector(".mob-nav-indicator");
    const indicator2 = document.querySelector(".mob-rect");
    const items = document.querySelectorAll(".nav-item--role");
    function handleIndicator(el) {
      items.forEach((item) => {
        item.classList.remove("active");
        item.removeAttribute("style");
      });
      indicator.style.width = `${el.offsetLeft + 50}px`;
      indicator2.style.left = `${el.offsetLeft + 30}px`;

      el.classList.add("active");
      el.style.color = el.getAttribute("active-color");
    }

    items.forEach((item, index) => {
      item.addEventListener("click", (e) => {
        handleIndicator(e.target);
      });
      item.classList.contains("active") && handleIndicator(item);
    });
  }

  // Popular-Episodes (On Hover plays video)-start
  // Unmute on click of video-wrapper
  let allVidWrappers = document.querySelectorAll(".vw-pep");
  allVidWrappers.forEach((vid) => {
    vid.addEventListener("click", (event) => {
      let playerId = event.target.id;
      videojs(playerId).ready(function () {
        let unmuted = this.muted(false);
      });
    });
  });

  function playVideo() {
    let playerId = this.id;
    videojs(playerId).ready(function () {
      let myplayer = this;
      let muted = myplayer.muted(true);
      myplayer.load();
      myplayer.play();
    });
  }

  function pauseVideo() {
    let playerId = this.id;
    videojs(playerId).ready(function () {
      let myplayer = this;
      myplayer.pause();
      myplayer.load();
    });
  }

  // Play on mouse over and pause on mouse leave
  let allVids = document.querySelectorAll(".my-video");
  allVids.forEach((eachVid) => {
    eachVid.addEventListener("mouseover", playVideo, false);
    eachVid.addEventListener("mouseleave", pauseVideo, false);
  });

  // Popular-Episodes-end

  /* Mobile - Layout */
  // Swiper-3
  var mobileSwipe3Shows = new Swiper(".mobileOldShows", {
    grabCursor: true,
    keyboard: {
      enabled: true,
    },
    slidesPerView: 2,
    spaceBetween: 30,

    centeredSlides: true,
  });

  // Swiper-4
  var mobileSwipe4PopularEpisodes = new Swiper(".mobile_popularEpisodes", {
    keyboard: {
      enabled: true,
    },
    slidesPerView: 1.2,
    spaceBetween: 30,
    slidesOffsetBefore: 10,
  });
}

/* <!-- FashionHub-Section --> */
{
  // FashionHub - Cast-Swiper - Start
  var castswiper = new Swiper(".castSwiper", {
    slidesPerView: 4,
    keyboard: {
      enabled: true,
    },
    slideToClickedSlide: true,
    centerMode: true,
    slidesOffsetBefore: 300,
    slidesOffsetAfter: 120,
    initialSlide: 3,
    slidesPerGroup: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
  // FashionHub - Cast-Swiper - End

  // CastCrew-Animation Desktop - Start
  var array = document.querySelectorAll(
    ".fasion-hub__top .fasion-hub__landscape"
  );

  function closeCastCrewSidebar() {
    document
      .querySelector(".fasion-hub-casts")
      .classList.remove("remove-trigger-cast");
    document.querySelector(".cast-sidebar").classList.remove("open-cast-crew");
    document
      .querySelector(".fasion-hub__bottom")
      .classList.remove("open-cast-sidebar");
    document.querySelector(".fasion-hub__top").classList.remove("hide");
    document.querySelector(".cast-sidebar__castcrew").classList.remove("show");
  }

  function openCastCrewSidebar() {
    document
      .querySelector(".fasion-hub-casts")
      .classList.add("remove-trigger-cast");
    document.querySelector(".cast-sidebar").classList.add("open-cast-crew");
    document
      .querySelector(".fasion-hub__bottom")
      .classList.add("open-cast-sidebar");
    document.querySelector(".fasion-hub__top").classList.add("hide");
    document.querySelector(".cast-sidebar__castcrew").classList.add("show");
  }

  document
    .querySelector(".fasion-hub-casts__fullscreen")
    .addEventListener("click", () => {
      openCastCrewSidebar();
    });

  document
    .querySelector(".cast-sidebar .close-btn")
    .addEventListener("click", () => {
      closeCastCrewSidebar();
    });

  var allCastSliderImages = document.querySelectorAll(
    ".cast-sidebar__castcrew li"
  );
  allCastSliderImages.forEach((ele) => {
    ele.addEventListener("click", () => {
      closeCastCrewSidebar();
    });
  });
  // CastCrew-Animation Desktop - End

  // For Mobile-Version - Start
  function openMobileCastCrewSidebar() {
    let fh_cast = document.querySelector(".mcasts-bar .fasion-hub-casts");
    let max_fh_cast = document.querySelector(".mcasts-bar .cast-sidebar");
    fh_cast.classList.add("remove-trigger-cast");

    let calcHeight = parseFloat(
      document.querySelector(".fashion-section-mobile").offsetHeight / 10
    );
    max_fh_cast.style.height = `${calcHeight - 15}rem`;
    max_fh_cast.classList.add("open-cast-crew");
    // ;
  }

  let expandBtn = document.querySelector(
    ".mcasts-bar .fasion-hub-casts__fullscreen"
  );
  expandBtn.addEventListener("click", () => {
    openMobileCastCrewSidebar();
  });

  function closeMobileCastCrewSidebar() {
    let fh_cast = document.querySelector(".mcasts-bar .fasion-hub-casts");
    let max_fh_cast = document.querySelector(".mcasts-bar .cast-sidebar");
    fh_cast.classList.remove("remove-trigger-cast");
    max_fh_cast.style.height = `${0}rem`;
    max_fh_cast.classList.remove("open-cast-crew");
  }

  let shrinkBtn = document.querySelector(".mcasts-bar .close-btn");
  shrinkBtn.addEventListener("click", () => {
    closeMobileCastCrewSidebar();
  });

  var allCastSliderImages = document.querySelectorAll(
    ".cast-sidebar__castcrew-mobile li"
  );
  allCastSliderImages.forEach((ele) => {
    ele.addEventListener("click", () => {
      closeMobileCastCrewSidebar();
    });
  });
  // For Mobile-Version - End

  // FashionHub - TypeWriter
  // Function to simulate a typewriter effect
  function typeWriter(text, element, speed) {
    let i = 0;
    element.textContent = "";
    const interval = setInterval(function () {
      element.textContent += text.charAt(i);
      i++;
      if (i > text.length) {
        clearInterval(interval);
      }
    }, speed);
  }

  function toggleImage(blockNumber, event) {
    var castName = event.target.getAttribute("data-name");

    const typewriterElement = document.getElementById("typewriter-text");
    const textToType = castName;
    const typingSpeed = 100; // Adjust the speed as needed

    typeWriter(textToType, typewriterElement, typingSpeed);
    var allFasionImages = document.querySelectorAll(
      ".fasion-hub .aspect-container__wrapper img"
    );

    // FashionHub Image change Animation
    allFasionImages.forEach((ele) => {
      ele.classList.remove("IncreaseWidth");
      ele.classList.add("DecreaseWidth");
      var allElements = ele.getAttribute("class").split(" ")[1].split("-")[1];
      if (blockNumber === parseInt(allElements)) {
        ele.classList.add("IncreaseWidth");
        ele.classList.remove("DecreaseWidth");
      }
    });
  }

  // Mobile-Fashion-hub Toggling Images
  function toggleImageMobile(blockNumber, event) {
    let castName = event.target.getAttribute("data-name");

    // TypeWriter
    const typewriterElement = document.getElementById("typewriter-text-mobile");
    const textToType = castName;
    const typingSpeed = 100; // Adjust the speed as needed
    typeWriter(textToType, typewriterElement, typingSpeed);

    // Gallery-Animation
    let allGalleryImages = document.querySelectorAll(
      ".fashion-gallery-box img"
    );
    allGalleryImages.forEach((eachImage) => {
      eachImage.classList.remove("IncreaseWidth");
      eachImage.classList.add("DecreaseWidth");
      var allElements = eachImage
        .getAttribute("class")
        .split(" ")[1]
        .split("-")[1];
      if (blockNumber === parseInt(allElements)) {
        eachImage.classList.add("IncreaseWidth");
        eachImage.classList.remove("DecreaseWidth");
      }
    });
  }

  /* Mobile-Layout */
  //Swiper-10
  var mSwiperCastsBarMin = new Swiper(".mcastSwiper", {
    slidesPerView: 4,
    spaceBetween: 10,
    slidesOffsetBefore: 280,
    initialSlide: 1,
    slideToClickedSlide: true,
  });

  // FashionHub - CastBarAnimation
  let gallery = document.querySelectorAll(".fashion-gallery-box");
  gallery.forEach((element) => {
    element.addEventListener("click", () => {
      element.classList.toggle("show-info");
      element.querySelector(".hover-info").classList.toggle("show-info");
    });
  });
}

/* <!-- Schedule-Section --> */
{
  // Swiper - myScheduleSwiper - Start
  const scheduleSwiper = new Swiper(".myScheduleSwiper", {
    slidesPerView: 3,
    spaceBetween: 20,
    // cssMode: true,
    // loop: true,
    allowTouchMove: true,
    keyboard: {
      enabled: true,
    },
    slidesOffsetAfter: 120,
    /* autoplay: {
        disableOnInteraction: false,
        delay: 5000,
    }, */
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  const scheduleSwiper2 = new Swiper(".myScheduleSwiper2", {
    slidesPerView: 4,
    spaceBetween: 40,
    allowTouchMove: true,
    keyboard: {
      enabled: true,
    },
    slidesOffsetBefore: 120,
    slidesOffsetAfter: 120,
  });
  // Swiper - myScheduleSwiper - End

  // SchedulePage TabIndicator - Start
  const underline = document.querySelector(".underLine");
  const schedules = document.querySelectorAll(".nav-item--schedule");

  function moveLine(el) {
    schedules.forEach((sche) => {
      sche.classList.remove("active");
      sche.removeAttribute("style");
    });
    if (el.getAttribute("id") === "tommorwShow") {
      underline.style.left = `${el.offsetLeft + 179}px`;
    } else {
      underline.style.left = `${el.offsetLeft + 70}px`;
    }

    el.classList.add("active");
    el.style.color = el.getAttribute("active-color");
  }

  schedules.forEach((sche, index) => {
    sche.addEventListener("click", (e) => {
      moveLine(e.target);
    });
    sche.classList.contains("active") && moveLine(sche);
  });
  // SchedulePage TabIndicator - End

  // For Mobile
  if ($(window).width() <= 768) {
    const underline = document.querySelector(".mUnderLine");
    const schedules = document.querySelectorAll(".nav-mitem--schedule");

    function moveLine(el) {
      schedules.forEach((sche) => {
        sche.classList.remove("active");
        sche.removeAttribute("style");
      });
      if (el.getAttribute("id") === "mtommorwShow") {
        underline.style.left = `${el.offsetLeft + 94}px`;
      } else {
        underline.style.left = `${el.offsetLeft + 24}px`;
      }

      el.classList.add("active");
      el.style.color = el.getAttribute("active-color");
    }

    schedules.forEach((sche, index) => {
      sche.addEventListener("click", (e) => moveLine(e.target));
      sche.classList.contains("active") && moveLine(sche);
    });
  }

  // Syncing Height of Image and ScheduleSlider - Start
  // function autoHeightSchedule() {
  //   var imageHt = document.querySelector(
  //     ".schedule__wrapper__leftBlock--border"
  //   ).clientHeight;
  //   document.querySelector("#mySchedule").style.position = "relative";
  //   document.querySelector("#mySchedule").style.height = imageHt + "px";
  // }
  // setInterval(() => {
  //   autoHeightSchedule();
  // }, 10);
  // Syncing Height of Image and ScheduleSlider - End

  /* Mobile-Layout */
  // Swiper-5 - Tab1
  var mSwiperScheduleOne = new Swiper(".mScheduleSwiper", {
    slidesPerView: 1.2,
    spaceBetween: 10,
  });

  // Swiper-6 - Tab2
  var mSwiperScheduleTwo = new Swiper(".mScheduleSwiperTwo", {
    slidesPerView: 1.2,
    spaceBetween: 10,
  });
}

/* <!-- Videos-Section --> */
{
  // TrendingVideos - Start
  var videoSwiper1 = new Swiper(".trendingVideoSwiper", {
    breakpoints: {
      1200: {
        slidesPerView: 4.5,
        spaceBetween: 30,
      },
      1380: {
        slidesPerView: 3.5,
        spaceBetween: 40,
      },
    },
  });

  // HighlightVideos - Start
  var videoSwiper2 = new Swiper(".highlightVideoSwiper", {
    breakpoints: {
      1200: {
        slidesPerView: 4.5,
        spaceBetween: 30,
      },
      1380: {
        slidesPerView: 3.5,
        spaceBetween: 40,
      },
    },
  });

  /* Mobile-Layout */
  // Swiper-7
  var mSwiperTrending = new Swiper(".mTrendingSwiper", {
    slidesPerView: 1.4,
    spaceBetween: 20,
    slidesOffsetBefore: 10,
  });

  // Swiper-8
  var mSwiperHighlight = new Swiper(".mHighlightSwiper", {
    slidesPerView: 1.4,
    spaceBetween: 20,
    slidesOffsetBefore: 10,
  });
}

/* <!-- Footer --> */
{
  // Footer - ChannelSwiper - Start
  var swiper = new Swiper(".mySwiper--footer", {
    loop: true,
    keyboard: {
      enabled: true,
    },
    speed: 1500,
    autoplay: {
      pauseOnMouseEnter: true,
      delay: 5,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        slidesPerView: 4,
      },
      1024: {
        slidesPerView: 8,
      },
    },
  });
  // Footer - ChannelSwiper - End

  /* Mobile-Layout */
  //Swiper-9
  var mSwiperAllChannels = new Swiper(".mChannel-swiper", {
    slidesPerView: 4,
    spaceBetween: 20,
  });
}

/* <!-- SelectDropDown-Box --> */
{
  // <!-- Select-Dropdown -->
  // select-dropdown - Start
  var x, i, j, l, ll, selElmnt, a, b, c;
  /*look for any elements with the class "custom-select":*/
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
  except the current select box:*/
    var x,
      y,
      i,
      xl,
      yl,
      arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i);
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  /*if the user clicks anywhere outside the select box,
then close all select boxes:*/
  document.addEventListener("click", closeAllSelect);
  // select-dropdown - End
}
