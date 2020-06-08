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
    console.log("Entered Add Purchase Function")

    var ele = document.getElementById('purchasePage');
    ele.innerHTML =
        '<div class="card card-container">\
        <form class="form-signin" id="formAdd">\
            <div class="row">\
                <div class="col-md-4">\
                    <input id="date_add" class="form-control" placeholder="Date" type="date" required>\
                </div>\
                <div class="col-md-4">\
                    <input id="place_add" class="form-control" placeholder="Place" type="text" required>\
                </div>\
                <div class="col-md-4">\
                    <select id="open_add" class="form-control" required>\
                        <option>Pack</option>\
                        <option>Open</option>\
                    </select>\
                </div>\
            </div>\
            <br>\
            <div class="row">\
                <div class="col-md-4">\
                    <input id="bill_add" class="form-control" placeholder="Bill Number" type="number" required>\
                </div>\
                <div class="col-md-4">\
                    <input id="bale_add" class="form-control" placeholder="Bale Number" type="number" required>\
                </div>\
                <div class="col-md-4">\
                    <input id="party_add" class="form-control" placeholder="Party Name" type="text" required>\
                </div>\
            </div>\
            <br>\
            <div class="row">\
                <div class="col-md-4">\
                    <input id="party_quality_add" class="form-control" placeholder="Party Quality Name" type="text"\
                           required>\
                </div>\
                <div class="col-md-4">\
                    <input id="our_quality_add" class="form-control" placeholder="Our Quality Name" type="text" required>\
                </div>\
                <div class="col-md-4">\
                    <input id="hsn_add" class="form-control" placeholder="HSN Code" type="text" required>\
                </div>\
            </div>\
            <br>\
            <div class="row">\
                <div class="col-md-4">\
                    <input id="taka_add" class="form-control" placeholder="Number of Taka" type="number" required>\
                </div>\
                <div class="col-md-4">\
                    <input id="mts_add" class="form-control" placeholder="Total Metres" type="text" required>\
                </div>\
                <div class="col-md-4">\
                    <input id="shortage_add" class="form-control" placeholder="Shortage" type="text" required>\
                </div>\
            </div>\
            <br>\
            <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Add Purchase Entry</button>\
        </form>\
    </div>';
}

$(Document).on('submit', '#formAdd', function (e) {
    e.preventDefault();
    var ele = document.getElementById('purchasePage');

    var csrftoken = getCookie('csrftoken');
    $.ajax({
        type: 'POST',
        url: '/addPurchase',
        data: {
            date: $('#date_add').val(),
            place: $('#place_add').val(),
            open: $('#open_add').val(),
            bill: $('#bill_add').val(),
            bale: $('#bale_add').val(),
            party: $('#party_add').val(),
            party_quality: $('#party_quality_add').val(),
            our_quality: $('#our_quality_add').val(),
            hsn: $('#hsn_add').val(),
            taka: $('#taka_add').val(),
            mts: $('#mts_add').val(),
            shortage: $('#shortage_add').val(),
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            swal("Congrats!", ", Your entry is Added!", "success");
            ele.innerHTML = "";
            // document.getElementById('date_add').value = "";
            // document.getElementById('place_add').value = "";
            // document.getElementById('open_add').value = "Pack";
            // document.getElementById('bill_add').value = "";
            // document.getElementById('bale_add').value = "";
            // document.getElementById('party_add').value = "";
            // document.getElementById('party_quality_add').value = "";
            // document.getElementById('our_quality_add').value = "";
            // document.getElementById('hsn_add').value = "";
            // document.getElementById('taka_add').value = "";
            // document.getElementById('mts_add').value = "";
            // document.getElementById('shortage_add').value = "";
        },
        error: function (data) {
            alert(data);
        }
    })
})

function deletePurchase() {
    var ele = document.getElementById('purchasePage');
    ele.innerHTML =
        '<div class="card card-container">\
    <form class="form-signin" id="formDelete">\
        <div class="row">\
            <div class="col-md-4">\
                <input id="bill_d" class="form-control" placeholder="Bill Number" type="number" required>\
            </div>\
            <div class="col-md-4">\
                <input id="bale_d" class="form-control" placeholder="Bale Number" type="number" required>\
            </div>\
            <div class="col-md-4">\
                <input id="party_quality_d" class="form-control" placeholder="Party Quality Name" type="text" required>\
            </div>\
        </div>\
        <br>\
        <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">View Entry to Delete</button>\
    </form>\
</div>';
}

$(Document).on('submit', '#formDelete', function (e) {
    e.preventDefault();
    var ele = document.getElementById('purchasePage');

    var csrftoken = getCookie('csrftoken');
    var temp =
        '<div class="card card-container">\
        <form class="form-signin" id="formToBeDeleted">\
            <div class="row">\
                <div class="col-md-4">\
                    <input id="date_delete" class="form-control" type="date" readonly >\
                </div>\
                <div class="col-md-4">\
                    <input id="place_delete" class="form-control" type="text" value="JD" readonly>\
                </div>\
                <div class="col-md-4">\
                    <input id="open_delete" class="form-control" type="text" readonly >\
                </div>\
            </div>\
            <br>\
            <div class="row">\
                <div class="col-md-4">\
                    <input id="bill_delete" class="form-control" type="number" readonly>\
                </div>\
                <div class="col-md-4">\
                    <input id="bale_delete" class="form-control" type="number" readonly>\
                </div>\
                <div class="col-md-4">\
                    <input id="party_delete" class="form-control" type="text" readonly>\
                </div>\
            </div>\
            <br>\
            <div class="row">\
                <div class="col-md-4">\
                    <input id="party_quality_delete" class="form-control" type="text" readonly>\
                </div>\
                <div class="col-md-4">\
                    <input id="our_quality_delete" class="form-control" type="text" readonly>\
                </div>\
                <div class="col-md-4">\
                    <input id="hsn_delete" class="form-control" type="text" readonly>\
                </div>\
            </div>\
            <br>\
            <div class="row">\
                <div class="col-md-4">\
                    <input id="taka_delete" class="form-control" type="number" readonly>\
                </div>\
                <div class="col-md-4">\
                    <input id="mts_delete" class="form-control" type="text" readonly>\
                </div>\
                <div class="col-md-4">\
                    <input id="shortage_delete" class="form-control" type="text" readonly>\
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
            bill: $('#bill_d').val(),
            bale: $('#bale_d').val(),
            party_quality: $('#party_quality_d').val(),
            csrfmiddlewaretoken: csrftoken
        },
        success: function (data) {
            var context = JSON.parse(data)
            ele.innerHTML = temp;
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

        },
        error: function (data) {
            alert("Encountered Error");
        }
    })
})

$(Document).on('submit', '#formToBeDeleted', function (e) {
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
                        alert("ERROR");
                    }
                })

            }
        });
})


function editPurchase() {
    var ele = document.getElementById('purchasePage');
    ele.innerHTML =
        '<div class="card card-container">\
    <form class="form-signin" id="formEdit">\
        <div class="row">\
            <div class="col-md-4">\
                <input id="bill_e" class="form-control" placeholder="Bill Number" type="number" required>\
            </div>\
            <div class="col-md-4">\
                <input id="bale_e" class="form-control" placeholder="Bale Number" type="number" required>\
            </div>\
            <div class="col-md-4">\
                <input id="party_quality_e" class="form-control" placeholder="Party Quality Name" type="text" required>\
            </div>\
        </div>\
        <br>\
        <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">View Entry to Edit</button>\
    </form>\
</div>';
}

$(Document).on('submit', '#formEdit', function (e) {
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
                    <input id="place_edit" class="form-control" placeholder="Place" type="text" required>\
                </div>\
                <div class="col-md-4">\
                    <select id="open_edit" class="form-control" required>\
                        <option>Pack</option>\
                        <option>Open</option>\
                    </select>\
                </div>\
            </div>\
            <br>\
            <div class="row">\
                <div class="col-md-4">\
                    <input id="bill_edit" class="form-control" placeholder="Bill Number" type="number" required>\
                </div>\
                <div class="col-md-4">\
                    <input id="bale_edit" class="form-control" placeholder="Bale Number" type="number" required>\
                </div>\
                <div class="col-md-4">\
                    <input id="party_edit" class="form-control" placeholder="Party Name" type="text" required>\
                </div>\
            </div>\
            <br>\
            <div class="row">\
                <div class="col-md-4">\
                    <input id="party_quality_edit" class="form-control" placeholder="Party Quality Name" type="text"\
                           required>\
                </div>\
                <div class="col-md-4">\
                    <input id="our_quality_edit" class="form-control" placeholder="Our Quality Name" type="text" required>\
                </div>\
                <div class="col-md-4">\
                    <input id="hsn_edit" class="form-control" placeholder="HSN Code" type="text" required>\
                </div>\
            </div>\
            <br>\
            <div class="row">\
                <div class="col-md-4">\
                    <input id="taka_edit" class="form-control" placeholder="Number of Taka" type="number" required>\
                </div>\
                <div class="col-md-4">\
                    <input id="mts_edit" class="form-control" placeholder="Total Metres" type="text" required>\
                </div>\
                <div class="col-md-4">\
                    <input id="shortage_edit" class="form-control" placeholder="Shortage" type="text" required>\
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
            bill: $('#bill_e').val(),
            bale: $('#bale_e').val(),
            party_quality: $('#party_quality_e').val(),
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

        },
        error: function (data) {
            alert("Encountered Error");
        }
    })
})

$(Document).on('submit', '#formToBeEdited', function (e) {
    e.preventDefault();
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
                        csrfmiddlewaretoken: csrftoken
                    },
                    success: function (data) {
                        swal("Entry Edited!", "The changes have been made", "success");
                        ele.innerHTML = ''
                    },
                    error: function (data) {
                        alert("ERROR");
                    }
                })

            }
        });
})
