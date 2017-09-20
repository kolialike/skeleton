// Validation by input type
<form action="#" novalidate>
<input type="text" placeholder="name" required>
<input type="email" placeholder="Email" required>
<input type="tel" placeholder="telephone" required>
<input type="text" placeholder="text" required>
<input type="submit">
    </form>


function validateEmail(email) {
    var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return pattern.test(email);
};

function validateName(name) {
    var pattern = /^[( )A-Za-zА-Яа-яЁё0-9_-]{3,25}$/;
    return pattern.test(name);
};

function validatePhone(phone) {
    var pattern = /^[( )0-9]{9,11}$/;
    return pattern.test(phone);
};

function validateText(text) {
    if(text.length <= 3){
        return false;
    }else{
        return true;
    }
};

function checkOnChange($this, validate) {
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
};

$( document ).ready(function() {
    InitSlider();
    $("input:not([type='submit'], [type='file'])").each(function(index, el) {
        $(this).on('keyup change blur', function() {
            if($(this).prop("required")){
                console.log("required");
                if($(this)[0].type == "email"){
                    checkOnChange($(this), validateEmail);
                }else if($(this)[0].type == "text"){
                    checkOnChange($(this), validateText);
                }else if($(this)[0].type == "name"){
                    checkOnChange($(this), validateName);
                }else if($(this)[0].type == "tel"){
                    checkOnChange($(this), validatePhone);
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

});

// Validation by input type End










// Validation by Class
<form action="#" novalidate>
<input type="text" class="input-name-js" placeholder="name">
    <input type="email" class="input-email-js" placeholder="Email">
    <input type="tel" class="input-phone-js" placeholder="telephone">
    <input type="text" class="input-text-js" placeholder="text">
    <input type="submit" class="btn_submit-js">
    </form>
function validateEmail(email) {
    var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return pattern.test(email);
};

function validateName(name) {
    var pattern = /^[( )A-Za-zА-Яа-яЁё0-9_-]{3,25}$/;
    return pattern.test(name);
};

function validatePhone(phone) {
    var pattern = /^[( )0-9]{9,11}$/;
    return pattern.test(phone);
};

function validateText(text) {
    if(text.length <= 2){
        return false;
    }else{
        return true;
    }
};

function checkOnChange($inputclassjs, validate) {
    $($inputclassjs).on("keyup change blur", function () {
        var name = $(this).val();
        if (!validate(name)) {
            $(this).addClass('disabled');
            $(this).removeClass('success');
            $(this).parents("form").addClass('not-valid');
        }
        else {
            $(this).removeClass('disabled');
            $(this).addClass('success');
            $(this).parents("form").removeClass('not-valid');
        }
    });
};

checkOnChange('.input-name-js', validateName);
checkOnChange('.input-phone-js', validatePhone);
checkOnChange('.input-email-js', validateEmail);
checkOnChange('.input-text-js', validateText);

$(document).on('click','.btn_submit-js', function(evt) {

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


});
// Validation by Class End