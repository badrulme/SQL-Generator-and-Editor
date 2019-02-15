
$('.btn').on('click', function() {
  alert("tesr");
    var $this = $(this);
  $this.button('loading');
    setTimeout(function() {
       $this.button('reset');
   }, 1000);
});