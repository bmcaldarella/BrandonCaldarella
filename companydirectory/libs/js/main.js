

$("#searchInp").on("keyup", function () {
    //seach personnel input
    if ($("#personnelBtn").hasClass("active")) {

        $.ajax({
            url: "libs/php/getAll.php",
            type: "GET",
            data: {
                txt: $("#searchInp").val(),
            },
            dataType: "json",
            success: function (result) {
                const tableBody = $("#personnelTableBody");
                tableBody.empty();

                if (result.status.code === "200" && result.data.length > 0) {
                    result.data.forEach(person => {
                        const searchPersonnel = `
                            <tr>
                              <td class="align-middle text-nowrap">${person.firstName}, ${person.lastName}</td>
                              <td class="align-middle text-nowrap d-none d-md-table-cell">${person.department}</td>
                              <td class="align-middle text-nowrap d-none d-md-table-cell">${person.location}</td>
                              <td class="align-middle text-nowrap d-none d-md-table-cell">${person.email}</td>
                              <td class="text-end text-nowrap">
                                <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal" data-id="${person.id}">
                                  <i class="fa-solid fa-pencil fa-fw"></i>
                                </button>
                                <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deletePersonnelModal" data-id="${person.id}">
                                  <i class="fa-solid fa-trash fa-fw"></i>
                                </button>
                              </td>
                            </tr>`;
                        tableBody.append(searchPersonnel);
                    });
                } else {
                    const tableError = `
                        <h3 class="text-center mt-5 opacity-75">Search not found</h3>                      `;
                    tableBody.append(tableError);
                }
            },
            error: function () {
                alert("Error searching personnel");
            }
        });

    }
    //search departments input
    if ($("#departmentsBtn").hasClass("active")) {
        $.ajax({
            url: "libs/php/getAllDepartments.php",
            type: "GET",
            data: {
                txt: $("#searchInp").val(),
            },
            dataType: "json",
            success: function (result) {
                const tableDepartments = $("#departmentTableBody");
                tableDepartments.empty();
                if (result.status.code === "200" && result.data.length > 0) {
                    result.data.forEach(departamentSearch => {
                        const seachDepartment = `
                        <tr>
                        <td>${departamentSearch.departmentName}</td>
                        <td>${departamentSearch.locationName}</td>                       
                        <td class="align-middle text-end text-nowrap">
                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                data-bs-target="#editDepartmentModal" data-id="${departamentSearch.id}">
                                <i class="fa-solid fa-pencil fa-fw"></i>
                            </button>
                            <button type="button" class="btn btn-primary btn-sm deleteDepartmentBtn" data-id="${departamentSearch.id}">
                                <i class="fa-solid fa-trash fa-fw"></i>
                            </button>
                        </td>

                        </tr>
                        `;
                        tableDepartments.append(seachDepartment);
                    })

                } else {
                    const tableError = `
                        <h3 class="text-center mt-5 opacity-75">Search not found</h3>                      `;
                    tableDepartments.append(tableError);

                }

            }



        });
    }
    if ($("#locationsBtn").hasClass("active")) {
        $.ajax({
            url: "libs/php/getAllLocation.php",
            type: "GET",
            data: {
                txt: $("#searchInp").val(),
            },
            dataType: "json",
            success: function (result) {

                const tableLocations = $("#locationTableBody");
                tableLocations.empty();
                if (result.status.code == "200" && result.data.length > 0) {



                    result.data.forEach(locationSearch => {
                        const searchLocation = `
                        <tr>
                        <td>${locationSearch.name}</td>
                        <td class="align-middle text-end text-nowrap">
                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                data-bs-target="#editLocationModal" data-id="${locationSearch.id}">
                                <i class="fa-solid fa-pencil fa-fw"></i>
                            </button>
                            <button type="button" class="btn btn-primary btn-sm deleteLocationBtn" data-id="${locationSearch.id}">
                                <i class="fa-solid fa-trash fa-fw"></i>
                            </button>
                        </td>
                        </tr>`;
                        tableLocations.append(searchLocation);
                    });
                } else {
                    const tableError = `
                        <h3 class="text-center mt-5 opacity-75">Search not found</h3>                      `;
                    tableLocations.append(tableError);


                }
            }


        });

    }



});

// Refresh button functionality styling 

$("#refreshBtn").click(function () {

    $("#refreshIcon").css({
        "transition": "transform 0.3s ease",
        "transform": "rotate(360deg)"
    });

    setTimeout(() => {
        $("#refreshIcon").css({
            "transition": "transform 0.3s ease",
            "transform": "rotate(0deg)"
        });
    }, 300);



    // Refresh the current table based on the active tab

    if ($("#searchInp").val().trim() !== "") {
        $("#searchInp").val("");
    } else {
        console.warn("Search input is already empty, no need to refresh.");

    }

    if ($("#personnelBtn").hasClass("active")) {

        // Refresh personnel table
        refreshPersonnelTable();


    } else {
        $("#personnel-tab-pane").removeClass("active show");

        if ($("#departmentsBtn").hasClass("active")) {

            // Refresh department table
            refreshDepartments();

        } else {
            console.warn("Search input is already empty, no need to refresh.");



            // Refresh location table

        }

        if ($("#locationsBtn").hasClass("active")) {
            // Refresh location table
            refreshLocations();

        } else {
            console.warn("Search input is already empty, no need to refresh.");



        }


    }

});

$("#filterBtn").click(function () {

    // Open a modal of your own design that allows the user to apply a filter to the personnel table on either department or location

});
// ✅ Función para obtener departamentos
function getDepartments(callback) {
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.status.code === "200") {
                callback(result.data);
            } else {
                console.warn("Error al obtener departamentos.");
            }
        },
        error: function () {
            alert("Error de red al cargar departamentos.");
        }
    });
}

// ✅ Función para obtener ubicaciones
function getLocations(callback) {
    $.ajax({
        url: "libs/php/getAllLocation.php",
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.status.code === "200") {
                callback(result.data);
            } else {
                console.warn("Error al obtener ubicaciones.");
            }
        },
        error: function () {
            alert("Error de red al cargar ubicaciones.");
        }
    });
}

// ✅ Evento para mostrar el modal correcto y poblar selects
$("#addBtn").click(function () {
    if ($("#personnelBtn").hasClass("active")) {
        getDepartments(function (departments) {
            const $select = $("#addPersonnelDepartment").empty();
            $select.append(`<option value="">Seleccione un departamento</option>`);
            departments.forEach(d => {
                $select.append(`<option value="${d.id}">${d.departmentName}</option>`);
            });
        });

        getLocations(function (locations) {
            const $select = $("#addPersonnelLocation").empty();
            $select.append(`<option value="">Seleccione una ubicación</option>`);
            locations.forEach(l => {
                $select.append(`<option value="${l.id}">${l.name}</option>`);
            });
        });

        $("#addPersonnelModal").modal("show");

    } else if ($("#departmentsBtn").hasClass("active")) {
        getLocations(function (locations) {
            const $select = $("#addDepartmentLocation").empty();
            $select.append(`<option value="">Seleccione una ubicación</option>`);
            locations.forEach(l => {
                $select.append(`<option value="${l.id}">${l.name}</option>`);
            });
        });

        $("#addDepartmentModal").modal("show");

    } else if ($("#locationsBtn").hasClass("active")) {
        $("#addLocationModal").modal("show");
    }
});

// ✅ Evento de envío del formulario para agregar personal
$("#addPersonnelForm").on("submit", function (e) {
    e.preventDefault();

    const firstName = $("#addPersonnelFirstName").val().trim();
    const lastName = $("#addPersonnelLastName").val().trim();
    const jobTitle = $("#addPersonnelJobTitle").val().trim();
    const email = $("#addPersonnelEmailAddress").val().trim();
    const departmentID = $("#addPersonnelDepartment").val();
    const locationID = $("#addPersonnelLocation").val();

    // Validaciones
    if (!firstName || !lastName || !jobTitle || !email) {
        alert("Por favor completá todos los campos obligatorios.");
        return;
    }

    // Validar email simple
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor ingresá un email válido.");
        return;
    }

    // Validar selects
    if (!departmentID || !locationID || isNaN(departmentID) || isNaN(locationID)) {
        alert("Seleccioná un departamento y una ubicación válidos.");
        return;
    }

    // Enviar datos si todo está OK
    $.ajax({
        url: "libs/php/insertPersonnel.php",
        type: "POST",
        dataType: "json",
        data: {
            firstName,
            lastName,
            jobTitle,
            email,
            departmentID,
            locationID
        },
        success: function (result) {
            if (result.status.code === "200") {
                $("#addPersonnelModal").modal("hide");
                $("#addPersonnelForm")[0].reset(); // 🧹 Limpia el formulario
                refreshPersonnelTable();
            } else {
                alert("Error al agregar personal: " + result.status.description);
            }
        },
        error: function (xhr) {
            console.error("Error AJAX:", xhr.responseText);
            console.error("AJAX Error:", error);
            console.log("Status:", status);
            console.log("Response Text:", xhr.responseText);
            alert("Error de red al agregar personal.");
        }
    });
});

$("#addDepartmentForm").on("submit", function (e) {
    e.preventDefault();

    const departmentName = $("#addDepartmentName").val().trim();
    const locationID = $("#addDepartmentLocation").val();

    if (!departmentName || !locationID || isNaN(locationID)) {
        alert("Por favor ingresá un nombre de departamento y seleccioná una ubicación válida.");
        return;
    }

    $.ajax({
        url: "libs/php/insertDepartment.php", // Asegurate que este archivo exista
        type: "POST",
        dataType: "json",
        data: {
            name: departmentName,
            locationID
        },
        success: function (result) {
            if (result.status.code === "200") {
                $("#addDepartmentModal").modal("hide");
                $("#addDepartmentForm")[0].reset(); // limpia el form
                refreshDepartments(); // asegurate de tener esta función
            } else {
                alert("Error al agregar departamento: " + result.status.description);
            }
        },
        error: function (xhr) {
            console.error("Error AJAX:", xhr.responseText);
            alert("Error de red al agregar departamento.");
        }
    });
});

$("#addLocationForm").on("submit", function (e) {
    e.preventDefault();

    const locationName = $("#addLocationName").val().trim();

    if (!locationName) {
        alert("Por favor ingresá un nombre de ubicación.");
        return;
    }

    $.ajax({
        url: "libs/php/insertLocation.php", // Asegurate que este archivo exista
        type: "POST",
        dataType: "json",
        data: {
            name: locationName
        },
        success: function (result) {
            if (result.status.code === "200") {
                $("#addLocationModal").modal("hide");
                $("#addLocationForm")[0].reset(); // limpia el form
                refreshLocations(); // asegurate de tener esta función
            } else {
                alert("Error al agregar ubicación: " + result.status.description);
            }
        },
        error: function (xhr) {
            console.error("Error AJAX:", xhr.responseText);
            alert("Error de red al agregar ubicación.");
        }
    });
});


$("#personnelBtn").click(function () {
    // Activar tab pane
    $("#personnel-tab-pane").addClass("show active");
    $("#departments-tab-pane, #locations-tab-pane").removeClass("show active");

    // Activar botón
    $("#personnelBtn").addClass("active");
    $("#departmentsBtn, #locationsBtn").removeClass("active");

    // Cargar datos
    refreshPersonnelTable();
});

$("#departmentsBtn").click(function () {
    // Activar tab pane
    $("#departments-tab-pane").addClass("show active");
    $("#personnel-tab-pane, #locations-tab-pane").removeClass("show active");

    // Activar botón
    $("#departmentsBtn").addClass("active");
    $("#personnelBtn, #locationsBtn").removeClass("active");

    // Cargar datos
    refreshDepartments();
});

$("#locationsBtn").click(function () {
    // Activar tab pane
    $("#locations-tab-pane").addClass("show active");
    $("#personnel-tab-pane, #departments-tab-pane").removeClass("show active");

    // Activar botón
    $("#locationsBtn").addClass("active");
    $("#personnelBtn, #departmentsBtn").removeClass("active");

    // Cargar datos
    refreshLocations();
});

$("#editPersonnelModal").on("show.bs.modal", function (e) {

    $.ajax({
        url:
            "libs/php/getPersonnelByID.php",
        type: "POST",
        dataType: "json",
        data: {
            // Retrieve the data-id attribute from the calling button
            // see https://getbootstrap.com/docs/5.0/components/modal/#varying-modal-content
            // for the non-jQuery JavaScript alternative
            id: $(e.relatedTarget).attr("data-id")
        },
        success: function (result) {
            var resultCode = result.status.code;

            if (resultCode == 200) {

                // Update the hidden input with the employee id so that
                // it can be referenced when the form is submitted

                $("#editPersonnelEmployeeID").val(result.data.personnel[0].id);
                $("#editPersonnelFirstName").val(result.data.personnel[0].firstName);
                $("#editPersonnelLastName").val(result.data.personnel[0].lastName);
                $("#editPersonnelJobTitle").val(result.data.personnel[0].jobTitle);
                $("#editPersonnelEmailAddress").val(result.data.personnel[0].email);

                $("#editPersonnelDepartment").html("");

                $.each(result.data.department, function () {
                    $("#editPersonnelDepartment").append(
                        $("<option>", {
                            value: this.id,
                            text: this.name
                        })
                    );
                });

                $("#editPersonnelDepartment").val(result.data.personnel[0].departmentID);

            } else {
                $("#editPersonnelModal .modal-title").replaceWith(
                    "Error retrieving data"
                );
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#editPersonnelModal .modal-title").replaceWith(
                "Error retrieving data"
            );
        }
    });
});

// Executes when the form button with type="submit" is clicked

$("#editPersonnelForm").on("submit", function (e) {

    // Executes when the form button with type="submit" is clicked
    // stop the default browser behviour

    e.preventDefault();

    // AJAX call to save form data

});

//get information from database 
function refreshPersonnelTable() {
    $.ajax({
        url: "libs/php/getAll.php",
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.status.code === "200") {
                const tableBody = $("#personnelTableBody");
                tableBody.empty();

                result.data.forEach(person => {

                    const row = `
            <tr>
              <td class="align-middle text-nowrap">${person.firstName}, ${person.lastName}</td>
              <td class="align-middle text-nowrap d-none d-md-table-cell">${person.department}</td>
              <td class="align-middle text-nowrap d-none d-md-table-cell">${person.location}</td>
              <td class="align-middle text-nowrap d-none d-md-table-cell">${person.email}</td>
              <td class="text-end text-nowrap">
                <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editPersonnelModal">
                  <i class="fa-solid fa-pencil fa-fw"></i>
                </button>
                <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#deletePersonnelModal">
                  <i class="fa-solid fa-trash fa-fw"></i>
                </button>
              </td>
            </tr>
          `;
                    tableBody.append(row);
                });
            } else {
                console.warn("Error cargando personal");
            }
        },
        error: function (xhr, status, error) {
            console.error("AJAX Error:", error);
        }
    });
}


function refreshDepartments() {
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.status.code === "200") {
                const tableDepartments = $("#departmentTableBody");
                tableDepartments.empty();

                result.data.forEach(department => {

                    const departmentRow = `
                    <tr>
                        <td>${department.departmentName}</td>
                        <td>${department.locationName}</td>                       
                        <td class="align-middle text-end text-nowrap">
                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                data-bs-target="#editDepartmentModal" data-id="${department.id}">
                                <i class="fa-solid fa-pencil fa-fw"></i>
                            </button>
                            <button type="button" class="btn btn-primary btn-sm deleteDepartmentBtn" data-id="${department.id}">
                                <i class="fa-solid fa-trash fa-fw"></i>
                            </button>
                        </td>
                    </tr>`;
                    tableDepartments.append(departmentRow);
                });
            } else {
                console.warn("Error to load departments");
            }
        },
        error: function (e) {
            console.error("AJAX error while loading departments" + e);
        }
    });
};

function refreshLocations() {
    $.ajax({
        url: "libs/php/getAllLocation.php",
        type: "GET",
        dataType: "json",
        success: function (result) {
            if (result.status.code == "200") {
                const tableLocations = $("#locationTableBody");
                tableLocations.empty();

                result.data.forEach(location => {
                    console.log(location);

                    const locationRow = `
                    <tr>
                        <td>${location.name}</td>
                        <td class="align-middle text-end text-nowrap">
                            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal"
                                data-bs-target="#editLocationModal" data-id="${location.id}">
                                <i class="fa-solid fa-pencil fa-fw"></i>
                            </button>
                            <button type="button" class="btn btn-primary btn-sm deleteLocationBtn" data-id="${location.id}">
                                <i class="fa-solid fa-trash fa-fw"></i>
                            </button>
                        </td>
                    </tr>`;
                    tableLocations.append(locationRow);
                });

            } else {

            }


        },
        error: function (e) {
            console.error("AJAX error while loading departments" + e);
        }


    });
}


$(document).ready(function () {
    refreshPersonnelTable(); // <- carga al abrir la página

    $("#personnelBtn").click(function () {
        refreshPersonnelTable(); // <- también al tocar la pestaña
    });

    $("#departmentsBtn").click(function () {
        $("#personnel-tab-pane").removeClass("active");
        $("#departments-tab-pane").addClass("active show");

        refreshDepartments(); // <- también al tocar la pestaña


    });

    $("#locationsBtn").click(function () {
        // Activar tab pane
        $("#locations-tab-pane").addClass("show active");
        $("#personnel-tab-pane, #departments-tab-pane").removeClass("show active");

        // Activar botón
        $("#locationsBtn").addClass("active");
        $("#personnelBtn, #departmentsBtn").removeClass("active");

        // Cargar datos
        refreshLocations();
    });

    $("#addBtn").click(function () {
    const $icon = $("#addIcon");

    $icon.css({
        "display": "inline-block", // 👈 Necesario para transform
        "transition": "transform 0.5s ease",
        "transform": "rotate(360deg)"
    });

    setTimeout(() => {
        $icon.css("transform", "rotate(0deg)");
    }, 300);
});



});
