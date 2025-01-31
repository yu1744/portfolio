document.addEventListener("DOMContentLoaded", () => {
	// オープニングアニメーション
	const text = "Welcome to My Portfolio...";
	const typedTextElement = document.getElementById("typed-text");
	const gridContainer = document.getElementById("grid");
	const loadingContainer = document.querySelector(".loading-container");
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
			setTimeout(startGridAnimation, 1000);
		}
	}

	// グリッドアニメーション
	function startGridAnimation() {
		const items = document.querySelectorAll(".grid-item");
		items.forEach((item) => {
			const row = parseInt(item.dataset.row);
			const col = parseInt(item.dataset.col);
			const delay = (15 - row + col) * 50;

			setTimeout(() => {
				item.classList.add("animate");
			}, delay);
		});

		// メインコンテンツを表示
		setTimeout(() => {
			loadingContainer.style.opacity = "0";
			setTimeout(() => {
				loadingContainer.style.display = "none";
				document.body.style.overflow = "auto"; // スクロールを有効化
			}, 500);
		}, 2000);
	}

	// アニメーション開始
	document.body.style.overflow = "hidden"; // 初期状態でスクロールを無効化
	setTimeout(typeText, 500);

	// 以下、既存のコード（スキルのプログレスバー、セクションのフェードイン、
	// プロジェクトモーダル、その他の機能）をそのまま続けてください
	// プロジェクトデータ
	const projectsData = {
		project1: {
			title: "Portfolio Website",
			duration: "2024.01 - 2024.02",
			role: "Frontend Developer",
			team: "Personal Project",
			description: `
                <h3>Overview</h3>
                <p>レスポンシブ対応のポートフォリオサイトを開発。モダンな技術とアニメーションを活用し、
                   直感的なUI/UXを実現しています。</p>
                
                <h3>Features</h3>
                <ul>
                    <li>レスポンシブデザイン</li>
                    <li>スムーズスクロール</li>
                    <li>モーダルウィンドウ</li>
                    <li>画像カルーセル</li>
                </ul>
                
                <h3>Technical Details</h3>
                <ul>
                    <li>React + TypeScriptによるコンポーネント開発</li>
                    <li>Tailwind CSSを用いたスタイリング</li>
                    <li>アニメーションによるインタラクション</li>
                </ul>
                
                <h3>Key Points</h3>
                <p>パフォーマンスを考慮し、画像の最適化やコード分割を実装。
                   またアクセシビリティにも配慮し、セマンティックなマークアップを心がけました。</p>
            `,
			techStack: ["React", "TypeScript", "Tailwind CSS"],
			images: [
				"project1-image1.jpg",
				"project1-image2.jpg",
				"project1-image3.jpg",
			],
			demoUrl: "https://example.com/demo1",
			githubUrl: "https://github.com/yourusername/project1",
		},
		project2: {
			title: "Task Management App",
			duration: "2023.11 - 2023.12",
			role: "Full Stack Developer",
			team: "2 Members",
			description: `
                <h3>Overview</h3>
                <p>シンプルで使いやすいタスク管理アプリケーションを開発。
                   リアルタイムでの更新とドラッグ&ドロップによる直感的な操作を実現しています。</p>
                
                <h3>Features</h3>
                <ul>
                    <li>タスクの作成・編集・削除</li>
                    <li>ドラッグ&ドロップによる優先順位の変更</li>
                    <li>カテゴリー別の管理機能</li>
                    <li>進捗状況の視覚化</li>
                </ul>
                
                <h3>Backend Architecture</h3>
                <ul>
                    <li>Node.js + Expressによるサーバー構築</li>
                    <li>MongoDBを用いたデータ管理</li>
                    <li>JWT認証の実装</li>
                </ul>
                
                <h3>Results</h3>
                <p>ユーザビリティテストを実施し、フィードバックを基に改善を重ねました。
                   結果として、直感的で使いやすいインターフェースを実現できました。</p>
            `,
			techStack: ["Vue.js", "Node.js", "MongoDB"],
			images: [
				"project2-image1.jpg",
				"project2-image2.jpg",
				"project2-image3.jpg",
			],
			demoUrl: "https://example.com/demo2",
			githubUrl: "https://github.com/yourusername/project2",
		},
	};

	// スキルのプログレスバーアニメーション
	const observerOptions = {
		root: null,
		threshold: 0.1,
		rootMargin: "0px",
	};

	const skillsObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const progress = entry.target;
				const percentage = progress.style.width;
				progress.style.width = "0";
				setTimeout(() => {
					progress.style.width = percentage;
				}, 100);
				skillsObserver.unobserve(progress);
			}
		});
	}, observerOptions);

	document.querySelectorAll(".skill-progress").forEach((progress) => {
		skillsObserver.observe(progress);
	});

	// セクションのフェードインアニメーション
	const sectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("fade-in");
				sectionObserver.unobserve(entry.target);
			}
		});
	}, observerOptions);

	document.querySelectorAll(".section").forEach((section) => {
		section.classList.add("fade-out");
		sectionObserver.observe(section);
	});

	// プロジェクトモーダル関連
	const modal = document.getElementById("project-modal");
	const modalContent = modal.querySelector(".modal-content");
	let currentSlide = 0;

	// プロジェクト詳細ボタンのイベントリスナー
	document.querySelectorAll(".project-details-btn").forEach((button) => {
		button.addEventListener("click", (e) => {
			const projectId = e.target.closest(".project-card").dataset.project;
			openProjectModal(projectId);
		});
	});

	function openProjectModal(projectId) {
		const project = projectsData[projectId];

		document.getElementById("modal-title").textContent = project.title;
		document.getElementById("modal-description").innerHTML =
			project.description;
		document.getElementById("modal-duration").textContent = project.duration;
		document.getElementById("modal-role").textContent = project.role;
		document.getElementById("modal-team").textContent = project.team;

		document.getElementById("modal-tech-stack").innerHTML = `
            ${project.techStack
							.map(
								(tech) => `
                <span class="tech-tag">${tech}</span>
            `
							)
							.join("")}
        `;

		// カルーセルの設定
		const carouselContainer = document.querySelector(".carousel-container");
		carouselContainer.innerHTML = project.images
			.map(
				(img, index) => `
            <div class="carousel-slide">
                <img src="${img}" alt="Project screenshot ${index + 1}">
            </div>
        `
			)
			.join("");

		// カルーセルインジケーターの設定
		const indicatorsContainer = document.querySelector(".carousel-indicators");
		indicatorsContainer.innerHTML = project.images
			.map(
				(_, index) => `
            <div class="carousel-indicator${index === 0 ? " active" : ""}" 
                 data-index="${index}"></div>
        `
			)
			.join("");

		document.getElementById("demo-link").href = project.demoUrl;
		document.getElementById("github-link").href = project.githubUrl;

		currentSlide = 0;
		updateCarousel();

		modal.style.display = "block";
		setTimeout(() => {
			modal.classList.add("show");
			modalContent.style.transform = "translateY(0)";
			modalContent.style.opacity = "1";
		}, 10);

		document.body.style.overflow = "hidden";
	}

	function updateCarousel() {
		const slides = document.querySelectorAll(".carousel-slide");
		const indicators = document.querySelectorAll(".carousel-indicator");

		slides.forEach((slide, index) => {
			slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
		});

		indicators.forEach((indicator, index) => {
			indicator.classList.toggle("active", index === currentSlide);
		});
	}

	// カルーセルのナビゲーション
	document.querySelector(".carousel-btn.prev").addEventListener("click", () => {
		const slides = document.querySelectorAll(".carousel-slide");
		currentSlide = (currentSlide - 1 + slides.length) % slides.length;
		updateCarousel();
	});

	document.querySelector(".carousel-btn.next").addEventListener("click", () => {
		const slides = document.querySelectorAll(".carousel-slide");
		currentSlide = (currentSlide + 1) % slides.length;
		updateCarousel();
	});

	// インジケーターのクリックイベント
	document.addEventListener("click", (e) => {
		if (e.target.classList.contains("carousel-indicator")) {
			currentSlide = parseInt(e.target.dataset.index);
			updateCarousel();
		}
	});

	// プロジェクトモーダルを閉じる処理（既存の関数名を変更）
	function closeProjectModal() {
		modal.classList.remove("show");
		modalContent.style.transform = "translateY(-50px)";
		modalContent.style.opacity = "0";
		setTimeout(() => {
			modal.style.display = "none";
			document.body.style.overflow = "auto";
		}, 300);
	}

	document
		.querySelector(".close-modal")
		.addEventListener("click", closeProjectModal);

	// モーダル外クリックで閉じる
	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			closeProjectModal();
		}
	});

	// ESCキーでモーダルを閉じる
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && modal.classList.contains("show")) {
			closeProjectModal();
		}
	});

	// ハンバーガーメニュー
	const hamburger = document.querySelector(".hamburger");
	const navLinks = document.querySelector(".nav-links");

	hamburger?.addEventListener("click", () => {
		hamburger.classList.toggle("active");
		navLinks.classList.toggle("active");
	});

	// スムーズスクロール
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const target = document.querySelector(this.getAttribute("href"));
			const headerOffset = 80;
			const elementPosition = target.getBoundingClientRect().top;
			const offsetPosition =
				elementPosition + window.pageYOffset - headerOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});

			// モバイルメニューが開いている場合は閉じる
			if (hamburger?.classList.contains("active")) {
				hamburger.classList.remove("active");
				navLinks.classList.remove("active");
			}
		});
	});

	// コンタクトフォーム
	// const contactForm = document.getElementById("contact-form");
	// if (contactForm) {
	// 	contactForm.addEventListener("submit", async function (e) {
	// 		e.preventDefault();

	// 		// フォームデータの取得
	// 		const formData = new FormData(this);
	// 		const data = Object.fromEntries(formData.entries());

	// 		try {
	// 			// ここに実際の送信処理を実装
	// 			console.log("送信されたデータ:", data);

	// 			// 成功メッセージ
	// 			alert("メッセージが送信されました！");
	// 			this.reset();
	// 		} catch (error) {
	// 			alert("送信に失敗しました。もう一度お試しください。");
	// 			console.error("Error:", error);
	// 		}
	// 	});
	// }
	const form = document.getElementById("contact-form");
	const thanksModal = document.getElementById("thanks-modal");
	const closeButton = document.querySelector(".close-thanks-modal");

	form.addEventListener("submit", async (e) => {
		e.preventDefault();

		const formData = new FormData(form);
		const url =
			"https://docs.google.com/forms/u/0/d/e/1FAIpQLSecGESamt7EBYJPoOiRsbSgF1kSI_NGN_ZKDlz5mbLoguJA6w/formResponse";

		try {
			await fetch(url, {
				method: "POST",
				body: formData,
				mode: "no-cors",
			});

			// フォームをリセット
			form.reset();

			// モーダルを表示
			thanksModal.style.display = "block";
			setTimeout(() => {
				thanksModal.classList.add("show");
			}, 10);
		} catch (error) {
			console.error("Error:", error);
			alert("送信に失敗しました。もう一度お試しください。");
		}
	});

	function closeThanksModal() {
		thanksModal.classList.remove("show");
		setTimeout(() => {
			thanksModal.style.display = "none";
		}, 300);
	}

	// サンクスモーダルのイベントリスナー
	closeButton.addEventListener("click", closeThanksModal);

	thanksModal.addEventListener("click", (e) => {
		if (e.target === thanksModal) {
			closeThanksModal();
		}
	});

	// プロジェクトモーダルのイベントリスナー（既存のコード）
	document
		.querySelector(".close-modal")
		.addEventListener("click", closeProjectModal);

	modal.addEventListener("click", (e) => {
		if (e.target === modal) {
			closeProjectModal();
		}
	});

	// ESCキーで両方のモーダルを制御
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			if (thanksModal.classList.contains("show")) {
				closeThanksModal();
			}
			if (modal.classList.contains("show")) {
				closeProjectModal();
			}
		}
	});
});

// バックグラウンドアニメーション
const codeRain = document.getElementById("codeRain");
const snippets = [
	"const",
	"let",
	"var",
	"function",
	"return",
	"interface",
	"type",
	"class",
	"extends",
	"import",
	"{ }",
	"( )",
	"=>",
	"[];",
	"async",
	"await",
];

const MAX_ELEMENTS = 30; // 最大要素数
let currentElements = 0;

function createRainDrop() {
	if (currentElements >= MAX_ELEMENTS) {
		return;
	}

	const line = document.createElement("div");
	line.className = "code-line";
	line.style.left = `${Math.random() * 100}%`;
	line.style.animationDuration = `${Math.random() * 5 + 8}s`;
	line.textContent = snippets[Math.floor(Math.random() * snippets.length)];

	line.addEventListener("animationend", () => {
		line.remove();
		currentElements--;
	});

	codeRain.appendChild(line);
	currentElements++;
}

// 初期生成（画面サイズに応じて適切な数を生成）
function initializeRain() {
	const screenWidth = window.innerWidth;
	const initialElements = Math.min(Math.floor(screenWidth / 50), MAX_ELEMENTS);

	for (let i = 0; i < initialElements; i++) {
		setTimeout(() => createRainDrop(), Math.random() * 3000);
	}
}

// 定期的に新しい要素を生成（既存の要素数を考慮）
function startRainLoop() {
	setInterval(() => {
		if (currentElements < MAX_ELEMENTS) {
			createRainDrop();
		}
	}, 500);
}

// 画面リサイズ時の処理
window.addEventListener("resize", () => {
	// 既存の要素をクリア
	codeRain.innerHTML = "";
	currentElements = 0;
	// 新しいサイズに合わせて再初期化
	initializeRain();
});

// 初期化
initializeRain();
startRainLoop();
