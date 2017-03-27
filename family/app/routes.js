var Todo = require('./models/todo');
var Members = require('./models/members');


module.exports = function(app) {


///////////////////MEMBERS ////////////////////////////////////
	app.get('/api/member_data', function(req, res) {
		
		Members.findOne({_id: req.query["id"]}, function(err, members) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(members); // return all todos in JSON format
		});
	});

	app.get('/api/members', function(req, res) {
		
		Members.find(function(err, members) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(members); // return all todos in JSON format
		});
	});


	app.post('/api/members', function(req, res) {
		
		Members.create({
			name : req.body.name,
			gender : req.body.gender,
			age : req.body.age
		}, function(err, member) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Members.find(function(err, members) {
				if (err)
					res.send(err)
				res.json(members);
			});
		});

	});

	app.put('/api/members/:member_id', function(req, res) {
		
		Members.update({
			_id : req.params.member_id
		},{
			name : req.body.name,
			gender : req.body.gender,
			age : req.body.age
		}, function(err, member) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Members.find(function(err, members) {
				if (err)
					res.send(err)
				res.json(members);
			});
		});

	});

	app.delete('/api/members/:member_id', function(req, res) {
		
		Members.remove({
			_id : req.params.member_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Members.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});


	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			text : req.body.text,
			done : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};