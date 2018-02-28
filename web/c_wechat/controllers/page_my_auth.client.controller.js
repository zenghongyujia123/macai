$(function () {
  var info = {
    personal_auth_stauts: 'authing',
    personal_auth_id_front_photo: '',
    personal_auth_id_back_photo: '',
    personal_auth_id_real_photo: '',
    personal_auth_real_name: '',
    personal_auth_id_number: ''
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

  $('.submit').click(function () {
    info.personal_auth_id_number = $('.personal_auth_id_number').val();
    info.personal_auth_real_name = $('.personal_auth_real_name').val();

    if (!info.personal_auth_id_front_photo) {
      return $.toast("请拍摄身份证正面", "text");
    }
    if (!info.personal_auth_id_back_photo) {
      return $.toast("请拍摄身份证背面", "text");
    }
    if (!info.personal_auth_id_real_photo) {
      return $.toast("请拍摄手持身份证照片", "text");
    }
    if (!info.personal_auth_real_name) {
      return $.toast("请输入真实姓名", "text");
    }
    if (!info.personal_auth_id_number) {
      return $.toast("请输入身份证号", "text");
    }
    $.ajax({
      url: '/api_wechat/auth/update_personal_auth_info',
      method: 'post',
      data: info,
      success: function (data) {
        if (data.err) {
          return $.toast(data.err.message, "text");
        }
        window.location = window.location;
      }
    });
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