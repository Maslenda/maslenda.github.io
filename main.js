
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
  $(document).ready(function (){
    if(!localStorage.getItem('font')){
      //Were good
    }else{
      if(!localStorage.getItem('font-t')){
        document.location.href = "/app";
      }else{
        document.location.href = '/app/teach';
      }

    }


  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get('username');
  const password = urlParams.get('password');
  if(username == undefined || password == undefined || username == "" || password == ""){
    if(localStorage.getItem('font') != null){
      if(localStorage.getItem('font-t')){
        document.location.href = `/app/teach`;
      }else{
        document.location.href = `/app`;
      }

    }else{
      document.location.href = `/web`;
    }


  }else{
    //Nothing
  }

  firebase.auth()
    .signInWithEmailAndPassword(`${username}@magenda.com`, password)
    .then((userCredential) => {
      // Login successful. You can redirect to a new page or show a success message.
      console.log("Login successful", userCredential);
    //  document.location.href = `/app/?token=${btoa(Date.now()+userCredential)}q={"query":"Login","Credential": "${btoa(`Not today >:) ${Date.now()}`)}"}&font=${btoa(username)}|${btoa(password)}`
      if(!localStorage.getItem('font')){
        localStorage.setItem('font',`${btoa(username)}|${btoa(password)}`);
        document.location.href = '/app'
      }else{
        //Set it anyway
        let c;
        localStorage.setItem('font',`${btoa(username)}|${btoa(password)}`);
        document.location.href = '/app'
      }
    })
    .catch((error) => {
      // Handle login errors here (e.g., incorrect username/password).

      //console.log(error)
      document.location.href = "/web/?q=1";
    });
});

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



// Define the `addUsers` function to add users with custom claims
window.addUser = (userData) => {
  const auth = firebase.auth();
  const database = firebase.database();

    const { username, password, isTeacher } = userData;

    auth
      .createUserWithEmailAndPassword(`${username}@magenda.com`, password)
      .then((userCredential) => {
        const newUser = userCredential.user;
        const uid = newUser.uid;

        const newUserData = {
          username: `${username}`,
          isTeacher: isTeacher,
          announcements: [
            {
              "title": "ELA Test!",
              "subject": "ELA",
              "dayDue": "08::12::23",
              "description": "ELA Test on the Linus Torvalds Book, Just For Fun!",
              "image": null,
            }
          ]
        };

        // Store the user-specific data in the Firebase Realtime Database
        database.ref(`users/${uid}`).set(newUserData)
          .then(() => {
            console.log(`User ${username} added successfully.`);
          })
          .catch((error) => {
            console.error(`Error adding user data for ${username}:`, error);
          });
      })
      .catch((error) => {
        console.error(`Error adding user ${username}:`, error.message);
      });
}
window.addUsers = (userData) => {
  const auth = firebase.auth();
  const database = firebase.database();

  userData.users.forEach((user) => {
    const { username, password, isTeacher } = user;

    auth
      .createUserWithEmailAndPassword(`${username}@magenda.com`, password)
      .then((userCredential) => {
        const newUser = userCredential.user;
        const uid = newUser.uid;

        const newUserData = {
          username: `${username}`,
          isTeacher: isTeacher,
          announcements: {
            ELA: [
             {
              "title": "ELA Test!",
              days: [
                "8/4/2023"
              ],
              "description": "ELA Test on the Linus Torvalds Book, Just For Fun!",
              "image": null,
             }
            ],
            SS: [
              {
                "title": "SS Test",
                days: [
                  "8/4/2023"
                ],
                "description": "Soviet Union Test TODAY!!!",
                "image": null,
              }
            ],
            Science: [
              {
                "title": "Lab Safety Test!",
                days: [
                  "8/4/2023"
                ],
                "description": "Lab Safety Test TODAY!!!",
                "image": null,
              }
            ],
            Math: [
              {
                "title": "Additive Inverse Test",
                days: [
                  "8/4/2023"
                ],
                "description": "Additive Inverse Test TODAY!!!",
                "image": null,
              }
            ]

          }
        };

        // Store the user-specific data in the Firebase Realtime Database
        database.ref(`users/${uid}`).set(newUserData)
          .then(() => {
            console.log(`User ${username} added successfully.`);
          })
          .catch((error) => {
            console.error(`Error adding user data for ${username}:`, error);
          });
      })
      .catch((error) => {
        console.error(`Error adding user ${username}:`, error.message);
      });
  });
}


// Use $.ajax to fetch the JSON file
window.finishUsers = () => {
  $.ajax({
    url: "users.json",
    dataType: "json",
    success: function (data) {
      window.addUsers(data);
    },
    error: function (xhr, status, error) {
      console.error("Error fetching JSON file:", error);
    },
  });
};
finishUsers();
