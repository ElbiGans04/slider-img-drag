(function(){
  let sliding = startClientX = startPixelOffset = pixelOffset = currentSlide = 0,
      container = document.querySelector('.container'),
      head = document.getElementsByTagName('head')[0],
      imageItems = document.querySelectorAll('.image-item'),
      imageCount = imageItems.length,
      mainContainer = document.getElementById('main');

  // Beri event kepada container
  container.addEventListener('mousedown', slideStart);
  container.addEventListener('mousemove', slide);
  container.addEventListener('mouseup', slideOut);
  // container.addEventListener('touchstart', slideStart);


  // Function 
  function slideStart(event){

    // Jika client memakai layar sentuh
    if(event.touches){
      event = event.touches;
    };

    // Ambil posisi sentuh saat ini & assign nilai sliding menjadi 1
    if(sliding === 0){
      sliding = 1;
      startClientX = event.clientX;
    };

  };

  function slide(event){
    // Matikan perilaku default container
    event.preventDefault();

    // Jika perangkatnya layar sentuh
    if (event.touches)
      event = event.touches;

    // Hitung jarak saat ini 
    let deltaSlide = event.clientX - startClientX;
    
    // Jika sliding 1 dan jarak bukan 0 yang berarti itu sudah bergerak
    if(sliding === 1 && deltaSlide != 0){
      sliding = 2;
      startPixelOffset = pixelOffset;
    };


    // saat cursor mulai bergerak
    if(sliding === 2){
      var touchPixelRatio = 1;

      if ((currentSlide == 0 && event.clientX > startClientX) || 
         (currentSlide == imageCount - 1 && event.clientX < startClientX))
             touchPixelRatio = 4;
      
      
      // Hitung value
      pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;

      //Atur ke transform ke container
      mainContainer.style.transform = `translateX(${pixelOffset}px)`
      mainContainer.classList.remove('animate');
    }



  };

  function slideOut(event){
    if(sliding === 2){

      // Reset sliding
      sliding = 0;
  
      // Hitung Sliding aktif
      currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide - 1;
  
      currentSlide = Math.min( Math.max(currentSlide, 0), imageCount - 1);
      
  
      // Hitung jarak 
      var width = window.getComputedStyle(document.querySelector(".container"), null);
      width = width.getPropertyValue("width");
      width = width.slice(0,width.length -2 )
      
  
      pixelOffset = currentSlide * - Number(width);
      
      // Jika style dengan id temp sudah
      if (document.getElementById('temp') != null) {
        // Hapus element tersebut
        document.getElementById('temp').remove()
      }
      console.log(pixelOffset)
      // Buat element style
      let style = document.createElement('style');
      let styleText = document.createTextNode('#main.animate{transform:translateX(' + pixelOffset + 'px)}');
      style.setAttribute('id', 'temp');
      style.appendChild(styleText);
      head.appendChild(style)
      
      mainContainer.classList.add('animate');
      mainContainer.style.transform = ``;
  
      // $('#temp').remove()
      // $('<style id="temp">#main.animate{transform:translateX(' + pixelOffset + 'px)}</style>').appendTo('head');
      // // Add animate class to slider and reset transform prop of this class.
      // $('#main').addClass('animate').css('transform', '');
    }
    


  }





})()