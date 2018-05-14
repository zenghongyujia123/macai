/**
 * Created by zenghong on 16/4/21.
 */
'use strict';

cSite.controller('MaterialDialogSingleInputController', ['input_params', '$scope', '$mdDialog',
  function (input_params, $scope, $mdDialog) {

    $scope.dialogInfo = {
      title: input_params.title,
      input_label: input_params.input_label,
      input_value: input_params.input_value || '',
      confirm_label: input_params.confirm_label ,
      input_type: input_params.input_type || 'string'
    };

    $scope.hide = function () {
      $mdDialog.hide();
    };

    $scope.cancel = function () {
      $mdDialog.cancel();
    };

    $scope.sure = function () {
      if (!$scope.dialogInfo.input_value) {
        return;
      }

      $mdDialog.hide($scope.dialogInfo.input_value);
    };
  }]);
