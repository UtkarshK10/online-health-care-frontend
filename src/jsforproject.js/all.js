import M from 'materialize-css/dist/js/materialize.min.js';
document.addEventListener('DOMContentLoaded', function () {

  var elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems, {});
});
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  M.Modal.init(elems, { dismissible: false });
});
