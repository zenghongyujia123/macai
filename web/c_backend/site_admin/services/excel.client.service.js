/**
 * Created by louisha on 15/11/30.
 */

'use strict';
cSite.factory('ExcelService',
  [function () {

    function to_json(workbook) {
      var result = {};
      workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if (roa.length > 0) {
          result[sheetName] = roa;
        }
      });
      return result;
    }

    function checkIsOurTemplate(sheet, sheetColumn, callback) {
      if (!sheet) {
        return callback(false);
      }
      for (var index = 0; index < sheetColumn.length; index++) {
        var column = sheetColumn[index].key;

        if (column) {
          var columnName = sheet[column].v;
          if (columnName !== sheetColumn[index].value) {
            return callback(false);
          }
        }
        else {
          return callback(false);
        }
      }

      return callback(true);
    }

    function generateData(workbook, callback, sheetName) {
      var jsonResult = to_json(workbook);
      var xlsSheetArray = jsonResult[sheetName || workbook.SheetNames[0]];
      //var jsonResultString = JSON.stringify(xlsSheetArray);
      if (xlsSheetArray && xlsSheetArray.length > 0) {
        xlsSheetArray.forEach(function (item) {
          for (var prop in item) {
            if (typeof item[prop] === 'string') {
              item[prop] = item[prop].trim();
            }
          }
        });
        return callback(null, xlsSheetArray);
      }
      else {
        return callback('无数据', null);
      }
    }

    function saveExcelFile(fileName, sheets) {
      var workBook = new Workbook();
      workBook.SheetNames = sheets.map(function (item) {
        return item.name;
      });

      for (var i = 0, l = sheets.length; i < l; i++) {
        workBook.Sheets[sheets[i].name] = sheet_from_array_of_arrays(sheets[i].data);
      }

      var outBinaryData = XLSX.write(workBook, { bookType: 'xlsx', bookSST: false, type: 'binary' });
      saveAs(new Blob([s2ab(outBinaryData)], { type: 'application/octet-stream' }), fileName);
    }

    function ExcelColumnConfig() {
      this.col_index = 0;
      this.getNextColumnName = function () {
        this.col_index++;
        return this.getCurrentColumnName();
      };
      this.getCurrentColumnName = function () {
        var s = '', col = this.col_index;
        for (++col; col; col = Math.floor((col - 1) / 26)) {
          s = String.fromCharCode(((col - 1) % 26) + 65) + s;
        }
        return s;
      };
      this.reset = function () {
        this.col_index = 0;
      };
      this.setCodeString = function (codeString) {
        var codeArr = (codeString || '').toString().split('');
        if (codeArr.length === 0) {
          return this.reset();
        }
        var num = 0;
        for (var i = 0; i < codeArr.length; i++) {
          num += (codeArr[i].charCodeAt() - 65 + 1) * Math.pow(26, codeArr.length - i - 1);
        }
        this.col_index = num - 1;
      };
    }


    return {
      generateDataByExcelFile: function (file, sheetOrder, callback) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;

          var workbook = XLSX.read(data, { type: 'binary' });
          if (workbook.SheetNames.length <= 0) {
            return callback('无数据');
          }
          if (sheetOrder) {
            checkIsOurTemplate(workbook.Sheets[workbook.SheetNames[0]], sheetOrder, function (isTrue) {
              if (!isTrue) {
                return callback('请使用正确的模版');
              }
              else {
                generateData(workbook, function (err, data) {
                  return callback(err, data);
                });
              }

            });
          }
          else {
            generateData(workbook, function (err, data) {
              return callback(err, data);
            });
          }
        };

        reader.readAsBinaryString(file);
      },
      readExcel: function (file, callback) {
        if (!file || !file.name) {
          return callback('请选择文件');
        }

        var suffix_file = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
        if (suffix_file !== 'xls' && suffix_file !== 'xlsx') {
          return callback('请选择文件');
        }

        var reader = new FileReader();
        reader.onload = function (e) {
          var data = e.target.result;

          var workbook = XLSX.read(data, { type: 'binary' });
          if (workbook.SheetNames.length <= 0) {
            return callback('没有数据');
          }

          return callback(null, workbook);
        };

        reader.readAsBinaryString(file);
      },
      getExcelHeader: function (workbook, callback, sheetName) {
        var sheet = workbook.Sheets[sheetName || workbook.SheetNames[0]];
        if (!sheet) {
          return callback('请使用正确的模版');
        }

        var header = [];
        var letterRegex = /[A-Z]+/;
        for (var prop in sheet) {
          if (prop.slice(-1) === '1') {
            var letterCode = prop.substr(-2, 1);
            if (letterRegex.test(letterCode)) {
              header.push(sheet[prop].v);
            }
          }
        }
        return callback(null, header);
      },
      getExcelData: function (workbook, callback, sheetName) {
        return generateData(workbook, callback, sheetName);
      },
      saveExcelFile: saveExcelFile,
      ExcelColumnConfig: ExcelColumnConfig
    };

  }]);
