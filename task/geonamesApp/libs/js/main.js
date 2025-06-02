// Preloader
$(window).on('load', function () {
  console.log("✅ is loaded");
  if ($('#preloader').length) {
    $('#preloader').delay(1000).fadeOut('slow', function () {
      $(this).remove();
    });
  }
});

// Función genérica para llamadas AJAX
function handleApiCall(btnSelector, inputFields, url, paramNames) {
  $(btnSelector).on('click', function () {
    const data = {};
    let valid = true;

    inputFields.forEach((selector, index) => {
      const value = $(selector).val();
      if (!value) valid = false;
      data[paramNames[index]] = value;
    });

    if (!valid) {
      alert('Please fill in all fields');
      return;
    }

    $.ajax({
      url,
      method: 'GET',
      data,
      dataType: 'json',
      success: function (data) {
        $('#output').text(JSON.stringify(data, null, 2));
      },
      error: function () {
        $('#output').text(`Error calling ${url}`);
      }
    });
  });
}

// Usos específicos
handleApiCall('#btn1', ['#lat1', '#lng1'], 'libs/php/getTimezone.php', ['lat', 'lng']);
handleApiCall('#btn2', ['#lat2', '#lng2'], 'libs/php/getPostalCode.php', ['lat', 'lng']);
handleApiCall('#btn3', ['#query3'], 'libs/php/getWikipedia.php', ['query']);
