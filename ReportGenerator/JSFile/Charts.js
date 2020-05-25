
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>

        var buildSession=0;
        var ReleaseCountTotal=0;
                var modal = document.getElementById("myModal");
                //var ReleaseCount;
                //var workitemdeadline;
                window.onclick = function (event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
            }
            $('.close').click(function () { //(event) {
                   // if (event.target == modal) {
                        modal.style.display = "none";
                    //}
            })
        var failedcountBuild;
        var resultId=0;
        $(document).ready(function () {
            //$('#dataTable').DataTable();
            //var FailedBuildListStore=[];
            var FailedReleaseListStore=[];
            var DataStore = [];
            var BuildStore = [];
            var ReleaseStore = [];
            var CriticalStore = [];
            var WorkitemStore = [];
            //      $('.row').hide();
            $('#row1').hide();
            $('#row2').hide();
            $('#row3').hide();
            $('#row4').hide();
            $('#orgChartload').hide();
            $('#orgChartload1').hide();
            $('.orgChartload').hide();
            $('.dropdown-submenu a.test').on("click", function (e) {
                $(this).next('ul').toggle();
                e.stopPropagation();
                e.preventDefault();
            });


            //GetOrganization
            var optionhtml1 = '<option value="' +
                0 + '">' + "--Select Organization--" + '</option>';
            $("#OrganizationDrop").append(optionhtml1);
               document.getElementById("overlay").style.display = "block";
               document.getElementById("load").hidden = false;
            $.ajax({
                url: '@Url.Action("OrganizationList", "Home")',
                type: 'Get',
                data: {},
                //dataType: 'json',
                success: function (data1) {
                    document.getElementById("overlay").style.display = "none";
               document.getElementById("load").hidden = true;
                    data = JSON.parse(data1);
                    //alert("Success");
                    var count = Object.keys(data).length;
                    if (count >= 1) {
                        $.each(data.value, function (i) {

                            var optionhtml = '<option value="' +
                                data.value[i].accountId + '">' + data.value[i].accountName + '</option>';
                            $("#OrganizationDrop").append(optionhtml);
                        });
                    };
                },

                error: function (request, error) {
                    document.getElementById("overlay").style.display = "none";
                    document.getElementById("load").hidden = true;
                    alert('Something went wrong');

                }
            });

            //Select All Checkbox
            $("#selectAll").on("click", function () {
                $("#dataTable tr").each(function () {
                    //var isChecked = $("#chkPassport").is(":checked");
                    if ($(this).find("input").is(":checked")) {
                        $(this).find("input").attr('checked', false);
                    }
                    else {
                        $(this).find("input").attr('checked', true);
                    }
                });
            });



            //project Dropdown
            $('#OrganizationDrop').change(function () {
                $('.orgChartload').show();
                document.getElementsByClassName("row").hidden = true;
                document.getElementById("overlay").style.display = "block";
                document.getElementById("load").hidden = false;
                //document.getElementById("orgChartload").hidden = false;
                //document.getElementById("orgChartload1").hidden = false;
                $('#orgChartload').show();
                $('#orgChartload1').show();
                //$('.row').hide();
                $('#orgbuild').text("");
                $('#orgrelease').text("");
                $('#orgcriticalbug').text("");
                $('#orgworkitem').text("");
                $('#row1').hide();
                $('#row2').hide();
                $('#row4').show();
                $('#row3').hide();
               // $(".badge badge-danger badge-pill").text(" ");
                $("#critWorkitem").text("");
                $("#WorkitemDeadLine").text("");
                $("#build1").text("");
                $("#release1").text("");
                $('#bugid').css("background-color", "white");

                $('#dataTable').DataTable().destroy();
                $('#dataTable').remove();
                var orgName = $("#OrganizationDrop option:selected").text();
                 document.getElementById("overlay").style.display = "block";
               document.getElementById("load").hidden = false;
                if (orgName != null || orgName != "" && pat != null || pat != "")
                    $.ajax({
                        url: '@Url.Action("GetProjects","Home")',
                        type: 'Get',
                        data: { 'orgName': orgName },//, 'pat': pat },
                        //dataType: 'json',
                        success: function (data1) {
                             //document.getElementById("overlay").style.display = "none";
                             //document.getElementById("load").hidden = true;
                            $("#ddlProjectvalue").empty();
                            data = JSON.parse(data1);
                            var count = Object.keys(data).length;
                            if (count >= 1) {
                                var optionhtml1 = '<option value="' +
                                    0 + '">' + "--Select Project--" + '</option>';
                                $("#ddlProjectvalue").append(optionhtml1);
                                $.each(data.value, function (i) {
                                    var optionhtml = '<option value="' +
                                        data.value[i].id + '">' + data.value[i].name + '</option>';
                                    $("#ddlProjectvalue").append(optionhtml);

                                });
                                 OrganizationChart();
                                    //document.getElementById("overlay").style.display = "none";
                                    //document.getElementById("load").hidden = true;
                            };
                        },

                        error: function (request, error) {
                             document.getElementById("overlay").style.display = "none";
                            document.getElementById("load").hidden = true;
                            $("#ddlProjectvalue").empty();
                            alert('Something went wrong');
                        }
                    });
            })
        });
        //@*function iteration()
        //{
        //    var org=$("#OrganizationDrop option:selected").text();
        //    var projectvalue = $("#ddlProjectvalue option:selected").text();
        //    $.ajax({
        //                url: '@Url.Action("IterationsList","Home")',
        //                type: 'Get',
        //                data: { 'ORG':org ,'project':projectvalue },//, 'pat': pat },
        //                //dataType: 'json',
        //        success: function (data1) {
        //            var iterationStore = [];
        //            data = json.parse(data1);
        //            iterationStore=data;

        //        },
        //        Error: function () {

        //        }

        //}*@

        $('#ddlProjectvalue').change(function () {
          //  document.getElementsByClassName("orgChartload").hidden = true;
              //document.getElementsById("orgChartload").hidden = true;
              //document.getElementsById("orgChartload1").hidden = true;
            document.getElementById("overlay").style.display = "block";
            document.getElementById("load").hidden = false;
            $('.orgChartload').hide();
            $('#orgChartload').hide();
            $('#orgChartload1').hide();
            //$('.row').show();
            $('#row1').show();
            $('#row2').show();
            $('#row3').show();
            $('#row4').hide();
             // document.getElementsByClassName("row").hidden = false;
            var projectvalue = $("#ddlProjectvalue option:selected").val();
            if (projectvalue == "0") {
                 $("#critWorkitem").text("");
                $("#WorkitemDeadLine").text("");
                $("#build1").text("");
            $("#release1").text("");
            $("#critWorkitem").css("background-color", "red");
                $('#bugid').css("background-color", "white");
                return;
            }
            //document.getElementById("overlay").style.display = "block";
            //document.getElementById("load").hidden = false;



                $("#critWorkitem").text("");
                $("#WorkitemDeadLine").text("");
                $("#build1").text("");
            $("#release1").text("");
            $("#critWorkitem").css("background-color", "red");
                $('#bugid').css("background-color", "white");
                //document.getElementById("overlay").style.display = "block";
                //document.getElementById("ProjCounts").hidden = false;
            var projectName = $("#ddlProjectvalue option:selected").text();

                //iteration();
                if (projectName != null || projectName != "")
                    $.ajax({
                        url: '@Url.Action("Build","Home")',
                        type: 'Get',
                        data: { 'projectName': projectName },//, 'pat': pat },
                        //dataType: 'json',
                        success: function (data1) {

                           //document.getElementById("overlay").style.display = "none";
                           //document.getElementById("load").hidden = true;
                            data = JSON.parse(data1);
                            BuildStore = data;
                            var count = Object.keys(data).length;
                            $("#build1").text(count);
                            var builddata1=0

                            $.each(data.value, function (m) {
                                builddata1++;
                            })

                            console.log('build ' + buildSession +'build data'+builddata1)
                           // var buildSession = '<%= Session["BuildCount"] %>';
                                //if ('<%=(Session["BuildCount"] == null)%>')
                                //{
             
                                //}

                            var FailedBuildListStore = [];

                            failedcountBuild=0;
                            console.log(data);
                                $.each(data.value, function (i) {
                                    //var optionhtml = '<option value="' +
                                    //    data.value[i].id + '">' + data.value[i].name + '</option>';
                                    if (data.value[i].result == "failed")
                                         {
                                       // BuildList.Add(data);
                                      FailedBuildListStore.push(data[i]);
                                        failedcountBuild++;
                                        console.log(i);
                                          }
                                });
                            $("#buildspan").text(failedcountBuild);
                            $("#buildicon").text(failedcountBuild);
                            jsonResult = failedcountBuild;// count;
                            jsonResult2 = builddata1;
                            google.charts.load('current', {'packages':['corechart']});
                            google.charts.setOnLoadCallback(drawChart);
                            //dailySalesChart
                           // document.getElementById("overlay").style.display = "none";
                           //document.getElementById("load").hidden = true;
                        },

                        error: function (request, error) {
               //              document.getElementById("overlay").style.display = "none";
               //document.getElementById("load").hidden = true;
                       //     alert('Something went wrong');
                        }
                    });


                 var orgName=$("#OrganizationDrop option:selected").text();
                var projectName = $("#ddlProjectvalue option:selected").text();


                if (orgName != null || orgName!="" || projectName != null || projectName != "")
               // document.getElementById("overlay").style.display = "block";
               //document.getElementById("load").hidden = false;
                    $.ajax({
                        url: '@Url.Action("WorkitemDeadline","Home")',
                        type: 'Get',
                        data: { 'projectName':projectName},//, 'pat': pat },
                       // dataType: 'json',
                        success: function (data1) {

                            if (data1 == "null") {
                                var count = 0;
                                $('#WorkitemDeadLine').text(count);
                                $('#workitemspan').text(count);
                            }
                            else {
                                data = JSON.parse(data1);

                                WorkitemStore = data;
                                //     //alert('workitem succeded Deadline')
                                var count = Object.keys(data).length;
                                $('#WorkitemDeadLine').text(count);
                                $("#workitemicon").text(count);
                                //data = JSON.parse(data1);
                                var count = Object.keys(data).length;
                            }
                            //jsonResultworkdeadline
                           // if ('<%=((Session["WorkItemstotal"] == null) ? 1 : 0))%>')
                                //  if ('<%=(Session["WorkItemstotal"] == null)%>')
                            //{
                            var workitemcounttotal = 0;
                            if (data != null || data != undefined)
                            {
                            $.each(data, function (i) {

                                workitemcounttotal = data[i].totalworkItemCounts
                                console.log('not session'+workitemcounttotal)
                                });
                               }
                            if (data == null ||data == undefined)
                            {
                                console.log('session')
                                workitemcounttotal = '@Session["WorkItemstotal"]';
                            }


                            workitemdeadline1 = workitemcounttotal;//'@Session["WorkItemstotal"]';
                               // }

                            //jsonResultDeadline = count;
                            var storecount = 0;
                            $.each(data, function (m) {
                                storecount++;
                            })
                            jsonResult = count;
                            jsonResult4 = workitemcounttotal;
                            $('#workitemspan').text(jsonResult);
                            google.charts.load('current', {'packages':['corechart']});
                            google.charts.setOnLoadCallback(drawChartDeadLine);
                            //document.getElementById("overlay").style.display = "none";
                            // document.getElementById("load").hidden = true;
                        },

                        error: function (request, error) {
                             //document.getElementById("overlay").style.display = "none";
                             //document.getElementById("load").hidden = true;
                            //alert('Something went wrong');
                        }
                    });
             //document.getElementById("overlay").style.display = "block";
             //  document.getElementById("load").hidden = false;
                // Critical Work
                if (orgName != null || orgName!="" || projectName != null || projectName != "")
                    $.ajax({
                        url: '@Url.Action("Workitem","Home")',
                        type: 'Get',
                        data: { 'projectName':projectName },//, 'pat': pat },
                      //  dataType: 'json',
                        success: function (data1) {

                            var count;
                            if (data1 == "null") {
                                count = 0;
                            }
                            else {
                                data = JSON.parse(data1);
                                 CriticalStore =data;
                                //      alert('Critical Work Item')
                                var count = Object.keys(data).length;
                                if (count == 3) {
                                    $('#bugid').css("background-color", "yellow");
                                }
                                if (count >= 5) {
                                    $('#bugid').css("background-color", "red");
                                    $('#critWorkitem').css("background-color", "blue");
                                    alert('Project Health is at risk, ' + count + ' critical risk found');
                                }
                                if (count < 3) {
                                    $('#critWorkitem').css("background-color", "red");
                                    $('#bugid').css("background-color", "white");
                                }
                            }
                            $('#critWorkitem').text(count);
                            $('#criticalbugspan').text(count);
                            $("#criticalbugicon").text(count);
                            //data = JSON.parse(data1);
                            //var count = Object.keys(data).length;
                             //if ('<%=(Session["WorkItemscount"] == null)%>')
                             //   {
                                    workitemSession = '@Session["WorkItemscount"]';
                                //}

                            jsonResultbug = count;
                            //google.charts.load('current', {'packages':['corechart']});
                            //google.charts.setOnLoadCallback(drawChartbug);
                            google.charts.load('current', {'packages':['gauge']});
                            google.charts.setOnLoadCallback(drawChartbug);
                             //document.getElementById("overlay").style.display = "none";
                             //document.getElementById("load").hidden = true;
                        },

                        error: function (request, error) {
                              //document.getElementById("overlay").style.display = "none";
                             //document.getElementById("load").hidden = true;
                         //   alert('Something went wrong');
                        }
                    });

                 var projectName12 = $("#ddlProjectvalue option:selected").text();

            if (projectName12 != null || projectName12 != "")
                     document.getElementById("overlay").style.display = "block";
                     document.getElementById("load").hidden = false;

                    $.ajax({
                        url: '@Url.Action("Release","Home")',
                        type: 'Get',
                        data: {'projectName':projectName12},//, 'pat': pat },
                        //dataType: 'json',
                        success: function (data1) {

                            data = JSON.parse(data1);
                            ReleaseStore = data;
                            var count = Object.keys(data).length;
                            console.log('result count' +count)

                              ReleaseCountTotal = 0;
                            //if ('<%=(Session["ReleaseCount"] != null)%>')
                            //    {
                                //    ReleaseCount = @*'@Session["ReleaseCount"]';*@
                               // }
                            //
                            $.each(data.value, function (m) {
                                ReleaseCountTotal++;
                            });

                            var failedReleases = [];
                            failedcountrelease = 0;
                    console.log(data);
                    $.each(data.value, function (i) {
                        // release.environments[0].deploySteps[0].status
                        var statusData = ""; /*data.value[i]["environments"]*/
                        if (data.value[i]["environments"] != null || data.value[i]["environments"] != undefined)
                        {
                            if (data.value[i].environments[0] != null || data.value[i].environments[0] != undefined) {
                                if (data.value[i].environments[0].deploySteps != null || data.value[i].environments[0].deploySteps != undefined) {
                                    if (data.value[i].environments[0].deploySteps.length > 0) {
                                        if (data.value[i].environments[0].deploySteps[0].releaseDeployPhases != null || data.value[i].environments[0].deploySteps[0].releaseDeployPhases != undefined) {
                                            if (data.value[i].environments[0].deploySteps[0].releaseDeployPhases.length > 0) {
                                                if (data.value[i].environments[0].deploySteps[0].releaseDeployPhases[0].status != null || data.value[i].environments[0].deploySteps[0].releaseDeployPhases[0].status != undefined) {
                                                    statusData = data.value[i].environments[0].deploySteps[0].releaseDeployPhases[0].status;
                                                    failedReleases.push(data.value[i]);
                                                    failedcountrelease++;
                                                }

                                            }
                                        }
                                    }
                                }
                            }
                        }
                        console.log(statusData);
                        console.log("failed releases"+failedcountrelease);
                        })

                            jsonResult = failedcountrelease;
                            jsonResult1 = ReleaseCountTotal;
                            $("#releasespan").text(failedcountrelease);
                            $('#release').text(failedcountrelease);
                            $('#releaseicon').text(failedcountrelease);
                        resultId = count;
                             //jsonResultrelease = count;
                            google.charts.load('current', {'packages':['corechart']});
                            google.charts.setOnLoadCallback(drawChartRelease);

                            document.getElementById("overlay").style.display = "none";
                            document.getElementById("load").hidden = true;
                        },

                        error: function (request, error) {
                             document.getElementById("overlay").style.display = "none";
               document.getElementById("load").hidden = true;
                       //     alert('Something went wrong');
                        }
                    });
             //document.getElementById("overlay").style.display = "none";
             //document.getElementById("load").hidden = true;
        })
        $('#criticalclick').click(function (){
            var orgName = $("#OrganizationDrop option:selected").text();
              var projName = $("#ddlProjectvalue option:selected").text();
                  tabledata = "<table id='dataTable'><thead><tr><th>ID</th><th>Title</th><th>Assigned To</th></thead><tbody>";
                            console.log(data);
                            $.each(CriticalStore, function (i) {
                                tabledata += "<tr class='tableData details-control'><td>" + CriticalStore[i].id + "</td><td><a- href='https://dev.azure.com/"+orgName+"/"+projName+"/_workitems/edit/"+CriticalStore[i].id+"'>" + CriticalStore[i]["fields"]["System.Title"] + "</a></td><td>" + (CriticalStore[i]["fields"]["AssignedTo"] != null ? CriticalStore[i]["fields"]["AssignedTo"]["displayName"] :"") + "</td></tr > ";
                            });

                  tabledata += "</tbody></table>";
                  console.log(tabledata);
                  $("#dataTable1").append(tabledata);
                    table = $('#dataTable').DataTable();
        })

            //Release
        $('#SelectAllProject').click(function () {
            var orgName = $("#OrganizationDrop option:selected").val();
                var projectName = $("#ddlProjectvalue option:selected").text();
                 var table = $('#dataTable').DataTable();

            if (table.data().any()) {
                return;
            }
            else {

                //$('#dataTable').DataTable().destroy();
                //        $('#dataTable').remove();
                if (orgName == "0") {
                    alert('Please Select the organization')
                }
                if (orgName != "0") {
                    if (projectName != null || projectName != "")
                        document.getElementById("overlay").style.display = "block";
                    document.getElementById("load").hidden = false;

                    $.ajax({
                        url: '@Url.Action("AllProjectList","Home")',
                        type: 'Get',
                        data: {},//, 'pat': pat },
                        //dataType: 'json',
                        success: function (data1) {
                            data = JSON.parse(data1);
                            DataStore = data;
                            var count = Object.keys(data).length;
                            //<tr style="background-color:#ffb3b3" class="details-controlRun"><td style="padding-left:42%" class="text-dark">No Testcases found</td></tr>';
                            if (count >= 1) {
                                //
                                tabledata = "<table id='dataTable'><thead><tr><th>Project ID</th><th>Project Name</th><th></th></thead><tbody>";

                                $.each(data, function (i) {
                                    tabledata += "<tr class='tableData details-control'><td>" + data[i].ProjectId + "</td><td>" + data[i].ProjectName + "</td><td><img src='../Content/Icons/details_open.png'height='20px' width='20px' /></td></tr>";

                                });
                                tabledata += "</tbody></table>";
                                console.log(tabledata);
                                $("#DataTableDiv").append(tabledata);
                                table = $('#dataTable').DataTable();
                                $('#dataTable tbody').on('click', 'tr.details-control', function () {
                                    var tr = $(this).closest('tr');
                                    var row = table.row(tr);
                                    if (row.child.isShown()) {
                                        // This row is already open - close it
                                        $('div.slider', row.child()).slideUp(function () {
                                            row.child.hide();
                                            tr.removeClass('shown');
                                        });
                                    }
                                    else {

                                        var a = $(".shown");
                                        console.log(a);
                                        for (var n = 0; n < a.length; n++) {
                                            console.log(a[n]);
                                            var hiderow = table.row(a[n]);
                                            $('div.slider', hiderow.child()).slideUp(function () {
                                                hiderow.child.hide();
                                            });
                                            a[n].classList.remove("shown");
                                            //a[n].nextSibling.innerHTML = '';                              ';hh
                                        }

                                        row.child(format(row.data()) + '</table></div>').show();

                                        tr.addClass('shown');

                                        $('div.slider', row.child()).slideDown('1000');
                                    }
                                    s = '<div class="slider"><table style="width:100" class="dataTable table bg-dark table-dark">';
                                    j = 0;

                                });


                                console.log($('#dataTable'));
                                //$('#dataTable').DataTable();

                            }
                            document.getElementById("overlay").style.display = "none";
                            document.getElementById("load").hidden = true;
                        },

                        error: function (request, error) {
                            document.getElementById("overlay").style.display = "none";
                            document.getElementById("load").hidden = true;

                            alert('Something went wrong');
                        }

                    });
                }
            }
            })
        var s = '<div class="slider"><table style="width:100" class="dataTable table bg-dark table-dark" >';
         function format(d) {
                //document.getElementById("overlay").style.display = "block";
                //document.getElementById("load").hidden = false;
                // `d` is the original data object for the row
                var testPlan=$('#TestPlanDrop').val();
                let projectName = d[1];
                         s += '<tr style="background-color:black" class="details-controlRun"><td style="padding-left:42%" class="text-dark"><td>Failed Build Counts</td><td>Failed Release Counts</td><td>Critical Bugs Count</td><td>WorkItems Exceeds Finish date</td></tr>'
                // s += '<tr style="background-color:black" class="details-controlRun"><td style="padding-left:42%" class="text-dark"><td>TestCase Id</td><td>TestCase Name</td></tr>'
                //document.getElementById("overlay").style.display = "block";
                //document.getElementById("load").hidden = false;

                $.each(DataStore, function (i)
                {
                    if (DataStore[i].ProjectName == projectName) {
                        if (DataStore[i].CriticalBugCount == 3) {
                            s += '<tr style="background-color:yellow;color:black" class="details-controlRun"><td style="padding-left:42%" class="text-dark"><td>' + DataStore[i].BuildCount + '</td><td>' + DataStore[i].ReleaseCount + '</td><td>' + DataStore[i].CriticalBugCount + '</td><td>' + DataStore[i].WorkItemDeadLineCount + '</td></tr>'
                            //s += '<tr style="background-color:#ffb3b3" class="details-controlRun"><td style="padding-left:42%" class="text-dark"><td>' + data.value[i].workItem.id + '</td><td>' + data.value[i].workItem.name + '</td></tr>'
                        }
                        if (DataStore[i].CriticalBugCount >= 5) {
                            s += '<tr style="background-color:red;color:black" class="details-controlRun"><td style="padding-left:42%" class="text-dark"><td>' + DataStore[i].BuildCount + '</td><td>' + DataStore[i].ReleaseCount + '</td><td>' + DataStore[i].CriticalBugCount + '</td><td>' + DataStore[i].WorkItemDeadLineCount + '</td></tr>'
                            alert('Project Health is at Risk: Found '+DataStore[i].CriticalBugCount+' critical bugs on the project');
                        }
                        if (DataStore[i].CriticalBugCount < 3) {
                            s += '<tr style="background-color:lightgrey;color:black" class="details-controlRun"><td style="padding-left:42%" class="text-dark"><td>' + DataStore[i].BuildCount + '</td><td>' + DataStore[i].ReleaseCount + '</td><td>' + DataStore[i].CriticalBugCount + '</td><td>' + DataStore[i].WorkItemDeadLineCount + '</tr>'
                        }
                    }
                    //document.getElementById("overlay").style.display = "none";
                    //document.getElementById("load").hidden = true;
                })
                return s;
        }

        //});
        function drawChart() {
            var totalBuilds = jsonResult2;//buildSession;
            var total = totalBuilds - failedcountBuild;//jsonResult;

        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
            ['Failed Build', failedcountBuild],//jsonResult],
            ['other Build', total]

        ]);

        var options = {
          title: 'Build Report'
        };
            buildSession = 0;
            var chart = new google.visualization.PieChart(document.getElementById('dailySalesChart'));

            //
            function selectHandler() {
                        $('#dataTable').DataTable().destroy();
                        $('#dataTable').remove();

          var selectedItem = chart.getSelection()[0];
          if (selectedItem) {
              var topping = data.getValue(selectedItem.row, 0);
              modal.style.display = "block";
              alert('The user selected ' + topping);

                  tabledata = "<table id='dataTable'><thead><tr><th>Build ID</th><th>Build Number</th></thead><tbody>";
              var orgName = $("#OrganizationDrop option:selected").text();
              var projName = $("#ddlProjectvalue option:selected").text();
              $.each(BuildStore.value, function (i) {
                  tabledata += "<tr class='tableData details-control'><td><a href='https://dev.azure.com/" + orgName + "/" + projName + "/_build/results?buildId=" + BuildStore.value[i].id + "&view=results'>" + BuildStore.value[i].id + "</a></td><td>" + BuildStore.value[i].buildNumber + "</td></tr>";

                  });
                  tabledata += "</tbody></table>";
                  console.log(tabledata);
                  $("#dataTable1").append(tabledata);
                    //$("#dataTable1").html(tabledata);
                    table = $('#dataTable').DataTable();


          }
        }

        google.visualization.events.addListener(chart, 'select', selectHandler);
        chart.draw(data, options);
    }
    //function drawChartrelease() {
    //        var totalReleases = ReleaseCount;
    //        var total = totalReleases - jsonResult;

    //    var data = google.visualization.arrayToDataTable([
    //      ['Task', 'Hours per Day'],
    //        ['Failed Build', jsonResult],
    //        ['other Build', total]

    //    ]);

    //    var options = {
    //      title: 'Release Report'
    //    };

    //    var chart = new google.visualization.PieChart(document.getElementById('dailySalesChart'));

    //    chart.draw(data, options);
    //}
    //            //
      // google.charts.load('current', {'packages':['gauge']});
      //google.charts.setOnLoadCallback(drawChartbug);

    function drawChartbug() {
            var totalworkitems = workitemSession;
        var total = totalworkitems - jsonResultbug;
        var bug;
        if (jsonResultbug == 5) {
            bug = 93;
        }
        else if (jsonResultbug > 5) {
            bug = 100;
        }
        else if (jsonResultbug == 3) {
            bug = 75;
        }
        else if (jsonResultbug == 4) {
            bug = 85;
        }
        else if (jsonResultbug == 2) {
            bug = 50;
        }
        else if (jsonResultbug == 1) {
            bug = 25;
        }
        else {
            bug = 0;
        }
        //graud chart
        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],

          ['Critical Bugs',bug ]
        ]);

        var options = {
          width: 450, height: 200,
          redFrom: 90, redTo: 100,
          yellowFrom:75, yellowTo: 90,
          minorTicks: 5
        };

        var chart = new google.visualization.Gauge(document.getElementById('websiteViewsChart'));

        //chart.draw(data, options);



        //end graud chart
        //var data = google.visualization.arrayToDataTable([
        //  ['Task', 'Hours per Day'],
        //    ['Critical Bugs', jsonResultbug],
        //    ['Other Work items', total]

        //]);

        //var options = {
        //  title: 'Critical Bugs'
        //};

        //var chart = new google.visualization.PieChart(document.getElementById('websiteViewsChart'));

        // //
                    function selectHandler() {
          var selectedItem = chart.getSelection()[0];
                        if (selectedItem) {
                $('#dataTable').DataTable().destroy();
                        $('#dataTable').remove();
              var topping = data.getValue(selectedItem.row, 0);
              modal.style.display = "block";
              alert('The user selected ' + topping);
              var orgName = $("#OrganizationDrop option:selected").text();
              var projName = $("#ddlProjectvalue option:selected").text();
                  tabledata = "<table id='dataTable'><thead><tr><th>ID</th><th>Title</th><th>Assigned To</th></thead><tbody>";
                            console.log(data);
                            $.each(CriticalStore, function (i) {
                                tabledata += "<tr class='tableData details-control'><td>" + CriticalStore[i].id + "</td><td><a href='https://dev.azure.com/"+orgName+"/"+projName+"/_workitems/edit/"+CriticalStore[i].id+"'>" + CriticalStore[i]["fields"]["System.Title"] + "</a></td><td>" + (CriticalStore[i]["fields"]["AssignedTo"] != null ? CriticalStore[i]["fields"]["AssignedTo"]["displayName"] :"") + "</td></tr > ";
                            });

                  tabledata += "</tbody></table>";
                  console.log(tabledata);
                  $("#dataTable1").append(tabledata);
                    table = $('#dataTable').DataTable();


          }
        }

        google.visualization.events.addListener(chart, 'select', selectHandler);

        //    //
        chart.draw(data, options);
    }

    function drawChartRelease() {

        var totalRelease = jsonResult1;//resultId;
        var totalrel = totalRelease - jsonResult;//jsonRelease;
        console.log('rel chart' + jsonResult1 + ' count & failed' + jsonResult +'total:'+totalrel)

            var data = google.visualization.arrayToDataTable([
                ['Task', 'Hours per Day'],
                ['Failed Releases', jsonResult],//jsonRelease],
                ['Other Releases', totalrel]

            ]);
        jsonResult1 = 0;
            var options = {
                title: 'Failed Releases',
                  pieHole: 0.3,
            };
            ReleaseCountTotal = 0;
            var chart = new google.visualization.PieChart(document.getElementById('Releasechart'));

        //
        function selectHandler() {

          var selectedItem = chart.getSelection()[0];
                        if (selectedItem) {
                $('#dataTable').DataTable().destroy();
                        $('#dataTable').remove();
              var topping = data.getValue(selectedItem.row, 0);
              modal.style.display = "block";
              alert('The user selected ' + topping);
              var orgName = $("#OrganizationDrop option:selected").text();
              var projName = $("#ddlProjectvalue option:selected").text();
     tabledata = "<table id='dataTable'><thead><tr><th>Release ID</th><th>Release Name</th><th>Status</th></thead><tbody>";

                            $.each(ReleaseStore.value, function (i) {
                                tabledata += "<tr class='tableData details-control'><td>" + ReleaseStore.value[i].id + "</td><td><a href='https://dev.azure.com/"+orgName+"/"+projName+"/_releaseProgress?_a=release-pipeline-progress&releaseId="+ReleaseStore.value[i].id+"'>" + ReleaseStore.value[i].name + "</td><td>" + ReleaseStore.value[i].status + "</td></tr > ";

                  });
                  tabledata += "</tbody></table>";
                  console.log(tabledata);
                  $("#dataTable1").append(tabledata);
                    table = $('#dataTable').DataTable();


          }
        }

        google.visualization.events.addListener(chart, 'select', selectHandler);

            //


            chart.draw(data, options);
        //}
                }



                function drawChartDeadLine() {

                    var totalworkitem1 = jsonResult4;
                    var totaldata = totalworkitem1 - jsonResult;//jsonResultDeadline;
                    if (totaldata < 0) {
                        var data = google.visualization.arrayToDataTable([
                            ['Task', 'Hours per Day'],
                            ['Expired Workitem', 0],//jsonResultworkdeadline],
                            ['Other WorkItems', 0]

                        ]);

                    }
                    else {
                        var data = google.visualization.arrayToDataTable([
                            ['Task', 'Hours per Day'],
                            ['Expired Workitem', jsonResult],//jsonResultworkdeadline],
                            ['Other WorkItems', totaldata]

                        ]);
                    }

                        var options = {
                            title: 'WorkItems'
                        };

                        var chart = new google.visualization.PieChart(document.getElementById('workitemchart'));

                         //
                        function selectHandler() {

          var selectedItem = chart.getSelection()[0];
                        if (selectedItem) {
                $('#dataTable').DataTable().destroy();
                        $('#dataTable').remove();
              var topping = data.getValue(selectedItem.row, 0);
              modal.style.display = "block";
              alert('The user selected ' + topping);
              var orgName = $("#OrganizationDrop option:selected").text();
              var projName = $("#ddlProjectvalue option:selected").text();
                  tabledata = "<table id='dataTable'><thead><tr><th>WorkItem ID</th><th>WorkItem Name</th><th>Assigned To</th></thead><tbody>";

              $.each(WorkitemStore, function (i) {
                  tabledata += "<tr class='tableData details-control'><td>" + WorkitemStore[i].id + "</td><td><a href='https://dev.azure.com/"+orgName+"/"+projName+"/_workitems/edit/"+WorkitemStore[i].id+"'>" + WorkitemStore[i]["fields"]["System.Title"] + "</a></td><td>" + (WorkitemStore[i]["fields"]["AssignedTo"] != null ? WorkitemStore[i]["fields"]["AssignedTo"]["displayName"] : "") + "</td></tr > ";
                   //tabledata += "<tr class='tableData details-control'><td>" + CriticalStore[i].id + "</td><td>" + CriticalStore[i]["fields"]["System.Title"] + "</a></td><td>+" + CriticalStore[i]["fields"]["System.AssignedTo"] + "</td></tr > ";

                  });
                  tabledata += "</tbody></table>";
                  console.log(tabledata);
                  $("#dataTable1").append(tabledata);
                    table = $('#dataTable').DataTable();


          }
        }

        google.visualization.events.addListener(chart, 'select', selectHandler);

            //

                        chart.draw(data, options);
                    }

        $('#clickHere').click(function () {
            orgChartLevel22();
        })


            // var ReleaseStore = [];
            //var CriticalStore = [];
            //var WorkitemStore = [];
        var dataLineChartStore = [];
        var dataLineChartStoreWorkItem=[];

        function OrganizationChart()
        {
            //document.getElementById("overlay").style.display = "block";
            //document.getElementById("load").hidden = false;
            var orgName = $("#OrganizationDrop option:selected").text();

            //iteration();
            if (orgName != null || orgName != "")
                $.ajax({
                    url: '@Url.Action("AllDataChart","Home")',  // AllProjectList AllDataChart
                    type: 'Get',
                    data: { 'orgName': orgName },//, 'pat': pat },
                    //dataType: 'json',
                    success: function (data1) {

                        data = JSON.parse(data1);
                        dataLineChartStore = [];
                        dataLineChartStore = data;

                        drawLineChart();
                        drawLineChartrelease();

                         google.charts.load('current', {'packages':['gauge']});
                    }
                })
            //Critical Bugs and Work Item load

              $.ajax({
                    url: '@Url.Action("AllDataWorkitem","Home")',
                    type: 'Get',
                    data: {},//, 'pat': pat },
                    //dataType: 'json',
                    success: function (data1) {

                        //document.getElementById("overlay").style.display = "none";
                        //document.getElementById("load").hidden = true;
                        data = JSON.parse(data1);

                        dataLineChartStoreWorkItem = data;

                        //google.charts.load('current', {'packages':['corechart']});
                        google.charts.load('current', {'packages':['gauge']});
                        google.charts.setOnLoadCallback(drawLineChartcritBug);
                        OrgWorkItemExpired();
                        document.getElementById("overlay").style.display = "none";
                        document.getElementById("load").hidden = true;
                        // google.charts.setOnLoadCallback(drawLineChartrelease);

                    }
                })
        }

           function drawLineChart()
           {
                   console.log('adding to the DataStore')

                   console.log(dataLineChartStore)

                 var label = [];
            var datastoreBuildCount = [];
            $.each(dataLineChartStore,function (i) {
                label.push(dataLineChartStore[i].ProjectName);
            })
               console.log(label);
               var buildDisplay = 0;
            $.each(dataLineChartStore,function (j) {
                buildDisplay = buildDisplay + dataLineChartStore[j].BuildCount;
                datastoreBuildCount.push(dataLineChartStore[j].BuildCount);
            })
               $('#orgbuild').text(buildDisplay);
               console.log(buildDisplay);
            console.log(datastoreBuildCount);

            var ctx = document.getElementById('top_x_div').getContext('2d');
               ctx.height = 100;
               options = {
                    responsive: true,
                    maintainAspectRatio: false
    
};
            var myBarChart = new Chart(ctx, {
                type: 'bar',

                data: {
                    labels: label,
                    datasets: [{
                        label: 'Builds',
                        backgroundColor: 'rgb(0,250,154)',
                        borderColor: 'rgb(255, 99, 132)',
                        data:datastoreBuildCount
                    }]
                }
            });
             options: {}

               //document.getElementById("overlay").style.display = "none";
               //document.getElementById("load").hidden = true;
}
        var chart;
        function drawLineChartrelease() {
            console.log(dataLineChartStore)
            // add each element via forEach loop
            var label = [];
            var releaseDisplay = 0;
            var datastoreReleaseCount = [];
            $.each(dataLineChartStore,function (i) {
                label.push(dataLineChartStore[i].ProjectName);

            })

            $.each(dataLineChartStore,function (j) {
                releaseDisplay = releaseDisplay + dataLineChartStore[j].ReleaseCount;
                datastoreReleaseCount.push(dataLineChartStore[j].ReleaseCount);
            })
            $('#orgrelease').text(releaseDisplay);
            console.log("Org release total count" + releaseDisplay)
            var ctx = document.getElementById('top_x_div_ReleaseBar').getContext('2d');
            ctx.height = 100;
            options = {
                 responsive: true,
                maintainAspectRatio: false
    
};
            var myBarChart = new Chart(ctx, {

                type: 'bar',
                data: {
                    labels: label,
                    datasets: [{
                        label: 'Releases',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data:datastoreReleaseCount
                    }]
                }
            });
                options: {}
        }

        function drawLineChartcritBug() {
            var bugstore = 0;
            $.each(dataLineChartStoreWorkItem, function (i) {  //  dataLineChartStore dataLineChartStoreWorkItem
                bugstore = bugstore + dataLineChartStoreWorkItem[i].CriticalBugCount;
            })
            $('#orgcriticalbug').text(bugstore);

            var bug;
            if (bugstore == 5) {
                bug = 93;
            }
            else if (bugstore > 5) {
                bug = 100;
            }
            else if (bugstore == 3) {
                bug = 75;
            }
            else if (bugstore == 4) {
                bug = 85;
            }
            else if (bugstore == 2) {
                bug = 50;
            }
            else if (bugstore == 1) {
                bug = 25;
            }
            else {
                bug = 0;
            }
            console.log(bug);
            //graud chart
            var data = google.visualization.arrayToDataTable([
                ['Label', 'Value'],

                ['Critical Bugs', bug]
            ]);

            var options = {
                width: 450, height: 200,
                redFrom: 90, redTo: 100,
                yellowFrom: 75, yellowTo: 90,
                minorTicks: 5
            };

            var chart = new google.visualization.Gauge(document.getElementById('chart_div_criticalBug'));
             chart.draw(data, options);
        }
        function OrgWorkItemExpired() {
            var grapharea = document.getElementById("top_x_div_workitem").getContext("2d");
            $('#top_x_div_workitem').html("");

           // myChart.destroy();

            var label = [];
            var datastoreworkitemCount = [];
                       $.each(dataLineChartStore,function (i) {
                label.push(dataLineChartStore[i].ProjectName);
            })
            console.log(label);
            var workitemDisplay = 0;
            $.each(dataLineChartStoreWorkItem,function (j) {  //dataLineChartStoreWorkItem
                datastoreworkitemCount.push(dataLineChartStoreWorkItem[j].WorkItemDeadLineCount);
                var storeData = parseInt(dataLineChartStoreWorkItem[j].WorkItemDeadLineCount);
                workitemDisplay = workitemDisplay + storeData;
                console.log(workitemDisplay);
            })
            console.log(workitemDisplay);
            $('#orgworkitem').text(workitemDisplay);
            var ctx = document.getElementById('top_x_div_workitem').getContext('2d');
            options = {
                 responsive: true,
                maintainAspectRatio: false
};
            var myBarChart = new Chart(ctx, {
                //type: 'bar',
                 type: 'horizontalBar',
                data: {
                    labels: label,
                    datasets: [{
                        label: 'WorkItems Exceeded Finishing date',
                        backgroundColor: 'rgb(153,50,204)',
                        borderColor: 'rgb(255, 99, 132)',
                        data:datastoreworkitemCount
                    }]
                }
            });
             options: {}
        }