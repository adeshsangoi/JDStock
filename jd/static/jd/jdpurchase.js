var numberOfEntries = 0;
var bill_no_del_table;
var bale_no_del_table;
var bill_no_edit_table;
var bale_no_edit_table;
var id_final_edit_popup;
var billbaleMap;
var stop_closing = 0;

var addboxdata =
    '<hr style="margin-left: -24px;margin-right: -24px;">\
        <div>\
            <h6 id="headerAdd" style="font-family: sans-serif;font-size:12px; text-transform: uppercase;padding-left: 5px;"></h6>\
        </div>\
        <div class="row">\
                 <div class="col-md-3">\
                    <input id="bale_add" class="form-control" placeholder="Bale Number" type="number" required>\
                </div>\
                <div class="col-md-3">\
                    <input id="party_quality_add" class="form-control" placeholder="Party Quality Name" type="text" oninput="this.value = this.value.toUpperCase()" required>\
                </div>\
                <div class="col-md-3">\
                    <input id="our_quality_add" class="form-control" placeholder="Our Quality Name" oninput="this.value = this.value.toUpperCase()" type="text" required>\
                </div>\
                <div class="col-md-3">\
                    <input id="design_add" class="form-control" placeholder="Design No." oninput="this.value = this.value.toUpperCase()" type="text">\
                </div>\
        </div>\
    <br>\
        <div class="row">\
                <div class="col-md-2">\
                    <input id="hsn_add" class="form-control" placeholder="HSN Code" oninput="this.value = this.value.toUpperCase()" type="text" required>\
                </div>\
                <div class="col-md-2">\
                    <input id="taka_add" class="form-control" placeholder="Taka" oninput="this.value = this.value.toUpperCase()" type="number" required>\
                </div>\
                <div class="col-md-2">\
                    <input id="mts_add" class="form-control" placeholder="Metres" oninput="this.value = this.value.toUpperCase()" type="text" required>\
                </div>\
                <div class="col-md-2">\
                    <input id="shortage_add" class="form-control" placeholder="Shortage" oninput="this.value = this.value.toUpperCase()" type="text" required>\
                </div>\
                <div class="col-md-2">\
                    <input id="place_add" class="form-control" placeholder="Place" oninput="this.value = this.value.toUpperCase()" type="text" required>\
                </div>\
                <div class="col-md-2">\
                    <select id="open_add" class="form-control" required>\
                        <option>PACK</option>\
                        <option>OPEN</option>\
                    </select>\
                </div>\
               </div>\
         </div>';

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

function addPurchase() {
    var purchasePage = document.getElementById('purchasePage');
    purchasePage.innerHTML = '<br> <br> <br>\
    <form id="add-head">\
    <div class="row">\
        <div class="col-md-2">\
            <input id="entryNumber" class="form-control" placeholder="No. of entries" min="1" max="20" type="number" required>\
        </div>\
        <div class="col-md-2">\
            <button type="submit" class="btn btn-secondary">Show Form</button>\
        </div>\
    </div>\
    </form>'

}

$(document).on('submit', '#add-head', function (e) {
    e.preventDefault();
    var purchasePage = document.getElementById('purchasePage');
    numberOfEntries = document.getElementById('entryNumber').value;
    // numberOfEntry = numberOfEntries
    // console.log(numberOfEntries)
    purchasePage.innerHTML = "";
    purchasePage.innerHTML =
        '<div class="card card-container">\
            <form class="form-signin" id="formAdd">\
            <h6 style="font-family: sans-serif;text-transform: uppercase;padding-left: 5px;">BILL DETAILS</h6>\
                <div class="row">\
                    <div class="col-md-4">\
                        <input id="date_add" class="form-control" placeholder="Date" type="date"  required>\
                    </div>\
                    <div class="col-md-4">\
                        <input id="bill_add" class="form-control" placeholder="Bill Number" type="number" required>\
                    </div>\
                    <div class="col-md-4">\
                        <input id="party_add" class="form-control" placeholder="Party Name" type="text" oninput="this.value = this.value.toUpperCase()"  required>\
                    </div>\
                </div>\
                <div class="baleEntry" id="baleEntry">\
                </div>\
                <hr style="margin-left: -24px;margin-right: -24px;"><button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Add Purchase Entry</button>\
            </form>\
        </div>\
        <br>\
            <br>';
    var i;
    var data = '';
    for (i = 0; i < numberOfEntries; i++) {
        data = data + addboxdata;
    }
    document.getElementById("baleEntry").innerHTML = data;
    document.getElementById('date_add').valueAsDate = new Date();

    for (i = 0; i < numberOfEntries; i++) {
        document.getElementById("headerAdd").innerHTML = "Entry " + (i + 1).toString();
        document.getElementById("headerAdd").setAttribute("id", "headerAdd " + i.toString());
        document.getElementById("bale_add").setAttribute("id", "bale_add" + i.toString());
        document.getElementById("party_quality_add").setAttribute("id", "party_quality_add" + i.toString());
        document.getElementById("our_quality_add").setAttribute("id", "our_quality_add" + i.toString());
        document.getElementById("design_add").setAttribute("id", "design_add" + i.toString());
        document.getElementById("hsn_add").setAttribute("id", "hsn_add" + i.toString());
        document.getElementById("taka_add").setAttribute("id", "taka_add" + i.toString());
        document.getElementById("mts_add").setAttribute("id", "mts_add" + i.toString());
        document.getElementById("shortage_add").setAttribute("id", "shortage_add" + i.toString());
        document.getElementById("place_add").setAttribute("id", "place_add" + i.toString());
        document.getElementById("open_add").setAttribute("id", "open_add" + i.toString());
    }
})


$(document).on('submit', '#formAdd', function (e) {
    e.preventDefault();
    var purchasePage = document.getElementById('purchasePage');
    var csrftoken = getCookie('csrftoken');
    dataArr = new Array(numberOfEntries);
    for (var i = 0; i < numberOfEntries; i++) {
        dataArr[i] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
    console.log(dataArr);
    for (var j = 0; j < numberOfEntries; j++) {
        dataArr[j][0] = document.getElementById("bale_add" + j.toString()).value;
        dataArr[j][1] = document.getElementById("party_quality_add" + j.toString()).value;
        dataArr[j][2] = document.getElementById("our_quality_add" + j.toString()).value;
        dataArr[j][3] = document.getElementById("design_add" + j.toString()).value;
        dataArr[j][4] = document.getElementById("hsn_add" + j.toString()).value;
        dataArr[j][5] = document.getElementById("taka_add" + j.toString()).value;
        dataArr[j][6] = document.getElementById("mts_add" + j.toString()).value;
        dataArr[j][7] = document.getElementById("shortage_add" + j.toString()).value;
        dataArr[j][8] = document.getElementById("place_add" + j.toString()).value;
        dataArr[j][9] = document.getElementById("open_add" + j.toString()).value;
    }

    dat = JSON.stringify(dataArr);

    $.ajax({
        type: 'POST',
        url: '/addPurchase',
        data: {
            date: $('#date_add').val(),
            bill: $('#bill_add').val(),
            party: $('#party_add').val(),
            'dataArray': dat,
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            swal("Congrats!", ", Your entry is Added!", "success");
            purchasePage.innerHTML = "";

        },
        error: function (data) {
            swal({
                icon: 'error',
                title: 'Error',
                text: 'Some Unknown Error Occured',
            })
        }
    })
})


function deletePurchase() {
    var purchasePage = document.getElementById('purchasePage');
    var csrftoken = getCookie('csrftoken');

    purchasePage.innerHTML = '<br> <br> <br>\
    <form id="formDelete">\
    <h6 style="font-family: sans-serif">Enter Bill Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Choose Bale Number</h6>\
    <div class="row">\
        <div class="col-md-2">\
            <input id="bill_no_for_delete" onchange="billBaleMapping()" class="form-control" placeholder="Bill Number" min="1" type="number" required>\
        </div>\
        <div class="col-md-2">\
                <select id="bale_options_delete" class="form-control" required>\
                 </select>\
        </div>\
        <div class="col-md-2">\
            <button type="submit" class="btn btn-secondary">Submit</button>\
        </div>\
    </div>\
    </form>'
    $.ajax({
        type: 'POST',
        url: '/getBillBaleMap',
        data: {
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            billbaleMap = JSON.parse(data);
        }
    })

}

function billBaleMapping() {
    document.getElementById('bale_options_delete').innerHTML = '';
    bill_id = document.getElementById('bill_no_for_delete').value;
    if (bill_id === "") {
        var doNothing = 0;
    } else if (billbaleMap[bill_id] != null) {
        var arr = billbaleMap[bill_id];
        var option_field = '';
        for (var j = 0; j < arr.length; j++) {
            option_field = option_field + '<option>' + arr[j].toString() + '</option>'
        }
        document.getElementById('bale_options_delete').innerHTML = option_field;
    } else {
        swal({
            icon: 'error',
            title: 'Error',
            text: 'No Entry Found with Bill Number = ' + bill_id,
        })
    }
}


$(document).on('submit', '#formDelete', function (e) {
    e.preventDefault();
    var purchasePage = document.getElementById('purchasePage');
    bill_no_del_table = document.getElementById("bill_no_for_delete").value;
    bale_no_del_table = document.getElementById("bale_options_delete").value;

    var starts = '<br><br><table class="table table-striped table-bordered">\
              <colgroup>\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 6%;">\
                   <col span="1" style="width: 5%;">\
                   <col span="1" style="width: 6%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 5%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 7%;">\
               </colgroup>\
              <thead class="thead-dark">\
              <tr>\
              <th>DATE</th>\
               <th>BILL</th>\
              <th>PARTY</th>\
              <th>BALE</th>\
              <th>P. QUAL</th>\
              <th>O. QUAL</th>\
              <th>DESIGN</th>\
              <th>HSN</th>\
              <th>TAKA</th>\
              <th>MTS</th>\
              <th>SHORT</th>\
              <th>PLACE</th>\
              <th>OPEN</th>\
              <th style="width: 50px;"></th>\
              </tr>\
              </thead>';
    var ends = '</table>';
    var csrftoken = getCookie('csrftoken');

    $.ajax({
        type: 'POST',
        url: '/deletePurchase',
        data: {
            bill: bill_no_del_table,
            bale: bale_no_del_table,
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
                tmp = tmp + '<td>' + dat[i].date.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].bill_no.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].party_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].bale_no.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].party_quality_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].our_quality_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].design.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].hsn_code.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].taka.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].mts.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].shortage.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].place.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].open.toString() + '</td>';

                tmp = tmp + '<td>' + '<button onclick="deleteGivenPurchaseEntry(this.id)"  class="btn btn-danger" id="delete_btnn" >Delete</button> ' + '</td>';
                tmp = tmp + '</tr>';
            }
            purchasePage.innerHTML = starts + tmp + ends;
            for (var i = 0; i < dat.length; i++) {
                document.getElementById("delete_btnn").setAttribute("id", "delete" + dat[i].id.toString());
            }
        }
    })
})


function deleteGivenPurchaseEntry(id_to_delete) {
    swal({
        title: "This Entry will be Deleted permanently!",
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
                var purchasePage = document.getElementById('purchasePage');

                var starts = '<br><br><table class="table table-striped table-bordered">\
              <colgroup>\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 6%;">\
                   <col span="1" style="width: 5%;">\
                   <col span="1" style="width: 6%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 5%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 7%;">\
               </colgroup>\
              <thead class="thead-dark">\
              <tr>\
                  <th>DATE</th>\
                   <th>BILL</th>\
                  <th>PARTY</th>\
                  <th>BALE</th>\
                  <th>P. QUAL</th>\
                  <th>O. QUAL</th>\
                  <th>DESIGN</th>\
                  <th>HSN</th>\
                  <th>TAKA</th>\
                  <th>MTS</th>\
                  <th>SHORT</th>\
                  <th>PLACE</th>\
                  <th>OPEN</th>\
                 <th style="width: 50px;"></th>\
              </tr>\
              </thead>';
                var ends = '</table>';
                var csrftoken = getCookie('csrftoken');

                $.ajax({
                    type: 'POST',
                    url: '/deleteGivenPurchase',
                    data: {
                        ids: id_to_delete,
                        bill: bill_no_del_table,
                        bale: bale_no_del_table,
                        csrfmiddlewaretoken: csrftoken
                    },
                    success: function (data) {
                        dat = JSON.parse(data);
                        for (var i = 0; i < dat.length; i++) {
                            dat[i] = JSON.parse(dat[i])
                        }
                        if (dat.length === 0) {
                            purchasePage.innerHTML = ""
                        } else {

                            var tmp = '';
                            for (var i = 0; i < dat.length; i++) {
                                var arr = dat[i].date.split("-");
                                dat[i].date = arr[2] + "/" + arr[1] + "/" + arr[0];
                                tmp = tmp + '<tr>';
                                tmp = tmp + '<td>' + dat[i].date.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].bill_no.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].party_name.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].bale_no.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].party_quality_name.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].our_quality_name.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].design.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].hsn_code.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].taka.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].mts.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].shortage.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].place.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].open.toString() + '</td>';

                                tmp = tmp + '<td>' + '<button onclick="deleteGivenPurchaseEntry(this.id)"  class="btn btn-danger" id="delete_btnn" >Delete</button> ' + '</td>';
                                tmp = tmp + '</tr>';
                            }
                            purchasePage.innerHTML = starts + tmp + ends;
                            for (var i = 0; i < dat.length; i++) {
                                document.getElementById("delete_btnn").setAttribute("id", "delete" + dat[i].id.toString());
                            }
                        }
                    }
                })

            }
        });
}


function editPurchase() {
    var csrftoken = getCookie('csrftoken');
    var purchasePage = document.getElementById('purchasePage');
    purchasePage.innerHTML = '<br> <br> <br>\
    <form id="formEdit">\
    <h6 style="font-family: sans-serif">Enter Bill Number &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Choose Bale Number</h6>\
    <div class="row">\
        <div class="col-md-2">\
            <input id="bill_no_for_edit" onchange="billBaleMapping2()" class="form-control" placeholder="Bill Number" min="1" type="number" required>\
        </div>\
        <div class="col-md-2">\
                <select id="bale_options_edit" class="form-control" required>\
                 </select>\
        </div>\
        <div class="col-md-2">\
            <button type="submit" class="btn btn-secondary">Submit</button>\
        </div>\
    </div>\
    </form>'
    $.ajax({
        type: 'POST',
        url: '/getBillBaleMap',
        data: {
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            billbaleMap = JSON.parse(data);
        }
    })

}

function billBaleMapping2() {
    document.getElementById('bale_options_edit').innerHTML = '';
    bill_id = document.getElementById('bill_no_for_edit').value;
    if (bill_id === "") {
        var doNothing = 0;
    } else if (billbaleMap[bill_id] != null) {
        var arr = billbaleMap[bill_id];
        var option_field = '';
        for (var j = 0; j < arr.length; j++) {
            option_field = option_field + '<option>' + arr[j].toString() + '</option>'
        }
        document.getElementById('bale_options_edit').innerHTML = option_field;
    } else {
        swal({
            icon: 'error',
            title: 'Error',
            text: 'No Entry Found with Bill Number = ' + bill_id,
        })
    }
}


$(document).on('submit', '#formEdit', function (e) {
    e.preventDefault();
    var purchasePage = document.getElementById('purchasePage');
    bill_no_edit_table = document.getElementById("bill_no_for_edit").value;
    bale_no_edit_table = document.getElementById("bale_options_edit").value;

    var starts = '<br><br><table class="table table-striped table-bordered">\
              <colgroup>\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 6%;">\
                   <col span="1" style="width: 5%;">\
                   <col span="1" style="width: 6%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 5%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 7%;">\
               </colgroup>\
              <thead class="thead-dark">\
              <tr>\
              <th>DATE</th>\
               <th>BILL</th>\
              <th>PARTY</th>\
              <th>BALE</th>\
              <th>P. QUAL</th>\
              <th>O. QUAL</th>\
              <th>DESIGN</th>\
              <th>HSN</th>\
              <th>TAKA</th>\
              <th>MTS</th>\
              <th>SHORT</th>\
              <th>PLACE</th>\
              <th>OPEN</th>\
              <th style="width: 50px;"></th>\
              </tr>\
              </thead>';
    var ends = '</table>';
    var csrftoken = getCookie('csrftoken');

    $.ajax({
        type: 'POST',
        url: '/editPurchase',
        data: {
            bill: bill_no_edit_table,
            bale: bale_no_edit_table,
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
                tmp = tmp + '<td>' + dat[i].date.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].bill_no.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].party_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].bale_no.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].party_quality_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].our_quality_name.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].design.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].hsn_code.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].taka.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].mts.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].shortage.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].place.toString() + '</td>';
                tmp = tmp + '<td>' + dat[i].open.toString() + '</td>';

                tmp = tmp + '<td>' + '<button onclick="showGivenPurchaseEntry(this.id)"  class="btn btn-success" id="edit_btnn" style="width: 100%">Edit</button> ' + '</td>';
                tmp = tmp + '</tr>';
            }
            purchasePage.innerHTML = starts + tmp + ends;
            for (var i = 0; i < dat.length; i++) {
                document.getElementById("edit_btnn").setAttribute("id", "edit" + dat[i].id.toString());
            }
        }
    })
})

function showGivenPurchaseEntry(id_to_edit) {
    var csrftoken = getCookie('csrftoken');
    $('#popupEditFormPurchase').show();
    $('#purchasePage').hide();
    $('#purchase-header').hide();

    $.ajax({
        type: 'POST',
        url: '/showEditEntryPurchase',
        data: {
            id: id_to_edit,
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            item = JSON.parse(data);
            document.getElementById("date_edit_popup").value = item.date;
            document.getElementById("bill_edit_popup").value = item.bill_no;
            document.getElementById("party_edit_popup").value = item.party_name;
            document.getElementById("party_quality_edit_popup").value = item.party_quality_name;
            document.getElementById("our_quality_edit_popup").value = item.our_quality_name;
            document.getElementById("design_edit_popup").value = item.design;
            document.getElementById("hsn_edit_popup").value = item.hsn_code;
            document.getElementById("taka_edit_popup").value = item.taka;
            document.getElementById("mts_edit_popup").value = item.mts;
            document.getElementById("shortage_edit_popup").value = item.shortage;
            document.getElementById("place_edit_popup").value = item.place;
            document.getElementById("open_edit_popup").value = item.open;


            bill_id = item.bill_no;
            var arr = billbaleMap[bill_id];
            var option_field = '';
            for (var j = 0; j < arr.length; j++) {
                option_field = option_field + '<option>' + arr[j].toString() + '</option>'
            }
            document.getElementById('bale_edit_popup').innerHTML = option_field;

            document.getElementById("bale_edit_popup").value = item.bale_no;
            id_final_edit_popup = id_to_edit;

        }
    })
}

function closePopup() {
    stop_closing = 2;
    $('#popupEditFormPurchase').hide();
    $('#purchasePage').show();
    $('#purchase-header').show();
}

function billBaleMappingEdit() {
    document.getElementById('bale_edit_popup').innerHTML = '';
    bill_id = document.getElementById('bill_edit_popup').value;
    if (bill_id === "") {
        var doNothing = 0;
    } else if (billbaleMap[bill_id] != null) {
        var arr = billbaleMap[bill_id];
        var option_field = '';
        for (var j = 0; j < arr.length; j++) {
            option_field = option_field + '<option>' + arr[j].toString() + '</option>'
        }
        document.getElementById('bale_edit_popup').innerHTML = option_field;
    } else {
        swal({
            icon: 'error',
            title: 'Error',
            text: 'No Entry Found with Bill Number = ' + bill_id,
        })
    }
}


$(document).on('submit', '#popupFormPurchase', function (e) {
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
                    var purchasePage = document.getElementById('purchasePage');

                    var starts = '<br><br><table class="table table-striped table-bordered">\
              <colgroup>\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 10%;">\
                   <col span="1" style="width: 6%;">\
                   <col span="1" style="width: 5%;">\
                   <col span="1" style="width: 6%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 5%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 7%;">\
                   <col span="1" style="width: 7%;">\
               </colgroup>\
              <thead class="thead-dark">\
              <tr>\
              <th>DATE</th>\
               <th>BILL</th>\
              <th>PARTY</th>\
              <th>BALE</th>\
              <th>P. QUAL</th>\
              <th>O. QUAL</th>\
              <th>DESIGN</th>\
              <th>HSN</th>\
              <th>TAKA</th>\
              <th>MTS</th>\
              <th>SHORT</th>\
              <th>PLACE</th>\
              <th>OPEN</th>\
              <th style="width: 50px;"></th>\
              </tr>\
              </thead>';
                    var ends = '</table>';
                    var csrftoken = getCookie('csrftoken');

                    $.ajax({
                        type: 'POST',
                        url: '/editGivenPurchase',
                        data: {
                            id: id_final_edit_popup,
                            date: $('#date_edit_popup').val(),
                            bill: $('#bill_edit_popup').val(),
                            party: $('#party_edit_popup').val(),
                            bale: $('#bale_edit_popup').val(),
                            party_quality: $('#party_quality_edit_popup').val(),
                            our_quality: $('#our_quality_edit_popup').val(),
                            design: $('#design_edit_popup').val(),
                            hsn: $('#hsn_edit_popup').val(),
                            taka: $('#taka_edit_popup').val(),
                            mts: $('#mts_edit_popup').val(),
                            shortage: $('#shortage_edit_popup').val(),
                            place: $('#place_edit_popup').val(),
                            open: $('#open_edit_popup').val(),
                            bill_old:bill_no_edit_table,
                            bale_old:bale_no_edit_table,
                            csrfmiddlewaretoken: csrftoken
                        },
                        success: function (data) {
                            dat = JSON.parse(data);
                            $('#popupEditFormPurchase').hide();
                            $('#purchasePage').show();
                            $('#purchase-header').show();

                            for (var i = 0; i < dat.length; i++) {
                                dat[i] = JSON.parse(dat[i])
                            }

                            var tmp = '';
                            for (var i = 0; i < dat.length; i++) {
                                var arr = dat[i].date.split("-");
                                dat[i].date = arr[2] + "/" + arr[1] + "/" + arr[0];
                                tmp = tmp + '<tr>';
                                tmp = tmp + '<td>' + dat[i].date.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].bill_no.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].party_name.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].bale_no.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].party_quality_name.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].our_quality_name.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].design.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].hsn_code.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].taka.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].mts.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].shortage.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].place.toString() + '</td>';
                                tmp = tmp + '<td>' + dat[i].open.toString() + '</td>';

                                tmp = tmp + '<td>' + '<button onclick="showGivenPurchaseEntry(this.id)"  class="btn btn-success" id="edit_btnn" style="width: 100%">Edit</button> ' + '</td>';
                                tmp = tmp + '</tr>';
                            }
                            purchasePage.innerHTML = starts + tmp + ends;
                            for (var i = 0; i < dat.length; i++) {
                                document.getElementById("edit_btnn").setAttribute("id", "edit" + dat[i].id.toString());
                            }
                            stop_closing = 0
                        }
                    })
                }
            });
    }

})

