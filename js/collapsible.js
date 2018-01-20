// ############################
// #### OSOCO COLLAPSIBLE #####
// #### http://www.osoco.es ###
// ############################
// <div class="collapsible">
//     <div class="collapsible-header">
//         Esto despliega
//     </div>
//     <div class="collapsible-content">
//         contenido del desplegable
//     </div>
// </div>

// Para que se cierre un collapsible al pulsar fuera de el usar .collapsible-header.autoclose

$(function(){
    $('body').on('click', function(event){
        autoClose($(this));
    });

    $("body").on("click", ".collapsible .collapsible-header", function(event) {
        var elem = getClickedElement(event, "collapsible-header");
        var preventSelfClose = $(elem).data("prevent-self-close");
        if(!preventSelfClose || !$(elem).hasClass("open") ) {
            var openSibling = closeOpenSibblings(elem)
            
            toggleOpenState(openSibling, "collapsible-content");
            toggleOpenState(elem, "collapsible-content");
        }
        autoClose($(this));
        event.stopPropagation();
    });


    $("body").on("click", ".collapsible-menu .collapsible-header", function(event){
        var elem = getClickedElement(event, "collapsible-header");
        toggleOpenState(elem, "collapsible-content");
        event.stopPropagation();
    });

    $("body").on("click", ".collapsible-menu .collapsible-content", function(event){
        var elem = getClickedElement(event, "collapsible-content");

        $(elem).prev(".collapsible-header").removeClass("open");
        $(elem).removeClass("open", 500);
        event.stopPropagation();
    });

    function getClickedElement(event, withClass) {
        var elem;
        if($(event.target).hasClass(withClass)) {
            elem = $(event.target);
        } else {
            elem = $(event.target).parents("." + withClass);
        }
        return elem;
    }

    function closeOpenSibblings(elem) {
        var openSibblings = $(elem).parents('.collapsible').first().find(".collapsible-header.open")
        $.each(openSibblings, function(index, element) {
            if(!$(element).is($(elem))) {
                toggleOpenState(element, 'collapsible-content')
            } 
        })
    }
    
    function toggleOpenState(elem, withClass) {
        if($(elem).hasClass("open")) {
            $(elem).removeClass("open");
            $(elem).next("." + withClass).removeClass("open", 500);
        } else {
            $(elem).addClass("open");
            $(elem).next("." + withClass).addClass("open", 500);
        }
        $( "main > :first-child" ).css( "padding-top", "" );
        setTimeout(changeFirstElementTopPadding, 1200, elem, withClass);
    }

    function autoClose(collapsibleClicked) {
        $(".collapsible-header.autoClose").each(function(index, element){
            if($(this).hasClass('open') && $(this).get(0) != collapsibleClicked.get(0)) {
                toggleOpenState($(this), "collapsible-content");
            }
        });
    };

    function changeFirstElementTopPadding(elem, withClass) {
        if(elem && $(elem).parents("#mainNav").length > 0){
            var windowWidth = $(window).width()
            var elemHtmlFontSize = parseInt($("html").css("font-size"), 10);
            var firstElementTopPadding = "";
            if(windowWidth > 960){
                var elemHeightCollapsibleHeader = $("#mainNav").height();
                var elemHeightCollapsibleContent = $(elem).next("." + withClass).height();
                firstElementTopPadding = (elemHeightCollapsibleHeader+elemHeightCollapsibleContent)/elemHtmlFontSize+"rem";
                if ($('.hotelsPanel.open').length > 0) {
                    var panelHeight = $('.hotelsPanel.open').height();
                    $('.finder').addClass('panelOpen');
                    $('.finder > div').css('top', panelHeight + 80);
                } else{
                    $('.finder').removeClass('panelOpen');
                    $('.finder > div').css('top','');
                };
            } else {
                var elemHeightCollapsible = $("#mainHeader").height();
                firstElementTopPadding = (elemHeightCollapsible)/elemHtmlFontSize+"rem";
            }
            $( "main > :first-child" ).css( "padding-top", firstElementTopPadding );
        }
    }

    $( window ).resize(function(event) {
        var windowWidth = $(window).width()
        if(windowWidth > 960){
            if($("#mainNav .open.collapsible-content").length > 0){
                changeFirstElementTopPadding($("#mainNav .open.collapsible-header"), "collapsible-content");
            }
        } else {
            $( "main > :first-child" ).css( "padding-top", "" );
        }
        
        
    });
    // $('.collapsibleLeave .collapsible-content').mouseleave(function(event) {
    //     autoClose($(this));
    // });
    // $('.collapsibleLeave .collapsible-header').mouseenter(function(event) {
    //     $(this).click();
    // });
});