// Dynamic rendering with mapping and image after pages
let messageData;
let currentPage = 1;
let totalPages = 0;
let isOpen = false;
let hasPlayed = false;

$(document).ready(function () {
  const $envelope = $('#envelope');
  const $openBtn = $("#openBtn");
  const $resetBtn = $("#resetBtn");
  const $lyricsContainer = $("#lyricsContainer");
  const $imageContainer = $("#imageContainer");
  const $recipientImage = $("#recipientImage");
    const $letter = $(".letter");
  const audio = document.getElementById("sound");

  // Load data
  messageData = getMessageData();
  totalPages = messageData.pages.length;

    // Set page title dynamically
    try {
        const recipientTitle = (messageData && messageData.recipient) ? messageData.recipient : 'bạn';
        document.title = `Nhắn gửi ${recipientTitle}`;
    } catch (e) {
        // no-op
    }

  // Build pages
  messageData.pages.forEach((text, idx) => {
      const displayText = (idx === 0)
        ? `Gửi ${messageData.recipient},<br><br>${text.replace(/{name}/g, messageData.recipient)}`
        : text.replace(/{name}/g, messageData.recipient);
      const $page = $('<div>')
        .addClass('lyric-page')
        .attr('id', 'page' + (idx + 1))
        .html('<p>' + displayText + '</p>');
      if (idx === 0) $page.addClass('active');
      $lyricsContainer.append($page);
  });
  // Image
  $recipientImage.attr('src', messageData.imageUrl);

  function playAudioOnce() {
      if (!hasPlayed) {
          audio.play().then(() => hasPlayed = true).catch(() => {});
      }
  }

  $envelope.on('click', function () {
      if (isOpen) nextLyric();
  });

  $openBtn.on('click', function () {
      $envelope.removeClass("close").addClass("open");
      isOpen = true;
      $openBtn.hide();
      $resetBtn.show();
      playAudioOnce();
  });

  $resetBtn.on('click', function () {
      $envelope.removeClass("open").addClass("close");
      isOpen = false;
      // If image is showing, reverse animation first
      if ($letter.hasClass('show-image')) {
          $imageContainer.removeClass('show').fadeOut(200, function(){
              $letter.css('animation', 'zoomOutAndReturn 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards');
              setTimeout(function(){
                  $('#envelope').removeClass('showing-image');
                  $letter.removeClass('show-image');
                  $letter.css('animation','');
                  currentPage = 1;
                  updateActivePage();
                  $lyricsContainer.show();
                  $resetBtn.hide();
                  $openBtn.show();
              }, 700);
          });
      } else {
          setTimeout(function () {
              currentPage = 1;
              updateActivePage();
              $lyricsContainer.show();
              $imageContainer.hide();
              $resetBtn.hide();
              $openBtn.show();
          }, 600);
      }
  });

  function nextLyric() {
      if (currentPage < totalPages) {
          currentPage++;
          updateActivePage();
      } else if (currentPage === totalPages) {
          // Animate letter up and show image
          $lyricsContainer.fadeOut(300, function(){
              $('#envelope').addClass('showing-image');
              $letter.addClass('show-image');
              $imageContainer.show().addClass('show');
          });
          currentPage++;
      } else {
          // Restart: hide image, animate letter back, show first page
          currentPage = 1;
          $imageContainer.removeClass('show').fadeOut(200, function(){
              $letter.css('animation', 'zoomOutAndReturn 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards');
              setTimeout(function(){
                  $('#envelope').removeClass('showing-image');
                  $letter.removeClass('show-image');
                  $letter.css('animation','');
                  $lyricsContainer.fadeIn(300);
                  updateActivePage();
              }, 700);
          });
      }
  }

  function updateActivePage() {
      $(".lyric-page").removeClass("active");
      $("#page" + currentPage).addClass("active");
  }
});
