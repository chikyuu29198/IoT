
document.addEventListener('DOMContentLoaded', function() {
  firebase.database().ref('/').limitToLast(50).on('value', snapshot => {
    // updateStarCount(postElement, snapshot.val());
    let data = snapshot.val();
    
    let arr1 = []; 
    let arr2 = []; 
    let time = [];
    let humidity = [];
    let pressure = [];
    Object.keys(data).forEach((key) => {
      var a = new Date(data[key].time*1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var formattedTime = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      console.log(formattedTime);

      arr1.push(data[key].bmp.temp);
      arr2.push(data[key].dht.temp);
      time.push(formattedTime);
      humidity.push(data[key].dht.hum);
      pressure.push(data[key].bmp.press);
    });


let chartConfig2 = {
      type: 'line',
      data: {
        labels: time,
        datasets: [
          {
          label: 'DHT22',
          fill: false,
          backgroundColor: 'blue',
          borderColor: 'blue',
          data: humidity,
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Humidity Line Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Time'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: '%'
            }
          }]
        }
      }
    };


    let chartConfig = {
      type: 'line',
      data: {
        labels: time,
        datasets: [{
          label: 'GY68 - BMP180',
          backgroundColor: 'red',
          borderColor: 'red',
          data: arr1,
          fill: false,
        }, {
          label: 'DHT22',
          fill: false,
          backgroundColor: 'blue',
          borderColor: 'blue',
          data: arr2,
        }]
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Temperature Line Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Time'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: '*C'
            }
          }]
        }
      }
    };

    let chartConfig3 = {
      type: 'line',
      data: {
        labels: time,
        datasets: [{
          label: 'GY68 - BMP180',
          backgroundColor: 'red',
          borderColor: 'red',
          data: pressure,
          fill: false,
        }]
      },
      options: {
        responsive: true,
        
        title: {
          display: true,
          text: 'Pressure Line Chart'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Time'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Pa '
            }
          }]
        }
      }
    };


    let ctx1 = document.getElementById("chart1").getContext('2d');
    let chart1 = new Chart(ctx1, chartConfig);
    
    let ctx2 = document.getElementById("chart2").getContext('2d');
    let chart2 = new Chart(ctx2, chartConfig2);

    let ctx3 = document.getElementById("chart3").getContext('2d');
    let chart3 = new Chart(ctx3, chartConfig3);

  });
});



