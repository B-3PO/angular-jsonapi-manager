(function(){"use strict";angular
	.module('brMaterial', [
		'ng',
		'ngAnimate',
		'ngMessages'
	])
	.config( BrCoreConfigure );


BrCoreConfigure.$inject = ['$provide'];
function BrCoreConfigure($provide) {
	$provide.decorator('$$rAF', ["$delegate", rAFDecorator]);
}


rAFDecorator.$inject = ['$delegate'];
function rAFDecorator( $delegate ) {
	$delegate.throttle = function(cb) {
	  var queuedArgs, alreadyQueued, queueCb, context;

	  return function debounced () {
	    queuedArgs = arguments;
	    context = this;
	    queueCb = cb;

	    if (!alreadyQueued) {
	      alreadyQueued = true;
	      $delegate(function() {
	        queueCb.apply(context, Array.prototype.slice.call(queuedArgs));
	        alreadyQueued = false;
	      });
	    }
	  };
	};
	return $delegate;
}
}());
(function(){"use strict";(function(){ 
angular.module("brMaterial").constant("$BR_THEME_CSS", "h1,h2,h3,h4,h5,h6{color:'{{font-default}}'}.br-select.br-THEME_NAME-theme .br-select-menu-content{color:transparent}.br-select.br-THEME_NAME-theme.br-select-has-value .br-select-menu-content{color:'{{font-default}}'}.br-select.br-THEME_NAME-theme .br-select-menu-content{border-color:'{{foreground-dark-4}}'}.br-select.br-THEME_NAME-theme.br-select-focused .br-select-menu-content{border-color:'{{primary-default}}'}.br-select.br-THEME_NAME-theme br-select-menu[disabled] .br-select-menu-content{color:'{{foreground-light-2}}';border-color:transparent;background-image:linear-gradient(90deg,'{{foreground-light-3}}' 0,'{{foreground-light-3}}' 33%,transparent 0)}.br-optiongroups-container.br-THEME_NAME-theme br-option{color:'{{font-default}}'}.br-optiongroups-container.br-THEME_NAME-theme .br-option-group-label{color:'{{font-light-2}}'}.br-select.br-THEME_NAME-theme .br-select-menu-label{color:'{{font-default}}'}.br-select.br-THEME_NAME-theme br-select-menu[disabled] .br-select-menu-label{color:'{{font-light-3}}'}.br-select.br-THEME_NAME-theme .br-select-menu-label._br-placeholder{color:'{{font-light-5}}'}.br-select.br-THEME_NAME-theme:not(.br-select-has-placeholder) .br-select-menu-label._br-placeholder{color:transparent}.br-optiongroups-container.br-THEME_NAME-theme br-option.br-select-checkbox-enabled[selected] .br-select-menu-icon{background-color:'{{primary-default}}'}.br-optiongroups-container.br-THEME_NAME-theme br-option[selected]{color:'{{primary-default}}'}.br-optiongroups-container.br-THEME_NAME-theme br-option .br-select-menu-icon{border-color:'{{background-3}}'}.br-optiongroups-container.br-THEME_NAME-theme br-option[selected] .br-select-menu-icon:after{border-color:'{{primary-light-6}}'}br-autocomplete.br-THEME_NAME-theme .br-autocomplete-container{background-color:'{{foreground-light-4}}';border-color:'{{foreground-light-1}}'}br-autocomplete.br-THEME_NAME-theme .br-autocomplete-repeater{background-color:'{{foreground-light-4}}';color:'{{font-default}}'}.br-button.br-THEME_NAME-theme:not([disabled]).br-focused,.br-button.br-THEME_NAME-theme:not([disabled]):not(.br-mobile):hover,a.br-button.br-THEME_NAME-theme:not([disabled]).br-focused,a.br-button.br-THEME_NAME-theme:not([disabled]):not(.br-mobile):hover{background-color:'{{background-default}}'}.br-button.br-THEME_NAME-theme,a.br-button.br-THEME_NAME-theme{color:'{{font-default}}'}.br-button.br-THEME_NAME-theme.br-circle:not([disabled]):not(.br-mobile):hover,.br-button.br-THEME_NAME-theme:not([disabled]):not(.br-mobile):hover,a.br-button.br-THEME_NAME-theme.br-circle:not([disabled]):not(.br-mobile):hover,a.br-button.br-THEME_NAME-theme:not([disabled]):not(.br-mobile):hover{background-color:'{{background-default}}'}.br-button .br-icon.br-THEME_NAME-theme{color:inherit}.br-button.br-THEME_NAME-theme.br-raised,a.br-button.br-THEME_NAME-theme.br-raised{color:#fbfbfb;background:'{{background-3}}'}.br-button.br-THEME_NAME-theme.br-raised:not([disabled]):not(.br-mobile):hover,a.br-button.br-THEME_NAME-theme.br-raised:not([disabled]):not(.br-mobile):hover{background-color:'{{background-2}}'}.br-button.br-THEME_NAME-theme[disabled] .br-icon{color:'{{font-light-6}}'}.br-button.br-THEME_NAME-theme[disabled],a.br-button.br-THEME_NAME-theme[disabled]{color:'{{font-light-6}}';background:'{{foreground-default}}'}.br-button.br-THEME_NAME-theme.br-raised.br-circle,a.br-button.br-THEME_NAME-theme.br-raised.br-circle{color:'{{background-light-5}}';background:'{{background-light-1}}'}.br-button.br-THEME_NAME-theme.br-raised:not([disabled]):not(.br-circle):before,a.br-button.br-THEME_NAME-theme.br-raised:not([disabled]):not(.br-circle):before{background-image:linear-gradient('{{foreground-light-2}}','{{foreground-default}}');border-color:'{{foreground-dark-4}}'}.br-button.br-THEME_NAME-theme.br-raised .br-icon{color:'{{background-light-5}}'}.br-button.br-THEME_NAME-theme.br-primary:not([disabled]),.br-button.br-THEME_NAME-theme.br-primary:not([disabled]) .br-icon,a.br-button.br-THEME_NAME-theme.br-primary:not([disabled]){color:'{{primary-default}}'}.br-button.br-THEME_NAME-theme.br-primary.br-raised:not([disabled]),a.br-button.br-THEME_NAME-theme.br-primary.br-raised:not([disabled]){color:'{{primary-light-6}}';background:'{{primary-light-1}}'}.br-button.br-THEME_NAME-theme.br-primary.br-raised.br-circle:not([disabled]),a.br-button.br-THEME_NAME-theme.br-primary.br-raised.br-circle:not([disabled]){color:'{{primary-light-5}}';background:'{{primary-light-1}}'}.br-button.br-THEME_NAME-theme.br-primary.br-raised:not([disabled]):not(.br-circle):before,a.br-button.br-THEME_NAME-theme.br-primary.br-raised:not([disabled]):not(.br-circle):before{background:'{{primary-light-1}}';border-color:'{{primary-default}}'}.br-button.br-THEME_NAME-theme.br-primary:not([disabled]):not(.br-mobile):hover,a.br-button.br-THEME_NAME-theme.br-primary:not([disabled]):not(.br-mobile):hover{color:'{{primary-light-6}}';background:'{{primary-default}}'}.br-button.br-THEME_NAME-theme.br-primary:not([disabled]).br-focused,a.br-button.br-THEME_NAME-theme.br-primary:not([disabled]).br-focused{color:'{{primary-light-6}}';background:'{{primary-light-1}}'}.br-button.br-THEME_NAME-theme.br-primary.br-raised .br-icon{color:'{{primary-light-5}}'}.br-button.br-THEME_NAME-theme.br-primary:not([disabled]).br-focused .br-icon,.br-button.br-THEME_NAME-theme.br-primary:not([disabled]):not(.br-mobile):hover .br-icon{color:'{{primary-light-6}}'}.br-button.br-THEME_NAME-theme.br-accent:not([disabled]),.br-button.br-THEME_NAME-theme.br-accent:not([disabled]) .br-icon,a.br-button.br-THEME_NAME-theme.br-accent:not([disabled]){color:'{{accent-default}}'}.br-button.br-THEME_NAME-theme.br-accent.br-raised:not([disabled]),a.br-button.br-THEME_NAME-theme.br-accent.br-raised:not([disabled]){color:'{{accent-light-6}}';background:'{{accent-light-1}}'}.br-button.br-THEME_NAME-theme.br-accent.br-raised.br-circle:not([disabled]),a.br-button.br-THEME_NAME-theme.br-accent.br-raised.br-circle:not([disabled]){color:'{{accent-light-5}}';background:'{{accent-light-1}}'}.br-button.br-THEME_NAME-theme.br-accent.br-raised:not([disabled]):not(.br-circle):before,a.br-button.br-THEME_NAME-theme.br-accent.br-raised:not([disabled]):not(.br-circle):before{background:'{{accent-light-1}}';border-color:'{{accent-default}}'}.br-button.br-THEME_NAME-theme.br-accent:not([disabled]):not(.br-mobile):hover,a.br-button.br-THEME_NAME-theme.br-accent:not([disabled]):not(.br-mobile):hover{color:'{{accent-light-6}}';background:'{{accent-default}}'}.br-button.br-THEME_NAME-theme.br-accent:not([disabled]).br-focused,a.br-button.br-THEME_NAME-theme.br-accent:not([disabled]).br-focused{color:'{{accent-light-6}}';background:'{{accent-light-1}}'}.br-button.br-THEME_NAME-theme.br-accent.br-raised .br-icon{color:'{{accent-light-5}}'}.br-button.br-THEME_NAME-theme.br-accent:not([disabled]).br-focused .br-icon,.br-button.br-THEME_NAME-theme.br-accent:not([disabled]):not(.br-mobile):hover .br-icon{color:'{{accent-light-6}}'}.br-button.br-THEME_NAME-theme.br-warn:not([disabled]),.br-button.br-THEME_NAME-theme.br-warn:not([disabled]) .br-icon,a.br-button.br-THEME_NAME-theme.br-warn:not([disabled]){color:'{{warn-default}}'}.br-button.br-THEME_NAME-theme.br-warn.br-raised:not([disabled]),a.br-button.br-THEME_NAME-theme.br-warn.br-raised:not([disabled]){color:'{{warn-light-6}}';background:'{{warn-light-1}}'}.br-button.br-THEME_NAME-theme.br-warn.br-raised.br-circle:not([disabled]),a.br-button.br-THEME_NAME-theme.br-warn.br-raised.br-circle:not([disabled]){color:'{{warn-light-5}}';background:'{{warn-light-1}}'}.br-button.br-THEME_NAME-theme.br-warn.br-raised:not([disabled]):not(.br-circle):before,a.br-button.br-THEME_NAME-theme.br-warn.br-raised:not([disabled]):not(.br-circle):before{background:'{{warn-light-1}}';border-color:'{{warn-default}}'}.br-button.br-THEME_NAME-theme.br-warn:not([disabled]):not(.br-mobile):hover,a.br-button.br-THEME_NAME-theme.br-warn:not([disabled]):not(.br-mobile):hover{color:'{{warn-light-6}}';background:'{{warn-default}}'}.br-button.br-THEME_NAME-theme.br-warn:not([disabled]).br-focused,a.br-button.br-THEME_NAME-theme.br-warn:not([disabled]).br-focused{color:'{{warn-light-6}}';background:'{{warn-light-1}}'}.br-button.br-THEME_NAME-theme.br-warn.br-raised .br-icon{color:'{{warn-light-5}}'}.br-button.br-THEME_NAME-theme.br-warn:not([disabled]).br-focused .br-icon,.br-button.br-THEME_NAME-theme.br-warn:not([disabled]):not(.br-mobile):hover .br-icon{color:'{{warn-light-6}}'}br-checkbox.br-THEME_NAME-theme .br-icon,input[type=checkbox]:not([br-no-style]){border-color:'{{background-2}}'}br-checkbox.br-THEME_NAME-theme.br-checked .br-icon,input[type=checkbox]:not([br-no-style]).ng-not-empty{background-color:'{{foreground-dark-4}}'}br-checkbox.br-THEME_NAME-theme.br-checked .br-icon:after,input[type=checkbox]:not([br-no-style]).ng-not-empty:after{border-color:'{{background-3}}'}br-checkbox.br-THEME_NAME-theme .br-label,input[type=checkbox]:not([br-no-style])+label{color:'{{font-default}}'}br-checkbox.br-THEME_NAME-theme:not([disabled]).br-primary .br-icon,input[type=checkbox]:not([br-no-style]).br-primary{border-color:'{{primary-light-2}}'}br-checkbox.br-THEME_NAME-theme:not([disabled]).br-primary.br-checked.br-focused .br-container:before,br-checkbox.br-THEME_NAME-theme:not([disabled]).br-primary.br-checked .br-icon,input[type=checkbox]:not([br-no-style]).br-primary.ng-not-empty{background-color:'{{primary-default}}'}br-checkbox.br-THEME_NAME-theme:not([disabled]).br-primary.br-checked .br-icon:after,input[type=checkbox]:not([br-no-style]).br-primary.ng-not-empty:after{border-color:'{{primary-light-5}}'}br-checkbox.br-THEME_NAME-theme:not([disabled]).br-accent .br-icon,input[type=checkbox]:not([br-no-style]).br-accent{border-color:'{{accent-light-2}}'}br-checkbox.br-THEME_NAME-theme:not([disabled]).br-accent.br-checked.br-focused .br-container:before,br-checkbox.br-THEME_NAME-theme:not([disabled]).br-accent.br-checked .br-icon,input[type=checkbox]:not([br-no-style]).br-accent.ng-not-empty{background-color:'{{accent-default}}'}br-checkbox.br-THEME_NAME-theme:not([disabled]).br-accent.br-checked .br-icon:after,input[type=checkbox]:not([br-no-style]).br-accent.ng-not-empty:after{border-color:'{{accent-light-5}}'}br-checkbox.br-THEME_NAME-theme:not([disabled]).br-warn .br-icon,input[type=checkbox]:not([br-no-style]).br-warn{border-color:'{{warn-light-2}}'}br-checkbox.br-THEME_NAME-theme:not([disabled]).br-warn.br-checked.br-focused:not([disabled]) .br-container:before,br-checkbox.br-THEME_NAME-theme:not([disabled]).br-warn.br-checked .br-icon,input[type=checkbox]:not([br-no-style]).br-warn.ng-not-empty{background-color:'{{warn-default}}'}br-checkbox.br-THEME_NAME-theme:not([disabled]).br-warn.br-checked .br-icon:after,input[type=checkbox]:not([br-no-style]).br-warn.ng-not-empty:after{border-color:'{{warn-light-5}}'}br-checkbox.br-THEME_NAME-theme[disabled] .br-icon,input[type=checkbox][disabled]:not([br-no-style]){border-color:'{{background-1}}'}br-checkbox.br-THEME_NAME-theme[disabled].br-checked .br-icon,input[type=checkbox][disabled]:not([br-no-style]).ng-not-empty{background-color:'{{background-1}}'}br-checkbox.br-THEME_NAME-theme[disabled].br-checked .br-icon:after,input[type=checkbox][disabled]:not([br-no-style]).ng-not-empty:after{border-color:'{{background-2}}'}br-checkbox.br-THEME_NAME-theme[disabled] .br-label,input[type=checkbox][disabled]:not([br-no-style])+label{color:'{{font-light-2}}'}br-dialog.br-THEME_NAME-theme .br-dialog-content{background-color:'{{dialogBackground-default}}'}br-dialog.br-THEME_NAME-theme:not(.br-alert) .br-dialog-container{background-color:'{{overlay}}'}br-dialog.br-THEME_NAME-theme:not(.br-alert).br-mobile-fill .br-dialog-container{background-color:'{{dialogBackground-default}}'}br-dialog.br-THEME_NAME-theme .br-dialog-label{color:'{{font-default}}'}.br-THEME_NAME-theme.br-drag-order-select-top,.br-THEME_NAME-theme .br-drag-order-select-top{box-shadow:inset 0 8px 0 -4px '{{primary-default}}'}.br-THEME_NAME-theme.br-drag-order-select-bottom,.br-THEME_NAME-theme .br-drag-order-select-bottom{box-shadow:inset 0 -8px 0 -4px '{{primary-default}}'}.br-expander.br-THEME_NAME-theme .br-expander-header{border-color:'{{background-1}}';color:'{{font-light-1}}';background:'{{foreground-light-4}}'}.br-expander.br-THEME_NAME-theme .br-expander-icon{color:'{{font-light-5}}'}.br-expander.br-THEME_NAME-theme br-expander-content{border-color:'{{foreground-dark-4}}'}.br-expander.br-THEME_NAME-theme.br-primary .br-expander-header{color:'{{primary-light-6}}';background:'{{primary-default}}'}.br-expander.br-THEME_NAME-theme.br-primary .br-expander-icon{color:'{{primary-light-6}}'}.br-expander.br-THEME_NAME-theme.br-accent .br-expander-header{color:'{{accent-light-6}}';background:'{{accent-default}}'}.br-expander.br-THEME_NAME-theme.br-accent .br-expander-icon{color:'{{accent-light-6}}'}.br-expander.br-THEME_NAME-theme.br-warn .br-expander-header{color:'{{warn-light-6}}';background:'{{warn-default}}'}.br-expander.br-THEME_NAME-theme.br-warn .br-expander-icon{color:'{{warn-light-6}}'}.br-icon.br-THEME_NAME-theme{color:'{{font-default}}'}.br-icon.br-THEME_NAME-theme.br-primary{color:'{{primary-default}}'}.br-icon.br-THEME_NAME-theme.br-accent{color:'{{accent-default}}'}.br-icon.br-THEME_NAME-theme.br-warn{color:'{{warn-default}}'}br-input.br-THEME_NAME-theme .br-input,input.br-input-standard{color:'{{font-default}}';border-color:'{{foreground-dark-4}}'}br-input.br-THEME_NAME-theme ::placeholder,input.br-input-standard ::placeholder{color:'{{font-light-5}}'}br-input.br-THEME_NAME-theme .br-placeholder,br-input.br-THEME_NAME-theme label,input.br-input-standard+label{color:'{{font-light-2}}'}br-input.br-THEME_NAME-theme:not(.br-input-invalid).br-input-has-value label,input.br-input-standard.ng-not-empty+label{color:'{{font-light-3}}'}br-input.br-THEME_NAME-theme:not(.br-input-invalid).br-input-focused .br-input:not([readonly]),input.br-input-standard:focus{border-color:'{{primary-default}}'}input.br-input-standard:focus+label br-input.br-THEME_NAME-theme:not(.br-input-invalid).br-input-focused label{color:'{{primary-default}}'}br-input.br-THEME_NAME-theme:not(.br-input-invalid).br-input-focused.br-accent .br-input{border-color:'{{accent-light-1}}'}br-input.br-THEME_NAME-theme:not(.br-input-invalid).br-input-focused.br-accent label{color:'{{accent-default}}'}br-input.br-THEME_NAME-theme:not(.br-input-invalid).br-input-focused.br-warn .br-input{border-color:'{{warn-light-1}}'}br-input.br-THEME_NAME-theme:not(.br-input-invalid).br-input-focused.br-warn label{color:'{{warn-default}}'}br-input.br-THEME_NAME-theme.br-input-invalid .br-input,input.br-input-standard.ng-invalid.ng-touched{border-color:'{{warn-default}}'}br-input.br-THEME_NAME-theme.br-input-invalid label,input.br-input-standard.ng-invalid.ng-touched+label{color:'{{warn-default}}'}br-input.br-THEME_NAME-theme [data-ng-message],br-input.br-THEME_NAME-theme [ng-message],br-input.br-THEME_NAME-theme [x-ng-message],br-input.br-THEME_NAME-theme data-ng-message,br-input.br-THEME_NAME-theme ng-message,br-input.br-THEME_NAME-theme x-ng-message{color:'{{font-light-2}}'}br-input.br-THEME_NAME-theme.br-input-invalid [data-ng-message],br-input.br-THEME_NAME-theme.br-input-invalid [ng-message],br-input.br-THEME_NAME-theme.br-input-invalid [x-ng-message],br-input.br-THEME_NAME-theme.br-input-invalid data-ng-message,br-input.br-THEME_NAME-theme.br-input-invalid ng-message,br-input.br-THEME_NAME-theme.br-input-invalid x-ng-message{color:'{{warn-default}}'}br-input.br-THEME_NAME-theme .br-input[disabled],input[disabled].br-input-standard{border-color:transparent;color:'{{foreground-light-2}}';background-image:linear-gradient(90deg,'{{foreground-light-3}}' 0,'{{foreground-light-3}}' 33%,transparent 0)}br-input.br-THEME_NAME-theme .br-input[readonly=readonly],br-input.br-THEME_NAME-theme .br-input[readonly],input[readonly=readonly].br-input-standard,input[readonly].br-input-standard{color:'{{font-light-2}}';background-color:'{{foreground-light-3}}';border-color:'{{foreground-light-3}}'}br-input.br-THEME_NAME-theme .br-x{color:'{{font-light-2}}'}br-input.br-THEME_NAME-theme:not([disabled]):not(.br-touch) .br-x:hover,br-list.br-THEME_NAME-theme br-item{color:'{{font-default}}'}br-list.br-THEME_NAME-theme:not(.br-no-divider) br-item{border-color:'{{foreground-default}}'}br-list.br-THEME_NAME-theme .br-item-title{color:'{{font-default}}'}br-list.br-THEME_NAME-theme .br-item-sub-title{color:'{{font-light-1}}'}br-list.br-THEME_NAME-theme br-item.br-selected{background-color:'{{foreground-default}}'}br-list.br-THEME_NAME-theme:not(.br-touch):not(.br-no-hover) br-item:not(.br-no-hover):hover{color:'{{font-default}}';background-color:'{{foreground-light-1}}'}br-list.br-THEME_NAME-theme:not(.br-touch):not(.br-no-hover) br-item:not(.br-no-hover):hover .br-item-sub-title,br-list.br-THEME_NAME-theme:not(.br-touch):not(.br-no-hover) br-item:not(.br-no-hover):hover .br-item-title{color:'{{font-light-2}}'}br-list.br-THEME_NAME-theme.br-primary br-item.br-selected{background-color:'{{primary-light-2}}'}br-list.br-THEME_NAME-theme.br-primary:not(.br-touch):not(.br-no-hover) br-item:not(.br-no-hover):hover{color:'{{primary-light-6}}';background-color:'{{primary-light-1}}'}br-list.br-THEME_NAME-theme.br-primary:not(.br-touch):not(.br-no-hover) br-item:not(.br-no-hover):hover .br-item-sub-title,br-list.br-THEME_NAME-theme.br-primary:not(.br-touch):not(.br-no-hover) br-item:not(.br-no-hover):hover .br-item-title{color:'{{primary-light-6}}'}br-list.br-THEME_NAME-theme.br-accent br-item.br-selected{background-color:'{{accent-light-2}}'}br-list.br-THEME_NAME-theme.br-accent:not(.br-touch):not(.br-no-hover) br-item:not(.br-no-hover):hover{color:'{{accent-light-6}}';background-color:'{{accent-light-1}}'}br-list.br-THEME_NAME-theme.br-accent:not(.br-touch):not(.br-no-hover) br-item:not(.br-no-hover):hover .br-item-sub-title,br-list.br-THEME_NAME-theme.br-accent:not(.br-touch):not(.br-no-hover) br-item:not(.br-no-hover):hover .br-item-title{color:'{{accent-light-6}}'}br-list.br-THEME_NAME-theme.br-warn br-item.br-selected{background-color:'{{warn-light-2}}'}br-list.br-THEME_NAME-theme.br-warn:not(.br-touch):not(.br-no-hover) br-item:not(.br-no-hover):hover{color:'{{warn-light-6}}';background-color:'{{warn-light-1}}'}br-list.br-THEME_NAME-theme.br-warn:not(.br-touch):not(.br-no-hover) br-item:not(.br-no-hover):hover .br-item-sub-title,br-list.br-THEME_NAME-theme.br-warn:not(.br-touch):not(.br-no-hover) br-item:not(.br-no-hover):hover .br-item-title{color:'{{warn-light-6}}'}br-menu-content.br-THEME_NAME-theme{background-color:'{{foreground-light-4}}'}br-menu-content.br-THEME_NAME-theme br-menu-divider{background-color:'{{background-1}}'}br-radio-button.br-THEME_NAME-theme .br-off{border-color:'{{background-2}}'}br-radio-button.br-THEME_NAME-theme .br-on{background-color:'{{background-3}}'}br-radio-button.br-THEME_NAME-theme.br-checked .br-off{border-color:'{{background-3}}'}br-radio-button.br-THEME_NAME-theme.br-primary .br-off{border-color:'{{primary-light-1}}'}br-radio-button.br-THEME_NAME-theme:not([disabled]).br-primary .br-on{background-color:'{{primary-light-1}}'}br-radio-button.br-THEME_NAME-theme:not([disabled]).br-primary.br-checked .br-off{border-color:'{{primary-light-1}}'}br-radio-button.br-THEME_NAME-theme.br-accent .br-off{border-color:'{{accent-light-1}}'}br-radio-button.br-THEME_NAME-theme:not([disabled]).br-accent .br-on{background-color:'{{accent-light-1}}'}br-radio-button.br-THEME_NAME-theme:not([disabled]).br-accent.br-checked .br-off{border-color:'{{accent-light-1}}'}br-radio-button.br-THEME_NAME-theme.br-warn .br-off{border-color:'{{warn-light-1}}'}br-radio-button.br-THEME_NAME-theme:not([disabled]).br-warn .br-on{background-color:'{{warn-light-1}}'}br-radio-button.br-THEME_NAME-theme:not([disabled]).br-warn.br-checked .br-off{border-color:'{{warn-light-1}}'}br-radio-button.br-THEME_NAME-theme[disabled] .br-container .br-off,br-radio-button.br-THEME_NAME-theme[disabled] .br-container .br-on{border-color:'{{foreground-light-2}}'}br-radio-group.br-THEME_NAME-theme:focus:not(:empty){border-color:'{{foreground-default}}'}br-radio-button.br-THEME_NAME-theme .br-label{color:'{{font-default}}'}.br-select.br-THEME_NAME-theme .br-select-content{color:transparent}.br-select.br-THEME_NAME-theme.br-select-has-value .br-select-content,select.br-select-standard.ng-not-empty{color:'{{font-default}}'}.br-select.br-THEME_NAME-theme .br-select-content,select.br-select-standard{border-color:'{{foreground-dark-4}}'}.br-select.br-THEME_NAME-theme .br-select-content.br-disabled,select[disabled].br-select-standard{color:'{{foreground-light-2}}';border-color:transparent;background-image:linear-gradient(90deg,'{{foreground-light-3}}' 0,'{{foreground-light-3}}' 33%,transparent 0)}.br-select.br-THEME_NAME-theme ::placeholder{color:'{{font-light-5}}'}.br-select.br-THEME_NAME-theme .br-placeholder{color:'{{font-light-4}}'}.br-select.br-THEME_NAME-theme label,select.br-select-standard+label{color:'{{font-light-2}}'}.br-select.br-THEME_NAME-theme.br-select-has-placeholder .br-select-content{color:'{{font-light-3}}'}.br-select.br-THEME_NAME-theme.br-select-has-value .br-select-content{color:'{{font-default}}'}.br-select.br-THEME_NAME-theme.br-select-has-value label,.br-select.br-THEME_NAME-theme .br-select-icon,select.br-select-standard.ng-not-empty+label{color:'{{font-light-3}}'}.br-select.br-THEME_NAME-theme .br-select-content.br-disabled .br-select-icon{color:'{{font-light-5}}'}.br-select.br-THEME_NAME-theme.br-select-focused .br-select-content,select.br-select-standard:focus{border-color:'{{primary-default}}'}.br-select.br-THEME_NAME-theme.br-select-focused label,select.br-select-standard:focus+label{color:'{{primary-default}}'}.br-select.br-THEME_NAME-theme.br-select-focused.br-accent .br-select-content{border-color:'{{accent-light-1}}'}.br-select.br-THEME_NAME-theme.br-select-focused.br-accent label{color:'{{accent-default}}'}.br-select.br-THEME_NAME-theme.br-select-focused.br-warn .br-select-content{border-color:'{{warn-light-1}}'}.br-select.br-THEME_NAME-theme.br-select-focused.br-warn label{color:'{{warn-default}}'}br-side-content.br-THEME_NAME-theme{background-color:'{{foreground-light-4}}'}br-side-content.br-THEME_NAME-theme.br-border-left,br-side-content.br-THEME_NAME-theme.br-border-right{border-color:'{{background-1}}'}br-slider.br-THEME_NAME-theme .br-track{background-color:'{{foreground-light-2}}'}br-slider.br-THEME_NAME-theme .br-thumb,br-slider.br-THEME_NAME-theme .br-track.br-track-fill{background-color:'{{foreground-default}}'}br-slider.br-THEME_NAME-theme .br-slider-value{color:'{{font-light-2}}';background-color:'{{background-2}}'}br-slider.br-THEME_NAME-theme .br-focus-ring{border-color:'{{foreground-light-3}}'}br-slider.br-THEME_NAME-theme.br-primary .br-track.br-track-fill{background-color:'{{primary-default}}'}br-slider.br-THEME_NAME-theme.br-primary .br-thumb{border-color:'{{primary-default}}';background-color:'{{primary-default}}'}br-slider.br-THEME_NAME-theme.br-accent .br-track.br-track-fill{background-color:'{{accent-default}}'}br-slider.br-THEME_NAME-theme.br-accent .br-thumb{border-color:'{{accent-default}}';background-color:'{{accent-default}}'}br-slider.br-THEME_NAME-theme.br-warn .br-track.br-track-fill{background-color:'{{warn-default}}'}br-slider.br-THEME_NAME-theme.br-warn .br-thumb{border-color:'{{warn-default}}';background-color:'{{warn-default}}'}br-slider.br-THEME_NAME-theme[disabled] .br-thumb,br-slider.br-THEME_NAME-theme[disabled] .br-track{background-color:'{{background-2}}'}br-spinner.br-THEME_NAME-theme{background-color:transparent}br-spinner.br-THEME_NAME-theme .br-spinner-left .br-half-circle,br-spinner.br-THEME_NAME-theme .br-spinner-right .br-half-circle{border-right-color:'{{background-1}}';border-bottom-color:'{{background-1}}'}br-spinner.br-THEME_NAME-theme.br-primary .br-spinner-left .br-half-circle,br-spinner.br-THEME_NAME-theme.br-primary .br-spinner-right .br-half-circle{border-right-color:'{{primary-default}}';border-bottom-color:'{{primary-default}}'}br-spinner.br-THEME_NAME-theme.br-accent .br-spinner-left .br-half-circle,br-spinner.br-THEME_NAME-theme.br-accent .br-spinner-right .br-half-circle{border-right-color:'{{accent-default}}';border-bottom-color:'{{accent-default}}'}br-spinner.br-THEME_NAME-theme.br-warn .br-spinner-left .br-half-circle,br-spinner.br-THEME_NAME-theme.br-warn .br-spinner-right .br-half-circle{border-right-color:'{{warn-default}}';border-bottom-color:'{{warn-default}}'}.br-subheader.br-THEME_NAME-theme .br-subheader-inner{background:#f5f5f5}br-switch.br-THEME_NAME-theme .br-thumb{background-color:'{{background-1}}'}br-switch.br-THEME_NAME-theme.br-primary .br-thumb{background-color:'{{primary-light-1}}'}br-switch.br-THEME_NAME-theme.br-accent .br-thumb{background-color:'{{accent-light-1}}'}br-switch.br-THEME_NAME-theme.br-warn .br-thumb{background-color:'{{warn-light-1}}'}br-switch.br-THEME_NAME-theme .br-check{border-color:#fff}br-switch.br-THEME_NAME-theme.br-primary .br-check{border-color:'{{primary-light-6}}'}br-switch.br-THEME_NAME-theme.br-accent .br-check{border-color:'{{accent-light-6}}'}br-switch.br-THEME_NAME-theme.br-warn .br-check{border-color:'{{warn-light-6}}'}br-switch.br-THEME_NAME-theme.br-checked .br-thumb{background-color:#fff}br-switch.br-THEME_NAME-theme.br-checked .br-bar{background-color:'{{background-1}}'}br-switch.br-THEME_NAME-theme.br-checked.br-primary .br-thumb{background-color:'{{primary-default}}'}br-switch.br-THEME_NAME-theme.br-checked.br-primary .br-bar{background-color:'{{primary-light-3}}'}br-switch.br-THEME_NAME-theme.br-checked.br-accent .br-thumb{background-color:'{{accent-default}}'}br-switch.br-THEME_NAME-theme.br-checked.br-accent .br-bar{background-color:'{{accent-light-3}}'}br-switch.br-THEME_NAME-theme.br-checked.br-warn .br-thumb{background-color:'{{warn-default}}'}br-switch.br-THEME_NAME-theme.br-checked.br-warn .br-bar{background-color:'{{warn-light-3}}'}br-switch.br-THEME_NAME-theme[disabled] .br-thumb{background-color:'{{background-2}}'}br-switch.br-THEME_NAME-theme[disabled] .br-bar{background-color:'{{foreground-light-3}}'}br-switch.br-THEME_NAME-theme:focus .br-label:not(:empty){border-color:'{{foreground-default}}';border-style:dotted}br-switch.br-THEME_NAME-theme .br-label{color:'{{font-default}}'}br-table.br-THEME_NAME-theme br-th{color:'{{font-light-3}}'}br-table.br-THEME_NAME-theme br-th.active{color:'{{font-light-1}}'}br-table.br-THEME_NAME-theme br-td{color:'{{font-default}}'}br-tr{border-color:'{{foreground-default}}'}br-toast.br-THEME_NAME-theme.br-warn{background:'{{warn-default}}'}br-toast.br-THEME_NAME-theme.br-primary{background:'{{primary-default}}'}br-toast.br-THEME_NAME-theme.br-accent{background:'{{accent-default}}'}br-tooltip.br-THEME_NAME-theme{color:'{{font-light-6}}'}br-tooltip.br-THEME_NAME-theme .br-background{background-color:'{{background-5}}'}"); 
})();

}());
(function(){"use strict";angular
  .module('brMaterial')
  .factory('$brComponentRegistry', brComponentRegistry);



brComponentRegistry.$inject = ['$q'];
function brComponentRegistry($q) {
  var instances = [];
  var pendings = {};


  var service = {
    register: register,
    get: get,
    when: when,
    notFoundError: notFoundError
  };
  return service;



  function notFoundError(handle) {
    console.log('$brComponentRegistry: No instance found for handle', handle);
  }

  function register(instance, handle) {
    if (!handle) { return angular.noop; }

    instance.$$brHandle = handle;
    instances.push(instance);
    resolveWhen();

    return deregister;



    function deregister() {
      var index = instances.indexOf(instance);
      if (index !== -1) {
        instances.splice(index, 1);
      }
    }

    function resolveWhen() {
      var dfd = pendings[handle];
      if (dfd) {
        dfd.resolve(instance);
        delete pendings[handle];
      }
    }
  }


  function get(handle) {
    if (isValidID(handle) === false) { return null; }

    var i = 0;
    var length = instances.length;
    var instance;

    while (i < length) {
      instance = instances[i];
      i++;

      if (instance.$$brHandle === handle) {
        return instance;
      }
    }

    return null;
  }


  function when(handle) {
    if (isValidID(handle) === true) {
      var deferred = $q.defer();
      var instance = get(handle);

      if (instance) {
        deferred.resolve(instance);
      } else {
        pendings[handle] = deferred;
      }

      return deferred.promise;
    }

    return $q.reject("Invalid `br-component-id` value");
  }



  function isValidID(handle) {
    return handle && (handle !== '');
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .factory('$brConstant', brConstantFactory);

brConstantFactory.$inject = ['$sniffer'];
function brConstantFactory($sniffer) {

  var webkit = /webkit/i.test($sniffer.vendorPrefix);
  function vendorProperty(name) {
    return webkit ?  ('webkit' + name.charAt(0).toUpperCase() + name.substring(1)) : name;
  }

  return {
    KEY_CODE: {
      ENTER: 13,
      ESCAPE: 27,
      SPACE: 32,
      LEFT_ARROW : 37,
      UP_ARROW : 38,
      RIGHT_ARROW : 39,
      DOWN_ARROW : 40,
      BACKSPACE: 8,
      DELETE: 46,
      TAB: 9
    },
    CSS: {
      TRANSITIONEND: 'transitionend' + (webkit ? ' webkitTransitionEnd' : ''),
      ANIMATIONEND: 'animationend' + (webkit ? ' webkitAnimationEnd' : ''),
      TRANSFORM: vendorProperty('transform'),
      TRANSFORM_ORIGIN: vendorProperty('transformOrigin'),
      TRANSITION: vendorProperty('transition'),
      TRANSITION_DURATION: vendorProperty('transitionDuration'),
      ANIMATION_PLAY_STATE: vendorProperty('animationPlayState'),
      ANIMATION_DURATION: vendorProperty('animationDuration'),
      ANIMATION_NAME: vendorProperty('animationName'),
      ANIMATION_TIMING: vendorProperty('animationTimingFunction'),
      ANIMATION_DIRECTION: vendorProperty('animationDirection')
    },
    MEDIA: {
      'sm': '(max-width: 599px)',
      'md': '(max-width: 959px)',
      'lg': '(max-width: 1199px)'
    }
  };
}
}());
(function(){"use strict";/*
 * register Code/ $brGesture.register(element, 'press');
 *
 * Events:
 * @$br.pressdown  : When down happens
 * @$br.pressup    : when up happens
 */

/*
 * register Code/ $brGesture.register(element, 'hold');
 *
 * Events:
 * @$br.hold  : When down has been > 500 milliseconds and maxDistance is > 6
 */

/*
 * register Code/ $brGesture.register(element, 'drag');
 *
 * Events:
 * @$br.dragstart  : When mindistance > 6
 * @$br.drag       : when move happens
 * @$br.dragend    : when up happens
 */

/*
 * register Code/ $brGesture.register(element, 'swipe');
 *
 * Events:
 * @$br.swipeleft   : When minVelocity > 0.65 & minDistance > 10
 * @$br.swiperight  : When minVelocity > 0.65 & minDistance > 10
 */

var HANDLERS = {};
var isInitialized = false;
var pointer;
var lastPointer;


angular
	.module('brMaterial')
	.factory('$brGesture', brGesture)
	.factory('$$BrGestureHandler', BrGestureHandler)
	.run(attachEventsToDocument);


brGesture.$inject = ['$$BrGestureHandler', '$timeout', '$$rAF'];
function brGesture($$BrGestureHandler, $timeout, $$rAF) {
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;
	var isIos = userAgent.match(/ipad|iphone|ipod/i);
	var isAndroid = userAgent.match(/android/i);

	var factory = {
		handler: addHandler,
		register: register,
		isHijackingClicks: (isIos || isAndroid)
	};


	// handle click hijacking. this will make sure no ghost clicks happan. this happens touch devices
	if (factory.isHijackingClicks) {
		factory.handler('click', {
			options: {
				maxDistance: 6
			},
			onEnd: function (ev, pointer) {
				if (pointer.distance < this.state.options.maxDistance) {
					this.dispatchEvent(ev, 'click');
				}
			}
		});
	}



	//--- Public functions ----------

	function register(element, handlerName, options) {
		var handler = HANDLERS[handlerName.replace(/^\$br./, '')];
		if (!handler) {
			throw new Error('Failed to register element with handler ' + handlerName + '. ' +
			'Available handlers: ' + Object.keys(HANDLERS).join(', '));
		}
		return handler.registerElement(element, options);
	}

	function addHandler(name, definition) {
		var handler = new $$BrGestureHandler(name);
		angular.extend(handler, definition);
		HANDLERS[name] = handler;

		return factory;
	}



	return factory
		/*
		 * register Code/ $brGesture.register(element, 'press');
		 *
		 * Events:
		 * @$br.pressdown  : When down happens
		 * @$br.pressup    : when up happens
		 */
		.handler('press', pressHandler())

		/*
		 * register Code/ $brGesture.register(element, 'hold');
		 *
		 * Events:
		 * @$br.hold  : When down has been > 500 milliseconds and maxDistance is > 6
		 */
		.handler('hold', holdHandler())

		/*
		 * register Code/ $brGesture.register(element, 'drag');
		 *
		 * Events:
		 * @$br.dragstart  : When mindistance > 6
		 * @$br.drag       : when move happens
		 * @$br.dragend    : when up happens
		 */
		.handler('drag', dragHandler(true))


		/*
		 * register Code/ $brGesture.register(element, 'dragVertical');
		 *
		 * Events:
		 * @$br.dragstart  : When mindistance > 6
		 * @$br.drag       : when move happens
		 * @$br.dragend    : when up happens
		 */
		.handler('dragVertical', dragHandler(false))

		/*
		 * register Code/ $brGesture.register(element, 'scroll');
		 *
		 * Events:
		 * @$br.scrollstart  : When mindistance > 6
		 * @$br.scroll       : when move happens
		 * @$br.scrollend    : when up happens
		 */
		.handler('scroll', scrollHandler())

		/*
		 * register Code/ $brGesture.register(element, 'swipe');
		 *
		 * Events:
		 * @$br.swipeleft   : When minVelocity > 0.65 & minDistance > 10
		 * @$br.swiperight  : When minVelocity > 0.65 & minDistance > 10
		 */
		.handler('swipe', swipeHandler());




	function pressHandler(){
		var handler = {
			onStart: function (ev, pointer) {
				this.dispatchEvent(ev, '$br.pressdown');
			},
			onEnd: function (ev, pointer) {
				this.dispatchEvent(ev, '$br.pressup');
			}
		};

		return handler;
	}


	function holdHandler(){
		var handler = {
			options: {
				maxDistance: 6,
				delay: 500
			},
			onCancel: function () {
				$timeout.cancel(this.state.timeout);
			},
			onStart: function (ev, pointer) {
				// For hold, require a parent to be registered with $brGesture.register()
				// Because we prevent scroll events, this is necessary.
				if (!this.state.registeredParent) return this.cancel();

				this.state.pos = {x: pointer.x, y: pointer.y};
				this.state.timeout = $timeout(angular.bind(this, function holdDelayFn() {
					this.dispatchEvent(ev, '$br.hold');
					this.cancel(); //we're done!
				}), this.state.options.delay, false);
			},
			onMove: function (ev, pointer) {
				// Don't scroll while waiting for hold.
				// If we don't preventDefault touchmove events here, Android will assume we don't
				// want to listen to anymore touch events. It will start scrolling and stop sending
				// touchmove events.
				ev.preventDefault();

				// If the user moves greater than <maxDistance> pixels, stop the hold timer
				// set in onStart
				var dx = this.state.pos.x - pointer.x;
				var dy = this.state.pos.y - pointer.y;
				if (Math.sqrt(dx * dx + dy * dy) > this.options.maxDistance) {
					this.cancel();
				}
			},
			onEnd: function () {
				this.onCancel();
			}
		};

		return handler;
	}


	function dragHandler(horizontal){

		var handler = {
			options: {
				minDistance: 6,
				horizontal: horizontal || false,
				cancelMultiplier: 1.5
			},
			onStart: function (ev) {
				// For drag, require a parent to be registered with $mdGesture.register()
				if (!this.state.registeredParent) this.cancel();
			},
			onMove: function (ev, pointer) {
				var shouldStartDrag, shouldCancel;
				// Don't scroll while deciding if this touchmove qualifies as a drag event.
				// If we don't preventDefault touchmove events here, Android will assume we don't
				// want to listen to anymore touch events. It will start scrolling and stop sending
				// touchmove events.

				if (!this.state.dragPointer) {
					if (this.state.options.horizontal) {
						shouldStartDrag = Math.abs(pointer.distanceX) > this.state.options.minDistance;
						shouldCancel = Math.abs(pointer.distanceY) > this.state.options.minDistance * this.state.options.cancelMultiplier;
					} else {
						shouldStartDrag = Math.abs(pointer.distanceY) > this.state.options.minDistance;
						shouldCancel = Math.abs(pointer.distanceX) > this.state.options.minDistance * this.state.options.cancelMultiplier;
					}

					if (shouldStartDrag) {
						// Create a new pointer representing this drag, starting at this point where the drag started.
						this.state.dragPointer = makeStartPointer(ev);
						updatePointerState(ev, this.state.dragPointer);
						this.dispatchEvent(ev, '$br.dragstart', this.state.dragPointer);

					} else if (shouldCancel) {
						this.cancel();
					}
				} else {
					this.dispatchDragMove(ev);
				}
			},
			// Only dispatch dragmove events every frame; any more is unnecessray
			dispatchDragMove: $$rAF.throttle(function (ev) {
				// Make sure the drag didn't stop while waiting for the next frame
				if (this.state.isRunning) {
					updatePointerState(ev, this.state.dragPointer);
					this.dispatchEvent(ev, '$br.drag', this.state.dragPointer);
				}
			}),
			onEnd: function (ev, pointer) {
				if (this.state.dragPointer) {
					updatePointerState(ev, this.state.dragPointer);
					this.dispatchEvent(ev, '$br.dragend', this.state.dragPointer);
				}
			}
		};

		return handler;
	}

	function scrollHandler(){
		var handler = {
			options: {
				minDistance: 6,
				horizontal: true,
				cancelMultiplier: 1.5
			},
			onStart: function (ev) {
				// For drag, require a parent to be registered with $mdGesture.register()
				if (!this.state.registeredParent) this.cancel();
			},
			onMove: function (ev, pointer) {
				var shouldStartDrag, shouldCancel;
				// Don't scroll while deciding if this touchmove qualifies as a drag event.
				// If we don't preventDefault touchmove events here, Android will assume we don't
				// want to listen to anymore touch events. It will start scrolling and stop sending
				// touchmove events.

				if (!this.state.dragPointer) {
					shouldStartDrag = Math.abs(pointer.distanceY) > this.state.options.minDistance;
					shouldCancel = Math.abs(pointer.distanceX) > this.state.options.minDistance * this.state.options.cancelMultiplier;

					if (shouldStartDrag) {
						// Create a new pointer representing this drag, starting at this point where the drag started.
						this.state.dragPointer = makeStartPointer(ev);
						updatePointerState(ev, this.state.dragPointer);
						this.dispatchEvent(ev, '$br.scrollstart', this.state.dragPointer);

					} else if (shouldCancel) {
						this.cancel();
					}
				} else {
					this.dispatchDragMove(ev);
				}
			},
			// Only dispatch dragmove events every frame; any more is unnecessray
			dispatchDragMove: $$rAF.throttle(function (ev) {
				// Make sure the drag didn't stop while waiting for the next frame
				if (this.state.isRunning) {
					updatePointerState(ev, this.state.dragPointer);
					this.dispatchEvent(ev, '$br.scroll', this.state.dragPointer);
				}
			}),
			onEnd: function (ev, pointer) {
				if (this.state.dragPointer) {
					updatePointerState(ev, this.state.dragPointer);
					this.dispatchEvent(ev, '$br.scrollend', this.state.dragPointer);
				}
			}
		};

		return handler;
	}


	function swipeHandler(){
		var handler = {
			options: {
				minVelocity: 0.65,
				minDistance: 10
			},
			onEnd: function (ev, pointer) {
				if (Math.abs(pointer.velocityX) > this.state.options.minVelocity &&
					Math.abs(pointer.distanceX) > this.state.options.minDistance) {
					var eventType = pointer.directionX == 'left' ? '$br.swipeleft' : '$br.swiperight';
					this.dispatchEvent(ev, eventType);
				}
			}
		};

		return handler;
	}
}


function BrGestureHandler () {

	function GestureHandler (name) {
		var factory = {
			name: name,
			state: {},
			options: {},

			dispatchEvent: nativeDispatchEvent,

			onStart: angular.noop,
			onMove: angular.noop,
			onEnd: angular.noop,
			onCancel: angular.noop,

			start: start,
			move: move,
			end: end,
			cancel: cancel,

			getNearestParent: getNearestParent,
			registerElement: registerElement
		};

		return factory;


		//--- Public Functions ----------------

		function start(ev, pointer) {
			if (factory.state.isRunning) return;

			var parentTarget = factory.getNearestParent(ev.target);
			var parentTargetOptions = parentTarget && parentTarget.$brGesture[factory.name] || {};

			factory.state = {
				isRunning: true,
				options: angular.extend({}, factory.options, parentTargetOptions),
				registeredParent: parentTarget
			};

			factory.onStart(ev, pointer);
		}

		function move(ev, pointer) {
			if (!factory.state.isRunning) return;

			factory.onMove(ev, pointer);
		}


		function end(ev, pointer) {
			if (!factory.state.isRunning) return;

			factory.onEnd(ev, pointer);
			factory.state.isRunning = false;
		}

		function cancel(ev, pointer) {
			factory.onCancel(ev, pointer);
			factory.state = {};
		}

		function getNearestParent(node) {
			var current = node;
			while (current) {
				if ((current.$brGesture || {})[factory.name]) {
					return current;
				}
				current = current.parentNode;
			}
			return null;
		}

		function registerElement(element, options) {
			element[0].$brGesture = element[0].$brGesture || {};
			element[0].$brGesture[factory.name] = options || {};
			element.on('$destroy', onDestroy);

			return onDestroy;

			function onDestroy() {
				delete element[0].$brGesture[factory.name];
				element.off('$destroy', onDestroy);
			}
		}
	}


	return GestureHandler;



	// --- public functions ----

	function nativeDispatchEvent(srcEvent, eventType, eventPointer) {
		eventPointer = eventPointer || pointer;
		var eventObj;

		if (eventType === 'click') {
			eventObj = document.createEvent('MouseEvents');
			eventObj.initMouseEvent(
				'click', true, true, window, srcEvent.detail,
				eventPointer.x, eventPointer.y, eventPointer.x, eventPointer.y,
				srcEvent.ctrlKey, srcEvent.altKey, srcEvent.shiftKey, srcEvent.metaKey,
				srcEvent.button, srcEvent.relatedTarget || null
			);

		} else {
			eventObj = document.createEvent('CustomEvent');
			eventObj.initCustomEvent(eventType, true, true, {});
		}
		eventObj.$material = true;
		eventObj.pointer = eventPointer;
		eventObj.srcEvent = srcEvent;
		eventPointer.target.dispatchEvent(eventObj);
	}
}



attachEventsToDocument.$inject= ['$brGesture', '$$BrGestureHandler'];
function attachEventsToDocument( $brGesture, $$BrGestureHandler ) {
	if (!document.contains) {
		document.contains = function (node) {
			return document.body.contains(node);
		};
	}


	if (!isInitialized && $brGesture.isHijackingClicks ) {
		document.addEventListener('click', function clickHijacker(ev) {
			var isKeyClick = ev.clientX === 0 && ev.clientY === 0;
			if (!isKeyClick && !ev.$material) {
				ev.preventDefault();
				ev.stopPropagation();
			}
		}, true);

		isInitialized = true;
	}


	// Listen to all events to cover all platforms.
	var START_EVENTS = 'mousedown touchstart pointerdown';
	var MOVE_EVENTS = 'mousemove touchmove pointermove';
	var END_EVENTS = 'mouseup mouseleave touchend touchcancel pointerup pointercancel';

	angular.element(document)
		.on(START_EVENTS, gestureStart)
		.on(MOVE_EVENTS, gestureMove)
		.on(END_EVENTS, gestureEnd);


	function runHandlers(handlerEvent, event) {
		var handler;
		for (var name in HANDLERS) {
			handler = HANDLERS[name];

			//if(handler.name) {

				if(handlerEvent === 'start') {
					handler.cancel();
				}

				handler[handlerEvent](event, pointer);
			//}
		}
	}



	//--- Global event functions ------
	function gestureStart(ev) {
		if (pointer) return;

		var now = +Date.now();

		// iOS & old android bug: after a touch event, a click event is sent 350 ms later.
		// If <400ms have passed, don't allow an event of a different type than the previous event
		if (lastPointer && !typesMatch(ev, lastPointer) && (now - lastPointer.endTime < 1500)) {
			return;
		}

		pointer = makeStartPointer(ev);
		runHandlers('start', ev);
	}

	function gestureMove(ev) {
		if (!pointer || !typesMatch(ev, pointer)) return;

		updatePointerState(ev, pointer);
		runHandlers('move', ev);
	}

	function gestureEnd(ev) {
		if (!pointer || !typesMatch(ev, pointer)) return;

		updatePointerState(ev, pointer);
		pointer.endTime = +Date.now();

		runHandlers('end', ev);

		lastPointer = pointer;
		pointer = null;
	}
}




//--- Public module Functions ------------

function makeStartPointer(ev) {
	var point = getEventPoint(ev);
	var startPointer = {
		startTime: +Date.now(),
		target: ev.target,
		// 'p' for pointer events, 'm' for mouse, 't' for touch
		type: ev.type.charAt(0)
	};
	startPointer.startX = startPointer.x = point.pageX;
	startPointer.startY = startPointer.y = point.pageY;
	return startPointer;
}

function typesMatch(ev, pointer) {
	return ev && pointer && ev.type.charAt(0) === pointer.type;
}

function updatePointerState(ev, pointer) {
	var point = getEventPoint(ev);
	var x = pointer.x = point.pageX;
	var y = pointer.y = point.pageY;

	pointer.distanceX = x - pointer.startX;
	pointer.distanceY = y - pointer.startY;
	pointer.distance = Math.sqrt(
		pointer.distanceX * pointer.distanceX + pointer.distanceY * pointer.distanceY
	);

	pointer.directionX = pointer.distanceX > 0 ? 'right' : pointer.distanceX < 0 ? 'left' : '';
	pointer.directionY = pointer.distanceY > 0 ? 'up' : pointer.distanceY < 0 ? 'down' : '';

	pointer.duration = +Date.now() - pointer.startTime;
	pointer.velocityX = pointer.distanceX / pointer.duration;
	pointer.velocityY = pointer.distanceY / pointer.duration;
}

function getEventPoint(ev) {
	return (ev.touches && ev.touches[0]) ||
		(ev.changedTouches && ev.changedTouches[0]) ||
		ev;
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name media
 */
angular
  .module('brMaterial')
  .factory('$brMedia', brMediaFactory);



/**
 * @ngdoc service
 * @name $brMedia
 * @module media
 *
 * @description
 * `$brMedia` provides boolean values for queries its given
 *
 * ### Available Queries
 * - `sm` - (max-width: 599px)
 * - `md` - (max-width: 959px)
 * - `lg` - (max-width: 1199px)
 *
 * @usage
 * <hljs lang="js">
 * vm isSmall = $brMedia('sm');
 * vm isMedium = $brMedia('md');
 * vm isLarge = $brMedia('lg');
 * </hljs>
 */
brMediaFactory.$inject = ['$brConstant', '$rootScope', '$window'];
function brMediaFactory ($brConstant, $rootScope, $window) {
  var queries = {};
  var mqls = {};
  var results = {};
  var normalizeCache = {};


  return $brMedia;

  function $brMedia(query) {
    var validated = queries[query];
    if (angular.isUndefined(validated)) {
      validated = queries[query] = validate(query);
    }

    var result = results[validated];
    if (angular.isUndefined(result)) {
      result = add(validated);
    }

    return result;
  }



  function validate(query) {
    return $brConstant.MEDIA[query] ||
           ((query.charAt(0) !== '(') ? ('(' + query + ')') : query);
  }


  function add(query) {
    var result = mqls[query] = $window.matchMedia(query);
    result.addListener(onQueryChange);
    return (results[result.media] = !!result.matches);
  }

  function onQueryChange(query) {
    $rootScope.$evalAsync(function() {
      results[query.media] = !!query.matches;
    });
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name mobile
 */
angular
  .module('brMaterial')
  .factory('$brMobile', brMobileService);




/**
 * @ngdoc service
 * @name $brMobile
 * @module mobile
 *
 * @description
 * `$brMobile` has variables to let you know if the device is android, ios, or mobile
 *
 * @usage
 * <hljs lang="html">
 * var isMobile = $brMobile.isMobile;
 * var isAndroid = $brMobile.isAndroid;
 * var isIos = $brMobile.isIos;
 *</hljs>
 */
function brMobileService () {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  var isIos = userAgent.match(/ipad|iphone|ipod/i);
	var isAndroid = userAgent.match(/android/i);
  var isOther = userAgent.match(/windows phone|iemobile|opera mini/i);
  var isMobile = isIos !== null || isAndroid !== null || isOther !== null || false;


  /**
   * @namespace
   * @property {boolean}  isIos
   * @property {objebooleanct}  isAndroid
   * @property {boolean}  isMobile
   */
  var service = {
    isIos: isIos,
    isAndroid: isAndroid,
    isMobile: isMobile
  };
  return service;

}
}());
(function(){"use strict";var PALETTES = {};

// Default Pallette
PALETTES['default'] = {
	font: '333333',
	primary: '3a7eea',
	accent: '5dbf56',
	warn: 'd0021b',
	foreground: 'f5f5f5',
	background: '000000',
	overlay: 'rgba(0,0,0,0)',
	dialogBackground: 'f5f5f5'
};




angular
	.module('brMaterial')
	.provider('$brTheme', ThemingProvider)
	.run(generateTheme);



function ThemingProvider () {
	var defaultTheme = 'default';
	var _dialogMobileFill = false;
	var isNoShadow = false;

  var provider = {
		setDefaultTheme: setDefaultTheme,
		definePalette: definePalette,
		dialogMobileFill: dialogMobileFill,
		noShadow: noShadow,
		$get: ['$rootScope', '$brMobile', ThemingService]
  };
  return provider;


	// --- Public ----------------------

	function setDefaultTheme (theme) {
		defaultTheme = theme;
	}

	function definePalette (name, map) {
		map = map || {};

		PALETTES[name] = {
			font: map.font || '333333',
			primary: map.primary || '3a7eea',
			accent: map.accent || '5dbf56',
			warn: map.warn || 'd0021b',
			foreground: map.foreground || 'f5f5f5',
			background: map.background || '000000',
			overlay: map.overlay || 'rgba(0,0,0,0)',
			dialogBackground: map.dialogBackground || 'f5f5f5'
		};
	}

	function dialogMobileFill () {
		_dialogMobileFill = true;
	}

	function noShadow () {
		isNoShadow = true;
	}





	// ---- Service --------------------


	function ThemingService ($rootScope, $brMobile) {
		applyTheme.inherit = function(el, parent) {
			var ctrl = parent.controller('brTheme');
			var theme = ctrl && crtl.$brTheme || el.attr('br-theme') || defaultTheme;
			changeTheme(theme);

			function changeTheme(theme) {
				var oldTheme = el.data('$brThemeName');
				if(oldTheme) el.removeClass('br-' + oldTheme +'-theme');
				el.addClass('br-' + theme + '-theme');
				el.data('$brThemeName', theme);

				if ($brMobile.isMobile === true) { el.addClass('br-mobile'); }
				if (isNoShadow) { el.addClass('br-no-shadow'); }
			}
		};

		applyTheme.defaultTheme = function () { return defaultTheme; };

		if (_dialogMobileFill) { applyTheme.dialogMobileFill = _dialogMobileFill; }



		return applyTheme;

		function applyTheme(scope, el){
			if (el === undefined) {
				el = scope;
				scope = undefined;
			}
			if (scope === undefined) {
				scope = $rootScope;
			}

			applyTheme.inherit(el, el);
		}
	}

}


generateTheme.$inject = ['$injector'];
function generateTheme ($injector) {
	var themeName;
	var type;
	var contrast;
	var themeCss;
	var regExp;
	var shade;
	var style;
	var head;
	var tempPalette = {};

	for (themeName in PALETTES) {
		themeCss = $injector.has('$BR_THEME_CSS') ? $injector.get('$BR_THEME_CSS') : '';
		themeCss = themeCss.replace(/THEME_NAME/g, themeName);

		tempPalette[themeName] = {};


		for (type in PALETTES[themeName]) {
			if (type !== 'overlay') {
				if (!tempPalette[themeName][type]) {
					if(type === 'background') {
						tempPalette[themeName][type] = getBackgroundShades(PALETTES[themeName][type]);
					}else if (type === 'font') {
						tempPalette[themeName][type] = getFontShades(PALETTES[themeName][type]);
					} else {
						tempPalette[themeName][type] = getShades(PALETTES[themeName][type]);
					}
				}

				regExp = new RegExp('\'{{'+type+'-default}}\'', 'g');
				themeCss = themeCss.replace(regExp, tempPalette[themeName][type].default);

				for (contrast in tempPalette[themeName][type]) {
					if(type === 'background') {
						regExp = new RegExp('\'{{'+type+'-'+contrast+'}}\'', 'g');
						themeCss = themeCss.replace(regExp, tempPalette[themeName][type][contrast]);
					} else if(contrast !== 'default') {
						for (shade in tempPalette[themeName][type][contrast]) {
							regExp = new RegExp('\'{{'+type+'-'+contrast+'-'+shade+'}}\'', 'g');
							themeCss = themeCss.replace(regExp, tempPalette[themeName][type][contrast][shade]);
						}
					}
				}
			} else {
				tempPalette[themeName][type] = PALETTES[themeName][type];
				regExp = new RegExp('\'{{'+type+'}}\'', 'g');
				themeCss = themeCss.replace(regExp, tempPalette[themeName][type]);
			}
		}


		style = document.createElement('style');
		style.innerHTML = themeCss;
		head = document.getElementsByTagName('head')[0];
		head.insertBefore(style, head.lastElementChild);
	}




	//--- get shades from hex -------------

	function getShades (hex, isFont) {
		var luminosity = 0.1;
		var shadesLength = 6;
		var lumInc = 1 / shadesLength;
		var i, j, c, diff, newColor, darkColors = [], lightColors = [];

		hex = cleanHex(hex);
		if(lumInc > 0.08) { lumInc = 0.08; }

		for(i = 0; i < shadesLength; ++i){
			newColor = '';
			for(j = 0; j < 3; ++j) {
				c = parseInt(hex.substr(j *2,2), 16);
				diff = c;
				c = Math.round(Math.min(Math.max(0, c - (luminosity * diff)), 255)).toString(16);
				newColor += ("00"+c).substr(c.length);
			}

			darkColors[(4-i)] = '#'+newColor;
			luminosity += lumInc;
		}


		luminosity = 0.1;
		lumInc = 1 / shadesLength;

		for(i = 0; i < shadesLength; ++i){
			newColor = '';
			for(j = 0; j < 3; ++j) {
				c = parseInt(hex.substr(j*2,2), 16);
				diff = 255 - c;
				c = Math.round(Math.min(Math.max(0, c + (luminosity * diff)), 255)).toString(16);
				newColor += ("00"+c).substr(c.length);
			}

			if(isFont && i === (shadesLength-1)) newColor = 'FFFFFF';
			lightColors[(i+1)] = '#'+newColor;
			luminosity += lumInc;
		}

		return {default: '#'+hex, dark: darkColors, light: lightColors};
	}



	//--- get background shades with alpha -----

	function getBackgroundShades (hex) {
		var rgb = hexToRgb(hex);
		var rgbString = rgb.r + ',' + rgb.g + ',' + rgb.b + ',';
		var shadesLength = 6;
		var alpha = 0.12;
		var colors = [];
		var i = 0;

		for(i; i < shadesLength; ++i) {
			if(i === 0) { colors.default = 'rgba(' + rgbString + alpha.toString() + ')'; }
			else { colors[i] = 'rgba(' + rgbString + alpha.toString() + ')'; }
			alpha += 0.14;
		}

		return colors;
	}


	function hexToRgb (hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}



	//--- get background shades with alpha -----

	function getFontShades (hex, isFont) {
		var luminosity = 0.1;
		var shadesLength = 8;
		var lumInc = 1 / shadesLength;
		var i, j, c, diff, newColor, darkColors = [], lightColors = [];

		hex = cleanHex(hex);
		if(lumInc > 0.08) { lumInc = 0.08; }

		for(i = 0; i < shadesLength; ++i){
			newColor = '';
			for(j = 0; j < 3; ++j) {
				c = parseInt(hex.substr(j *2,2), 16);
				diff = c;
				c = Math.round(Math.min(Math.max(0, c - (luminosity * diff)), 255)).toString(16);
				newColor += ("00"+c).substr(c.length);
			}

			darkColors[(4-i)] = '#'+newColor;
			luminosity += lumInc;
		}


		luminosity = 0.1;
		lumInc = 1 / shadesLength;

		for(i = 0; i < shadesLength; ++i){
			newColor = '';
			for(j = 0; j < 3; ++j) {
				c = parseInt(hex.substr(j*2,2), 16);
				diff = 255 - c;
				c = Math.round(Math.min(Math.max(0, c + (luminosity * diff)), 255)).toString(16);
				newColor += ("00"+c).substr(c.length);
			}

			if(i === (shadesLength-1)) newColor = 'FFFFFF';
			lightColors[(i+1)] = '#'+newColor;
			luminosity += lumInc;
		}

		return {default: '#'+hex, dark: darkColors, light: lightColors};
	}



	//--- Clean Hex --------

	function cleanHex (hex){
		hex = String(hex).replace(/[^0-9a-f]/gi, '');
		if (hex.length < 6) {
			hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
		}

		return hex;
	}
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name util
 */
angular
  .module('brMaterial')
  .factory('$brUtil', brUtilService);


  /**
   * @ngdoc service
   * @name $brUtil
   * @module util
   *
   * @description
   * `$brUtil` has varios helpful functions
   *
   * @usage
   * ### Debounce
   * <hljs lang="js">
   * var debounceFunc = $brUtil.debounce(func, 1000);
   * function func() {
   *  // do stuff
   * }
   *
   * // function is called every 100ms but only executes every seconds
   * $setInterval(function () {
   *  debounceFunc();
   * }, 100);
   * </hljs>
   *
   *
   * ### Throttle
   * <hljs lang="js">
   * var throttleFunc = $brUtil.throttle(func, 1000);
   * function func() {
   *  // do stuff
   * }
   *
   * // function is called every 100ms but only executes every seconds
   * $setInterval(function () {
   *  throttleFunc();
   * }, 100);
   * </hljs>
   */
brUtilService.$inject = ['$brMobile', '$timeout', '$rootScope', '$brConstant', '$document', '$parse', '$templateRequest', '$templateCache'];
function brUtilService ($brMobile, $timeout, $rootScope, $brConstant, $document, $parse, $templateRequest, $templateCache) {
  var nextUniqueId = [];
  var now = window.performance ?
      angular.bind(window.performance, window.performance.now) :
      Date.now;

  var service = {
    now: now,
    toCss: toCss,
    valueToCss: valueToCss,
    nextTick: nextTick,
    valueOnUse: valueOnUse,
    fakeNgModel: fakeNgModel,
    debounce: debounce,
    throttle: throttle,
    nextUid: nextUid,
    ngOptionsHelper: ngOptionsHelper,
    offsetRect: offsetRect,
    clientRect: clientRect,
    nodesToArray: nodesToArray,
    getClosest: getClosest,
    getNode: getNode,
    parseAttributeBoolean: parseAttributeBoolean,
    scrollbarWidth: getScrollbarWidth(),
    getTemplateFromUrl: getTemplateFromUrl
  };
  return service;






  function getTemplateFromUrl(templateUrl, callback) {
    var template;

    template = $templateCache.get(templateUrl);
    if (template === undefined) {
      $templateRequest(templateUrl).then(function (_template) {
        callback(_template);
      });
    } else {
      // fix for template cache cahcing the entire response not just the string
      callback(template);
    }
  }



  function getScrollbarWidth() {
    var div = angular.element('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');
    // Append our div, do our calculation and then remove it
    angular.element($document[0].body).append(div);
    var w1 = div[0].clientWidth;
    div.css('overflow-y', 'scroll');
    var w2 = div[0].clientWidth;
    div.remove();
    return (w1 - w2);
  }


  function getClosest(el, tagName, onlyParent) {
    if (el instanceof angular.element) el = el[0];
    tagName = tagName.toUpperCase();
    if (onlyParent) el = el.parentNode;
    if (!el) return null;
    do {
      if (el.nodeName === tagName) {
        return el;
      }
      el = el.parentNode;
    } while (el !== null);
    return null;
  }


  function nodesToArray(nodes) {
    nodes = nodes || [];

    var results = [];
    for (var i = 0; i < nodes.length; ++i) {
      results.push(nodes.item(i));
    }
    return results;
  }


  function valueToCss(value) {
    if (value === undefined) { return undefined; }
    if (isNaN(value)) { return value; }
    else { return value + 'px'; }
  }


  function toCss (raw) {
    var css = { };
    var lookups = 'left top right bottom width height x y min-width min-height max-width max-height';

    angular.forEach(raw, function (value,key) {
      if ( angular.isUndefined(value) ) { return; }

      if ( lookups.indexOf(key) >= 0 ) {
        css[key] = value + 'px';
      } else {
        switch (key) {
          case 'transition':
            convertToVendor(key, $brConstant.CSS.TRANSITION, value);
          break;

          case 'transform':
            convertToVendor(key, $brConstant.CSS.TRANSFORM, value);
          break;

          case 'transformOrigin':
            convertToVendor(key, $brConstant.CSS.TRANSFORM_ORIGIN, value);
          break;
        }
      }
    });

    return css;

    function convertToVendor(key, vendor, value) {
      vendor.split(' ').forEach(function (key) {
        css[key] = value;
      });
    }
  }

  function nextTick (callback, digest) {
		var timeout = service.nextTick.timeout;
		var queue = service.nextTick.queue || [];

		//-- add callback to the queue
		queue.push(callback);

		//-- set default value for digest
		if (digest === null) digest = true;

		//-- store updated digest/queue values
		service.nextTick.digest = service.nextTick.digest || digest;
		service.nextTick.queue = queue;

		//-- either return existing timeout or create a new one
		return timeout || (service.nextTick.timeout = $timeout(processQueue, 0, false));

		/**
		* Grab a copy of the current queue
		* Clear the queue for future use
		* Process the existing queue
		* Trigger digest if necessary
		*/
		function processQueue () {
			var queue = service.nextTick.queue;
			var digest = service.nextTick.digest;

			service.nextTick.queue = [];
			service.nextTick.timeout = null;
			service.nextTick.digest = false;

			queue.forEach(function (callback) { callback(); });

			if (digest) $rootScope.$digest();
		}
	}


  function valueOnUse (scope, key, getter) {
    var value = null, args = Array.prototype.slice.call(arguments);
    var params = (args.length > 3) ? args.slice(3) : [ ];

    Object.defineProperty(scope, key, {
      get: function () {
        if (value === null) value = getter.apply(scope, params);
        return value;
      }
    });
  }



  function fakeNgModel () {
		return {
			$fake: true,
			$parsers: [],
			$formatters: [],
			$viewChangeListeners: [],
      $validators: {},
			$render: angular.noop,

			$setViewValue: function(value) {
				this.$viewValue = value;
				this.$render(value);
				this.$viewChangeListeners.forEach(function(cb) { cb(); });
			},
			$isEmpty: function(value) {
				return (''+value).length === 0;
			}
		};
	}



  /**
   * @ngdoc method
   * @name $brUtil#debounce
   * @function
   *
   * @description
   * Limits a function to only be called once every (x) amount of ms no matter how many times it is called
   * The function will be called at the end of the time given.
   * This differs from Throttle because throttle will not make the last call
   *
   * @param {function} func - function to be called
   * @param {number} wait - milliseconds
   * @param {scope=} scope - apply this object
   * @param {boolean=} invokeApply - skips dirty cheking if false
   *
   * @return {function} - you call this function inplace of the original function
   */
  function debounce(func, wait, scope, invokeApply) {
		var timer;

		return function debounced () {
			var context = scope,
			args = Array.prototype.slice.call(arguments);

			$timeout.cancel(timer);
			timer = $timeout(function () {
				timer = undefined;
				func.apply(context, args);
			}, wait || 10, invokeApply );
		};
	}



  /**
   * @ngdoc method
   * @name $brUtil#throttle
   * @function
   *
   * @description
   * Limits a function to only be called once every (x) amount of seconds
   * The function will only be called if no function has been called wihtin the delay
   * This differes from debounced because bebounced will always execute one last call
   *
   * @param {function} func - function to be called
   * @param {number} delay - milliseconds
   *
   * @return {function}
   */
  function throttle(func, delay) {
      var recent;

      return function throttled () {
        var context = this;
        var args = arguments;
        var now = Date.now();

        if (!recent || (now - recent > delay)) {
          func.apply(context, args);
          recent = now;
        }
      };
    }



  /**
   * @ngdoc method
   * @name $brUtil#nextUid
   * @function
   *
   * @description
   * Genreates a unique uid
   *
   * @return {string}
   */
  function nextUid() {
		var index = nextUniqueId.length;
		var digit;

		while(index) {
			index--;
			digit = nextUniqueId[index].charCodeAt(0);

			if (digit == 57 /*'9'*/) {
				nextUniqueId[index] = 'A';
				return nextUniqueId.join('');
			}

			if (digit == 90  /*'Z'*/) {
				nextUniqueId[index] = '0';
			} else {
				nextUniqueId[index] = String.fromCharCode(digit + 1);
				return nextUniqueId.join('');
			}
		}

		nextUniqueId.unshift('0');
		return nextUniqueId.join('');
	}




	function clientRect(element, offsetParent, isOffsetRect) {
		var node = getNode(element);
		offsetParent = getNode(offsetParent || node.offsetParent || document.body);
		var nodeRect = node.getBoundingClientRect();

		// The user can ask for an offsetRect: a rect relative to the offsetParent,
		// or a clientRect: a rect relative to the page
		var offsetRect = isOffsetRect ?
		offsetParent.getBoundingClientRect() :
		{ left: 0, top: 0, width: 0, height: 0 };

		return {
			left: nodeRect.left - offsetRect.left + offsetParent.scrollLeft,
			top: nodeRect.top - offsetRect.top + offsetParent.scrollTop,
			width: nodeRect.width,
			height: nodeRect.height
		};
	}

  function getNode(el) {
    if (el === undefined) { return undefined; }
    return el[0] || el;
  }

	function offsetRect(element, offsetParent) {
		return  clientRect(element, offsetParent, true);
	}





  /**
   * @typedef ngOptionsHelper
   * @type Object
   *
   * @property {function} getLabel - Return the label set by using 'for'. Pass in value
   * @property {function} getViewValue - Return the value set my 'as' by passing in the full value
   * @property {function} getValues - Returns the data set
   * @property {function} getTrackBy - Returns the track by value by passing a full value
   */

  /**
   * @name ngOptionsHelper
   * @function
   *
   * @description
   * Returns a set o function for you to access the data in your ngOptions
   *
   * @param {string} optionsExp - The [ng-options] string
   * @param {scope} scope - The scope that contains the ng options data
   *
   * @return {ngOptionsHelper}
   *
   */
  function ngOptionsHelper (optionsExp, scope) {
    // 1: value expression (valueFn)
    // 2: label expression (displayFn)
    // 3: group by expression (groupByFn)
    // 4: disable when expression (disableWhenFn)
    // 5: array item variable name
    // 6: object item key variable name
    // 7: object item value variable name
    // 8: collection expression
    // 9: track by expression
    var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;
    var match = optionsExp.match(NG_OPTIONS_REGEXP);

    var valueName = match[5] || match[7];

    // The variable name for the key of the item in the collection
    var keyName = match[6];

    // An expression that generates the viewValue for an option if there is a label expression
    var selectAs = / as /.test(match[0]) && match[1];

    // An expression that is used to track the id of each object in the options collection
    var trackBy = match[9];

    // An expression that generates the viewValue for an option if there is no label expression
    var valueFn = $parse(match[2] ? match[1] : valueName);
    var selectAsFn = selectAs && $parse(selectAs);
    var viewValueFn = selectAsFn || valueFn;
    var trackByFn = trackBy && $parse(trackBy);
    var displayFn = $parse(match[2] || match[1]);
    // var groupByFn = $parse(match[3] || '');
    // var disableWhenFn = $parse(match[4] || '');
    var valuesFn = $parse(match[8]);


    var getTrackByValueFn = trackBy ?
      function(value, locals) { return trackByFn(scope, locals); } :
      function getHashOfValue(value) { return hashKey(value); };



    return {
      getLabel: getLabel,
      getViewValue: getViewValue,
      getValues: getValues,
      getTrackBy: getTrackBy
    };



    // --- Public ----


    function getLabel (value) {
      if (selectAs !== false) {
        return getSelectLabel(value) || undefined;
      }
      return displayFn(scope, getLocals(value));
    }

    function getViewValue (value) {
      return viewValueFn(scope, getLocals(value));
    }

    function getValue (value) {
      return valueFn(scope, getLocals(value));
    }

    function getTrackBy (value) {
      return trackByFn(scope, getLocals(value));
    }

    function getSelectAs (value) {
      return selectAsFn(scope, getLocals(value));
    }

    function getValues () {
      return valuesFn(scope);
    }




    // --- Private ----

    function getLocals (value) {
      var local = {};
      local[valueName] = value;
      return local;
    }

    function hashKey (obj) {
      var key = obj && obj.$$hashKey;

      if (key) {
        if (typeof key === 'function') {
          key = obj.$$hashKey();
        }
        return key;
      }

      key = objType + ':' + obj;

      return key;
    }


    function getSelectLabel (value) {
      var locals;
      var index = 0;
      var optionValues = valuesFn(scope) || [];
      var optionValuesLength = optionValues.length;

      for (index; index < optionValuesLength; index++) {
        locals = getLocals(optionValues[index]);

        if (viewValueFn(scope, locals) === value) {
          return displayFn(scope, locals);
        }
      }
    }
  }

  function parseAttributeBoolean(value, negatedCheck) {
    return value === '' || !!value && (negatedCheck === false || value !== 'false' && value !== '0');
  }

}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .directive('brSelectMenu', selectMenuDirective)
  .directive('brOptionGroup', optionGroupDirective)
  .directive('brOption', optionDirective)
  .directive('brSelectHeader', selectHeader)
  .directive('brSelectOptionsWrapper', brSelectOptionsWrapper);


var selectNextId = 0;

/**
  * @ngdoc directive
  * @name brSelectMenu
  * @module select
  *
  * @description
  * `<br-select-menu>` is used in place of `<select>`. It it gives the flexibility for searching multiple groupings and buttons
  *
  * @param {boolean=} multiple - Enables multi selection
  * @param {model=} ng-model - `{@link https://docs.angularjs.org/api/ng/directive/ngModel Angular ngModel}`
  * @param {boolean=} ng-disabled - `{@link https://docs.angularjs.org/api/ng/directive/ngChange Angular ngDisabled}`
  * @param {function=} ng-change - `{@link https://docs.angularjs.org/api/ng/directive/ngChange Angular ngChange}`
  * @param {string=} placeholder - Same as input palceholder
  *
  * @usage
  * <hljs lang="html">
  * <br-select>
  *   <label>Label</label>
  *   <br-select-menu ng-model="model" placeholder="Select">
  *     <br-select-header>
  *       <input type="search" ng-model="selectFilter2" placeholder="Search..." />
  *     </br-select-header>
  *
  *     <br-option-group ng-repeat="group in selectListGrouped" label="{{group.label}}" ng-if="(group.people | filter:selectFilter2).length">
  *       <br-option ng-value="item" ng-repeat="item in group.people | filter:selectFilter2">{{item.name}}</br-option>
  *     </br-option-group>
  *
  *     <br-button class="br-primary" ng-click="vm.selectButtonTest();">Create New</br-button>
  *   </br-select-menu>
  * </br-select>
  * </hljs>
  */
selectMenuDirective.$inject = ['$brUtil', '$brTheme', '$compile', '$parse', '$document', '$brBackdrop', '$animateCss', '$window', '$brConstant', '$$rAF', '$brMobile', '$interval', '$timeout'];
function selectMenuDirective($brUtil, $brTheme, $compile, $parse, $document, $brBackdrop, $animateCss, $window, $brConstant, $$rAF, $brMobile, $interval, $timeout) {
  var driectve = {
    restrict: 'E',
    require: ['brSelectMenu', '^?brSelect', 'ngModel'],
    compile: compile,
    controller: ['$scope', '$element', '$attrs', '$brUtil', SelectController]
  };
  return driectve;


  function compile(tElement, tAttr) {
    // add the select value that will hold our placeholder or selected option value

    if (!tAttr.tabindex) {
      tAttr.$set('tabindex', 0);
    }

    // create display value container
    var valueElement = angular.element('<div class="br-select-menu-content"><span class="br-select-menu-label"></span><div class="br-select-icon"></div></div>');
    if (!tElement.attr('id')) {
      tElement.attr('id', 'select_' + $brUtil.nextUid());
    }


    // transplant option groups into container
    var optiongroupsContainer = angular.element('<br-select-options-wrapper class="br-optiongroups-container">').append(
      angular.element('<div class="br-optionsgroup-scroll">').append(
        angular.element('<br-content br-scroll-fix>').append(tElement.contents())));

    tElement.on('$destroy', function () {
      optiongroupsContainer.remove();
    });

    // attach display value and option groups container
    tElement.empty().append(valueElement);
    tElement.append(optiongroupsContainer);
    optiongroupsContainer[0].style.display = 'none';

    var errorsSpacer = angular.element('<div class="br-errors-spacer">');
    tElement.after(errorsSpacer);


    return postLink;
  }


  function postLink(scope, element, attr, ctrls) {
    var EDGE_MARGIN = 8;

    var stickTopKiller;
    var isOpen = false;
    var isStickTop = false;
    var wasAppended = false;
    var selectMenuCtrl = ctrls[0];
    var containerCtrl = ctrls[1];
    var ngModelCtrl = ctrls[2] || $brUtil.fakeNgModel();
    var selectLabel = element[0].parentNode.querySelector('label');
    var placeholder = attr.placeholder !== undefined ? attr.placeholder : selectLabel !== null ? selectLabel.innerHTML : '';
    var isReadonly = attr.readonly !== undefined;
    var valueElement = angular.element(element[0].querySelector('.br-select-menu-content'));
    var labelElement = angular.element(valueElement[0].querySelector('.br-select-menu-label'));
    var containerElement = angular.element(element[0].querySelector('.br-optiongroups-container'));
    var contentElement = angular.element(element[0].querySelector('br-content'))[0];
    var debounceUpdatePos = $$rAF.throttle(updatePosition);
    var searchInputElement = containerElement[0].querySelector('br-select-header input');

    if (searchInputElement !== null) {
      // remvoe default styling from input
      angular.element(searchInputElement).removeClass('br-input br-input-standard');
    }

    $brTheme(containerElement);

    // add placeholder if it exists and ng model is empty
    containerCtrl.label = labelElement;



    if (attr.placeholder !== undefined) {
      element.removeAttr('placeholder');
      containerCtrl.setHasPlaceholder(true);
    } else if (placeholder !== '') {
      attr.$set('placeholder', placeholder);
    }



    selectMenuCtrl.init(ngModelCtrl, attr.ngModel);
    var originalRender = ngModelCtrl.$render; // this is set from the select controller
    ngModelCtrl.$render = function() {
      originalRender();
      syncLabelText();
      // inputCheckValue();
    };
    containerCtrl.selectElement = element;
    selectMenuCtrl.containerElement = containerElement;

    attr.$observe('placeholder', ngModelCtrl.$render);
    attr.$observe('disabled', function (disabled) {
      valueElement.toggleClass('br-disabled', !!disabled);

      if (disabled === true) {
        containerElement.off('keydown', handleKeypress);
        element
          .removeAttr('tabindex')
          .off('click', openSelect)
          .off('keydown', handleKeypress);
      } else {
        containerElement.on('keydown', handleKeypress);
        element
          .attr({'tabindex': attr.tabindex})
          .on('click', openSelect)
          .on('keydown', handleKeypress);
      }
    });

    if (attr.disabled === undefined && attr.ngDisabled === undefined) {
      element.on('click', openSelect);
      element.on('keydown', handleKeypress);
      containerElement.on('keydown', handleKeypress);
    }

    if (attr.multiple !== undefined) {
      containerElement.addClass('br-multiple');
    }
    var deregisterWatcher;
    attr.$observe('brMultiple', function(val) {
      if (deregisterWatcher) { deregisterWatcher(); }
      var parser = $parse(val);

      deregisterWatcher = scope.$watch(function() {
        return parser(scope);
      }, function(multiple, prevVal) {
        if (multiple === undefined && prevVal === undefined) { return; } // assume compiler did a good job
        if (multiple) {
          element.attr('multiple', 'multiple');
          containerElement.addClass('br-multiple');
        } else {
          element.removeAttr('multiple');
          containerElement.removeClass('br-multiple');
        }

        selectMenuCtrl.setMultiple(multiple);
        originalRender = ngModelCtrl.$render;
        ngModelCtrl.$render = function() {
          originalRender();
          syncLabelText();
          // inputCheckValue();
        };
        ngModelCtrl.$render();
      });
    });


    if (!isReadonly) {
      element
        .on('focus', function (ev) {
          containerCtrl.setFocused(true);
        })
        .on('blur', function (ev) {
          containerCtrl.setFocused(false);
        });
    }


    scope.$$postDigest(function() {
      syncLabelText();
    });


    // scope.$watch(selectMenuCtrl.selectedLabels, syncLabelText);
    function syncLabelText() {
      selectMenuCtrl.setLabelText(selectMenuCtrl.selectedLabels());
    }

    // these function are created here to give them access to the container controller
    selectMenuCtrl.setLabelText = function (text) {
      selectMenuCtrl.setIsPlaceholder(!text);
      // Use placeholder attribute, otherwise fallback to the md-input-container label
      var tmpPlaceholder = attr.placeholder || (containerCtrl && containerCtrl.label ? containerCtrl.label.text() : '');
      text = text || tmpPlaceholder || '';
      var target = valueElement.children().eq(0);
      target.html(text);
    };

    selectMenuCtrl.setIsPlaceholder = function (isPlaceholder) {
      if (isPlaceholder === true) {
        if (containerCtrl && containerCtrl.label) {
          containerCtrl.setHasValue(false);
          containerCtrl.label.addClass('_br-placeholder');
        }
      } else {
        if (containerCtrl && containerCtrl.label) {
          containerCtrl.setHasValue(true);
          containerCtrl.label.removeClass('_br-placeholder');
        }
      }
    };


    function handleKeypress(ev) {
      var keyCodes = $brConstant.KEY_CODE;
      var allowedCodes = [32, 13, 38, 40];
      if (allowedCodes.indexOf(ev.keyCode) !== -1) {
        openSelect(ev);
        ev.preventDefault();
      }

      switch (ev.keyCode) {
        case keyCodes.UP_ARROW:
          selectMenuCtrl.focusPrevOption();
          break;
        case keyCodes.DOWN_ARROW:
          selectMenuCtrl.focusNextOption();
          break;
        case keyCodes.SPACE:
        case keyCodes.ENTER:
          var option = $brUtil.getClosest(ev.target, 'br-option');
          if (option) {
            element.triggerHandler({
              type: 'click',
              target: option
            });
            ev.preventDefault();
          }
          setSelected(event);
          break;
        case keyCodes.TAB:
        case keyCodes.ESCAPE:
          ev.stopPropagation();
          ev.preventDefault();
          close(ev);
          break;
        default:
          if (ev.target.nodeName !== 'INPUT' && ev.keyCode >= 31 && ev.keyCode <= 90) {
            ev.stopPropagation();
            ev.preventDefault();
            var optNode = selectMenuCtrl.optNodeForKeyboardSearch(ev);
            selectMenuCtrl.setFocusNode(optNode);
            if (optNode !== undefined) { optNode.focus(); }
          }
      }
    }


    function openSelect() {
      if (isOpen === true) { return; }
      isOpen = true;


      // prevent over scroll
      angular.element(contentElement).on('wheel touchmove', preventOverScoll);

      // watch for window size changes
      angular.element($window)
        .on('resize', debounceUpdatePos)
        .on('orientationchange', debounceUpdatePos);

      // if the device is mobile then stick the select to top center of window
      if ($brMobile.isMobile === true) {
        angular.element(searchInputElement)
          .on('focus', stickSelect)
          .on('blur', unstickSelect);
      }


      // add menu to body if not added yet
      if (wasAppended === false) {
        $document.find('body').eq(0).append(containerElement);
        wasAppended = true;
      }


      containerElement[0].style.display = '';
      containerElement.removeClass('br-leave');
      $brBackdrop.add(containerElement, scope, close);

      var position = calculatePosition(containerElement);

      $animateCss(containerElement, {
        addClass: 'br-active',
        from: $brUtil.toCss(position),
        to: $brUtil.toCss({transform: ''})
      })
      .start()
      .then(function () {
        containerElement[0].addEventListener('click', captureClickListener, true);
        containerElement.addClass('br-clickable');
      });
    }

    function close() {
      if ( !isOpen ) return;
      isOpen = false;

      // remove click listener to prevent propogation and allow button clicks to work
      element.off('click', openSelect);


      // prevent over scroll
      angular.element(contentElement).off('wheel touchmove', preventOverScoll);

      // watch for window size changes
      angular.element($window)
        .off('resize', debounceUpdatePos)
        .off('orientationchange', debounceUpdatePos);

      // if the device is mobile then stick the select to top center of window
      angular.element(searchInputElement)
        .off('focus', stickSelect)
        .off('blur', unstickSelect);

      unstickSelect();


      containerElement[0].removeEventListener('click', captureClickListener, true);
      selectMenuCtrl.resetFocus();

      $animateCss(containerElement, {addClass: 'br-leave'})
        .start()
        .then(function () {
          containerElement.removeClass('br-active');
          containerElement[0].style.display = 'none';
          $brBackdrop.remove();

          // clear search input
          if (searchInputElement !== null) {
            if (angular.element(searchInputElement).data('$ngModelController') !== undefined) {
              angular.element(searchInputElement).data('$ngModelController').$setViewValue('');
              angular.element(searchInputElement).data('$ngModelController').$render();
            }
          }

          // add click back
          element.on('click', openSelect);
        });
    }


    function preventOverScoll(ev) {
      var delta = ev.wheelDelta || -ev.detail;
      var bottomOverflow = contentElement.scrollTop + contentElement.offsetHeight - contentElement.scrollHeight >= 0;
      var topOverflow = contentElement.scrollTop <= 0;

      if ((delta < 0 && bottomOverflow) || (delta > 0 && topOverflow)) {
        ev.preventDefault();
      }
    }

    function updatePosition() {
      var position;

      if (isStickTop === true) {
        position = calculatePosition(containerElement, true);
      } else {
        position = calculatePosition(containerElement);
      }

      containerElement.css($brUtil.toCss(position));
    }

    function stickSelect() {
      isStickTop = true;
      angular.element(contentElement).css('max-height', '256px');

      var inter = $interval(debounceUpdatePos, 10);
      $timeout(function () {
        $interval.cancel(inter);
        inter = undefined;
      }, 1400);
    }

    function unstickSelect(reset) {
      isStickTop = false;
      angular.element(contentElement).css('max-height', '');
    }




    // Close menu on menu item click, if said option is not disabled
    function captureClickListener(event) {
      var target = event.target;

      do {
        if (target === containerElement[0]) { return; }
        if (hasAnyAttribute(target, ['ng-click', 'ng-href']) || target.nodeName == 'BUTTON' || target.nodeName == 'BR-BUTTON' || target.nodeName == 'BR-OPTION') {
          if (!target.hasAttribute('disabled')) {
            if (target.nodeName == 'BR-OPTION') { setSelected(event); }
            else {
              close();
            }
          }
          break;
        }

        target = target.parentNode;
      } while (target);


      function hasAnyAttribute(target, attrs) {
        if (!target) return false;
        var j;
        var i;
        var altForms;
        var attr;
        var rawAttr;

        for (i = 0; i < attrs.length; ++i) {
          attr = attrs[i];
          altForms = [attr, 'data-' + attr, 'x-' + attr];

          for (j = 0; j < altForms.length; ++j) {
            rawAttr = altForms[j];
            if (target.hasAttribute(rawAttr)) {
              return true;
            }
          }
        }

        return false;
      }
    }



    function setSelected(ev) {
      var option = $brUtil.getClosest(ev.target, 'br-option');
      var optionCtrl = option && angular.element(option).data('$brOptionController');

      if (!option || !optionCtrl) return;
      if (option.hasAttribute('disabled')) {
        ev.stopImmediatePropagation();
        return false;
      }


      var optionHashKey = selectMenuCtrl.hashGetter(optionCtrl.value);
      var isSelected = selectMenuCtrl.selected[optionHashKey] !== undefined;

      scope.$apply(function () {
        if (selectMenuCtrl.isMultiple) {
          if (isSelected) {
            selectMenuCtrl.deselect(optionHashKey);
          } else {
            selectMenuCtrl.select(optionHashKey, optionCtrl.value);
          }
        } else {
          if (!isSelected) {
            selectMenuCtrl.deselect(Object.keys(selectMenuCtrl.selected)[0]);
            selectMenuCtrl.select(optionHashKey, optionCtrl.value);
          }
        }
        selectMenuCtrl.refreshViewValue();

        if (selectMenuCtrl.isMultiple !== true) { close(); }
      });
    }





    function calculatePosition(containerElement, stick) {
      stick = stick || false;

      var containerNode = containerElement[0];
      var boundryNodeRect = $document[0].body.getBoundingClientRect();
      var originNodeRect = element[0].getBoundingClientRect();
      var selectBounds = valueElement[0].getBoundingClientRect();

      var bounds = {
        left: boundryNodeRect.left + EDGE_MARGIN,
        right: boundryNodeRect.right - EDGE_MARGIN,
        top: Math.max(boundryNodeRect.top, 0) + EDGE_MARGIN,
        bottom: Math.max(boundryNodeRect.bottom, Math.max(boundryNodeRect.top, 0) + boundryNodeRect.height) - EDGE_MARGIN
      };

      var transformOrigin = 'top 50%';
      var position = {
        top: originNodeRect.top,
        left: Math.abs(originNodeRect.left - ((containerNode.offsetWidth - selectBounds.width) / 2))
      };

      if (stick === true) {
        position.top = $window.scrollY;
        position.left = $window.scrollX + (($window.innerWidth / 2) - (containerNode.offsetWidth / 2));
      }

      clamp(position);
      var scaleX = Math.round(100 * Math.min(originNodeRect.width / containerNode.offsetWidth, 1.0)) / 100;
      var scaleY = Math.round(100 * Math.min(originNodeRect.height / containerNode.offsetHeight, 1.0)) / 100;



      return {
        top: Math.round(position.top),
        left: Math.round(position.left),

        // Animate a scale out if we aren't just repositioning
        transform: isOpen === false ? 'scale(' + scaleX + ', ' + scaleY + ')' : undefined,
        transformOrigin: transformOrigin
      };


      /**
       * Clamps the repositioning of the menu within the confines of
       * bounding element (often the screen/body)
       */
      function clamp(pos) {
        pos.top = Math.max(Math.min(pos.top, bounds.bottom - containerNode.offsetHeight), bounds.top);
        pos.left = Math.max(Math.min(pos.left, bounds.right - containerNode.offsetWidth), bounds.left);
      }
    }

  }




  function SelectController($scope, $element, $attrs, $brUtil) {
    /* jshint validthis: true */
    var vm = this;

    var deregisterCollectionWatch;
    var defaultIsEmpty;

    vm.isMultiple = $attrs.multiple !== undefined;
    vm.selected = {};
    vm.options = {};

    vm.setMultiple = setMultiple;
    vm.select = select;
    vm.deselect = deselect;
    vm.addOption = addOption;
    vm.removeOption = removeOption;
    vm.refreshViewValue = refreshViewValue;
    vm.selectedLabels = selectedLabels;
    vm.optNodeForKeyboardSearch = optNodeForKeyboardSearch;
    vm.focusNextOption = focusNextOption;
    vm.focusPrevOption = focusPrevOption;
    vm.resetFocus = resetFocus;
    vm.setFocusNode = setFocusNode;
    vm.init = init;


    $scope.$watchCollection(function() {
      return vm.options;
    }, function() {
      vm.ngModel.$render();
    });



    function init(ngModel, binding) {
      vm.ngModel = ngModel;
      vm.modelBinding = binding;

      // Allow users to provide `ng-model="foo" ng-model-options="{trackBy: 'foo.id'}"` so
      // that we can properly compare objects set on the model to the available options
      if (ngModel.$options && ngModel.$options.trackBy) {
        var trackByLocals = {};
        var trackByParsed = $parse(ngModel.$options.trackBy);
        vm.hashGetter = function(value, valueScope) {
          trackByLocals.$value = value;
          return trackByParsed(valueScope || $scope, trackByLocals);
        };
        // If the user doesn't provide a trackBy, we automatically generate an id for every
        // value passed in
      } else {
        vm.hashGetter = function getHashValue(value) {
          if (angular.isObject(value)) {
            return 'object_' + (value.$$brSelectId || (value.$$brSelectId = ++selectNextId));
          }
          return value;
        };
      }

      vm.setMultiple(vm.isMultiple);
    }


    function select(hashKey, hashedValue) {
      var option = vm.options[hashKey];
      if (option !== undefined) { option.setSelected(true); }
      vm.selected[hashKey] = hashedValue;
    }

    function deselect(hashKey, hashedValue) {
      var option = vm.options[hashKey];
      if (option !== undefined) { option.setSelected(false); }
      delete vm.selected[hashKey];
    }

    function addOption(hashKey, optionCtrl) {
      if (vm.options[hashKey] !== undefined) {
        throw new Error('Duplicate md-option values are not allowed in a select. ' +
          'Duplicate value "' + optionCtrl.value + '" found.');
      }
      vm.options[hashKey] = optionCtrl;

      // If this option's value was already in our ngModel, go ahead and select it.
      if (vm.selected[hashKey] !== undefined) {
        vm.select(hashKey, optionCtrl.value);
        vm.refreshViewValue();
      }
    }

    function removeOption(hashKey) {
      delete vm.options[hashKey];
      // Don't deselect an option when it's removed - the user's ngModel should be allowed
      // to have values that do not match a currently available option.
    }

    function refreshViewValue() {
      var values = [];
      var option;
      var usingTrackBy;
      var newVal;
      var prevVal;
      var hashKeys = Object.keys(vm.selected);
      var hashKey = hashKeys.pop();

      while (hashKey !== undefined) {
        if ((option = vm.options[hashKey])) {
          values.push(option.value);
        } else {
          // push unhashed key from ealier time
          values.push(vm.selected[hashKey]);
        }

        hashKey = hashKeys.pop();
      }


      usingTrackBy = vm.ngModel.$options && vm.ngModel.$options.trackBy;
      newVal = vm.isMultiple ? values : values[0];
      prevVal = vm.ngModel.$modelValue;

      if (usingTrackBy ? !angular.equals(prevVal, newVal) : prevVal != newVal) {
        vm.ngModel.$setViewValue(newVal);
        vm.ngModel.$render();
      }
    }


    function renderMultiple() {
      var newSelectedValues = vm.ngModel.$modelValue || vm.ngModel.$viewValue || [];
      if (!angular.isArray(newSelectedValues)) { return; }

      var oldSelected = Object.keys(vm.selected);
      var newSelectedHashes = newSelectedValues.map(vm.hashGetter);
      var deselected = oldSelected.filter(function(hash) {
        return newSelectedHashes.indexOf(hash) === -1;
      });

      deselected.forEach(deselect);
      newSelectedHashes.forEach(function (hashKey, i) {
        vm.select(hashKey, newSelectedValues[i]);
      });
    }

    function renderSingular() {
      var value = vm.ngModel.$viewValue || vm.ngModel.$modelValue;
      Object.keys(vm.selected).forEach(deselect);
      vm.select(vm.hashGetter(value), value);
    }



    function selectedLabels(opts) {
      opts = opts || {};
      var selectedOptionEls = $brUtil.nodesToArray(vm.containerElement[0].querySelectorAll('br-option[selected]'));
      if (selectedOptionEls.length) {
        return selectedOptionEls.map(function (el) { return el.innerHTML; }).join(', ');
      } else {
        return '';
      }
    }

    var focusedNode;
    function focusOption(direction) {
      var optionsArray = $brUtil.nodesToArray(vm.containerElement[0].querySelectorAll('br-option'));
      var index = optionsArray.indexOf(focusedNode);
      var newOption;

      do {
        if (index === -1) {
          // We lost the previously focused element, reset to first option
          index = 0;
        } else if (direction === 'next' && index < optionsArray.length - 1) {
          index++;
        } else if (direction === 'prev' && index > 0) {
          index--;
        }
        newOption = optionsArray[index];
        if (newOption.hasAttribute('disabled')) newOption = undefined;
      } while (!newOption && index < optionsArray.length - 1 && index > 0);
      if (newOption !== undefined) { newOption.focus(); }
      focusedNode = newOption;
    }

    function focusNextOption() {
      focusOption('next');
    }

    function focusPrevOption() {
      focusOption('prev');
    }

    function resetFocus() {
      focusedNode = undefined;
    }

    function setFocusNode(node) {
      focusedNode = node || focusedNode;
    }


    function setMultiple(isMultiple) {
      var ngModel = vm.ngModel;
      defaultIsEmpty = defaultIsEmpty || ngModel.$isEmpty;
      vm.isMultiple = isMultiple;
      if (deregisterCollectionWatch) { deregisterCollectionWatch(); }


      if (vm.isMultiple) {
        ngModel.$validators['br-multiple'] = validateArray;
        ngModel.$render = renderMultiple;


        $scope.$watchCollection(vm.modelBinding, function(value) {
          if (validateArray(value)) renderMultiple(value);
          vm.ngModel.$setPristine();
        });


        ngModel.$isEmpty = function(value) {
          return !value || value.length === 0;
        };
      } else {
        delete ngModel.$validators['br-multiple'];
        ngModel.$render = renderSingular;
      }


      function validateArray(modelValue, viewValue) {
        return angular.isArray(modelValue || viewValue || []);
      }
    }


    var searchStr = '';
    var clearSearchTimeout, optNodes, optText;
    var CLEAR_SEARCH_AFTER = 300;
    function optNodeForKeyboardSearch(e) {
      var i = 0;
      var length;

      if (clearSearchTimeout !== undefined) { clearTimeout(clearSearchTimeout); }
      clearSearchTimeout = setTimeout(function() {
        clearSearchTimeout = undefined;
        searchStr = '';
        optText = undefined;
        optNodes = undefined;
      }, CLEAR_SEARCH_AFTER);
      searchStr += String.fromCharCode(e.keyCode);
      var search = new RegExp('^' + searchStr, 'i');
      if (!optNodes) {
        optNodes = $element.find('br-option');
        optText = new Array(optNodes.length);
        angular.forEach(optNodes, function(el, i) {
          optText[i] = el.textContent.trim();
        });
      }

      length = optText.length;
      while (i < length) {
        if (search.test(optText[i])) {
          return optNodes[i];
        }

        i += 1;
      }
    }
  }
}









// ---- Group Directive ---------------------

/**
  * @ngdoc directive
  * @name brOptionGroup
  * @module select
  *
  * @description
  * `<br-option-group>` is used to create groupings of `<br-option>`
  *
  * @param {string} [ng-repeat]
  * @param {string} [ng-label]
  *
  * @example
  * <br-select>
  *   <label>Label</label>
  *   <br-select-menu ng-model="model" placeholder="Select">
  *     <br-select-header>
  *       <input type="search" ng-model="selectFilter2" placeholder="Search..." />
  *     </br-select-header>
  *
  *     <br-option-group ng-repeat="group in selectListGrouped" label="{{group.label}}" ng-if="(group.people | filter:selectFilter2).length">
  *       <br-option ng-value="item" ng-repeat="item in group.people | filter:selectFilter2">{{item.name}}</br-option>
  *     </br-option-group>
  *
  *     <br-button class="br-primary" ng-click="vm.selectButtonTest();">Create New</br-button>
  *   </br-select-menu>
  * </br-select>
  */
function optionGroupDirective() {
  var directive = {
    restrict: 'E',
    compile: compile
  };
  return directive;

  function compile(tElement, tAttr) {
    var labelElement = tElement.find('label');
    if (!labelElement.length) {
      labelElement = angular.element('<div class="br-option-group-label">');
      tElement.prepend(labelElement);
    }
    // labelElement.addClass('_br-container-ignore');
    if (tAttr.label) { labelElement.text(tAttr.label); }
  }
}









// ---- Option Directive ---------------------

var CHECKBOX_SELECTION_INDICATOR = angular.element('<div class="br-select-icon-container"><div class="br-select-menu-icon"></div></div>');

/**
  * @ngdoc directive
  * @name brOption
  * @module select
  *
  * @description
  * `<br-option>` is the containing element for selecting
  *
  * @param {string} [ng-repeat]
  * @param {any} [ng-value]
  *
  * @example
  * <br-select>
  *   <label>Label</label>
  *   <br-select-menu ng-model="model" placeholder="Select">
  *     <br-select-header>
  *       <input type="search" ng-model="selectFilter2" placeholder="Search..." />
  *     </br-select-header>
  *
  *     <br-option-group ng-repeat="group in selectListGrouped" label="{{group.label}}" ng-if="(group.people | filter:selectFilter2).length">
  *       <br-option ng-value="item" ng-repeat="item in group.people | filter:selectFilter2">{{item.name}}</br-option>
  *     </br-option-group>
  *
  *     <br-button class="br-primary" ng-click="vm.selectButtonTest();">Create New</br-button>
  *   </br-select-menu>
  * </br-select>
  */
function optionDirective() {
  var directive = {
    restrict: 'E',
    require: ['brOption', '^^brSelectOptionsWrapper'],
    compile: compile,
    controller: ['$element', OptionController]
  };
  return directive;

  function compile(tElement, tAttr) {
    // Manual transclusion to avoid the extra inner <span> that ng-transclude generates
    tElement.append(angular.element('<div class="br-text">').append(tElement.contents()));
    tElement.attr('tabindex', tAttr.tabindex || '0');
    return postLink;
  }

  function postLink(scope, element, attrs, ctrls) {
    var optionCtrl = ctrls[0];
    var selectCtrl = ctrls[1].selectController;

    if (selectCtrl.isMultiple === true) {
      element.addClass('br-select-checkbox-enabled');
      element.prepend(CHECKBOX_SELECTION_INDICATOR.clone());
    }


    // watch value
    if (attrs.ngValue !== undefined) {
      scope.$watch(attrs.ngValue, setOptionValue);
    } else if (attrs.value !== undefined) {
      setOptionValue(attrs.value);
    } else {
      scope.$watch(function() {
        return element.text().trim();
      }, setOptionValue);
    }


    // disable tabbing on disabled options
    attrs.$observe('disabled', function(disabled) {
      if (disabled === true) {
        element.attr('tabindex', '-1');
      } else {
        element.attr('tabindex', '0');
      }
    });


    // set selected
    scope.$$postDigest(function() {
      attrs.$observe('selected', function(selected) {
        if (selected === undefined) return;
        if (typeof selected === 'string') { selected = true; }

        if (selected === true) {
          if (!selectCtrl.isMultiple) {
            selectCtrl.deselect(Object.keys(selectCtrl.selected)[0]);
          }
          selectCtrl.select(optionCtrl.hashKey, optionCtrl.value);
        } else {
          selectCtrl.deselect(optionCtrl.hashKey);
        }

        selectCtrl.refreshViewValue();
      });
    });


    scope.$on('$destroy', function() {
      selectCtrl.removeOption(optionCtrl.hashKey, optionCtrl);
    });



    function setOptionValue(newValue, oldValue, prevAttempt) {
      if (!selectCtrl.hashGetter) {
        if (prevAttempt !== true) {
          scope.$$postDigest(function() {
            setOptionValue(newValue, oldValue, true);
          });
        }
        return;
      }

      var oldHashKey = selectCtrl.hashGetter(oldValue, scope);
      var newHashKey = selectCtrl.hashGetter(newValue, scope);

      optionCtrl.hashKey = newHashKey;
      optionCtrl.value = newValue;

      selectCtrl.removeOption(oldHashKey, optionCtrl);
      selectCtrl.addOption(newHashKey, optionCtrl);
    }
  }


  function OptionController($element) {
    /* jshint validthis: true */
    var vm = this;

    vm.selected = false;
    vm.setSelected = function (isSelected) {
      if (isSelected === true && vm.selected === false) {
        $element.attr({selected: 'selected'});
      } else if (!isSelected && this.selected) {
        $element.removeAttr('selected');
      }

      vm.selected = isSelected;
    };
  }
}




/**
  * @ngdoc directive
  * @name brSelectHeader
  * @module select
  *
  * @description
  * `<br-select-header>` is the containing element for search input
  *
  * @example
  * <br-select>
  *   <label>Label</label>
  *   <br-select-menu ng-model="model" placeholder="Select">
  *     <br-select-header>
  *       <input type="search" ng-model="selectFilter2" placeholder="Search..." />
  *     </br-select-header>
  *
  *     <br-option-group ng-repeat="group in selectListGrouped" label="{{group.label}}" ng-if="(group.people | filter:selectFilter2).length">
  *       <br-option ng-value="item" ng-repeat="item in group.people | filter:selectFilter2">{{item.name}}</br-option>
  *     </br-option-group>
  *
  *     <br-button class="br-primary" ng-click="vm.selectButtonTest();">Create New</br-button>
  *   </br-select-menu>
  * </br-select>
  */
function selectHeader() {
  var directive = {
    restrict: 'E'
  };
  return directive;
}


function brSelectOptionsWrapper() {
  var directive = {
    restrict: 'E',
    require: ['brSelectOptionsWrapper', '^^brSelectMenu'],
    link: link,
    controller: controller
  };
  return directive;


  function link(scope, element, attrs, ctrls) {
    ctrls[0].selectController = ctrls[1];
  }

  function controller() {
    /* jshint validthis: true */
    var vm = this;

    vm.selectController = undefined;
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .directive('brBackdrop', brBackdropDirective);


brBackdropDirective.$inject = ['$rootElement', '$$rAF', '$animate'];
function brBackdropDirective ($rootElement, $$rAF, $animate) {
  var directive = {
    restrict: 'E',
    link: link
  };
  return directive;


  function link (scope, element, attrs) {
    if ($animate.pin) $animate.pin(element, $rootElement);

    $$rAF(function () {
      $rootElement.append(element);
    });

    element.on('scroll touchmove wheel', function (e) {
      e.stopPropagation();
      e.preventDefault();
    });
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name backdrop
 * @description
 * backdrop
 */
angular
  .module('brMaterial')
  .factory('$brBackdrop', brBackdropService);


/**
 * @ngdoc service
 * @name $brBackdrop
 * @module backdrop
 *
 * @description
 * The `$brBackdrop` service will add a backdrop to any element you give it. it will also call a function when the backdrop is clicked
 *
 * @usage
 * <hljs lang="js">
 * angular.controller('MyCtrl', function($scope, $element, $brBackdrop) {
 *   $brBackdrop.add($element, $scope, function () {
 *     console.log('click callback');
 *     $brBackdrop.remove();
 *   });
 * });
 * </hljs>
 */
brBackdropService.$inject = ['$compile', '$animate'];
function brBackdropService ($compile, $animate) {
  var backdrop;
  var _element;
  var wrapper;

  var service = {
    add: add,
    remove: remove
  };
  return service;



  // --- Public ---------------
  // -------------------------


  /**
   * @ngdoc method
   * @name $brBackdrop#add
   * @function
   *
   * @description
   * The add function will add a backdrop to any element you give it. it will also call a function when the backdrop is clicked
   *
   * @param {elemnt} element - An element to place the backdrop behind
   * @param {scope} scope - A scope to tie the backdrop to
   * @param {function=} clickCallback - A function to call when backdrop is clicked
   */
  function add (element, scope, clickCallback) {
    if(!isValidAdd(element, scope, clickCallback)) return;

    backdrop = $compile('<br-backdrop class="br-click-catcher ng-enter">')(scope);
    createAndAdd(element, scope, clickCallback);
    element.addClass('br-backdrop-content-wrapper');

    // wrapper = angular.element('<div class="br-backdrop-content-wrapper" style="overflow: inherit;"></div>');
    // element.after(wrapper);
    // wrapper.prepend(element);
  }


  /**
    * @ngdoc method
   * @name $brBackdrop#remove
   * @function
   *
   * @description
   * The remove function will remove the current backdrop
   */
  function remove () {
    if(!backdrop) return;

    if(wrapper) {
      wrapper.after(_element);
      wrapper.remove();
      wrapper = null;
    }

    backdrop.off('click');
    backdrop.remove();
    backdrop = null;
  }





  // --- Private ------------------
  // ------------------------------


  function createAndAdd (element, scope, clickCallback) {
    _element = element;

    if(typeof clickCallback === 'function') {
      backdrop.on('click', clickCallback);
    }
  }


  function isValidAdd (element, scope, clickCallback) {
    if(backdrop) {
      console.log('$brBackdrop: You cannot add more than one backdrop at a time');
      return false;
    }

    if(!element) {
      console.log('$brBackdrop: Element is required');
      return false;
    }

    if(!scope) {
      console.log('$brBackdrop: Scope is required');
      return false;
    }

    return true;
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name autocomplete
 */
angular
  .module('brMaterial')
  .directive('brAutocomplete', autocompleteDirective);




  /**
   * @ngdoc directive
   * @name brAutocomplete
   * @module autocomplete
   *
   * @description
   * The `<br-autocomplete>` can be placed inside of `<br-input>` and given a data set to displaya autocomplete list
   *
   * @param {array|object} br-data - data used to search through
   * @param {string} br-label - If `[br-data]` is an object you can pass in the property name to use as the display label. Otherwise the entire item will be displayed. If you pass in an array of strings you can ignore this attribute
   * @param {string|object} br-filter - The value used to filter `[br-data]`. See `{@link https://docs.angularjs.org/api/ng/filter/filter Angular Filer}` for how/what you can pass in.
   * @param {model=} ng-model - `{@link https://docs.angularjs.org/api/ng/directive/ngModel Angular ngModel}`
   * @param {function=} ng-change - `{@link https://docs.angularjs.org/api/ng/directive/ngChange Angular ngChange}`
   *
   * @usage
   * ### Controller
   * <hljs lang="js">
   * angular.controller(function ($scope) {
   *  $scope.correspondence = [
   *    {
   *      label: 'Ben',
   *      searchTerms: ['Programer', 'Human', 'Not a Robot']
   *    },
   *    {
   *      label: 'Susan',
   *      searchTerms: ['Service Manager', 'Cat']
   *    },
   *    {
   *      label: 'Steve',
   *      searchTerms: ['Bens are Better', 'Not Ben']
   *    }
   *  ];
   *
   *  $scope.autoSelectChange = function () {
   *    console.log($scope.autoSelected);
   *  };
   * });
   * </hljs>
   *
   * ### HTML
   * <hljs lang="html">
   * <br-input>
   *  <input ng-model="inputText" placeholder="Search..." br-x />
   *  <br-autocomplete br-data="correspondence" br-label="label" br-filter="inputText" ng-model="autoSelected" ng-change="autoSelectChange()"></br-autocomplete>
   * </br-input>
   * </hljs>
   */
autocompleteDirective.$inject = ['$brTheme', '$parse', '$filter', '$timeout', '$brUtil'];
function autocompleteDirective($brTheme, $parse, $filter, $timeout, $brUtil) {
  var directive = {
    restrict: 'E',
    require: '?ngModel',
    scope: {
      brData: '=',
      brFilter: '='
    },
    template: '<div class="br-autocomplete-container" ng-if="_show" layout="column">'+
      '<div class="br-autocomplete-repeater" ng-repeat="item in _data" ng-click="triggerClick(item)">'+
        '{{item.name}}'+
      '</div>'+
    '</div>',
    link: link
  };
  return directive;



  function link (scope, element, attrs, ctrls) {
    $brTheme(element);

    var ngModelCtrl = ctrls || $brUtil.fakeNgModel();
    var input = angular.element(element.parent().find('input')[0]);
    var filterBy = $filter('filter');
    var rawData = [];
    var filterData = '';

    scope._show = false;

    // TODO look into switching ng click to a directive to reduce watchers
    scope.triggerClick = function (item) {
      ngModelCtrl.$setViewValue(item);
      ngModelCtrl.$render();
    };

    scope.$watch(function () {
      return scope.brData;
    }, function (data) {
      rawData = data;
      filterRaw();
    }, true);


    scope.$watch(function () {
      return scope.brFilter;
    }, function (data) {
      filterData = data;
      filterRaw();
    }, true);

    input
      .on('focus', show)
      .on('blur', hide);

    scope.$on('$destroy', function () {
      input
        .off('focus', show)
        .off('blur', hide);
    });


    function show() {
      scope.$apply(function () {
        scope._show = true;
      });
    }

    function hide() {
      $timeout(function () {
        scope._show = false;
      }, 200);
    }

    function filterRaw() {
      scope._data = filterBy(rawData, filterData);
    }
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name button
 */
angular
  .module('brMaterial')
  .directive('button', buttonExtendDirective)
  .directive('brButton', brButtonDirective);






buttonExtendDirective.$inject = ['$brTheme'];
function buttonExtendDirective($brTheme) {
  var directive = {
    restrict: 'E',
    link: link
  };
  return directive;

  function link(scope, element, attrs) {
    if (!element.hasClass('br-button') && attrs.brNoStyle === undefined) {
      $brTheme(element);
      element.addClass('br-button');
    }
  }
}



/**
 * @ngdoc directive
 * @name brButton
 * @module button
 *
 * @description
 * The `<br-button>` can be a button with txt, icons, or anything else you want. The button type will default to `[type="button"]`
 *
 * @param {boolean=} br-no-style - removes material style from the standard HTML button
 * @param {boolean=} ng-disabled - `{@link https://docs.angularjs.org/api/ng/directive/ngDisabled Angular ngDisabled}`
 * @param {function=} ng-click - `{@link https://docs.angularjs.org/api/ng/directive/ngClick Angular ngClick}`
 * @param {string=} ng-href - `{@link https://docs.angularjs.org/api/ng/directive/ngHref Angular ngHref}`
 *
 * @usage
 * #### Class Names
 * Buttons can have all the main theme classes applied to them
 *  - `br-raised` - Adds backround to button
 *  - `br-primary` - Themes primary color
 *  - `br-accent` - Themes accent color
 *  - `br-warn` - Themes warn color
 *  - `br-circle` - Makes button a circle
 *  - `br-small` - Makes button a smaller circle
 *  - `br-fill` - Makes button stretch to the full width of its container
 *  - `br-shadow` - Add drop shadow to button
 *  - `br-no-radius` - Remove border radius
 *  - `br-no-padding` - Remove padding
 *  - `br-no-margin` - Remove margin
 *
 * <hljs lang="html">
 * <br-button>button</br-button>
 * <br-button class="br-primary">Primary button</br-button>
 * <br-button class="br-primary br-rasied">Primary Raised button</br-button>
 * <br-button class="br-circle br-small"><br-icon br-icon-font="edit"></br-icon></br-button>
 * <br-button class="br-accent br-rasied"><br-icon br-icon-font="add"></br-icon>Icon & Text button</br-button>
 * </hljs>
 */
brButtonDirective.$inject = ['$brTheme', '$timeout', '$brRippleService'];
function brButtonDirective ($brTheme, $timeout, $brRippleService) {
  var directive = {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: getTemplate,
		link: link
  };
  return directive;





  function isAnchor (attr) {
    return angular.isDefined(attr.href) || angular.isDefined(attr.ngHref) || angular.isDefined(attr.ngLink);
  }

  function getTemplate (element, attr) {
    if (isAnchor(attr)) {
      return '<a class="br-button" ng-transclude></a>';
    } else {
      // If buttons don't have type="button", they will submit forms automatically.
      var btnType = (typeof attr.type === 'undefined') ? 'button' : attr.type;
      return '<button class="br-button" type="' + btnType + '" ng-transclude></button>';
    }
  }


  function link (scope, element, attr) {
    $brTheme(element);
    $brRippleService.attach(scope, element);

    // For anchor elements, we have to set tabindex manually when the
    // element is disabled
    if (isAnchor(attr) && angular.isDefined(attr.ngDisabled) ) {
      scope.$watch(attr.ngDisabled, function (isDisabled) {
        element.attr('tabindex', isDisabled ? -1 : 0);
      });
    }


    // disabling click event when disabled is true
    element.on('click', function(e){
      if (attr.disabled === true) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    });

    // restrict focus styles to the keyboard
    var mouseActive = false;
    element.on('mousedown', function() {
        mouseActive = true;
        $timeout(function () {
          mouseActive = false;
        }, 100);
      })
      .on('focus', function () {
        if (mouseActive === false) {
          element.addClass('br-focused');
        }
      })
      .on('blur', function (ev) {
        element.removeClass('br-focused');
      });
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name checkbox
 */
angular
  .module('brMaterial')
  .directive('brCheckbox', brCheckboxDirective);


/**
  * @ngdoc directive
  * @name brCheckbox
  * @module checkbox
  *
  * @description
  * The `<br-checkbox>` standard checkbox
  *
  * @param {model=} ng-model - `{@link https://docs.angularjs.org/api/ng/directive/ngModel Angular ngModel}`
  * @param {boolean=} ng-checked - `{@link https://docs.angularjs.org/api/ng/directive/ngChange Angular ngChecked}`
  * @param {boolean=} ng-disabled - `{@link https://docs.angularjs.org/api/ng/directive/ngChange Angular ngDisabled}`
  * @param {function=} ng-change - `{@link https://docs.angularjs.org/api/ng/directive/ngChange Angular ngChange}`
  * @param {boolean=} br-no-style - use with standard HTML input checkbox to remove material styling
  *
  * @usage
  * #### Class Names
  *  - `br-primary` - Themes primary color
  *  - `br-accent` - Themes accent color
  *  - `br-warn` - Themes warn color
  *
  * <hljs lang="html">
  * <br-checkbox ng-model="switch1">
  *		Switch 1: {{ switch1 }}
  *	</br-checkbox>
  * </hljs>
  */
brCheckboxDirective.$inject = ['$timeout', 'inputDirective', '$brTheme', '$brUtil', '$brGesture', '$brConstant'];
function brCheckboxDirective ($timeout, inputDirective, $brTheme, $brUtil, $brGesture, $brConstant) {
  inputDirective = inputDirective[0];

  var directive = {
		restrict: 'E',
		transclude: true,
		require: '?ngModel',
		template:
			'<div class="br-container">' +
				'<div class="br-icon"></div>' +
			'</div>' +
			'<div ng-transclude class="br-label"></div>',
		compile: compile
	};

	return directive;


  function compile(tElement, tAttrs) {
    tAttrs.type = 'checkbox';
		tAttrs.tabIndex = tAttrs.tabindex || '0';
		tElement.attr('role', tAttrs.type);

    return function link (scope, element, attr, ngModelCtrl) {
      ngModelCtrl = ngModelCtrl || $brUtil.fakeNgModel();
			$brTheme(element);

      // if using ng-checked, trigger ngModel on change
      if (attr.ngChecked) {
				scope.$watch(
					scope.$eval.bind(scope, attr.ngChecked),
					ngModelCtrl.$setViewValue.bind(ngModelCtrl)
				);
			}

      scope.$watch(attr.ngDisabled, function(value) {
        if (value === true) {
          element.attr('tabindex', '-1');
        } else {
          element.attr('tabindex', attr.tabindex);
        }
      });

      inputDirective.link.pre(scope, {
				on: angular.noop,
				0: {}
			}, attr, [ngModelCtrl]);

			ngModelCtrl.$render = render;


      if (attr.brNoClick === undefined) {
        $brGesture.register(element, 'press');
  			element
  				.on('click', onClick)
  				.on('keypress', keypressHandler)
  				.on('focus', function() {
  					element.addClass('br-focused');
  				})
  				.on('blur', function() {
  					element.removeClass('br-focused');
  				});
      }




      function render () {
				if(ngModelCtrl.$viewValue) {
					element.addClass('br-checked');
				} else {
					element.removeClass('br-checked');
				}
			}



      function onClick(e) {
				if (attr.disabled === true || attr.readonly === true) return;

				listener(e);
				element[0].blur();
			}

			function keypressHandler (ev) {
				if (attr.disabled === true || attr.readonly === true) return;

        var keyCode = ev.which || ev.keyCode;
        if (keyCode === $brConstant.KEY_CODE.SPACE || keyCode === $brConstant.KEY_CODE.ENTER) {
          ev.preventDefault();
          if (!element.hasClass('br-focused')) { element.addClass('br-focused'); }
          listener(ev);
        }
      }

      function listener (ev) {
				ev.stopPropagation();

        scope.$apply(function () {
          var viewValue = attr.ngChecked ? attr.checked : !ngModelCtrl.$viewValue;
          ngModelCtrl.$setViewValue(viewValue, ev && ev.type);
          ngModelCtrl.$render();
        });
      }
    };
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name content
 * @description
 * content
 */
angular
  .module('brMaterial')
  .directive('brContent', brContentDirective);



/**
 * @ngdoc directive
 * @name brContent
 * @module content
 *
 *
 * @description
 * The `<br-content>` is a general container, this is used to wrap sticky headers, tables, or any set of scrolling elements
 *
 * @param {boolean=} br-auto-height - If this exits `<br-content>` will automatically fill the avalable viewable space and set its height propery
 * @param {boolean=} br-scroll-fix - Stop scrolling from continuing to the next element with scroll
 * @param {boolean=} br-scroll-y - Sets the overflow for scrolling vertically
 * @param {boolean=} br-scroll-x - Sets the overflow for scrolling horizontally
 *
 * @usage
 * ### Basic
 * You can wrap anything with `<br-content>` to create a scrollable container.
 *
 * <hljs lang="html">
 * <br-content style="height: 400px;" br-scroll-y>
 *  <!-- html goes here -->
 * </br-content>
 * </hljs>
 *
 * ### Sticky Haaders
 * If You place `<br-subheader>` inside of `<br-content>` they will act as sticky headers
 * <hljs lang="html">
 *
 * <br-content style="height: 400px;" br-scroll-y>
 *  <br-subheader>Title</br-subheader>
 *  <!-- html goes here -->
 *  <br-subheader>Title 2</br-subheader>
 *  <!-- html goes here -->
 * </br-content>
 * </hljs>
 */
brContentDirective.$inject = ['$brTheme', '$window', '$$rAF', '$brUtil'];
function brContentDirective ($brTheme, $window, $$rAF, $brUtil) {
  var directive = {
    restrict: 'E',
    link: link,
    controller: ['$element', controller]
  };
  return directive;


  function link (scope, element, attrs) {
    $brTheme(element);

    var isAutoHeight = attrs.brAutoHeight !== undefined;
    var height = element.css('height') || undefined;

    if (height === undefined && isAutoHeight === false) {
      var overflowParent = getOverflowParent();

      if(overflowParent !== undefined) {
        scope.$watch(function () { return overflowParent[0].offsetHeight; }, function (data) {
          element.css('height', data + 'px');
        });
      }

    } else if (height === undefined && isAutoHeight === true) {
      var isCardChild = $brUtil.getClosest(element, 'br-expanded-content') !== null;
      var debouncedUpdateAll = $$rAF.throttle(updateAll);
      debouncedUpdateAll();

      scope.$watch(function () { return element[0].offsetHeight; }, function (data){
        debouncedUpdateAll();
      });

      angular.element($window).on('resize', debouncedUpdateAll);
      scope.$on('$destroy', function () {
        angular.element($window).off('resize', debouncedUpdateAll);
      });
    }


    if (attrs.brScrollFix !== undefined) { iosScrollFix(element[0]); }



    function updateAll() {
      var rect = element[0].getBoundingClientRect();
      var innerHeight = $window.innerHeight;
      if (isCardChild === true) {
        innerHeight -= 30;
      }

      element.css('height', (innerHeight - rect.top) + 'px');
    }


    function getOverflowParent() {
      var parent = element.parent();

      while (parent !== undefined && hasComputedStyleValue('overflowY', parent[0]) === false) {
        if (parent[0] === document) {
          parent = undefined;
        } else {
          parent = parent.parent();
        }
      }

      return parent;
    }


    function hasComputedStyleValue (key, target) {
      key = attrs.$normalize(key);
      target = target || element[0];

      if(target === document) { return false; }
      var computedStyles = $window.getComputedStyle(target);

      return angular.isDefined(computedStyles[key]) && (computedStyles[key] == 'scroll' || computedStyles[key] == 'auto');
    }



    function iosScrollFix(node){
      angular.element(node).on('$br.pressdown', function (ev) {
        if (ev.pointer.type !== 't') return;
        if (ev.$brMaterialScrollFixed) return;
        ev.$brMaterialScrollFixed = true;

        if (node.scrollTop === 0) {
          node.scrollTop = 1;
        } else if (node.scrollHeight === node.scrollTop + node.offsetHeight) {
          node.scrollTop -= 1;
        }
      });
    }
  }


  function controller ($element) {
    /*jshint validthis: true */
    var vm = this;

    // expose for $brSticky
    vm.$element = $element;
  }

}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .directive('brDialog', brDialogDirective)
  .run(['$rootScope', '$brDialog', function ($rootScope, $brDialog) {
    $rootScope.$on( "$locationChangeStart", function (event, next, current) {
      if (next === current) { return; }

      if ($brDialog.canRemove() === true) {
        event.preventDefault();
        $brDialog.remove();
      }
    });
  }]);

brDialogDirective.$inject = ['$brTheme', '$brDialog', '$$rAF', '$window', '$brUtil', '$brMobile'];
function brDialogDirective ($brTheme, $brDialog, $$rAF, $window, $brUtil, $brMobile) {
  var directive ={
    restrict: 'E',
    transclude: true,
    template:
      '<div class="br-dialog-container">'+
        '<div class="br-dialog-content">'+
          '<ng-transclude class="br-dialog-transclude"></ng-transclude>'+
        '</div>'+
      '</div>',
    link: link
  };
  return directive;


  function link (scope, element, attrs) {
    var containerElement = element[0].querySelector('.br-dialog-container');
    var containerElementAngular = angular.element(containerElement);
    var contentElement = element[0].querySelector('.br-dialog-content');
    var debouncedUpdateAll = $$rAF.throttle(updateAll);

    var updateTopPos = $$rAF.throttle(function () {
      containerElementAngular.css($brUtil.toCss({transform: 'translateY(' + $window.scrollY + 'px)'}));
    });

    $brTheme(element);
    element.removeClass('hide');

    if(scope._brMobileFill) {
      element.addClass('br-mobile-fill');
    }


    scope.remove = function (){
      $brDialog.remove();
    };

    scope.$cancel = function (){
      $brDialog
        .remove()
        .then(function () {
          if (typeof scope.cancel === 'function') { scope.cancel(); }
        });
    };

    scope.$continue = function () {
      $brDialog
        .remove()
        .then(function () {
          if (typeof scope.continue === 'function') { scope.continue(); }
        });
    };

    scope.scrollToBottom = function (){
      containerElement.scrollTop = containerElement.scrollHeight;
    };

    scope.isDialogScroll = function () {
      return containerElement.scrollHeight > containerElement.offsetHeight;
    };

    scope.lock = function () {
      angular.element(containerElement).addClass('br-no-event');
    };

    scope.unlock = function () {
      angular.element(containerElement).removeClass('br-no-event');
    };


    scope.init = function (isAlert) {
      // call update function to see if scrolling needs to be enabled
      scope.$watch(function(){return contentElement.offsetHeight;}, function (data){
        debouncedUpdateAll();
      });
      angular.element($window).on('resize', debouncedUpdateAll);
      angular.element($window).on('wheel touchmove', updateTopPos);
      scope.$on('$destroy', function () {
        angular.element($window).off('resize', debouncedUpdateAll);
        angular.element($window).off('wheel touchmove', updateTopPos);
      });

      updateAll();
    };

    function updateAll () {
      if (contentElement.offsetHeight >= containerElement.scrollHeight) {
        element.addClass('br-overflow-y');
        angular.element(contentElement).css('transform', '');
      } else {
        element.removeClass('br-overflow-y');
      }

      updateTopPos();
    }
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name dialog
 * @description
 * dialog
 */
angular
  .module('brMaterial')
  .factory('$brDialog', brDialogService);



/**
  * @ngdoc service
  * @name $brDialog
  * @module dialog
  *
  *
  * @description
  * This service will let you create a dialog popup with optional controls and templates.
  * You can also add an alert type that will display a temporary message. The alerts will queue.
  * you can call the $cancel and $continue in the tempalte to trigger there scope functions
  * cancel is called on the completion of the removal animation
  *
  * @usage
  * ### Baisc Message
  * This will give you a popup with a message and a continue and cancel button. The cancel button will close the dialog.
  *
  * <hljs lang="js">
  * $brDialog.add({
  *   message: 'Hello World',
  *   controls: true,
  *   scope: {
  * 	 continue: function () {
  *     $brDialog.remove();
  *    },
  *   }
  * });
  * </hljs>
  *
  * ### Advanced Message
  * You can control the text used on the default continue and cancel button
  *
  * <hljs lang="js">
  * $brDialog.add({
  *   message: 'Hello World',
  *   controls: {
  *     continueLabel: 'Continue',
  *     cancelLabel: 'Close'
  *   },
  *   scope: {
  * 	 cancel: function () {},
  * 	 continue: function () {}
  *   },
  *   controller: function () {}
  * }).then(function () {
  *   // called post animation
  * });
  * </hljs>
  *
  * ### Templated
  * you can add controllers and locals to create a dialog directive
  *
  * <hljs lang="js">
  * $brDialog.add({
  *   teplateURL: 'theurl.html',
  *   locals: {passedLocal: 'value'},
  *   controllerAs: 'vm',
  *   controller: ['$scope', 'passedLocal', function ($scope, passedLocal) {
  *   })
  * });
  * </hljs>
  *
  * ### Alert
  * Alerts will queue and play sequencially.
  *
  * <hljs lang="js">
  * $brDialog.alert('The Alert Message');
  * </hljs>
  *
  * ### Other
  * <hljs lang="js">
  * $brDialog.lock();
  * $brDialog.unlock();
  * $brDialog.remove().then(function () {
  *   // called post animation
  * });
  * </hljs>
  */
brDialogService.$inject = ['$brMobile', '$timeout', '$document', '$rootScope', '$compile', '$brTheme', '$animateCss', '$brUtil', '$q', '$controller', '$window'];
function brDialogService ($brMobile, $timeout, $document, $rootScope, $compile, $brTheme, $animateCss, $brUtil, $q, $controller, $window) {
  var body = $document.find('body').eq(0);
  var dialogBox;
  var alertBox;
  var alertQueue = [];
  var dialogMobileFill = $brTheme.dialogMobileFill;
  var DEFAULT_CONTINUE_LABLE = 'Continue';
  var DEFAULT_CANCEL_LABEL = 'Cancel';

  var service = {
    add: add,
    alert: alert,
    remove: remove,
    lock: lock,
    unlock: unlock,
    hasDialog: hasDialog,
    canRemove: canRemove
  };
  return service;



  function hasDialog() {
    return dialogBox !== undefined;
  }

  function canRemove() {
    return dialogBox !== undefined && dialogBox.scope().allowBack === undefined;
  }


  /**
   * @ngdoc method
   * @name $brDialog#add
   * @function
   *
   * @description
   * creates a dialog popup
   *
   * @param {object} options - Dialog options
   * @param {string=} options.message - Text to be displayed
   * @param {srting=} options.template - HTML template string
   * @param {string=} options.templateUrl - HTML template path
   * @param {object|boolean=} options.controls - If you set controls to true, then you will get the default continue and cancel buttons. Other widse you can pass in an object containing "continueLabel" and "cancelLabel" to change the default names
   * @param {string=} options.controls.continueLabel - Label for continue button. This will default to "Continue"
   * @param {string=} options.controls.cancelLabel - Label for continue button. This will default to "Continue"
   * @param {function=} options.callback - callback function that returns true/fasle, based on the default continue and cancel functions
   * @param {number=} options.width - set the maxWidth of the dialog
   * @param {boolean=} options.mobileFill - This will turn the popup into a full page element if on a mobile device
   * @param {scope=} options.scope - an object of properties that will be made available on scope
   * @param {object=} options.locals - an object of properties that will be available for injection in the provided controller
   * @param {controller=} options.controller - Controller function or string name
   * @param {string=} options.controllerAs - Controller as name
   * @param {boolean=} options.allowBack - By default the browser back button will run cancel on the dialog and prevent navigation, you can turn this off
   *
   * @return {promise} - a promis called post animation
   */
  function add(options) {
    if (dialogBox) {
      console.log('$brDialog.add() : You cannot add more than one Dialog at a time');
      return;
    }

    // validate required options are present
    checkOptions(options);
    // setup scope and extend with any passed in scope vars

    var template = getTemplate(options);
    var scope = setupScope(options);
    var element = angular.element('<div>').append(template).contents();
    var linkFunc = $compile(element);
    setupController(options, scope, element);
    dialogBox = linkFunc(scope);
    addDialogStyle(dialogBox, options);
    body.append(dialogBox);

    var dialogContainer = angular.element(dialogBox[0].querySelector('.br-dialog-container'));
    dialogContainer.css('opacity', '1').css($brUtil.toCss({transform: 'translateY(' + $window.scrollY + 'px)'}));

    var dialogContent = angular.element(dialogBox[0].querySelector('.br-dialog-content'));
    return $animateCss(dialogContent, {
      addClass: 'br-active',
      from: getTargetPosition(),
      to: $brUtil.toCss({transform: ''})
    }).start().then(function () {
      scope.init();
    });




    function getTargetPosition() {
      var defaultAnim = $brUtil.toCss({transform: 'translate(-50%, -50%) scale(0.4)'});

      if (options.targetEvent === undefined) { return defaultAnim; }
      var target = $brUtil.getNode(options.targetEvent.target);
      if (target === undefined || target === null) { return defaultAnim; }

      var boundRect = dialogContainer[0].getBoundingClientRect();
      var originBnds = target.getBoundingClientRect();

      var dialogRect = dialogContent[0].getBoundingClientRect();
      var dialogCenterPt = centerPointFor(dialogRect);
      var originCenterPt = centerPointFor(originBnds);

      var zoomStyle = {
        centerX: originCenterPt.x - dialogCenterPt.x - (dialogRect.width / 2),
        centerY: originCenterPt.y - dialogCenterPt.y - (dialogRect.height / 2),
        scaleX: Math.round(100 * Math.min(0.5, originBnds.width / dialogRect.width)) / 100,
        scaleY: Math.round(100 * Math.min(0.5, originBnds.height / dialogRect.height)) / 100
      };

      return $brUtil.toCss({transform: 'translate3d(' + zoomStyle.centerX + 'px, ' + zoomStyle.centerY + 'px, 0) scale(' + zoomStyle.scaleX + ',0.4)'});
    }
  }


  function checkOptions(options) {
    if (options === undefined || options === null || typeof options !== 'object') {
      throw Error('$brDialog.add() is expection and object of options');
    }

    // if none of these exist then a dialog box cannot be created
    if (!options.template && !options.templateUrl && (!options.controls || !options.message)) {
      console.log('$brDialog.add() : Is missing required paramters to create. Required One of the following: template, templateUrl, or message with controls');
      return;
    }
  }


  function setupScope(options) {
    var scope = $rootScope.$new();
    angular.extend(scope, options.scope);
    scope._brLock = false;
    scope._brEvent = true;

    if (options.mobileFill === false || $brMobile.isMobile === false) {
      scope._brMobileFill = false;
    } else if (options.mobileFill === true && $brMobile.isMobile === true) {
      scope._brMobileFill = true;
    } else if (dialogMobileFill === true && $brMobile.isMobile === true) {
      scope._brMobileFill = true;
    }
    if (options.allowBack === true) { scope.allowBack = true; }

    return scope;
  }


  function setupController(options, scope, element) {
    if (options.controller === undefined) { return; }

    var locals = options.locals || {};
    locals.$scope = scope;

    var invokeCtrl = $controller(options.controller, options.locals, true);
    var ctrl = invokeCtrl();

    element.data('$ngControllerController', ctrl);
    element.children().data('$ngControllerController', ctrl);
    if (options.controllerAs !== undefined) {
      scope[options.controllerAs] = ctrl;
    }
  }


  function getTemplate(options) {
    var templateOpen = '<br-dialog class="hide" ng-class="_brLock ? \'br-lock\' : \'\'">';
    var templateClose = '</br-dialog>';

    if(options.templateUrl) {
      templateOpen += '<ng-include src="\'' + options.templateUrl + '\'"></ng-include>';
    } else if (options.template) {
      templateOpen += options.template;
    } else {
      templateOpen += '<div class="br-dialog-label">' + options.message + '</div>';

      var continueLabel = DEFAULT_CONTINUE_LABLE;
      var cancelLable = DEFAULT_CANCEL_LABEL;

      if(typeof options.controls === 'object') {
        continueLabel = options.controls.continueLabel;
        cancelLable = options.controls.cancelLabel;
      }

      templateOpen += '<div layout="row" layout-align="center" layout-full>';
      templateOpen += '<br-button class="br-primary" ng-click="$continue()">' + continueLabel + '</br-button>';
      templateOpen += '<br-button class="br-warn" ng-click="$cancel()">' + cancelLable + '</br-button>';
      templateOpen += '</div>';
    }

    return templateOpen + templateClose;
  }


  function centerPointFor(targetRect) {
    return targetRect ? {
      x: Math.round(targetRect.left + (targetRect.width / 2)),
      y: Math.round(targetRect.top + (targetRect.height / 2))
    } : { x : 0, y : 0 };
  }

  function addDialogStyle(dialogBox, options) {
    var container = angular.element(dialogBox[0].querySelector('.br-dialog-content'));

    if (options.width !== undefined) {
      container.css('width', $brUtil.valueToCss(options.width));
    }

    if (options.maxWidth !== undefined) {
      container.css('max-width', $brUtil.valueToCss(options.maxWidth));
    }
  }





  /**
   * @ngdoc method
   * @name $brDialog#alert
   * @function
   *
   * @description
   * creates a alert dialog popup, a queue is created if more than one are added
   *
   * @param {string=} message - Ypu can pass just a string message to this function
   * @param {object=} options - On object of otpions you can pass in
   * @param {string=} options.message - contains text that will be displayed
   * @param {boolean=} options.mobileFill - this will turn the popup into a full page element if it is on a mobile touch device
   */
  function alert (options) {
    // if none of these exist then a dialog box cannot be created
    if (typeof options === 'object' && options.message === undefined) {
      console.log('$brDialog.alert() : Is missing required paramter message');
      return;
    } else if (typeof options === 'string' && options === '') {
      console.log('$brDialog.alert() : Is missing message');
      return;
    }

    if (typeof options === 'string') {
      if(alertBox) {
        alertQueue.push([options, {}]);
        return;
      }
      displayAlert(options, {});
    } else {
      if(alertBox) {
        alertQueue.push([options.message, options]);
        return;
      }
      displayAlert(options.message, options);
    }
  }



  /**
   * @ngdoc method
   * @name $brDialog#lock
   * @function
   *
   * @description
   * turns off all click events for the curretn dialog popup
   */
  function lock() {
    if (dialogBox !== undefined && typeof dialogBox.scope === 'function') {
      dialogBox.scope().lock();
    }
  }


  /**
   * @ngdoc method
   * @name $brDialog#unlock
   * @function
   *
   * @description
   * turns on all click events for the current dialog popup
   */
  function unlock() {
    if (dialogBox !== undefined && typeof dialogBox.scope === 'function') {
      dialogBox.scope().unlock();
    }
  }


  /**
   * @ngdoc method
   * @name $brDialog#remove
   * @function
   *
   * @description
   * removes the current dialog popup
   *
   * @returns {promise} - A promise that returns post animation
   */
  function remove() {
    if (dialogBox === undefined || typeof dialogBox.scope !== 'function') { return; }

    // document.activeElement.blur();
    angular.element(dialogBox[0].querySelector('.br-dialog-content')).addClass('br-leave');
    angular.element(dialogBox[0].querySelector('.br-dialog-container')).css('opacity', '0');

    return $q(function(resolve, reject) {
      if(!dialogBox) { reject('No Dialog Box'); }

      $timeout(function (){
        dialogBox.scope().$destroy();
        dialogBox.remove();
        dialogBox = undefined;
        resolve();
      }, 300);
    });
  }





  // --- Private -----------------


  function nextAlert(){
    var next = alertQueue.shift();
    displayAlert(next[0], next[1]);
  }


  function displayAlert(message, options) {
    var scope = $rootScope.$new();

    // check for mobile fill
    if (options.mobileFill === false || $brMobile.isMobile === false) {
      scope._brMobileFill = false;
    } else if (options.mobileFill === true && $brMobile.isMobile === true) {
      scope._brMobileFill = true;
    } else if (dialogMobileFill === true && $brMobile.isMobile === true) {
      scope._brMobileFill = true;
    }

    var template = '<br-dialog class="hide br-alert">'+
      '<div class="br-dialog-label">' + message + '</div>'+
    '</br-dialog>';

    alertBox = $compile(template)(scope);
    body.append(alertBox);

    angular.element(alertBox[0].querySelector('.br-dialog-container')).css('opacity', '1').css($brUtil.toCss({transform: 'translateY(' + $window.scrollY + 'px)'}));

    $animateCss(angular.element(alertBox[0].querySelector('.br-dialog-content')), {
      addClass: 'br-active',
      from: $brUtil.toCss({transform: 'translate(-50%, -50%) scale(0.4)'}),
      to: $brUtil.toCss({transform: 'translate(-50%, -50%) scale(1)'})
    })
    .start()
    .then(function () {
      scope.init(true);
    });

    $timeout(function(){
      removeAlert();
    }, 3500);
  }


  // remove alert box and call the next alert if one exists
  function removeAlert(){
    if(!alertBox) return;

    document.activeElement.blur();
    alertBox.scope()._brShow = false;
    alertBox.scope()._brEvent = false;

    $timeout(function (){
      alertBox.scope().$destroy();
      alertBox.remove();
      alertBox = undefined;

      if(alertQueue.length > 0) nextAlert();
    }, 220);
  }

}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name dragOrder
 * @description
 * dragOrder
 */

angular
  .module('brMaterial')
  .directive('brDragOrder', brDragOrderDirective);



/**
 * @ngdoc directive
 * @name brDragOrder
 * @module dragOrder
 *
 * @param {function=} br-drag-order - Pass in an optinal function the will get called when the order changes
 * @param {boolean=} br-drag-order-allowed - Set if the drag ordering can be done
 *
 * @description
 * The `[br-drag-order]` this will use the ng-repeat and its ordinal filter to allow you to click-drag reorder elements
 * This will set a new ordinal value between the two items you dragged between.
 * decimals are used for this process.
 * The drag reorder is initiated after holding the element for 500 ms
 *
 * @usage
 * ### Controller
 * <hljs lang="js">
 * angular.controller('MyCtrl', function($scope) {
 *   $scope.users = [
 *     { ordinal: 1, name: 'Bob' },
 *     { ordinal: 2, name: 'Alice' },
 *     { ordinal: 3, name: 'Steve' }
 *   ];
 * });
 * </hljs>
 *
 * ### HTML
 * `br-drag-reorder` will use the propery defined by the `orderBy` filter
 * <hljs lang="html">
 *  <div ng-repeat="item in list | orderBy:'item.ordinal'" br-drag-order="">
 *    {{item}}
 *  </div>
 * </hljs>
 */
brDragOrderDirective.$inject = ['$brGesture', '$brConstant', '$brDialog', '$parse'];
function brDragOrderDirective($brGesture, $brConstant, $brDialog, $parse) {
  var directive = {
    restrict: 'A',
    require: '?brItem',
    link: link,
    controller: ['$scope', controller]
  };
  return directive;



  function controller($scope) {
    /*jshint validthis: true */
    var vm = this;

    vm.triggerHold = function () {
      $scope.triggerHold();
    };
  }





  function link(scope, element, attr, brItemController) {
    if(attr.ngRepeat === undefined) {
      throw new Error('[br-drag-order]. You can only apply to an element with ngRepeat');
    }

    var parts = attr.ngRepeat.match(/^\s*(\w+)\sin\s+([\w\[\].]+)\s\|?\s?orderBy(?::\s?')\s?(\w+)/i);


    // TODO : Mabye Allow for orderby field specification????
    // for now orderBy is required
    if(!parts || parts[2] === undefined) {
      throw new Error('[br-drag-order]. your ngRepeat can only contain the "orderBy" filter');
    }



    scope.triggerHold = triggerHold;



    var itemKey = parts[1];
    var orderBy = parts[3];
    var parent = element.parent();
    var offsetParent = angular.element(element[0].offsetParent);
    var parentBounds;
    var clone;
    var hoverElement;
    var startX = 0;
    var startY = 0;
    var isDown = false;
    var isOnHold = false;
    var isDragging = false;



    // --- public mothod ---
    function triggerHold() {
      isDown = true;
      // prevent text selection
      angular.element(document.body).addClass('br-no-text-select');

      // prevent draggin for br item controls
      if (brItemController !== undefined) { brItemController.blockDrag(); }

      startDrag();
    }



    // --- Events -------
    // ------------------

    $brGesture.register(element, 'hold');
    $brGesture.register(element, 'press');
    $brGesture.register(element, 'dragVertical');
    element
      .on('$br.hold', onHold)
      .on('$br.pressdown', onPressDown)
      .on('$br.pressup', onPressUp)
      .on('$br.dragstart', dragStart)
      .on('$br.drag', onDrag)
      .on('$br.dragend', dragEnd);




    // set hold state and add roation animation
    function onHold(e) {
      if(!isDown) return;

      e.preventDefault();
			e.stopPropagation();

      // prevent text selection
      angular.element(document.body).addClass('br-no-text-select');

      // prevent draggin for br item controls
      if (brItemController !== undefined) { brItemController.blockDrag(); }

      startDrag();
    }

    function startDrag() {
			isOnHold = true;

      // clear text selection
      document.getSelection().removeAllRanges();

      element.addClass('br-drag-order-hold');
		}


    // set down state and disable user selection(text)
    function onPressDown(e) {
      isDown = true;
    }

    // reset hold and down state
    function onPressUp(e) {
      isOnHold = false;
      isDown = false;

      clearDrag();
    }




    // set drag state. create clone element. find all sister elements and set their center points
    // set initianl clone location. add css for new display states
    function dragStart(e) {
      if (!isOnHold) return;

      e.preventDefault();
      e.stopPropagation();
      e.srcEvent.preventDefault();
      e.srcEvent.stopPropagation();

      isDragging = true;

      parentBounds = parent[0].getBoundingClientRect();
      // expand bounds for inbound detection
      parentBounds = {top: parentBounds.top - 20, bottom: parentBounds.bottom + 20};

      setupSisters();
      clone = angular.element('<div></div>');
      clone.css('width', element[0].getBoundingClientRect().width + 'px');
      clone.css('height', element[0].getBoundingClientRect().height + 'px');
      clone.css('overflow', 'hidden');

      clone.append(element.clone());
      // clone = element.clone();

      clone.removeClass('br-drag-order-hold');
      clone.addClass('br-drag-order-clone');

      // TODO fix position if the parent is not also offsetParent
      // offsetParent.prepend(clone);
      parent.prepend(clone);

      element.addClass('br-drag-order-dragging');
      element.removeClass('br-drag-order-hold');
      setInitalPoint();
    }



    function onDrag(e) {
      if (!isDragging) return;

      var x = startX + e.pointer.distanceX;
      var y = startY + e.pointer.distanceY;

      clone.css($brConstant.CSS.TRANSFORM, 'translate3d(' + x + 'px,' + y + 'px,0) rotate(1.25deg)');

      // TODO fix hover position when screen is scrolled
      setHoverElement(e.pointer.x, e.pointer.y);
    }

    function dragEnd(e) {
      if(!isDragging) return;

      isDragging = false;
      clearDrag();

      setNewOrder();
    }



    // set offset postion and set clnes position
    function setInitalPoint() {
      startX = element[0].offsetLeft - clone[0].offsetLeft;
      startY = element[0].offsetTop - clone[0].offsetTop;
      clone.css($brConstant.CSS.TRANSFORM, 'translate3d(' + startX + 'px,' + startY + 'px,0) rotate(1.25deg)');
    }







    // --- Helpers ------
    // ------------------

    var sisters = [];
    var sistersBounds = [];
    var prepend;

    // get current order value for post and pre elements then calculate a new order value for inbetween them
    // set this number on the scopes item
    function setNewOrder() {
      if (angular.isDefined(attr.brDragOrderAllowed) && $parse(attr.brDragOrderAllowed)(scope) === false) {
        $brDialog.alert('You do not have permission to re-order');
        return;
      }

      if (hoverElement === undefined) { return; }

      var preOrder;
      var postOrder;
      var newOrder;

      // get pre order value or set it to 0
      if (sisters.indexOf(hoverElement[0]) > 0) {
        preOrder = angular.element(sisters[sisters.indexOf(hoverElement[0])-1]).scope()[itemKey][orderBy];
      } else {
        preOrder = 0;
      }

      // get post order value
      postOrder = hoverElement.scope()[itemKey][orderBy];

      // calculate new order value
      if (prepend) {
        if (postOrder - preOrder > 1) {
          newOrder = preOrder + 1;
        } else {
          newOrder = preOrder + ((postOrder - preOrder) / 2);
        }
      } else {
        newOrder = postOrder + 1;
      }

      // set new value
      // force a scope apply
      setTimeout(function() {
        scope.$apply(function () {
          scope[itemKey][orderBy] = newOrder;

          if (attr.brDragOrder !== '') {
            $parse(attr.brDragOrder.replace('()', '('+itemKey+')'))(scope);
          }
        });
      }, 0);

      hoverElement = undefined;
    }




    // fins sister drag elements and create an array with ther vertical centers
    function setupSisters() {
      var rect;

      sisters = getSisters();

      sistersBounds = [];

      var i = 0;
      var len = sisters.length;

      for(i; i < len; ++i) {
        rect = sisters[i].getBoundingClientRect();
        sistersBounds.push(rect.top + (rect.height / 2));
      }
    }


    // Return a list of neighboring elements with the brDragOrder attribute
    function getSisters() {
      var i = 0;
      var children = parent.children();
      var len = children.length;
      var list = [];

      for (i; i < len; ++i) {
        if (children[i].getAttribute('br-drag-order') !== null) {
          list.push(children[i]);
        }
      }

      return list;
    }



    // remove all css for dragging and clear clone
    function clearDrag() {
      document.getSelection().removeAllRanges();

      // prevent text selection
      angular.element(document.body).removeClass('br-no-text-select');

      // prevent draggin for br item controls
      if (brItemController !== undefined) { brItemController.unblockDrag(); }

      element.removeClass('br-drag-order-hold');
      element.removeClass('br-drag-order-dragging');

      if (hoverElement) {
        hoverElement.removeClass('br-drag-order-select-top');
        hoverElement.removeClass('br-drag-order-select-bottom');
      }

      if(clone) {
        clone.remove();
        clone = undefined;
      }
    }


    // set hove elemente based on sisters vertical centers and mouse position
    function setHoverElement(x, y) {
      var i = 0;
      var len = sistersBounds.length;

      if (hoverElement) {
        hoverElement.removeClass('br-drag-order-select-top');
        hoverElement.removeClass('br-drag-order-select-bottom');
        hoverElement = undefined;
      }

      // check if pointer is in bounds. if not clear hoverElement
      if (y < parentBounds.top || y > parentBounds.bottom) {
        hoverElement = undefined;
        return;
      }

      // check if pointer is bellow the last elements center line
      prepend = false;
      if (y > sistersBounds[sistersBounds.length - 1]) {
        // hoverItem = sistersBounds.length - 1;
        hoverElement = angular.element(sisters[sistersBounds.length - 1]);
        hoverElement.addClass('br-drag-order-select-bottom');
        return;
      }

      // check for which elements center line the pointer is above
      for(i; i < len; ++i) {
        if (y < sistersBounds[i] && sisters[i] != element[0]) {
          prepend = true;
          hoverElement = angular.element(sisters[i]);
          hoverElement.addClass('br-drag-order-select-top');
          return;
        }
      }

      hoverElement = undefined;
    }

  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .directive('brDragIcon', brDragIconDirective);


/**
 * @ngdoc directive
 * @name brDragIcon
 * @module dragOrder
 *
 * @description
 * The `<br-drag-icon>` is an element that goes in the repeated element, that will instantly initiate drag reorder on click and hold
 *
 * @usage
 * ### Controller
 * <hljs lang="js">
 * angular.controller('MyCtrl', function($scope) {
 *   $scope.users = [
 *     { ordinal: 1, name: 'Bob' },
 *     { ordinal: 2, name: 'Alice' },
 *     { ordinal: 3, name: 'Steve' }
 *   ];
 * });
 * </hljs>
 *
 * ### HTML
 * Append `<br-drag-icon>` to an element with `[br-drag-order]` to have a place to click
 * that will instantaneously trigger the dragging
 * <hljs lang="html">
 *  <div ng-repeat="item in list | orderBy:'item.ordinal'" br-drag-order="">
 *    <br-drag-icon></br-drag-icon>
 *    {{item}}
 *  </div>
 * </hljs>
 */
brDragIconDirective.$inject = ['$brGesture'];
function brDragIconDirective($brGesture) {
  var directive = {
    restrict: 'E',
    require: '^brDragOrder',
    replace: true,
    template: '<br-icon br-color="#999" class="br-drag-icon" br-font-icon="swap_vert" br-size="32"></br-icon>',
    link: link
  };
  return directive;


  function link(scope, element, attrs, ctrl) {
    $brGesture.register(element, 'press');
    element
      .on('$br.pressdown', onPressDown);

    function onPressDown (e) {
      ctrl.triggerHold();
    }
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name expander
 */
angular
  .module('brMaterial')
  .directive('brExpander', expanderDirective)
  .directive('brExpanderHeader', expanderHeaderDirective)
  .directive('brExpanderContent', expanderContentDirective);




/**
  * @ngdoc directive
  * @name brExpander
  * @module expander
  *
  * @description
  * The `<br-expander>` is a container that opens and closes
  *
  * @param {boolean=} br-width - Set expander width
  * @param {boolean=} br-height - Set epander height, this will set scrolling in y
  * @param {boolean=} br-open - Bound value for opening and closing
  * @param {string=} br-component-id - Name that can be used with the `$brExpander` service
  *
  * @usage
  * You can controll the expander in 3 ways.
  * - The `<br-expander-header>` element will automatically expand when clicked
  * - The `[br-open]` attribute will listen for changes
  * - The `$brExpander` service has functions to control the expander based on its `[br-component-id]` name
  *
  * <hljs lang="js">
  *   angular.controller('MyCtrl', function ($scope, $brExpander) {
  *     $scope.isOpen = false;
  *     $brExpander('expanderComponentId').open();
  *     $brExpander('expanderComponentId').close();
  *     $brExpander('expanderComponentId').toggle();
  *     $brExpander('expanderComponentId').isOpen();
  *   });
  * </hljs>
  *
  * <hljs lang="html">
  *    <br-expander br-open="isOpen" br-component-id="expanderComponentId">
  *      <br-expander-header>Title</br-expander-header>
  *
  *      <br-expander-content>
  *         <!-- content foes here -->
  *      </br-expander-content>
  *    </br-expander>
  * </hljs>
  */
expanderDirective.$inject = ['$brTheme', '$parse'];
function expanderDirective ($brTheme, $parse) {
  var directive = {
    restrict: 'E',
    require: 'brExpander',
    compile: compile,
    controller: ['$element', '$attrs', '$brComponentRegistry', controller]
  };
  return directive;


  function compile(tElement, tAttrs) {
    tElement.addClass('br-expander');

    var width = tAttrs.brWidth || tAttrs.width;
    if (width !== undefined) {
      tElement.css('width', width.replace('px', '') + 'px');
    }

    if (tAttrs.brHide === undefined) {
      angular.element(tElement[0].querySelector('.br-expander-hide')).attr('ng-if', '$brOpen');
    }

    return postLink;
  }

  function postLink(scope, element, attr, ctrl) {
    $brTheme(element);

    // varefy the correct child elements exist
    var headerElement = element[0].querySelector('br-expander-header');
    var contentElement = element[0].querySelector('br-expander-content');
    if (contentElement === null) {
      throw new Error('<br-expander> : Should contain <br-expander-content>');
    }

    contentElement = angular.element(contentElement);

    if (attr.brOpen !== undefined) {
      var openGetter = $parse(attr.brOpen);
      scope.$watch(function () { return openGetter(scope); }, function (open) {
        if (open === true) {
          ctrl.open();
        } else {
          ctrl.close();
        }
      });
    }

    ctrl.watchHeight = attr.brWatchHeight !== undefined;
  }


  function controller($element, $attrs, $brComponentRegistry) {
    /* jshint validthis: true */
    var vm = this;

    var _isOpen = false;

    vm.height = $attrs.brHeight || $attrs.height;
    vm.headerHook = headerHook;
    vm.contentHook = contentHook;

    vm.open = open;
    vm.close = close;
    vm.toggle = headerHook;
    vm.isOpen = isOpen;


    var destroy = $brComponentRegistry.register(vm, $attrs.brComponentId);
    $element.on('$destroy', destroy);

    function headerHook() {
      _isOpen = !_isOpen;
      setState();
    }

    function contentHook(func) {
      if (typeof func !== 'function') { return; }
      vm.contentHook = func;
    }

    function open() {
      _isOpen = true;
      setState();
    }

    function close() {
      _isOpen = false;
      setState();
    }

    function isOpen() {
      return _isOpen;
    }

    function setState() {
      $element.toggleClass('br-open', _isOpen);
      vm.contentHook(_isOpen);
    }
  }
}





function expanderHeaderDirective() {
  var directive = {
    restrict: 'E',
    require: '^?brExpander',
    link: link
  };
  return directive;


  function link (scope, element, attr, ctrl) {
    element.append(angular.element('<div class="br-expander-icon-container"><div class="br-expander-icon"></div></div>'));
    element.on('click', function () {
      scope.$apply(function () {
        ctrl.headerHook();
      });
    });
  }
}




expanderContentDirective.$inject = ['$timeout', '$document'];
function expanderContentDirective($timeout, $document) {
  var directive = {
    restrict: 'E',
    require: '^?brExpander',
    template:
      '<div class="br-expander-hide" ng-transclude>'+
      '</div>',
    transclude: true,
    link: link
  };
  return directive;


  function link (scope, element, attr, ctrl) {
    var killWatch;
    var height = ctrl.height === undefined ? undefined : ctrl.height.replace('px', '') + 'px';

    element.css('height', '0');


    ctrl.contentHook(function (open) {
      scope.$brOpen = open;

      $timeout(function () {
        if (open === true) {
          expandContent();
        } else {
          contractContent();
        }
      }, 0);
    });



    function expandContent() {
      element.css('height', getHeight());

      if (ctrl.watchHeight === true) {
        $timeout(function () {
          initHeightWatcher();
        }, 560);
      }
    }


    function getHeight() {
      if (height) {
        element.css('overflow', 'auto');
        return height;
      } else {
        return element[0].scrollHeight + 'px';
      }
    }


    function contractContent() {
      if (typeof killWatch === 'function') { killWatch(); }
      element.css('height', '0');
    }


    function initHeightWatcher() {
      killWatch = scope.$watch(function () { return element[0].innerHeight; }, function (data) {
        console.log(data);
        element.css('height', data + 'px');
      });
    }
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .factory('$brExpander', brExpanderService);



/**
  * @ngdoc service
  * @name $brExapnder
  * @module expander
  *
  * @description
  * `$brExapnder` controls the `<br-expander>` element
  *
  * @usage
  * The `$brExpander` service has functions to control the expander based on its `[br-component-id]` name
  *
  * <hljs lang="js">
  *   angular.controller('MyCtrl', function ($scope, $brExpander) {
  *     $scope.isOpen = false;
  *     $brExpander('expanderComponentId').open();
  *     $brExpander('expanderComponentId').close();
  *     $brExpander('expanderComponentId').toggle();
  *     $brExpander('expanderComponentId').isOpen();
  *   });
  * </hljs>
  */
brExpanderService.$inject = ['$brComponentRegistry', '$q'];
function brExpanderService($brComponentRegistry, $q) {
  return function (handle) {
    var errorMsg = "Expander '" + handle + "' is not available!";
    var instance = $brComponentRegistry.get(handle);

    if(!instance) {
      $brComponentRegistry.notFoundError(handle);
    }

    var service = {
      isOpen: isOpen,
      toggle: toggle,
      open: open,
      close: close,
      then: then
    };
    return service;


    /**
     * @name isOpen
     * @function
     *
     * @description
     * Returns boolean telling if the side content is currently opened
     *
     * @return {boolean}
     *
     */
    function isOpen() {
      return instance && instance.isOpen();
    }


    /**
     * @name toggle
     * @function
     *
     * @description
     * Toggles open closed state. This will only close if the locked open state is false
     *
     */
    function toggle() {
      return instance ? instance.toggle() : $q.reject(errorMsg);
    }



    /**
     * @name open
     * @function
     *
     * @description
     * Toggles content open state
     *
     */
    function open() {
      return instance ? instance.open() : $q.reject(errorMsg);
    }


    /**
     * @name close
     * @function
     *
     * @description
     * Toggles closed state. This will only close if the locked open state is false
     *
     */
    function close() {
      return instance ? instance.close() : $q.reject(errorMsg);
    }


    /**
     * @name then
     * @function
     *
     * @description
     * Function called post operation
     *
     */
    function then(callbackFn) {
      var promise = instance ? $q.when(instance) : waitForInstance();
      return promise.then( callbackFn || angular.noop );
    }




    function waitForInstance() {
      return $brComponentRegistry
        .when(handle)
        .then(function (it) {
          instance = it;
          return it;
        });
    }

  };
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .directive('brCollapsedContent', collapsedContentDirective);


collapsedContentDirective.$injeect = ['$timeout', '$animateCss', '$brUtil'];
function collapsedContentDirective($timeout, $animateCss, $brUtil) {
  var directive = {
    restrict: 'E',
    transclude: true,
    template: '<div class="br-collapsed-content" ng-transclude></div>',
    require: '^brExpansionCard',
    link: link
  };
  return directive;

  function link(scope, element, attrs, ecCtrl) {
    var container = angular.element(element[0].querySelector('.br-collapsed-content'));
    var color = attrs.brColor !== undefined ? '#' + attrs.brColor.replace('#', '') : undefined;
    scope.$expand = ecCtrl.expand;
    scope.$card = ecCtrl.$card;
    ecCtrl.collaspedCtrl = {
      show: show,
      hide: hide,
      flash: flash
    };

    element.on('click', function () {
      ecCtrl.expand();
    });


    function hide() {
      container.removeClass('br-show');
      container.addClass('ng-hide');
    }

    function show() {
      var fromProps = $brUtil.toCss({transform: 'translate3d(0,4px,0)'});
      fromProps.opacity = 0;
      var toProps = $brUtil.toCss({transform: 'translate3d(0,0,0)'});
      toProps.opacity = 1;

      if (color !== undefined) {
        fromProps.background = '#FFFFFF';
        toProps.background = color;
      }

      container.removeClass('ng-hide');
      container.addClass('br-show');
      $animateCss(container, {
        from: fromProps,
        to: toProps
      })
      .start();
    }

    function flash() {
      $animateCss(container, {
        addClass: 'br-flash',
        duration: 1.2
      })
      .start()
      .then(function () {
        container.removeClass('br-flash');
      });
    }
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .directive('brExpandedContent', expandedContentDirective);


expandedContentDirective.$inject = ['$animateCss', '$brUtil', '$timeout'];
function expandedContentDirective($animateCss, $brUtil, $timeout) {
  var directive = {
    restrict: 'E',
    transclude: true,
    template: '<div class="br-expanded-content" ng-transclude></div>',
    require: '^brExpansionCard',
    link: link
  };
  return directive;

  function link(scope, element, attrs, ecCtrl) {
    var container = angular.element(element[0].querySelector('.br-expanded-content'));

    scope.$collapse = ecCtrl.collapse;
    scope.$card = ecCtrl.$card;
    ecCtrl.expandedCtrl = {
      show: show,
      hide: hide
    };
    disableSubHeaders();

    function show() {
      enableSubHeaders();

      container.addClass('br-show');

      // minus 24 to compensate for the margin and padding
      var height = container[0].scrollHeight - 24;
      // var fromProps = $brUtil.toCss({height: 80, transform: 'translate3d(0,12px,0)'});
      var fromProps = $brUtil.toCss({height: 80, transform: 'translate3d(0,0,0)'});
      fromProps.opacity = 0;
      fromProps.marginLeft = '16px';
      fromProps.marginRight = '16px';

      // var toProps = $brUtil.toCss({height: height, transform: 'translate3d(0,16px,0)'});
      var toProps = $brUtil.toCss({height: height, transform: 'translate3d(0,-2px,0)'});
      fromProps.opacity = 1;
      toProps.marginLeft = '4px';
      toProps.marginRight = '4px';

      container.addClass('br-overflow');
      $animateCss(container, {
        from: fromProps,
        to: toProps
      })
      .start()
      .then(function () {
        container.removeClass('br-overflow');
        container.css('height', 'auto');
      });
    }

    function hide() {
      disableSubHeaders();

      // minus 24 to compensate for the margin and padding
      var height = container[0].scrollHeight - 24;

      // var fromProps = $brUtil.toCss({height: height, transform: 'translate3d(0,16px,0)'});
      var fromProps = $brUtil.toCss({height: height, transform: 'translate3d(0,2px,0)'});
      fromProps.marginLeft = '4px';
      fromProps.marginRight = '4px';
      fromProps.opacity = 1;

      // var toProps = $brUtil.toCss({height: 80, transform: 'translate3d(0,12px,0)'});
      var toProps = $brUtil.toCss({height: 80, transform: 'translate3d(0,0,0)'});
      toProps.marginLeft = '16px';
      toProps.marginRight = '16px';
      toProps.opacity = 0;

      container.removeClass('br-show');
      container.addClass('br-hide');
      container.addClass('br-overflow');
      $animateCss(container, {
        from: fromProps,
        to: toProps
      })
      .start()
      .then(function () {
        container.removeClass('br-hide');
        container.removeClass('br-overflow');
      });
    }




    function disableSubHeaders() {
      runOnSubHeaders(function (el) {
        el.attr('br-no-sticky', 'true');
      });
    }

    function enableSubHeaders() {
      runOnSubHeaders(function (el) {
        el.removeAttr('br-no-sticky');
      });
    }


    function runOnSubHeaders(func) {
      var i = 0;
      var subheaders = element[0].querySelectorAll('.br-subheader');
      var length = subheaders.length;

      while (i < length) {
        func(angular.element(subheaders[i]));
        i++;
      }
    }
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .directive('brExpansionCard', expansionCardDirective);


expansionCardDirective.$inject = ['$timeout', '$parse', '$brUtil'];
function expansionCardDirective($timeout, $parse, $brUtil) {
  var directive = {
    restrict: 'E',
    require: ['brExpansionCard', '?^brExpansionCardManager'],
    scope: {},
    link: link,
    controller: ['$scope', '$element', '$attrs', '$brComponentRegistry', controller]
  };
  return directive;


  function link(scope, element, attrs, ctrl) {
    var expandGetter;
    var cardController = ctrl[0];
    var mangerController = ctrl[1];
    var id = $brUtil.nextUid();
    cardController.id = id;

    element.attr('br-card-id', id);

    if (mangerController) {
      cardController.mangerController = mangerController;
      // run on next tick so we can see if card was expanded
      $timeout(function () {
        mangerController.addCard(id, cardController.isExpanded, cardController.toggle, element);
      }, 0);
    }

    if (attrs.brExpand !== undefined) {
      expandGetter = $parse(attrs.brExpand);
      cardController.toggle(expandGetter(scope));
      attrs.$observe('br-expand', function () {
        cardController.toggle(expandGetter(scope));
      });
    }

    scope.$on('$destroy', function () {
      cardController.removeAllListeners();
      cardController.destroy();
    });

    cardController.setMinHeight();
  }

  function controller($scope, $element, $attrs, $brComponentRegistry) {
    /* jshint validthis: true */
    var vm = this;

    var listeners = [];


    vm.$card = {
      remove: removeCard,
      on: on,
      off: off,
      postMessage: postMessage,
      expand: expand,
      collapse: collapse,
      flash: flash
    };

    vm.isExpanded = false;
    vm.expand = expand;
    vm.collapse = collapse;
    vm.toggle = toggle;
    vm.setMinHeight = setMinHeight;
    vm.removeAllListeners = removeAllListeners;

    vm.destroy = $brComponentRegistry.register(vm, $attrs.brComponentId);

    vm.expandedCtrl = undefined;
    vm.collaspedCtrl = undefined;

    function expand() {
      vm.isExpanded = true;
      if (vm.mangerController) {
        vm.mangerController.expandCard(vm.id);
      }
      vm.expandedCtrl.show();
      vm.collaspedCtrl.hide();
    }

    function collapse() {
      vm.isExpanded = false;
      vm.expandedCtrl.hide();
      vm.collaspedCtrl.show();
      setMinHeight();
    }

    function toggle(value) {
      if (value === true) {
        expand();
      } else {
        collapse();
      }
    }


    function setMinHeight() {
      // add 1px for spacing
      $element.css('min-height', $element[0].querySelector('.br-collapsed-content').offsetHeight + 1 + 'px');
    }



    function flash() {
      vm.collaspedCtrl.flash();
    }

    function removeCard() {
      if (vm.mangerController) {
        vm.mangerController.removeCard(vm.id);
        return;
      }

      scope.$destroy();
      element.remove();
    }

    function on(eventName, callback) {
      if (vm.mangerController) {
        listeners.push({name: eventName, callback: callback, id: vm.id});
        vm.mangerController.on(eventName, callback, vm.id);
      }
    }

    function off(eventName) {
      if (vm.mangerController) {
        removeListener(eventName);
      }
    }

    function postMessage(eventName, data, bubble) {
      if (vm.mangerController) {
        vm.mangerController.postMessage(eventName, data, bubble);
      }
    }

    function removeListener(eventName) {
      var i = 0;
      var length = listeners.length;

      while (i < length) {
        if (listeners[i].name === eventName) {
          vm.mangerController.off(listeners[i].name, vm.id);
          listeners.splice(i, 1);
          return;
        }

        i++;
      }
    }


    function removeAllListeners() {
      var i = 0;
      var length = listeners.length;

      while (i < length) {
        off(listeners[i].name);
        i++;
      }

      listeners = undefined;
    }
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .factory('$brExpansionCard', exapnsionCardService);




exapnsionCardService.$inject = ['$rootScope', '$compile', '$q', '$controller', '$brComponentRegistry', '$templateCache', '$templateRequest', '$timeout', '$brUtil'];
function exapnsionCardService($rootScope, $compile, $q, $controller, $brComponentRegistry, $templateCache, $templateRequest, $timeout, $brUtil) {
  var handler = function (handle) {
    handle = handle || '';
    var errorMsg = "$brExpansionCard '" + handle + "' is not available!";
    var instance = $brComponentRegistry.get(handle);
    if(!instance) {
      $brComponentRegistry.notFoundError(handle);
    }

    var service = {
      remove: remove,
      expand: expand,
      collapse: collapse,
      then: then,
      on: on,
      off: off
    };
    return service;



    /**
     * @name on
     * @function
     *
     * @description
     * add Listerner
     */
    function on(eventName, callback) {
      return instance && instance.$card.on(eventName, callback);
    }

    /**
     * @name off
     * @function
     *
     * @description
     * remove Listerner
     */
    function off(eventName) {
      return instance && instance.$card.off(eventName);
    }


    /**
     * @name remove
     * @function
     *
     * @description
     * remove card
     */
    function remove() {
      return instance && instance.$card.remove();
    }


    /**
     * @name expand
     * @function
     *
     * @description
     * expand card
     */
    function expand() {
      return instance && instance.$card.expand();
    }


    /**
     * @name collapse
     * @function
     *
     * @description
     * collapse card
     */
    function collapse() {
      return instance && instance.$card.collapse();
    }

    /**
     * @name then
     * @function
     *
     * @description
     * Function called post operation
     */
    function then(callbackFn) {
      // resolve then with $card so the then does not resolve to the controller
      var promise = instance ? $q.when(instance.$card) : waitForInstance();
      return promise.then( callbackFn || angular.noop );
    }



    function waitForInstance() {
      return $brComponentRegistry
        .when(handle)
        .then(function (it) {
          instance = it;
          return it;
        });
    }
  };



  handler.add = add;

  return handler;




  /**
   * @name add
   * @function
   *
   * @description
   * add card to specified parent element
   *
   * @param {element} [options.parent] - parent element to append to
   * @param {brExpansionCardManager} [options.manager] - manger handler
   * @param {string} [options.template] - html string template
   * @param {string} [options.templateUrl] - path to html template
   * @param {object} [options.scope] - scope variables
   * @param {string} [options.controller] - controller
   * @param {string} [options.controllerAs] - controller as name
   */
  function add(options, locals) {
    options = options || {};
    var deferred = $q.defer();

    // if none of these exist then a dialog box cannot be created
    if (!options.template && !options.templateUrl) {
      throw Error('$exapnsionCardService.add() : Is missing required paramters to create. Required One of the following: template, templateUrl');
    }

    if (!options.parent && !options.manager) {
      throw Error('$exapnsionCardService.add() : Must provide a parent element or manager');
    }


    if (locals !== undefined) {
      options.locals = options.locals || {};
      angular.extend(options.locals, locals);
    }

    var scope = $rootScope.$new();
    angular.extend(scope, options.scope);

    getTemplate(options, function (template) {
      var element = angular.element(template);
      if (options.componentId) {

        element.attr('br-component-id', options.componentId);
      }

      // valid correct html exists
      if (element[0].nodeName !== 'BR-EXPANSION-CARD') {
        throw Error('$brExpansionCard.add(): Invalid HTML. Must provide <br-expansion-card>');
      }
      if (element.find('br-expanded-content').length === 0) {
        throw Error('$brExpansionCard.add(): Invalid HTML. Must provide <br-expanded-content>');
      }
      if (element.find('br-collapsed-content').length === 0) {
        throw Error('$brExpansionCard.add(): Invalid HTML. Must provide <br-collapsed-content>');
      }


      var linkFunc = $compile(element);

      if (options.controller) {
        options.locals = options.locals || {};
        options.locals.$scope = scope;
        var invokeCtrl = $controller(options.controller, options.locals, true);
        var ctrl = invokeCtrl();
        element.data('$ngControllerController', ctrl);
        element.children().data('$ngControllerController', ctrl);
        if (options.controllerAs) {
          scope[options.controllerAs] = ctrl;
        }
      }

      // link after the element is added so we can find card manager directive
      angular.element(options.parent).append(element);
      linkFunc(scope);

      var componentId = element.attr('br-component-id');
      if (componentId !== undefined) {
        deferred.resolve(handler(componentId));
      } else {
        deferred.resolve(scope.$card);
      }
    });

    return deferred.promise;
  }


  function getTemplate(options, callback) {
    var template;

    if (options.templateUrl !== undefined) {
      $brUtil.getTemplateFromUrl(options.templateUrl, callback);
    } else {
      callback(options.template);
    }
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .directive('brExpansionCardManager', expansionCardManagerDirective);



function expansionCardManagerDirective() {
  var directive = {
    restrict: 'E',
    controller: ['$scope', '$attrs', '$element', '$brComponentRegistry', '$brExpansionCard', controller]
  };
  return directive;


  function controller($scope, $attrs, $element, $brComponentRegistry, $brExpansionCard) {
    /* jshint validthis: true */
    var vm = this;

    var cards = [];
    var lisetners = [];
    var registry = {};
    var epxandedCard;
    var autoExpand = $attrs.brAutoExpand !== undefined;

    vm.register = register;
    vm.add = add;
    vm.remove = _remove;
    vm.addCard = addCard;
    vm.expandCard = expandCard;
    vm.removeCard = removeCard;
    vm.removeAll = removeAll;

    vm.on = on;
    vm.off = off;
    vm.postMessage = postMessage;




    vm.destroy = $brComponentRegistry.register(vm, $attrs.brComponentId);
    $scope.$on('$destroy', function () {
      if (vm.destroy === 'function') { vm.destroy(); }
    });


    function on(eventName, callback, id) {
      lisetners.push({name: eventName, callback: callback, id: id });
    }

    function off(eventName, id) {
      var i = 0;
      var length = lisetners.length;

      while (i < length) {
        if (lisetners[i].name === eventName && lisetners[i].id === id) {
          lisetners.splice(i, 1);
          return;
        }

        i++;
      }
    }

    function postMessage(eventName, data, bubble) {
      bubble = bubble === false ? false : true;

      var i = lisetners.length - 1;

      while (i >= 0) {
        if (lisetners[i].name === eventName) {
          lisetners[i].callback(data);
          if (bubble === false) {
            return;
          }
        }

        i--;
      }
    }



    function addCard(id, isExpanded, renderFunc, element) {
      cards.push({
        id: id,
        render: renderFunc,
        $element: element
      });

      if (autoExpand === true && isExpanded !== undefined) {
        expandCard(id);
        getCardRenderFunc(id)(true);
      }
    }

    function expandCard(id) {
      if (epxandedCard === id) { return; }

      if (epxandedCard !== undefined) {
        getCardRenderFunc(epxandedCard)(false);

      }
      epxandedCard = id;

      removeSubCards(id);
    }

    function removeCard(id) {
      var index = getCardIndex(id);
      var card = cards.splice(index, 1)[0];
      if (epxandedCard === card.id) {
        epxandedCard = undefined;
      }
      remove(card);
      openLast();
    }

    function openLast() {
      if (cards.length === 0) {
        if (registry.default !== undefined) {
          add(registry.default.componentId);
        }
      } else {
        cards[cards.length-1].render(true);
      }
    }

    function getCardRenderFunc(id) {
      var index = getCardIndex(id);
      if (index === undefined) {
        return angular.noop;
      }
      return cards[getCardIndex(id)].render;
    }

    function getCardIndex(id) {
      var i = 0;
      var length = cards.length;

      while (i < length) {
        if (cards[i].id === id) {
          return i;
        }
        i += 1;
      }
    }

    function removeSubCards(id) {
      var card;
      var start = getCardIndex(id) + 1;
      var end = cards.length;
      if (start >= end) { return; }

      while (end > start) {
        remove(cards.pop());
        end -= 1;
      }
    }


    function remove(card) {
      card.render = undefined;
      card.$element.scope().$destroy();
      card.$element.remove();
      card.$element = undefined;
      card = undefined;
    }


    function removeAll() {
      while (cards.length > 0) {
        remove(cards.pop());
      }
    }




    function register(options) {
      options = options || {};

      // componentId is used to interact with cards
      if (!options.componentId) {
        throw Error('$brExpansionCardManager registry.register() : Is missing required paramters to create. "componeneteId" is required');
      }

      // if none of these exist then a dialog box cannot be created
      if (!options.template && !options.templateUrl) {
        throw Error('$brExpansionCardManager registry.register() : Is missing required paramters to create. Required One of the following: template, templateUrl');
      }

      if (registry[options.componentId] !== undefined) {
        throw Error('$brExpansionCardManager registry.register() : Must provide a unique componentId');
      }

      options.parent = $element;
      if (options.default === true) {
        registry.default = options;
      }
      registry[options.componentId] = options;
    }


    // TODO allow for passing of objects into the scope
    function add(componentId, locals) {
      if (componentId === undefined) {
        throw Error('$brExpansionCardManager registry.add() : Must provide a componentId parameter');
      }

      if (registry[componentId] === undefined) {
        throw Error("$brExpansionCardManager registry '" + componentId + "' is not available!");
      }

      return $brExpansionCard.add(registry[componentId], locals).then();
    }

    function _remove(componentId) {
      if (componentId === undefined) {
        throw Error('$brExpansionCardManager registry.remove() : Must provide a componentId parameter');
      }

      if (registry[componentId] === undefined) {
        throw Error("$brExpansionCardManager registry '" + componentId + "' is not available!");
      }

      $brExpansionCard(componentId).remove();
    }
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .factory('$brExpansionCardManager', expansionCardManagerService);




expansionCardManagerService.$inject = ['$rootScope', '$q', '$brComponentRegistry', '$brExpansionCard'];
function expansionCardManagerService($rootScope, $q, $brComponentRegistry, $brExpansionCard) {
  var registries = {};
  var pick = ['add', 'remove', 'removeAll', 'register'];

  var handler = function (handle, wait) {
    var instance = $brComponentRegistry.get(handle, pick);

    if (handle === undefined) {
      return {
        waitFor: waitForInstance
      };
    } else if(!instance && wait !== true) {
      $brComponentRegistry.notFoundError(handle);
    }

    return !instance && wait ? waitForInstance() : getInstance(instance);


    function waitForInstance(handle) {
      return $brComponentRegistry
        .when(handle, pick)
        .then(function (it) {
          instance = getInstance(it);
          return instance;
        });
    }


    function getInstance(instance) {
      var i = 0;
      var length = pick.length;
      var picked = {};
      while (i < length) {
        picked[pick[i]] = instance[pick[i]];
        i++;
      }
      return picked;
    }
  };


  return handler;
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name file
 */
angular
  .module('brMaterial')
  .directive('brFile', brFileDirective);


/**
 * @ngdoc directive
 * @name brFile
 * @module file
 *
 *
 * @description
 * The `<br-file>` is a button with a model that will set based on a picked file.
 * you can use the styling classes as a button
 *
 * @param {boolean=} br-show-label - show file name next to button
 * @param {string=} br-file-types - a comma deliminated string containg allowd extensions
 * @param {string=} br-file-name - Bound value that returns the filename
 * @param {model=} ng-model - `{@link https://docs.angularjs.org/api/ng/directive/ngModel Angular ngModel}`
 * @param {function=} ng-change - `{@link https://docs.angularjs.org/api/ng/directive/ngChange Angular ngChange}`
 * @param {boolean=} ng-disabled - `{@link https://docs.angularjs.org/api/ng/directive/ngChange Angular ngDisabled}`
 *
 * @usage
 * The `<br-file>` component can be treated the same as `<br-button>`
 *
 * #### Class Names
 * files can have all the main theme classes applied to them
 *  - `br-raised` - Adds backround to button
 *  - `br-primary` - Themes primary color
 *  - `br-accent` - Themes accent color
 *  - `br-warn` - Themes warn color
 *  - `br-circle` - Makes button a circle
 *  - `br-small` - Makes button a smaller circle
 *  - `br-fill` - Makes button stretch to the full width of its container
 *  - `br-shadow` - Add drop shadow to button
 *  - `br-no-radius` - Remove border radius
 *  - `br-no-padding` - Remove padding
 *  - `br-no-margin` - Remove margin
 *
 * <hljs lang="js">
 *   angular.controller('MyCtrl', function ($scope) {
 *     $scope.fileName = undefined;
 *     $scope.fileName = file;
 *     $scope.onFileSelect = function () {
 *      // file selected
 *     });
 *   });
 * </hljs>
 *
 * <hljs lang="html">
 * <br-file ng-model="file" ng-change="onFileSelect" br-file-types=".jpg,.png,.gif" br-file-name="fileName">
 *    Upload File
 *  </br-file>
 * </hljs>
 */
brFileDirective.$inject = ['$brUtil'];
function brFileDirective ($brUtil) {
  var directive = {
    restrict: 'E',
    require: '?ngModel',
    transclude: true,
    scope: {
      brFileName: '=',
      brShowLabel: '=',
      brFileTypes: '@',
      ngDisabled: '=?'
    },
    template: getTemplate,
    link: link
  };
  return directive;



  function getTemplate (tElement, tAttr) {
    return '<input type="file" class="ng-hide" accept="{{brFileTypes}}"/>'+
          '<br-button type="button" class="' + tAttr.class + '" ng-click="getImage()" ng-disabled="ngDisabled"><div ng-transclude></div></br-button>'+
          '<div flex class="br-file-label" ng-if="brShowLabel">{{fileName}}</div>';
  }


  function link (scope, element, attr, ngModelCtrl) {
    ngModelCtrl = ngModelCtrl || $brUtil.fakeNgModel();
    var input = angular.element(element.children()[0]);
    var theButton = angular.element(element.children()[1]);

    scope.getImage = function () {
      setTimeout(function(){
        // reset value or file change will not trigger after the first time
				input[0].value = '';
        input[0].click();
      }, 0);
    };

    input.on('change', function (event) {
      scope.brFileName = input.val().split('/').pop().split('\\').pop();
      scope.$apply();
      ngModelCtrl.$setViewValue(event.target.files, event && event.type);
    });


    scope.$on('destroy', function () {
      input.off('change');
    });
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name icon
 */

angular
  .module('brMaterial')
  .directive('brIcon', brIconDirective);



/**
  * @ngdoc directive
  * @name brIcon
  * @module icon
  *
  * @description
  * `<br-icon>` will dispaly font icons.
  * You can add more font icons by using icomoon.io and creating a font icon set
  *
  * @param {pixels=} br-size - The size in pixels
  * @param {HEX=} br-color - The color. If you place icons in button they will inherit the buttons color
  * @param {string} br-font-icon - The values you can use
  *
  * - alarm
  * - schedule
  * - account_box
  * - add
  * - add_a_photo
  * - alarm_add
  * - add_alert
  * - add_box
  * - add_circle
  * - add_shopping_cart
  * - alarm_off
  * - announcement
  * - arrow_back
  * - arrow_downward
  * - arrow_forward
  * - arrow_upward
  * - close
  * - poll
  * - flag
  * - attach_file
  * - cloud_upload
  * - battery_alert
  * - battery_charging_full
  * - battery_std
  * - battery_unknown
  * - block
  * - turned_in
  * - phone
  * - cancel
  * - chat
  * - chat_bubble
  * - cloud_download
  * - photo_library
  * - edit
  * - payment
  * - crop
  * - crop_rotate
  * - dehaze
  * - not_interested
  * - done_all
  * - error
  * - event_available
  * - event_busy
  * - event_note
  * - favorite
  * - favorite_border
  * - filter_list
  * - question_answer
  * - forward
  * - help
  * - photo
  * - keyboard_arrow_down
  * - keyboard_arrow_left
  * - keyboard_arrow_right
  * - keyboard_arrow_up
  * - linear_scale
  * - local_bar
  * - local_cafe
  * - restaurant_menu
  * - local_drink
  * - shopping_cart
  * - local_offer
  * - room
  * - more_horiz
  * - more_vert
  * - notifications
  * - notifications_active
  * - notifications_none
  * - notifications_off
  * - notifications_paused
  * - pause
  * - play_arrow
  * - power_settings_new
  * - priority_high
  * - refresh
  * - search
  * - settings
  * - sort_by_alpha
  * - swap_horiz
  * - swap_vert
  * - zoom_in
  * - zoom_out
  * - zoom_out_map
  *
  * @usage
  * <hljs lang="html">
  *   <br-icon br-size="32" br-color="#666" br-font-icon="image"></br-icon>
  * </hljs>
  */
brIconDirective.$inject = ['iconService', '$brTheme'];
function brIconDirective (iconService, $brTheme) {
  var directive = {
    restrict: 'E',
    link: link
  };
  return directive;



  function link (scope, element, attr) {
    $brTheme(element);

    element.addClass('br-icon');

    var size = '22px';

    // font icon
    if (attr.brFontIcon !== undefined && attr.brFontIcon !== '') {
      element.addClass(iconService.getClassName(attr.brFontIcon));

      if (attr.brColor !== undefined && attr.brColor !== '') {
        element.css('color', attr.brColor);
      }

      if (attr.brSize !== undefined && attr.brSize !== '') {
        size = attr.brSize.replace('px','') + 'px';
      }

      element.css('font-size', size);
      element.css('width', size);
      element.css('height', size);
    }


    // TODO : add svg srce
    // move this to service

  //   function loadByURL(url) {
  //    return $http
  //      .get(url, { cache: $templateCache })
  //      .then(function(response) {
  //        return angular.element('<div>').append(response.data).find('svg')[0];
  //      }).catch(announceNotFound);
  //  }
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .factory('iconService', iconService);


iconService.$inject = ['$document'];
function iconService ($document) {
  var service = {
    getClassName: getClassName
  };
  return service;


  function getClassName (name) {
    return 'br-icon-' + name.toLowerCase();
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name input
 */
angular.module('brMaterial')
	.directive('brInput', brInputDirective)
	.directive('label', labelDirective)
	.directive('input', inputTextareaDirective)
	.directive('textarea', inputTextareaDirective)
	.directive('placeholder', placeholderDirective)
	.directive('brX', xDirective);



/**
 * @ngdoc directive
 * @name brInput
 * @module input
 *
 * @description
 * The `<br-input>` container holds inputs, labels, and ngMessages
 *
 * @usage
 * <hljs lang="html">
 * <br-input>
 * 	<label>Input Label</label>
 * 	<input ng-model="theModel" placeholder="The Placeholder" name="thInputName" required />
 * 	<div ng-messages="theFormName.thInputName.$error">
 *    <div ng-message="required">This is required</div>
 * 	</div>
 * </br-input>
 * </hljs>
 */
brInputDirective.$inject = ['$brTheme'];
function brInputDirective ($brTheme) {
  var directive = {
    restrict: 'E',
		link: link,
		controller: ['$scope', '$element', controller]
  };
  return directive;


  function link (scope, element, attr) {
		$brTheme(element);
	}

  function controller ($scope, $element) {
    /*jshint validthis: true */
		var vm = this;

		vm.isDate = function () {
			$element.addClass('br-input-is-date');
		};

		vm.setFocused = function (isFocused) {
			$element.toggleClass('br-input-focused', !!isFocused);
		};

		vm.setHasValue = function (hasValue) {
			$element.toggleClass('br-input-has-value', !!hasValue);
		};

		vm.setInvalid = function (isInvalid) {
			$element.toggleClass('br-input-invalid', !!isInvalid);
		};

    vm.setHasLabel = function () {
      // $element.addClass('br-has-label');
    };

    vm.setHasPlaceholder = function () {
      $element.addClass('br-has-placeholder');
    };

		vm.clearValueHook = function (func) {
			vm.clearValue = func;
		};

		$scope.$watch(function () {
			return vm.label && vm.input;
		}, function(hasLabelAndInput) {
			if(hasLabelAndInput && !vm.label.attr('for')) {
				vm.label.attr('for', vm.input.attr('id'));
			}
		});
	}
}








function labelDirective () {
	var directive = {
		restrict: 'E',
		require: '^?brInput',
		link: link
	};

	return directive;


	function link(scope, element, attrs, containerCtrl){
		if (!containerCtrl) return;

    containerCtrl.setHasLabel();
		containerCtrl.label = element;

		scope.$on('$destroy', function() {
			containerCtrl.label = null;
		});
	}
}





inputTextareaDirective.$inject = ['$brUtil', '$window', '$$rAF'];
function inputTextareaDirective ($brUtil, $window, $$rAF) {
	var directive = {
		restrict: 'E',
		require: ['^?brInput', '?ngModel'],
		link: link
	};

	return directive;


	function link (scope, element, attr, ctrls) {
		var containerCtrl = ctrls[0];
		var ngModelCtrl = ctrls[1] || $brUtil.fakeNgModel();
		var isReadonly = angular.isDefined(attr.readonly);

    if (!containerCtrl) {
      if (attr.brNoStyle === undefined && attr.type !== "checkbox") { element.addClass('br-input br-input-standard'); }
      return;
    }
    containerCtrl.input = element;

		containerCtrl.clearValueHook(function () {
			ngModelCtrl.$setViewValue('');
			ngModelCtrl.$render();
		});

		if (angular.isDefined(attr.type) && (attr.type === 'date' || attr.type === 'datetime' || attr.type === 'datetime-local') ) {
			containerCtrl.isDate();
		}

    var errorsSpacer = angular.element('<div class="br-errors-spacer">');
    element.after(errorsSpacer);

		element.addClass('br-input');
		if (!element.attr('id')) {
			element.attr('id', 'input_' + $brUtil.nextUid());
		}

		if (element[0].tagName.toLowerCase() === 'textarea') {
			setupTextarea();
		}

		function ngModelPipelineCheckValue (arg) {
			containerCtrl.setHasValue(!ngModelCtrl.$isEmpty(arg));
			return arg;
		}

		function inputCheckValue () {
			containerCtrl.setHasValue(element.val().length > 0 || (element[0].validity || {}).badInput);
		}

		var isErrorGetter = containerCtrl.isErrorGetter || function() {
			return ngModelCtrl.$invalid && ngModelCtrl.$touched;
		};
		scope.$watch(isErrorGetter, containerCtrl.setInvalid);

		ngModelCtrl.$parsers.push(ngModelPipelineCheckValue);
		ngModelCtrl.$formatters.push(ngModelPipelineCheckValue);

		element.on('input', inputCheckValue);

		if (!isReadonly) {
			element
				.on('focus', function (ev) {
					containerCtrl.setFocused(true);
				})
				.on('blur', function (ev) {
					containerCtrl.setFocused(false);
					inputCheckValue();
				});
    }


		scope.$on('$destroy', function () {
			containerCtrl.setFocused(false);
			containerCtrl.setHasValue(false);
			containerCtrl.input = null;
		});



		function setupTextarea () {
			var node = element[0];
			var onChangeTextarea = $brUtil.debounce(growTextarea, 200);
			var scrollThrottle = $$rAF.throttle(onScroll);

			function pipelineListener (value) {
				onChangeTextarea();
				return value;
			}

			if(ngModelCtrl) {
				ngModelCtrl.$formatters.push(pipelineListener);
				ngModelCtrl.$viewChangeListeners.push(pipelineListener);
			} else {
				onChangeTextarea();
			}
			element
				.on('keydown input', onChangeTextarea)
				.on('scroll', scrollThrottle);

			angular.element($window)
				.on('resize', onChangeTextarea);

			scope.$on('$destroy', function() {
				angular.element($window).off('resize', onChangeTextarea);
			});

			function growTextarea () {
				node.style.height = "auto";
				var line = node.scrollHeight - node.offsetHeight;
				node.scrollTop = 0;
				var height = node.offsetHeight + (line > 0 ? line : 0);
				node.style.height = height + 'px';
			}

			function onScroll (e) {
				node.scrollTop = 0;
				// for smooth new line adding
				var line = node.scrollHeight - node.offsetHeight;
				var height = node.offsetHeight + line;
				node.style.height = height + 'px';
			}
		}
  }
}



function placeholderDirective () {
	var directive = {
		restrict: 'A',
		require: '^^?brInput',
		priority: 200,
		link: postLink
	};

	return directive;



	function postLink (scope, element, attr, inputContainer) {
		if (!inputContainer) return;
		inputContainer.setHasPlaceholder();
	}
}




/**
* @ngdoc directive
* @name brX
* @module input
*
* @description
* The '[br-x]' directive is an attribute of the `<input>` directive. This will show an x if there is input value. When clicked on it will clear the value
*
* @usage
* <hljs lang="html">
* <br-input>
* 	<input ng-model="theModel" placeholder="Enter Text" br-x />
* </br-input>
* </hljs>
*/
xDirective.$inject = ['$compile'];
function xDirective ($compile) {
	var directive = {
		restrict: 'A',
		require: '^brInput',
		link: link
	};
	return directive;

	function link (scope, element, attr, inputContainer) {
		var xElement = $compile('<div class="br-x" ng-click="_clearXInput();">x</div>')(scope);
		element.parent().append(xElement);

		scope._clearXInput = function () {
			inputContainer.clearValue();
		};
	}
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name infinteRepeat
 */
angular
  .module('brMaterial')
  .directive('brInfiniteRepeat', repeateDirective);

var NUM_EXTRA = 4;

/**
 * @ngdoc directive
 * @name brInfiniteRepeat
 * @module infinteRepeat
 *
 * @description
 * `[br-infiinite-repeat]` is a replacement for ng-repeat that will render only enough items to display in the visible area.
 * The items are then swapped out as you scroll. This should be able to hanlde large amounts of data without creating performace issues
 *
 *
 * @usage
 * <hljs lang="html">
 * <br-infinite-repeat-container>
 * 	<div br-inifinte-repeat="item in list">
 * 		{{item.name}}
 * 	</div>
 * </br-infinite-repeat-container>
 * </hljs>
 */
repeateDirective.$inject = ['$parse', '$document', '$timeout'];
function repeateDirective ($parse, $document, $timeout) {
  var directive = {
    restrict: 'A',
    require: ['^^brInfiniteRepeatContainer'],
    priority: 1000,
    terminal: true,
    transclude: 'element',
    compile: compile
  };
  return directive;




  function compile(tElement, tAttrs) {
    var expression = tAttrs.brInfiniteRepeat;
    var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)\s*$/);
    var repeatName = match[1];
    var repeatListExpression = $parse(match[2]);
    var extraName = tAttrs.brExtraName && $parse(tAttrs.brExtraName);

    return function link(scope, element, attrs, ctrl, transclude) {
      var containerCtrl = ctrl[0];
      var items;
      var itemsLength = 0;
      var itemsHeight = 0;
      var avgSize = 0;

      var itemSize = scope.$eval(attrs.brItemSize) || undefined;
      var parentNode = element[0].parentNode;

      var blocks = {};
      var pooledBlocks = [];

      var inited = false;
      var watching = false;

      var scrollSize = 0;
      var startIndex = 0;
      var endIndex = 0;
      var newStartIndex = 0;
      var newEndIndex = 0;
      var newVisibleEnd = 0;

      var heightRef = [];



      containerCtrl.updateContainer(function () {
        if (watching === false) {
          watching = true;
          scope.$watchCollection(repeatListExpression, virtualRepeatUpdate);
        }

        updateIndexes();

        if (newStartIndex !== startIndex || newEndIndex !== endIndex || containerCtrl.getScrollOffset() > scrollSize) {
          virtualRepeatUpdate(items, items);
        }
      });



      function virtualRepeatUpdate(newItems, oldItems) {
        var i;
        var index;
        var keys;
        var block_;
        var itemsLength_ = newItems && newItems.length || 0;
        var lengthChanged = false;
        var newStartBlocks_ = [];
        var newEndBlocks_ = [];

        // If the number of items shrank, scroll up to the top.
        if (items && itemsLength < items.length && containerCtrl.getScrollOffset() !== 0) {
          items = newItems;
          containerCtrl.resetScroll();
          return;
        }

        if (itemsLength_ !== itemsLength) {
          containerCtrl.updateAutoHeight();
          lengthChanged = true;
          itemsLength = itemsLength_;
        }


        items = newItems;
        if (inited === false) {
          inited = true;
          calculateLength();
        } else if (newItems !== oldItems || lengthChanged === true) {
          updateIndexes();
        }


        if (lengthChanged === true) {
          calculateLength();
          containerCtrl.setScrollTop(0);
        }


        // Detach and pool any blocks that are no longer in the viewport.
        keys = Object.keys(blocks);
        for (i = 0; i < keys.length; ++i) {
          index = parseInt(keys[i], 10);
          if (index < newStartIndex || index >= newEndIndex) {
            poolBlock(index);
          }
        }



        // Collect blocks at the top.
        for (i = newStartIndex; i < newEndIndex && (blocks[i] === null || blocks[i] === undefined); i++) {
          block_ = getBlock(i);
          updateBlock(block_, i);
          newStartBlocks_.push(block_);
        }


        // Update blocks that are already rendered.
        for (; (blocks[i] !== null && blocks[i] !== undefined); i++) {
          updateBlock(blocks[i], i);
        }
        var maxIndex = i - 1;


        // Collect blocks at the end.
        for (; i < newEndIndex; i++) {
          block_ = getBlock(i);
          updateBlock(block_, i);
          newEndBlocks_.push(block_);
        }


        // Attach collected blocks to the document.
        if (newStartBlocks_.length) {
          parentNode.insertBefore(
              domFragmentFromBlocks(newStartBlocks_),
              element[0].nextSibling);
        }
        if (newEndBlocks_.length) {
          parentNode.insertBefore(
              domFragmentFromBlocks(newEndBlocks_),
              blocks[maxIndex] && blocks[maxIndex].element[0].nextSibling);
        }

        startIndex = newStartIndex;
        endIndex = newEndIndex;
      }





      function updateIndexes() {
        checkHeights();

        var containerHeight = containerCtrl.getSize();
        var offset = containerCtrl.getScrollOffset();

        var itemOffsetHeigt = 0;
        var itemOffsetCount = 0;
        var itemExtraHeight = 0;
        var i = 0;

        var itemContainerHeight = 0;
        var containerCount = 0;

        heightRef.every(function (num) {
          // get the heigt and count of items in the offset area
          if (itemOffsetHeigt + num <= offset) {
            itemOffsetHeigt += num;
            itemOffsetCount++;
            return true;
          }


          itemContainerHeight += num;
          containerCount++;
          if (itemContainerHeight >= containerHeight) { return false; }

          return true;
        });


        newStartIndex = Math.max(0, itemOffsetCount);
        newVisibleEnd = newStartIndex + containerCount + NUM_EXTRA;
        newEndIndex = Math.min(itemsLength, newVisibleEnd);
        newStartIndex = Math.max(0, newStartIndex - NUM_EXTRA);

        for (i; i < newStartIndex; ++i) {
          itemExtraHeight += heightRef[i];
        }

        containerCtrl.setTransform(itemExtraHeight);
      }


      function checkHeights() {
        var blockHeight;
        var hightChange = false;

        Object.keys(blocks).forEach(function(blockIndex) {
          var index = parseInt(blockIndex, 10);
          if (index >= newStartIndex || index < newEndIndex) {
            blockHeight = blocks[index].element[0].offsetHeight;
            if (blockHeight !== heightRef[index]) {
              hightChange = true;
              heightRef[index] = blockHeight;
            }
          }
        });

        if (hightChange) {
          itemsHeight = 0;
          // fast way of geting sum from array
          var copy = heightRef.concat();
          while(copy.length) {
            itemsHeight += copy.pop();
          }

          avgSize = Math.round(itemsHeight / heightRef.length);
          containerCtrl.setScrollSize(itemsHeight);
        }
      }




      function domFragmentFromBlocks(blocks) {
        var fragment = $document[0].createDocumentFragment();
        blocks.forEach(function(block) {
          fragment.appendChild(block.element[0]);
        });
        return fragment;
      }


      function calculateLength() {
        var height = 0;
        var index = 0;
        var targetSize = containerCtrl.getSize();
        var itemSize = getBlockSize();

        while(index < itemsLength && height < targetSize) {
          height += itemSize;
          index++;
        }

        heightRef = Array.apply(null, Array(itemsLength)).map(function () { return itemSize; });
        scrollSize = itemsLength * itemSize;

        var itemsHeight = 0;
        // fast way of geting sum from array
        var copy = heightRef.concat();
        while(copy.length) {
          itemsHeight += copy.pop();
        }

        containerCtrl.setScrollSize(itemsHeight);
        startIndex = 0;
        newStartIndex = 0;
        endIndex = index - 1;
        newEndIndex = endIndex;

        $timeout(function () {
					updateIndexes();

	        if (newStartIndex !== startIndex || newEndIndex !== endIndex || containerCtrl.getScrollOffset() > scrollSize) {
	          virtualRepeatUpdate(items, items);
	        }
				}, 0);
      }

      function getBlockSize () {
        var block;
        transclude(function(clone, scope) {
          block = {
            element: clone,
            new: true,
            scope: scope
          };
        });
        if (!block.element[0].parentNode) {
          parentNode.appendChild(block.element[0]);
        }
        var itemSize = block.element[0].offsetHeight || 0;
        parentNode.removeChild(block.element[0]);

        return itemSize;
      }

      function getBlock (index) {
        if (pooledBlocks.length) {
          return pooledBlocks.pop();
        }

        var block;
        transclude(function(clone, scope) {
          block = {
            element: clone,
            new: true,
            scope: scope
          };

          updateScope(scope, index);
          parentNode.appendChild(clone[0]);
        });

        return block;
      }

      function updateBlock(block, index) {
        blocks[index] = block;

        if (index % 2 === 1) { block.element.addClass('br-odd'); }
        else { block.element.removeClass('br-odd'); }

        if (!block.new &&
            (block.scope.$index === index && block.scope[repeatName] === items[index])) {
          return;
        }
        block.new = false;

        // Update and digest the block's scope.
        updateScope(block.scope, index);

        // Perform digest before reattaching the block.
        // Any resulting synchronous dom mutations should be much faster as a result.
        // This might break some directives, but I'm going to try it for now.
        if (!scope.$root.$$phase) {
          block.scope.$digest();
        }
      }


      function updateScope ($scope, index) {
        $scope.$index = index;
        $scope[repeatName] = items && items[index];
        if (extraName) $scope[extraName($scope)] = items[index];
      }

      function poolBlock (index) {
        pooledBlocks.push(blocks[index]);
        parentNode.removeChild(blocks[index].element[0]);
        delete blocks[index];
      }
    };
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .directive('brInfiniteRepeatContainer', brInfiniteRepeatContainer);


var MAX_ELEMENT_SIZE = 1533917;


/**
 * @ngdoc directive
 * @name brInfiniteRepeatContainer
 * @module infinteRepeat
 *
 * @param {number=} br-min-width - Set the minimum width of the inner element, this will allow horizontal scrolling
 *
 * @description
 * `<br-infiinite-repeat-container>` is the wrapping element needed for `[br-ifinite-repeat]`
 *
 * @usage
 * <hljs lang="html">
 * <br-infinite-repeat-container>
 * 	<div br-inifinte-repeat="item in list">
 * 		{{item.name}}
 * 	</div>
 * </br-infinite-repeat-container>
 * </hljs>
 */
function brInfiniteRepeatContainer() {
  var directive = {
    template: getTemplate,
    compile: compile,
    controller: ['$scope', '$element', '$attrs', '$parse', '$$rAF', '$window', '$brUtil', controller]
  };
  return directive;



  function getTemplate(tElement) {
    return '<div class="br-infinite-repeat-scroller">'+
        '<div class="br-infinite-repeat-sizer"></div>'+
        '<div class="br-infinite-repeat-offsetter">'+
          tElement[0].innerHTML+
        '</div>'+
      '</div>';
  }


  function compile(tElement) {
    tElement.addClass('br-infinite-repeat-container');
  }




  function controller($scope, $element, $attrs, $parse, $$rAF, $window, $brUtil) {
    /* jshint validthis: true */
    var vm = this;

    var updateRepeat;

    var scrollSize = 0;
    var scrollOffset = 0;
    var itemsHeight = 0;
    var size = $element[0].clientHeight;
    var offsetSize = parseInt($attrs.brOffsetSize, 10) || 0;

    var scroller = $element[0].querySelector('.br-infinite-repeat-scroller');
    var offsetter = scroller.querySelector('.br-infinite-repeat-offsetter');
    var sizer = scroller.querySelector('.br-infinite-repeat-sizer');
    var isCardChild = $brUtil.getClosest($element, 'br-expanded-content') !== null;

    var isHeight = $element.css('height') || undefined;
    var isAutoHeight = $attrs.brAutoHeight !== undefined;
    var updateAutoHeightThrottle = $$rAF.throttle(updateAutoHeight);


    vm.getSize = getSize;
    vm.getScrollOffset = getScrollOffset;
    vm.setScrollSize = setScrollSize;
    vm.updateContainer = updateContainer;
    vm.resetScroll = resetScroll;
    vm.setScrollTop = setScrollTop;
    vm.setTransform = setTransform;
    vm.updateAutoHeight = checkAutoHeight;


    if ($attrs.brMinWidth !== undefined) {
      angular.element(offsetter).css('min-width', $attrs.brMinWidth.replace('px', '') + 'px');
    }


    updateSize();
    $$rAF(function () {
      var jWindow = angular.element($window);
      jWindow.on('resize', updateSize);
      $scope.$on('$destroy', function() {
        jWindow.off('resize', updateSize);
      });
    });
    $scope.$watch(function () { return $element.css('height'); }, function (data) {
      updateSize();
    });



    if (isHeight === undefined && $attrs.brAutoHeight !== undefined) {
      updateAutoHeightThrottle();

      $scope.$watch(function () { return $element[0].offsetHeight; }, function (data){
        updateAutoHeightThrottle();
      });
    }

    function updateAutoHeight() {
      var rect = $element[0].getBoundingClientRect();
      var innerHeight = $window.innerHeight;
      if (isCardChild === true) {
        innerHeight -= 30;
      }
      $element.css('height', (innerHeight - rect.top) + 'px');
    }

    function checkAutoHeight() {
      if (isAutoHeight) {
        updateAutoHeightThrottle();
      }
    }




    // --- Public ---

    function getSize() {
      return size;
    }

    function getScrollOffset() {
      return scrollOffset;
    }

    function setScrollSize(itemsSize) {
      var size = itemsSize + offsetSize;
      if (scrollSize === size) return;

      sizeScroller(size);
      scrollSize = size;
    }

    function resetScroll() {
      scrollTo(0);
    }

    function scrollTo(position) {
      scroller.scrollTop = position;
      handleScroll();
    }

    function setScrollTop(position) {
      scroller.scrollTop = position;
    }




    // --- Private ----

    function updateSize() {
      if (isAutoHeight === true) {
        updateAutoHeightThrottle();
      }
      size = $element[0].clientHeight;
      if (typeof updateRepeat === 'function') { updateRepeat(); }
    }


    function sizeScroller(size) {
      var dimension = 'height';
      var crossDimension = 'width';

      // Clear any existing dimensions.
      sizer.innerHTML = '';

      if (size < MAX_ELEMENT_SIZE) {
        sizer.style[dimension] = size + 'px';
      } else {
        sizer.style[dimension] = 'auto';
        sizer.style[crossDimension] = 'auto';

        // Divide the total size we have to render into N max-size pieces.
        var numChildren = Math.floor(size / MAX_ELEMENT_SIZE);

        // Element template to clone for each max-size piece.
        var sizerChild = document.createElement('div');
        sizerChild.style[dimension] = MAX_ELEMENT_SIZE + 'px';
        sizerChild.style[crossDimension] = '1px';

        for (var i = 0; i < numChildren; i++) {
          sizer.appendChild(sizerChild.cloneNode(false));
        }

        // Re-use the element template for the remainder.
        sizerChild.style[dimension] = (size - (numChildren * MAX_ELEMENT_SIZE)) + 'px';
        sizer.appendChild(sizerChild);
      }
    }

    function updateContainer(func) {
      updateRepeat = $$rAF.throttle(func);
      angular.element(scroller)
        .on('scroll wheel touchmove touchend', handleScroll);
    }

    function handleScroll () {
      var offset = scroller.scrollTop;
      if (offset === scrollOffset) { return; }

      scrollOffset = offset;
      updateRepeat();
    }

    function setTransform(height) {
      var transform = 'translate3d(0,' + height + 'px,0)';
      offsetter.style.webkitTransform = transform;
      offsetter.style.transform = transform;
    }
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name list
 */
angular
  .module('brMaterial')
  .directive('brList', listDirective)
  .directive('brItem', itemDirective);




/**
 * @ngdoc directive
 * @name brList
 * @module list
 *
 * @description
 * The `<br-list>` contains a list of items
 *
 * @param {model=} ng-model - Used to manage selected items
 * @param {function=} ng-change - `{@link https://docs.angularjs.org/api/ng/directive/ngChange Angular ngChange}`
 * @param {Number=} br-max-select - The maximum number of items allowed to be selected
 * @param {Boolean=} br-toggle-selection - Shows and hides checkboxes
 *
 * @usage
 * <hljs lang="html">
 * <br-list ng-model="theModel" br-max-select="1" br-toggle-select="theBoolValue">
 *  <br-item br-select="item.key" ng-repeat="item in list">
 *    <br-item-content>
 *      <div flex class="br-item-title">{{item.title}}</div>
 *      <div layout="row" layout-fill class="br-item-sub-title">
 *        <div>{{item.info}}</div>
 *        <div>{{item.other}}</div>
 *      </div>
 *    </br-item-content>
 *  </br-item>
 * </br-list>
 * </hljs>
 */
listDirective.$inject = ['$brTheme', '$brUtil', '$brMobile'];
function listDirective ($brTheme, $brUtil, $brMobile) {
  var directive = {
    restrict: 'E',
    require: ['brList', '?ngModel'],
    scope: {
      brToggleSelect: '='
    },
    link: link,
    controller: ['$scope', '$element', controller]
  };
  return directive;


  function link (scope, element, attr, ctrls) {
    $brTheme(element);

    if ($brMobile.isMobile === true) {
      element.addClass('br-touch');
    }

    var brListController = ctrls[0];
    var ngModelCtrl = ctrls[1] || $brUtil.fakeNgModel();
    brListController.init(ngModelCtrl);

    brListController.maxSelection = attr.brMaxSelection || undefined;

    var toggleSelect = attr.brToggleSelect || undefined;
    if (toggleSelect !== undefined) {
      element.addClass('br-hide-select');

      scope.$watch( function() { return scope.brToggleSelect; },
        function(value) {
          if (value === false) {
            brListController.isSelect = false;
            element.addClass('br-hide-select');
          } else {
            brListController.isSelect = true;
            element.removeClass('br-hide-select');
          }
        });
    }
  }


  function controller($scope, $element) {
    /* jshint validthis: true */
    var vm = this;

    vm.itemRenderFuncs = [];
    vm.hasAccent = $element.hasClass('br-accent');
    vm.hasWarn = $element.hasClass('br-warn');
    vm.isSelect = false;

    vm.init = init;
    vm.add = add;
    vm.remove = remove;
    vm.addViewValue = addViewValue;
    vm.removeViewValue = removeViewValue;
    vm.checkValue = checkValue;
    vm.blur = blur;



    function init(ngModelCtrl_) {
      vm.ngModelCtrl = ngModelCtrl_;
      vm.ngModelCtrl.$render = render;
    }

    function render() {
      var viewValue = vm.ngModelCtrl.$viewValue || [];

      vm.itemRenderFuncs.forEach(function (itemRender) {
        itemRender();
      });
    }

    function checkValue(value) {
      var viewValue = vm.ngModelCtrl.$viewValue || [];

      // filter out model if the length is greater that max selection
      if (viewValue.length > vm.maxSelection) {
        viewValue.splice(viewValue.indexOf(value), 1);
        return false;
      }

      if (viewValue.indexOf(value) > -1) {
        return true;
      }

      return false;
    }


    function add(renderFunc) {
      vm.itemRenderFuncs.push(renderFunc);
      renderFunc();
    }

    function remove(renderFunc) {
      var index = vm.itemRenderFuncs.indexOf(renderFunc);
      if (index !== -1) {
        vm.itemRenderFuncs.splice(index, 1);
      }
    }


    function addViewValue(value, eventType) {
      var viewValue = vm.ngModelCtrl.$viewValue || [];

      viewValue.push(value);
      vm.ngModelCtrl.$setViewValue(viewValue, eventType);

      // if selection is greater than max selection, remove the first item
      if (viewValue.length > vm.maxSelection) {
        viewValue.shift();
        render();
      }
    }

    function removeViewValue(value, eventType) {
      var viewValue = vm.ngModelCtrl.$viewValue || [];
      var index = viewValue.indexOf(value);

      if (index > -1) {
        viewValue.splice(index, 1);
        vm.ngModelCtrl.$setViewValue(viewValue, eventType);
      }
    }



    // garentee that only 1 row item is showing controlls at once
    // this is mainly a fix for mobile because the blur event does not alwaysp fire
    var blurFunc;
    function blur (func) {
      if (typeof blurFunc === 'function' && func !== blurFunc) {
        blurFunc();
      }

      blurFunc = func;
    }
  }
}






/**
 * @ngdoc directive
 * @name brItem
 * @module list
 *
 * @description
 * The `<br-item>` is the containing element for list items
 *
 * @param {string=} ng-repeat - `{@link https://docs.angularjs.org/api/ng/directive/ngRepeat Angular ngRepeat}`
 * @param {Number=} br-select - the value to use for selections
 *
 * @usage
 * <hljs lang="html">
 * <br-list ng-model="theModel" br-max-select="1" br-toggle-select="theBoolValue">
 *  <br-item br-select="item.key" ng-repeat="item in list">
 *    <br-item-content>
 *      <div flex class="br-item-title">{{item.title}}</div>
 *      <div layout="row" layout-fill class="br-item-sub-title">
 *        <div>{{item.info}}</div>
 *        <div>{{item.other}}</div>
 *      </div>
 *    </br-item-content>
 *  </br-item>
 * </br-list>
 * </hljs>
 */

 /**
  * @ngdoc directive
  * @name brItemContent
  * @module list
  *
  * @description
  * The `<br-item-content>` is the container for any content you want to display
  *
  * @usage
  * <hljs lang="html">
  * <br-list ng-model="theModel" br-max-select="1" br-toggle-select="theBoolValue">
  *  <br-item br-select="item.key" ng-repeat="item in list">
  *    <br-item-content>
  *      <div flex class="br-item-title">{{item.title}}</div>
  *      <div layout="row" layout-fill class="br-item-sub-title">
  *        <div>{{item.info}}</div>
  *        <div>{{item.other}}</div>
  *      </div>
  *    </br-item-content>
  *  </br-item>
  * </br-list>
  * </hljs>
  */

 /**
  * @ngdoc directive
  * @name brItemControls
  * @module list
  *
  * @description
  * The `<br-item-controls>` is an optional element to contain mobile hidden controls that show on swipe
  *
  * @usage
  * <hljs lang="html">
  * <br-list ng-model="theModel" br-max-select="1" br-toggle-select="theBoolValue">
  *  <br-item br-select="item.key" ng-repeat="item in list">
  *    <br-item-controls>
  *      <br-button class="br-primary br-raised">Edit</br-button>
  *    <br-item-controls>
  *    <br-item-content>
  *      <div flex class="br-item-title">{{item.title}}</div>
  *      <div layout="row" layout-fill class="br-item-sub-title">
  *        <div>{{item.info}}</div>
  *        <div>{{item.other}}</div>
  *      </div>
  *    </br-item-content>
  *  </br-item>
  * </br-list>
  * </hljs>
  */
itemDirective.$inject = ['$compile', '$brGesture', '$$rAF', '$brDialog', '$timeout'];
function itemDirective ($compile, $brGesture, $$rAF, $brDialog, $timeout) {
  var directive = {
    restrict: 'E',
    require: '^?brList',
    compile: compile,
    controller: ['$scope', controller]
  };
  return directive;




  function controller($scope) {
    /* jshint validthis: true */
    var vm = this;

    vm.blockDrag = function () {
      $scope.blockDrag();
    };

    vm.unblockDrag = function () {
      $scope.unblockDrag();
    };
  }


  function compile (tElement, tAttrs) {
    tElement.attr({
      tabIndex: 0,
      role: 'listitem'
    });

    return function link (scope, element, attr, listController) {
      if (listController === null) { return; }
      var selectTemplate;
      var maxWidth;
      var controlsWidth;
      var debouncedDrag;

      var brSelect = attr.brSelect;
      var selectClasses = 'br-primary';
      var controlsElement = element[0].querySelector('br-item-controls');
      var contentElement = element[0].querySelector('br-item-content');
      var selectElement;

      scope.blockDrag = blockDrag;
      scope.unblockDrag = unblockDrag;

      console.log(attr.brShowControlsClick);
      if (attr.brShowControlsClick !== undefined) {
        element.on('click', function () {
          showControls();
        });
      }

      // is br-select attricute is present add a checkbox
      if (brSelect !== undefined) {
        if (listController.hasAccent === true) { selectClasses = 'br-accent'; }
        else if (listController.hasWarn === true) { selectClasses = 'br-warn'; }

        scope._checked = false;

        selectTemplate = $compile('<div class="br-select"><br-checkbox br-no-click ng-checked="_checked" class="' + selectClasses + '"></br-checkbox></div>')(scope);
        element.append(selectTemplate);

        listController.add(renderCheckBox);

        selectTemplate
          .on('click', listener)
          .on('$destroy', function() {
            listController.remove(renderCheckBox);
          });
      }


      if (controlsElement) {
        maxWidth = element[0].offsetWidth || 0;
        controlsWidth = -controlsElement.scrollWidth || -controlsElement.offsetWidth;
        controlsElement.style.right = controlsWidth + 'px';

        debouncedDrag = $$rAF.throttle(drag);

        $brGesture.register(element, 'drag');
        element
          .on('$br.dragstart', dragStart)
          .on('$br.drag', debouncedDrag)
          .on('$br.dragend', dragEnd)
          .on('$br.scrollstart', scrollStart)
          .on('$br.scrollend', scrollEnd)
          .on('blur', blurControls);
      }


      if (attr.brRowSelect !== undefined) {
        element.on('click', listener);

        if (selectTemplate) {
          selectTemplate.addClass('br-no-event');
        }
      }



      // --- Select function ----------------


      function listener(ev) {
        scope._checked = !scope._checked;
        element.toggleClass('br-selected', scope._checked);

        scope.$apply(function () {
          if (scope._checked === true) {
            if ( listController.addViewValue(getValue()) === false ) {
              scope._checked = false;
            }
          } else {
            listController.removeViewValue(getValue());
          }
        });
      }

      function renderCheckBox() {
        var check = listController.checkValue(getValue());

        if (scope._checked !== check) {
          scope._checked = check;
        }

        element.toggleClass('br-selected', scope._checked);
      }


      function getValue() {
        if(brSelect !== '') {
          return scope.$eval(brSelect);
        }

        return scope.item;
      }





      // ---- Controll Interactions ---------


      var isDragging = false;
      var isScrolling = false;
      var isBlocking = false;
      var controlsStartX;
      var contentsStartX;
      var selectStartX;
      var controlsX;
      var contentX;
      var selectX;
      var controlsLastX;
      var contentLastX;
      var selectLastX;
      var normal;
      var eased;



      function scrollStart (e) {
        isScrolling = true;
      }

      function scrollEnd (e){
        isScrolling = false;
      }

      function blockDrag() {
        isBlocking = true;
      }

      function unblockDrag() {
        isBlocking = false;
      }


      function dragStart (e) {
        if (isScrolling === true || isBlocking === true) return;
        isDragging = true;
        element.addClass('br-dragging');

        controlsStartX = controlsLastX || parseInt(controlsElement.style.right) || 0;
        contentsStartX = contentLastX || parseInt(contentElement.style.left) || 0;

        if (selectTemplate !== undefined && listController.isSelect === true) {
          selectStartX = selectLastX || parseInt(selectTemplate[0].style.left) || 0;
        }
      }


      function dragEnd (e) {
        if (isDragging === false || isScrolling === true || isBlocking === true) return;
        isDragging = false;
        element.removeClass('br-dragging');

        if(e.pointer.velocityX > 1) {
          hideControls();
          return;

        } else if(e.pointer.velocityX < -1) {
          showControls();
          return;
        }

        if((controlsX / controlsWidth) > 0.5) {
          hideControls();
        } else if (controlsX !== undefined){
          showControls();
        }
      }



      function drag (e) {
        if(isDragging === false || isScrolling === true) return;

        controlsX = controlsStartX - e.pointer.distanceX;
        if(controlsX > 0) controlsX = 0;
        if(controlsX < controlsWidth) controlsX = controlsWidth;


        contentX = contentsStartX + e.pointer.distanceX;
        if(contentX < controlsWidth) {
          normal = (contentX - controlsWidth) / -maxWidth;
          eased = normal * (2 - normal);
          if(eased < 0) eased = 0;

          contentX = controlsWidth - ((maxWidth / 2) * eased);

        }else if(contentX > 0) {
          normal = contentX / maxWidth;
          eased = normal * (2 - normal);
          if(eased < 0) eased = 0;

          contentX = (maxWidth / 2) * eased;
        }

        if (selectTemplate !== undefined && listController.isSelect === true) {
          selectX = selectStartX + e.pointer.distanceX;
          if(selectX < controlsWidth) {
            normal = (selectX - controlsWidth) / -maxWidth;
            eased = normal * (2 - normal);
            if(eased < 0) eased = 0;

            selectX = controlsWidth - ((maxWidth / 2) * eased);

          }else if(selectX > 0) {
            normal = selectX / maxWidth;
            eased = normal * (2 - normal);
            if(eased < 0) eased = 0;

            selectX = (maxWidth / 2) * eased;
          }

          selectTemplate[0].style.left = selectX + 'px';
        }


        controlsElement.style.right = controlsX + 'px';
        contentElement.style.left = contentX + 'px';
      }


      function showControls(){
        controlsLastX = 0;
        contentLastX = 0;

        if (selectTemplate !== undefined && listController.isSelect === true) {
          selectLastX = 0;
          selectTemplate[0].style.left = selectLastX + 'px';
        }

        controlsElement.style.right = controlsLastX + 'px';
        contentElement.style.left = contentLastX + 'px';

        listController.blur(hideControls);
      }

      function hideControls(){
        controlsLastX = controlsWidth;
        contentLastX = 0;

        if (selectTemplate !== undefined && listController.isSelect === true) {
          selectLastX = 0;
          selectTemplate[0].style.left = selectLastX + 'px';
        }

        controlsElement.style.right = controlsLastX + 'px';
        contentElement.style.left = contentLastX + 'px';
      }


      function blurControls (e) {
        $timeout(function () {
          hideControls();
        }, 400);
      }


    };
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name menu
 */
angular
  .module('brMaterial')
  .directive('brMenu', brMenuDirective);



/**
 * @ngdoc directive
 * @name brMenu
 * @module menu
 *
 * @param {string=} br-position-mode - A space seperated string to declare what the origin for the animation is
 *
 * - "target target"
 * - "right top"
 * - "left top"
 * - "target top"
 * - "right bottom"
 * - "left bottom"
 * - "target bottom"
 * - "left target"
 * - "right target"
 *
 * @param {string=} br-offset - A space seperated string to declare what the menu offsets are in pixels
 *
 * @description
 * The `<br-menu>` directive provides a popout menu
 * You can call `$brOpenMenu()` inside the directive. you have the option of passing in `$event` to have the menu align to current target
 *
 * @usage
 * <hljs lang="html">
 * <br-menu br-position-mode="right target">
 *   <br-button ng-click="$brOpenMenu($event)" class="br-no-margin br-circle br-small"><br-icon br-font-icon="more_vert"></br-icon></br-button>
 *   <br-menu-content>
 *     <br-menu-item>
 *       <br-button ng-click=""><br-icon br-font-icon="edit" br-size="20"></br-icon>Change Image</br-button>
 *     </br-menu-item>
 *     <br-menu-item>
 *       <br-button ng-click=""><br-icon br-font-icon="add" br-size="20"></br-icon>Upload Image</br-button>
 *     </br-menu-item>
 *   </br-menu-content>
 * </br-menu>
 * </hljs>
 */
brMenuDirective.$inject = ['$document', '$brTheme', '$brBackdrop', '$animateCss', '$brUtil', '$window'];
function brMenuDirective ($document, $brTheme, $brBackdrop, $animateCss, $brUtil, $window) {
  var directive = {
    restrict: 'E',
    scope: true,
    compile: compile
  };
  return directive;


  function compile (tElement, tAttrs) {
    if (tElement.children().length !== 2) {
      throw Error('Invalid HTML for br-menu: Expected two child elements.');
    }

    tElement.addClass('br-menu');

    return function postLink (scope, element, attrs) {
      var MENU_EDGE_MARGIN = 8;

      var isOpen = false;
      var wasAppended = false;

      var triggerElement = element.children()[0];
      if (!triggerElement.hasAttribute('ng-click')) {
        triggerElement = triggerElement.querySelector('[ng-click],[ng-mouseenter]') || triggerElement;
      }


      var menuContainer = angular.element('<div class="br-open-menu-container"></div>');
      var menuContainerId = 'menu_container_' + $brUtil.nextUid();
      var menuContents = element.children()[1];
      if (!menuContents.hasAttribute('role')) {
        menuContents.setAttribute('role', 'menu');
      }
      menuContainer.attr('id', menuContainerId);
      menuContainer.append(menuContents);

      element.on('$destroy', function () {
        menuContainer.remove();
      });

      element.append(menuContainer);
      menuContainer[0].style.display = 'none';




      scope.$brOpenMenu = open;
      function open (event) {
        if (event) {
          event.stopPropagation();
          event.preventDefault();
        }

        if (isOpen) { return; }

        triggerElement = triggerElement || (event ? event.target : element[0]);

        // add menu to body if not added yet
        if (wasAppended === false) {
          $document.find('body').eq(0).append(menuContainer);
          wasAppended = true;
        }

        $brTheme.inherit(angular.element(menuContents), menuContainer);
        menuContainer[0].style.display = '';
        var position = calculateMenuPosition(menuContainer);

        menuContainer.removeClass('br-leave');
        $brBackdrop.add(menuContainer, scope, close);

        $animateCss(menuContainer, {
          addClass: 'br-active',
          from: $brUtil.toCss(position),
          to: $brUtil.toCss({transform: ''})
        })
        .start()
        .then(function () {
          menuContents.addEventListener('click', captureClickListener, true);
          menuContainer.addClass('br-clickable');
        });

        isOpen = true;
      }




      function close () {
        if ( !isOpen ) return;
        isOpen = false;

        menuContainer.removeClass('br-clickable');
        menuContents.removeEventListener('click', captureClickListener, true);

        $animateCss(menuContainer, {addClass: 'br-leave'})
          .start()
          .then(function () {
            menuContainer.removeClass('br-active');
            menuContainer[0].style.display = 'none';
            $brBackdrop.remove();
          });
      }



      // Close menu on menu item click, if said menu-item is not disabled
      function captureClickListener (event) {
        var target = event.target;

        do {
          if (target === menuContents) { return; }
          if ((hasAnyAttribute(target, ['ng-click', 'ng-href']) || target.nodeName == 'BUTTON' || target.nodeName == 'BR-BUTTON')) {
            if (!target.hasAttribute('disabled')) {
              closeApply();
            }
            break;
          }

          target = target.parentNode;
        } while (target);


        function closeApply() {
          scope.$apply(function() {
            close();
          });
        }

        function hasAnyAttribute (target, attrs) {
          if (!target) return false;
          var j;
          var i;
          var altForms;
          var attr;
          var rawAttr;

          for (i = 0; i < attrs.length; ++i) {
            attr = attrs[i];
            altForms = [attr, 'data-' + attr, 'x-' + attr];

            for (j = 0; j < altForms.length; ++j) {
              rawAttr = altForms[j];
              if (target.hasAttribute(rawAttr)) {
                return true;
              }
            }
          }

          return false;
        }
      }



      function getPositionMode () {
        var attachment = (attrs.brPositionMode || 'target').split(' ');

        // If attachment is a single item, duplicate it for our second value.
        // ie. 'target' -> 'target target'
        if (attachment.length === 1) {
          attachment.push(attachment[0]);
        }

        return {
          left: attachment[0],
          top: attachment[1]
        };
      }



      function getOffsets() {
        var position = (attrs.brOffset || '0 0').split(' ').map(parseFloat);
        if (position.length == 2) {
          return {
            left: position[0],
            top: position[1]
          };
        } else if (position.length == 1) {
          return {
            top: position[0],
            left: position[0]
          };
        } else {
          throw Error('Invalid offsets specified. Please follow format <x, y> or <n>');
        }
      }


      function calculateMenuPosition (containerElement) {
        var containerNode = containerElement[0];
        var openMenuNode = containerElement[0].firstElementChild;
        var openMenuNodeRect = openMenuNode.getBoundingClientRect();
        var boundryNode = $document[0].body;
        var boundryNodeRect = boundryNode.getBoundingClientRect();
        var menuStyle = $window.getComputedStyle(openMenuNode);
        var originNode = triggerElement.querySelector('[br-menu-origin]') || triggerElement;
        var originNodeRect = originNode.getBoundingClientRect();


        var bounds = {
          left: boundryNodeRect.left + MENU_EDGE_MARGIN,
          top: Math.max(boundryNodeRect.top, 0) + MENU_EDGE_MARGIN,
          bottom: Math.max(boundryNodeRect.bottom, Math.max(boundryNodeRect.top, 0) + boundryNodeRect.height) - MENU_EDGE_MARGIN,
          right: boundryNodeRect.right - MENU_EDGE_MARGIN
        };


        var alignTarget, alignTargetRect = { top:0, left : 0, right:0, bottom:0 }, existingOffsets  = { top:0, left : 0, right:0, bottom:0  };
        var positionMode = getPositionMode();


        alignTarget = firstVisibleChild();
        if ( alignTarget ) {
          // TODO: Allow centering on an arbitrary node, for now center on first menu-item's child
          alignTarget = alignTarget.firstElementChild || alignTarget;
          alignTarget = alignTarget.querySelector('[br-menu-align-target]') || alignTarget;
          alignTargetRect = alignTarget.getBoundingClientRect();

          existingOffsets = {
            top: parseFloat(containerNode.style.top || 0),
            left: parseFloat(containerNode.style.left || 0)
          };
        }


        var position = {};
        var transformOrigin = 'top ';

        switch (positionMode.top) {
          case 'target':
          case 'top':
            position.top = existingOffsets.top + originNodeRect.top - alignTargetRect.top;
            break;
          case 'bottom':
            position.top = originNodeRect.top + originNodeRect.height;
            break;
          default:
            throw new Error('Invalid target mode "' + positionMode.top + '" specified for br-menu on Y axis.');
        }


        switch (positionMode.left) {
          case 'target':
          case 'left':
            position.left = existingOffsets.left + originNodeRect.left - alignTargetRect.left;
            transformOrigin += 'left';
            break;
          case 'right':
            position.left = originNodeRect.right - openMenuNodeRect.width + (openMenuNodeRect.right - alignTargetRect.right);
            transformOrigin += 'right';
            break;
          default:
            throw new Error('Invalid target mode "' + positionMode.left + '" specified for br-menu on X axis.');
        }


        var offsets = getOffsets();
        position.top += offsets.top;
        position.left += offsets.left;

        clamp(position);

        var scaleX = Math.round(100 * Math.min(originNodeRect.width / containerNode.offsetWidth, 1.0)) / 100;
        var scaleY = Math.round(100 * Math.min(originNodeRect.height / containerNode.offsetHeight, 1.0)) / 100;


        return {
          top: Math.round(position.top),
          left: Math.round(position.left),

          // Animate a scale out if we aren't just repositioning
          transform: isOpen === false ? 'scale(' + scaleX + ', ' + scaleY + ')' : undefined,
          transformOrigin: transformOrigin
        };



        /**
         * Clamps the repositioning of the menu within the confines of
         * bounding element (often the screen/body)
         */
        function clamp(pos) {
          pos.top = Math.max(Math.min(pos.top, bounds.bottom - containerNode.offsetHeight), bounds.top);
          pos.left = Math.max(Math.min(pos.left, bounds.right - containerNode.offsetWidth), bounds.left);
        }

        /**
         * Gets the first visible child in the openMenuNode
         * Necessary incase menu nodes are being dynamically hidden
         */
        function firstVisibleChild() {
          for (var i = 0; i < openMenuNode.children.length; ++i) {
            if ($window.getComputedStyle(openMenuNode.children[i]).display !== 'none') {
              return openMenuNode.children[i];
            }
          }
        }
      }

    };
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .directive('brRadioGroup', brRadioGroupDirective)
  .directive('brRadioButton', brRadioButtonDirective);


/**
  * @name brRadioGroup
  * @module brRadioGroup
  *
  *
  * @description
  * <br-radio-group> container for 1 or more radio buttons
  *
	* @param {model} [ng-model] - the value set by the radio buttons
  *
  * @example
  * <br-radio-group ng-model="info.radioGroup1">
	*		<br-radio-button value="1">Test</br-radio-button>
	*		<br-radio-button value="2">Test 2</br-radio-button>
	*		<br-radio-button value="3" class="br-primary">Primary 3</br-radio-button>
	*	</br-radio-group>
  *
  */
brRadioGroupDirective.$inject = ['$brTheme'];
function brRadioGroupDirective ($brTheme) {
  var directive = {
    restrict: 'E',
    require: ['brRadioGroup', '?ngModel'],
    link: { pre: preLink },
    controller: ['$element', controller]
  };
  return directive;


  function preLink (scope, element, attr, ctrls) {
    $brTheme(element);

    var radioGroupController = ctrls[0];
    var ngModelCtrl = ctrls[1] || $brUtil.fakeNgModel();

    element.attr({
			'role': 'radiogroup',
			'tabindex': element.attr('tabindex') || '0'
		});

    radioGroupController.init(ngModelCtrl);
    element.on('keydown', keydownListener);


    function keydownListener (ev) {
			switch(ev.keyCode) {
				case 37: //Left Arrow
				case 38: // up arrorw
					ev.preventDefault();
					radioGroupController.selectPrevious();
					break;

				case 39: //right arrow
				case 40: //down arror
					ev.preventDefault();
					radioGroupController.selectNext();
					break;
			}
		}
  }


  function controller ($element) {
    /*jshint validthis: true */
    var vm = this;
    vm.radioRenderFuncs = [];

    vm.init = init;
    vm.add = add;
    vm.remove = remove;
    vm.setViewValue = setViewValue;
    vm.getViewValue = getViewValue;
    vm.selectNext = selectNext;
    vm.selectPrevious = selectPrevious;


    function init (ngModelCtrl_) {
      vm.ngModelCtrl = ngModelCtrl_;
      vm.ngModelCtrl.$render = render;
    }

    function add (renderFunc) {
      vm.radioRenderFuncs.push(renderFunc);
    }

    function remove (renderFunc) {
      var index = vm.radioRenderFuncs.indexOf(renderFunc);
      if (index !== -1) {
        vm.radioRenderFuncs.splice(index, 1);
      }
    }

    function selectNext () {
      changeSelectedButton($element, 1);
    }

    function selectPrevious () {
      changeSelectedButton($element, -1);
    }

    function setViewValue (value, eventType) {
      vm.ngModelCtrl.$setViewValue(value, eventType);
      render();
    }

    function getViewValue () {
      return vm.ngModelCtrl.$viewValue;
    }


    function render () {
      vm.radioRenderFuncs.forEach(function (radioButtonRender) {
        radioButtonRender();
      });
    }

    function changeSelectedButton (parent, increment) {
      var buttons = [].slice.call(parent[0].querySelectorAll(' br-radio-button'));
      var selected = parent[0].querySelector('br-radio-button.br-checked');
      var currentPlace = buttons.indexOf(selected);

      currentPlace += increment;

      if (currentPlace < 0) { currentPlace = buttons.length - 1; }
      else if (currentPlace >= buttons.length) { currentPlace = 0; }

      angular.element(buttons[currentPlace]).triggerHandler('click');
    }
  }
}






/**
  * @name brRadioButton
  * @module brRadioButton
  *
  *
  * @description
  * <br-radio-button> is meant to be used along side other radio buttons.
  *
  * @param {any} [value] - the value set on the radio group
  *
  * @example
  * <br-radio-group ng-model="info.radioGroup1">
	*		<br-radio-button value="1">Test</br-radio-button>
	*		<br-radio-button value="2">Test 2</br-radio-button>
	*		<br-radio-button value="3" class="br-primary">Primary 3</br-radio-button>
	*	</br-radio-group>
  *
  */
brRadioButtonDirective.$inject = ['$brTheme'];
function brRadioButtonDirective ($brTheme) {
  var directive = {
    restrict: 'E',
    require: '^brRadioGroup',
    transclude: true,
    template: '<div class="br-container">' +
								'<div class="br-off"></div>' +
								'<div class="br-on"></div>' +
							'</div>' +
							'<div ng-transclude class="br-label"></div>',
    link: link,
  };
  return directive;


  function link (scope, element, attr, radioGroupController) {
    var lastChecked;

    $brTheme(element);
    initialize();

    function initialize () {
      if (!radioGroupController) {
        throw 'RadioGroupController not found.';
      }

      radioGroupController.add(render);
      attr.$observe('value', render);

      element
        .on('click', listener)
        .on('$destroy', function() {
          radioGroupController.remove(render);
        });
    }


    function listener (ev) {
			if (element[0].hasAttribute('disabled')) return;

			scope.$apply(function () {
				radioGroupController.setViewValue(attr.value, ev && ev.type);
			});
		}


    function render () {
      var checked = (radioGroupController.getViewValue() === attr.value);
      if (checked === lastChecked) {
        return;
      }

      lastChecked = checked;

      if (checked) {
        element.addClass('br-checked');
      } else {
        element.removeClass('br-checked');
      }
    }

  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .directive('brRipple', rippleDirective);


rippleDirective.$inject = ['$brRippleService'];
function rippleDirective ($brRippleService) {
  var directive = {
    controller: angular.noop,
    link: link
  };
  return directive;

  function link (scope, element, attr) {
    $brRippleService.attach(scope, element);
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .factory('$brRippleService', rippleService);


var DURATION = 450;


rippleService.$inject = ['$injector'];
function rippleService ($injector) {
  var service = {
    attach: attach
  };
  return service;

  function attach (scope, element) {
    // TODO : make no ripple option work
    // if (element.controller('brNoRipple')) return angular.noop;
    return $injector.instantiate(rippleController, {
      $scope: scope,
      $element: element
    });
  }
}


rippleController.$inject = ['$scope', '$element', '$window', '$timeout', '$brUtil'];
function rippleController ($scope, $element, $window, $timeout, $brUtil) {
  /*jshint validthis:true */
  var vm = this;
  
  var mousedown = false;
  var lastRipple = null;
  var timeout = null;
  var ripples = [];
  var options = {
    center: true,
    dimBackground: true
  };

  $brUtil.valueOnUse(vm, 'container', createContainer);
  $element.addClass('br-has-ripple');

  // attach method for unit tests
  ($element.controller('brRipple') || {}).createRipple = createRipple;
  ($element.controller('brRipple') || {}).setColor = getSetColor;


  $element.on('mousedown', handleMousedown);
  $element.on('mouseup touchend', handleMouseup);
  $element.on('mouseleave', handleMouseup);
  $element.on('touchmove', handleTouchmove);



  function getSetColor (value) {
    var _color;

    // If assigning a color value, apply it to background and the ripple color
    if (angular.isDefined(value)) {
      _color = parseColor(value);
    }

    // If color lookup, use assigned, defined, or inherited
    return _color || parseColor( getRippleElement() ) || parseColor( getElementColor() );

    /**
     * Finds the color element and returns its text color for use as default ripple color
     * @returns {string}
     */
    function getElementColor () {
      var elem =  $element[0];

      return elem ? $window.getComputedStyle(elem).color : 'rgb(0,0,0)';
    }
  }


  function parseColor (color, multiplier) {
    multiplier = multiplier || 1;

    if (!color) return;
    if (color.indexOf('rgba') === 0) return color.replace(/\d?\.?\d*\s*\)\s*$/, (0.1 * multiplier).toString() + ')');
    if (color.indexOf('rgb') === 0) return rgbToRGBA(color);
    if (color.indexOf('#') === 0) return hexToRGBA(color);

    /**
     * Converts hex value to RGBA string
     * @param color {string}
     * @returns {string}
     */
    function hexToRGBA (color) {
      var hex   = color[ 0 ] === '#' ? color.substr(1) : color,
        dig   = hex.length / 3,
        red   = hex.substr(0, dig),
        green = hex.substr(dig, dig),
        blue  = hex.substr(dig * 2);
      if (dig === 1) {
        red += red;
        green += green;
        blue += blue;
      }
      return 'rgba(' + parseInt(red, 16) + ',' + parseInt(green, 16) + ',' + parseInt(blue, 16) + ',0.1)';
    }

    /**
     * Converts an RGB color to RGBA
     * @param color {string}
     * @returns {string}
     */
    function rgbToRGBA (color) {
      return color.replace(')', ', 0.1)').replace('(', 'a(');
    }

  }

  function createContainer () {
    var container = angular.element('<div class="br-ripple-container"></div>');
    $element.append(container);
    return container;
  }

  function getRippleElement () {
    return $element.attr('br-has-ripple');
  }



  function isRippleAllowed () {
    var element = $element[0];
    do {
      if (!element.tagName || element.tagName === 'BODY') break;

      if (element && angular.isFunction(element.hasAttribute)) {
        if (element.hasAttribute('disabled')) return false;
        if (getRippleElement() === 'false' || getRippleElement() === '0') return false;
      }

      element = element.parentNode;
    } while (element);
    return true;
  }


  function fadeInComplete (ripple) {
    if (lastRipple === ripple) {
      if (!timeout && !mousedown) {
        removeRipple(ripple);
      }
    } else {
      removeRipple(ripple);
    }
  }

  function fadeOutComplete (ripple) {
    ripple.remove();
    lastRipple = null;
  }

  function removeRipple (ripple) {
    var index = ripples.indexOf(ripple);
    if (index < 0) return;
    ripples.splice(ripples.indexOf(ripple), 1);
    ripple.removeClass('br-ripple-active');
    if (ripples.length === 0) vm.container.css({ backgroundColor: '' });
    // use a 2-second timeout in order to allow for the animation to finish
    // we don't actually care how long the animation takes
    $timeout(function () {
      fadeOutComplete(ripple);
    }, DURATION, false);
  }

  function clearRipples () {
    for (var i = 0; i < ripples.length; i++) {
      fadeInComplete(ripples[ i ]);
    }
  }



  function createRipple (left, top) {
    if (!isRippleAllowed()) return;

    var ripple      = angular.element('<div class="br-ripple"></div>');
    var width       = $element.prop('clientWidth');
    var height      = $element.prop('clientHeight');
    var x           = Math.max(Math.abs(width - left), left) * 2;
    var y           = Math.max(Math.abs(height - top), top) * 2;
    var size        = getSize(options.fitRipple, x, y);
    var color       = getSetColor();


    ripple.css({
      left:            left + 'px',
      top:             top + 'px',
      background:      'black',
      width:           size + 'px',
      height:          size + 'px',
      backgroundColor: rgbaToRGB(color),
      borderColor:     rgbaToRGB(color)
    });
    lastRipple = ripple;

    // we only want one timeout to be running at a time
    clearTimeout();
    timeout = $timeout(function () {
      clearTimeout();
      if (!mousedown) fadeInComplete(ripple);
    }, DURATION * 0.35, false);

    if (options.dimBackground) vm.container.css({ backgroundColor: color });
    vm.container.append(ripple);
    ripples.push(ripple);
    ripple.addClass('br-ripple-placed');

    $brUtil.nextTick(function () {
      ripple.addClass('br-ripple-scaled br-ripple-active');
      $timeout(function () {
        clearRipples();
      }, DURATION, false);
    }, false);

    function rgbaToRGB (color) {
      return color ? color.replace('rgba', 'rgb').replace(/,[^\),]+\)/, ')') : 'rgb(0,0,0)';
    }

    function getSize (fit, x, y) {
      return fit ? Math.max(x, y) : Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    }
  }


  function clearTimeout () {
    if (timeout) {
      $timeout.cancel(timeout);
      timeout = null;
    }
  }




  // --- Mouse events ----


  function handleMousedown (event) {
    if (mousedown) { return; }

    // When jQuery is loaded, we have to get the original event
    if (event.hasOwnProperty('originalEvent')) { event = event.originalEvent; }

    mousedown = true;
    if (options.center) {
      createRipple(vm.container.prop('clientWidth') / 2, vm.container.prop('clientWidth') / 2);
    } else {

      // We need to calculate the relative coordinates if the target is a sublayer of the ripple element
      if (event.srcElement !== $element[0]) {
        var layerRect = $element[0].getBoundingClientRect();
        var layerX = event.clientX - layerRect.left;
        var layerY = event.clientY - layerRect.top;

        createRipple(layerX, layerY);
      } else {
        createRipple(event.offsetX, event.offsetY);
      }
    }
  }



  function handleMouseup () {
      autoCleanup();
  }

  function handleTouchmove () {
    autoCleanup();
  }

  function autoCleanup () {
    if ( mousedown || lastRipple ) {
      mousedown = false;
      $brUtil.nextTick( clearRipples, false);
    }
  }


}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name select
 */
angular
  .module('brMaterial')
  .directive('select', selectAugmentDirective)
  .directive('brSelect', selectDirective);



selectAugmentDirective.$inject = ['$brUtil', '$compile'];
function selectAugmentDirective($brUtil, $compile) {
  var directive = {
    restrict: 'E',
    scope: true,
    require: ['^?brSelect', '?ngModel'],
    link: link
  };

  return directive;


  function link(scope, element, attr, ctrls) {
    var containerCtrl = ctrls[0];
    var ngModelCtrl = ctrls[1] || $brUtil.fakeNgModel();
    var isReadonly = attr.readonly !== undefined;

    if (attr.tabindex === undefined) {
      attr.$set('tabindex', 0);
    }

    if ( !containerCtrl ) {
      if (attr.brNoStyle === undefined) { element.addClass('br-select-standard'); }
      return;
    }

    var errorsSpacer = angular.element('<div class="br-errors-spacer">');
    element.after(errorsSpacer);

    containerCtrl.selectElement = element;

    var ngOptionsHelper = $brUtil.ngOptionsHelper(attr.ngOptions, scope);


    // add placeholder if it exists and ng model is empty
    var placeholder = attr.placeholder || '';
    if (attr.placeholder !== undefined) {
      scope.selectText = placeholder;
      element.removeAttr('placeholder');
      containerCtrl.setHasPlaceholder(true);
    } else {
      placeholder = containerCtrl.label;
    }


    var valueElement = $compile('<div class="br-select-content"><span>{{selectText}}</span><div class="br-select-icon"></div></div>')(scope);
    element.after(valueElement);

    attr.$observe('disabled', function (disabled) {
      valueElement.toggleClass('br-disabled', !!disabled);
      if (disabled === true) {
        element
          .removeAttr('tabindex');
      } else {
        element
          .attr({'tabindex': attr.tabindex});
      }
    });


    element.addClass('br-real-select');
    if (!element.attr('id')) {
      element.attr('id', 'select_' + $brUtil.nextUid());
    }


    ngModelCtrl.$parsers.push(ngModelPipelineCheckValue);
    ngModelCtrl.$formatters.push(ngModelPipelineCheckValue);
    ngModelCtrl.$render = ngModelRender;


    if (!isReadonly) {
      element
        .on('focus', function (ev) {
          containerCtrl.setFocused(true);
        })
        .on('blur', function (ev) {
          containerCtrl.setFocused(false);
        });
    }

    element.on('change', function () {
      scope.$apply(function () {
        ngModelRender();
      });
    });


    function ngModelPipelineCheckValue(arg) {
      containerCtrl.setHasValue(!ngModelCtrl.$isEmpty(arg));
      return arg;
    }


    function ngModelRender() {
      scope.selectText = ngOptionsHelper.getLabel(ngModelCtrl.$viewValue) || placeholder;
    }

  }

}



/**
  * @ngdoc directive
  * @name brSelect
  * @module select
  *
  * @description
  * `<br-select>` is a wrapper for selects and select menus
  *
  * @usage
  * <hljs lang="html">
  * <br-select>
  *   <label>Label</label>
  *   <select ng-model="model" ng-options="item.name for item in list"></select>
  * </br-select>
  * </hljs>
  */
selectDirective.$inject = ['$brTheme'];
function selectDirective ($brTheme) {

  var directive = {
    restrict: 'E',
    compile: compile,
    controller: ['$scope', '$element', '$brMobile', controller]
  };
  return directive;



  function compile(tElement, tAttrs) {
    tElement.addClass('br-select');

    return function link (scope, element, attr) {
      $brTheme(element);
    };
  }


  function controller($scope, $element, $brMobile) {
    /* jshint validthis: true */
    var vm = this;


    // the click area for select is diffrent in each browser
    // for non-mobile devices listen for the click event on the element container and open the select.
    // this is only for native selects
    if ($element[0].querySelector('select') !== null && $brMobile.isMobile === false) {
      $element.on('click', augmentedClick);

      $scope.$on('$destroy', function () {
        $element.off('click', augmentedClick);
      });
    }

    var labelElement = $element[0].querySelector('label');

    if (labelElement !== undefined && labelElement !== null) {
      vm.label = labelElement.innerText;
      setTimeout(function () {
        angular.element(labelElement).attr('for', vm.selectElement.attr('id'));
      }, 0);
      // $element.addClass('br-has-label');
    }


    vm.setFocused = setFocused;
    vm.setHasValue = setHasValue;
    vm.setHasPlaceholder = setHasPlaceholder;


    function setFocused(isFocused) {
      $element.toggleClass('br-select-focused', !!isFocused);
    }

    function setHasValue(hasValue) {
      $element.toggleClass('br-select-has-value', !!hasValue);
    }

    function setHasPlaceholder(hasValue) {
      $element.toggleClass('br-select-has-placeholder', !!hasValue);
    }


    function augmentedClick(event) {
      if (event.target === vm.selectElement[0]) { return; }
      event.preventDefault();
      event.stopPropagation();

      openSelect();
    }

    function openSelect() {
      if (document.createEvent) {
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        vm.selectElement[0].dispatchEvent(e);
      } else if ($element.fireEvent) {
        vm.selectElement[0].fireEvent("onmousedown");
      }
    }
  }

}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name sideContent
 */
angular
  .module('brMaterial')
  .directive('brSideContent', brSideContentDirective);



/**
  * @ngdoc directive
  * @name brSideContent
  * @module sideContent
  *
  *
  * @description
  * `<br-side-content>` is a side panel that will auto hide on mobile devices and when the screen is too small.
  * You can open it using the `$brContentService`
  *
  * @param {number=} br-width - The width used when open and there is enough screen space
	* @param {string=} br-component-id - The name used when calling the content from `$brSideContent` service
	* @param {boolean=} br-is-locked-open - Tells the side content to stay open or not. you can use `$brMedia` service to control this for mobile devices
  *
  * @usage
  * ### Class Names
  * - br-side-content-right - tells the side content stick to the right side
  * - br-side-content-left - tells the side content stick to the left side
  * - br-border-right - shows border on right
  * - br-border-left - shows border on left
  *
  * <hljs lang="html">
  *   <br-side-content class="br-side-content-right br-border-left" br-is-locked-open="$brMedia('md')" br-component-id="sideContentId" br-width="400">
  *     // content does here
  *    </br-side-content>
  * </hljs>
  */
brSideContentDirective.$inject = ['$brTheme', '$q', '$parse', '$window', '$brMedia', '$animate', '$document', '$brUtil', '$brConstant'];
function brSideContentDirective($brTheme, $q, $parse, $window, $brMedia, $animate, $document, $brUtil, $brConstant) {
  var directive = {
    restrict: 'E',
    scope: {
      isOpen: '=?brIsOpen'
    },
    transclude: true,
    template:
      '<div class="br-side-content-container">'+
        '<div ng-transclude></div>'+
      '</div>',
    compile: compile,
    controller: ['$scope', '$element', '$attrs', '$brComponentRegistry', '$q', '$brBackdrop', controller]
  };
  return directive;


  function compile(tElement, tAttrs) {
    tElement.addClass('br-closed');
    tElement.attr('tabIndex', '-1');

    return function postLink(scope, element, attrs, sideContentCtrl) {
      var lastParentOverFlow;
      var triggeringElement = null;
      var promise = $q.when(true);
      var isLockedOpenParsed = $parse(attrs.brIsLockedOpen);
      var brWidth = attrs.brWidth !== undefined;
      var windowWidth;

      $brTheme(element);


      if(brWidth === true) {
        brWidth = attrs.brWidth.replace('px', '');
        angular.element($window).bind('resize', resize);
        scope.$on('$destroy', function () {
          angular.element($window).off('resize', resize);
        });

        if(brWidth < ($window.innerWidth - 23)) {
          element.css('width', brWidth + 'px');
          element.css('min-width', brWidth + 'px');
          element.css('max-width', brWidth + 'px');
        }
      }

      var isLocked = function() {
        return isLockedOpenParsed(scope.$parent, {
          $brMedia: $brMedia
        });
      };


      scope.disableLockedOpen = false;
      scope.$watch(isLocked, updateIsLocked);
      scope.$watch('isOpen', updateIsOpen);
      element.on('$destroy', sideContentCtrl.destroy);

      sideContentCtrl.$toggleOpen = toggleOpen;



      function resize () {
        if (brWidth >= ($window.innerWidth - 24)) {
          element.attr('style', '');
        } else {
          element.css('width', brWidth + 'px');
          element.css('min-width', brWidth + 'px');
          element.css('max-width', brWidth + 'px');
        }
      }


      function updateIsLocked(isLocked){
        if (scope.disableLockedOpen === true) {
          scope.isLockedOpen = false;
          element.removeClass('br-locked-open');
          return;
        }

        scope.isLockedOpen = isLocked;
        element.toggleClass('br-locked-open', !isLocked);
      }


      function updateIsOpen(isOpen) {
        var parent = element.parent();
        //var focusEl = sideContentCtrl.focusElement();

        parent[isOpen ? 'on' : 'off']('keydown', onKeyDown);
        // backdrop[isOpen ? 'on' : 'off']('click', close);

        if ( isOpen ) {
          triggeringElement = $document[0].activeElement;
        }

        disableParentScroll(isOpen);

        // TODO : make this promis triggetr on animation complete
        promise = $q.all([
            // isOpen ? $animate.enter(backdrop, parent) : $animate.leave(backdrop),
            //$animate[isOpen ? 'removeClass' : 'addClass'](element, 'br-closed')
            setTimeout(function () {
  						scope.$apply(function(){
  							$animate[isOpen ? 'removeClass' : 'addClass'](element, 'br-closed');
  						});
  					}, 0)
          ])
          .then(function() {
            // Perform focus when animations are ALL done...
            if (scope.isOpen) {
              //focusEl && focusEl.focus();
            }
          });

        return promise;
      }


      function toggleOpen(isOpen) {
        if (scope.isOpen == isOpen ) {
          return $q.when(true);

        } else {
          var deferred = $q.defer();

          // Toggle value to force an async `updateIsOpen()` to run
          scope.isOpen = isOpen;

          $brUtil.nextTick(function() {

            // When the current `updateIsOpen()` animation finishes
            promise.then(function(result) {
              if (!scope.isOpen) {
                // reset focus to originating element (if available) upon close

                setTimeout(function () {
                  if (triggeringElement) { triggeringElement.focus(); }
                  triggeringElement = null;
                }, 0);
              }

              deferred.resolve(result);
            });
          });

          return deferred.promise;
        }
      }


      function disableParentScroll(disabled) {
        var parent = element.parent();
        if ( disabled && !lastParentOverFlow ) {

          lastParentOverFlow = parent.css('overflow');
          parent.css('overflow', 'hidden');

        } else if (angular.isDefined(lastParentOverFlow)) {
          parent.css('overflow', lastParentOverFlow);
          lastParentOverFlow = undefined;
        }
      }


      function onKeyDown(ev) {
        var isEscape = (ev.keyCode === $brConstant.KEY_CODE.ESCAPE);
        return isEscape ? close(ev) : $q.when(true);
      }


      function close(ev) {
        ev.preventDefault();
        ev.stopPropagation();

        return sideContentCtrl.close();
      }
    };
  }






  function controller($scope, $element, $attrs, $brComponentRegistry, $q, $brBackdrop) {
    /* jshint validthis: true */
    var vm = this;

    vm.isOpen = function () { return !!$scope.isOpen; };
    vm.isLockedOpen = function () { return !!$scope.isLockedOpen; };
    vm.hide = function () { $element.addClass('br-side-content-hide'); };
    vm.show = function () { $element.removeClass('br-side-content-hide'); };
    vm.open = function () { return vm.$toggleOpen(true); };
    vm.close = function () { return vm.$toggleOpen( false ); };
    vm.toggle = function () { return vm.$toggleOpen( !$scope.isOpen ); };
    vm.$toggleOpen = function(value) { return $q.when($scope.isOpen = value); };
    vm.addBackdrop = function (clickCallback) { $brBackdrop.add($element, $scope, clickCallback); };
    vm.removeBackdrop = function () { $brBackdrop.remove(); };

    vm.focusElement = function (el) {
      if (angular.isDefined(el)) {
        return el;
      }
      return null;
    };

    vm.destroy = $brComponentRegistry.register(vm, $attrs.brComponentId);
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .factory('$brSideContent', brSideContentService);



/**
  * @ngdoc service
  * @name $brSideContent
  * @module sideContent
  *
  *
  * @description
  * `$brSideContent` controls the `<br-side-content>` element
  *
  *
  * @usage
  * <hljs lang="js">
  * angular.controller('MyCtrl', function ($brSideContent) {
  *   $brSideContent('theComponentId').open();
  *   $brSideContent('theComponentId').isOpen();
  *   $brSideContent('theComponentId').isLockedOpen();
  *   $brSideContent('theComponentId').close();
  *   $brSideContent('theComponentId').addBackdrop();
  *   $brSideContent('theComponentId').removeBackdrop();
  * });
  * </hljs>
  *
  * <hljs lang="html">
  * <br-side-content br-component-id="theComponentId" br-is-locked-open="$brMedia('md')" br-width="400">
  *   // content does here
  * </br-side-content>
  * </hljs>
  */
brSideContentService.$inject = ['$brComponentRegistry', '$q'];
function brSideContentService($brComponentRegistry, $q) {
  return function (handle) {
    var errorMsg = "SideNav '" + handle + "' is not available!";
    var instance = $brComponentRegistry.get(handle);

    if(!instance) {
      $brComponentRegistry.notFoundError(handle);
    }

    var service = {
      isOpen: isOpen,
      isLockedOpen: isLockedOpen,
      hide: hide,
      show: show,
      toggle: toggle,
      open: open,
      close: close,
      then: then,
      addBackdrop: addBackdrop,
      removeBackdrop: removeBackdrop
    };
    return service;


    /**
     * @ngdoc method
     * @name $brSideContent#isOpen
     * @function
     *
     * @description
     * Check to see is a side content is open
     *
     * @return {boolean} - true if open, false if closed
     */
    function isOpen() {
      return instance && instance.isOpen();
    }


    /**
     * @ngdoc method
     * @name $brSideContent#isLockedOpen
     * @function
     *
     * @description
     * Check to see if the br-locked-open attribute is true or false
     *
     * @return {boolean} - True id locked open, flase is not locked open
     */
    function isLockedOpen() {
      return instance && instance.isLockedOpen();
    }

    /**
     * @ngdoc method
     * @name $brSideContent#hide
     * @function
     *
     * @description
     * hide
     */
    function hide() {
      if (instance) instance.hide();
    }

    /**
     * @ngdoc method
     * @name $brSideContent#show
     * @function
     *
     * @description
     * show
     */
    function show() {
      if (instance) instance.show();
    }


    /**
     * @ngdoc method
     * @name $brSideContent#toggle
     * @function
     *
     * @description
     * Toggles open closed state. This will only close if the locked open state is false
     *
     * @return {promise} - promise resolved post animation
     */
    function toggle() {
      return instance ? instance.toggle() : $q.reject(errorMsg);
    }



    /**
     * @name open
     * @function
     *
     * @description
     * Toggles content open state
     *
     * @return {promise} - promise resolved post animation
     */
    function open() {
      return instance ? instance.open() : $q.reject(errorMsg);
    }


    /**
     * @ngdoc method
     * @name $brSideContent#close
     * @function
     *
     * @description
     * Toggles closed state. This will only close if the locked open state is false
     *
     * @return {promise} - promise resolved post animation
     */
    function close() {
      return instance ? instance.close() : $q.reject(errorMsg);
    }


    /**
     * @ngdoc method
     * @name $brSideContent#then
     * @function
     *
     * @description
     * Function called post operation
     *
     * @return {promise} - promise resolved post animation
     */
    function then(callbackFn) {
      var promise = instance ? $q.when(instance) : waitForInstance();
      return promise.then( callbackFn || angular.noop );
    }


    /**
     * @ngdoc method
     * @name $brSideContent#addBackdrop
     * @function
     *
     * @description
     * Adds a backdrop behind the side content to prevent clicking
     *
     * @return {promise} - promise resolved post backdrop being added
     */
    function addBackdrop(clickCallback) {
      return instance ? instance.addBackdrop(clickCallback) : $q.reject(errorMsg);
    }


    /**
     * @ngdoc method
     * @name $brSideContent#removeBackdrop
     * @function
     *
     * @description
     * Removes backdrop from behind the side content
     *
     * @return {promise} - promise resolved post backdrop being removed
     */
    function removeBackdrop() {
      return instance ? instance.removeBackdrop() : $q.reject(errorMsg);
    }





    function waitForInstance() {
      return $brComponentRegistry
        .when(handle)
        .then(function (it) {
          instance = it;
          return it;
        });
    }

  };
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name slider
 */
angular
  .module('brMaterial')
	.directive('brSlider', brSliderDirective);




/**
  * @ngdoc directive
  * @name brSlider
  * @module slider
  *
  *
  * @description
  * `<br-slider>` is a animated slider that can be used with or without a percentage
  *
  * @param {number=} min=0 - The minimum value
	* @param {number=} max=100 - The maximum value
	* @param {number=} step - Ttep the value by
  *
  * @usage
  * <hljs lang="html">
  * <br-slider min="0" max="100" ng-model="info.slider" id="slider"></br-slider>
  * </hljs>
  */

brSliderDirective.$inject = ['$window', '$brUtil', '$brConstant', '$brTheme', '$parse', '$brGesture', '$$rAF', '$timeout'];
function brSliderDirective($window, $brUtil, $brConstant, $brTheme, $parse, $brGesture, $$rAF, $timeout){
	var directive = {
		scope: {},
		require: '?ngModel',
		template:
			'<div class="br-slider-wrapper">' +
				'<div class="br-track-container">' +
					'<div class="br-track"></div>' +
					'<div class="br-track br-track-fill"></div>' +
				'</div>' +
				'<div class="br-thumb-container">' +
					'<div class="br-thumb"></div>' +
					'<div class="br-focus-ring"></div>' +
					'<div class="br-slider-value" ng-if="showThumbValue">{{modelValue}}</div>' +
				'</div>' +
			'</div>',
		compile: compile
	};

	return directive;


	function compile(tElement, tAttrs){
		tElement.attr({
			tabIndex: 0,
			role: 'slider'
		});

		return postLink;
	}

	function postLink(scope, element, attr, ngModelCtrl){
		var min;
		var max;
		var step;
		var dimensions = {};
		var isDragging = false;
		var isScrolling = false;
		var dragPer;
		var dragPos;
		var dragStep;

		var disabledGetter = $parse(attr.ngDisabled);
		var thumb = angular.element(element[0].querySelector('.br-thumb'));
		var thumbRing = angular.element(element[0].querySelector('.br-focus-ring'));
		var thumbContainer = thumb.parent();
		var trackContainer = angular.element(element[0].querySelector('.br-track-container'));
		var activeTrack = angular.element(element[0].querySelector('.br-track-fill'));

		scope.showThumbValue = false;


		$brTheme(element);
		ngModelCtrl = ngModelCtrl || $brUtil.fakeNgModel();

		ngModelCtrl.$render = ngModelRender;
		ngModelCtrl.$viewChangeListeners.push(ngModelRender);
		ngModelCtrl.$formatters.push(minMaxValidator);
		ngModelCtrl.$formatters.push(stepValidator);

		attr.min = attr.min ? attr.$observe('min', updateMin) : updateMin(0);
		attr.max = attr.max ? attr.$observe('max', updateMax) : updateMax(100);
		attr.step = attr.step ? attr.$observe('step', updateStep) : updateStep(1);



		$brGesture.register(element, 'press');
		$brGesture.register(element, 'scroll');
		element
			.on('keydown', keydownListener)
			.on('$br.pressdown', onDown)
			.on('$br.pressup', onUp)
			.on('$br.scrollstart', scrollStart)
			.on('$br.scrollend', scrollEnd);

		$brGesture.register(thumbContainer, 'drag');
		thumbContainer
			.on('$br.dragstart', dragStart)
			.on('$br.drag', drag)
			.on('$br.dragend', dragEnd);



		var debouncedUpdateAll = $$rAF.throttle(updateAll);
		angular.element($window).on('resize', debouncedUpdateAll);

		scope.$on('$destroy', function() {
			angular.element($window).off('resize', debouncedUpdateAll);
		});

		function updateAll() {
			setDimensions();
			ngModelRender();
		}

		function updateMin(value) {
			min = parseFloat(value);
			ngModelRender();
		}
		function updateMax(value) {
			max = parseFloat(value);
			ngModelRender();
		}
		function updateStep(value) {
			step = parseFloat(value);
		}



		//--- Events ---


		function keydownListener(ev) {
			if(disabledGetter(scope)) return;

			var changeAmount;
			if (ev.keyCode === $brConstant.KEY_CODE.LEFT_ARROW) {
				changeAmount = -step;
			} else if (ev.keyCode === $brConstant.KEY_CODE.RIGHT_ARROW) {
				changeAmount = step;
			}
			if (changeAmount) {
				if (ev.metaKey || ev.ctrlKey || ev.altKey) {
					changeAmount *= 4;
				}
				ev.preventDefault();
				ev.stopPropagation();
				var value = ngModelCtrl.$viewValue + changeAmount;
				var minMaxNum = minMaxValidator(value);

				scope.$evalAsync(function() {
					ngModelCtrl.$setViewValue(minMaxNum);
				});
			}
		}

		function onDown(e) {
			if (disabledGetter(scope) || isDragging || isScrolling) return;

			setDimensions();
			element.addClass('active');
			element[0].focus();
			scope.showThumbValue = true;
		}

		function onUp(e){
			if (disabledGetter(scope) || isDragging || isScrolling) return;

			element.removeClass('active');
			setValue(e.pointer.x);

			$timeout(function(){
				scope.showThumbValue = false;
			}, 1000);
		}



		//--- Drag ---
		function scrollStart(){
			isScrolling = true;
			scope.showThumbValue = false;
			element[0].blur();
			element.removeClass('active');
		}

		function scrollEnd(){
			isScrolling = false;
		}

		function dragStart(e){
			if(disabledGetter(scope) || isScrolling) return;

			e.preventDefault();
			e.srcEvent.preventDefault();

			isDragging = true;
			setDimensions();
			element.addClass('dragging');
			scope.showThumbValue = true;
		}

		function dragEnd(e){
			if(!isDragging || isScrolling) return;

			isDragging = false;
			element.removeClass('dragging');
			scope.showThumbValue = false;
		}

		function drag(e) {
			if(!isDragging || isScrolling) return;

			e.preventDefault();
			e.srcEvent.preventDefault();

			updateValueOnSlide(e.pointer.x);
		}


		function updateValueOnSlide(value){
			scope.$evalAsync( function() {
				dragPer = positionToPercent(value);
				dragPos = percentToValue(dragPer);
				dragStep = stepValidator(dragPos);
				ngModelCtrl.$setViewValue(dragStep);
			});
		}

		// Set Value and update view
		function setValue(value){
			var percent = positionToPercent(value);
			var perValue = percentToValue(percent);
			var minMaxNum = minMaxValidator(perValue);
			var stepNum = stepValidator(minMaxNum);
			scope.$apply(function() {
				ngModelCtrl.$setViewValue(stepNum);
				ngModelRender();
			});
		}

		function ngModelRender() {
			if (isNaN(ngModelCtrl.$viewValue)) {
				ngModelCtrl.$viewValue = ngModelCtrl.$modelValue || 0;
			}

			var percent = (ngModelCtrl.$viewValue - min) / (max - min);
			scope.modelValue = ngModelCtrl.$viewValue;
			setSliderPercent(percent);
		}

		function positionToPercent(value){
			return Math.max(0, Math.min(1, (value - dimensions.left) / (dimensions.width)));
		}

		function percentToValue(value){
			return min + value * (max - min);
		}

		function stepValidator(value){
			return Math.round(value / step) * step;
		}


		function setSliderPercent(percent) {
			activeTrack.css('width', (percent * 100) + '%');
			thumbContainer.css(
				'left',
				(percent * 100) + '%'
			);
			element.toggleClass('br-min', percent === 0);
		}

		function minMaxValidator(value){
			return Math.max(min, Math.min(max, value));
		}

		setDimensions();
		function setDimensions() {
			dimensions = trackContainer[0].getBoundingClientRect();
		}
	}
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name spinner
 */
angular
  .module('brMaterial')
  .directive('brSpinner', spinnerDirective);



/**
  * @ngdoc directive
  * @name brSpinner
  * @module spinner
  *
  * @description
  * `<br-spinner>` is a animated spinner that can be used with or without a percentage
  *
  * @param {number=} br-diameter - Used to scale the spinner based on 100px
  * @param {number=} br-value - the percentage (0-100)
  *
  * @usage
  * #### Class Names
  *  - `br-primary` - Themes primary color
  *  - `br-accent` - Themes accent color
  *  - `br-warn` - Themes warn color
  *
  * <hljs lang="html">
  * <br-spinner br-diameter="40"></br-spinner>
  * </hljs>
  */
spinnerDirective.$inject = ['$brTheme', '$brUtil'];
function spinnerDirective ($brTheme, $brUtil) {
  var DEFAULT_SCALING = 0.5;
  var DEFAULT_PROGRESS_SIZE = 100;

   var directive = {
    restrict: 'E',
    scope: true,
    template: '<div class="br-spinner-container">'+
      '<div class="br-spinner-inner">'+
        '<div class="br-spinner-left">'+
          '<div class="br-half-circle"></div>'+
        '</div>'+
        '<div class="br-spinner-right">'+
          '<div class="br-half-circle"></div>'+
        '</div>'+
      '</div>'+
    '</div>',
    link: link
  };
  return directive;



  function link (scope, element, attr) {
    $brTheme(element);

    var hasValue = attr.brValue || attr.value || undefined;
    var leftCircle = angular.element(element[0].querySelector('.br-spinner-left > .br-half-circle'));
    var rightCircle = angular.element(element[0].querySelector('.br-spinner-right > .br-half-circle'));


    element.css($brUtil.toCss({
      transform : 'scale(' + getDiameterRatio() + ')'
    }));

    if (hasValue !== undefined) {
      element.addClass('br-has-value');
      watchAttributes();
    }

    function watchAttributes () {
      var attrName = attr.brValue ? 'brValue' : 'value';

      attr.$observe(attrName, function (value) {
        animatePercent(clamp(value));
      });
    }




    function animatePercent (value) {
      var rightStyles = {};
      var rightValue = 135;

      if (value <= 50) {
        rightStyles.transition = 'transform 0.1s linear';
        rightValue = value / 50 * 180 - 45;
      }
      rightStyles.transform = 'rotate(' + rightValue + 'deg)';



      var leftValue = -45;
      var leftStyles = {};

      if (value >= 50) {
        leftStyles.transition = 'transform 0.1s linear';
        leftValue = (value - 50) / 50 * 180 - 45;
      }
      leftStyles.transform = 'rotate(' + leftValue + 'deg)';

      leftCircle.css($brUtil.toCss(leftStyles));
      rightCircle.css($brUtil.toCss(rightStyles));
    }



    function getDiameterRatio () {
      if (attr.brDiameter === undefined) { return DEFAULT_SCALING; }

      var match = /([0-9]*)%/.exec(attr.brDiameter);
      var value = Math.max(0, (match && match[1] / 100) || parseFloat(attr.brDiameter));

      return  (value > 1) ? value / DEFAULT_PROGRESS_SIZE : value;
    }


    function clamp (value) {
      return Math.max(0, Math.min(value || 0, 100));
    }
  }

}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name srcDefault
 */
angular
  .module('brMaterial')
  .directive('brSrcDefault', brSrcDefaultDirective);


/**
  * @ngdoc directive
  * @name brSrcDefault
  * @module srcDefault
  *
  * @description
  * `[br-src-default]` will place a 1x1px blank image into a img element if there is an error loading. You can also pass in an image to use as the default
  *
  * @usage
  * <hljs lang="html">
  * <img src="someURL" br-src-default />
  * </hljs>
  */
function brSrcDefaultDirective() {
  var oneXOneData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDowQTg1NDY2NTNFRDkxMUU1QjhDQzlGRUI3MjRCMDM1MiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDowQTg1NDY2NjNFRDkxMUU1QjhDQzlGRUI3MjRCMDM1MiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjBBODU0NjYzM0VEOTExRTVCOENDOUZFQjcyNEIwMzUyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjBBODU0NjY0M0VEOTExRTVCOENDOUZFQjcyNEIwMzUyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+7sGYZAAAABBJREFUeNpi+P//PwNAgAEACPwC/tuiTRYAAAAASUVORK5CYII=';


  var directive = {
    restrict: 'A',
    link: link
  };
  return directive;


  function link(scope, element, attrs) {
    element.bind('load', function(e) {
			var src = angular.element(this).attr("src");
			if (src !== oneXOneData && src !== oneXOneData) {
				element.attr('style', 'width: 100%;');
			}
		});

    element.bind('error', function() {
      angular.element(this).attr("src", attrs.brSrceDefault || oneXOneData);
      element.attr('style', 'height: 0px;');
    });
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .factory('$brSticky', brStickyService);


brStickyService.$inject = ['$document', '$$rAF', '$brUtil', '$timeout', '$brConstant'];
function brStickyService($document, $$rAF, $brUtil, $timeout, $brConstant) {
  var browserStickySupport = checkStickySupport();

  return function registerStickyElement(scope, element, stickyClone, horizontalScroll) {
    horizontalScroll = horizontalScroll || false;
    var contentCtrl = element.controller('brContent');
    if (!contentCtrl) return;

    if (browserStickySupport) {
      element.css({
        position: browserStickySupport,
        top: 0,
        'z-index': 2
      });
    } else {
      var $$sticky = contentCtrl.$element.data('$$sticky');
      if (!$$sticky) {
        $$sticky = setupSticky(contentCtrl, horizontalScroll);
        contentCtrl.$element.data('$$sticky', $$sticky);
      }

      var deregister = $$sticky.add(element, stickyClone || element.clone());
      scope.$on('$destroy', deregister);
      scope.$on('$removeSticky', deregister);
    }
  };




  function setupSticky(contentCtrl, horizontalScroll) {
    var contentEl = contentCtrl.$element;
    var debouncedRefreshElements = $$rAF.throttle(refreshElements);
    var debouncedScroll = $$rAF.throttle(onScroll);

    setupAugmentedScrollEvents(contentEl);
    contentEl.on('$scrollstart', debouncedRefreshElements);
    contentEl.on('$scroll', debouncedScroll);


    var self = {
      prev: null,
      current: null,
      next: null,
      items: [],
      add: add,
      refreshElements: refreshElements,
      horizontalScroll: horizontalScroll
    };
    return self;




    function add(element, stickyClone) {
      stickyClone.addClass('br-sticky-clone');

      if ($brUtil.getClosest(element, 'br-expanded-content') !== null) {
        stickyClone.addClass('br-card-header');
      }

      var item = {
        element: element,
        clone: stickyClone
      };
      self.items.push(item);

      $$rAF(function() {
        contentEl.prepend(item.clone);
      });

      debouncedRefreshElements();

      return function remove() {
        self.items.forEach(function(item, index) {
          if (item.element[0] === element[0]) {
            self.items.splice(index, 1);
            item.clone.remove();
          }
        });
        debouncedRefreshElements();
      };
    }


    function refreshElements() {
      var item;
      var i;
      var currentScrollTop = contentEl.prop('scrollTop');

      self.items.forEach(refreshPosition);
      self.items = self.items.sort(function(a, b) {
        return a.top < b.top ? -1 : 1;
      });

      for (i = self.items.length - 1; i >= 0; i--) {
        if (currentScrollTop > self.items[i].top) {
          item = self.items[i];
          break;
        }
      }

      setCurrentItem(item);
    }


    function refreshPosition(item) {
      var current = item.element[0];

      item.top = 0;
      item.left = 0;

      while (current && current !== contentEl[0]) {
        item.top += current.offsetTop;
        item.left += current.offsetLeft;
        current = current.offsetParent;
      }

      item.height = item.element.prop('offsetHeight');
      // item.clone.css('margin-left', item.left + 'px');
    }


    function onScroll() {
      var scrollTop = contentEl.prop('scrollTop');
      var isScrollingDown = scrollTop > (onScroll.prevScrollTop || 0);

      onScroll.prevScrollTop = scrollTop;

      if (scrollTop === 0) {
        setCurrentItem(null);
        return;
      }



      if (isScrollingDown) {

        // If we've scrolled down past the next item's position, sticky it and return
        if (self.next && self.next.top <= scrollTop) {
          setCurrentItem(self.next);
          return;
        }

        // If the next item is close to the current one, push the current one up out of the way
        if (self.current && self.next && self.next.top - scrollTop <= self.next.height) {
          translate(self.current, scrollTop + (self.next.top - self.next.height - scrollTop));
          return;
        }
      }


      if (!isScrollingDown) {

        // If we've scrolled up past the previous item's position, sticky it and return
        if (self.current && self.prev && scrollTop < self.current.top) {
          setCurrentItem(self.prev);
          return;
        }

        // If the next item is close to the current one, pull the current one down into view
        if (self.next && self.current && (scrollTop >= (self.next.top - self.current.height))) {
          translate(self.current, scrollTop + (self.next.top - scrollTop - self.current.height));
          return;
        }
      }

      if (self.current) {
        translate(self.current, scrollTop);
      }
    }



    function setCurrentItem(item) {
      if (self.current === item) { return; }

      if (self.current) {
        translate(self.current, null);
        setStickyState(self.current, null);
      }

      if (item) {
        setStickyState(item, 'active');
      }

      self.current = item;
      var index = self.items.indexOf(item);

      self.next = self.items[index + 1];
      self.prev = self.items[index - 1];
      setStickyState(self.next, 'next');
      setStickyState(self.prev, 'prev');
    }


    function setStickyState(item, state) {
      if (!item || item.state === state) { return; }

      if (item.state) {
        item.clone.attr('sticky-prev-state', item.state);
        item.element.attr('sticky-prev-state', item.state);
      }

      item.clone.attr('sticky-state', state);
      item.element.attr('sticky-state', state);
      item.state = state;
    }


    function translate(item, amount) {
      if (!item) { return; }

      if (amount === null || amount === undefined) {
        if (item.translateY) {
          item.translateY = null;
          item.clone.css($brConstant.CSS.TRANSFORM, '');
        }
      } else {
        item.translateY = amount;
        item.clone.css(
          $brConstant.CSS.TRANSFORM,
          'translate3d(0,' + amount + 'px,0)'
        );
      }
    }

  }






  // Function to check for browser sticky support
  function checkStickySupport() {
    var stickyProp;
    var testEl = angular.element('<div>');
    $document[0].body.appendChild(testEl[0]);

    var stickyProps = ['sticky', '-webkit-sticky'];
    for (var i = 0; i < stickyProps.length; ++i) {
      testEl.css({position: stickyProps[i], top: 0, 'z-index': 2});
      if (testEl.css('position') == stickyProps[i]) {
        stickyProp = stickyProps[i];
        break;
      }
    }
    testEl.remove();
    return stickyProp;
  }



  function setupAugmentedScrollEvents(element) {
    var SCROLL_END_DELAY = 200;
    var isScrolling;
    var lastScrollTime;

    element.on('scroll touchmove wheel', function() {
      if (!isScrolling) {
        isScrolling = true;
        $$rAF.throttle(loopScrollEvent);
        element.triggerHandler('$scrollstart');
      }
      element.triggerHandler('$scroll');
      lastScrollTime = +$brUtil.now();
    });

    function loopScrollEvent() {
      if (+$brUtil.now() - lastScrollTime > SCROLL_END_DELAY) {
        isScrolling = false;
        element.triggerHandler('$scrollend');
      } else {
        element.triggerHandler('$scroll');
        $$rAF.throttle(loopScrollEvent);
      }
    }
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name subHeader
 */
angular
  .module('brMaterial')
  .directive('brSubheader', brSubheaderDirective);



/**
  * @ngdoc directive
  * @name brSubheader
  * @module subHeader
  *
  * @description
  * `<br-subheader>` are sticky headers, they will only be sticky inside of a `<br-content>` element
  *
  * @param {boolen=} br-no-sticky - disalbe sticky functionality
  *
  * @usage
  * <hljs lang="html">
  * <br-content style="height: 400px">
  *   <br-subheader>
  *     // Put stuff here
  *   </br-subheader>
  * </br-content>
  * </hljs>
  */
brSubheaderDirective.$inject = ['$brTheme', '$compile', '$brSticky'];
function brSubheaderDirective ($brTheme, $compile, $brSticky) {
  var directive = {
    restrict: 'E',
    replace: true,
    transclude: true,
    template:
      '<div class="br-subheader">' +
        '<div class="br-subheader-inner">' +
          '<span class="br-subheader-content"></span>' +
        '</div>' +
      '</div>',
    compile: compile
  };
  return directive;

  function compile (tElement, tAttr, transclude) {
    return function postLink (scope, element, attrs) {
      $brTheme(element);

      var outerHTML = element[0].outerHTML;
      function getContent (el) {
        return angular.element(el[0].querySelector('.br-subheader-content'));
      }

      transclude(scope, function (clone) {
        getContent(element).append(clone);
      });


      scope.$watch(function () { return element.attr('br-no-sticky'); }, function (data) {
        if (data !== undefined) {
          removeSticky();
        } else {
          addSticky();
        }
      });


      function removeSticky() {
        scope.$broadcast('$removeSticky');
      }

      function addSticky() {
        transclude(scope, function(clone) {
          var stickyClone = $compile(angular.element(outerHTML))(scope);
          getContent(stickyClone).append(clone);
          $brSticky(scope, element, stickyClone, attrs.brHorizontalScroll !== undefined);
        });
      }
    };
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name switch
 */
angular
  .module('brMaterial')
  .directive('brSwitch', brSwitchDirective);


/**
  * @ngdoc directive
  * @name brSwitch
  * @module switch
  *
  * @description
  * The `<br-switch>` acts the same as a checkbox. It works with touchdevices for dragging
  *
  * @param {model=} ng-model - `{@link https://docs.angularjs.org/api/ng/directive/ngModel Angular ngModel}`
  * @param {boolean=} ng-checked - `{@link https://docs.angularjs.org/api/ng/directive/ngChange Angular ngChecked}`
  * @param {boolean=} ng-disabled - `{@link https://docs.angularjs.org/api/ng/directive/ngChange Angular ngDisabled}`
  * @param {function=} ng-change - `{@link https://docs.angularjs.org/api/ng/directive/ngChange Angular ngChange}`
  *
  * @usage
  * #### Class Names
  *  - `br-primary` - Themes primary color
  *  - `br-accent` - Themes accent color
  *  - `br-warn` - Themes warn color
  *
  * <hljs lang="html">
  * <br-switch ng-model="switch1">
	*		Switch 1: {{switch1}}
	*	</br-switch>
  * </hljs>
  */
brSwitchDirective.$inject = ['brCheckboxDirective', '$brUtil', '$brTheme', '$brConstant', '$brGesture', '$$rAF'];
function brSwitchDirective (brCheckboxDirective, $brUtil, $brTheme, $brConstant, $brGesture, $$rAF) {
  var checkboxDirective = brCheckboxDirective[0];

  var directive = {
    restrict: 'E',
    transclude: true,
    require: '?ngModel',
    template:
			'<div ng-transclude flex class="br-label"></div>'+
			'<div class="br-container">' +
				'<div class="br-bar"></div>' +
        '<div class="br-check"></div>' +
				'<div class="br-thumb-container">' +
					'<div class="br-thumb"></div>' +
				'</div>'+
			'</div>',
    compile: compile
  };
  return directive;



  function compile (tElement, tAttr) {
    var checkboxLink = checkboxDirective.compile(tElement, tAttr);
    // stop transition for load
    tElement.addClass('br-dragging');

    return function link (scope, element, attr, ngModel) {
      ngModel = ngModel || $brUtil.fakeNgModel();

      var thumbContainer = angular.element(element[0].querySelector('.br-thumb-container'));
			var switchContainer = angular.element(element[0].querySelector('.br-container'));
			var isDragging = false;
			var drag;
			var onDragDebounced = $$rAF.throttle(onDrag);

      checkboxLink(scope, element, attr, ngModel);

      // no transition on initial load
      $$rAF(function() {
        element.removeClass('br-dragging');
      });


      $brGesture.register(switchContainer, 'drag');
			$brGesture.register(switchContainer, 'scroll');
			switchContainer
				.on('$br.dragstart', dragStart)
				.on('$br.drag', onDragDebounced)
				.on('$br.dragend', dragEnd)
				.on('$br.scrollstart', scrollStart)
				.on('$br.scrollend', scrollEnd);



      function scrollStart (){
				isDragging = true;
			}

			function scrollEnd (){
				isDragging = false;
			}


      function dragStart (e) {
				if (angular.isDefined(attr.ngDisabled) || angular.isDefined(attr.readonly)) { return; }

				e.preventDefault();
				e.srcEvent.preventDefault();

				isDragging = true;
				element.addClass('br-dragging');
				drag = {
					width: thumbContainer.prop('offsetWidth')
				};
			}

      function dragEnd (e) {
				if(isDragging === false) { return; }

				isDragging = false;
				element.removeClass('br-dragging');
				thumbContainer.css($brConstant.CSS.TRANSFORM, '');

				// We changed if there is no distance (this is a click a click),
				// or if the drag distance is >50% of the total.
				var isChanged = ngModel.$viewValue ? drag.translate < 0.5 : drag.translate > 0.5;
				if (isChanged) {
					applyModelValue(!ngModel.$viewValue);
				}
				drag = null;
			}

      function onDrag (e) {
				if(isDragging === false) { return; }

				e.preventDefault();
				e.srcEvent.preventDefault();

				var percent = e.pointer.distanceX / drag.width;

				//if checked, start from right. else, start from left
				var translate = ngModel.$viewValue ?  1 + percent : percent;
				// Make sure the switch stays inside its bounds, 0-1%
				translate = Math.max(0, Math.min(1, translate));

				thumbContainer.css($brConstant.CSS.TRANSFORM, 'translate3d(' + (100*translate) + '%,0,0)');
				drag.translate = translate;
			}

      function applyModelValue (newValue) {
				scope.$apply(function() {
					ngModel.$setViewValue(newValue);
					ngModel.$render();
				});
			}

    };
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .directive('brTable', tableDirective)
  .directive('brTh', thDirective)
  .directive('brBody', bodyDirective)
  .directive('brHead', headDirective)
  .directive('brTr', trDirective)
  .directive('brTd', tdDirective);



var selectNextId = 0;



// --- Table ----


/**
  * @name brTable
  * @module brTable
  *
  * @param {number} [height] - table height
  * @param {number} [width] - table width
  * @param {number} [inner-width] - width of table scroll area
  * @param {object} [br-filter] - object containing keys that match the table data with values to search on
  */
tableDirective.$inject = ['$brUtil', '$brTheme', '$parse'];
function tableDirective($brUtil, $brTheme, $parse) {
  var directive = {
    restrict: 'E',
    require: ['brTable', '?ngModel'],
    compile: compile,
    scope: true,
    controller: ['$scope', '$element', '$attrs', '$window', '$parse', controller]
  };
  return directive;




  function compile(tElement, tAttrs) {
    var innerWidth = tAttrs.brInnerWidth || tAttrs.innerWidth;
    var width = tAttrs.brWidth || tAttrs.width;
    var height = tAttrs.brHeight || tAttrs.height;

    if (width !== undefined) {
      tElement.css('width', $brUtil.valueToCss(width));
    }

    if (height !== undefined) {
      tElement.css('height', $brUtil.valueToCss(height));
    }


    var subheader = angular.element('<div class="br-table-container">');
    subheader.append(tElement.contents());
    tElement.append(subheader);

    if (innerWidth !== undefined) {
      subheader.css('min-width', $brUtil.valueToCss(innerWidth));
    }

    return postLink;
  }

  function postLink(scope, element, attrs, ctrls) {
    var tableController = ctrls[0];
    var ngModelCtrl = ctrls[1] || $brUtil.fakeNgModel();

    var headElement = angular.element(element[0].querySelector('br-head'));
    var bodyElement = angular.element(element[0].querySelector('br-body'));

    $brTheme(element);

    tableController.init(ngModelCtrl, attrs.ngModel);

    if (attrs.brWidth || attrs.width) {
      // set the header width
      scope.$watch(function () {
        return element[0].scrollWidth;
      }, function (data) {

        // if scroll area exists
        if (data <= element[0].offsetWidth) {
          headElement.css('width', (element[0].offsetWidth - $brUtil.scrollbarWidth) + 'px');
          bodyElement.css('width', (element[0].offsetWidth - $brUtil.scrollbarWidth) + 'px');
        } else {
          headElement.css('width', data + 'px');
          bodyElement.css('width', data + 'px');
        }
      });
    } else {
      headElement.css('width', '100%');
    }



    var deregisterWatcher;
    attrs.$observe('brMultiple', function (val) {
      if (deregisterWatcher) { deregisterWatcher(); }
      var parser = $parse(val);

      deregisterWatcher = scope.$watch(function() {
        return parser(scope);
      }, function(multiple, prevVal) {
        if (multiple === undefined && prevVal === undefined) { return; } // assume compiler did a good job
        if (multiple) {
          element.attr('multiple', 'multiple');
        } else {
          element.removeAttr('multiple');
        }

        tableController.setMultiple(multiple);
        // originalRender = ngModelCtrl.$render;
        // ngModelCtrl.$render = function() {
        //   originalRender();
        //   syncLabelText();
        //   // inputCheckValue();
        // };
        ngModelCtrl.$render();
      });
    });
  }



  function controller($scope, $element, $attrs, $window, $parse) {
    var idCounter = 0;

    /* jshint validthis: true */
    var vm = this;

    var columns = [];
    var lastSort;
    var sortFuncs = {};
    var defaultIsEmpty;

    vm.isMultiple = $attrs.multiple !== undefined;
    vm.selected = {};
    vm.options = {};

    vm.init = init;
    vm.$element = $element;
    vm.addColumn = addColumn;
    vm.getColumnInfo = getColumnInfo;
    vm.addSort = addSort;
    vm.setSort = setSort;
    vm.sortHook = sortHook;
    vm.setMultiple = setMultiple;


    function addColumn(elAttrs) {
      columns.push(elAttrs);
      return idCounter++;
    }

    function getColumnInfo(index) {
      return columns[index];
    }

    function addSort(by, func) {
      sortFuncs[by] = func;
    }

    function setSort(by, asc) {
      if (lastSort !== undefined && lastSort !== by && typeof sortFuncs[by] === 'function') {
        sortFuncs[lastSort]();
      }

      lastSort = by;
      vm.sortHook(by, asc);
    }

    function sortHook(func) {
      if (typeof func === 'function') {
        vm.sortHook = func;
      }
    }



    function init(ngModel, binding) {
      vm.ngModel = ngModel;
      vm.modelBinding = binding;

      // Allow users to provide `ng-model="foo" ng-model-options="{trackBy: 'foo.id'}"` so
      // that we can properly compare objects set on the model to the available options
      if (ngModel.$options && ngModel.$options.trackBy) {
        var trackByLocals = {};
        var trackByParsed = $parse(ngModel.$options.trackBy);
        vm.hashGetter = function(value, valueScope) {
          trackByLocals.$value = value;
          return trackByParsed(valueScope || $scope, trackByLocals);
        };
        // If the user doesn't provide a trackBy, we automatically generate an id for every
        // value passed in
      } else {
        vm.hashGetter = function getHashValue(value) {
          if (angular.isObject(value)) {
            return 'object_' + (value.$$brSelectId || (value.$$brSelectId = ++selectNextId));
          }
          return value;
        };
      }

      vm.setMultiple(vm.isMultiple);
    }


    function setMultiple(isMultiple) {
      var ngModel = vm.ngModel;
      defaultIsEmpty = defaultIsEmpty || ngModel.$isEmpty;
      vm.isMultiple = isMultiple;
      // if (deregisterCollectionWatch) { deregisterCollectionWatch(); }


      if (vm.isMultiple) {
        ngModel.$validators['br-multiple'] = validateArray;
        ngModel.$render = renderMultiple;


        $scope.$watchCollection(vm.modelBinding, function(value) {
          if (validateArray(value)) renderMultiple(value);
          vm.ngModel.$setPristine();
        });


        ngModel.$isEmpty = function(value) {
          return !value || value.length === 0;
        };
      } else {
        delete ngModel.$validators['br-multiple'];
        // ngModel.$render = renderSingular;
      }


      function validateArray(modelValue, viewValue) {
        return angular.isArray(modelValue || viewValue || []);
      }
    }


    function renderMultiple() {
      var newSelectedValues = vm.ngModel.$modelValue || vm.ngModel.$viewValue || [];
      if (!angular.isArray(newSelectedValues)) { return; }

      var oldSelected = Object.keys(vm.selected);
      var newSelectedHashes = newSelectedValues.map(vm.hashGetter);
      var deselected = oldSelected.filter(function (hash) {
        return newSelectedHashes.indexOf(hash) === -1;
      });

      deselected.forEach(deselect);
      newSelectedHashes.forEach(function(hashKey, i) {
        vm.select(hashKey, newSelectedValues[i]);
      });
    }


    function select(hashKey, hashedValue) {
      var option = vm.options[hashKey];
      if (option !== undefined) { option.setSelected(true); }
      vm.selected[hashKey] = hashedValue;
    }

    function deselect(hashKey, hashedValue) {
      var option = vm.options[hashKey];
      if (option !== undefined) { option.setSelected(false); }
      delete vm.selected[hashKey];
    }
  }
}






// --- Column Header Container ---

headDirective.$inject = ['$$rAF', '$brConstant', '$brUtil'];
function headDirective($$rAF, $brConstant, $brUtil) {
  var directive = {
    restrict: 'E',
    require: '^brTable',
    link: link
  };
  return directive;


  function link(scope, element, attrs, tableCtrl) {
    var spacerElement = angular.element('<div class="br-table-header-spacer">');
    var throttleScroll = $$rAF.throttle(onScroll);
    var parent = element.parent();

    element.parent().prepend(spacerElement);

    // watch header height and adjust header spacer
    scope.$watch(function () {
      return element[0].offsetHeight;
    }, function (data) {
      spacerElement.css('height', data + 'px');
    });

    // translate hader to stick it to top
    tableCtrl.$element.on('scroll touchmove wheel', throttleScroll);
    function onScroll () {
      element.css(
        $brConstant.CSS.TRANSFORM,
        'translate3d(0,' + tableCtrl.$element[0].scrollTop + 'px,0)'
      );

      element.toggleClass('scrolled', tableCtrl.$element[0].scrollTop > 0);
    }

    // prevent scrollout animation on load
    setTimeout(function () {
      element.addClass('inited');
    }, 0);
  }
}






// --- Column Header ---

thDirective.$inject = ['$brUtil'];
function thDirective($brUtil) {
  var directive = {
    restrict: 'E',
    require: '^brTable',
    link: link
  };
  return directive;

  function link(scope, element, attrs, tableCtrl) {
    var asc = false;
    var width = $brUtil.valueToCss(attrs.brWidth || attrs.width);
    var minWidth = $brUtil.valueToCss(width || attrs.brMinWidth || attrs.minWidth);
    var alignRight = attrs.brAlignRight;
    var alignLeft = attrs.brAlignLeft;
    var sortBy = attrs.brSortBy;

    // style the column header and add the style to the table
    if (width !== undefined) { element.css('max-width', width); }
    if (minWidth !== undefined) {
      element.css('min-width', minWidth);
      element.css('flex-basis', minWidth);
    }
    if (alignRight !== undefined) { element.addClass('br-align-right'); }
    if (alignLeft !== undefined) { element.addClass('br-align-left'); }
    element.attr('column_id', tableCtrl.addColumn({
      width: width,
      minWidth: minWidth,
      ellipsis: attrs.brEllipsis,
      alignRight: alignRight,
      alignLeft: alignLeft
    }));


    if (sortBy !== undefined) {
      element.addClass('br-sort');
      element.on('click', sort);

      tableCtrl.addSort(sortBy, function () {
        asc = false;
        element.removeClass('br-asc');
        element.removeClass('br-desc');
      });
    }

    function sort(ev) {
      element.toggleClass('br-asc', asc);
      element.toggleClass('br-desc', !asc);

      scope.$apply(function () {
        tableCtrl.setSort(sortBy, asc);
      });
      asc = !asc;
    }
  }
}







// --- Body ---

bodyDirective.$inject = ['$parse', '$compile', '$filter'];
function bodyDirective($parse, $compile, $filter) {
  var directive = {
    restrict: 'E',
    terminal: true, // needed for ng-repeat
    require: ['^brTable'],
    compile: compile
  };
  return directive;

  function compile(tElement, tAttrs) {
    var i = 0;
    var children = tElement.children();
    if (children[0].nodeName === 'BR-TR') {
      children = angular.element(children[0]).children();
    }
    var length = children.length;

    while (i < length) {
      angular.element(children[i]).attr('column_id', i);
      i += 1;
    }

    return link;
  }


  function link(scope, element, attrs, ctrls) {
    var rawData;
    var filterData;

    var tableCtrl = ctrls[0];
    var orderBy = $filter('orderBy');
    var filterBy = $filter('filter');
    var trElement = angular.element(element[0].querySelector('br-tr'));
    var sortProperties = {};

    var itemName = attrs.brItem;
    var dataGetter = $parse(attrs.brData);
    var filterGetter;
    if (attrs.brFilter !== undefined) {
      filterGetter = $parse(attrs.brFilter);
    }

    if (!trElement.length) {
      trElement = angular.element('<br-tr>');
      trElement.append(element.contents());
      element.empty().append(trElement);
    }
    trElement.attr('ng-repeat', itemName + ' in _tableData');

    scope._tableData = [];

    // watch for data change
    scope.$watch(function () {
      return dataGetter(scope);
    }, function (data) {
      rawData = data;
      runfilters();
    }, true);


    // watch for filter changes
    if (filterGetter !== undefined) {
      scope.$watch(function () {
        return filterGetter(scope);
      }, function (data) {
        filterData = data;
        runfilters();
      }, true);
    }



    $compile(trElement)(scope);
    tableCtrl.sortHook(function (predicate, reverse) {
      sortProperties.predicate = predicate;
      sortProperties.reverse = reverse;
      runfilters();
    });



    function runfilters() {
      filter();
      sort();
    }

    function filter() {
      if (filterData === undefined) {
        scope._tableData = rawData;
        return;
      }
      scope._tableData = filterBy(rawData, filterData);
    }

    function sort() {
      if (sortProperties.predicate === undefined) { return; }
      scope._tableData = orderBy(scope._tableData, sortProperties.predicate, sortProperties.reverse);
    }


    // var wrapper = angular.element('<br-infinite-repeat-container style="height: ' + tableCtrl.height + 'px">');
    // var repeatElement = angular.element('<div br-infinite-repeat="' + itemName + ' in _tableData">');
    // repeatElement.append(element.contents());
    // wrapper.append(repeatElement);
    // element.empty().append($compile(wrapper)(scope));
  }
}






// --- tr -----


var CHECKBOX_SELECTION_INDICATOR = angular.element('<div class="br-table-icon-container"><div class="br-table-menu-icon"></div></div>');

function trDirective() {
  var directive = {
    restrict: 'E',
    require: '^brTable',
    link: link
  };
  return directive;

  function link(scope, element, attrs, tableController) {
    if (tableController.isMultiple === true) {
      element.addClass('br-table-checkbox-enabled');
      element.prepend(CHECKBOX_SELECTION_INDICATOR.clone());
    }
  }
}




// --- td ---

function tdDirective() {
  var directive = {
    restrict: 'E',
    require: '^brTable',
    link: link
  };
  return directive;

  function link(scope, element, attrs, ctrl) {
    var columnAttrs = ctrl.getColumnInfo(element.attr('column_id'));
    if (columnAttrs.width !== undefined) { element.css('max-width', columnAttrs.width); }
    if (columnAttrs.minWidth !== undefined) {
      element.css('min-width', columnAttrs.minWidth);
      element.css('flex-basis', columnAttrs.minWidth);
    }
    if (columnAttrs.ellipsis !== undefined) { element.addClass('br-ellipsis'); }
    if (columnAttrs.alignRight !== undefined) { element.addClass('br-align-right'); }
    if (columnAttrs.alignLeft !== undefined) { element.addClass('br-align-left'); }
  }
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name toast
 */
angular
  .module('brMaterial')
  .directive('brToast', toastDirective)
  .factory('$brToast', toastService);


var DEFAULT_DELAY = '1400';

/**
 * @ngdoc service
 * @name $brToast
 * @module toast
 *
 * @description
 * add toast notification
 *
 * @usage
 * <hljs lang="js">
 * angular.controller('MyCtrl', function ($brToast) {
 *  $brToast.add({
 *    message: 'The Toast Mesage'
 *  });
 * });
 * </hljs>
 */
toastService.$inject = ['$animateCss', '$compile', '$rootScope', '$document', '$brUtil', '$timeout'];
function toastService($animateCss, $compile, $rootScope, $document, $brUtil, $timeout) {
  var body = $document.find('body').eq(0);
  var isToast = false;
  var queue = [];

  var service = {
    add: add
  };
  return service;



  /**
   * @ngdoc method
   * @name $brToast#add
   * @function
   *
   * @description
   * add toast notification
   *
   * @param {object} options - options object
   * @param {string} options.message - Message to Display
   * @param {boolean=} options.primary - Primary color Background
   * @param {boolean=} options.accent - Accent color Background
   * @param {boolean=} options.warn - Warn color Background
   * @param {number=} options.delay - delay in ms before the toast dissapears
   * @param {string=} options.positionMode - DEFUALT: "left bottom"
   *
   * - "right top"
   * - "left top"
   * - "right bottom"
   * - "left bottom"
   */
  function add(options) {
    queue.push(options);
    nextToast();
  }

  function nextToast() {
    if (isToast === true) { return; }
    if (queue.length > 0) { showToast(queue.shift()); }
  }



  function showToast(options) {
    isToast = true;
    var template = '<br-toast class="hide br-alert">'+
      '<div class="br-toast-message">' + options.message + '</div>'+
      '<div class="br-toast-close" ng-click="remove()"></div>'+
    '</br-toast>';


    var scope = $rootScope.$new();
    scope.remove = remove;

    var toastElement = $compile(template)(scope);
    body.append(toastElement);

    if (options.warn === true) { toastElement.addClass('br-warn'); }
    if (options.primary === true) { toastElement.addClass('br-primary'); }
    if (options.accent === true) { toastElement.addClass('br-accent'); }

    // set one of for corner positions
    var position = getPosition(options);
    if (position.top !== undefined) {
      toastElement.css('top', position.top);
      toastElement.css('bottom', position.bottom);
    }
    if (position.left !== undefined) {
      toastElement.css('left', position.left);
      toastElement.css('right', position.right);
    }

    $animateCss(toastElement, {
      addClass: 'br-active',
      from: $brUtil.toCss(position),
      to: $brUtil.toCss({transform: ''})
    })
    .start()
    .then(function () {
      $timeout(remove, options.delay || DEFAULT_DELAY);
    });



    function remove() {
      if (scope === undefined) { return; }

      // toastElement.removeClass('br-active');
      $animateCss(toastElement, {
        addClass: 'br-leave',
        from: $brUtil.toCss({transform: ''}),
        to: $brUtil.toCss(position)
      })
      .start()
      .then(function () {
        toastElement.remove();
        scope = undefined;
        isToast = false;
        nextToast();
      });
    }
  }


  function getPosition(options) {
    var attachment = (options.positionMode || 'bottom left').split(' ');
    var position = {};
    var transformOrigin = 'top ';

    switch (attachment[1]) {
      case 'top':
        position.transform = 'translateY(-100px)';
        position.top = '8px';
        position.bottom = 'initial';
        break;
      case 'bottom':
        position.transform = 'translateY(100px)';
        break;
      default:
        position.transform = 'translateY(100px)';
    }


    switch (attachment[0]) {
      case 'left':
        transformOrigin += 'left';
        break;
      case 'right':
        position.right = '8px';
        position.left = 'initial';
        transformOrigin += 'right';
        break;
      default:
        transformOrigin += 'left';
    }

    position.transformOrigin = transformOrigin;
    return position;
  }
}






toastDirective.$inject = ['$brTheme'];
function toastDirective($brTheme) {
  var directive = {
    restrict: 'E',
    template: '',
    link: link
  };
  return directive;


  function link(scope, element, attr) {
    $brTheme(element);
  }
}
}());
(function(){"use strict";angular
  .module('brMaterial')
  .directive('brToolbar', toolbarDirective);


function toolbarDirective() {
  var directive = {
    restrict: 'E'
  };
  return directive;
}
}());
(function(){"use strict";/**
 * @ngdoc module
 * @name tooltip
 */
angular
  .module('brMaterial')
  .directive('brTooltip', brTooltipDirective);




/**
  * @ngdoc directive
  * @name brTooltip
  * @module tooltip
  *
  * @description
  * The `<br-ttooltip>` directive can attact to any element. just place it inside of the element you want it to ativate on
  *
  *
  * @param {boolean=} [br-visible] - show/hide tooltip
  * @param {number=} [br-delay=300] - delay for hidding the tooltip in millaseconds.
  * @param {boolean=} [br-autohide=true] - DEFAULT: true. automatically hide on mouse exit
  * @param {string=} [br-position] - use "top", "left", "right" to change the position of the tooltip
  *
  * - "right top"
  * - "left top"
  * - "right bottom"
  * - "left bottom"
  *
  * @usage
  * <hljs lang="html">
  * <br-button>
  *   Button Label
  *   <br-tooltip>Tooltip Title</br-tooltip>
  * </br-button>
  * </hljs>
  */

brTooltipDirective.$inject = ['$brTheme', '$$rAF', '$brUtil', '$animate', '$q', '$timeout', '$window', '$rootElement', '$document'];
function brTooltipDirective ($brTheme, $$rAF, $brUtil, $animate, $q, $timeout, $window, $rootElement, $document) {
  var TOOLTIP_SHOW_DELAY = 300;
  var TOOLTIP_WINDOW_EDGE_SPACE = 8;

  var directive = {
    restrict: 'E',
    transclude: true,
    priority: 210,
    template: '<div class="br-background"></div>'+
              '<div class="br-content" ng-transclude></div>',
    scope: {
      visible: '=?brVisible',
      delay: '=?brDelay',
      autohide: '=?brAutohide'
    },
    link: link
  };
  return directive;


  function link (scope, element, attr) {
    $brTheme(element);

    var parent = getParentWithPointerEvents();
    var background = angular.element(element[0].getElementsByClassName('br-background')[0]);
    var content = angular.element(element[0].getElementsByClassName('br-content')[0]);
    var direction = attr.brPosition;
    var current = getNearestContentElement();
    var tooltipParent = angular.element(current || document.body);
    var debouncedOnResize = $$rAF.throttle(function () { if (scope.visible) positionTooltip(); });


    setDefaults();
    manipulateElement();
    bindEvents();
    configureWatchers();



    function setDefaults() {
      if (!angular.isDefined(attr.brDelay)) scope.delay = TOOLTIP_SHOW_DELAY;
    }

    function manipulateElement() {
      element.detach();
      element.attr('role', 'tooltip');
    }


    function bindEvents() {
      var mouseActive = false;

      var ngWindow = angular.element($window);

      if (parent[0] && 'MutationObserver' in $window) {
        var attributeObserver = new MutationObserver(function(mutations) {
          if (mutations.some(function (mutation) {
              return (mutation.attributeName === 'disabled' && parent[0].disabled);
            })) {
              $timeout(function() {
                setVisible(false);
              }, 0);
          }
        });

        attributeObserver.observe(parent[0], { attributes: true});
      }

      // Store whether the element was focused when the window loses focus.
      var windowBlurHandler = function() {
        elementFocusedOnWindowBlur = document.activeElement === parent[0];
      };
      var elementFocusedOnWindowBlur = false;

      function windowScrollHandler() {
        setVisible(false);
      }

      ngWindow.on('blur', windowBlurHandler);
      ngWindow.on('resize', debouncedOnResize);
      document.addEventListener('scroll', windowScrollHandler, true);
      scope.$on('$destroy', function() {
        ngWindow.off('blur', windowBlurHandler);
        ngWindow.off('resize', debouncedOnResize);
        document.removeEventListener('scroll', windowScrollHandler, true);
        if (attributeObserver !== undefined) { attributeObserver.disconnect(); }
      });

      var enterHandler = function(e) {
        // Prevent the tooltip from showing when the window is receiving focus.
        if (e.type === 'focus' && elementFocusedOnWindowBlur) {
          elementFocusedOnWindowBlur = false;
          return;
        }
        parent.on('blur mouseleave touchend touchcancel', leaveHandler);
        setVisible(true);
      };
      var leaveHandler = function () {
        var autohide = scope.hasOwnProperty('autohide') ? scope.autohide : attr.hasOwnProperty('brAutohide');
        if (autohide || mouseActive || ($document[0].activeElement !== parent[0])) {
          parent.off('blur mouseleave touchend touchcancel', leaveHandler);
          parent.triggerHandler("blur");
          setVisible(false);
        }
        mouseActive = false;
      };

      // to avoid `synthetic clicks` we listen to mousedown instead of `click`
      parent.on('mousedown', function() { mouseActive = true; });
      parent.on('focus mouseenter touchstart', enterHandler);
    }


    function configureWatchers () {
      scope.$on('$destroy', function() {
        scope.visible = false;
        element.remove();
        angular.element($window).off('resize', debouncedOnResize);
      });
      scope.$watch('visible', function (isVisible) {
        if (isVisible) showTooltip();
        else hideTooltip();
      });
    }



    function setVisible (value) {
      setVisible.value = !!value;
      if (!setVisible.queued) {
        if (value) {
          setVisible.queued = true;
          $timeout(function() {
            scope.visible = setVisible.value;
            setVisible.queued = false;
          }, scope.delay);
        } else {
          $brUtil.nextTick(function() { scope.visible = false; });
        }
      }
    }


    function getParentWithPointerEvents () {
      var parent = element.parent();
      while (hasComputedStyleValue('pointer-events', 'none', parent)) {
        parent = parent.parent();
      }
      return parent;
    }



    function getNearestContentElement () {
      var current = element.parent()[0];
      while (current && current !== $rootElement[0] && current !== document.body) {
        current = current.parentNode;
      }
      return current;
    }

    function hasComputedStyleValue(key, value, target) {
      var hasValue = false;

      if ( target && target.length  ) {
        var computedStyles = $window.getComputedStyle(target[0]);
        hasValue = angular.isDefined(computedStyles[key]) && (value ? computedStyles[key] == value : true);
      }

      return hasValue;
    }


    function showTooltip() {
      // Insert the element before positioning it, so we can get the position
      // and check if we should display it
      tooltipParent.append(element);

      // Check if we should display it or not.
      // This handles hide-* and show-* along with any user defined css
      if ( hasComputedStyleValue('display','none') ) {
        scope.visible = false;
        element.detach();
        return;
      }

      positionTooltip();
      angular.forEach([element, background, content], function (element) {
        $animate.addClass(element, 'br-show');
      });
    }

    function hideTooltip() {
        var promises = [];
        angular.forEach([element, background, content], function (it) {
          if (it.parent() && it.hasClass('br-show')) {
            promises.push($animate.removeClass(it, 'br-show'));
          }
        });

        $q.all(promises)
          .then(function () {
            if (!scope.visible) element.detach();
          });
    }


    function positionTooltip() {
      var tipRect = $brUtil.offsetRect(element, tooltipParent);
      var parentRect = $brUtil.offsetRect(parent, tooltipParent);
      var newPosition = getPosition(direction);

      // If the user provided a direction, just nudge the tooltip onto the screen
      // Otherwise, recalculate based on 'top' since default is 'bottom'
      if (direction) {
        newPosition = fitInParent(newPosition);
      } else if (newPosition.top > element.prop('offsetParent').scrollHeight - tipRect.height - TOOLTIP_WINDOW_EDGE_SPACE) {
        newPosition = fitInParent(getPosition('top'));
      }

      element.css({top: newPosition.top + 'px', left: newPosition.left + 'px'});

      positionBackground();

      function positionBackground () {
        var size = direction === 'left' || direction === 'right' ? Math.sqrt(Math.pow(tipRect.width, 2) + Math.pow(tipRect.height / 2, 2)) * 2
              : Math.sqrt(Math.pow(tipRect.width / 2, 2) + Math.pow(tipRect.height, 2)) * 2,
            position = direction === 'left' ? { left: 100, top: 50 }
              : direction === 'right' ? { left: 0, top: 50 }
              : direction === 'top' ? { left: 50, top: 100 }
              : { left: 50, top: 0 };
        background.css({
          width: size + 'px',
          height: size + 'px',
          left: position.left + '%',
          top: position.top + '%'
        });
      }

      function fitInParent (pos) {
        var newPosition = { left: pos.left, top: pos.top };
        newPosition.left = Math.min( newPosition.left, tooltipParent.prop('scrollWidth') - tipRect.width - TOOLTIP_WINDOW_EDGE_SPACE );
        newPosition.left = Math.max( newPosition.left, TOOLTIP_WINDOW_EDGE_SPACE );
        newPosition.top  = Math.min( newPosition.top,  tooltipParent.prop('scrollHeight') - tipRect.height - TOOLTIP_WINDOW_EDGE_SPACE );
        newPosition.top  = Math.max( newPosition.top,  TOOLTIP_WINDOW_EDGE_SPACE );
        return newPosition;
      }

      function getPosition (dir) {
        return dir === 'left' ? { left: parentRect.left - tipRect.width - TOOLTIP_WINDOW_EDGE_SPACE,
              top: parentRect.top + parentRect.height / 2 - tipRect.height / 2 }
          : dir === 'right' ? { left: parentRect.left + parentRect.width + TOOLTIP_WINDOW_EDGE_SPACE,
              top: parentRect.top + parentRect.height / 2 - tipRect.height / 2 }
          : dir === 'top' ? { left: parentRect.left + parentRect.width / 2 - tipRect.width / 2,
              top: parentRect.top - tipRect.height - TOOLTIP_WINDOW_EDGE_SPACE }
          : { left: parentRect.left + parentRect.width / 2 - tipRect.width / 2,
              top: parentRect.top + parentRect.height + TOOLTIP_WINDOW_EDGE_SPACE };
      }
    }

  }
}
}());