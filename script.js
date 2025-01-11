/******************************************************
 * script.js
 * ポートフォリオサイト用の JavaScript メインファイル
 *
 * 【主な機能】
 * 1. オープニングアニメーション（タイプライター＆ブロックアニメ）
 * 2. セクションタイトルへのタイプライター演出
 * 3. フェードインアニメーション（スクロール連動）
 * 4. ナビゲーションリンク＆「私について」ボタンスムーズスクロール
 * 5. Worksセクションのカルーセル
 * 6. モーダル表示＆モーダル内カルーセル
 * 7. Contactフォームでの簡易バリデーション＆送信動作
 ******************************************************/

//------------------------------------------------------
// 1. オープニングアニメーション
//------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
	const openingText = document.getElementById("opening-text");
	const gridContainer = document.getElementById("grid");
	const openingContainer = document.getElementById("opening-container");
	const mainContent = document.getElementById("main-content");

	// オープニングで表示するテキスト
	const text = "Welcome to My Portfolio...";
	let index = 0;

	// グリッドブロックの行・列数
	const rows = 15;
	const cols = 20;

	// -----------------------------------
	// グリッドブロックを生成
	// -----------------------------------
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const block = document.createElement("div");
			block.className = "grid-item";
			gridContainer.appendChild(block);
		}
	}

	// -----------------------------------
	// タイプライター演出
	// -----------------------------------
	function typeWriter() {
		if (index < text.length) {
			openingText.textContent += text[index];
			index++;
			setTimeout(typeWriter, 100); // 適度な速度で1文字ずつ表示
		} else {
			// テキスト書き終え後、ブロックアニメーションへ
			setTimeout(startBlockAnimation, 800);
		}
	}

	// -----------------------------------
	// ブロック(グリッド)アニメーション
	// -----------------------------------
	function startBlockAnimation() {
		const blocks = document.querySelectorAll(".grid-item");
		blocks.forEach((block, i) => {
			// 適度なディレイを付けながらクラスを付与
			setTimeout(() => {
				block.classList.add("animate");
			}, i * 40);
		});

		// アニメーション終了後にメインページを表示
		setTimeout(() => {
			openingContainer.style.display = "none";
			mainContent.style.opacity = 1; // フェードイン
		}, 2500);
	}

	// まずタイプライターアニメーション開始
	typeWriter();
});

//------------------------------------------------------
// 2. セクションタイトルへのタイプライター演出
//------------------------------------------------------
function applyTypewriterToHeadings() {
	const headings = document.querySelectorAll(".typewriter-title");
	headings.forEach((heading) => {
		const originalText = heading.getAttribute("data-title");
		heading.textContent = "";
		let charIndex = 0;

		// 文字を徐々に表示していく再帰関数
		function typeChar() {
			if (charIndex < originalText.length) {
				heading.textContent += originalText[charIndex];
				charIndex++;
				setTimeout(typeChar, 80);
			}
		}
		typeChar();
	});
}

// DOMが読み込まれたらタイトルへのタイプライターを適用
window.addEventListener("DOMContentLoaded", applyTypewriterToHeadings);

//------------------------------------------------------
// 3. フェードインアニメーション（スクロール連動）
//------------------------------------------------------
function fadeInOnScroll() {
	const fadeTargets = document.querySelectorAll(
		".section-title," + // 見出し
			".about-container," +
			".career-container," +
			".skill-list," +
			".carousel-item," +
			".qualifications ul," +
			".contact-form"
	);
	const windowHeight = window.innerHeight;
	const offset = 100; // 画面下からの余裕

	fadeTargets.forEach((target) => {
		const rect = target.getBoundingClientRect();
		if (rect.top < windowHeight - offset) {
			target.classList.add("visible");
		}
	});
}

window.addEventListener("DOMContentLoaded", fadeInOnScroll);
window.addEventListener("scroll", fadeInOnScroll);

//------------------------------------------------------
// 4. ナビゲーションリンク＆「私について」ボタンのスムーズスクロール
//------------------------------------------------------
//  ここではCSS側 (scroll-behavior: smooth;) を利用。
//  追加で制御が必要な場合、この辺りに記述してもOK。

//------------------------------------------------------
// 5. Worksセクションのカルーセル
//------------------------------------------------------
const carousel = document.querySelector(".carousel");
const carouselItems = document.querySelectorAll(".carousel-item");
const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");
const indicators = document.querySelectorAll(".indicator");
let currentIndex = 0;
const totalItems = carouselItems.length;
let autoSlideTimer;

// カルーセルの初期表示
function goToSlide(index) {
	carouselItems.forEach((item, i) => {
		item.classList.toggle("active", i === index);
	});
	indicators.forEach((indicator, i) => {
		indicator.classList.toggle("active", i === index);
	});
	currentIndex = index;
}

// 次のスライド
function showNextSlide() {
	let newIndex = currentIndex + 1;
	if (newIndex >= totalItems) newIndex = 0;
	goToSlide(newIndex);
}

// 前のスライド
function showPrevSlide() {
	let newIndex = currentIndex - 1;
	if (newIndex < 0) newIndex = totalItems - 1;
	goToSlide(newIndex);
}

// 自動スライド
function startAutoSlide() {
	autoSlideTimer = setInterval(showNextSlide, 5000);
}
function stopAutoSlide() {
	clearInterval(autoSlideTimer);
}

// ナビゲーションボタン
if (prevButton && nextButton) {
	prevButton.addEventListener("click", () => {
		showPrevSlide();
		stopAutoSlide();
		startAutoSlide();
	});
	nextButton.addEventListener("click", () => {
		showNextSlide();
		stopAutoSlide();
		startAutoSlide();
	});
}

// インジケーター
indicators.forEach((indicator, i) => {
	indicator.addEventListener("click", () => {
		goToSlide(i);
		stopAutoSlide();
		startAutoSlide();
	});
});

// 初期化
goToSlide(currentIndex);
startAutoSlide();

//------------------------------------------------------
// 6. モーダル表示 & モーダル内カルーセル
//------------------------------------------------------
const modal = document.getElementById("work-modal");
const closeButton = modal?.querySelector(".close-button");
const workLinks = document.querySelectorAll(".work-link");

workLinks.forEach((link) => {
	link.addEventListener("click", () => {
		// data-work属性から何番目の作品か取得
		const workIndex = parseInt(link.dataset.work, 10);
		openModal(workIndex);
	});
});

// モーダルを開く
function openModal(index) {
	modal.style.display = "block";
	showModalSlide(index);
	stopModalAutoSlide();
	startModalAutoSlide();
}

// モーダルを閉じる
function closeModal() {
	modal.style.display = "none";
	stopModalAutoSlide();
}

if (closeButton) {
	closeButton.addEventListener("click", closeModal);
}

// モーダル外クリックで閉じる
window.addEventListener("click", (e) => {
	if (e.target === modal) {
		closeModal();
	}
});

// モーダル内カルーセル
const modalCarousel = modal?.querySelector(".modal-carousel");
const modalCarouselItems = modal?.querySelectorAll(".modal-carousel-item");
const modalPrevBtn = modal?.querySelector(".modal-carousel-button.prev");
const modalNextBtn = modal?.querySelector(".modal-carousel-button.next");
const modalIndicators = modal?.querySelectorAll(".modal-indicator");
let modalCurrentIndex = 0;
let modalAutoSlideTimer;
const modalTotal = modalCarouselItems ? modalCarouselItems.length : 0;

// 指定のスライドを表示
function showModalSlide(index) {
	if (!modalCarouselItems || !modalIndicators) return;
	modalCarouselItems.forEach((item, i) => {
		item.classList.toggle("active", i === index);
	});
	modalIndicators.forEach((indicator, i) => {
		indicator.classList.toggle("active", i === index);
	});
	modalCurrentIndex = index;
}

// 次へ
function showModalNext() {
	let newIndex = modalCurrentIndex + 1;
	if (newIndex >= modalTotal) newIndex = 0;
	showModalSlide(newIndex);
}

// 前へ
function showModalPrev() {
	let newIndex = modalCurrentIndex - 1;
	if (newIndex < 0) newIndex = modalTotal - 1;
	showModalSlide(newIndex);
}

// 自動再生
function startModalAutoSlide() {
	modalAutoSlideTimer = setInterval(showModalNext, 5000);
}
function stopModalAutoSlide() {
	clearInterval(modalAutoSlideTimer);
}

// イベントリスナー（モーダル内ナビゲーションボタン）
if (modalPrevBtn && modalNextBtn) {
	modalPrevBtn.addEventListener("click", () => {
		showModalPrev();
		stopModalAutoSlide();
		startModalAutoSlide();
	});
	modalNextBtn.addEventListener("click", () => {
		showModalNext();
		stopModalAutoSlide();
		startModalAutoSlide();
	});
}

// インジケーター
modalIndicators?.forEach((indicator, i) => {
	indicator.addEventListener("click", () => {
		showModalSlide(i);
		stopModalAutoSlide();
		startModalAutoSlide();
	});
});

//------------------------------------------------------
// 7. Contactフォーム送信処理（簡易バリデーション＆送信）
//------------------------------------------------------
const contactForm = document.getElementById("contact-form");
if (contactForm) {
	contactForm.addEventListener("submit", (e) => {
		e.preventDefault();
		const nameValue = document.getElementById("name").value.trim();
		const emailValue = document.getElementById("email").value.trim();
		const messageValue = document.getElementById("message").value.trim();

		// 簡易バリデーション
		if (!nameValue || !emailValue || !messageValue) {
			alert("全てのフィールドを入力してください。");
			return;
		}
		// 実際の送信処理はバックエンドが必要
		alert(
			`ありがとうございます、${nameValue}さん！メッセージを受け取りました。`
		);
		contactForm.reset();
	});
}
