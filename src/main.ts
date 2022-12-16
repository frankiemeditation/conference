/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.area.onEnter('zonePopup').subscribe(() => {
        currentPopup = WA.ui.openPopup("popupArrivee","Bienvenue dans le monde de frankie meditation, ici vous pourrez en apprendre plus sur la méditation grâce à de courtes vidéos !", []);
    })

    WA.room.area.onLeave('zonePopup').subscribe(closePopUp)

    WA.room.area.onEnter('doorCode').subscribe(() => {
        currentPopup = WA.ui.openPopup("doorCodePopup","Regardez la vidéo sur le grand écran pour récupérer le code.", []);
    })

    WA.room.area.onLeave('doorCode').subscribe(closePopUp)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
