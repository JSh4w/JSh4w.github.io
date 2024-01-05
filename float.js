$.ajax({
    type: "POST",
    url: "~/floating_point.py",
    data: { param: ew,mw,h }
  }).done(function( o ) {
     // do something
  });