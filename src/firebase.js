import firebase from 'firebase';
// Add the Firebase services that you want to use
const firebaseConfig = {
  apiKey: 'AIzaSyDYx2dH97Z0PA_gKT680FwpJdpr-ApoL_o',
  authDomain: 'react-todo-list-ad0dd.firebaseapp.com',
  projectId: 'react-todo-list-ad0dd',
  storageBucket: 'react-todo-list-ad0dd.appspot.com',
  messagingSenderId: '613620673036',
  appId: '1:613620673036:web:0f3b15b08dbf2a3af85c29',
  measurementId: 'G-FNMY841D4M',
};

const defaultProject = firebase.initializeApp(firebaseConfig);

export default defaultProject;
