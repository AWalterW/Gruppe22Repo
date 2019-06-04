$(function() {
    $(".stack").draggable();

    $('#trash').droppable({
        over: function(event, ui) {
            ui.draggable.remove();
        }
    });
});