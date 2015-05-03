$(document).ready(function() { // must be loaded AFTER utilityFuncs.js

  localStorage.removeItem("maps");

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

  var spaceScene1Question1 = new Question("Planets: Heat", "What is the hottest planet in our solar system?", ["Earth", "Venus", "Mars", "Mercury"], "B");
  var spaceScene1Question2 = new Question("Planets: Size", "Which is the largest planet in our solar system?", ["Mars", "Jupiter", "Saturn", "Neptune"], "B");
  var spaceScene1Question3 = new Question("Planets: Rings", "Which planet has a ring on it?", ["Mars", "Jupiter", "Saturn", "Neptune"], "C");

  var spaceScene2Question1 = new Question("Space Discovery: Moon", "Who was the first person to walk on the moon?", ["Neil Armstrong", "Larry Page", "Buzz Aldrin", "Mark Zuckerberg"], "A");
  var spaceScene2Question2 = new Question("Space Discovery: Mars", "When did the first human set foot on Mars?", ["1906", "1932", "1967", "Never"], "D");
  var spaceScene2Question3 = new Question("Space Discovery: Telescopes", "What is the name of NASA’s most famous space telescope?", ["Hubble Space Telescope", "Star Space Telescope", "Galaxy Space Telescope", "Marble Space Telescope"], "A");

  var spaceScene3Question1 = new Question("Solar System: Sun Proximity", "Which planet is closest to the Sun", ["Earth", "Venus", "Mars", "Mercury"], "D");
  var spaceScene3Question2 = new Question("Solar System: Orbits", "The Earth orbits which of the following?", ["Mars", "Jupiter", "Sun", "Neptune"], "C");
  var spaceScene3Question3 = new Question("Solar System: Number of Planets", "How many planets are there in our solar system?", ["8", "10", "12", "14"], "A");

  var medievalScene1Question1 = new Question("Middle Ages: Time Period", "What time period followed the Middle Ages?", ["Dark Ages", "Renaissance", "Modern", "Prehistoric"], "B");
  var medievalScene1Question2 = new Question("Middle Ages: Institution", "What was the most powere institution during the Middle Ages?", ["the Protestant Church", "the government", "the Catholic Church", "the king and his army"], "C");
  var medievalScene1Question3 = new Question("Middle Ages: Religion", "What religion was on the rise during the Middle Ages?", ["Islam", "Hinduism", "Judaism", "Bhuddism"], "A");

  var medievalScene2Question1 = new Question("Crusades: Definition", "What were the Crusades?", ["Pirates", "Group of Ships", "Knights", "Holy Wars"], "D");
  var medievalScene2Question2 = new Question("Crusades: Purpose", "What place were the Crusades fighting for?", ["London", "Paris", "Venice", "Palestine"], "D");
  var medievalScene2Question3 = new Question("Crusades: Number", "How many Crusades were there?", ["8", "9", "10", "11"], "B");

  var medievalScene3Question1 = new Question("Medieval Life: Women", "Which of the following did women have to obey?", ["Father", "Brother", "Other Men in the Family", "All of the Above"], "D");
  var medievalScene3Question2 = new Question("Medieval Life: Food", "Medieval food was influenced by what culture?", ["Indians", "Normans", "Egyptians", "Chinese"], "B");
  var medievalScene3Question3 = new Question("Medieval Life: Art", "Which of the following was not a king during the Medieval period?", ["King George", "William the Conqueror", "King Henry", "King Edward"], "A");

/////////////////////////////////////////////////////////////////////////////////
////////////////////////////  SCENES ////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

  var spaceScene1 = {
    image: "../images/map/space/voyage1.jpg",
    questions: [spaceScene1Question1, spaceScene1Question2, spaceScene1Question3]
  }

  var spaceScene2 = {
    image: "../images/map/space/voyage2.jpg",
    questions: [spaceScene2Question1, spaceScene2Question2, spaceScene2Question3]
  }

  var spaceScene3 = {
    image: "../images/map/space/voyage3.jpg",
    questions: [spaceScene3Question1, spaceScene3Question2, spaceScene3Question3]
  }

  var medievalScene1 = {
    image: "../images/map/medieval/act1.jpg",
    questions: [medievalScene1Question1, medievalScene1Question2, medievalScene1Question3]
  }

  var medievalScene2 = {
    image: "../images/map/medieval/act2.jpg",
    questions: [medievalScene2Question1, medievalScene2Question2, medievalScene2Question3]
  }

  var medievalScene3 = {
    image: "../images/map/medieval/act3.jpg",
    questions: [medievalScene3Question1, medievalScene3Question2, medievalScene3Question3]
  }


/////////////////////////////////////////////////////////////////////////////////
////////////////////////////  MAPS //////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

  var maps = [
    {
    name:"Space",
    description: "Explore the solar system!",
    icon: "../images/map/space/icon.gif",
    sceneUnit: "Voyage",
    scenes: [spaceScene1, spaceScene2, spaceScene3]
    },

    {
    name:"Medieval",
    description: "Journey to your throne",
    icon: "../images/map/medieval/icon.jpg",
    sceneUnit: "Act",
    scenes: [medievalScene1, medievalScene2, medievalScene3]
    }
  ]
  console.log("maps");
  console.log(maps);
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