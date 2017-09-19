// function validateEmail(email) {
//     var pattern = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
//     return pattern.test(email);
// };
//
// function validateName(name) {
//     var pattern = /^[( )A-Za-zА-Яа-яЁё0-9_-]{3,25}$/;
//     return pattern.test(name);
// };
//
// function validatePhone(phone) {
//     var pattern = /^[( )0-9]{9,11}$/;
//     return pattern.test(phone);
// };
//
// function validateText(text) {
//     if(text.length <= 2){
//         return false;
//     }else{
//         return true;
//     }
// };
//
// function checkOnChange($inputclassjs, validate) {
//     $($inputclassjs).on("keyup change blur", function () {
//         var name = $(this).val();
//         if (!validate(name)) {
//             $(this).addClass('disabled');
//             $(this).removeClass('success');
//             $(this).parents("form").addClass('not-valid');
//         }
//         else {
//             $(this).removeClass('disabled');
//             $(this).addClass('success');
//             $(this).parents("form").removeClass('not-valid');
//         }
//     });
// };
//
// checkOnChange('.input-name-js', validateName);
// checkOnChange('.input-phone-js', validatePhone);
// checkOnChange('.input-email-js', validateEmail);
// checkOnChange('.input-text-js', validateText);
//
// $(document).on('click','.btn_submit-js', function(evt) {
//
//     function checkOnSubmit($inputclassjs, validate) {
//         var thisElement = $(".btn_submit-js").parents("form").find($inputclassjs);
//         if(thisElement.length > 0){
//             if(!validate(thisElement.val())) {
//                 thisElement.addClass('disabled');
//                 thisElement.removeClass('success');
//                 $(this).parents("form").addClass('not-valid');
//             }else {
//                 thisElement.removeClass('disabled');
//                 thisElement.addClass('success');
//                 $(this).parents("form").removeClass('not-valid');
//             }
//         }
//     }
//
//     checkOnSubmit('.input-name-js', validateName);
//     checkOnSubmit('.input-phone-js', validatePhone);
//     checkOnSubmit('.input-email-js', validateEmail);
//     checkOnSubmit('.input-text-js', validateText);
//
//     $(this).parents("form").find("input").each(function(index, el) {
//         if( $(this).hasClass("disabled") || $(this).parents("form").hasClass('not-valid') ) {
//             return false
//         }else{
//             // return true
//             console.log("form is send");
//         }
//     });
//
//
// });
//
