// ############################
// #### OSOCO COLLAPSIBLE #####
// #### http://www.osoco.es ###
// ############################
/*
	Propagamos un click a otro elemento.
	Convinado con Collapsible podemos hacer TABS de forma sencilla.
	
	Ejemplo: 
	
	<div class="nombreEjemplo">
		<div class="element active"> </div>
		<div class="element"> </div>
		<div class="element"> </div>
		<div class="element" class="propagate-click" 
			 data-propagate-click-relative-parent-selector="div.nombreEjemplo"
     	     data-final-click-selector=".active"> </div>
	</div>
*/
$(function() {
	window.javascriptModuleLoaders = window.javascriptModuleLoaders || []
	var apply = function() {
		var propagateClick = 'propagate-click'
		var propagateClickSelector = '.' + propagateClick
        var relativeParentSelectorDataName = 'propagateClickRelativeParentSelector'
    	var finalClickSelelectorDataName = 'finalClickSelector'

		var propagateClickElements = $(propagateClickSelector)
		
		$.each(propagateClickElements, function( index, propagateClickOnElement ) {
	          addPropagateClickOnElementBehaviour($(propagateClickOnElement))

	    });
		
		function addPropagateClickOnElementBehaviour(propagateClickElement) {
			propagateClickElement.removeClass(propagateClick)
			var parentSelector = propagateClickElements.data(relativeParentSelectorDataName)
			var finalClickSelector = propagateClickElement.data(finalClickSelelectorDataName)

			var parentElement = propagateClickElement.parents(parentSelector || "body")

			propagateClickElement.click(function(event) {
				parentElement.find(finalClickSelector).click()
	        	event.preventDefault()
			})
	    }
		
	}
	apply()
    window.javascriptModuleLoaders.push(apply)  
    $( '[data-final-click-selector]' ).click(function() {
	  console.log('dale')
	  $(this).siblings('li').removeClass('active');
	  $(this).addClass('active');
	});
})