angular.module(_DIRECTIVES_)
	.directive('colorSlide', ['', function(){
/*
		updateSlider: function(element){
			switch(element.value) {
			  case "<3":
			      element.classList.add('range-assertive');
			      break;
			  case "4":
			  case "5":
			      element.classList.add('range-energized');
			      break;
			  case ">6":
			      element.classList.add('range-balanced');
			      break;
			  default:
			      element.classList.add('range-assertive');
			      break;
			}
		},
*/
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// cont­rol­ler: function($scope, $element, $attrs, $transclue) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			// templateUrl: '',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {

			}
		};
}]);