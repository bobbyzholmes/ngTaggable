angular.module('ngTaggable', [])
	.directive('ngTaggable', function(){
		return {
			scope: {
				tags: '=ngModel',
				placeholder: '@',
				validateAs: '@'
			},
			restrict: 'EC',
			template: 	'<span class="btn btn-default btn-sm" editable-text="tag.value" buttons="no" ng-repeat="tag in tags" ng-class="valdate(validateAs, tag.value)">'+
			'{{ tag.value }}'+
			'<button type="button" class="close" ng-click="deleteTag($event, $index)"> &times;</button>'+
			'</span>'+
			'<span class="input__max">'+
			'<input type="text" placeholder="{{ placeholder }}" ng-model="input.value" ng-keyDown="tagInput($event)">'+
			'</span>',
			link: function(scope, element, attrs){
				//empty value for input field
				scope.input = {value: ''};

				//on event adds scope.tag element to array
				scope.tagInput = function($event){
					//if tab 9, enter 13, space 32, semicolon 186 or comma 188 is pressed push to tags
					//TODO removed semicolon, comma at this time as character is not removed
					var codes = [9, 13, 32];
					var inputLenght = scope.input.value.length;

					//compare keycode to code array
					if (codes.indexOf($event.keyCode) >= 0 && inputLenght != 0) {
						scope.tags.push({value: scope.input.value});
						scope.input.value = '';
					};

					//keycode is backspace & scope.tag is empty
					if($event.keyCode == 8 && inputLenght <= 0){
						scope.tags.splice(inputLenght - 1, 1);
					}
				};

				//deletes element from array
				scope.deleteTag = function($event, $index){
					scope.tags.splice($index, 1);
					$event.stopPropagation();
				};

				//validation
				scope.valdate = function (type, tagInput) {
					if(type == 'email' && tagInput.indexOf('@') === -1){
						return 'text-danger';
					}
				}			
			}
		};
	});