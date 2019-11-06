$(document).ready(function(){

    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });

    /**
     * mobile-mnu customization
     */
    var mmenu = $('#mobile-mnu');
    var menuLogo = mmenu.data("logo");
    var $mmenu = mmenu.mmenu({
        navbars: [{
            content: [ "<img src=" + menuLogo + " class=\"img-responsive mm-logo\" alt=\"alt\"/>" ],
            height: 3
        }],
        "pageScroll": true,

        "navbar": {
            "title" : "",
        },
        "extensions": [
            "theme-dark",
            "pagedim-black",
            // "position-front",
            "fx-listitems-slide",
        ],
    }, {
        offCanvas: {
            pageSelector: "#page-container"
        },
    });

    var mmenuBtn = $("#mmenu-btn");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('is-active')
    });


    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "is-active" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */


    $('.intro-slider').owlCarousel({
        loop:true,
        nav: false,
        items: 1,
        margin: 30,
        dots: true,
        autoHeight: false,
        // autoplay: true,
        // autoplayTimeout: 7000,
        // mouseDrag: false,
        // animateIn: "fadeIn",
        animateOut: "fadeOut",

        responsive : {
            // breakpoint from 0 up
            0 : {
                touchDrag: true
            },
            // breakpoint from 768 up
            992 : {
                // touchDrag: false
            }
        }

    });


    $("a[href='#popup-form']").magnificPopup({
        type: "inline",
        fixedContentPos: !1,
        fixedBgPos: !0,
        overflowY: "auto",
        closeBtnInside: !0,
        preloader: !1,
        midClick: !0,
        removalDelay: 300,
        mainClass: "my-mfp-zoom-in",
    });



    $('.product-slider').owlCarousel({
        loop: true,
        nav: true,
        items: 1,
        margin: 0,
        dots: false,
        autoHeight: false,
        navText: ['', '']
    });


    var $grid = $('.residents-wrap').isotope({
        itemSelector: '.resident-item',
        layoutMode: 'fitRows'
    });


    // bind filter button click
    $('.res-filter-nav').on( 'click', 'button', function() {
        var filterValue = $( this ).attr('data-filter');
        // use filterFn if matches value
        // filterValue = filterFns[ filterValue ] || filterValue;
        $grid.isotope({ filter: filterValue });
    });

    $('.res-filter-nav').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
            $buttonGroup.find('.is-checked').removeClass('is-checked');
            $( this ).addClass('is-checked');
        });
    });

    // $('.product-slider').on('translate.owl.carousel', function(event) {
    //     var currentImg = $('.owl-item.active').find('.product-slide');
    //     var color = currentImg.data('fill');
    //
    //     $('#smear .svg').css('fill', color);
    // console.log(color);
    // });








    if($('#smear').length){
        var color = $('#smear').data('fill');
        var tt = $('#smear ').find('svg');
        setTimeout(function () {
            $('#smear .svg').css('fill', color);
        }, 1000)

    }





    $('.bestsets-wrap').masonry({
        itemSelector: '.bestset-item',
        columnWidth: 1,
    });

    $('.blog-wrap').masonry({
        itemSelector: '.blog-item',
        columnWidth: 1,
    });

    $('.cabinet-tabs').tabs();

    $('.preloader').fadeOut();


    /** FORMS */
    $.validate({
        form : '.form',
        modules : 'security',
        scrollToTopOnError: false,
    });


    $('input[type="checkbox"]').styler();
    /** END FORMS */


    $('.artist-portfolio').photoswipe();

    $('#totop').click(function() {
        $('body,html').animate({scrollTop:0},600);
    });


    function heightses() {
        if ($(window).width()>=390) {
            $('.cat-item-title').matchHeight({byRow: true,});
        }

        }

    heightses();

    $(window).on('load', function (){
        $(window).resize(function() {
            heightses();
        });

        heightses();
    });

    $('.rolling-filters').on('click', function(e){
        e.preventDefault();
        $(this).toggleClass('active');
        $('#filter-wrap').slideToggle();

        $(this).find('span').text(function(i, text){
            return text === "Открыть фильтры" ? "Закрыть фильтры" : "Открыть фильтры";
        })
    });


    $('.spinner-amount').on('click', 'button', function(e){

        var parent = $(this).parents('.spinner-amount');
        var input = parent.find('.amount');
        var amount = input.val();
        var btn = parent.siblings('.btn');

        if (!parent.hasClass('table-amount')) {
            if(!$(this).is('.down')) {
                amount ++
            } else {
                if (amount > 1) amount --
            }
        } else {
            if(!$(this).is('.down')) {
                amount ++
            } else {
                if (amount > 0) amount --
            }

            if(amount == 0) {
                parent.hide();
                btn.show();
                input.val(1).attr('value', 1);
                exit();
            }
        }

        input.val(amount).attr('value', amount);
    });


    $('.product-table .btn').on('click', function(){
       var btn = $(this),
           spinner = btn.siblings('.spinner-amount');

       btn.hide();
       spinner.show();

    });



    $('.basket-item-del').on('click', function(e){
        e.preventDefault();
        var item = $(this).parents('.basket-item')
        item.remove();

        $('#del-notice').addClass('active');
    });

    $('#del-notice .close-notification').on('click', function(e){
        e.preventDefault();

        $('#del-notice').removeClass('active');
    });




    /**
     * YA-MAPS
     */
        //Переменная для включения/отключения индикатора загрузки
    var spinner = $('.loader');
    //Переменная для определения была ли хоть раз загружена Яндекс.Карта (чтобы избежать повторной загрузки при наведении)
    var check_if_load = false;
    //Необходимые переменные для того, чтобы задать координаты на Яндекс.Карте
    //var myMapTemp, myPlacemarkTemp;


    //Функция создания карты сайта и затем вставки ее в блок с идентификатором &#34;map-yandex&#34;
    function init () {
        var mapId = $('#map'),
            attitude = mapId.data("att"),
            longtitude = mapId.data("long"),
            zoom = mapId.data("zoom"),
            marker = mapId.data("marker"),
            map = new ymaps.Map("map", {
                center: [attitude, longtitude],
                controls: ['zoomControl'],
                zoom: zoom
            }),

            myPlacemark = new ymaps.Placemark(map.getCenter(), {}, {
                // Опции.
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: marker,
                // Размеры метки.
                iconImageSize: [32.768, 43],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-16, -40]
            });

        map.geoObjects.add(myPlacemark);
        map.behaviors.disable('scrollZoom');


        //Если нужно сместить центр карты на странице:
        //var position = map.getGlobalPixelCenter();
        //map.setGlobalPixelCenter([ position[0] - 350, position[1] ]);

        //if ($(window).width() <= 1500) {
        //map.setGlobalPixelCenter([ position[0] - 250, position[1]]);
        //}

        // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
        var layer = map.layers.get(0).get(0);

        // Решение по callback-у для определения полной загрузки карты
        waitForTilesLoad(layer).then(function() {
            // Скрываем индикатор загрузки после полной загрузки карты
            spinner.removeClass('is-active');
        });
    }


    // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
    function waitForTilesLoad(layer) {
        return new ymaps.vow.Promise(function (resolve, reject) {
            var tc = getTileContainer(layer), readyAll = true;
            tc.tiles.each(function (tile, number) {
                if (!tile.isReady()) {
                    readyAll = false;
                }
            });
            if (readyAll) {
                resolve();
            } else {
                tc.events.once("ready", function() {
                    resolve();
                });
            }
        });
    }

    function getTileContainer(layer) {
        for (var k in layer) {
            if (layer.hasOwnProperty(k)) {
                if (
                    layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer
                    || layer[k] instanceof ymaps.layer.tileContainer.DomContainer
                ) {
                    return layer[k];
                }
            }
        }
        return null;
    }


    // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
    function loadScript(url, callback){
        var script = document.createElement("script");

        if (script.readyState){  // IE
            script.onreadystatechange = function(){
                if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {  // Другие браузеры
            script.onload = function(){
                callback();
            };
        }

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    // Основная функция, которая проверяет когда мы навели на блок с классом &#34;ymap-container&#34;
    var ymap = function() {
        $('.map-wrapper').on( "mouseenter", function(){
            if (!check_if_load) { // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем

                // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
                check_if_load = true;

                // Показываем индикатор загрузки до тех пор, пока карта не загрузится
                spinner.addClass('is-active');

                // Загружаем API Яндекс.Карт
                loadScript("https://api-maps.yandex.ru/2.1/?apikey=e470b388-a1d0-4edf-acdc-34b4bc5bedee&lang=ru_RU&loadByRequire=1", function(){
                    // Как только API Яндекс.Карт загрузились, сразу формируем карту и помещаем в блок с идентификатором &#34;map-yandex&#34;
                    ymaps.load(init);
                });
            }
        });
    };

    ymap();





    /**
     * YOUTUBE SCRIPT
     */
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var videoPlayers = [];
    var i = 0;

    onYouTubeIframeAPIReady = function () {
        $('.video-player .you-player').each(function(){
            var $playerID = $(this).attr("id");
            var $videoID = $(this).parents('.video-player').data("video");
            var $start = $(this).siblings('.start-video');

            $start.attr("data-playern", i);

            $start.on('click', function(){
                var playerN = $(this).attr("data-playern");
                $(this).hide();
                $(this).siblings('.you-player').show();
                $(this).siblings('.thumbnail-container').hide();


                videoPlayers[i] = new YT.Player($playerID, {
                    videoId: $videoID,
                    playerVars: {
                        'autoplay': 0,
                        'rel': 0,
                        'showinfo': 0
                    },
                    events: {
                        'onStateChange': onPlayerStateChange
                    }
                });

                if(videoPlayers[i])
                {
                    var fn = function(){ videoPlayers[i].playVideo(); };
                    setTimeout(fn, 1500);
                }

            });
            i++;
        });
    };

    var p = document.getElementsByClassName("you-player");
    $(p).hide();

    onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED) {
            $('.you-player').hide();
            $('.start-video').fadeIn('normal');
            $('.thumbnail-container').fadeIn('normal');
        }
    };
    /**
     * end YOUTUBE SCRIPT
     */


});
