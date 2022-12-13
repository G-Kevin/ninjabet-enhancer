function createAndCopyExcelStringToClipboard(orbitLandingDomain) {
    var status = "Offen";
    var excelString = "";
    var category = "Pre-Game";
    var league = "";
    try {
        var bookie = document.getElementsByClassName("bookie-bet-url")[0].getElementsByClassName("event-back-oddsprovider")[0].textContent;
        bookie = getExcelBookieForQBString(bookie);
    } catch {
        var bookie = "";
    }

    var sportImage = document.getElementById("calc-event-name").parentNode.parentNode.getElementsByTagName("td")[0].getElementsByTagName("img")[0].getAttribute("src").replace(/.*\/(.*)\..*/g, '$1');
    switch(sportImage) {
      case "football":
        var sport = "Fußball";
        break;
       case "tennis":
        var sport = "Tennis";
        break;
       case "basket":
        var sport = "Basketball";
        break;
      default:
        var sport = "";
    } 
    var comissionOnWinningsLay = orbitCommissionOnWinnings;

    var comissionOnWinningsBack = ""; // information not given on oddsmatcher

    var commissionBack = translateCommissionForExcel(document.querySelector('[name="back-commission"]').value);
    var commissionLay = translateCommissionForExcel(document.querySelector('[name="lay-commission"]').value);

    try {
        var date = document.getElementById("calc-event-datetime").value.replace(/\s.*/g, '').replace(/(\d{4})-(\d{2})-(\d{2})/g, '$3.$2.$1');
    } catch {
        var date = "";
    }

    try {
        var event = document.getElementById("calc-event-name").value;
    } catch {
        var event = "";
    }


    try {
        var ergebnis = document.getElementsByClassName("event-outcome event-back-outcome")[0].textContent.toLowerCase();
        switch (true) {
             case /beide\streffen\s(ja|nein)/g.test(ergebnis):
                 var betType = "BothToScore";
                 var tipBack = ergebnis.replace(/.*\s/g, '') === "ja" ? "yes" : "no";
               break;
             case /(über|unter)\s?\d+\.\d/.test(ergebnis):
                 var betType = "O/U";
                 var tipBack = ergebnis.replace(/\s.*/g, '') === "über" ? "o" : "u";
                 tipBack += ergebnis.replace(/.*\s/g, '');
               break;
             case /1\.\shz\s(über|unter)\s-\s\d\.\d/.test(ergebnis):
                 var betType = "O/U";
                 var tipBack = ergebnis.replace(/(\d\.).*/, '$1 HZ ');
                 tipBack += ergebnis.replace(/\d\.\shz\s/g, '').replace(/\s-\s\d\.\d/g, '') === "über" ? "o" : "u";
                 tipBack += ergebnis.replace(/\d\.\shz\s(über|unter)\s-\s/g, '');
               break;
             case /1\.\shz\s-\s[12x]/.test(ergebnis):
                 var betType = "1. HZ 1X2";
                 var tipBack = ergebnis.replace(/\s-\s/, ' ').toUpperCase();
               break;
             case /^(1x|12|x2)$/.test(ergebnis):
                 var betType = "doubleChance";
                 var tipBack = ergebnis.toUpperCase();
               break;
             case /\d+\s-\s\d+/.test(ergebnis):
                 var betType = "correctScore";
                 var tipBack = ergebnis;
               break;
             default:
                 var betType = "1X2";
                 var tipBack = ergebnis === event.toLowerCase().replace(/\sv\s.*/g, '') ? "1" : ergebnis === "unentschieden" ? "X" : "2";
               break;
           }
        var tipLay = "lay" + tipBack;
    } catch {
        var betType = "1X2";
        var tipBack = "";
        var tipLay = "";
    }

    var betMode = document.getElementById("rbtnAG").checked ? "Freebet" : "normal";

    var stakeBack = betMode === "Freebet" ? ("=" + document.querySelector('[name="back-stake"]').value.replace(/\./g, ",")) + "-" + document.querySelector('[name="back-stake"]').value.replace(/\./g, ",") : document.querySelector('[name="back-stake"]').value.replace(/\./g, ",");
    var stakeLay = document.getElementsByClassName("event-liability event-detail")[0].innerText.replace(/€/g, "").replace(/\./g, ",");
    var oddBack = document.querySelector('[name="back-odds"]').value.replace(/\./g, ",");
    var oddLay = document.querySelector('[name="lay-odds"]').value.replace(/\./g, ",");
    oddLay = "=" + oddLay + "/(" + oddLay + "-1)";

    // first line, back
    excelString += addFragmentToExcelString(date);
    excelString += addFragmentToExcelString("");
    excelString += addFragmentToExcelString(category);
    excelString += addFragmentToExcelString(sport);
    excelString += addFragmentToExcelString(league);
    excelString += addFragmentToExcelString(event);
    excelString += addFragmentToExcelString(betType);
    excelString += addFragmentToExcelString(tipBack);
    excelString += addFragmentToExcelString(stakeBack);
    excelString += addFragmentToExcelString(oddBack);
    excelString += addFragmentToExcelString(comissionOnWinningsBack ? "j" : "");
    excelString += addFragmentToExcelString(commissionBack);
    excelString += addFragmentToExcelString(bookie);
    excelString += addFragmentToExcelString(status, false, true);

    // second line, lay
    excelString += addFragmentToExcelString(date);
    excelString += addFragmentToExcelString("");
    excelString += addFragmentToExcelString(category);
    excelString += addFragmentToExcelString(sport);
    excelString += addFragmentToExcelString(league);
    excelString += addFragmentToExcelString(event);
    excelString += addFragmentToExcelString(betType);
    excelString += addFragmentToExcelString(tipLay);
    excelString += addFragmentToExcelString(stakeLay);
    excelString += addFragmentToExcelString(oddLay);
    excelString += addFragmentToExcelString(comissionOnWinningsLay ? "j" : "");
    excelString += addFragmentToExcelString(commissionLay);
    excelString += addFragmentToExcelString(orbitNameInExcel);
    excelString += addFragmentToExcelString(status, false);

    navigator.clipboard.writeText(excelString).then(function() {
      console.log('Copying Excel-String to clipboard was successful!');
    }, function(err) {
      console.error('Could not copy Excel-String to clipboard: ', err);
    });
}

// Excel needs a special format for percentages...
function translateCommissionForExcel(data) {
    var translatedData = parseFloat(data.replace(/,/g, "."));
    translatedData = translatedData / 100;
    translatedData = translatedData.toString().replace(/\./g, ",");

    return translatedData;
}

function addFragmentToExcelString(data, useTabStop = true, useLinebreak = false) {
    var tabStop = "	";
    var lineBreak = "\n";
    var returnFragment = data;
    if (useTabStop) returnFragment += tabStop;
    if (useLinebreak) returnFragment += lineBreak;

    return returnFragment;
}

function getExcelBookieForQBString(qbstring) {
    // translate image-prefix of QB to local Excel documentation
    var bookie = "";
    Object.entries(lookupBookiesExcel).forEach(([key, value]) => {
        if (qbstring.toLowerCase().startsWith(key.toLowerCase())) {
            bookie = value;
            return true;
        }
    });

    return bookie;
}

function createCopyToExcelButton() {
    try {
        let url;
        try {
            url = window.location.pathname;
            if (url !== "/oddsmatcher") {
                return false;
            }
        } catch (e) {
            console.error("ERROR in QB copyToExcel: ", e.message);
            return false;
        }

        // compile out visible copy-Button
        // var $copyButton = $('<div style="margin: 0 auto; text-align: center"><a class="qb_button" href="javascript:createAndCopyExcelStringToClipboard()" style="text-decoration:none !important; font-size:1.3em !important;">Werte für Excel kopieren</a></div>');
        var $copyButton = $('<a class="btn btn-primary btn-large backTitle" href="javascript:createAndCopyExcelStringToClipboard()">Werte für Excel kopieren</a>');
        // var $copyButton = $('<button onclick="createAndCopyExcelStringToClipboard()" class="btn btn-primary btn-large backTitle" id="copyStringToExcel">Werte für Excel kopieren</button>');
        $copyButton.appendTo($("#pt-button-container")); // Oddsmatcher
    } catch (e) {
        console.error("ERROR in QB copyToExcel: ", e.message);
    }
}