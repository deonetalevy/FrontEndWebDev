/* 
FrontEndScript.js 
*/

$(document).ready(function(){ //Makes sure the entire html document has been loaded
                              //before js runs

"use strict"; //Makes variables require a declaration

//var msg = "Hello JavaScript";
// console.log(msg);

// var resultsDiv = document.getElementById("results");
// resultsDiv.innerHTML = "<p>This is from JavaScript</p>";

var resultList = $("#resultList"); //jQuery == $
resultList.text("This is from jQuery.");

var toggleButton = $("#toggleButton");
toggleButton.on("click", function(){  //on == event listener. First argument is name of event you want to handle. Second argument is the callback function
    resultList.toggle(500); //Will toggle button to opposite state. Argument is the time it takes to change

    if (toggleButton.text() == "Hide") toggleButton.text("Show")
    else toggleButton.text("Hide"); 

}); 


var listItems=$("header nav li");
listItems.css("font-weight", "bold");
listItems.css("font-size", "18px");
//Executing a function on a wrapped set will affect every item in the set
//listItems.filter(":first").css("font-size", "22px"); //Run function on a specifice
                                                     //item in the wrapped set




// var result = { //curly braces mean you're creating a new object
//     name: "jQuery",
//     language: "JavaScript",
//     score: 4.5,
//     showLog: function (){

//     },
//     owner: {
//         login: "deonetalevy",
//         id: 49712
//     }
// };

// result.phoneNumber = "863-399-0576";

// console.log(result.phoneNumber);

$("#gitHubSearchForm").on("submit", function(event){
    
    var searchPhrase = $("#searchPhrase").val();
    var useStars = $("#useStars").val();
    var langChoice = $("#langChoice").val();

    if (searchPhrase){ //If searchPhrase has an entry
    
    resultList.text("Performing search...");
    
    
    // var encodedSearchPhrase = encodeURIcomponent(searchPhrase);
    // var encodedLangChoice = encodeURIcomponent(langChoice);

    //Query based on what user has selected

    var gitHubSearch = "https://api.github.com/search/repositories?q=" + searchPhrase;

    if (langChoice != "All"){
        gitHubSearch += "+language:" + searchPhrase;
    }

    if (useStars == "checked"){
        gitHubSearch += "&sort=stars";
    } 

    //var gitHubSearch = "https://api.github.com/search/repositories?q=jquery+language:javascript&sort=stars"

    $.get(gitHubSearch)
        .then(function(r) {
            //console.log(r.items.length); //return how many items are in the query results
            displayResults(r.items);        
        },function(err) {
                console.log("Failed to query GitHub");
        });
    
         
    } 
    
    return false; // will prevent event from running in html
});


// var results = [{ //curly braces mean you're creating a new object
//     name: "jQuery",
//     language: "JavaScript",
//     score: 4.5,
//     showLog: function (){    },
//     owner: {
//         login: "deonetalevy",
//         id: 49712
//         }
//     }, {
//     name: "jQuery UI",
//     language: "JavaScript",
//     score: 3.5,
//     showLog: function (){    },
//     owner: {
//         login: "deonetalevy",
//         id: 49712
//     }
//     }];

function displayResults(results) {
resultList.empty();
$.each(results, function(i, item){ //for loop with results and call back
                                   //function as arguments. 

    var newResult = $("<div class='result'>" + //Concatenate results for display. newResult is a jQuery object $
        "<div class='title'>" + item.name + "</div>" +
        "<div>Language: " + item.language + "</div>" +
        "<div>Owner: " + item.owner.login + "</div>" +
        "</div>");

    newResult.hover(function(){ //hover takes one function for entering the div and on function for leaving the div
        //make it darker
        $(this).css("background-color", "lightgray");
    }, function(){
        //reverse
        $(this).css("background-color", "transparent")
    });

    resultList.append(newResult);
});
}

// for (var x = 0; x < results.length; x++){
//     var result = results[x];
//     if (result.score > 4) continue;
//     console.log(result.name);
// }

// console.log(results.length);
// console.log(results[0], results[1]);

// results.push(result);
// results.push({
//     name: "dummy project"
// });

// console.log("msg is " + typeof(msg));
// console.log("resultsDiv is " + typeof(resultsDiv));

// var none;
// console.log("none is " + typeof(none));

// var aNumber = 10;
// console.log("aNumber is" + typeof(aNumber));

// var trueFalse = true;
// console.log("trueFalse is" + typeof(trueFalse));

// // nonexistant = "this shouldn't work";

// if (!none) { //!none == none != undefined
//     console.log("none is undefined");
// }

// if (aNumber === "10"){  /*can use 10 or "10". JavaScript will automatically convert the
//                         number to string when it sees they are being compared using != and ==. Use === for and exact comparison */
//     console.log("10 is 10");
// }

// /* Can't define functions of the same name. Most recent one will overwrite.
// function showMsg(msg){
//     console.log("showMsg: " + msg);
// }*/

// function showMsg(msg, more) {
//     if(more){ //Its up to you to handle multiple parameters.l
//         console.log("showMsg+ " + msg + more);
//     } else {
//         console.log("showMsg+ " + msg);
//     }
    
// }

// showMsg("some information");
// showMsg("more information", " and even more")

// var showIt = function (msg) {
//     console.log(msg);
// }

// showIt("Some message");

// function showItThen(msg, callback) {
//     showIt(msg);
//     callback();
// }

// showItThen("showItThen called", function(){
//     console.log("callback called")
// });

// //Scope - Where global things are attached to

// var inGlobal = true;

// function testMe(){
//     console.log("testMe(): " + inGlobal);

//     var someMsg = "some Message";
//     console.log("testMe(): " + someMsg);

//     showItThen("with Closure", function(){
//         showIt("testMe With Closure(): " + someMsg);
//     });
// }

// testMe();

// /* this code shouldn't work because someMsg isn't in the global scope
//     console.log("global: " + someMsg); 
// */

// //Allows access to outer variables within inner scopes
});
