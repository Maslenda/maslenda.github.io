/**
 * @author Leviathenn(aka Levi G. Anderson)
 */
const firebaseConfig = {
    apiKey: "AIzaSyAXx42s0ZBKrswGjUl7nSznm8pum2IfNEw",
    authDomain: "magenda-120d0.firebaseapp.com",
    databaseURL: "https://magenda-120d0-default-rtdb.firebaseio.com",
    projectId: "magenda-120d0",
    storageBucket: "magenda-120d0.appspot.com",
    messagingSenderId: "530280578497",
    appId: "1:530280578497:web:81c814842de6b6d40a8340",
    measurementId: "G-8R0MPMH3BY"
};
firebase.initializeApp(firebaseConfig);

function genRandonString(length) {
   let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
   let charLength = chars.length;
   let result = '';
   for ( let i = 0; i < length; i++ ) {
      result += chars.charAt(Math.floor(Math.random() * charLength));
   }
   return result;
}
function getDay(){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const d = new Date();
    let day = weekday[d.getDay()];
    return day;
}
let username;
let password;
function fetchUserData(callback){
    const database = firebase.database();
    const usersRef = database.ref('users');
    const queryString = window.location.search;
    const fontQuery = localStorage.getItem("font");
    let credQuery;
    if(!fontQuery){
        const urlParams = new URLSearchParams(queryString);
        credQuery = urlParams.get('font');
        if(!credQuery){
            document.location.href = '/'
        }else{
            localStorage.setItem("font",credQuery)
            document.location.href = "/app";
        }

    }else{
        credQuery = localStorage.getItem("font");
    }

    const username = atob(credQuery.split('|')[0]);
    password = atob(credQuery.split('|')[1]);


    // First, fetch the user data based on the username
    usersRef
      .orderByChild('username')
      .equalTo(username)
      .once('value')
      .then((snapshot) => {
        // Check if the user exists
        if (snapshot.exists()) {
          const userKey = Object.keys(snapshot.val())[0]; // Get the user key
          const user = snapshot.val()[userKey];

          // Update the announcements array
          if (!user.announcements) {
            user.announcements = []; // Create an array if it doesn't exist
          }

          // Add the new announcements to the user's array
          callback(user);

          // Save the updated user data back to the database

        } else {
          console.error(`User ${username} not found.`);
        }
      })
      .catch((error) => {
        console.error(`Error fetching user data for ${username}:`, error);
      });
}
//function updateThing(usernamez, newData, index) {
//  const database = firebase.database();
//  const usersRef = database.ref('users');
//
//  // First, fetch the user data based on the username
//  usersRef
//    .orderByChild('username')
//    .equalTo(usernamez)
//    .once('value')
//    .then((snapshot) => {
//      if (snapshot.exists()) {
//        const userKey = Object.keys(snapshot.val())[0]; // Get the user key
//        const user = snapshot.val()[userKey];
//
//        // Check if the 'ela' object exists for the user
//        if (user.hasOwnProperty('ela') && typeof user['ela'] === 'object') {
//          const elaObject = user['ela'];
//
//          // Check if the given index exists and has 'days' object
//          if (elaObject.hasOwnProperty(index) && elaObject[index].hasOwnProperty('days')) {
//            // Update the specific announcement object at the given index
//            elaObject[index].days = newData.days;
//          } else {
//            console.error(`Invalid index or 'ela' object is not in the expected format.`);
//            return;
//          }
//        } else {
//          console.error(`'ela' object is not in the expected format.`);
//          return;
//        }
//
//        // Save the updated user data back to the database
//        usersRef
//          .child(userKey)
//          .update(user)
//          .then(() => {
//            console.log(`Updated announcement for user ${usernamez}`);
//            // Trigger the callback to handle the updated data
//          })
//          .catch((error) => {
//            console.error(`Error updating announcement for user ${usernamez}:`, error);
//          });
//      } else {
//        console.error(`User ${usernamez} not found.`);
//      }
//    })
//    .catch((error) => {
//      console.error(`Error fetching user data for ${usernamez}:`, error);
//    });
//}
function updateThing(usernamez, newData, classPeroid, index){
  const database = firebase.database();
  const usersRef = database.ref('users');

  // First, fetch the user data based on the username
  usersRef
    .orderByChild('username')
    .equalTo(usernamez)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userKey = Object.keys(snapshot.val())[0]; // Get the user key
        const user = snapshot.val()[userKey];

        if (1 == 1) {
          // Update the specific announcement object
          user["announcements"][classPeroid][index] = newData;

          // Save the updated user data back to the database
          usersRef
            .child(userKey)
            .update({ announcements: user.announcements })
            .then(() => {
              console.log(`Updated announcement for user ${usernamez}`);

              // Trigger the callback to handle the updated data

            })
            .catch((error) => {
              console.error(`Error updating announcement for user ${usernamez}:`, error);
            });
        } else {
          console.error(`Invalid classPeroid or index.`);
        }
      } else {
        console.error(`User ${usernamez} not found.`);
      }
    })
    .catch((error) => {
      console.error(`Error fetching user data for ${usernamez}:`, error);
    });
}

function generateElaStructure() {
  const elaStructure = {
    ela: {}
  };

  const elaAnnouncements = [
    {
      days: {
        description: "ELA Test on the Linus Torvalds Book, Just For Fun!",
        title: "ELA Test!"
      }
    },
    {
      days: {
        description: "ELA Assignment on Shakespeare's Sonnets.",
        title: "ELA Assignment"
      }
    }
  ];

  elaAnnouncements.forEach((announcement, index) => {
    elaStructure.ela[index] = announcement;
  });

  return elaStructure;
}

const elaObject = generateElaStructure();
function updateElaStructure(username, newIndex, newElaData) {
  const database = firebase.database();
  const usersRef = database.ref('users');

  // First, fetch the user data based on the username
  usersRef
    .orderByChild('username')
    .equalTo(username)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists()) {
        const userKey = Object.keys(snapshot.val())[0]; // Get the user key
        const user = snapshot.val()[userKey];

        // Check if the 'ela' object exists for the user
        if (user.hasOwnProperty('ela') && Array.isArray(user['ela'])) {
          const elaArray = user['ela'];

          // Check if the index is within bounds
          if (newIndex >= 0 && newIndex < elaArray.length) {
            // Update the specific 'ela' data at the given index
            elaArray[newIndex] = newElaData;
          } else {
            console.error(`Invalid index.`);
            return;
          }
        } else {
          console.error(`'ela' object is not in the expected format.`);
          return;
        }

        // Save the updated user data back to the database
        usersRef
          .child(userKey)
          .update(user)
          .then(() => {
            console.log(`Updated ELA structure for user ${username}`);
          })
          .catch((error) => {
            console.error(`Error updating ELA structure for user ${username}:`, error);
          });
      } else {
        console.error(`User ${username} not found.`);
      }
    })
    .catch((error) => {
      console.error(`Error fetching user data for ${username}:`, error);
    });
}

// Example usage:
// Assuming you have the newElaData ready, call the function like this:
// updateElaStructure('user2', 0, newElaData); // Update the first element in the 'ela' array

// Example usage:
// Assuming you have the newElaStructure ready, call the function like this:
// updateElaStructure('user2', newElaStructure);


// Example usage:
// Assuming you have the newElaStructure ready, call the function like this:
// updateElaStructure('user2', newElaStructure);
//updateElaStructure('user2', elaObject)












function addAnnouncementsToUser(username, newAnnouncements) {
    const database = firebase.database();
    const usersRef = database.ref('users');

    // First, fetch the user data based on the username
    usersRef
      .orderByChild('username')
      .equalTo(username)
      .once('value')
      .then((snapshot) => {
        // Check if the user exists
        if (snapshot.exists()) {
          const userKey = Object.keys(snapshot.val())[0]; // Get the user key
          const user = snapshot.val()[userKey];

          // Update the announcements array
          if (!user.announcements) {
            user.announcements = []; // Create an array if it doesn't exist
          }

          // Add the new announcements to the user's array
          user.announcements.push(...newAnnouncements);

          // Save the updated user data back to the database
          usersRef
            .child(userKey)
            .update({ announcements: user.announcements })
            .then(() => {
              console.log(`Added new announcements to user ${username}`);
            })
            .catch((error) => {
              console.error(`Error adding announcements to user ${username}:`, error);
            });
        } else {
          console.error(`User ${username} not found.`);
        }
      })
      .catch((error) => {
        console.error(`Error fetching user data for ${username}:`, error);
      });
  }

$(document).ready(function () {
    let testElements = {
        ela1: "#mga-ela-1",
        ela2: "#mga-ela-2",
        ss1: "#mga-ss-1",
        ss2: "#mga-ss-2",
        sci1: "#mga-sci-1",
        sci2: "#mga-sci-2",
        math1: "#mga-math-1",
        math2: "#mga-math-2"
    }
    $("#mga-title").text(`Today is ${getDay()}!`)

    fetchUserData((...Rawuserdata)=>{
        let userinfo = Rawuserdata[0];
        let userdata = userinfo["announcements"];

        let isTeacher = userinfo["isTeacher"];
        let ela = userdata["ELA"];
        let ss = userdata["SS"];
        let sci = userdata["Science"];
        let math = userdata["Math"]
        if(isTeacher == true){
          localStorage.setItem('font-t','true')
            ela.forEach(agendaObject => {
                let c;

                let objId = genRandonString(6)
                let objE = `.mga-${objId}`
                window.ela1T = objE;
                $(`${testElements["ela1"]}`).append(`<h1 class="mga-${objId}" width="1072px" height="81px" style="background-color: red; color: white; cursor: pointer; border-radius: 7px">${agendaObject["title"]}</h1>`);
                $(objE).click(()=>{
                    let editted = {
                        title: agendaObject["title"],
                        description: agendaObject["description"]
                    }
                    Swal.fire({
                        icon: 'warning',
                        title: agendaObject["title"],
                       // text: agendaObject["description"],
                        html: `
                        <input type="text" value="${agendaObject["title"]}" class="ext" onkeyup="$('.swal2-title').text(this.value); $(window.ela1T).text(this.value); window.elaTE1I(this.value);">
                        <br>
                        <textarea onkeyup="window.elaTE1T(this.value);">${agendaObject["description"]}</textarea>`
                    }).then(()=>{
                      console.log(editted)
                      updateThing('user3', {
                        days: [
                          "8/6/2023"
                        ],
                        title: editted["title"],
                        description: editted["description"],

                      }, "ELA", 0)

                      updateThing('user3', {
                        days: [
                          "8/6/2023"
                        ],
                        title: editted["title"],
                        description: editted["description"],

                      }, "ELA", 0)


                    })
                    window.elaTE1I = (editval)=>{
                        editted['title'] = editval;
                        $(objE).text(editval);
                    };
                    window.elaTE1T = (editval)=>{
                        editted['description'] = editval;

                    };


                })
            });
            ss.forEach(agendaObject => {
                let objId = genRandonString(6)
                let objE = `.mga-${objId}`
                $(`${testElements["ss1"]}`).append(`<h1 class="mga-${objId}" width="1072px" height="81px" style="background-color: red; color: white; cursor: pointer; border-radius: 7px">${agendaObject["title"]}</h1>`);
                $(objE).click(()=>{
                    Swal.fire({
                        icon: 'warning',
                        title: agendaObject["title"],
                        text: agendaObject["description"]
                    })
                })
            });
            sci.forEach(agendaObject => {
                let objId = genRandonString(6)
                let objE = `.mga-${objId}`
                $(`${testElements["sci1"]}`).append(`<h1 class="mga-${objId}" width="1072px" height="81px" style="background-color: red; color: white; cursor: pointer; border-radius: 7px">${agendaObject["title"]}</h1>`);
                $(objE).click(()=>{
                    Swal.fire({
                        icon: 'warning',
                        title: agendaObject["title"],
                        text: agendaObject["description"]
                    })
                })
            });
            math.forEach(agendaObject => {
                let objId = genRandonString(6)
                let objE = `.mga-${objId}`
                $(`${testElements["math1"]}`).append(`<h1 class="mga-${objId}" width="1072px" height="81px" style="background-color: red; color: white; cursor: pointer; border-radius: 7px">${agendaObject["title"]}</h1>`);
                $(objE).click(()=>{
                    Swal.fire({
                        icon: 'warning',
                        title: agendaObject["title"],
                        text: agendaObject["description"]
                    })
                })
            });
            $('.mga-btn-sg').click(()=>{
                localStorage.removeItem('font');
                document.location.href = '/';
            })
        }else{
            document.location.href = "/app"
        }


    })
});
