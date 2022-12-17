const express = require('express');
const FCM = require('fcm-node');
const serverKey = 'AAAAGNHfyLc:APA91bHBowVO8OT7IvDmT25GNktYSKC6BGWloTDkSQtm0i1KKTZawy58zwSiEUYyDnTKhOVAurJwrt1uBbprSaPT5Gm72y9NVfWrE-i3Uxbe3T_yo8eGr4felxMSZdxo-o7wrbV3yOdx';

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/fcm', async (req, res, next) => {
    try {
        const { topic, title, body } = req.body;
        const fcm = new FCM(serverKey);

        const message = {
            to: '/topics/' + topic,
            notification: {
                title,
                body,
                sound: 'default'
            }
        };

        fcm.send(message, (err, response) => {
            if (err) {
                console.log('Something has gone wrong!');
            } else {
                console.log("response: ", response);
                res.status(200).send(response);
            }
        });

    } catch (error) {
        next(error);
    }
});
