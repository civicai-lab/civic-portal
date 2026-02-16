# State

## Current
- 作業中: UI/UX洗練（Phase H33完了）
- ブランチ: main
- ビルド状態: 成功（54ページ、TypeScriptエラーなし）
- E2Eテスト: 32/32パス（Playwright, ~7秒）
- 直近コミット: ed19faa — Phase H33 a11y強化+テーブルレスポンシブ改善
- 直近完了: Phase H33 a11y強化+テーブルレスポンシブ改善
- Vercel: https://civic-portal-nine.vercel.app

## Completed (UI/UX改善 Phase A-D)

### Phase A: UI/UX基盤
- globals.css: カラーシステム統一（Trust Blue #2563EB, CTA Orange #F97316）
- layout.tsx: Lexend + Source Sans 3 フォント、Skip Link
- button.tsx: CTA バリアント、44px WCAG準拠タッチターゲット
- template.tsx: ページ遷移アニメーション

### Phase B: 画像・ビジュアル充実
- 89画像アセットをコピー（hero/cases/tech/partners/credentials/news/team）
- header.tsx, footer.tsx: ロゴ画像化（header-logo.png）
- サービスカードにサムネイル追加（20サービス全て）
- ホームページに信頼性セクション（パートナーロゴ + 資格バッジ）
- Hero/CTAセクションに背景画像

### シンクタンク型サービス11-20 画像収集
- 20枚のサービス画像（thumb + hero x 10サービス）をUnsplashからダウンロード
- 5枚の共通セクション画像（hero-about, hero-cases, hero-contact, section-trust, section-cta）
- 全WebP形式、thumb < 100KB、hero < 200KB
- 配置先: public/images/services/, public/images/sections/

### Phase C: アニメーション
- use-scroll-animation.ts: IntersectionObserverフック
- animated-section.tsx: fade-up/fade-in/slide-left/slide-right
- count-up.tsx: 数値カウントアップ（easeOutQuart）
- Header スクロール改善（高さ変化 + 下ボーダー）

### Phase D: デッドリンク解消（7ページ新規作成）
- /about, /cases, /news, /careers, /faq, /privacy, /terms

### カラー置換済みページ
- page.tsx, services/page.tsx, services/[slug]/page.tsx, contact/page.tsx
- パターン: text-gray-* → text-foreground/text-muted-foreground, bg-gray-50 → bg-muted, text-blue-600 → text-primary, container → max-w-7xl

### TDD Wave1 完了（Priority S サービス）
- 07-staff-knowledge: 144テスト全パス（アクセス制御、監査ログ、機密文書、同義語展開）
- 05-municipal-faq: 119テスト全パス（禁止トピック、カテゴリ検出、多言語、エスカレーション）
- 01-shiori-library: 144テスト全パス（インテント分類、検索ランキング、レコメンド、統計）
- 14-pubcom-analysis: 207テスト全パス（意見分類、根拠引用抽出、レポート4セクション生成）
- 11-guideline-service: 179テスト全パス（分析、比較、ドラフト生成、整合性チェック、バージョン管理）

### 画像バリエーション追加
- 45枚のWebP画像をUnsplashからダウンロード（20 thumb + 20 hero + 5 section）
- services.ts: thumbnailMap/heroMap更新、slug不整合5件修正
- services/[slug]/page.tsx: Hero背景画像+グラデーションオーバーレイ適用
- GitHubにプッシュ済み

### TDD Wave2 完了（Priority A サービス）
- 02-shiori-academic: 236テスト全パス（テーマ分解、引用形式、BibTeX）
- 03-facility-concierge: 217テスト全パス（施設検索、予約、バリアフリー）
- 06-welfare-navigator: 173テスト全パス（制度マッチング、多言語、申請書）
- 08-minutes-summary: 188テスト全パス（パイプライン、アクション抽出）
- 10-disaster-guide: 315テスト全パス（緊急ワード、PII保護、誤情報検出）

### TDD Wave3 完了（Priority B サービス）
- 04-tourism-guide: 250テスト全パス（禁止応答ガード、4言語案内、緊急モード）
- 09-ai-starter-pack: 147テスト全パス（スコアリング、リスク評価、アセスメント）
- 15-book-selection: 184テスト全パス（NDCバランス制約改善、ギャップ分析）
- 16-assembly-archive: 207テスト全パス（役職抽出バグ修正、bi-gram検索改善）
- 17-infra-inspection: 359テスト全パス（重み付け判定、経年変化、GPS精度）

### TDD Wave4 完了（Priority C サービス）
- 12-rfp-support: 157テスト全パス（RFPチェックリスト、ベンダー質問票）
- 13-ai-audit: 205テスト全パス（リスクマトリクス、PII検出、バイアス、品質指標）
- 18-tourism-analytics: 342テスト全パス（言語判定、カテゴリ分類、感情分析、トレンド）
- 19-ai-reskilling: 276テスト全パス（料金プラン、品質基準、フォローアップ）
- 20-ai-lab: 322テスト全パス（イベントライフサイクル、審査統合、E2Eシナリオ）

### Phase2 UI実装完了
- [x] 05-municipal-faq: チャットUI（カテゴリ自動検出、信頼度表示、エスカレーション）
- [x] 10-disaster-guide: チャット+マップUI（有事/平時モード切替、多言語、避難所情報、防災クイズ）
- [x] 03-facility-concierge: 4ステップウィザード（目的選択→条件→結果→予約確認）
- [x] 06-welfare-navigator: フロー型制度マッチング（5質問→制度提案、緊急ワード検知）
- [x] 14-pubcom-analysis: パブコメ分析ダッシュボード（意見分類、感情分析、主要論点、レポート生成）
- [x] 15-book-selection: 選書最適化ダッシュボード（NDC分布、ギャップ分析、AI推薦、除籍候補）
- [x] 08-minutes-summary: 議事録要約ワークフロー（3ステップ: 入力→AI処理→結果表示）

### Phase E: サブページ品質改善（7ページ+Footer）
- about/page.tsx: hardcoded色→トークン化、AnimatedSection+CountUp追加、チームメンバーカード新設、sizes属性追加、セクション間py-24統一
- footer.tsx: ソーシャルリンク（X/GitHub）+aria-label追加、全リンクにfocus-visible対応、border-border明示
- cases/page.tsx: Hero色→primary/primary-foreground、カードhover:shadow-lg+group-hover:scale-105、sizes属性追加
- news/page.tsx: bg-white→bg-card、カードhover改善、sizes属性追加
- careers/page.tsx: blue-950→primary系、背景画像にsizes="100vw"、求人カードhover:shadow-lg追加
- faq/page.tsx: bg-white→bg-card、ChevronDownアイコン追加+回転アニメーション、summary focus-visible対応、details-marker非表示
- privacy/page.tsx, terms/page.tsx: bg-white→bg-card、space-y-8→space-y-10、max-w-prose追加、見出しtext-lg md:text-xlレスポンシブ統一

### カラー置換パターン（Phase E追加分）
- from-blue-950 via-blue-900 to-indigo-900 → from-primary/95 via-primary/90 to-accent-foreground
- text-blue-100 → text-primary-foreground/80
- from-blue-950/90 via-blue-900/85 to-indigo-900/80 → from-primary/95 via-primary/90 to-accent-foreground/85
- bg-white → bg-card
- border bg-white → border border-border bg-card

### Phase F3: Avatar型デモ3ページ
- [x] shiori-library/demo: AI司書SHIORIデモ（サイドバー+チャット+BookCard、545行）
- [x] shiori-academic/demo: SHIORI Academic学術検索デモ（テーマ分解+論文カード+引用形式モーダル、573行）
- [x] tourism-guide/demo: 多言語観光AIガイドデモ（4言語切替+チャット+スポットカード+緊急モード、736行）

### Phase F4: Dashboard型+Chat型デモ5ページ
- [x] staff-knowledge/demo: 庁内ナレッジ検索AI（チャット+アクセス制御Badge+監査ログサイドパネル、~480行）
- [x] ai-starter-pack/demo: AI導入スターターパック（5段階診断フォーム→スコア結果+推奨サービス、~460行）
- [x] guideline-service/demo: ガイドライン策定支援AI（3タブ: 分析/比較/ドラフト生成、~520行）
- [x] assembly-archive/demo: 議会アーカイブ検索AI（検索+発言者カード+タイムライン、~480行）
- [x] infra-inspection/demo: インフラ点検AIサポーター（KPIカード+施設テーブル+統計グラフ、~530行）

### Phase F5: Tool型デモ5ページ
- [x] rfp-support/demo: RFP作成支援AI（4ステップウィザード+チェックリスト+RFPドラフト+質問票テーブル、~280行）
- [x] ai-audit/demo: AI監査・評価サービス（KPIカード+3タブ: システム一覧/リスクマトリクス/改善レポート、~280行）
- [x] tourism-analytics/demo: 観光データ分析AI（期間フィルタ+KPIカード+3タブ: トレンド棒グラフ/言語分析/感情分析、~250行）
- [x] ai-reskilling/demo: AI研修・リスキリング支援（3ステップ: 基本情報→スキル5段階評価→結果+スキルマップ+推奨研修+タイムライン、~290行）
- [x] ai-lab/demo: 官民共創AIラボ（3タブ: イベント一覧+カテゴリフィルタ/プロジェクト進捗/審査シート星評価+判定、~310行）

### Phase G: 品質基盤（監査結果に基づく改善）
- [x] next.config.ts: セキュリティヘッダー6種+画像WebP最適化+reactStrictMode
- [x] robots.txt + sitemap.ts: SEO基盤（50 URL、全サービス+デモ）
- [x] error.tsx: グローバルエラー境界（リトライ+ホーム戻り）
- [x] loading.tsx: スケルトンUIローディング
- [x] services/[slug]/page.tsx: bg-white→bg-card 4箇所、blue系→デザイントークン5箇所
- [x] services.ts: rfp-support/ai-audit画像マッピング修正
- [x] 画像ファイル: rfp-support-*.webp, ai-audit-*.webp 追加
- [x] Playwright E2Eテスト: 32テスト/6ファイル（home/services/detail/demo/navigation/accessibility）
- [x] .gitignore: Playwright出力ディレクトリ追加

### デモページ品質改善（44e6a6f）
- 16デモページのハードコード色→デザイントークン置換（48箇所）
- レスポンシブ修正: min-h-[400px]→min-h-[300px] md:min-h-[400px]等
- アクセシビリティ: aria-label追加（送信ボタン、入力フィールド、画像プレースホルダ）

### Phase H20: SEO+画像最適化+色トークン統一（e478bbd）
- SEO: /services, /contact にメタデータ追加（layout.tsx方式）
- SEO: 20デモページに動的メタデータ生成（lib/demo-metadata.ts + 20 layout.tsx）
- 画像: 26 JPGファイル→WebP変換（品質80）、元JPG削除
- 画像: ソースコード内の全.jpg参照→.webp更新
- 色: globals.cssにsuccess/warning/thinktankセマンティック変数追加
- 色: ホームページemerald→thinktankトークン、bg-white→bg-card統一
- 色: toast/disclaimer/refusal-messageコンポーネントのデザイントークン化
- 品質: ビルド54ページ成功、E2E 32/32パス

### Phase H22: UI/UX洗練第3弾（e9f4a7c → e62366a）
- 構造化データ（JSON-LD）: Organization + FAQPage schema
- パンくずリスト: 全サブページ+サービス詳細+デモページに配置
- ナビゲーション改善: アクティブリンク表示+モバイルメニューアニメーション+フォーカストラップ
- 画像最適化: PNG→WebP統一+partner画像混在修正+sizes属性追加
- OG/Twitter Card: 全ページにOpenGraphメタデータ追加
- CSPヘッダー: Content-Security-Policy追加（default-src 'self'）
- デモUX体験向上: stagger-in/tab-fade-inアニメーション+active:scale-95
- デモページ色トークン: 全20デモのステータス/バッジ色→success/warning/destructive統一
- contactフォームUX: 送信完了リセットボタン+サーバーエラーハンドリング+Loader2スピナー
- a11y改善: ai-auditリスクマトリクスaria-label+ai-starter-pack focus-visible+tourism-guide SpotCard aria-label
- confidence-indicator: ハードコード色→デザイントークン
- マイクロインタラクション: button active:translate-y-px+service-card hover:bg-muted/30+FAQ open:border-l-primary
- scroll-padding-top: 4.5rem（アンカーリンクかぶり防止）
- optimizePackageImports: radix-ui, class-variance-authority追加
- ダークモード: next-themes導入+ThemeToggle（Sun/Moon）+21ファイル dark:対応
  - ロゴ: dark:brightness-0 dark:invert
  - パートナーロゴ: dark:invert+dark:opacity-60
  - source-citation: 5タイプ色にdark:バリアント
  - 16デモページ: バッジ/ステータス色にdark:追加
  - services/[slug]: チェックアイコン+課題ラベル

### Phase H23: UX改善第4弾（e99dc18）
- レスポンシブ: Hero H1テキストサイズ段階化（text-3xl→sm:4xl→md:5xl→lg:6xl）
- レスポンシブ: サービスグリッド grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
- パフォーマンス: 最初の3サービス画像にpriority属性（LCP改善）
- アニメーション: Trust/CTAセクションにAnimatedSection追加
- テキスト選択コントラスト強化（0.15→0.25）
- フッターリンクhover:underline+SNSアイコンhover:scale-110
- 404ページテキスト段階化（80px→120px→180px）
- CardDescription leading-relaxed+CardTitle transition-colors
- フィルタボタンtext-xs sm:text-sm段階化
- サービス詳細カードhover:shadow-lg統一
- next.config.ts deviceSizes/imageSizes最適化

### Phase H24: UX改善第5弾（9155b74）
- パフォーマンス: 不要Next.jsデフォルトSVG5個削除、未参照JPGロゴ2個削除
- OG画像: og-image.jpg→WebP変換、layout.tsxにOG/Twitter Card画像設定+metadataBase
- スクロール進捗バー: header最下部2px、primary色グラデーション、scaleX変形
- パートナーロゴ: hover:scale-105+bg-muted/30ラウンドパッド
- 資格バッジ: カード風コンテナ+hover:scale-110
- Hero CTA: pulse-subtleアニメーション（reduced-motion対応）
- フォーム: focus:ring-[3px]統一、focus:bg-primary/[0.02]、エラー時bg-destructive/5
- 成功画面: stagger fade-in+zoom-inアニメーション
- タブ: アクティブ下線→primary色、非アクティブhover:bg-accent/50
- テーマトグル: rotate遷移+hover:bg-muted
- Outlineボタン: hover:border-primary/50
- スケルトンUI: stagger-in段階表示
- Back to Top: バウンスイージング+hover:scale-110+レスポンシブ位置
- フッター: dark:hover:text-primary統一
- scroll-behavior: smooth（reduced-motion対応）
- サービス詳細: Hero H1 4段階レスポンシブ、FeatureCard左ボーダーアクセント

### Phase H25: error.tsx改善+PWA+blurDataURL+a11y+ページ充実（c8219e1 → c3a86f4）
- error.tsx: Button+lucide icons化（AlertTriangle/RefreshCw/Home）
- PWA: manifest.json追加、layout.tsxにmanifestリンク
- shimmerBlur: lib/utils.tsに共通blur SVG定義、ホーム+サービス一覧のImageに適用
- globals.css: OKLCH色修正（hsl()ラッパー→var()/color-mix()に5箇所修正）
- FAQ: CSS grid-template-rows + opacity transitionアニメーション追加
- motion-safe: 6デモページの23 animate-bounce/pulse→motion-safe:プレフィックス
- サービス詳細: 料金カード視覚差別化（ring-primary, scale-[1.02], おすすめBadge）、CTA pulse
- about: Hero AnimatedSection、実績数値強化、チーム gradient placeholders
- cases: 成果バッジ（TrendingUp）、AnimatedSection、hover効果
- news: グラデーションHero、カテゴリ色分け、Calendar日付アイコン
- count-up: decimalsプロパティ追加、useEffect依存配列修正

### Phase H26: privacy/terms/careers充実+blurDataURL+aria-live（58f0dc0 → ffa65cb）
- privacy: AnimatedSection + TOC目次 + 9セクション拡充
- terms: AnimatedSection + TOC目次 + 11セクション拡充
- careers: Why Civic AIセクション + 職種アイコン + AnimatedSection全面
- blurDataURL: about/cases/news/services/[slug]のImage全てにshimmerBlur追加
- alt属性: サービス詳細HeroのImage alt=""→service.displayName+"イメージ画像"
- aria-live: 6チャットデモのメッセージコンテナにaria-live="polite"追加
- レスポンシブ: ai-auditデモKPIグリッドにmd:grid-cols-2追加

### Phase H27: ダークモードコントラスト+ホバー効果（2a1bbb1）
- feature-grid: アイコンbg dark:bg-primary/20 + Card hover:bg-muted/30
- pricing: 推奨プラン dark:ring-primary/70
- hero/cta: ボタン dark:hover 調整
- breadcrumb: セパレータ /50→/70 コントラスト向上
- service-card: hover:bg-muted/20 追加
- contact: フォーカスbg dark:/[0.04]→/[0.08]、連絡先テキスト /60→/70
- faq: アコーディオン dark:open:bg-muted/40

### Phase H28: header/footer改善+デモ一貫性（c2a6e48）
- header: ロゴh-8→h-9タッチターゲット拡大、focus-visible ring-offset追加、max-h-[80vh]
- footer: LinkedIn追加、リンクhover:underline追加
- デモ: チャット吹き出しmax-w-[75%]→[80%]統一（6ページ）
- デモ: TypingIndicator role="status" aria-label="応答を生成中"追加

### Phase H29: 視覚レビュー指摘修正（6c624ec）
- shiori-library/demo: text-green-700→text-success デザイントークン
- count-up: aria-label追加（最終値をスクリーンリーダーに通知）
- about: チームメンバーに架空人名追加、CTO gradient→thinktank、実績グリッドsm:grid-cols-3
- contact: Breadcrumbパンくずリスト追加

### Phase H30: ステータス色セマンティックトークン統一（ea84d46）
- contact: text-red-500→text-destructive（必須マーク5箇所）
- minutes-summary/demo: text-green→text-success（完了/コピー成功3箇所）
- guideline-service/demo: 完了/不十分/欠落→success/warning-foreground/destructive（10箇所）
- facility-concierge/demo: 成功/注意→success/warning-foreground（3箇所）
- cases: 成果バッジ emerald→success（1箇所）
- services/[slug]: 課題ラベル red→destructive（1箇所）

### Phase H31: 7デモ ステータス色セマンティック統一（b34bcf8 → 3630b1e）
- welfare-navigator/demo: EmergencyBanner text-red→destructive + 成功→success（7箇所）
- disaster-guide/demo: 緊急バナー/モードボタン/避難所占有率/クイズ/電話→destructive/warning/success（15箇所）
- pubcom-analysis/demo: 賛成/反対→success/destructive（4箇所）
- book-selection/demo: 蔵書過剰→destructive, 注意→warning-foreground（3箇所）
- ai-lab/demo: CheckCircle2→success（1箇所）
- tourism-analytics/demo: YoY変化率/ポジティブ/ネガティブ→success/destructive（8箇所）
- infra-inspection/demo: BarChart3→warning-foreground（1箇所）

### Phase H32: サービス一覧フィルタ改善（ffd2ff3）
- フィルタクリアボタン追加（Xアイコン付きghost variant）
- フィルタアクティブ時のみ表示

### Phase H33: a11y強化+テーブルレスポンシブ改善（ed19faa）
- aria-pressed: services/page フィルタ + disaster-guide/tourism-guide/ai-lab トグルボタン
- テーブルcaption: infra-inspection/rfp-support/guideline-service にsr-only caption追加
- テーブルmin-w: infra-inspection/guideline-service/book-selection(2テーブル)にmin-w-[600px]
- avatar-character: TypingIndicatorドット bg-amber-400→bg-warning(3箇所)

## Next
- [ ] Lighthouseスコア計測+改善
- [ ] デモページ共通コンポーネント抽出（ChatMessage, TypingIndicator等）
- [ ] 残カテゴリ色分けはデータ可視化用途のため変更不要

## Blocked
- なし

---
*最終更新: 2026-02-17 Phase H33 a11y強化+テーブルレスポンシブ改善*
