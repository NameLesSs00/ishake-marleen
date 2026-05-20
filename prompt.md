rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // This rule allows anyone with your Firestore database reference to view, edit,
    // and delete all data in your Firestore database. It is useful for getting
    // started, but it is configured to expire after 30 days because it
    // leaves your app open to attackers. At that time, all client
    // requests to your Firestore database will be denied.
    //
    // Make sure to write security rules for your app before that time, or else
    // all client requests to your Firestore database will be denied until you Update
    // your rules
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2090, 6, 19);
    }
  }
}
https://www.google.com/maps/place/%D9%83%D9%86%D9%8A%D8%B3%D8%A9+%D8%A7%D9%84%D8%A3%D9%86%D8%A8%D8%A7+%D8%B4%D9%86%D9%88%D8%AF%D8%A9+%D8%B1%D8%A6%D9%8A%D8%B3+%D8%A7%D9%84%D9%85%D8%AA%D9%88%D8%AD%D8%AF%D9%8A%D9%86+%D8%A8%D8%A7%D9%84%D8%BA%D8%B1%D8%AF%D9%82%D8%A9%E2%80%AD/data=!4m2!3m1!1s0x0:0x3665797d8d0c2bf2?sa=X&ved=1t:2428&ictx=111
كنيسة الانباشنودة الدهار
30/5/2026
الاكليل الساعة 9