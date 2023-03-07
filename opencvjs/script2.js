function onOpenCvReady() {
    document.getElementById('status').innerHTML = 'OpenCV.js is ready.';
}

function onFileSelected() {
    var inputElement = document.getElementById("fileInput");
    var file = inputElement.files[0];
    var reader = new FileReader();
    reader.onload = function () {
        var dataUrl = reader.result;
        var img = document.createElement('img');
        img.onload = function () {
            var src = cv.imread(img);
            var dst = new cv.Mat();
            cv.threshold(src, dst, 128, 255, cv.THRESH_BINARY);
            cv.bitwise_not(dst, dst);
            cv.imshow('canvasOutput', dst);
            var contours = new cv.MatVector();
            var hierarchy = new cv.Mat();
            cv.findContours(dst, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);
            var points = [];
            for (var i = 0; i < contours.size(); ++i) {
                var color = new cv.Scalar(Math.round(Math.random() * 255), Math.round(Math.random() * 255), Math.round(Math.random() * 255));
                cv.drawContours(dst, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
                var cnt = contours.get(i);
                var moments = cv.moments(cnt, false);
                var x = Math.round(moments.m10 / moments.m00);
                var y = Math.round(moments.m01 / moments.m00);
                points.push({ x: x, y: y });
            }
            console.log(points);
            cv.imshow('canvasOutput', dst);
            src.delete(); dst.delete(); contours.delete(); hierarchy.delete();
        };
        img.src = dataUrl;
    };
    reader.readAsDataURL(file);
}