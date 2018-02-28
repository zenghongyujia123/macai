$(function () {
  var info = {
    personal_auth_id_front_photo: '',
    personal_auth_id_back_photo: '',
    personal_auth_id_real_photo: '',
  }

  $('#add_personal_auth_id_front_photo').click(function () {
    takeCamera(function (localIds) {
      localIds.forEach(function (localId) {
        appendImage(localId, 'personal_auth_id_front_photo');
      });
    })
  });
  $('#add_personal_auth_id_back_photo').click(function () {
    takeCamera(function (localIds) {
      localIds.forEach(function (localId) {
        appendImage(localId, 'personal_auth_id_back_photo');
      });
    })
  });
  $('#add_personal_auth_id_real_photo').click(function () {
    takeCamera(function (localIds) {
      localIds.forEach(function (localId) {
        appendImage(localId, 'personal_auth_id_real_photo');
      });
    })
  });

  // var photoContainer = $('#uploaderFiles');
  function appendImage(localId, prop) {
    uploadImage(localId, function (res) {
      info[prop] = res.serverId;
      // wechat_server_ids.push(res.serverId)
      var imageItem = $(
        '<li class="weui-uploader__file"><img style="width:100%;height:100%;" src="' + localId + '" /></li>'
      );
      $('#' + prop + '_container').append(imageItem);
      // photoContainer.append();
    })
  }

  getUserJsApiTicket(window.location.href, function (data) {

  });
});