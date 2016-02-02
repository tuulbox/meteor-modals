

/*
  # options

  data
  callback
  divClass
  overlayClass

*/



AntiModals.overlay = function(template, options, callback) {
  if(arguments.length === 2 && typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  callback = callback || options.callback;
  
  
  var overlay = document.createElement('div');
  var $overlay = $(overlay);
  $overlay.addClass('anti-modal-overlay');


  if(options.overlayClass) {
    if(typeof options.overlayClass === 'string') {
      $overlay.addClass(options.overlayClass);
    }
  }
  if(options.overlayStyle) {
    $overlay.css(options.overlayStyle);
  }

  $overlay.hide();

  overlay.__antiModalsView = Blaze.renderWithData(Template[template], options.data, overlay);
  
  if(!options.modal) {
    $overlay.click(function(e) {
      if(e.target === overlay)
        AntiModals.dismissOverlay(overlay);
    });
  }

  $overlay.find('.anti-modal-closer').click(function(e) {
    AntiModals.dismissOverlay(overlay);
  });

  overlay.__antiModalsCallback = callback;
  $('body').append(overlay);

  if(options.animateIn) {
    options.animateIn(overlay);
  } else {
    $overlay.fadeIn(300);  
  }

  if(options.animateOut) overlay.__antiModalsAnimateOut = options.animateOut;
  return overlay;
};



AntiModals.dismissOverlay = function(element, error, data) {
  /* Get overlay */
  var $overlay = $(element).closest('.anti-modal-overlay');

  if(!$overlay || !$overlay.get() || !$overlay.get()[0]) return;

  var overlayDiv = $overlay.get()[0];


  /* Callback */
  if(overlayDiv.__antiModalsCallback) {
    overlayDiv.__antiModalsCallback(error, data);
  }

  /* Dismiss */
  if(overlayDiv.__antiModalsAnimateOut) {
    overlayDiv.__antiModalsAnimateOut(overlayDiv, function() {
      Blaze.remove(overlayDiv.__antiModalsView);
      $overlay.remove();
    });
  } else {
    $overlay.fadeOut(300, function(){
      Blaze.remove(overlayDiv.__antiModalsView);
      $overlay.remove();
    });  
  }
  
};


AntiModals.dismissAll = function(closeDropDown, error, data) {
  $('.anti-modal-overlay').each(function() {
    AntiModals.dismissOverlay(this, error, data);
  });

  if (closeDropDown) {
    $('.anti-modal-drop-down').each(function () {
      AntiModals.dismissDropDown(this, error, data);
    });
  }
};




