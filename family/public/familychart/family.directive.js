'use strict';

(function() {
	'use strict'
	angular
		.module('familyApp')		
		.directive('goDiagram', function() {
      		return {
        		restrict: 'E',
        		template: '<div></div>',  // just an empty DIV element
        		replace: true,
        		scope: { model: '=goModel' },
        		link: function(scope, element, attrs) {

				    var $ = go.GraphObject.make;
          			var diagram = $(go.Diagram, element[0],
              				{
			            nodeTemplate: $(go.Node, "Vertical",
						    	{ background: "#8C0095" },
						    	$(go.Picture,{ margin: 5, width: 30, height: 30, background: "white" },
						      	new go.Binding("source")),
						    	$(go.TextBlock, "Default Text",
						      	{ row: 0, column: 0,margin: 2, stroke: "white", font: "bold 9px sans-serif" },
						      	new go.Binding("text", "name")),
						    	$(go.TextBlock, "Text",
						      	{ row: 1, column: 0,margin: 2, stroke: "white", font: "bold 9px sans-serif" },
						      	new go.Binding("text", "name2"))
						  ),
                		linkTemplate: $(go.Link, { routing: go.Link.Orthogonal, corner: 5 },
			    				$(go.Shape, { strokeWidth: 3, stroke: "#555" })),
                		initialContentAlignment: go.Spot.Center,
                		layout: $(go.TreeLayout, { angle: 90, layerSpacing: 20 }),
                "ModelChanged": updateAngular,
                "ChangedSelection": updateSelection,
                "undoManager.isEnabled": true
              });

          // whenever a GoJS transaction has finished modifying the model, update all Angular bindings
          function updateAngular(e) {
            if (e.isTransactionFinished) {
              scope.$apply();
            }
          }

          // update the Angular model when the Diagram.selection changes
          function updateSelection(e) {
            diagram.model.selectedNodeData = null;
            var it = diagram.selection.iterator;
            while (it.next()) {
              var selnode = it.value;
              // ignore a selected link or a deleted node
              if (selnode instanceof go.Node && selnode.data !== null) {
                diagram.model.selectedNodeData = selnode.data;
                break;
              }
            }
            scope.$apply();
          }

          // notice when the value of "model" changes: update the Diagram.model
          scope.$watch("model", function(newmodel) {
            var oldmodel = diagram.model;
            if (oldmodel !== newmodel) {
              diagram.removeDiagramListener("ChangedSelection", updateSelection);
              diagram.model = newmodel;
              diagram.addDiagramListener("ChangedSelection", updateSelection);
            }
          });

          scope.$watch("model.selectedNodeData.name", function(newname) {
            if (!diagram.model.selectedNodeData) return;
            // disable recursive updates
            diagram.removeModelChangedListener(updateAngular);
            // change the name
            diagram.startTransaction("change name");
            // the data property has already been modified, so setDataProperty would have no effect
            var node = diagram.findNodeForData(diagram.model.selectedNodeData);
            if (node !== null) node.updateTargetBindings("name");
            diagram.commitTransaction("change name");
            // re-enable normal updates
            diagram.addModelChangedListener(updateAngular);
          });
        }
      };
    })
  //   .controller('MinimalCtrl', function($scope) {
  //     $scope.model = new go.GraphLinksModel(
  //       [
  //         { key: 1, name: "Alpha", color: "lightblue" },
  //         { key: 2, name: "Beta", color: "orange" },
  //         { key: 3, name: "Gamma", color: "lightgreen" },
  //         { key: 4, name: "Delta", color: "pink" }
  //       ],
  //       [
  //         { from: 1, to: 2 },
  //         { from: 1, to: 3 },
  //         { from: 2, to: 2 },
  //         { from: 3, to: 4 },
  //         { from: 4, to: 1 }
  //       ]);

  //     $scope.model.selectedNodeData = null;

  //     $scope.replaceModel = function() {
  //       $scope.model = new go.GraphLinksModel(
  //           [
  //             { key: 11, name: "zeta", color: "red" },
  //             { key: 12, name: "eta", color: "green" }
  //           ],
  //           [
  //             { from: 11, to: 12 }
  //           ]
  //         );
  //     }
  // });
})();