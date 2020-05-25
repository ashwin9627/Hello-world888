// var TotalBuildList = [];
    //var TotalReleaseList = [];
    //var TotalBugList = [];
    //var TotalslakeList = [];
var newDaysBuildList = [];
var newDaysReleaseList = [];
var newDaysBugList = [];
var newDaysSlakeList = [];
var SprintBuildList1 = [];
var SprintReleaseList1 = [];
$('#daysDrop').change(function () {
    var days = $("#daysDrop option:selected").text();
    var sprint = $("#sprintDrop option:selected").text();
    var sprintvalue = $("#sprintDrop option:selected").val();
    if (days == "21 Days") {
        if (sprintvalue != "0") {
            //sprint is selected
            //iterationStore;
            $.each(iterationStore, function (iter) {
                $.each(iterationStore[iter].value, function (iter1) {
                    if (iterationStore[iter].value[iter1]["path"] == sprint) {
                        //console.log(iterationStore.value[iter])
                        $.each(TotalBuildList.value, function (i) {
                            var sprintStart = new Date(iterationStore[iter].value[iter1]['attributes']['startDate']);
                            var sprintFinish = new Date(iterationStore[iter].value[iter1]['attributes']['finishDate']);
                            var BuildDate = new Date(TotalBuildList.value[i]['finishTime']);
                            if (BuildDate >= sprintStart && BuildDate <= sprintFinish) {
                                SprintBuildList1.push(TotalBuildList[i]);
                            }

                        });
                    }
                })
            });
            var diffDays;
            failedcountBuild111 = 0;
            // FailedBuildListStore = [];
            console.log(data);
            newDaysBuildList = [];

            $.each(SprintBuildList1.value, function (i) {
                //var optionhtml = '<option value="' +
                //    data.value[i].id + '">' + data.value[i].name + '</option>';
                console.log(SprintBuildList1.value[i].finishTime);
                // alert(data.value[i].lastChangedDate);
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(SprintBuildList1.value[i].finishTime);

                var today = new Date();
                var date1234 = new Date(SprintBuildList1[i].finishTime);
                console.log("Finish Date:   " + date1234);
                diffDays = Math.round(Math.abs((firstDate - today) / oneDay));
                if (TotalBuildList.value[i].result == "failed") {
                    // BuildList.Add(data);
                    if (diffDays < 21) {
                        newDaysBuildList.push(SprintBuildList1.value[i]);
                        failedcountBuild111++;
                        
                    }
                }
            });
            $("#buildspan").text(failedcountBuild111);
            $("#buildicon").text(failedcountBuild111);
            jsonResult = failedcountBuild111;// count;
            //  jsonResult2 = builddata1;

            drawChartBuildDays(21);


            //Release
            SprintReleaseFunction(21);

            //Critical Bug
            SprintCriticalBugfunction(21);
            sprintslakeFunction(21);
        }


        else {
            // if (sprintvalue == "0") {
            //21 days without sprint stored list
            var diffDays;
            failedcountBuild112 = 0;
            // FailedBuildListStore = [];
            console.log(data);
            newDaysBuildList = [];
            $.each(TotalBuildList.value, function (i) {
                //var optionhtml = '<option value="' +
                //    data.value[i].id + '">' + data.value[i].name + '</option>';
                console.log(TotalBuildList.value[i].finishTime);
                // alert(data.value[i].lastChangedDate);
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(TotalBuildList.value[i].finishTime);

                var today = new Date();
                var date1234 = new Date(TotalBuildList.value[i].finishTime);
                console.log("Finish Date:   " + date1234);
                diffDays = Math.round(Math.abs((firstDate - today) / oneDay));
                if (TotalBuildList.value[i].result == "failed") {
                    // BuildList.Add(data);
                    if (diffDays < 21) {
                        newDaysBuildList.push(TotalBuildList.value[i]);
                        failedcountBuild112++;
                        
                    }
                }
            });
            $("#buildspan").text(failedcountBuild112);
            $("#buildicon").text(failedcountBuild112);
            jsonResult = failedcountBuild112;// count;
            //  jsonResult2 = builddata1;

            drawChartBuildDays(21);
            releaseFunction(21);
            CriticalBugfunction(21);
            slakeFunction(21);
        }
    }
    if (days == "7 Days") {
        if (sprintvalue != "0") {
            //sprint is selected
            $.each(iterationStore, function (iter) {
                $.each(iterationStore[iter].value, function (iter1) {
                    if (iterationStore[iter].value[iter1]["path"] == sprint) {
                        //console.log(iterationStore.value[iter])
                        $.each(TotalBuildList.value, function (i) {
                            var sprintStart = new Date(iterationStore[iter].value[iter1]['attributes']['startDate']);
                            var sprintFinish = new Date(iterationStore[iter].value[iter1]['attributes']['finishDate']);
                            var BuildDate = new Date(TotalBuildList.value[i]['finishTime']);
                            if (BuildDate >= sprintStart && BuildDate <= sprintFinish) {
                                SprintBuildList1.push(TotalBuildList[i]);
                            }
                        });
                    }
                })
            });
            var diffDays;
            failedcountBuild113 = 0;
            // FailedBuildListStore = [];
            console.log(data);
            newDaysBuildList = [];
            $.each(SprintBuildList1.value, function (i) {
                //var optionhtml = '<option value="' +
                //    data.value[i].id + '">' + data.value[i].name + '</option>';
                console.log(SprintBuildList1.value[i].finishTime);
                // alert(data.value[i].lastChangedDate);
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(SprintBuildList1.value[i].finishTime);

                var today = new Date();
                var date1234 = new Date(SprintBuildList1[i].finishTime);
                console.log("Finish Date:   " + date1234);
                diffDays = Math.round(Math.abs((firstDate - today) / oneDay));
                if (TotalBuildList.value[i].result == "failed") {
                    // BuildList.Add(data);
                    if (diffDays < 7) {
                        newDaysBuildList.push(SprintBuildList1.value[i]);
                        failedcountBuild113++;
                        
                    }
                }
            });
            $("#buildspan").text(failedcountBuild113);
            $("#buildicon").text(failedcountBuild113);
            jsonResult = failedcountBuild113;// count;
            //  jsonResult2 = builddata1;

            drawChartBuildDays(7);

            SprintReleaseFunction(7);

            SprintCriticalBugfunction(7);
            sprintslakeFunction(7);
        }
        else {
            //21 days without sprint stored list
            var diffDays;
            failedcountBuild115 = 0;
            newDaysBuildList = [];
            // FailedBuildListStore = [];
            //console.log(data);
            $.each(TotalBuildList.value, function (i) {
                //var optionhtml = '<option value="' +
                //    data.value[i].id + '">' + data.value[i].name + '</option>';
                console.log(TotalBuildList.value[i].finishTime);
                // alert(data.value[i].lastChangedDate);
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(TotalBuildList.value[i].finishTime);

                var today = new Date();
                var date1234 = new Date(TotalBuildList.value[i].finishTime);
                console.log("Finish Date:   " + date1234);
                diffDays = Math.round(Math.abs((firstDate - today) / oneDay));
                if (TotalBuildList.value[i].result == "failed") {
                    // BuildList.Add(data);
                    if (diffDays < 7) {
                        newDaysBuildList.push(TotalBuildList.value[i]);
                        failedcountBuild115++;
                        
                    }
                }
            });
            $("#buildspan").text(failedcountBuild115);
            $("#buildicon").text(failedcountBuild115);
            jsonResult = failedcountBuild115;// count;
            //  jsonResult2 = builddata1;

            drawChartBuildDays(7);
            releaseFunction(7);
            CriticalBugfunction(7);
            slakeFunction(7);
        }
    }
    if (days == "14 Days") {
        if (sprintvalue != "0") {
            //sprint is selected
            $.each(iterationStore, function (iter) {
                $.each(iterationStore[iter].value, function (iter1) {
                    if (iterationStore[iter].value[iter1]["path"] == sprint) {
                        //console.log(iterationStore.value[iter])
                        $.each(TotalBuildList.value, function (i) {
                            var sprintStart = new Date(iterationStore[iter].value[iter1]['attributes']['startDate']);
                            var sprintFinish = new Date(iterationStore[iter].value[iter1]['attributes']['finishDate']);
                            var BuildDate = new Date(TotalBuildList.value[i]['finishTime']);
                            if (BuildDate >= sprintStart && BuildDate <= sprintFinish) {
                                SprintBuildList1.push(TotalBuildList[i]);
                            }
                        });
                    }
                })
            });
            var diffDays;
            failedcountBuild = 0;
            // FailedBuildListStore = [];
            console.log(data);
            newDaysBuildList = [];
            $.each(SprintBuildList1.value, function (i) {
                //var optionhtml = '<option value="' +
                //    data.value[i].id + '">' + data.value[i].name + '</option>';
                console.log(SprintBuildList1.value[i].finishTime);
                // alert(data.value[i].lastChangedDate);
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(SprintBuildList1.value[i].finishTime);

                var today = new Date();
                var date1234 = new Date(SprintBuildList1[i].finishTime);
                console.log("Finish Date:   " + date1234);
                diffDays = Math.round(Math.abs((firstDate - today) / oneDay));
                if (TotalBuildList.value[i].result == "failed") {
                    // BuildList.Add(data);
                    if (diffDays < 14) {
                        newDaysBuildList.push(SprintBuildList1.value[i]);
                        failedcountBuild++;
                        
                    }
                }
            });
            $("#buildspan").text(failedcountBuild);
            $("#buildicon").text(failedcountBuild);
            jsonResult = failedcountBuild;// count;
            //  jsonResult2 = builddata1;

            drawChartBuildDays(14);
            SprintReleaseFunction(14);
            SprintCriticalBugfunction(14);
            sprintslakeFunction(14);
        }

        else {
            //21 days without sprint stored list
            var diffDays;
            failedcountBuild = 0;
            // FailedBuildListStore = [];
            //console.log(data);
            newDaysBuildList = [];
            $.each(TotalBuildList.value, function (i) {
                //var optionhtml = '<option value="' +
                //    data.value[i].id + '">' + data.value[i].name + '</option>';
                console.log(TotalBuildList.value[i].finishTime);
                // alert(data.value[i].lastChangedDate);
                var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                var firstDate = new Date(TotalBuildList.value[i].finishTime);

                var today = new Date();
                var date1234 = new Date(TotalBuildList.value[i].finishTime);
                console.log("Finish Date:   " + date1234);
                diffDays = Math.round(Math.abs((firstDate - today) / oneDay));
                if (TotalBuildList.value[i].result == "failed") {
                    // BuildList.Add(data);
                    if (diffDays < 14) {
                        newDaysBuildList.push(TotalBuildList.value[i]);
                        failedcountBuild++;
                        
                    }
                }
            });
            $("#buildspan").text(failedcountBuild);
            $("#buildicon").text(failedcountBuild);
            jsonResult = failedcountBuild;// count;
            //  jsonResult2 = builddata1;

            drawChartBuildDays(14);
            releaseFunction(14);
            CriticalBugfunction(14);
            slakeFunction(14);
        }
    }
            if (days == "30 Days") {
                if (sprintvalue != "0") {
                    //sprint is selected

                    $.each(iterationStore, function (iter) {
                        $.each(iterationStore[iter].value, function (iter1) {
                            if (iterationStore[iter].value[iter1]["path"] == sprint) {
                                //console.log(iterationStore.value[iter])
                                $.each(TotalBuildList.value, function (i) {
                                    var sprintStart = new Date(iterationStore[iter].value[iter1]['attributes']['startDate']);
                                    var sprintFinish = new Date(iterationStore[iter].value[iter1]['attributes']['finishDate']);
                                    var BuildDate = new Date(TotalBuildList.value[i]['finishTime']);
                                    if (BuildDate >= sprintStart && BuildDate <= sprintFinish) {
                                        SprintBuildList1.push(TotalBuildList[i]);
                                    }
                                });
                            }
                        })
                    });
                    var diffDays;
                    failedcountBuild12 = 0;
                    // FailedBuildListStore = [];
                    console.log(data);
                    newDaysBuildList = [];
                    $.each(SprintBuildList1.value, function (i) {
                        //var optionhtml = '<option value="' +
                        //    data.value[i].id + '">' + data.value[i].name + '</option>';
                        console.log(SprintBuildList1.value[i].finishTime);
                        // alert(data.value[i].lastChangedDate);
                        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                        var firstDate = new Date(SprintBuildList1.value[i].finishTime);

                        var today = new Date();
                        var date1234 = new Date(SprintBuildList1[i].finishTime);
                        console.log("Finish Date:   " + date1234);
                        diffDays = Math.round(Math.abs((firstDate - today) / oneDay));
                        if (TotalBuildList.value[i].result == "failed") {
                            // BuildList.Add(data);
                            if (diffDays < 30) {
                                newDaysBuildList.push(SprintBuildList1.value[i]);
                                failedcountBuild12++;
                                
                            }
                        }
                    });
                    $("#buildspan").text(failedcountBuild12);
                    $("#buildicon").text(failedcountBuild12);
                    jsonResult = failedcountBuild12;// count;
                    //  jsonResult2 = builddata1;

                    drawChartBuildDays(30);
                    SprintReleaseFunction(30);
                    SprintCriticalBugfunction(30);
                    sprintslakeFunction(30);
                }
                else {
                    //21 days without sprint stored list
                    var diffDays;
                    failedcountBuild1 = 0;
                    // FailedBuildListStore = [];
                    //console.log(data);
                    newDaysBuildList = [];
                    $.each(TotalBuildList.value, function (i) {
                        //var optionhtml = '<option value="' +
                        //    data.value[i].id + '">' + data.value[i].name + '</option>';
                        console.log(TotalBuildList.value[i].finishTime);
                        // alert(data.value[i].lastChangedDate);
                        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                        var firstDate = new Date(TotalBuildList.value[i].finishTime);

                        var today = new Date();
                        var date1234 = new Date(TotalBuildList.value[i].finishTime);
                        console.log("Finish Date:   " + date1234);
                        diffDays = Math.round(Math.abs((firstDate - today) / oneDay));
                        if (TotalBuildList.value[i].result == "failed") {
                            // BuildList.Add(data);
                            if (diffDays < 30) {
                                newDaysBuildList.push(TotalBuildList.value[i]);
                                failedcountBuild1++;
                                
                            }
                        }
                    });
                    $("#buildspan").text(failedcountBuild1);
                    $("#buildicon").text(failedcountBuild1);
                    jsonResult = failedcountBuild1;// count;
                    //  jsonResult2 = builddata1;

                    drawChartBuildDays(30);
                    releaseFunction(30);
                    CriticalBugfunction(30);
                    slakeFunction(30);
                }
            }
});
var lineChartrel;
function drawChartReleaseDays(d) {
    
    var date = new Date();
    date.setDate(date.getDate() - d);
    console.log(date);
    // alert(date);
    var i;
    var datestore1 = [];
    for (i = 0; i < d; i++) {
        var date1 = new Date();
        date1.setDate(date1.getDate()+1 - d);
        date1.setDate(date1.getDate() + i);
        // var Faildate = new Date(FailedBuildListStore[k].lastChangedDate);
        var ddd = date1.getDate();
        var mmm = date1.getMonth(); //January is 0!
        mmm = mmm + 1;
        var yyyyy = date1.getFullYear();
        Faildate = mmm + '/' + ddd + '/' + yyyyy;
        datestore1.push(Faildate);//(date.getDate());
        //text += cars[i] + "<br>";
    }
    var LineDataStore1 = [];
    $.each(datestore1, function (yi) {
        var Datecountrel = 0;
        $.each(newDaysReleaseList, function (zi) {
            console.log(zi);
            var Faildate = new Date(newDaysReleaseList[zi].createdOn);
            var ddd = Faildate.getDate();
            var mmm = Faildate.getMonth(); //January is 0!
            mmm = mmm + 1;
            var yyyyy = Faildate.getFullYear();
            Faildate = mmm + '/' + ddd + '/' + yyyyy;
            if (Faildate == datestore1[yi]) {
                Datecountrel = Datecountrel + 1;
            }
        });
        LineDataStore1.push(Datecountrel);
    });
    var lastchangedArray = [];
    //$.each(FailedReleaseListStore, function (ki) {
    //    // var Faildate = Date.parse(FailedBuildListStore[k].lastChangedDate);
    //    var Faildate = new Date(FailedReleaseListStore[ki].createdOn);
    //    var ddd = Faildate.getDate();
    //    var mmm = Faildate.getMonth(); //January is 0!
    //    var yyyyy = Faildate.getFullYear();
    //    Faildate = mmm + '/' + ddd + '/' + yyyyy;
    //    // Faildate = ddd;
    //    //lastchangedArray.push(FailedBuildListStore[k].lastChangedDate);
    //    lastchangedArray.push(Faildate);
    //});
    
    var canvas = document.getElementById("Releasechart");
    var ctx = canvas.getContext("2d");

    options = {
        responsive: true,
        maintainAspectRatio: false
    };
    if (lineChartrel != undefined) {
        lineChartrel.destroy();
    }
    lineChartrel = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datestore1,
            datasets: [{
                label: 'Failed Releases',
                //  backgroundColor: 'rgb(153,50,204)',
                borderColor: 'rgb(255, 99, 132)',
                data: LineDataStore1
            }]

        }
    });
    options: { }

}
var lineChart;
function drawChartBuildDays(d)
{
    
    $('#dailySalesChart').empty();
    
    var i;
    var datestore1 = [];
    for (i = 0; i < d; i++) {
        var date1 = new Date();
        date1.setDate(date1.getDate() + 1 - d);
        date1.setDate(date1.getDate() + i);
        // var Faildate = new Date(FailedBuildListStore[k].lastChangedDate);
        var ddd = date1.getDate();
        var mmm = date1.getMonth(); //January is 0!
        mmm = mmm + 1;
        var yyyyy = date1.getFullYear();
        Faildate = mmm + '/' + ddd + '/' + yyyyy;
        datestore1.push(Faildate);//(date.getDate());
        //text += cars[i] + "<br>";
    }
    var LineDataStore1 = [];
    $.each(datestore1, function (yi) {
        var Datecountwork1 = 0;
        $.each(newDaysBuildList, function (zi) { // FailedBuildListStore
            console.log(zi);
            var Faildate = new Date(newDaysBuildList[zi].finishTime);
            var ddd = Faildate.getDate();
            var mmm = Faildate.getMonth(); //January is 0!
            mmm = mmm + 1;
            var yyyyy = Faildate.getFullYear();
            Faildate = mmm + '/' + ddd + '/' + yyyyy;
            if (Faildate == datestore1[yi]) {
                Datecountwork1 = Datecountwork1 + 1;

            }
        });
        LineDataStore1.push(Datecountwork1);
    });
    var lastchangedArray = [];
    
    var canvas = document.getElementById("dailySalesChart");
    var ctx = canvas.getContext("2d");

    options = {
        responsive: true,
        maintainAspectRatio: false
    };
    if (lineChart != undefined) {
        lineChart.destroy();
    }
    lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datestore1,
            datasets: [{
                label: 'Failed Build',
                //  backgroundColor: 'rgb(153,50,204)',
                borderColor: 'rgb(255, 99, 132)',
                data: LineDataStore1
            }]

        }
    });
    options: { }
}

function SprintReleaseFunction(d)
{
    var sprint = $("#sprintDrop option:selected").text();
    $.each(iterationStore, function (iter) {
        $.each(iterationStore[iter].value, function (iter1) {
            if (iterationStore[iter].value[iter1]["path"] == sprint) {
                //console.log(iterationStore.value[iter])
                $.each(TotalReleaseList.value, function (i) {
                    var sprintStartrelease = new Date(iterationStore[iter].value[iter1]['attributes']['startDate']);
                    var sprintFinishrelease = new Date(iterationStore[iter].value[iter1]['attributes']['finishDate']);
                    var ReleaseDate = new Date(TotalReleaseList.value[i].createdOn);
                    if (ReleaseDate >= sprintStartrelease && ReleaseDate <= sprintFinishrelease) {
                        SprintReleaseList1.push(TotalReleaseList[i]);
                    }
                });
            }
        })
    });
    var diffDays1;
    //failedcountBuild = 0;
    // FailedBuildListStore = [];
    console.log(data);
    newDaysReleaseList = [];
    failedcountrelease = 0;
    $.each(SprintReleaseList1.value, function (i) {
        //var optionhtml = '<option value="' +
        //    data.value[i].id + '">' + data.value[i].name + '</option>';
        console.log(SprintReleaseList1.value[i].createdOn);
        // alert(data.value[i].lastChangedDate);
        var oneDay1 = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate1 = new Date(SprintReleaseList1.value[i].createdOn);

        var today1 = new Date();
        var date12345 = new Date(SprintReleaseList1[i].createdOn);
        diffDays1 = Math.round(Math.abs((firstDate1 - today1) / oneDay1));
        
        if (SprintReleaseList1.value[i]["environments"] != null || SprintReleaseList1.value[i]["environments"] != undefined) {
            if (SprintReleaseList1.value[i].environments[0] != null || SprintReleaseList1.value[i].environments[0] != undefined) {
                if (SprintReleaseList1.value[i].environments[0].deploySteps != null || SprintReleaseList1.value[i].environments[0].deploySteps != undefined) {
                    if (SprintReleaseList1.value[i].environments[0].deploySteps.length > 0) {
                        if (SprintReleaseList1.value[i].environments[0].deploySteps[0].releaseDeployPhases != null || SprintReleaseList1.value[i].environments[0].deploySteps[0].releaseDeployPhases != undefined) {
                            if (SprintReleaseList1.value[i].environments[0].deploySteps[0].releaseDeployPhases.length > 0) {
                                if (SprintReleaseList1.value[i].environments[0].deploySteps[0].releaseDeployPhases[0].status != null || SprintReleaseList1.value[i].environments[0].deploySteps[0].releaseDeployPhases[0].status != undefined) {
                                    statusData = SprintReleaseList1.value[i].environments[0].deploySteps[0].releaseDeployPhases[0].status;
                                    if (statusData == "failed") {
                                        if (diffDays1 <= d) {
                                            newDaysReleaseList.push(SprintReleaseList1.value[i]);
                                            failedcountrelease++;
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
            }
        }

    });
    $("#releasespan").text(failedcountrelease);
    $('#release').text(failedcountrelease);
    $('#releaseicon').text(failedcountrelease);
   // jsonResult = failedcountBuild;// count;
    //  jsonResult2 = builddata1;

    drawChartReleaseDays(d)

}
function releaseFunction(di) {
    var diffDays1;
    //failedcountBuild = 0;
    // FailedBuildListStore = [];
    console.log(data);
    newDaysReleaseList = [];
    failedcountrelease = 0;
    $.each(TotalReleaseList.value, function (i) {
        //var optionhtml = '<option value="' +
        //    data.value[i].id + '">' + data.value[i].name + '</option>';
        console.log(TotalReleaseList.value[i].createdOn);
        // alert(data.value[i].lastChangedDate);
        var oneDay1 = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate1 = new Date(TotalReleaseList.value[i].createdOn);

        var today1 = new Date();
        var date12345 = new Date(TotalReleaseList.value[i].createdOn);
        diffDays1 = Math.round(Math.abs((firstDate1 - today1) / oneDay1));
        
        if (TotalReleaseList.value[i]["environments"] != null || TotalReleaseList.value[i]["environments"] != undefined) {
            if (TotalReleaseList.value[i].environments[0] != null || TotalReleaseList.value[i].environments[0] != undefined) {
                if (TotalReleaseList.value[i].environments[0].deploySteps != null || TotalReleaseList.value[i].environments[0].deploySteps != undefined) {
                    if (TotalReleaseList.value[i].environments[0].deploySteps.length > 0) {
                        if (TotalReleaseList.value[i].environments[0].deploySteps[0].releaseDeployPhases != null || TotalReleaseList.value[i].environments[0].deploySteps[0].releaseDeployPhases != undefined) {
                            if (TotalReleaseList.value[i].environments[0].deploySteps[0].releaseDeployPhases.length > 0) {
                                if (TotalReleaseList.value[i].environments[0].deploySteps[0].releaseDeployPhases[0].status != null || TotalReleaseList.value[i].environments[0].deploySteps[0].releaseDeployPhases[0].status != undefined) {
                                    statusData = TotalReleaseList.value[i].environments[0].deploySteps[0].releaseDeployPhases[0].status;
                                    if (statusData == "failed") {
                                        if (diffDays1 <= di) {
                                            newDaysReleaseList.push(SprintReleaseList1.value[i]);
                                            failedcountrelease++;
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
            }
        }

    });
    $("#releasespan").text(failedcountrelease);
    $('#release').text(failedcountrelease);
    $('#releaseicon').text(failedcountrelease);
    // jsonResult = failedcountBuild;// count;
    //  jsonResult2 = builddata1;

    drawChartReleaseDays(di)
}

function CriticalBugfunction(criti) {
    var countCrit = 0;
    newDaysBugList = [];
    $.each(TotalBugList, function (ia) {
        console.log("critical Bug " + TotalBugList[ia].fields["System.CreatedDate"]);
        console.log("critical Bug " + TotalBugList[ia].fields["System.Title"]);
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(TotalBugList[ia].fields["System.CreatedDate"]);
        var today = new Date();

        diffDays = Math.round(Math.abs((firstDate - today) / oneDay));

        if (diffDays <= criti) {
            newDaysBugList.push(TotalBugList[ia]);
            countCrit = countCrit + 1;
            // FailedBuildListStore.push(data.value[i]);
            //CriticalStore.push = data[ia];
            
        }
    })
    var count = Object.keys(data).length;

$('#critWorkitem').text(countCrit);
$('#criticalbugspan').text(countCrit);
$("#criticalbugicon").text(countCrit);
workitemSession = '@Session["WorkItemscount"]';

jsonResultbug = countCrit;
google.charts.load('current', { 'packages': ['gauge'] });
google.charts.setOnLoadCallback(drawChartbug);
}

function SprintCriticalBugfunction(criti) {
    var sprintProvided = $("#sprintDrop option:selected").text();
    var countCrit = 0;
    newDaysBugList = [];
    $.each(TotalBugList, function (ia) {
        if (TotalBugList[ia].fields["System.IterationPath"] == sprintProvided) {
            
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date(TotalBugList[ia].fields["System.CreatedDate"]);
            var today = new Date();

            diffDays = Math.round(Math.abs((firstDate - today) / oneDay));

            if (diffDays <= criti) {
                newDaysBugList.push(TotalBugList[ia]);
                countCrit = countCrit + 1;
                // FailedBuildListStore.push(data.value[i]);
                //CriticalStore.push = data[ia];
                
            }
        }
        })

    var count = Object.keys(data).length;

    $('#critWorkitem').text(countCrit);
    $('#criticalbugspan').text(countCrit);
    $("#criticalbugicon").text(countCrit);
    jsonResultbug = countCrit;
    google.charts.load('current', { 'packages': ['gauge'] });
    google.charts.setOnLoadCallback(drawChartbug);
}

function slakeFunction(sf) {
    slakeCount = 0;
    newDaysSlakeList = [];
    $.each(TotalslakeList, function (ia) {
        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(TotalslakeList[ia].fields["System.CreatedDate"]);
        var today = new Date();

        diffDays = Math.round(Math.abs((firstDate - today) / oneDay));
        
        if (diffDays <= sf) {
            slakeCount = slakeCount + 1;
            newDaysSlakeList.push(TotalslakeList[ia]);           
        }
    })
    $('#WorkitemDeadLine').text(slakeCount);
    $("#workitemicon").text(slakeCount);
    $('#workitemspan').text(slakeCount);
//drawChartDeadLine();
    SprintdrawWorkItem(sf);
}
function sprintslakeFunction(sf) {
    var sprintSlake = $("#sprintDrop option:selected").text();
    newDaysSlakeList = [];
    slakeCount = 0;
    $.each(TotalslakeList, function (ia) {
        if (TotalslakeList[ia].fields["System.CreatedDate"] == sprintSlake) {
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date(TotalslakeList[ia].fields["System.CreatedDate"]);
            var today = new Date();

            diffDays = Math.round(Math.abs((firstDate - today) / oneDay));

            if (diffDays <= sf) {
                slakeCount = slakeCount + 1;
                newDaysSlakeList.push(TotalslakeList[ia]);
            }
        }
        })
    $('#WorkitemDeadLine').text(slakeCount);
    $("#workitemicon").text(slakeCount);
    $('#workitemspan').text(slakeCount);
    SprintdrawWorkItem(sf);
}
var lineChartwork;
function SprintdrawWorkItem(spWork) {
    $('#workitemchart').empty();
        //  WorkitemStore
        var date = new Date();
    date.setDate(date.getDate() - spWork);
        console.log(date);
        // alert(date);
        var i;
        var datestore1 = [];
        for (i = 0; i < spWork; i++) {
            var date1 = new Date();
            date1.setDate(date1.getDate()+1 - spWork);
            date1.setDate(date1.getDate() + i);
            // var Faildate = new Date(FailedBuildListStore[k].lastChangedDate);
            var ddd = date1.getDate();
            var mmm = date1.getMonth(); //January is 0!
            mmm = mmm + 1;
            var yyyyy = date1.getFullYear();
            Faildate = mmm + '/' + ddd + '/' + yyyyy;
            datestore1.push(Faildate);//(date.getDate());
            //text += cars[i] + "<br>";*
        }
    var LineDataStore1 = [];
    //var Datecountwork1 = 0;
    LineDataStore1 = [];
        $.each(datestore1, function (yi) {
           // LineDataStore1 = [];
            var Datecountwork12 = 0;
            $.each(newDaysSlakeList, function (zi) {
                console.log(zi);
                var Faildate = new Date(newDaysSlakeList[zi]["fields"]["System.CreatedDate"]);
                var ddd = Faildate.getDate();
                var mmm = Faildate.getMonth(); //January is 0!
                mmm = mmm + 1;
                var yyyyy = Faildate.getFullYear();
                Faildate = mmm + '/' + ddd + '/' + yyyyy;
                if (Faildate == datestore1[yi]) {
                    Datecountwork12 = Datecountwork12 + 1;
                }
            });
            LineDataStore1.push(Datecountwork12);
        });
        var lastchangedArray = [];
        
        var canvas = document.getElementById("workitemchart");
        var ctx = canvas.getContext("2d");

        options = {
            responsive: true,
            maintainAspectRatio: false
    };
    if (lineChartwork != undefined) {
        lineChartwork.destroy();
    }
        lineChartwork = new Chart(ctx, {
            type: 'line',
            data: {
                labels: datestore1,
                datasets: [{
                    label: 'Slake WorkItems',
                    //  backgroundColor: 'rgb(153,50,204)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: LineDataStore1
                }]
            }
        });
        options: { }
    }




$('#sprintDrop').change(function ()
{
    $('#daysDrop').find('option:first').attr('selected', 'selected');
    $('#daysDrop').val(0);
    $('#daysDrop option:eq(0)').attr('selected', 'selected');
    $('#daysDrop').get(0).selectedIndex = 0;
    var sprint = $("#sprintDrop option:selected").text();
    var sprintvalue = $("#sprintDrop option:selected").val();
    //if (days == "21 Days") {
    if (sprintvalue != "0") {
        //sprint is selected
        //iterationStore;
        $.each(iterationStore, function (iter) {
            $.each(iterationStore[iter].value, function (iter1) {
                if (iterationStore[iter].value[iter1]["path"] == sprint) {
                    //console.log(iterationStore.value[iter])
                    $.each(TotalBuildList.value, function (i) {
                        var sprintStart = new Date(iterationStore[iter].value[iter1]['attributes']['startDate']);
                        var sprintFinish = new Date(iterationStore[iter].value[iter1]['attributes']['finishDate']);
                        var BuildDate = new Date(TotalBuildList.value[i]['finishTime']);
                        if (BuildDate >= sprintStart && BuildDate <= sprintFinish) {
                            SprintBuildList1.push(TotalBuildList[i]);
                        }

                    });
                }
            })
        });
        var diffDays;
        failedcountBuild = 0;
        // FailedBuildListStore = [];
        console.log(data);
        //newDaysBuildList = [];
        newDaysBuildList = [];
        $.each(SprintBuildList1.value, function (i) {
            //var optionhtml = '<option value="' +
            //    data.value[i].id + '">' + data.value[i].name + '</option>';
            console.log(SprintBuildList1.value[i].finishTime);
            // alert(data.value[i].lastChangedDate);
            var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date(SprintBuildList1.value[i].finishTime);

            var today = new Date();
            var date1234 = new Date(SprintBuildList1[i].finishTime);
            console.log("Finish Date:   " + date1234);
            diffDays = Math.round(Math.abs((firstDate - today) / oneDay));
            if (TotalBuildList.value[i].result == "failed") {
                // BuildList.Add(data);
                if (diffDays <= 21) {
                    newDaysBuildList.push(SprintBuildList1.value[i]);
                    failedcountBuild++;

                }
            }
        });
        $("#buildspan").text(failedcountBuild);
        $("#buildicon").text(failedcountBuild);
        jsonResult = failedcountBuild;// count;
        //  jsonResult2 = builddata1;

        drawChartBuildDays(21);


        //Release
        SprintReleaseFunction(21);

        //Critical Bug
        SprintCriticalBugfunction(21);
        sprintslakeFunction(21);
    }
    else {
        drawChart();
        drawChartbug();
        drawChartRelease();
        drawChartDeadLine();
    }
    })