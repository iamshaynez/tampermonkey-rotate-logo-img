// ==UserScript==
// @name         Rotate Logo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Rotate the first logo image when pressing keys
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let logoImage;
    const keySequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Key codes for Up, Down, Left, Right, B, A
    let keySequenceIndex = 0;

    function findLogoImage() {
        const images = document.getElementsByTagName('img');
        for (let img of images) {
            if (img.src.toLowerCase().includes('logo')) {
                
                return img;
            }
        }
        return null;
    }

    function rotateImage(image) {
        image.style.transition = 'transform 1s';
        image.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            image.style.transform = 'rotate(0deg)';
        }, 1000);
    }

    function checkKeySequence(e) {
        if (e.keyCode === keySequence[keySequenceIndex]) {
            keySequenceIndex++;
            if (keySequenceIndex === keySequence.length) {
                keySequenceIndex = 0;
                if (logoImage) {
                    rotateImage(logoImage);
                } else {
                    logoImage = findLogoImage();
                    if (logoImage) {
                        rotateImage(logoImage);
                    }
                }
            }
        } else {
            keySequenceIndex = 0;
        }
    }

    document.addEventListener('keydown', checkKeySequence, false);
})();