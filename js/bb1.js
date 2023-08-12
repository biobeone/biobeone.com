$(function () {
   $('.userLang').click(function () {
       $.cookie("userLang", $(this).attr('userLang'), { expires: 365, path: '/' });
   });

  //  $.ajax({
  //   url: "https://bb1.biobeone.com/newList",
  //   success: function(users) {
  //       $.each(users, function(i, user) {
  //           const txt = user.replace(/has become.*$/, '').replace(/がBioBeOne.*$/, '');
  //           $('#NewListDetail').append($('<li><small  style="font-family: Arial, \'Roboto\', sans-serif">' + txt + '</small></li>'));
  //       });
  //       $('#NewList').show();
  //       $('#AdList').show();
  //   }
  // });

  // animation
  var adList = window.adList;
  if (!adList) {
      return;
  }
  // eachLetter();

  function eachLetter() {
      // Wrap every letter in a span
      $('.ml10 .letters').each(function () {
          var max = 28; // Always keep name in length
          // var max = $(window).width() >= 1920 ? 28 : $(window).width() >= 1600 ? 25 : 22;
          // console.log($(window).width());
          var current = 0;
          $(this).html($(this).text().replace(/([\x00-\x80]|\w)/g, function (string) {
              current++;
              if (string === ' ' || string === null || string === '') {
                  if (current >= max) {//make sure max length not over weight
                      current = 0;
                      return "<span class='letter'>&nbsp;</span><br>"
                  }
                  return "<span class='letter'>&nbsp;</span>"
              }
              return "<span class='letter'>" + string + "</span>";
          }))
      });
      do_animate();
  }

  var index = 0;

  function shuffle(arr) {
      var i = arr.length, t, j;
      while (i) {
          j = Math.floor(Math.random() * i--);
          t = arr[i];
          arr[i] = arr[j];
          arr[j] = t;
      }
  }

  function do_animate() {
      anime.timeline({loop: false})
          .add({
              targets: '.ml10 .letter',
              rotateY: [-90, 0],
              duration: 1300,
              delay: function (el, i) {
                  return 45 * i;
              },
          })
          .add({
              targets: '.ml10',
              opacity: 0,
              duration: 1000,
              easing: "easeOutExpo",
              delay: 0,
              complete: function (anim) {

                  if (index === adList.length) {
                      shuffle(adList);
                      index = 0;
                  }
                  $(".ml10 .letters").text(adList[index].fullName);
                  $(".ml10").css("opacity", "1");
                  index++;
                  eachLetter();

              }
          });
  }
});