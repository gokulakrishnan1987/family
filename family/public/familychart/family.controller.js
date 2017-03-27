'use strict';

(function() {

	function FamilyController($scope) {

		$scope.message = 'This is Show orders screen';

		$scope.load = function() {
			var $ = go.GraphObject.make;


			var myDiagram =
			  $(go.Diagram, "<div></div>",
			    {
			      initialContentAlignment: go.Spot.Center, // center Diagram contents
			      "undoManager.isEnabled": true, // enable Ctrl-Z to undo and Ctrl-Y to redo
			      layout: $(go.TreeLayout, // specify a Diagram.layout that arranges trees
			                { angle: 90, layerSpacing: 20 })
			    });



			// the template we defined earlier
			myDiagram.nodeTemplate =
			  $(go.Node, "Vertical",
			    { background: "#8C0095" },
			    $(go.Picture,
			      { margin: 5, width: 30, height: 30, background: "white" },
			      new go.Binding("source")),
			    $(go.TextBlock, "Default Text",
			      { row: 0, column: 0,margin: 2, stroke: "white", font: "bold 9px sans-serif" },
			      new go.Binding("text", "name")),
			    $(go.TextBlock, "Text",
			      { row: 1, column: 0,margin: 2, stroke: "white", font: "bold 9px sans-serif" },
			      new go.Binding("text", "name2"))
			  );

			// define a Link template that routes orthogonally, with no arrowhead
			myDiagram.linkTemplate =
			  $(go.Link,
			    { routing: go.Link.Orthogonal, corner: 5 },
			    $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // the link shape

			var model = $(go.TreeModel);
			model.nodeDataArray =
			[
			  { key: "1",              name: "Vel", name2: "g", source: "a.jpg" },
			  { key: "2", parent: "1", name: "N", name2: "g",    source: "cat2.png" },
			  { key: "3", parent: "1", name: "S", name2: "g",   source: "cat3.png" },
			  { key: "4", parent: "3", name: "Mullai", name2: "S", source: "cat4.png" },
			  { key: "5", parent: "3", name: "Gowtham", name2: "T",     source: "cat5.png" },
			  { key: "6", parent: "2", name: "Asai", name2: "g", source: "cat6.png" },
			  { key: "7", parent: "2", name: "Nalla", name2: "g", source: "cat6.png" },
			  { key: "8", parent: "2", name: "Boopathi", name2: "g", source: "cat6.png" },
			  { key: "9", parent: "2", name: "Rajan", name2: "g", source: "cat6.png" },
			  { key: "10", parent: "4", name: "Gokul", name2: "S", source: "cat6.png" },
			  { key: "11", parent: "4", name: "Velu", name2: "g", source: "cat6.png" },
			  { key: "12", parent: "9", name: "Suren", name2: "g", source: "cat6.png" },
			  { key: "13", parent: "9", name: "Bharani", name2: "g", source: "cat6.png" },
			  { key: "14", parent: "12", name: "Sas", name2: "g", source: "cat6.png" }
			];
			myDiagram.model = model;
	}

	//$scope.load();

	$scope.load1 = function (){


// 		var model = $(go.TreeModel);
// 			model.nodeDataArray =
// 			[
// 			  { key: "1",              name: "Vel", name2: "g", source: "a.jpg" },
// 			  { key: "2", parent: "1", name: "N", name2: "g",    source: "cat2.png" },
// 			  { key: "3", parent: "1", name: "S", name2: "g",   source: "cat3.png" },
// 			  { key: "4", parent: "3", name: "Mullai", name2: "S", source: "cat4.png" },
// 			  { key: "5", parent: "3", name: "Gowtham", name2: "T",     source: "cat5.png" },
// 			  { key: "6", parent: "2", name: "Asai", name2: "g", source: "cat6.png" },
// 			  { key: "7", parent: "2", name: "Nalla", name2: "g", source: "cat6.png" },
// 			  { key: "8", parent: "2", name: "Boopathi", name2: "g", source: "cat6.png" },
// 			  { key: "9", parent: "2", name: "Rajan", name2: "g", source: "cat6.png" },
// 			  { key: "10", parent: "4", name: "Gokul", name2: "S", source: "cat6.png" },
// 			  { key: "11", parent: "4", name: "Velu", name2: "g", source: "cat6.png" },
// 			  { key: "12", parent: "9", name: "Suren", name2: "g", source: "cat6.png" },
// 			  { key: "13", parent: "9", name: "Bharani", name2: "g", source: "cat6.png" },
// 			  { key: "14", parent: "12", name: "Sas", name2: "g", source: "cat6.png" }
// 			];

// $scope.model = model;

		     $scope.model = new go.TreeModel(
        [
         	  { key: "1",              name: "Vel", name2: "g", source: "a.jpg" },
			  { key: "2", parent: "1", name: "N", name2: "g",    source: "cat2.png" },
			  { key: "3", parent: "1", name: "S", name2: "g",   source: "cat3.png" },
			  { key: "4", parent: "3", name: "Mullai", name2: "S", source: "cat4.png" },
			  { key: "5", parent: "3", name: "Gowtham", name2: "T",     source: "cat5.png" },
			  { key: "6", parent: "2", name: "Asai", name2: "g", source: "cat6.png" },
			  { key: "7", parent: "2", name: "Nalla", name2: "g", source: "cat6.png" },
			  { key: "8", parent: "2", name: "Boopathi", name2: "g", source: "cat6.png" },
			  { key: "9", parent: "2", name: "Rajan", name2: "g", source: "cat6.png" },
			  { key: "10", parent: "4", name: "Gokul", name2: "S", source: "cat6.png" },
			  { key: "11", parent: "4", name: "Velu", name2: "g", source: "cat6.png" },
			  { key: "12", parent: "9", name: "Suren", name2: "g", source: "cat6.png" },
			  { key: "13", parent: "9", name: "Bharani", name2: "g", source: "cat6.png" },
			  { key: "14", parent: "12", name: "Sas", name2: "g", source: "cat6.png" }
        ]);

      $scope.model.selectedNodeData = null;
  };

  $scope.load1();



	};

	angular
		.module('familyApp')
		.controller('FamilyController', FamilyController)

})();
