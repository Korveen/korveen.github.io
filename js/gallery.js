var initGallery = function () {
  let list = document.querySelector('#project-data');
  list.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG') {
      //console.log(e.target);
      let layer = document.createElement('div');

      layer.style.position = 'absolute';
      layer.style.backgroundColor = 'rgba(0,0,0,0.8)';
      layer.style.cursor = 'pointer';

      layer.style.height = window.innerHeight + 'px';
      layer.style.width = window.innerWidth + 'px';
      layer.style.top = window.scrollY + 'px';
      layer.style.left = window.scrollX + 'px';

      // console.log(document.getElementsByTagName('footer')[0]);
      document.body.insertBefore(layer, document.getElementsByTagName('footer')[0]);

      window.addEventListener('scroll', scrollHandler, true);

      function scrollHandler() {
        // console.log('scroll');
        layer.style.top = window.scrollY + 'px';
        layer.style.left = window.scrollX + 'px';
      }

      window.addEventListener('wheel', wheelHandler, true);

      function wheelHandler(evnt) {
        // console.log('wheel');
        evnt.preventDefault();
        //window.scrollBy(0, evnt.deltaY);
      }

      window.addEventListener('resize', resizeHandler, true);

      function resizeHandler() {
        layer.style.height = window.innerHeight + 'px';
        layer.style.width = window.innerWidth + 'px';
        let evnt = new Event('load');
        showIMG.dispatchEvent(evnt);
      }

      layer.addEventListener('click', function () {
        this.parentElement.removeChild(this);
        window.removeEventListener('scroll', scrollHandler, true);
        window.removeEventListener('wheel', wheelHandler, true);
        window.removeEventListener('resize', resizeHandler, true);
      }, false);


      let showIMG = document.createElement('img');
      showIMG.style.display = 'block';
      showIMG.style.position = 'absolute';
      showIMG.src = e.target.src.substr(0, e.target.src.length);

      showIMG.onload = function () {
        //   console.log(this);
        let ratio;
        let k = 0.8;
        let layerH = parseFloat(layer.style.height);
        let layerW = parseFloat(layer.style.width);

        if (this.height > layerH) {
          ratio = (layerH / this.height) * k;
          this.height *= ratio;
          this.width *= ratio;
        }

        if (this.width > layerW) {
          ratio = (layerW / this.width) * k;
          this.height *= ratio;
          this.width *= ratio;
        }


        if (this.height < layerH && this.width < layerW) {
          if (layerH - this.height < layerW - this.width) {
            ratio = (layerH / this.height) * k;
            this.height *= ratio;
            this.width *= ratio;
          } else {
            ratio = (layerW / this.width) * k;
            this.height *= ratio;
            this.width *= ratio;
          }
        }

        (function (obj) {
          // console.log(obj);
          let offsetX = (layerW - obj.width) / 2;
          let offsetY = (layerH - obj.height) / 2;
          obj.style.left = offsetX + 'px';
          obj.style.top = offsetY + 'px';
        })(this);

        layer.appendChild(showIMG);
      }
    }
  }, false);
};