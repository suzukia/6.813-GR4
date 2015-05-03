$(document).ready(function() { // must be loaded AFTER utilityFuncs.js

/////////////////////////////////////////////////////////////////////////////////
////////////////////////////  QUESTIONS /////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

  function Question(title, description, choices, correctAnswer) {
      this.title = title;
      this.description = description;
      this.choices = choices;
      this.correctAnswer = correctAnswer;
      return this;
  }

  var compositionOfMatter = new Question("Composition of Matter", "Which is the first element in the periodic table?", ["Li", "He", "H", "Ne"], "C");
  var lifeOfPi = new Question("Life of Pi", "Rally", [""], "A");
  var famousComposers = new Question("Famous Composers", "Which composer was deaf?", ["Mozart", "Beethoven", "Handel", "Bach"], "B");

/////////////////////////////////////////////////////////////////////////////////
////////////////////////////  SCENES ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

  var spaceScene1 = {
    image: "../images/map/medieval/icon.jpg",
    questions: [compositionOfMatter, lifeOfPi, famousComposers]
  }

  var spaceScene2 = {
    image: "../images/map/medieval/icon.jpg",
    questions: [compositionOfMatter, lifeOfPi, famousComposers]
  }

  var spaceScene3 = {
    image: "../images/map/medieval/icon.jpg",
    questions: [compositionOfMatter, lifeOfPi, famousComposers]
  }

/////////////////////////////////////////////////////////////////////////////////
////////////////////////////  MAPS //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

  var maps = [
    {
    name:"Space",
    description: "Explore the solar system!",
    icon: "../images/map/medieval/icon.jpg",
    sceneUnit: "Voyage",
    scenes: [spaceScene1, spaceScene2, spaceScene3]
    },

    {
    name:"Medieval",
    description: "Journey to your throne",
    icon: "../images/map/space/icon.gif",
    sceneUnit: "Act",
    scenes: [spaceScene1, spaceScene2, spaceScene3]
    }
  ]
  setStorageItem("maps", maps);
});


// map structure:
//   scene unit
//   scenes (3):
//     each scene:
//       image
//       questions
//         question description
//         options {A: dlfja, B: asdjf, C: asdf}
//         correct answer= A