(function() {
  this.Images = (function() {
    function Images(el) {
      var i, image, images, len;
      this.el = el;
      this.$el = $(this.el);
      this.$container = $('.items', this.$el);
      this.$form = this.$el.closest('form');
      this.$container.on('click', '.remove', this.removeImage.bind(this));
      if ((images = this.$el.data('items')).length > 0) {
        for (i = 0, len = images.length; i < len; i++) {
          image = images[i];
          this.renderImage(image);
        }
      }
      this.$form.after("<input id='fileupload' multiple='true' type='file' hidden />");
      $('.addFile', this.$el).on('click', function() {
        return $('#fileupload').trigger('click');
      });
      $('#fileupload').fileupload({
        url: '/admin/images.json',
        type: 'POST',
        dataType: 'json',
        done: (function(_this) {
          return function(e, data) {
            return _this.renderImage(JSON.parse(data.jqXHR.responseText));
          };
        })(this)
      });
      this.$container.sortable();
    }

    Images.prototype.renderImage = function(image) {
      return this.$container.append(this.template(image));
    };

    Images.prototype.resourceName = function() {
      return this.resName || (this.resName = this.$el.closest('form').attr('action').split('/')[2].replace(/s([^s]*)$/, ""));
    };

    Images.prototype.removeImage = function(e) {
      var image;
      image = $(e.target).parent();
      return $.ajax({
        type: "DELETE",
        url: "/admin/images/" + (image.data('image-id')),
        success: function() {
          return image.remove();
        }
      });
    };

    Images.prototype.template = function(image) {
      return "<div class='image' data-image-id=" + image.id + ">\n  <img src='" + image.file + "'>\n  <a class='remove'></a>\n  <input type='hidden' name='" + (this.resourceName()) + "[images][][id]' value='" + image.id + "'>\n  <input type='text' name='" + (this.resourceName()) + "[images][][caption]' value='" + (image.caption || "") + "' placeholder='Подпись'>\n</div>";
    };

    return Images;

  })();

  $(function() {
    return $('form .images').each(function() {
      return new Images(this);
    });
  });

}).call(this);
