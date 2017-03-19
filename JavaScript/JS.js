  var request;
  if (window.XMLHttpRequest) {
      request = new XMLHttpRequest();
  } else {
      request - new ActiveXObject("Microsoft.XMLHTTP");
  }

  var randomAmountPerson = getRandomInt(10, 20);

  request.open('GET', 'https://randomuser.me/api/?results=' + randomAmountPerson);
  request.onreadystatechange = function() {
      if (request.status === 200 && request.readyState === 4) {
          var items = JSON.parse(request.responseText);
          console.log(items);
          var countMale = 0;
          var countFemail = 0;
          for (var i = 0, j = 1; i < items.results.length; i++, j++) {
              item = items.results[i];

              if (item.gender === 'male') {
                  countMale++;
              } else countFemail++;
              var shortInfo = '<tr class="shortInfo">';
              shortInfo += '<td><img src="' + item.picture.thumbnail + '" alt="photoPerson"></td>' + '<td>' + item.name.last + '</td><td>' + item.name.first + '</td><td>' + item.login.username + '</td><td>' + item.phone + '</td><td>' + item.location.city + '</td><td><button class="buttonInfo"><i class="fa fa-plus" aria-hidden="true"></i></button></td>';

              shortInfo += '</tr>';

              var moreInfo = '<tr class="moreInfo">';

              moreInfo +=  '<td>' + item.name.first + '</td><td>' + item.name.last + '</td><td>' + item.login.username + '</td><td>' + item.registered + '</td><td>' + item.email + '</td><td>' + item.dob + '</td><td>' + item.phone + '</td><td>' + item.cell + '</td><td><img src="' + item.picture.large + '" alt="photoPerson"></td>';

              moreInfo += '</tr>';

              var allInfo = shortInfo + moreInfo;

              $('#tbody').append(allInfo);



          }

          (function($) {
              var allPanels = $('.moreInfo').hide();
              $('.shortInfo > td > button').click(function() {
                  allPanels.slideUp();
                  $(this).parent().parent().next().slideDown();
                  return false;
              });

          })(jQuery);


          $(".shortInfo:odd").css("background-color", "#CCCCCC");
          $("#tbody tr>td").addClass("text-center");
          $("img").css({
              "border-radius": "50%",
              "border-style": "solid",
              "border-width": "3px",
              "border-color": "#fff"
          });



          var tagChart = 'chart';
          counterChart(countMale, countFemail, tagChart);

      }
  }
  request.send();

  $(document).ready(function() {
      windowHide();
      $("#showStatistic").click(windowShow);
      $("#hideStatistic").click(windowHideSlowly);
  });





  function windowShow() {
      $("#chartArea").show(1000);
  }

  function windowHide() {
      $("#chartArea").hide();
  }

  function windowHideSlowly() {
      $("#chartArea").hide(1000);
  }

  function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
  } //Random number
  function counterChart(m, f, t) {
      google.charts.load('current', {
          'packages': ['corechart']
      });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

          var data = google.visualization.arrayToDataTable([
              ['Gender', 'Count'],
              ['Male', m],
              ['Female', f]
          ]);

          var options = {
              title: 'Gender Activities',
              width: '700',
              height: '388',
              fontSize: '20',
              legend: {
                  position: 'labeled'
              },
              backgroundColor: '#eee',
              pieSliceText: 'none'
          };

          var chart = new google.visualization.PieChart(document.getElementById(t));

          return chart.draw(data, options);
      }
  } //Create graph
  function mySearch() {
      var input, filter, table, tr, td;
      input = document.getElementById("search");
      filter = input.value.toUpperCase();
      tr = document.getElementById("tbody").getElementsByTagName('tr');
      console.log(tr);
      for (var i = 0; i < tr.length; i++) {
          console.log(tr[i].getElementsByTagName("td")[2]);
          td = tr[i].getElementsByTagName("td")[2];
          if (td) {
              if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                  tr[i].style.display = "";
              } else {
                  tr[i].style.display = "none";
              }
          }
      }
  }