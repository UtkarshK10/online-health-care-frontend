import M from 'materialize-css/dist/js/materialize.min.js';
import instance from '../axios/axios';
document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems, {});
});
