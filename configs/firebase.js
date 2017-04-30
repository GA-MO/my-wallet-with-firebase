import * as firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyAveXzo7LlibpLqSmLLXdmNxyXVe9dd3uQ',
  authDomain: 'my-money-ef70a.firebaseapp.com',
  databaseURL: 'https://my-money-ef70a.firebaseio.com',
  projectId: 'my-money-ef70a',
  storageBucket: 'my-money-ef70a.appspot.com',
  messagingSenderId: '430794967324',
};

firebase.initializeApp(config);

export default firebase
