/******************************************************
 * script.js
 * ポートフォリオサイト用の JavaScript メインファイル
 *
 * 【主な機能】
 * 1. オープニングアニメーション（タイプライター & ブロック）
 * 2. 各セクションタイトルへのタイプライター演出
 * 3. スクロールに応じたフェードインアニメーション
 * 4. Contactフォームでの簡易バリデーション＆送信演出
 * 5. Worksモーダル（詳細表示）
 *    - モーダル内のみカルーセル（＜ ＞）ボタン
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

	// グリッドブロックの行・列を設定 (実際の個数はCSS依存しない)
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
			// 文字をすべて表示し終えた後ブロックアニメーションへ
			setTimeout(startBlockAnimation, 800);
		}
	}

	// -----------------------------------
	// ブロックアニメーション
	// -----------------------------------
	function startBlockAnimation() {
		const blocks = document.querySelectorAll(".grid-item");
		blocks.forEach((block, i) => {
			setTimeout(() => {
				block.classList.add("animate");
			}, i * 40); // 少しディレイを入れて順番に上へ流す
		});

		// ブロックが流れ終わる頃、メインページを表示
		setTimeout(() => {
			openingContainer.style.display = "none";
			mainContent.style.opacity = 1;
		}, 2500);
	}

	// タイプライター開始
	typeWriter();
});

//------------------------------------------------------
// 2. 各セクションタイトルへのタイプライター演出
//------------------------------------------------------
function applyTypewriterToHeadings() {
	const headings = document.querySelectorAll(".typewriter-title");
	headings.forEach((heading) => {
		const originalText = heading.getAttribute("data-title");
		heading.textContent = "";
		let charIndex = 0;

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

window.addEventListener("DOMContentLoaded", applyTypewriterToHeadings);

//------------------------------------------------------
// 3. スクロールに応じたフェードインアニメーション
//------------------------------------------------------
function fadeInOnScroll() {
	const fadeTargets = document.querySelectorAll(
		".section-title," +
			".about-container," +
			".career-container," +
			".skill-list," +
			".works-list," + // 作品一覧もフェードイン
			".qualifications ul," +
			".contact-form"
	);

	const windowHeight = window.innerHeight;
	const offset = 100; // 表示トリガー

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
// 4. Contactフォーム（簡易バリデーション＆送信処理）
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
		// 実際の送信処理はサーバー側が必要
		alert(
			`ありがとうございます、${nameValue}さん！メッセージを受け取りました。`
		);
		contactForm.reset();
	});
}

//------------------------------------------------------
// 5. Worksモーダル（詳細表示）
//    モーダル内のみカルーセルが存在
//------------------------------------------------------
const modal = document.getElementById("work-modal");
const closeButton = modal?.querySelector(".close-button");
const workLinks = document.querySelectorAll(".work-link");

// リンク（作品詳細ボタン）クリック時
workLinks.forEach((link) => {
	link.addEventListener("click", () => {
		const workIndex = parseInt(link.dataset.work, 10);
		openModal(workIndex);
	});
});

// モーダルを開く
function openModal(index) {
	if (!modal) return;
	modal.style.display = "block";
	showModalSlide(index);
	stopModalAutoSlide();
	startModalAutoSlide();
}

// モーダルを閉じる
function closeModal() {
	if (!modal) return;
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
const modalCarouselItems = modal?.querySelectorAll(".modal-carousel-item");
const modalPrevBtn = modal?.querySelector(".modal-carousel-button.prev");
const modalNextBtn = modal?.querySelector(".modal-carousel-button.next");
const modalIndicators = modal?.querySelectorAll(".modal-indicator");

let modalCurrentIndex = 0;
let modalAutoSlideTimer;
const modalTotal = modalCarouselItems ? modalCarouselItems.length : 0;

// 指定のスライドを表示する
function showModalSlide(i) {
	if (!modalCarouselItems || !modalIndicators) return;
	modalCarouselItems.forEach((item, idx) => {
		item.classList.toggle("active", idx === i);
	});
	modalIndicators.forEach((indicator, idx) => {
		indicator.classList.toggle("active", idx === i);
	});
	modalCurrentIndex = i;
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

// 自動切り替え（5秒）
function startModalAutoSlide() {
	if (modalTotal > 1) {
		modalAutoSlideTimer = setInterval(showModalNext, 5000);
	}
}

function stopModalAutoSlide() {
	clearInterval(modalAutoSlideTimer);
}

// モーダル内ボタン
if (modalPrevBtn) {
	modalPrevBtn.addEventListener("click", () => {
		showModalPrev();
		stopModalAutoSlide();
		startModalAutoSlide();
	});
}
if (modalNextBtn) {
	modalNextBtn.addEventListener("click", () => {
		showModalNext();
		stopModalAutoSlide();
		startModalAutoSlide();
	});
}

// モーダル内インジケーター
modalIndicators?.forEach((indicator, idx) => {
	indicator.addEventListener("click", () => {
		showModalSlide(idx);
		stopModalAutoSlide();
		startModalAutoSlide();
	});
});
