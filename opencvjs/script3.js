

function onOpenCvReady() {

    cv.onRuntimeInitialized = function () {


        // Load images
        const img1 = cv.imread('img1');
        const img2 = cv.imread('img2');

        // Convert to grayscale
        cv.cvtColor(img1, img1, cv.COLOR_RGBA2GRAY);
        cv.cvtColor(img2, img2, cv.COLOR_RGBA2GRAY);

        // Apply threshold
        cv.threshold(img1, img1, 0, 255, cv.THRESH_BINARY | cv.THRESH_OTSU);
        cv.threshold(img2, img2, 0, 255, cv.THRESH_BINARY | cv.THRESH_OTSU);

        // Invert black and white
        cv.bitwise_not(img1, img1);
        cv.bitwise_not(img2, img2);

        // Find contours and store coordinates of white dots in an array
        let dots = [];
        let contours1 = new cv.MatVector();
        let hierarchy1 = new cv.Mat();
        cv.findContours(img1, contours1, hierarchy1, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
        for (let i = 0; i < contours1.size(); i++) {
            let cnt = contours1.get(i);
            let moments = cv.moments(cnt, false);
            let cx = moments.m10 / moments.m00;
            let cy = moments.m01 / moments.m00;
            dots.push({ x: cx, y: cy });
        }

        let contours2 = new cv.MatVector();
        let hierarchy2 = new cv.Mat();
        cv.findContours(img2, contours2, hierarchy2, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
        for (let i = 0; i < contours2.size(); i++) {
            let cnt = contours2.get(i);
            let moments = cv.moments(cnt, false);
            let cx = moments.m10 / moments.m00;
            let cy = moments.m01 / moments.m00;
            dots.push({ x: cx, y: cy });
        }
        console.log(dots)
    };
    // Write dots to a JSON file
    // const fs = require('fs');
    // fs.writeFileSync('dots.json', JSON.stringify(dots));
}