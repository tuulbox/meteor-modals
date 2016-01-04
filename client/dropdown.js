

/*
 # options

 data
 callback
 divClass
 overlayClass

 */



AntiModals.dropDown = function(template, options, callback) {
  if(arguments.length === 2 && typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  callback = callback || options.callback;


  var dropDown = document.createElement('div');
  var $dropDown = $(dropDown);
  $dropDown.addClass('anti-modal-drop-down');


  if(options.dropDownClass) {
    if(typeof options.dropDownClass === 'string') {
      $dropDown.addClass(options.dropDownClass);
    }
  }
  if(options.dropDownStyle) {
    $dropDown.css(options.dropDownStyle);
  }

  $dropDown.hide();

  dropDown.__antiModalsView = Blaze.renderWithData(Template[template], options.data, dropDown);

  $dropDown.find('.anti-modal-closer').click(function(event) {
    AntiModals.dismissDropDown(dropDown);
  });

  dropDown.__antiModalsCallback = callback;
  $('body').append(dropDown);

  if(options.animateIn) {
    options.animateIn(dropDown);
  } else {
    $dropDown.fadeIn({
      duration: 300,
      complete: function () {
        if(!options.modal) {
          $('body').on('click', function(evnet) {
            if (!$.contains($dropDown[0], event.target)) {
              AntiModals.dismissDropDown(dropDown);
            }
          });
        }
      },
    });
  }

  if(options.animateOut) dropDown.__antiModalsAnimateOut = options.animateOut;
  return dropDown;
};



AntiModals.dismissDropDown = function(element, error, data) {
  /* Get overlay */
  var $dropDown = $(element).closest('.anti-modal-drop-down');

  if(!$dropDown || !$dropDown.get() || !$dropDown.get()[0]) return;

  var dropDownDiv = $dropDown.get()[0];


  /* Callback */
  if(dropDownDiv.__antiModalsCallback) {
    dropDownDiv.__antiModalsCallback(error, data);
  }

  /* Dismiss */
  if(dropDownDiv.__antiModalsAnimateOut) {
    dropDownDiv.__antiModalsAnimateOut(dropDownDiv, function() {
      Blaze.remove(dropDownDiv.__antiModalsView);
      $dropDown.remove();
    });
  } else {
    $dropDown.fadeOut({
      duration: 300,
      complete: function () {
        Blaze.remove(dropDownDiv.__antiModalsView);
        $dropDown.remove();
        $('body').off();
      },
    });
  }
};