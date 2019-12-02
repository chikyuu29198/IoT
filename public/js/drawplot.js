// window.addEventListener('load', yourFunction, false);
// // // ..... or 
// // window.addEventListener('DOMContentLoaded', yourFunction, false);

// document.addEventListener('DOMContentLoaded', function() {
//   firebase.database().ref('/path/to/data_node').limitToLast(50).on('value', data => {
//     data_hihi = data.val()
//   })
// })

document.addEventListener('DOMContentLoaded', function() {
  firebase.database().ref('/').limitToLast(50).on('value', snapshot => {
    let data = snapshot.val();
    console.log(typeof data);
    console.log(data);
  });
});