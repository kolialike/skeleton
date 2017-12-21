import $ from 'jquery';

(function($){
    'use strict';
    var validationRules = {
        rulesRequared : function ($this) {
            return $this.prop("required");
        },

        rulesEmail : function( email ) {
            var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            return pattern.test(email);
        },

        rulesName : function( name ) {
            var pattern = /^[( )A-Za-zА-Яа-яЁё0-9_-]{3,25}$/;
            return pattern.test(name);
        },

        rulesPhone : function( phone ) {
            var pattern = /^[( )0-9]{9,11}$/;
            return pattern.test(phone);
        },

        rulesText : function( text ) {
            if(text.length <= 3){
                return false;
            }else{
                return true;
            }
        },
    };
    var ValidateAction = {
        change : function($this, validate) {
            if (!validate($this.val()) && !$this.val().length <= 2) {
                $this.addClass('disabled');
                $this.removeClass('success');
                $this.parents("form").addClass('not-valid');
            }
            else {
                $this.removeClass('disabled');
                $this.addClass('success');
                $this.parents("form").removeClass('not-valid');
            }
        },
    };

    var inputType = {
        email : function($this){
            ValidateAction.change($this, validationRules.rulesEmail);
        },
        text : function($this){
            ValidateAction.change($this, validationRules.rulesText);
        },
        name : function($this){
            ValidateAction.change($this, validationRules.rulesName);
        },
        tel : function($this){
            ValidateAction.change($this, validationRules.rulesPhone);
        },
    };


    $.fn.validateInit = function() {
        // validateInit : function () {
        $("input:not([type='submit'], [type='file'])").each(function(index, el) {
            var thisel = $(this);
            thisel.on('keyup change blur', function() {
                if(validationRules.rulesRequared(thisel)){
                    console.log("required");
                    if(this.type == "email"){
                        inputType.email(thisel);
                    }else if(this.type == "text"){
                        inputType.text(thisel);
                    }else if(this.type == "name"){
                        inputType.name(thisel);
                    }else if(this.type == "tel"){
                        inputType.tel(thisel);
                    }else{
                        console.log("another-type");
                    }
                }else{
                    console.log("not-required");
                }
            });
        });
        $(document).on('click','input[type="submit"]', function(el) {
            var inputInForm = $(this).parents("form").find("input:not([type='submit'], [type='file'])");
            if ($(el.target).closest('form').length){
                inputInForm.each(function() {
                    $(this).trigger('keyup');
                });
                if( inputInForm.hasClass("disabled") || $('input').parents("form").hasClass('not-valid') ) {
                    $(this).parents("form").submit(function(){
                        return false
                    });
                }else{
                    console.log("form is send");
                }
            }

        });
    };
})( jQuery );

$('form').validateInit();

