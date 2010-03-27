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
    
    
    

    $(e).after('<div id="timeslider"></div>');
    $('#timeslider').hide();
    
    buildMonth(e, config);
    buildDay(e, config);
    buildYear(e, config);
    buildHour(e, config);
    buildMinute(e, config);
    buildMeridian(e, config);
    
    

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
    var minute = $('#timeslider-minute').slider("option", "value") * 5
    var meridian = meridians[$('#timeslider-meridian').slider("option", "value")];
    var time = month + " " + day + ", " + year + " " + hour + ":" + minute + " " + meridian;
    //console.log(time);
    $(e).val(time);
    
  };
  
  function buildYear(e, config){
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
    $('#timeslider #timeslider-year ul').css("top", "-320px"); // -((# of objects * 20) - 80
    
    $('#timeslider-year').slider({ 
      orientation: "vertical", min: 2000, max: 2019, animate: "slow",
      stop: function(event, ui) {
        updateInput(e, config);
      }
    });
  }
  
  function buildMonth(e, config){
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthList = [];
    monthList = $.map(months, function(value){
      return "<li>"+ value + "</li>";
    });
    
    $('#timeslider').append('<div class="timerslider-viewport ui-widget ui-corner-all ui-widget-content"><div class="timeslider-slider" id="timeslider-month"></div></div>');
    $('#timeslider #timeslider-month').append("<div class='ui-slider-handle'><ul></ul></div>");
    $.each(monthList, function(index, value){
      $('#timeslider #timeslider-month ul').append(value);
    });
    
    
    $('#timeslider-month').slider({ 
      orientation: "vertical", min: 0, max: 11, animate: "slow",
      stop: function(event, ui) {
      	updateInput(e, config);
      	if( ui.value == 2 ){
      	  $('#timeslider-day').slider("option", "max", 28);
      	} else {
      	  $('#timeslider-day').slider("option", "max", 31);
      	}

      }
    });
  }
  
  function buildDay(e, config){
    $('#timeslider').append('<div class="timerslider-viewport ui-widget ui-corner-all ui-widget-content"><div class="timeslider-slider" id="timeslider-day"></div></div>');
    $('#timeslider #timeslider-day').append("<div class='ui-slider-handle'><ul></ul></div>");
    //$('#timeslider #timeslider-month ul').addClass('ui-slider-handle')
    var dayRange = [];
    for (var i=1;i<=31;i++) {
      dayRange.push(i);
    };
    //console.log(yearRange);
    $.each(dayRange, function(index, value){
      $('#timeslider #timeslider-day ul').append("<li>" + value + "</li>");
    });
    
    
    $('#timeslider-day').slider({ 
      orientation: "vertical", min: 1, max: 31,
      stop: function(event, ui) {
        updateInput(e, config);
      }
    });
    
    $('#timeslider #timeslider-day').height("600px"); // (# of object * 20) - 20
    $('#timeslider #timeslider-day ul').css("top", "-540px"); // -((# of objects * 20) - 60
  }
  
  function buildHour(e, config){
    $('#timeslider').append('<div class="timerslider-viewport ui-widget ui-corner-all ui-widget-content"><div class="timeslider-slider" id="timeslider-hour"></div></div>');
    $('#timeslider #timeslider-hour').append("<div class='ui-slider-handle'><ul></ul></div>");
    
    var hourRange = [];
    for (var i=1;i<=12;i++) {
      hourRange.push(i);
    };
    
    $('#timeslider-hour').slider({ 
      orientation: "vertical", min: 1, max: 12,
      stop: function(event, ui) {
        updateInput(e, config);
      }
    });
    
    $.each(hourRange, function(index, value){
      $('#timeslider #timeslider-hour ul').append("<li>" + value + "</li>");
    });
    
    $('#timeslider #timeslider-hour').height("220px"); // (# of object * 20) - 20
    $('#timeslider #timeslider-hour ul').css("top", "-160px"); // -((# of objects * 20) - 80
  }
  
  function buildMinute(e, config){
    $('#timeslider').append('<div class="timerslider-viewport ui-widget ui-corner-all ui-widget-content"><div class="timeslider-slider" id="timeslider-minute"></div></div>');
    $('#timeslider #timeslider-minute').append("<div class='ui-slider-handle'><ul></ul></div>");
    
    var minuteRange = [];
    for (var i=0;i<=55;i=i+5) {
      minuteRange.push(i);
    };
    
    $('#timeslider-minute').slider({ 
      orientation: "vertical", min: 0, max: 11,
      stop: function(event, ui) {
        updateInput(e, config);
      }
    });
    
    $.each(minuteRange, function(index, value){
      $('#timeslider #timeslider-minute ul').append("<li>" + value + "</li>");
    });
    
    $('#timeslider #timeslider-minute').height("220px"); // (# of object * 20) - 20
    $('#timeslider #timeslider-minute ul').css("top", "-160px"); // -((# of objects * 20) - 80
  }
  
  function buildMeridian(e, config){
    var meridians = ["am", "pm"];
    
    $('#timeslider').append('<div class="timerslider-viewport ui-widget ui-corner-all ui-widget-content" id="timerslider-meridian-viewport"><div class="timeslider-slider" id="timeslider-meridian"></div></div>');
    $('#timeslider #timeslider-meridian').append("<div class='ui-slider-handle'><ul></ul></div>");
    
    
    $('#timeslider-meridian').slider({ 
      orientation: "vertical", min: 0, max: 1,
      stop: function(event, ui) {
        updateInput(e, config);
      }
    });
    
    $.each(meridians, function(index, value){
      $('#timeslider #timeslider-meridian ul').append("<li>" + value + "</li>");
    });
    
    $('#timeslider #timeslider-meridian').height("20px"); // (# of object * 20) - 20
    $('#timeslider #timeslider-meridian ul').css("top", "20px"); // -((# of objects * 20) - 80
  }
})(jQuery);