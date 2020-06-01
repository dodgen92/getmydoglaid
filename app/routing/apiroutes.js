
var tableData = require("../data/friends");

//Routing
module.exports = function(app) {
  
  //API Get Requests
  app.get("/api/friends", function(req, res) {
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(tableData, null, 4));
  });

  //API Post Requests
  app.post("/api/friends", function(req, res) {
    
    //Parse new friend input to get integers 
    var newFriend = {
      name: req.body.name,
      photo: req.body.photo,
      scores: []
    };
    var scoresArray = [];
    for(var i=0; i < req.body.scores.length; i++){
      scoresArray.push( parseInt(req.body.scores[i]) )
    }
    newFriend.scores = scoresArray;


    //Cross check the new friend entry with the existing ones
    var scoreComparisionArray = [];

    //console.log("tableData.length: " + tableData.length)
    
    for(var i=0; i < tableData.length; i++){
    
    
      var currentComparison = 0;

      //console.log("newFriend.scores.length: " + newFriend.scores.length)
      
      for(var j=0; j < newFriend.scores.length; j++){
        currentComparison += Math.abs( newFriend.scores[j] - tableData[i].scores[j] );
      }

      //Push each comparison between friends to array
      scoreComparisionArray.push(currentComparison);
    }

    //Determine best match using the postion of best match in the tableData array
    var bestMatchPosition = 0; // assume its the first person to start

    //console.log("scoreComparisionArray.length: " + scoreComparisionArray.length)
    
    for(var i=1; i < scoreComparisionArray.length; i++){

      //Lower number in comparison difference means better match
      if(scoreComparisionArray[i] <= scoreComparisionArray[bestMatchPosition]){
        bestMatchPosition = i;

        //console.log("bestMatchPosition: " + bestMatchPosition)
      
      }

    }

    
    var bestFriendMatch = tableData[bestMatchPosition];
    //console.log("bestFriendMatch.name: " + bestFriendMatch.name)

    tableData.push(req.body);
    //res.json(true);

    res.json(bestFriendMatch);

  });

  // Empty out the arrays of data
  app.post("/api/clear", function(req, res) {
    tableData.length = 0;
    res.json({ ok: true });
  });
};
