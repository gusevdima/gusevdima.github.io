(function() {
  $(document).on('ready page:load turbolinks:load', function() {
    return $('#active_admin_content .tabs').tabs();
  });

}).call(this);
