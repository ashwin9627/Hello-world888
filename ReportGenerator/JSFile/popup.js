$('#buildButton').click(function () {
    var days = $("#daysDrop option:selected").val();
    var sprint = $("#sprintDrop option:selected").val();
    if (days == "0" && sprint == "0") {
        //storeTable1 = $('#dataTable1').DataTable();
        //if (storeTable1 != undefined) {
        //    $('#dataTable1').DataTable().destroy();
        //    $('#dataTable1').remove();
        //}
        tabledata = "<table id='dataTable' class='table table-bordered'><thead><tr><th>Build ID</th><th>Build Number</th></thead><tbody>";
        var orgName = $("#OrganizationDrop option:selected").text();
        var projName = $("#ddlProjectvalue option:selected").text();
        
        $.each(BuildStore.value, function (i) {
            tabledata += "<tr class='tableData details-control'><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_build/results?buildId=" + BuildStore.value[i].id + "&view=results'>" + BuildStore.value[i].id + "</a></td><td>" + BuildStore.value[i].buildNumber + "</td></tr>";

        });
        tabledata += "</tbody></table>";
        console.log(tabledata);
        $("#dataTable1").html(tabledata);
        //$("#dataTable1").html(tabledata);
        table = $('#dataTable').DataTable();
    }
    if (sprint != "0") {
        //storeTable2 = $('#dataTable1').DataTable();
        //if (storeTable2 != undefined) {
        //    $('#dataTable1').DataTable().destroy();
        //    $('#dataTable1').remove();
        //}
        tabledata = "<table id='dataTable' class='table table-bordered'><thead><tr><th>Build ID</th><th>Build Number</th></thead><tbody>";
        var orgName = $("#OrganizationDrop option:selected").text();
        var projName = $("#ddlProjectvalue option:selected").text();
        //var tabledata = "<table id='dataTable'><thead><tr><th>Build ID</th><th>Build Number</th></thead><tbody>";
        $.each(newDaysBuildList.value, function (i) {
            tabledata += "<tr class='tableData details-control'><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_build/results?buildId=" + BuildStore.value[i].id + "&view=results'>" + newDaysBuildList.value[i].id + "</a></td><td>" + newDaysBuildList.value[i].buildNumber + "</td></tr>";

        });
        tabledata += "</tbody></table>";
        console.log(tabledata);
        //$("#dataTable1").append(tabledata);
        $("#dataTable1").html(tabledata);
        table = $('#dataTable').DataTable();
    }
    
    if (sprint != "0" && days != 0) {
        //storeTable3 = $('#dataTable1').DataTable();
        //if (storeTable3 != undefined) {
        //    $('#dataTable1').DataTable().destroy();
        //    $('#dataTable1').remove();
        //}
        //tabledata = "<table id='dataTable'><thead><tr><th>Build ID</th><th>Build Number</th></thead><tbody>";
        var orgName = $("#OrganizationDrop option:selected").text();
        var projName = $("#ddlProjectvalue option:selected").text();
        var tabledata = "<table id='dataTable' class='table table-bordered'><thead><tr><th>Build ID</th><th>Build Number</th></thead><tbody>";
        $.each(newDaysBuildList.value, function (i) {
            tabledata += "<tr class='tableData details-control'><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_build/results?buildId=" + newDaysBuildList.value[i].id + "&view=results'>" + newDaysBuildList.value[i].id + "</a></td><td>" + newDaysBuildList.value[i].buildNumber + "</td></tr>";

        });
        $("#dataTable1").html(tabledata);
        table = $('#dataTable').DataTable();
    }
    else {
        if (days != "0") {
            //storeTable4 = $('#dataTable1').DataTable();
            //if (storeTable4 != undefined) {
            //    $('#dataTable1').DataTable().destroy();
            //    $('#dataTable1').remove();
            //}
            if (days == "21 Days") {
                //tabledata = "<table id='dataTable' class='table table-bordered'><thead><tr><th>Build ID</th><th>Build Number</th></thead><tbody>";
                var orgName = $("#OrganizationDrop option:selected").text();
                var projName = $("#ddlProjectvalue option:selected").text();
                var tabledata = "<table id='dataTable' class='table table-bordered'><thead><tr><th>Build ID</th><th>Build Number</th></thead><tbody>";
                console.log(newDaysBuildList);
                $.each(FailedBuildListStore, function (i) { //FailedBuildListStore  newDaysBuildList
                    tabledata += "<tr class='tableData details-control'><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_build/results?buildId=" + FailedBuildListStore[i].id + "&view=results'>" + FailedBuildListStore[i].id + "</a></td><td>" + FailedBuildListStore[i].buildNumber + "</td></tr>";

                });
                console.log(tabledata);
                $("#dataTable1").html(tabledata);
                table = $('#dataTable').DataTable();
            }
            else {
                //tabledata = "<table id='dataTable' ><thead><tr><th>Build ID</th><th>Build Number</th></thead><tbody>";
                var orgName = $("#OrganizationDrop option:selected").text();
                var projName = $("#ddlProjectvalue option:selected").text();
                var tabledata = "<table id='dataTable' class='table table-bordered'><thead><tr><th>Build ID</th><th>Build Number</th></thead><tbody>";
                console.log(newDaysBuildList);
                $.each(newDaysBuildList, function (i) { //FailedBuildListStore  newDaysBuildList
                    tabledata += "<tr class='tableData details-control'><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_build/results?buildId=" + newDaysBuildList[i].id + "&view=results'>" + newDaysBuildList[i].id + "</a></td><td>" + newDaysBuildList[i].buildNumber + "</td></tr>";

                });
                $("#dataTable1").html(tabledata);
                table = $('#dataTable').DataTable();
            }
        }
    }
})
$('#releaseButton').click(function () {
    //storeTable113 = $('#dataTable1').DataTable();
    //if (storeTable113 != undefined) {
    //    $('#dataTable1').DataTable().destroy();
    //    $('#dataTable1').remove();
    //}
    var days = $("#daysDrop option:selected").text();
    var sprint = $("#sprintDrop option:selected").text();
    if (days == "0" && sprint == "0") {
        var tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";

        $.each(newDaysReleaseList.value, function (i) {
            //ReleaseStore
            tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";
        });
        tabledata += "</tbody></table>";
        console.log(tabledata);
        $("#dataTable1").html(tabledata);
        table = $('#dataTable').DataTable();
    }
    if (days != "0" && sprint != "0") {
        //storeTable112 = $('#dataTable1').DataTable();
        //if (storeTable112 != undefined) {
        //    $('#dataTable1').DataTable().destroy();
        //    $('#dataTable1').remove();
        //}
        var tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";

        $.each(newDaysReleaseList.value, function (i) {
            tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";

        });
        tabledata += "</tbody></table>";
        console.log(tabledata);
        $("#dataTable1").html(tabledata);
        table = $('#dataTable').DataTable();
    }
    //if (sprint != "0") {
    //    //storeTable111 = $('#dataTable1').DataTable();
    //    //if (storeTable111 != undefined) {
    //    //    $('#dataTable1').DataTable().destroy();
    //    //    $('#dataTable1').remove();
    //    //}
    //    var tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";

    //    $.each(newDaysReleaseList.value, function (i) {
    //        tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";

    //    });
    //    tabledata += "</tbody></table>";
    //    console.log(tabledata);
    //    $("#dataTable1").html(tabledata);
    //    table = $('#dataTable').DataTable();
    //}
    else {
        if (days != "0") {
            if (days == "21 Days") {
                tabledata = "<table id='dataTable'><thead><tr><th>Build ID</th><th>Build Number</th></thead><tbody>";
                var orgName = $("#OrganizationDrop option:selected").text();
                var projName = $("#ddlProjectvalue option:selected").text();
                var tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";

                $.each(FailedReleaseListStore, function (i) {
                    tabledata += "<tr class='tableData details-control'><td>" + FailedReleaseListStore.id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + FailedReleaseListStore[i].id + "'>" + FailedReleaseListStore[i].name + "</td><td>" + FailedReleaseListStore[i].status + "</td></tr > ";
                });
                console.log(tabledata);
                $("#dataTable1").html(tabledata);
                table = $('#dataTable').DataTable();
            }
            else {

                //$('#dataTable1').DataTable().destroy();
                //$('#dataTable1').remove();
                var tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";

                $.each(newDaysReleaseList.value, function (i) {
                    tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";

                });
                tabledata += "</tbody></table>";
                console.log(tabledata);
                $("#dataTable1").html(tabledata);
                table = $('#dataTable').DataTable();
            }
        }
    }
})

$('#CriticalBugButton').click(function () {
    //storeTable113 = $('#dataTable1').DataTable();
    //if (storeTable113 != undefined) {
    //    $('#dataTable1').DataTable().destroy();
    //    $('#dataTable1').remove();
    //}
    var days = $("#daysDrop option:selected").val();
    var sprint = $("#sprintDrop option:selected").val();
    if (days == "0" && sprint == "0") {
        //var tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";

        //$.each(newDaysBugList.value, function (i) {
          //  tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";
        //});
        tabledata = "<table id='dataTable'><thead><tr><th>ID</th><th>Title</th><th>Assigned To</th></thead><tbody>";
        console.log(newDaysBugList);
        $.each(newDaysBugList, function (i) {
            //   tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";
            tabledata += "<tr class='tableData details-control'><td>" + newDaysBugList[i].id + "</td><td><a- href='https://dev.azure.com/" + orgName + "/" + projName + "/_workitems/edit/" + newDaysBugList[i].id + "'>" + newDaysBugList[i]["fields"]["System.Title"] + "</a></td><td>" + (newDaysBugList[i]["fields"]["AssignedTo"] != null ? newDaysBugList[i]["fields"]["AssignedTo"]["displayName"] : "") + "</td></tr > ";
        });
        tabledata += "</tbody></table>";
        console.log(tabledata);
        $("#dataTable1").html(tabledata);
        table = $('#dataTable').DataTable();
    }
    if (days != "0" && sprint != "0") {
        //storeTable112 = $('#dataTable1').DataTable();
        //if (storeTable112 != undefined) {
        //    $('#dataTable1').DataTable().destroy();
        //    $('#dataTable1').remove();
        //}
        // var tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";

        //$.each(newDaysBugList.value, function (i) {
        //   tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";

        //});
        tabledata = "<table id='dataTable'><thead><tr><th>ID</th><th>Title</th><th>Assigned To</th></thead><tbody>";
        $.each(newDaysBugList, function (i) {
            //   tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";
            tabledata += "<tr class='tableData details-control'><td>" + newDaysBugList[i].id + "</td><td><a- href='https://dev.azure.com/" + orgName + "/" + projName + "/_workitems/edit/" + newDaysBugList[i].id + "'>" + newDaysBugList[i]["fields"]["System.Title"] + "</a></td><td>" + (newDaysBugList[i]["fields"]["AssignedTo"] != null ? newDaysBugList[i]["fields"]["AssignedTo"]["displayName"] : "") + "</td></tr > ";
        });
        tabledata += "</tbody></table>";
        console.log(tabledata);
        $("#dataTable1").html(tabledata);
        table = $('#dataTable').DataTable();
    }
    //if (sprint != "0") {
    //    //storeTable111 = $('#dataTable1').DataTable();
    //    //if (storeTable111 != undefined) {
    //    //    $('#dataTable1').DataTable().destroy();
    //    //    $('#dataTable1').remove();
    //    //}
    // //   var tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";

    //    //$.each(newDaysBugList.value, function (i) {
    //   //     tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";

    //    //});
    //    tabledata = "<table id='dataTable'><thead><tr><th>ID</th><th>Title</th><th>Assigned To</th></thead><tbody>";
    //    $.each(newDaysBugList, function (i) {
    //        //   tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";
    //        tabledata += "<tr class='tableData details-control'><td>" + newDaysBugList[i].id + "</td><td><a- href='https://dev.azure.com/" + orgName + "/" + projName + "/_workitems/edit/" + newDaysBugList[i].id + "'>" + newDaysBugList[i]["fields"]["System.Title"] + "</a></td><td>" + (newDaysBugList[i]["fields"]["AssignedTo"] != null ? newDaysBugList[i]["fields"]["AssignedTo"]["displayName"] : "") + "</td></tr > ";
    //    });
    //    tabledata += "</tbody></table>";
    //    console.log(tabledata);
    //    $("#dataTable1").html(tabledata);
    //    table = $('#dataTable').DataTable();
    //}
    else {
        if (days != "0") {
            var orgName = $("#OrganizationDrop option:selected").text();
            var projName = $("#ddlProjectvalue option:selected").text();
            if (days == "21 Days") {
                // tabledata = "<table id='dataTable'><thead><tr><th>Build ID</th><th>Build Number</th></thead><tbody>";

                //     var tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";

                //$.each(BugList.value, function (i) {
                //      tabledata += "<tr class='tableData details-control'><td>" + ReleaseStore.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + ReleaseStore.value[i].id + "'>" + BuildStore.value[i].name + "</td><td>" + ReleaseStore.value[i].status + "</td></tr > ";

                //});
                tabledata = "<table id='dataTable'><thead><tr><th>ID</th><th>Title</th><th>Assigned To</th></thead><tbody>";
                console.log(BugList);
                $.each(BugList, function (i) { //BugList.value
                    //   tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";
                    tabledata += "<tr class='tableData details-control'><td>" + BugList[i].id + "</td><td><a- href='https://dev.azure.com/" + orgName + "/" + projName + "/_workitems/edit/" + BugList[i].id + "'>" + BugList[i]["fields"]["System.Title"] + "</a></td><td>" + (BugList[i]["fields"]["AssignedTo"] != null ? BugList[i]["fields"]["AssignedTo"]["displayName"] : "") + "</td></tr > ";
                });
                console.log(tabledata);
                $("#dataTable1").html(tabledata);
                table = $('#dataTable').DataTable();
            }
            else {

                //$('#dataTable1').DataTable().destroy();
                //$('#dataTable1').remove();
                // var tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";
                tabledata = "<table id='dataTable'><thead><tr><th>ID</th><th>Title</th><th>Assigned To</th></thead><tbody>";
                console.log(newDaysBugList);
                $.each(newDaysBugList, function (i) {
                    //   tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";
                    tabledata += "<tr class='tableData details-control'><td>" + newDaysBugList[i].id + "</td><td><a- href='https://dev.azure.com/" + orgName + "/" + projName + "/_workitems/edit/" + newDaysBugList[i].id + "'>" + newDaysBugList[i]["fields"]["System.Title"] + "</a></td><td>" + (newDaysBugList[i]["fields"]["AssignedTo"] != null ? newDaysBugList[i]["fields"]["AssignedTo"]["displayName"] : "") + "</td></tr > ";
                });

                tabledata += "</tbody></table>";
                console.log(tabledata);
                $("#dataTable1").html(tabledata);
                table = $('#dataTable').DataTable();
            }
        }
    }
})

$('#slakeButton').click(function () {
    //storeTable113 = $('#dataTable1').DataTable();
    //if (storeTable113 != undefined) {
    //    $('#dataTable1').DataTable().destroy();
    //    $('#dataTable1').remove();
    //}
    var days = $("#daysDrop option:selected").val();
    var sprint = $("#sprintDrop option:selected").val();
    if (days == "0" && sprint == "0") {
      //  var tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";

      //  $.each(newDaysSlakeList.value, function (i) {
        //    tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";
        //});
        tabledata = "<table id='dataTable'><thead><tr><th>WorkItem ID</th><th>WorkItem Name</th><th>Assigned To</th></thead><tbody>";

        $.each(newDaysSlakeList, function (i) {
            tabledata += "<tr class='tableData details-control'><td>" + newDaysSlakeList[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_workitems/edit/" + newDaysSlakeList[i].id + "'>" + newDaysSlakeList[i]["fields"]["System.Title"] + "</a></td><td>" + (newDaysSlakeList[i]["fields"]["AssignedTo"] != null ? newDaysSlakeList[i]["fields"]["AssignedTo"]["displayName"] : "") + "</td></tr > ";
        });

        tabledata += "</tbody></table>";
        console.log(tabledata);
        //$("#dataTable1").append(tabledata);
        $("#dataTable1").html(tabledata);
        table = $('#dataTable').DataTable();
    }
    if (days != "0" && sprint != "0") {
        //storeTable112 = $('#dataTable1').DataTable();
        //if (storeTable112 != undefined) {
        //    $('#dataTable1').DataTable().destroy();
        //    $('#dataTable1').remove();
        //}
        //var tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";

        //$.each(newDaysSlakeList.value, function (i) {
        //  tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";

        //});
        tabledata = "<table id='dataTable'><thead><tr><th>WorkItem ID</th><th>WorkItem Name</th><th>Assigned To</th></thead><tbody>";

        $.each(newDaysSlakeList, function (i) {
            tabledata += "<tr class='tableData details-control'><td>" + newDaysSlakeList[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_workitems/edit/" + newDaysSlakeList[i].id + "'>" + newDaysSlakeList[i]["fields"]["System.Title"] + "</a></td><td>" + (newDaysSlakeList[i]["fields"]["AssignedTo"] != null ? newDaysSlakeList[i]["fields"]["AssignedTo"]["displayName"] : "") + "</td></tr > ";
        });

        tabledata += "</tbody></table>";
        console.log(tabledata);
        //$("#dataTable1").append(tabledata);
        $("#dataTable1").html(tabledata);
        table = $('#dataTable').DataTable();
    }
    //if (sprint != "0") {
    //    //storeTable111 = $('#dataTable1').DataTable();
    //    //if (storeTable111 != undefined) {
    //    //    $('#dataTable1').DataTable().destroy();
    //    //    $('#dataTable1').remove();
    //    //}
    //   // var tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";

    //    //$.each(newDaysSlakeList.value, function (i) {
    //     //   tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";

    //    //});
    //    tabledata = "<table id='dataTable'><thead><tr><th>WorkItem ID</th><th>WorkItem Name</th><th>Assigned To</th></thead><tbody>";

    //    $.each(newDaysSlakeList, function (i) {
    //        tabledata += "<tr class='tableData details-control'><td>" + newDaysSlakeList[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_workitems/edit/" + newDaysSlakeList[i].id + "'>" + newDaysSlakeList[i]["fields"]["System.Title"] + "</a></td><td>" + (newDaysSlakeList[i]["fields"]["AssignedTo"] != null ? newDaysSlakeList[i]["fields"]["AssignedTo"]["displayName"] : "") + "</td></tr > ";
    //    });

    //    tabledata += "</tbody></table>";
    //    console.log(tabledata);
    //    //$("#dataTable1").append(tabledata);
    //    $("#dataTable1").html(tabledata);
    //    table = $('#dataTable').DataTable();
    //}
    else {
        if (days != "0") {
            if (days == "21 Days") {
                tabledata = "<table id='dataTable'><thead><tr><th>Build ID</th><th>Build Number</th></thead><tbody>";
                var orgName = $("#OrganizationDrop option:selected").text();
                var projName = $("#ddlProjectvalue option:selected").text();

                tabledata = "<table id='dataTable'><thead><tr><th>WorkItem ID</th><th>WorkItem Name</th><th>Assigned To</th></thead><tbody>";

                $.each(WorkitemStore, function (i) {
                    tabledata += "<tr class='tableData details-control'><td>" + WorkitemStore[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_workitems/edit/" + WorkitemStore[i].id + "'>" + WorkitemStore[i]["fields"]["System.Title"] + "</a></td><td>" + (WorkitemStore[i]["fields"]["AssignedTo"] != null ? WorkitemStore[i]["fields"]["AssignedTo"]["displayName"] : "") + "</td></tr > ";
                });
                console.log(tabledata);
                $("#dataTable1").html(tabledata);
                table = $('#dataTable').DataTable();
            }
            else {

                //$('#dataTable1').DataTable().destroy();
                //$('#dataTable1').remove();
                //var tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";

                //$.each(newDaysSlakeList.value, function (i) {
                //   // tabledata += "<tr class='tableData details-control'><td>" + newDaysReleaseList.value[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_releaseProgress?_a=release-pipeline-progress&releaseId=" + newDaysReleaseList.value[i].id + "'>" + newDaysReleaseList.value[i].name + "</td><td>" + newDaysReleaseList.value[i].status + "</td></tr > ";

                //});
                tabledata = "<table id='dataTable'><thead><tr><th>WorkItem ID</th><th>WorkItem Name</th><th>Assigned To</th></thead><tbody>";

                $.each(newDaysSlakeList, function (i) {
                    tabledata += "<tr class='tableData details-control'><td>" + newDaysSlakeList[i].id + "</td><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_workitems/edit/" + newDaysSlakeList[i].id + "'>" + newDaysSlakeList[i]["fields"]["System.Title"] + "</a></td><td>" + (newDaysSlakeList[i]["fields"]["AssignedTo"] != null ? newDaysSlakeList[i]["fields"]["AssignedTo"]["displayName"] : "") + "</td></tr > ";
                });

                tabledata += "</tbody></table>";
                console.log(tabledata);
                $("#dataTable1").html(tabledata);
                table = $('#dataTable').DataTable();
            }
        }
    }
})