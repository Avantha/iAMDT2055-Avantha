const $pictures = $(".gallery .picture");
const $pictureViewerModelDOM = $("#picture-viewer");
let $pictureViewerModel = new bootstrap.Modal($pictureViewerModelDOM.get(0));


$pictures.on("click", function () {
    let $picture = $(this);
    let src = $picture.find("img").attr("src");

    $pictureViewerModelDOM.find(".modal-body img")
        .attr("src", src);
    $pictureViewerModel.show()
});
