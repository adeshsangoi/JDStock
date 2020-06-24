var stop_closing = 0;
var final_edit_id;

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

$(document).ready(function () {
    var salesReport = document.getElementById('salesReport');

    var starts = '<br><br><table class="table table-striped table-bordered" id="tableSales">\
              <colgroup>\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 9%;">\
               </colgroup>\
              <thead class="thead-dark">\
              <tr>\
              <th>BALE NO.</th>\
              <th>QUALITY</th>\
              <th>DESIGN</th>\
              <th>TAKA</th>\
              <th>MTS</th>\
              <th>BUYER</th>\
              <th>DATE</th>\
              <th style="width: 50px;"></th>\
              </tr>\
              </thead>';
    var ends = '</table>';
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: '/salesReportData',
        data: {
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            dat = JSON.parse(data);
            for (var i = 0; i < dat.length; i++) {
                dat[i] = JSON.parse(dat[i])
            }

            var tmp = '';
            for (var i = 0; i < dat.length; i++) {
                var arr = dat[i].date.split("-");
                dat[i].date = arr[2] + "/" + arr[1] + "/" + arr[0];
                tmp = tmp + '<tr>';
                tmp = tmp + '<td>' + dat[i].bale_no.toString() + '</td>';
                tmp = tmp + '<td class="col1s">' + dat[i].our_quality_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].design.toString() + '</td>';
                tmp = tmp + '<td class="col2s">' + dat[i].taka.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].mts.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].buyer_name.toString() + '</td>'
                tmp = tmp + '<td>' + dat[i].date.toString() + '</td>';
                tmp = tmp + '<td>' + '<button onclick="showGivenSaleEntry(this.id)"  class="btn btn-success" id="edit_btnn" style="width: 100%;"> Edit </button> ' + '</td>';
                tmp = tmp + '</tr>';
            }
            salesReport.innerHTML = starts + tmp + ends;
            for (var i = 0; i < dat.length; i++) {
                document.getElementById("edit_btnn").setAttribute("id", "edit" + dat[i].id.toString());
            }
        },
        error: function (xhr) {
            var error_message = xhr.responseText.split(" ")[0]
            console.log(error_message)
            if (error_message === "MultipleObjectsReturned") {
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'More than 1 Entry Found with given details',
                })
            } else if (error_message === "DoesNotExist") {
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'No Entry Found with given details',
                })
            } else {
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'Some Unknown Error Occured',
                })
            }
        }
    })

});

function selectGivenTable() {
    console.log("Entered");
    var filter1data = document.getElementById("filter1").value;
    var filter2data = document.getElementById("filter2").value;
    var filter3data = document.getElementById("filter3").value;
    var filter4data = document.getElementById("filter4").value;
    var filter5data = document.getElementById("filter5").value;
    var filter6data = document.getElementById("filter6").value;
    var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
    var startDate = ""
    var endDate = ""
    if (filter5data !== "") {
        var arr = filter5data.split("-");
        filter5data = arr[2] + "/" + arr[1] + "/" + arr[0];
        startDate = new Date(filter5data.replace(pattern, '$3-$2-$1'));
    }
    if (filter6data !== "") {
        var arr2 = filter6data.split("-");
        filter6data = arr2[2] + "/" + arr2[1] + "/" + arr2[0];
        endDate = new Date(filter6data.replace(pattern, '$3-$2-$1'));
    }

    var no_of_entries = document.getElementById("tableSales").childNodes[4].childNodes.length;

    for (i = 0; i < no_of_entries; i++) {
        var bale = document.getElementById("tableSales").childNodes[4].childNodes[i].childNodes[0].innerHTML;
        var quality = document.getElementById("tableSales").childNodes[4].childNodes[i].childNodes[1].innerHTML;
        var design = document.getElementById("tableSales").childNodes[4].childNodes[i].childNodes[2].innerHTML;
        var buyer = document.getElementById("tableSales").childNodes[4].childNodes[i].childNodes[5].innerHTML;
        var dt = document.getElementById("tableSales").childNodes[4].childNodes[i].childNodes[6].innerHTML;
        var dateEntry = new Date(dt.replace(pattern, '$3-$2-$1'));

        if ((bale.includes(filter1data)) && (quality.includes(filter2data)) && (design.includes(filter3data)) && (buyer.includes(filter4data))
            && ((startDate === "") || dateEntry >= startDate) && ((endDate === "") || dateEntry <= endDate)) {
            var ele = document.getElementById("tableSales").childNodes[4].childNodes[i];
            ele.classList.remove('hide-data');
            ele.style.display = "";
        } else {
            var ele2 = document.getElementById("tableSales").childNodes[4].childNodes[i];
            ele2.classList.add('hide-data');
            ele2.style.display = "none";
        }
    }
}

function exportSalesTable() {
    var copyTable = $("#tableSales").clone(false);
    copyTable.find('.hide-data').remove(); //removing rows while exporting
    copyTable.table2excel({
        filename: "SalesReport"
    });
    copyTable.remove();
}


function showGivenSaleEntry(id_to_edit) {
    var csrftoken = getCookie('csrftoken');
    $('#popupEditFormSaleReport').show();
    $('#salesReport').hide();
    $('#salesReport-header').hide();

    $.ajax({
        type: 'POST',
        url: '/showEditEntry',
        data: {
            id: id_to_edit,
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            item = JSON.parse(data);
            document.getElementById("date_edit_popup").value = item.date;
            document.getElementById("party_edit_popup").value = item.buyer_name;
            document.getElementById("bale_edit_popup").value = item.bale_no;
            document.getElementById("taka_edit_popup").value = item.taka;
            document.getElementById("mts_edit_popup").value = item.mts;
            document.getElementById("design_edit_popup").value = item.design;

            bale_id = item.bale_no;
            var arr = baleProdMap[bale_id];
            var option_field = '';
            for (var j = 0; j < arr.length; j++) {
                option_field = option_field + '<option>' + arr[j].toString() + '</option>'
            }

            document.getElementById('our_quality_edit_popup').innerHTML = option_field;

            document.getElementById("our_quality_edit_popup").value = item.our_quality_name;
            final_edit_id = id_to_edit;
        },
        error: function (xhr) {
            var error_message = xhr.responseText.split(" ")[0]
            console.log(error_message)
            if (error_message === "MultipleObjectsReturned") {
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'More than 1 Entry Found with given details',
                })
            } else if (error_message === "DoesNotExist") {
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'No Entry Found with given details',
                })
            } else {
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'Some Unknown Error Occured',
                })
            }
        }
    })
}

function closePopup() {
    stop_closing = 2;
    $('#popupEditFormSaleReport').hide();
    $('#salesReport').show();
    $('#salesReport-header').show();
}

function baleProdMappingEdit() {
    document.getElementById('our_quality_edit_popup').innerHTML = '';
    bale_id = document.getElementById('bale_edit_popup').value;
    if (bale_id === "") {
        var doNothing = 0;
    } else if (baleProdMap[bale_id] != null) {
        var arr = baleProdMap[bale_id];
        var option_field = '';
        for (var j = 0; j < arr.length; j++) {
            option_field = option_field + '<option>' + arr[j].toString() + '</option>'
        }
        document.getElementById('our_quality_edit_popup').innerHTML = option_field;
    } else {
        swal({
            icon: 'error',
            title: 'Error',
            text: 'No Entry Found with Bale Number = ' + bale_id,
        })
    }
}

$(document).on('submit', '#popupForm', function (e) {
    e.preventDefault();
    if (stop_closing > 1) {
        stop_closing = 0
    } else {
        swal({
            title: "This Entry will be Edited permanently!",
            text: "Are you sure to proceed?",
            icon: "warning",
            buttons: {
                confirm: 'Yes',
                cancel: 'No'
            },
            dangerMode: true,
        })
            .then((isConfirm) => {
                if (isConfirm) {
                    var salesReport = document.getElementById('salesReport');

                    var starts = '<br><br><table class="table table-striped table-bordered" id="tableSales">\
              <colgroup>\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 12%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 15%;">\
                   <col span="1" style="width: 9%;">\
                   </colgroup>\
                  <thead class="thead-dark">\
                  <tr>\
                  <th>BALE NO.</th>\
                  <th>QUALITY</th>\
                  <th>DESIGN</th>\
                  <th>TAKA</th>\
                  <th>MTS</th>\
                  <th>BUYER</th>\
                  <th>DATE</th>\
                  <th style="width: 50px;"></th>\
                  </tr>\
                  </thead>';
                  var ends = '</table>';
                    var csrftoken = getCookie('csrftoken');
                    $.ajax({
                        type: 'POST',
                        url: '/editGivenSaleInReport',
                        data: {
                            id: final_edit_id,
                            date_popup: $('#date_edit_popup').val(),
                            party_popup: $('#party_edit_popup').val(),
                            bale_popup: $('#bale_edit_popup').val(),
                            our_quality_popup: $('#our_quality_edit_popup').val(),
                            design_popup: $('#design_edit_popup').val(),
                            taka_popup: $('#taka_edit_popup').val(),
                            mts_popup: $('#mts_edit_popup').val(),

                            csrfmiddlewaretoken: csrftoken
                        },
                        success: function (data) {
                            dat = JSON.parse(data);
                            $('#popupEditFormSaleReport').hide();
                            $('#salesReport').show();
                            $('#salesReport-header').show();

                            if (dat.length === 0) {
                                salesReport.innerHTML = '';
                            } else {
                                for (var i = 0; i < dat.length; i++) {
                                    dat[i] = JSON.parse(dat[i])
                                }

                                var tmp = '';
                                for (var i = 0; i < dat.length; i++) {
                                    var arr = dat[i].date.split("-");
                                    dat[i].date = arr[2] + "/" + arr[1] + "/" + arr[0];
                                    tmp = tmp + '<tr>';
                                    tmp = tmp + '<td>' + dat[i].bale_no.toString() + '</td>';
                                    tmp = tmp + '<td class="col1s">' + dat[i].our_quality_name.toString() + '</td>';
                                    tmp = tmp + '<td>' + dat[i].design.toString() + '</td>';
                                    tmp = tmp + '<td class="col2s">' + dat[i].taka.toString() + '</td>';
                                    tmp = tmp + '<td>' + dat[i].mts.toString() + '</td>';
                                    tmp = tmp + '<td>' + dat[i].buyer_name.toString() + '</td>'
                                    tmp = tmp + '<td>' + dat[i].date.toString() + '</td>';
                                    tmp = tmp + '<td>' + '<button onclick="showGivenSaleEntry(this.id)"  class="btn btn-success" id="edit_btnn" style="width: 100%;"> Edit </button> ' + '</td>';
                                    tmp = tmp + '</tr>';
                                }
                                salesReport.innerHTML = starts + tmp + ends;
                                for (var i = 0; i < dat.length; i++) {
                                    document.getElementById("edit_btnn").setAttribute("id", "edit" + dat[i].id.toString());
                                }
                            }
                            stop_closing = 0
                            selectGivenTable();
                        },
                        error: function (xhr) {
                            var error_message = xhr.responseText.split(" ")[0]
                            console.log(error_message)
                            if (error_message === "MultipleObjectsReturned") {
                                swal({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'More than 1 Entry Found with given details',
                                })
                            } else if (error_message === "DoesNotExist") {
                                swal({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'No Entry Found with given details',
                                })
                            } else {
                                swal({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Some Unknown Error Occured',
                                })
                            }
                        }
                    })
                }
            });
    }

})
