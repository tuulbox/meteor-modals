

Package.describe({
  summary:  "Modals and dialogs: the Meteor way",
  name:     "tuul:modals",
  version:  "0.4.7",
  git:      "https://github.com/tuulbox/meteor-modals",
});

Package.onUse(function (api, where) {
  api.versionsFrom('1.2');
  api.use('templating', 'client');
  api.use('jquery', 'client');
  api.use('underscore', 'client');
  api.use('ecmascript');

  api.export('AntiModals', 'client');

  api.addFiles([
    'client/index.js',

    'client/overlay.js',
    'client/dropDown.js',
    'client/alert.html',
    'client/alert.js',
    'client/alert.css',
    'client/displayAlert.js',

  ], 'client');

});







