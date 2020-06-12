var numberOfEntries = 0;
var bill_no_to_delete = 0;
var bill_no_to_edit = 0;
var id_to_edit = 0;
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
    purchasePage.innerHTML = '<br> <br> <br>\
    <form id="delete-head">\
    <h6 style="font-family: sans-serif">Enter Bill Number to be Deleted</h6>\
    <div class="row">\
        <div class="col-md-2">\
            <input id="bill_no_for_delete" class="form-control" placeholder="Bill Number" min="1" type="number" required>\
        </div>\
        <div class="col-md-2">\
            <button type="submit" class="btn btn-secondary">Submit</button>\
        </div>\
    </div>\
    </form>'

}

$(document).on('submit', '#delete-head', function (e) {
    e.preventDefault();
    bill_no_to_delete = document.getElementById('bill_no_for_delete').value;
    var purchasePage = document.getElementById('purchasePage');
    var bale_form = '<br> <br> \
    <form id="formDelete">\
    <h6 style="font-family: sans-serif">Choose Bale Number to be Deleted</h6>\
    <div class="row">\
        <div class="col-md-2">\
                    <select id="bale_options_delete" class="form-control" required>\
                    </select>\
        </div>\
        <div class="col-md-2">\
            <button type="submit" class="btn btn-secondary">Submit</button>\
        </div>\
    </div>\
    </form>'


    var csrftoken = getCookie('csrftoken');


    $.ajax({
        type: 'POST',
        url: '/PurchaseBale',
        data: {
            bill: bill_no_to_delete,
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            var context = JSON.parse(data);
            if (context.length >= 1) {
                if (document.getElementById('bale_options_delete') == null) {
                    purchasePage.innerHTML = purchasePage.innerHTML + bale_form;
                }
                document.getElementById('bill_no_for_delete').value = bill_no_to_delete;

                var option_field = ''
                for (var i = 0; i < context.length; i++) {
                    option_field = option_field + '<option>' + context[i].toString() + '</option>'
                }
                document.getElementById('bale_options_delete').innerHTML = option_field;
            } else {
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'No Entry Found with Bill Number = ' + bill_no_to_delete.toString(),
                })
            }
        },
    })
})


$(document).on('submit', '#formDelete', function (e) {
    e.preventDefault();
    var purchasePage = document.getElementById('purchasePage');

    var csrftoken = getCookie('csrftoken');
    var temp =
        '<div class="card card-container">\
        <form class="form-signin" id="formToBeDeleted">\
            <div class="row">\
                <div class="col-md-4">\
                    <input id="date_delete" class="form-control" type="date" readonly >\
                </div>\
                <div class="col-md-4">\
                    <input id="bill_delete" class="form-control" type="number" readonly>\
                </div>\
                <div class="col-md-4">\
                    <input id="party_delete" class="form-control" type="text" readonly>\
                </div>\
             </div>  \
             <br>\
            <div class="row">\
                <div class="col-md-3">\
                    <input id="bale_delete" class="form-control" type="number" readonly>\
                </div>\
                <div class="col-md-3">\
                    <input id="party_quality_delete" class="form-control" type="text" readonly>\
                </div>\
                <div class="col-md-3">\
                    <input id="our_quality_delete" class="form-control" type="text" readonly>\
                </div>\
                <div class="col-md-3">\
                    <input id="design_delete" class="form-control" type="text" readonly>\
                </div>\
            </div>\
            <br>\
            <div class="row">\
                <div class="col-md-2">\
                    <input id="hsn_delete" class="form-control" type="text" readonly>\
                </div>\
                <div class="col-md-2">\
                    <input id="taka_delete" class="form-control" type="number" readonly>\
                </div>\
                <div class="col-md-2">\
                    <input id="mts_delete" class="form-control" type="text" readonly>\
                </div>\
                <div class="col-md-2">\
                    <input id="shortage_delete" class="form-control" type="text" readonly>\
                </div>\
                <div class="col-md-2">\
                    <input id="place_delete" class="form-control" type="text" value="JD" readonly>\
                </div>\
                <div class="col-md-2">\
                    <input id="open_delete" class="form-control" type="text" readonly >\
                </div>\
            </div>\
            <br>\
            <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Delete Given Entry</button>\
        </form>\
    </div>';

    $.ajax({
        type: 'POST',
        url: '/deletePurchase',
        data: {
            bill: bill_no_to_delete,
            bale: $('#bale_options_delete').val(),
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            var context = JSON.parse(data);
            purchasePage.innerHTML = temp;
            document.getElementById('date_delete').value = context.date;
            document.getElementById('place_delete').value = context.place;
            document.getElementById('open_delete').value = context.open;
            document.getElementById('bill_delete').value = context.bill_no;
            document.getElementById('bale_delete').value = context.bale_no;
            document.getElementById('party_delete').value = context.party_name;
            document.getElementById('party_quality_delete').value = context.party_quality_name;
            document.getElementById('our_quality_delete').value = context.our_quality_name;
            document.getElementById('hsn_delete').value = context.hsn_code;
            document.getElementById('taka_delete').value = context.taka;
            document.getElementById('mts_delete').value = context.mts;
            document.getElementById('shortage_delete').value = context.shortage;
            document.getElementById('design_delete').value = context.design;
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
})

$(document).on('submit', '#formToBeDeleted', function (e) {
    e.preventDefault();
    swal({
        title: "This Entry will be deleted permanently!",
        text: "Are you sure to proceed?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((isConfirm) => {
            if (isConfirm) {
                var ele = document.getElementById('purchasePage');

                var csrftoken = getCookie('csrftoken');
                $.ajax({
                    type: 'POST',
                    url: '/deleteGivenPurchase',
                    data: {
                        bill: $('#bill_delete').val(),
                        bale: $('#bale_delete').val(),
                        party_quality: $('#party_quality_delete').val(),
                        csrfmiddlewaretoken: csrftoken
                    },
                    success: function (data) {
                        swal("Entry Removed!", "Your entry is deleted permanently!", "success");
                        ele.innerHTML = ''
                    },
                    error: function (data) {
                        swal({
                            icon: 'error',
                            title: 'Error',
                            text: 'Some Unknown Error Occured',
                        })
                    }
                })

            }
        });
})



function editPurchase() {
    var purchasePage = document.getElementById('purchasePage');
    purchasePage.innerHTML = '<br> <br> <br>\
    <form id="edit-head">\
    <h6 style="font-family: sans-serif">Enter Bill Number to be Edited</h6>\
    <div class="row">\
        <div class="col-md-2">\
            <input id="bill_no_for_edit" class="form-control" placeholder="Bill Number" min="1" type="number" required>\
        </div>\
        <div class="col-md-2">\
            <button type="submit" class="btn btn-secondary">Submit</button>\
        </div>\
    </div>\
    </form>'

}

$(document).on('submit', '#edit-head', function (e) {
    e.preventDefault();
    bill_no_to_edit = document.getElementById('bill_no_for_edit').value;
    var purchasePage = document.getElementById('purchasePage');
    var bale_form = '<br> <br> \
    <form id="formEdit">\
    <h6 style="font-family: sans-serif">Choose Bale Number to be Edited</h6>\
    <div class="row">\
        <div class="col-md-2">\
                    <select id="bale_options_edit" class="form-control" required>\
                    </select>\
        </div>\
        <div class="col-md-2">\
            <button type="submit" class="btn btn-secondary">Submit</button>\
        </div>\
    </div>\
    </form>'


    var csrftoken = getCookie('csrftoken');


    $.ajax({
        type: 'POST',
        url: '/PurchaseBale',
        data: {
            bill: bill_no_to_edit,
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            var context = JSON.parse(data);
            if (context.length >= 1) {
                if (document.getElementById('bale_options_edit') == null) {
                    purchasePage.innerHTML = purchasePage.innerHTML + bale_form;
                }
                document.getElementById('bill_no_for_edit').value = bill_no_to_edit;

                var option_field = ''
                for (var i = 0; i < context.length; i++) {
                    option_field = option_field + '<option>' + context[i].toString() + '</option>'
                }
                document.getElementById('bale_options_edit').innerHTML = option_field;
            } else {
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'No Entry Found with Bill Number = ' + bill_no_to_edit.toString(),
                })
            }
        },
    })
})



$(document).on('submit', '#formEdit', function (e) {
    e.preventDefault();
    var ele = document.getElementById('purchasePage');

    var csrftoken = getCookie('csrftoken');
    var temp =
        '<div class="card card-container">\
        <form class="form-signin" id="formToBeEdited">\
            <div class="row">\
                <div class="col-md-4">\
                    <input id="date_edit" class="form-control" placeholder="Date" type="date" required>\
                </div>\
                <div class="col-md-4">\
                    <input id="bill_edit" class="form-control" placeholder="Bill Number" type="number" required>\
                </div>\
                <div class="col-md-4">\
                    <input id="party_edit" class="form-control" placeholder="Party Name" type="text" required>\
                </div>\
            </div>\
            <br>\
             <div class="row">\
                <div class="col-md-3">\
                    <input id="bale_edit" class="form-control" placeholder="Bale Number" type="number" required>\
                </div>\
                <div class="col-md-3">\
                    <input id="party_quality_edit" class="form-control" placeholder="Party Quality Name" type="text"\
                           required>\
                </div>\
                <div class="col-md-3">\
                    <input id="our_quality_edit" class="form-control" placeholder="Our Quality Name" type="text" required>\
                </div>\
                <div class="col-md-3">\
                    <input id="design_edit" class="form-control" placeholder="Design Number" type="text">\
                </div>\
             </div>\
             <br>\
             <div class="row">\
                 <div class="col-md-2">\
                    <input id="hsn_edit" class="form-control" placeholder="HSN Code" type="text" required>\
                 </div>\
                 <div class="col-md-2">\
                    <input id="taka_edit" class="form-control" placeholder="Number of Taka" type="number" required>\
                </div>\
                <div class="col-md-2">\
                    <input id="mts_edit" class="form-control" placeholder="Total Metres" type="text" required>\
                </div>\
                <div class="col-md-2">\
                    <input id="shortage_edit" class="form-control" placeholder="Shortage" type="text" required>\
                </div>\
                <div class="col-md-2">\
                    <input id="place_edit" class="form-control" placeholder="Place" type="text" required>\
                </div>\
                <div class="col-md-2">\
                    <select id="open_edit" class="form-control" required>\
                        <option>PACK</option>\
                        <option>OPEN</option>\
                    </select>\
                </div>\
            </div>\
       <br>\
            <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Edit Given Entry</button>\
        </form>\
    </div>';

    $.ajax({
        type: 'POST',
        url: '/editPurchase',
        data: {
            bill: bill_no_to_edit,
            bale: $('#bale_options_edit').val(),
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            var context = JSON.parse(data)
            ele.innerHTML = temp;
            document.getElementById('date_edit').value = context.date;
            document.getElementById('place_edit').value = context.place;
            document.getElementById('open_edit').value = context.open;
            document.getElementById('bill_edit').value = context.bill_no;
            document.getElementById('bale_edit').value = context.bale_no;
            document.getElementById('party_edit').value = context.party_name;
            document.getElementById('party_quality_edit').value = context.party_quality_name;
            document.getElementById('our_quality_edit').value = context.our_quality_name;
            document.getElementById('hsn_edit').value = context.hsn_code;
            document.getElementById('taka_edit').value = context.taka;
            document.getElementById('mts_edit').value = context.mts;
            document.getElementById('shortage_edit').value = context.shortage;
            document.getElementById('design_edit').value = context.design;
            id_to_edit = context.id;

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
})

$(document).on('submit', '#formToBeEdited', function (e) {
    e.preventDefault();
    console.log(id_to_edit);
    swal({
        title: "This Entry will be Edited permanently!",
        text: "Are you sure to proceed?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((isConfirm) => {
            if (isConfirm) {
                var ele = document.getElementById('purchasePage');
                var csrftoken = getCookie('csrftoken');
                $.ajax({
                    type: 'POST',
                    url: '/editGivenPurchase',
                    data: {
                        date: $('#date_edit').val(),
                        place: $('#place_edit').val(),
                        open: $('#open_edit').val(),
                        bill: $('#bill_edit').val(),
                        bale: $('#bale_edit').val(),
                        party: $('#party_edit').val(),
                        party_quality: $('#party_quality_edit').val(),
                        our_quality: $('#our_quality_edit').val(),
                        hsn: $('#hsn_edit').val(),
                        taka: $('#taka_edit').val(),
                        mts: $('#mts_edit').val(),
                        shortage: $('#shortage_edit').val(),
                        design:$('#design_edit').val(),
                        id: id_to_edit,
                        csrfmiddlewaretoken: csrftoken
                    },
                    success: function (data) {
                        swal("Entry Edited!", "The changes have been made", "success");
                        ele.innerHTML = ''
                    },
                    error: function (data) {
                        swal({
                            icon: 'error',
                            title: 'Error',
                            text: 'Some Unknown Error Occured',
                        })
                    }
                })

            }
        });
})
