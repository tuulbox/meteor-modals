

Package.describe({
  summary:  "Modals and dialogs: the Meteor way",
  name:     "tuul:modals",
  version:  "0.4.5",
  git:      "https://github.com/tuulbox/meteor-modals",
});

Package.onUse(function (api, where) {
  api.versionsFrom('0.9.1.1');
  api.use(['deps', 'underscore', 'templating', 'spacebars', 'ui'], 'client');

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







