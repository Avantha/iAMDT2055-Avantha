
const $form = $(".inputs-container");
const $resultModelDom = $("#result-model");
const $resultModel = new bootstrap.Modal($resultModelDom.get(0));

$form.on('submit', function (event) {

    event.preventDefault();
    event.stopPropagation();


    $(this).addClass('was-validated');

    if (this.checkValidity()) {
        $resultModel.show()
    }
});


$resultModelDom.on('show.bs.modal', function (event) {
    $form.find("input[type=text], input[type=email], input[type=tel], textarea").each(function (i, input) {
        input = $(input);
        $(`#${input.attr("id")}-show`).val(input.val())
    });
    $form.find("input[type=checkbox]").each(function (i, input) {
        input = $(input);
        $(`#${input.attr("id")}-show`).prop("checked", input.prop("checked"))
    });

    $resultModelDom.find("input[type=radio]").prop("checked", false);
    $form.find("input[type=radio]").each(function (i, input) {
        input = $(input);

        if (!input.prop("checked")) return;
        $(`input[name=${input.attr("name")}_show][value=${input.val()}]`).prop("checked", true);
    });

    $form.find("select").each(function (i, input) {
        input = $(input);
        $(`#${input.attr("id")}-show`).val(input.val());
    });
});