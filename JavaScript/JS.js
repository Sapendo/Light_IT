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
          var shortInfo;
          var moreInfo;
          var allInfo;
          for (var i = 0, j = 1; i < items.results.length; i++, j++) {
              item = items.results[i];
              if (item.gender === 'male') {
                  countMale++;
              } else countFemail++;
             
              shortInfo = '<tr class="shortInfo"><td><img src="' + item.picture.thumbnail + '" alt="photoPerson"></td>' + '<td>' + item.name.last + '</td><td>' + item.name.first + '</td><td>' + item.login.username + '</td><td>' + item.phone + '</td><td>' + item.location.city + '</td><td><button class="buttonInfo"><i class="fa fa-plus" aria-hidden="true"></i></button></td></tr>';  
              
              moreInfo =  '<tr class="moreInfo"><td></td><td><p><span class="bold">Name: </span>' + item.name.first + '<br/><p><span class="bold">Username: </span>' + item.login.username + '</p><p><span class="bold">Registered: </span>' + item.registered + '</p><p><span class="bold">Email: </span>' + item.email + '</p></td><td><p><span class="bold">Address: </span>' + item.location.street + ' ' + item.location.state + '</p><p><span class="bold">City: </span>' + item.location.city + '</p><p><span class="bold">Zip Code: </span>' + item.location.postcard + '</p></td><td><p><span class="bold">Birthday: </span>' + item.dob + '</p><p><span class="bold">Phone: </span>' + item.phone + '</p><p><span class="bold">Cell: </span>' + item.cell + '</p></td><td><img src="' + item.picture.large + '" alt="photoPerson"></td></tr>';
              
              allInfo = shortInfo + moreInfo;
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
          $(".bold").css("font-weight", "bold");
          $("#tbody .shortInfo>td").addClass("text-center");
          $("#tbody .moreInfo>td").addClass("text-left");
          $("#tbody .moreInfo>td").css("width","500px");
          $(".shortInfo td").css("vertical-align","middle");
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
      tr = document.getElementById("tbody").getElementsByClassName('shortInfo');
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