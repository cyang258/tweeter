$ (document).ready(function() {
  $("textarea").on("keyup",function(event){
    var max = 140;
    var len = $(this).val().length;

    if (event.which < 0x20) {
      return;
    }

    if (len >= max) {
      $(this).parent().children(".counter").css("color","red");
      event.preventDefault();
    }


  });

  $('textarea').keyup(function (event) {
    var max = 140;
    var len = $(this).val().length;
    var char = max - len;

    $(this).parent().children(".counter").text(char);

  });

  $('textarea').keydown(function (evenet) {
    var max =140;
    var len = $(this).val().length;
    if (len <= max) {
      $(this).parent().children(".counter").css("color","black");
    };
  })
});