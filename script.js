$(document).ready(() =>
{
	$("div.menu").load("menu.html", () => $("[main-page]").click());
});

$(document).on("click", ".menu-item", function() {
	let contentFileName = "page-content/" + $(this).data("content-file") + ".html";
	$(".page-content").load(contentFileName);
});