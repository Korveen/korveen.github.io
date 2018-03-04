document.addEventListener('DOMContentLoaded', function()
{
    var SEPARATION = 70,
        AMOUNTX = 50,
        AMOUNTY = 30;

    var container;
    var camera, scene, renderer;

    /*
    if (window.WebGLRenderingContext){
    	renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    	}
    else {
    	renderer = new THREE.CanvasRenderer();
    	}
    */

    var particles, particle, count = 0;

    var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	
	var mouseX = mouseY = 0;

    init();
    animate();

    function init()
    {

        container = document.createElement('div');
        document.body.appendChild(container);
        if (container)
        {
            container.className += container.className ? ' waves' : 'waves';
        }

        camera = new THREE.PerspectiveCamera(64, window.innerWidth / window.innerHeight, 1, 10000);
        camera.position.y = 500; //changes how far back you can see i.e the particles towards horizon
        camera.position.z = -100; //This is how close or far the particles are seen
		camera.rotation.x = -0.85;

        scene = new THREE.Scene();

        particles = new Array();

        var PI2 = Math.PI * 2;
        var material = new THREE.SpriteCanvasMaterial(
        {
            color: 0xffffff, //changes color of particles
            program: function(context)
            {
                context.beginPath();
                context.arc(5, -2, 0.2, 0, PI2, true);
                context.fill();
            }
        });

        var i = 0;

        for (var ix = 0; ix < AMOUNTX; ix++)
        {

            for (var iy = 0; iy < AMOUNTY; iy++)
            {

                particle = particles[i++] = new THREE.Sprite(material);
                particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
                particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) - 30);
                scene.add(particle);

            }

        }

        renderer = new THREE.CanvasRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000, 1);
        container.appendChild(renderer.domElement);

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);

        window.addEventListener('resize', onWindowResize, false);

    }

    function onWindowResize()
    {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

    }

    function onDocumentMouseMove(event)
    {

        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

    }

    function onDocumentTouchStart(event)
    {
        if (event.touches.length === 1)
        {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }

    function onDocumentTouchMove(event)
    {
        if (event.touches.length === 1)
        {
            event.preventDefault();
            mouseX = event.touches[0].pageX - windowHalfX;
            mouseY = event.touches[0].pageY - windowHalfY;
        }
    }

    function animate()
    {

        requestAnimationFrame(animate);

        render();

    }

    function render()
    {
        camera.position.x += (mouseX - camera.position.x) * .002;
        // camera.position.z += (-mouseY - camera.position.y) * .002;


        var i = 0;

        for (var ix = 0; ix < AMOUNTX; ix++)
        {

            for (var iy = 0; iy < AMOUNTY; iy++)
            {

                particle = particles[i++];
                particle.position.y = (Math.sin((ix + count) * 0.5) * 20) + (Math.sin((iy + count) * 0.5) * 20);
                particle.scale.x = particle.scale.y = (Math.sin((ix + count) * 0.3) + 2) * 4 + (Math.sin((iy + count) * 0.5) + 1) * 4;

            }

        }

        renderer.render(scene, camera);

        // This increases or decreases speed
        count += 0.05;

    }
});