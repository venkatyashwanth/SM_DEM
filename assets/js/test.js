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
    //   myScheduleSwiper
    // $(".myScheduleSwiper").on("mouseenter", function () {
    //   $(".circle").addClass("d-none");
    //   $(".circle-follow").addClass("d-none");
    // });
    // $(".myScheduleSwiper").on("mouseleave", function () {
    //   $(".circle").removeClass("d-none");
    //   $(".circle-follow").removeClass("d-none");
    // });
    $(window).on("mousemove", moveCircle);
  });
  // Mouse-Pointer - End
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

/* <!-- Schedule-Section --> */
{
  // Swiper - myScheduleSwiper - Start
  const scheduleSwiper = new Swiper(".myScheduleSwiper", {
    slidesPerView: 2.8,
    spaceBetween: 20,
    allowTouchMove: true,
    keyboard: {
      enabled: true,
    },
    slidesOffsetAfter: 120
  });

  const scheduleSwiper2 = new Swiper(".myScheduleSwiper2", {
    slidesPerView: 4,
    spaceBetween: 40,
    allowTouchMove: true,
    keyboard: {
      enabled: true,
    },
    slidesOffsetBefore: 120,
    slidesOffsetAfter: 120
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



