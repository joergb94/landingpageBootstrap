var url = $('#url').val();
var baseUrl = $('#baseUrl').val();

//section for jquery
$(document).ready(function () {

  $('.search-query').bind("keyup change", function () {
    event.preventDefault();
    var filter = datasearch();
    getData(1, filter);
  });

});

function datasearch(answer) {

  data = (answer)
    ? {
      search: $('#search').val(),
      usersearch: $('#usersearch').val(),
      eventsearch: $('#eventsearch').val(),
      modulesearch: $('#modulesearch').val(),
      type: $('#typesearch').val(),
      date: $('#datesearch').val(),
      module: $('#module').val(),
      auditable: $('#auditable').val(),
      time: $('#timeSearch').val(),




    }
    : {
      search: $('#search').val(),
      usersearch: $('#usersearch').val(),
      eventsearch: $('#eventsearch').val(),
      modulesearch: $('#modulesearch').val(),
      type: $('#typesearch').val(),
      date: $('#datesearch').val(),
      module: $('#module').val(),
      auditable: $('#auditable').val(),
      time: $('#timeSearch').val(),



    };

  return data;
}
const auditsreport = {
  show_values: function (id) {
    var my_url = url + '/' + id + '/detail';
    actions.show(my_url, id);
  },
  back: function () {
    actions.back();
  },
  report: function () {
    var my_url = url + '/items/table';
    actions.show(my_url);
  }
};
