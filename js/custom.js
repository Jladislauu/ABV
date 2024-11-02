
  (function ($) {
  
  "use strict";

    // COUNTER NUMBERS
    jQuery('.counter-thumb').appear(function() {
      jQuery('.counter-number').countTo();
    });
    
    // CUSTOM LINK
    $('.smoothscroll').click(function(){
    var el = $(this).attr('href');
    var elWrapped = $(el);
    var header_height = $('.navbar').height();

    scrollToDiv(elWrapped,header_height);
    return false;

    function scrollToDiv(element,navheight){
      var offset = element.offset();
      var offsetTop = offset.top;
      var totalScroll = offsetTop-navheight;

      $('body,html').animate({
      scrollTop: totalScroll
      }, 300);
    }
});
    
  })(window.jQuery);

  

  // Variáveis para armazenar as imagens
let image1, image2, image3, image4, image5;

fetch('https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp&access_token=IGQWRNV1N4UmRWN1NhVmtTdzNiVWc0aWNwY1g4b1FVeXoyQ1BHUGdncE5UWDdEdjVlU3BOdFU4UGFkRjBjanJla0RhQ2ZA4cklLR0JnLTc1Q0lUcmU4THZAuWXdPaUNhREtEV0lJenZAwRm1pcTdzbTZACVjh2eExWcDgZD&limit=5')
    .then(response => response.json())
    .then(data => {
        const postsContainer = document.getElementById('recent-posts');
        postsContainer.innerHTML = ''; // Limpa os posts anteriores

        // Acessar as últimas 5 postagens
        const posts = data.data.slice(0, 5);

        posts.forEach((post, index) => {
            // Armazenar cada imagem em uma variável específica
            switch (index) {
                case 0: image1 = post.media_url; break;
                case 1: image2 = post.media_url; break;
                case 2: image3 = post.media_url; break;
                case 3: image4 = post.media_url; break;
                case 4: image5 = post.media_url; break;
            }

            const postElement = document.createElement('div');
            postElement.classList.add('news-block', 'news-block-two-col', 'd-flex', 'mt-4');

            postElement.innerHTML = `
                <div class="news-block-two-col-image-wrap">
                    <a href="news-detail.html">
                        <img src="${post.media_url}" class="news-image img-fluid" alt="${post.caption ? post.caption : 'Instagram Post'}">
                    </a>
                </div>
                <div class="news-block-two-col-info">
                    <div class="news-block-title mb-2">
                        <h6><a href="news-detail.html" class="news-block-title-link">${post.caption || 'No Caption'}</a></h6>
                    </div>
                    <div class="news-block-date">
                        <p>
                            <i class="bi-calendar4 custom-icon me-1"></i>
                            ${new Date(post.timestamp).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            `;

            postsContainer.appendChild(postElement);
        });

        // Atualiza o src da imagem 1
        document.getElementById('image1-display').src = image1;

        // Exibir as imagens no console
        console.log('Imagens armazenadas:');
        console.log('Imagem 1:', image1);
        console.log('Imagem 2:', image2);
        console.log('Imagem 3:', image3);
        console.log('Imagem 4:', image4);
        console.log('Imagem 5:', image5);
    })
    .catch(error => console.error('Error fetching posts:', error));
