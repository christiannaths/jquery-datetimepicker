(function($) {
  $.timeslider = {
    defaults: {
      // defaults here
    }
  };
  
  $.fn.extend({
    timeslider:function(config, fileNames) {
      var config = $.extend({}, $.timeslider.defaults, config);
      
      //console.log(this.selector); ///////
      build(this, config)
      this.focus(function(){ show(this, config) });
      return this;
    }
  });
  
  function build(e, config){
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var meridians = ["am", "pm"];
    var monthList = [];
    monthList = $.map(months, function(value){
      return "<li>"+ value + "</li>";
    });
    
    // YEARS
    $(e).after('<div id="timeslider"></div>');
    $('#timeslider').hide();
    $('#timeslider').append('<div class="timerslider-viewport ui-widget ui-corner-all ui-widget-content"><div class="timeslider-slider" id="timeslider-year"></div></div>');
    $('#timeslider #timeslider-year').append("<div class='ui-slider-handle'><ul></ul></div>");
    
    var yearRange = [];
    for (var i=2000;i<=2019;i++) {
      yearRange.push(i);
    };
    //console.log(yearRange);
    $.each(yearRange, function(index, value){
      $('#timeslider #timeslider-year ul').append("<li>" + value + "</li>");
    });
    $('#timeslider #timeslider-year').height("380px"); // (# of object * 20) - 20
    $('#timeslider #timeslider-year ul').css("top", "-320px"); // -((# of objects * 20) - 60
    
    $('#timeslider-year').slider({ 
      orientation: "vertical", min: 2000, max: 2019, animate: "slow",
      slide: function(event, ui) {
        updateInput(e, config);
      }
    });
    
    
    // MONTHS
    //<span class="timerslider-selector"></span>
    $('#timeslider').append('<div class="timerslider-viewport ui-widget ui-corner-all ui-widget-content"><div class="timeslider-slider" id="timeslider-month"></div></div>');
    $('#timeslider #timeslider-month').append("<div class='ui-slider-handle'><ul></ul></div>");
    //$('#timeslider #timeslider-month ul').addClass('ui-slider-handle')
    $.each(monthList, function(index, value){
      $('#timeslider #timeslider-month ul').append(value);
    });
    
    
    $('#timeslider').append('<div class="timeslider-slider" id="timeslider-day"></div>');
    $('#timeslider').append('<div class="timeslider-slider" id="timeslider-hour"></div>');
    $('#timeslider').append('<div class="timeslider-slider" id="timeslider-minute"></div>');
    $('#timeslider').append('<div class="timeslider-slider" id="timeslider-meridian"></div>');


    
    
    $('#timeslider-month').slider({ 
      orientation: "vertical", min: 0, max: 11, animate: "slow",
      slide: function(event, ui) {
      	updateInput(e, config);
      	if( ui.value == 2 ){
      	  $('#timeslider-day').slider("option", "max", 28);
      	} else {
      	  $('#timeslider-day').slider("option", "max", 31);
      	}
      	//$('#timeslider #timeslider-month ul').css('bottom', $('#timeslider-month .ui-slider-handle').css('bottom'));
      	//console.log($('#timeslider-month .ui-slider-handle').css('bottom') + " -- " + $('#timeslider #timeslider-month ul').css('bottom'));
      }
    });
    
    
    
    // DAYS
    
    $('#timeslider-day').slider({ 
      orientation: "vertical", min: 1, max: 31,
      slide: function(event, ui) {
        updateInput(e, config);
      }
    });
    $('#timeslider-hour').slider({ 
      orientation: "vertical", min: 1, max: 12,
      slide: function(event, ui) {
        updateInput(e, config);
      }
    });
    $('#timeslider-minute').slider({ 
      orientation: "vertical", min: 0, max: 59,
      slide: function(event, ui) {
        updateInput(e, config);
      }
    });
    $('#timeslider-meridian').slider({ 
      orientation: "vertical", min: 0, max: 1, step: 1,
      slide: function(event, ui) {
        updateInput(e, config);
      }
    });
    //console.log("built the widget"); ////////
    

  };
  
  function show(e, config){
    $('#timeslider').show();
  };
  
  function updateInput(e, config){
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var meridians = ["am", "pm"];
    
    
    var year = $('#timeslider-year').slider("option", "value")
    var month = months[$('#timeslider-month').slider("option", "value")];
    var day = $('#timeslider-day').slider("option", "value")
    var hour = $('#timeslider-hour').slider("option", "value")
    var minute = $('#timeslider-minute').slider("option", "value")
    var meridian = meridians[$('#timeslider-meridian').slider("option", "value")];
    var time = month + " " + day + ", " + year + " " + hour + ":" + minute + " " + meridian;
    //console.log(time);
    $(e).val(time);
    
  };
})(jQuery);