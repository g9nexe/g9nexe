$(document).ready(() =>
{
	$("div.menu").load("menu.html", () => $("[main-page]").click());
});

$(document).on("click", ".menu-item", function() {
	let contentFileProp = $(this).data("content-file");
	let contentFileName = "page-content/" + contentFileProp + ".html";
	let title = $(this).text();
	$(".page-content").load(contentFileName, () => {
		$(".page-title").text(title);

		if ([ "gallery", "about" ].includes(contentFileProp)) {
			prepareGallery();
		}
	});
});

window.addEventListener("resize", () => {
	// debounce
	clearTimeout(window._ghostTimer);
	window._ghostTimer = setTimeout(updateGhosts, 150);
});

function prepareGallery() {
	updateGhosts();

	$(".gallery-item").on("click", function () {
		const src = $(this).attr("src");
		$("#lightbox-image").attr("src", src);
		$("#lightbox").css("display", "flex");
	});

	$("#lightbox").on("click", function () {
		$("#lightbox").css("display", "none");
		$("#lightbox-image").attr("src", "");
	});

	$(document).on("keydown", function (e) {
		if (e.key === "Escape") {
			$("#lightbox").css("display", "none");
			$("#lightbox-image").attr("src", "");
		}
	});
}

function updateGhosts() {
	const grid = document.getElementById("gallery-grid");

	if (!grid) {
		return; // we are not on the gallery page, or it's not loaded yet
	}

	const items = Array.from(grid.querySelectorAll(".gallery-item"));
	const ghosts = Array.from(grid.querySelectorAll(".gallery-ghost"));

	ghosts.forEach(g => g.remove());

	if (items.length === 0) return;

	const containerWidth = grid.clientWidth;
	const itemWidth = items[0].clientWidth;

	if (itemWidth === 0) {
		return;
	}

	const maxPerRow = Math.floor(containerWidth / itemWidth);
	if (maxPerRow <= 1) {
		return;
	}

	const remainder = items.length % maxPerRow;
	if (remainder === 0) {
		return;
	}

	const ghostCount = maxPerRow - remainder;

	for (let i = 0; i < ghostCount; i++) {
		const ghost = document.createElement("div");
		ghost.classList.add("gallery-ghost");
		grid.appendChild(ghost);
	}
}