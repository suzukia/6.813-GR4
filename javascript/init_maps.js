function init_map() {
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
    var spaceScene1Question4 = new Question("Planets: Famous Features", "What planet is famous for its big red spot?", ["Mars", "Earth", "Jupiter", "Venus"], "C");
    var spaceScene1Question5 = new Question("Planets: Third Planet, Best Planet", "What is the third planet from the sun?", ["Saturn", "Mercury", "Earth", "Pluto"], "C");

    var spaceScene2Question1 = new Question("Space Discovery: Moon", "Who was the first person to walk on the moon?", ["Neil Armstrong", "Larry Page", "Buzz Aldrin", "Mark Zuckerberg"], "A");
    var spaceScene2Question2 = new Question("Space Discovery: Mars", "When did the first human set foot on Mars?", ["1906", "1932", "1967", "Never"], "D");
    var spaceScene2Question3 = new Question("Space Discovery: Telescopes", "What is the name of NASA’s most famous space telescope?", ["Hubble Space Telescope", "Star Space Telescope", "Galaxy Space Telescope", "Marble Space Telescope"], "A");
    var spaceScene2Question4 = new Question("Space Discovery: The Sun", "What is the sun?", ["A planet", "A comet", "A star", "A meteorite"], "C");
    var spaceScene2Question5 = new Question("Space Discovery: It's Getting Cold in Here", "Uranus along with Neptune are categorized as what type of planet?", ["Hot Lava Planets", "Cold Planets", "Ice Giants", "Barren Land Planets"], "C");

    var spaceScene3Question1 = new Question("Solar System: Sun Proximity", "Which planet is closest to the Sun", ["Earth", "Venus", "Mars", "Mercury"], "D");
    var spaceScene3Question2 = new Question("Solar System: Orbits", "The Earth orbits which of the following?", ["Mars", "Jupiter", "Sun", "Neptune"], "C");
    var spaceScene3Question3 = new Question("Solar System: Number of Planets", "How many planets are there in our solar system?", ["8", "10", "12", "14"], "A");
    var spaceScene3Question4 = new Question("Solar System: Age", "How old is the solar system?", ["5000 years", "5 million years", "5 billion years", "500 billion years"], "C");
    var spaceScene3Question5 = new Question("Solar System: Asteroid Belt", "The asteroid belt lies between which two planets?", ["Jupiter and Saturn", "Saturn and Uranus", "Mars and Jupiter", "Earth and Mars"], "C");

    var medievalScene1Question1 = new Question("Middle Ages: Time Period", "What time period followed the Middle Ages?", ["Dark Ages", "Renaissance", "Modern", "Prehistoric"], "B");
    var medievalScene1Question2 = new Question("Middle Ages: Institution", "What was the most powerful institution during the Middle Ages?", ["the Protestant Church", "the government", "the Catholic Church", "the king and his army"], "C");
    var medievalScene1Question3 = new Question("Middle Ages: Religion", "What religion was on the rise during the Middle Ages?", ["Islam", "Hinduism", "Judaism", "Buddhism"], "A");
    var medievalScene1Question4 = new Question("Middle Ages: Castles", "Castles were very popular durinng the Middle Ages. What kind of terrain were castles usually built upon?", ["On an open plain", "Within a swamp", "On top of a hill", "In a forest or wooded area"], "C");
    var medievalScene1Question5 = new Question("Middle Ages: Swords", "The weapon of choice during the Medieval Ages was the sword. Which of these is NOT a kind of sword?", ["Greatsword", "Broadsword", "Pointsword", "Longsword"], "C");

    var medievalScene2Question1 = new Question("Crusades: Definition", "What were the Crusades?", ["Pirates", "Group of Ships", "Knights", "Holy Wars"], "D");
    var medievalScene2Question2 = new Question("Crusades: Purpose", "What place were the Crusades fighting for?", ["London", "Paris", "Venice", "Palestine"], "D");
    var medievalScene2Question3 = new Question("Crusades: Number", "How many Crusades were there?", ["8", "9", "10", "11"], "B");
    var medievalScene2Question4 = new Question("Crusades: Fighters", "Who fought each other in the Crusades?", ["The Eastern and Western Roman Empires", "The Romans and the Greeks", "The Europeans and the Arabs", "The Vikings and the English"], "C");
    var medievalScene2Question5 = new Question("Crusades: Symbols", "What was the symbol of the Crusaders?", ["A blue sword", "A yellow lion", "A red cross", "A black snake"], "C");

    var medievalScene3Question1 = new Question("Medieval Life: Women", "Which of the following did women have to obey?", ["Father", "Brother", "Other Men in the Family", "All of the Above"], "D");
    var medievalScene3Question2 = new Question("Medieval Life: Food", "Medieval food was influenced by what culture?", ["Indians", "Normans", "Egyptians", "Chinese"], "B");
    var medievalScene3Question3 = new Question("Medieval Life: Art", "Which of the following was not a king during the Medieval period?", ["King George", "William the Conqueror", "King Henry", "King Edward"], "A");
    var medievalScene3Question4 = new Question("Medieval Life: Kings and Castles", "Why did Kings and Lords build castles to live in during the Middle Ages?", ["To stay warm and keep the snow out", "Because they thought they looked cool", "To protect themselves and their people when attacked", "All of the above"], "C");
    var medievalScene3Question5 = new Question("Medieval Life: Castle Affairs", "What was the title of the person who was in charge of the affairs of the castle?", ["Journeyman", "Magistrate", "Steward", "King"], "C");

  /////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////  SCENES ////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////

    var spaceScene1 = {
      image: "../images/map/space/voyage1.jpg",
      questions: [spaceScene1Question1, spaceScene1Question2, spaceScene1Question3, spaceScene1Question4, spaceScene1Question5]
    }

    var spaceScene2 = {
      image: "../images/map/space/voyage2.jpeg",
      questions: [spaceScene2Question1, spaceScene2Question2, spaceScene2Question3, spaceScene2Question4, spaceScene2Question5]
    }

    var spaceScene3 = {
      image: "../images/map/space/voyage3.jpg",
      questions: [spaceScene3Question1, spaceScene3Question2, spaceScene3Question3, spaceScene3Question4, spaceScene3Question5]
    }

    var medievalScene1 = {
      image: "../images/map/medieval/act1.jpg",
      questions: [medievalScene1Question1, medievalScene1Question2, medievalScene1Question3, medievalScene1Question4, medievalScene1Question5]
    }

    var medievalScene2 = {
      image: "../images/map/medieval/act2.png",
      questions: [medievalScene2Question1, medievalScene2Question2, medievalScene2Question3, medievalScene2Question4, medievalScene2Question5]
    }

    var medievalScene3 = {
      image: "../images/map/medieval/act3.png",
      questions: [medievalScene3Question1, medievalScene3Question2, medievalScene3Question3, medievalScene3Question4, medievalScene3Question5]
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
      description: "Journey to your throne.",
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
}