$(function () {
    //Register events
    registerChangeEventForRadioButtons();
    if (typeof ddlShowHideConfiguration != "undefined")
        ddlShowHideConfiguration.config.forEach(registerChangeEventForDdls);

    function registerChangeEventForRadioButtons() {

        $('input[type=radio][data-showdivid],[data-hidedivid]').change(showHideOnRadioChanged);
    }

    function registerChangeEventForDdls(item, index, arr) {
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
        return array.find((o) => { return o[propertyName] === propertyValue });
    }

    //fire onChange individually if a sequence is needed.
    function triggerChangeOnLoad() {
        $('input[type=radio][data-showdivid],[data-hidedivid]').trigger('change');
        if (typeof ddlShowHideConfiguration != "undefined")
            ddlShowHideConfiguration.config.forEach(function (item) { return $('#' + item.ddlId).trigger('change'); });
    }


    $(window).load(function () {
        triggerChangeOnLoad();
        $('.field-validation-error').parent('.field').addClass("input-validation-error");
        $('.field-validation-error').parent('.field').find('input:radio').change(function () { $(this).parent().removeClass("input-validation-error") });

    });
});
