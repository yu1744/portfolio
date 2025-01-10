// ■■■ オープニングアニメーション ■■■
document.addEventListener("DOMContentLoaded", () => {
	const text = "Welcome to My Portfolio";
	const typedTextElement = document.getElementById("typed-text");
	const gridContainer = document.getElementById("grid");
	const openingContainer = document.getElementById("opening-container");
	const mainContent = document.getElementById("main-content");

	let currentIndex = 0;

	// グリッドアイテムを作成
	for (let row = 0; row < 15; row++) {
		for (let col = 0; col < 20; col++) {
			const gridItem = document.createElement("div");
			gridItem.className = "grid-item";
			gridItem.dataset.row = row;
			gridItem.dataset.col = col;
			gridContainer.appendChild(gridItem);
		}
	}

	// タイプライターエフェクト
	function typeText() {
		if (currentIndex < text.length) {
			typedTextElement.textContent += text[currentIndex];
			currentIndex++;
			setTimeout(typeText, 100);
		} else {
			// 文字表示が終わったらブロックアニメーションを開始
			setTimeout(startGridAnimation, 1000);
		}
	}

	// グリッド（ブロック）アニメーション
	function startGridAnimation() {
		const items = document.querySelectorAll(".grid-item");
		items.forEach((item) => {
			const row = parseInt(item.dataset.row);
			const col = parseInt(item.dataset.col);
			// 上から下(行数の大きいほうを遅らせる) + 横(列)を組み合わせる
			// 例: (15 - row + col) * 50
			const delay = (15 - row + col) * 50;

			setTimeout(() => {
				item.classList.add("animate");
			}, delay);
		});

		// ブロックアニメーションが完了した後でオープニング画面を消してメイン表示
		// 最大の遅延を考慮して少し余裕をみる(15 + 19) * 50 = 1700 ぐらい + α
		setTimeout(() => {
			openingContainer.style.display = "none";
			mainContent.style.display = "block";
		}, 3000);
	}

	// アニメーション開始
	setTimeout(typeText, 500);
});

// ■■■ メインページ スクロールでフェードイン ■■■
window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("DOMContentLoaded", fadeInOnScroll);

function fadeInOnScroll() {
	const fadeInTargets = document.querySelectorAll(
		".section-title, .about-container, .career-container, .skill-list, .carousel-item, .qualifications ul, .contact-form"
	);
	const windowHeight = window.innerHeight;
	fadeInTargets.forEach((target) => {
		const rect = target.getBoundingClientRect();
		const offset = 100;
		if (rect.top < windowHeight - offset) {
			target.classList.add("visible");
		}
	});
}

// ナビゲーションリンクのスムーズスクロール
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute("href"));
		const headerHeight = document.querySelector(".header").offsetHeight;
		const targetPosition =
			target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

		window.scrollTo({
			top: targetPosition,
			behavior: "smooth",
		});
	});
});

// 「私について」ボタンのスライドアニメーション
const heroButton = document.querySelector(".hero-button");
heroButton.addEventListener("click", function (e) {
	e.preventDefault();
	const targetId = this.getAttribute("href");
	const target = document.querySelector(targetId);
	const headerHeight = document.querySelector(".header").offsetHeight;
	const targetPosition =
		target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

	this.classList.add("sliding");

	window.scrollTo({
		top: targetPosition,
		behavior: "smooth",
	});
});

// ■■■ Worksカルーセル ■■■
const carousel = document.querySelector(".carousel");
const carouselItems = document.querySelectorAll(".carousel-item");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");
const indicators = document.querySelectorAll(".indicator");
let currentIndex = 0;
const totalItems = carouselItems.length;

function goToSlide(index) {
	carouselItems.forEach((item, i) => {
		item.classList.toggle("active", i === index);
	});
	indicators.forEach((indicator, i) => {
		indicator.classList.toggle("active", i === index);
	});
	currentIndex = index;
}

nextButton.addEventListener("click", () => {
	let index = currentIndex + 1;
	if (index >= totalItems) index = 0;
	goToSlide(index);
	resetAutoSlide();
});

prevButton.addEventListener("click", () => {
	let index = currentIndex - 1;
	if (index < 0) index = totalItems - 1;
	goToSlide(index);
	resetAutoSlide();
});

indicators.forEach((indicator, index) => {
	indicator.addEventListener("click", () => {
		goToSlide(index);
		resetAutoSlide();
	});
});

let autoSlide = setInterval(() => {
	let index = currentIndex + 1;
	if (index >= totalItems) index = 0;
	goToSlide(index);
}, 5000);

function resetAutoSlide() {
	clearInterval(autoSlide);
	autoSlide = setInterval(() => {
		let index = currentIndex + 1;
		if (index >= totalItems) index = 0;
		goToSlide(index);
	}, 5000);
}

// ■■■ Worksモーダル ■■■
const modal = document.getElementById("work-modal");
const closeButton = modal.querySelector(".close-button");
const workLinks = document.querySelectorAll(".work-link");
workLinks.forEach((link) => {
	link.addEventListener("click", () => {
		const workIndex = parseInt(link.getAttribute("data-work"));
		openModal(workIndex);
	});
});

function openModal(index) {
	modal.style.display = "block";
	showModalSlide(index);
	resetModalAutoSlide();
}

closeButton.addEventListener("click", closeModal);

function closeModal() {
	modal.style.display = "none";
	clearModalAutoSlide();
}

window.addEventListener("click", (e) => {
	if (e.target === modal) {
		closeModal();
	}
});

// ■■■ モーダル内カルーセル ■■■
const modalCarousel = modal.querySelector(".modal-carousel");
const modalCarouselItems = modal.querySelectorAll(".modal-carousel-item");
const modalPrevButton = modal.querySelector(".modal-carousel-button.prev");
const modalNextButton = modal.querySelector(".modal-carousel-button.next");
const modalIndicators = modal.querySelectorAll(".modal-indicator");
let modalCurrentIndex = 0;
const modalTotalItems = modalCarouselItems.length;
let modalAutoSlide;

function showModalSlide(index) {
	modalCarouselItems.forEach((item, i) => {
		item.classList.toggle("active", i === index);
	});
	modalIndicators.forEach((indicator, i) => {
		indicator.classList.toggle("active", i === index);
	});
	modalCurrentIndex = index;
}

modalPrevButton.addEventListener("click", () => {
	let index = modalCurrentIndex - 1;
	if (index < 0) index = modalTotalItems - 1;
	showModalSlide(index);
	resetModalAutoSlide();
});

modalNextButton.addEventListener("click", () => {
	let index = modalCurrentIndex + 1;
	if (index >= modalTotalItems) index = 0;
	showModalSlide(index);
	resetModalAutoSlide();
});

modalIndicators.forEach((indicator, i) => {
	indicator.addEventListener("click", () => {
		showModalSlide(i);
		resetModalAutoSlide();
	});
});

function resetModalAutoSlide() {
	clearModalAutoSlide();
	modalAutoSlide = setInterval(() => {
		let index = modalCurrentIndex + 1;
		if (index >= modalTotalItems) index = 0;
		showModalSlide(index);
	}, 5000);
}

function clearModalAutoSlide() {
	clearInterval(modalAutoSlide);
}

// ■■■ Contactフォーム送信処理 サンプル ■■■
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const nameValue = document.getElementById("name").value.trim();
	const emailValue = document.getElementById("email").value.trim();
	const messageValue = document.getElementById("message").value.trim();

	if (!nameValue || !emailValue || !messageValue) {
		alert("全てのフィールドを入力してください");
		return;
	}
	alert(`ありがとうございます、${nameValue}さん！メッセージを受け取りました。`);
	contactForm.reset();
});
