import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();


export const check_barcode = functions.https.onRequest((request, response) => {

    const barcode = request.query.barcode
    admin.firestore().doc(`lotSerial/${barcode}`).get()
        .then(snapshot => {

            const data = snapshot.data();
            if (data) {                
                return true;               
            } else {
                return false; 
            }
        })
        .catch(error => {
            response.status(500).send(error)
        })
});