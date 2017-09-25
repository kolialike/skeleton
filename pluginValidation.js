(function( $ ){
    var validationRules = {
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
    $.fn.validateInit = function() {
        // validateInit : function () {
        $("input:not([type='submit'], [type='file'])").each(function(index, el) {
            $(this).on('keyup change blur', function() {
                if($(this).prop("required")){
                    console.log("required");
                    if($(this)[0].type == "email"){
                        ValidateAction.change($(this), validationRules.rulesEmail);
                    }else if($(this)[0].type == "text"){
                        ValidateAction.change($(this), validationRules.rulesText);
                    }else if($(this)[0].type == "name"){
                        ValidateAction.change($(this), validationRules.rulesName);
                    }else if($(this)[0].type == "tel"){
                        ValidateAction.change($(this), validationRules.rulesPhone);
                    }else{
                        console.log("another-type");
                    }

                }else{
                    console.log("not-required");
                }
            });
        });
        $(document).on('click','input[type="submit"]', function(el) {
            if ($(el.target).closest('form').length){
                console.log("123");
                $(this).parents("form").find("input:not([type='submit'], [type='file'])").each(function() {
                    $(this).trigger('keyup');
                    if( $(this).hasClass("disabled") || $(this).parents("form").hasClass('not-valid') ) {
                        $(this).parents("form").submit(function(){
                            return false
                        });
                    }else{
                        console.log("form is send");
                    }
                });
            }

        });
    };
})( jQuery );


$('form').validateInit();