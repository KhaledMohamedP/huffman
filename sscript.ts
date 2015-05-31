// var Break = {
//     toString: function() {
//         return "Break";
//     }
// };
var input = document.getElementById('input');

// function forEach(array, action) {
//         try {
//             for (var i = 0; i < array.length; i++)
//                 action(array[i]);
//         } catch (exception) {
//             if (exception != Break)
//                 throw exception;
//         }
//     }
//     /*
//     var array = [1, 23, 4, 50, 32, 0, 21, 10, 0];

//     // reduce

//     function reduce(combine, base, array) {
//         forEach(array, function(element) {
//             base = combine(base, element);
//         });
//         return base;
//     }



//     // function countZero(base, elment) {
//     //     if (elment === 0)
//     //         return ++base;

//     //     return base;
//     // }


//     function countZero(elment) {
//         if (elment === 0)
//             return true;

//         return false;
//     }


//     function count(test, array) {
//         var base = 0;
//         forEach(array, function(num) {
//             base += test(num) ? 1:0;
//         }); 

//         return base; 
//     }

//     var r = count(countZero, array);

//     console.log(r);

//     */



// ///roads
// ///
// var roads = {};

// function makeRoad(from, to, length) {
//         function addRoad(from, to) {
//             if (!(from in roads))
//                 roads[from] = [];
//             roads[from].push({
//                 to: to,
//                 distance: length
//             });
//         }
//         addRoad(from, to);
//         addRoad(to, from);
//     }
//     // makeRoad("Point Kiukiu", "Hanaiapa", 19);
//     // makeRoad("Point Kiukiu", "Mt Feani", 15);
//     // makeRoad("Point Kiukiu", "Taaoa", 15);

// function makeRoads(start) {
//     for (var i = 1; i < arguments.length; i += 2)
//         makeRoad(start, arguments[i], arguments[i + 1]);
// }

// var roads = {};
// makeRoads("Point Kiukiu", "Hanaiapa", 19,
//     "Mt Feani", 15, "Taaoa", 15);
// makeRoads("Airport", "Hanaiapa", 6, "Mt Feani", 5,
//     "Atuona", 4, "Mt Ootua", 11);
// makeRoads("Mt Temetiu", "Mt Feani", 8, "Taaoa", 4);
// makeRoads("Atuona", "Taaoa", 3, "Hanakee pearl lodge", 1);
// makeRoads("Cemetery", "Hanakee pearl lodge", 6, "Mt Ootua", 5);
// makeRoads("Hanapaoa", "Mt Ootua", 3);
// makeRoads("Puamua", "Mt Ootua", 13, "Point Teohotepapapa", 14);

// function show(elm) {
//     if (elm != undefined) {
//         console.log(elm);
//     } else {
//         throw new Error('the elm ' + elm + ' now found');
//     }
// }

// function roadsFrom(place) {
//     var found = roads[place];
//     if (found == undefined)
//         throw new Error("No place named '" + place + "' found.");
//     else
//         return found;
// }



// // show(roads["Airport"]);
// function gamblerPath(from, to) {
//     function randomInteger(below) {
//         return Math.floor(Math.random() * below);
//     }

//     function randomDirection(from) {
//         var options = roadsFrom(from);
//         return options[randomInteger(options.length)].to;
//     }

//     var path = [];
//     while (true) {
//         path.push(from);
//         if (from == to)
//             break;
//         from = randomDirection(from);
//     }
//     return path;
// }

// function member(array, value) {
//     var found = false;
//     forEach(array, function(element) {
//         if (element === value)
//             found = true;
//     });
//     return found;
// }


// function flatten(arrays) {
//     var result = [];
//     forEach(arrays, function(array) {
//         forEach(array, function(element) {
//             result.push(element);
//         });
//     });
//     return result;
// }

// function filter(test, array) {
//     var result = [];
//     forEach(array, function(element) {
//         if (test(element))
//             result.push(element);
//     });
//     return result;
// }

// function map(test, array) {
//     var result = [];
//     forEach(array, function(element) {
//         result.push(test(element));
//     });
//     return result;
// }

// // show(roads);
// // 
// // 
// function possibleRoutes(from, to) {
//     function findRoutes(route) {
//         function notVisited(road) {
//             return !member(route.places, road.to);
//         }

//         function continueRoute(road) {
//             return findRoutes({
//                 places: route.places.concat([road.to]),
//                 length: route.length + road.distance
//             });
//         }

//         var end = route.places[route.places.length - 1];
//         if (end == to){
//             // console.log(route)
//             return [route];
//         }
//         else{
//             var filtered = filter(notVisited, roadsFrom(end))
//             var masp = map(continueRoute, filtered); 
//             return flatten(masp);
//         }

//     }

//     return findRoutes({
//         places: [from],
//         length: 0
//     });
// }

// function shortestPath(from,to){
//     var allPaths = possibleRoutes(from, to);
//     var shortestPath = allPaths[0].length ; 
//     var found = null; 
//     forEach(allPaths, function(elm) {
//         if( elm.length < shortestPath){
//             found = elm; 
//             shortestPath = elm.length;
//         }
//     });
//     return found ; 
// }
// console.log('hello khaled')
// show(shortestPath("Point Kiukiu", "Point Teohotepapapa"));
// 
// 
// 

// var text = "khaled mohamed lia salhe djjdfjj dfjjfd jjjjfdf--sfdfjsfd kjf23jn kdfhjdf ";
// var array = text.split(' ');
// var start = new Date();
// var output =''; 

// for (var i = 0; i < array.length; i++) {
//     output += array[i];
// }
// var end = new Date();


// console.log((end.getTime() - start.getTime())/1000)

// start = new Date(); 

// var s = text.replace(/\s?(\w+)/gi, "$1"); 
// end = new Date(); 
// console.log((end.getTime() - start.getTime())/1000)
// console.log(s,output)

