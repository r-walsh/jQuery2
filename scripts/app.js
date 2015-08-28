$(document).ready(function() {

$("#new-task-form").hide();

var listo = [];

function Task(task) {
	this.task = task;
	this.id = 'new';
}

function addTask(task) {
	if (task) {
		task = new Task(task);
		listo.push(task);

		$('#new-item-input').val('');
		$('#new-list').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>')
	}
	$('#new-task-form, #new-list-item').fadeToggle('fast', 'linear');
}

function advanceTask(task) {
	var modified = task.text.trim();

	for (var i = 0; i < listo.length; i++) {
		if (listo[i].task === modified) {
			if (listo[i].id === 'new') {
				listo[i].id = 'inProgress';
			} else if(listo[i].is === 'inProgress') {
				listo[i].id = 'archived';
			} else {
				listo.splice(i, 1);
			}
		}
	}
	task.remove();
}

$('#save-new-item').on('click', function(e) {
	e.preventDefault();

	var task = $('#new-item-input').val().trim();
	addTask(task);
});

$('#new-list-item').on('click', function() {
	$('#new-task-form, #new-list-item').fadeToggle('fast', 'linear');
});

$('#cancel').on('click', function(e) {
	e.preventDefault();

	$('#new-task-form, #new-list-item').fadeToggle('fast', 'linear');
});

$(document).on('click', '#item', function(e) {
	e.preventDefault();

	var task = this;
	advanceTask(task);
	this.id = 'in-progress';

	$('#current-list').append(this);
});

$(document).on('click', '#in-progress', function(e) {
	e.preventDefault();

	var task = this;
	task.id = 'archived';
	var modified = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
	advanceTask(task);
	// $('archived-list').append(modified);
	$(modified).appendTo($('#archived-list'));
})








});