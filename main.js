setTimeout(() => {
    try {
        // as plugins are executed in an isolated environment, we have to append our custom functions to the body
        var $functionsToAppend = $('<script type="text/javascript">'
            + 'var lookupBookiesExcel = ' + JSON.stringify(lookupBookiesExcel) + ';'
            + 'var orbitCommissionOnWinnings = "' + orbitCommissionOnWinnings + '";'
            + 'var orbitLandingDomain = "' + orbitLandingDomain + '";'
            + 'var orbitNameInExcel = "' + orbitNameInExcel + '";'
            + addFragmentToExcelString.toString()
            + createAndCopyExcelStringToClipboard.toString()
            + getExcelBookieForQBString.toString()
            + renameOrbitDomain.toString()
            + translateCommissionForExcel.toString()
            + "renameOrbitDomain(orbitLandingDomain);" // call to replace the orbit domain
            + '</script>');
        $functionsToAppend.appendTo($("body"));

        // button to copy all game information to the clipboard
        createCopyToExcelButton();
    } catch (e) {
        console.error("ERROR in QB Enhancer: ", e.message);
    }
}, 100);