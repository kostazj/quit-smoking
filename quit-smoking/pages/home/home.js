﻿(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            // TODO: Initialize the page here.
            WinJS.Utilities.query("a").listen("click", navigateToSettings, false);

            if (typeof Settings != "undefined") {
                var homeUserDay = Settings.userDay;
                var homeUserMonth = Settings.userMonth;
                var homeUserYear = Settings.userYear;
                var homeCostOfAPacket = Settings.costOfAPacket;
                var homeHowMany = Settings.howMany;

                
                var days = DaysCalculation(homeUserDay, homeUserMonth, homeUserYear);
                var cigarettesNotSmoked = cigarettesNotSmokedCalculation(days, homeHowMany);
                var lifeSaved = cigarettesNotSmoked * 11;
                var moneySaved = moneySavedCalculation(cigarettesNotSmoked, homeCostOfAPacket);
                var moneyMonth = moneyMonthCalculation(homeCostOfAPacket, homeHowMany);
                var moneyYear = moneyMonth * 12;

                document.getElementById("days").innerHTML = days;
                document.getElementById("not").innerHTML = cigarettesNotSmoked;
                document.getElementById("life").innerHTML = lifeSaved;
                document.getElementById("money").innerHTML = moneySaved;
                document.getElementById("perMonth").innerHTML = moneyMonth;
                document.getElementById("inAYear").innerHTML = moneyYear;

            } else {
                alert("Go to Settings for configuration");
            }

        },

       
    });

    function navigateToSettings(eventInfo) {
        eventInfo.preventDefault();
        var link = eventInfo.target;
        WinJS.Navigation.navigate(link.href);
    }

    function DaysCalculation(homeUserDayCalc,homeUserMonthCalc,homeUserYearCalc) {
        var today = new Date();
        var todayDay = today.getDate();
        var todayMonth = today.getMonth() + 1; //January is 0!
        var todayYear = today.getFullYear();

        var daysDiff = Math.abs(todayDay - homeUserDayCalc);
        var monthsDiff = Math.abs(todayMonth - homeUserMonthCalc) * 30;
        var yearsDiff = Math.abs(todayYear - homeUserYearCalc) * 365;
        var daysCalc = daysDiff + monthsDiff + yearsDiff;
       

       return daysCalc;
    }

    function cigarettesNotSmokedCalculation(daysCalc,homeHowManyCalc) {
        var cigarettesNotSmokedCalc = daysCalc * homeHowManyCalc;
        return cigarettesNotSmokedCalc;
    }


    function moneySavedCalculation(cigarettesNotSmokedCalc, homeCostOfAPacketCalc) {
        var moneySavedCalc = cigarettesNotSmokedCalc * (homeCostOfAPacketCalc / 20);
        return moneySavedCalc;
    }

    function moneyMonthCalculation(homeCostOfAPacketCalc, homeHowManyCalc) {
        var moneyMonthCalc = (homeHowManyCalc * 30) * (homeCostOfAPacketCalc/20);
        return moneyMonthCalc;
    }


    function alert(message) {
        var msgBox = new Windows.UI.Popups.MessageDialog(message);
        msgBox.showAsync();
    }


})();
