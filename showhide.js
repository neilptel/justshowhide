var showhide = function () {
    //Register events
    registerChangeEventForRadioButtons();
    if (typeof ddlShowHideConfiguration != "undefined")
        ddlShowHideConfiguration.config.forEach(registerChangeEventForDdls);

    function registerChangeEventForRadioButtons() {

        $('input[type=radio][data-showdivid],[data-hidedivid]').change(showHideOnRadioChanged);
    }

    function registerChangeEventForDdls(item) {
        $('select[id=' + item.ddlId + ']').change(function () { return showHideOnDdlChanged(item); });
    }


    function showHideOnRadioChanged() {
        var $radio = $(this)
        var show_divSelector = $radio.data('showdivid');
        var hide_divSelector = $radio.data('hidedivid');

        var idOfSelectedItem = $('input:radio[id="' + this.id + '"]:checked').attr('id');

        if (this.id === idOfSelectedItem)
            showHideDivs(show_divSelector, hide_divSelector);

        $(show_divSelector).removeClass("input-validation-error");
        $(hide_divSelector).removeClass("input-validation-error");
    }

    function showHideDivs(show_divSelector, hide_divSelector) {
        $(show_divSelector).show();
        $(show_divSelector).find('input:radio').trigger('change');
        $(hide_divSelector).hide();
        $(hide_divSelector).find('input:radio').prop('checked', false);
        $(hide_divSelector).find('input:radio').trigger('change');
        $(hide_divSelector).find('input:text').val('');
	$(hide_divSelector).find('select').val('').change();
    }

    function showHideOnDdlChanged(item) {
        //remove validation class
        var configuredItem = findObjectInArrayByProperty(item.settings, "selectedText", $('#' + item.ddlId + ' :selected').text());

        if (configuredItem === undefined) {
            //Execute default 
            configuredItem = item.defaultSetting;
        }

        if (configuredItem !== undefined) {
            showHideDivs(configuredItem.showDivIds, configuredItem.hideDivIds);
            $(configuredItem.showDivIds).removeClass("input-validation-error");
        }
    }

    function findObjectInArrayByProperty(array, propertyName, propertyValue) {
		return array.find(function(o){ return o[propertyName] === propertyValue });
    }

    //fire onChange individually if a sequence is needed.
    function triggerChangeOnLoad() {
        $('input[type=radio][data-showdivid],[data-hidedivid]').trigger('change');
        if (typeof ddlShowHideConfiguration !== "undefined")
            ddlShowHideConfiguration.config.forEach(function (item) { return $('#' + item.ddlId).trigger('change'); });
    }


    $(window).load(function () {
        triggerChangeOnLoad();
        $('.field-validation-error').parent('.field').addClass("input-validation-error");
        $('.field-validation-error').parent('.field').find('input:radio').change(function () { $(this).parent().removeClass("input-validation-error") });

    });

    triggerChangeOnLoad();
};

$(function () { showhide(); });

// Array.find() polyfill
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return kValue.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return undefined.
      return undefined;
    },
    configurable: true,
    writable: true
  });
}
