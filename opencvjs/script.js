let images = [];

function onOpenCvReady() {

    document.getElementById('input').addEventListener('change', function () {
        images = [];
        for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i];
            if (!file.type.match('image.*')) continue;
            const reader = new FileReader();
            reader.onload = function (event) {
                const imgElement = document.createElement('img');
                imgElement.src = event.target.result;
                images.push(imgElement);
            };
            reader.readAsDataURL(file);
        }
    }, false);
}

let jsondata = [];

function processImages() {

    const data = {};
    const promises = [];
    
    for (let i = 0; i < images.length; i++) {
        promises.push(new Promise(resolve => {
            const imgElement = images[i];

            let img = [];
            
            // Load the image and convert it to grayscale
            const src = cv.imread(imgElement);
            const gray = new cv.Mat();
            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

            // Apply a binary threshold to the image
            const thresholded = new cv.Mat();
            cv.threshold(gray, thresholded, 0, 255, cv.THRESH_BINARY | cv.THRESH_OTSU);

            // Invert the black and white pixels
            const inverted = new cv.Mat();
            cv.bitwise_not(thresholded, inverted);

            // Find and count the white blobs in the image
            const contours = new cv.MatVector();
            const hierarchy = new cv.Mat();
            cv.findContours(inverted, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);
            const numBlobs = contours.size();

            // Store the coordinates of the centroids of the white blobs in an array
            const centroids = [];

            for (let j = 0; j < numBlobs; j++) {
                const moments = cv.moments(contours.get(j));
                const cx = moments.m10 / moments.m00;
                const cy = moments.m01 / moments.m00;
                let pair = [cx / 2, cy / 2];
                if(cx && cy){
                    img.push(pair);
                    centroids.push({ x: cx, y: cy });
                }
            }

            jsondata.push(img)

            // Store the coordinates of the centroids in the output object
            data[`image${i}`] = centroids;
            
            // Clean up
            src.delete();
            gray.delete();
            thresholded.delete();
            inverted.delete();
            contours.delete();
            hierarchy.delete();

            resolve();
        }));
    }

    // console.log(data)
    // Wait for all promises to resolve before writing the output to a file
    Promise.all(promises).then((e) => {
        console.log(e)
        const output = document.getElementById('output');
        // output.innerHTML = `Found ${JSON.stringify(data)} white blobs in ${images.length}`
        output.innerHTML = `Found ${JSON.stringify(jsondata)} white blobs in ${images.length}`
    })

}