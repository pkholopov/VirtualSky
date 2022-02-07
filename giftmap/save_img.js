function saveImg () {
    domtoimage.toJpeg(document.getElementById('content'), { quality: 1 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'star_map.jpeg';
            link.href = dataUrl;
            link.click();
        });
}
