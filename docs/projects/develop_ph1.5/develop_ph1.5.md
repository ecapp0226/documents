# 概要
develop_ph1では、一旦商品をかごに入れ、ログインし、購入できるまでの一連のフローに必要な最低限の実装を行った。
今回はPh2以降の画面、機能作成前に軽微な改修・追加を行って起き、新規追加に専念できる準備する

## 対応内容
### logbackを設定、ログの調整
現状の構成では、アクセスログ、アプリケーションログまた、アプリのログでもERRORやWARNの振り分けができない。
今回各種ログの出力先、フォーマットを調整し、各種ロググループへ連携できるようにする。

#### ログ形式
##### アクセスログ

```log
%h %l %u [%t] [access] %r %s %b "%{Referer}i" "%{User-Agent}i" %D
```

##### アプリケーションログ

```application
%d{yyyy-MM-dd HH:mm:ss.SSS} [application] [{%thread}] %level %logger %msg%n 
```

```error
%d{yyyy-MM-dd HH:mm:ss.SSS} [error] [{%thread}] %level %logger %msg%n 
```

```warn
%d{yyyy-MM-dd HH:mm:ss.SSS} [warn] [{%thread}] %level %logger %msg%n 
```

#### ロググループ先
下記ロググループに連携するようにする。
また、ログの保持期間は1週間でS3へログローテーションを行うようにする

- abydos-xxx-access.log
- abydos-xxx-application.log
- abydos-xxx-error.log
- abydos-xxx-warn.log

#### タスク定義・コンテナ設定
現状のawslogsだと複数のログを分けることができないため、サイドカーでFluent Bitを立てる

### ログアウトAPIの実装
現状、ログアウトする際は、フロントエンド側でCookieを削除するが、
JWTの有効期限が切れるまでの間、ログアウト後も画面から直接パスを指定するとログイン復帰できてしまう。
バックエンド側で、CookieのTTLを更新し、期限切れにするログアウト用のAPIを新設することで確実にログアウトできるようにする

### プロダクト名の整理/各種ページ名の設定

- プロダクト名がタイトルで表示され続けるようになっており、各種何の画面かが分かりずらい
- そもそもecappやEC Storeというタイトル自体仮記載のため、さすがに変えておきたい

## プロダクト名について

AIに相談しつつ
```
1. 「実験場・遊び場」を優しく表現した案「サンドボックス（砂場）」という言葉のニュアンスを、より日常的で温かみのある言葉に置き換えた名前です。すなばコマース / すなばEC理由: 「サンドボックス」をそのまま「すなば」と言い換えた、ひらがなの柔らかさが際立つ名前です。面接での見せ方: 「技術的な実験を自由に行う『砂場』として、実務の振り返りやPoCを詰め込みました」と説明すると、目的と名前が綺麗にリンクします。てらこやカート (Terakoya-Cart)理由: 学びの場である「寺子屋」から。4年間の経験を振り返り、自ら学び直すためのECサイトという意味を込めています。ロジカの庭 (Logica-Niwa)理由: ロジック（Logic）と、自由に手入れをして育てる「庭」を掛け合わせた名前。DynamoDB設計やAPI設計を綺麗に手入れしているドキュメントの印象に合います。🍞 2. 「試作・こねる・育てる」をテーマにした案「実装を振り返る」「実際に触って予測を立てる（PoC）」というプロセスを、パンをこねたり、試作したりするような「ものづくりの温かさ」で表現した名前です。こねるカート / コネルEC理由: 納得がいくまで設計を「こねくり回す」「試行錯誤する」という開発プロセスを、愛嬌のある音に落とし込みました。こしらえマーケット (Koshirae-Market)理由: 丁寧に作ることを意味する日本語「こしらえる」から。実務に近い本格的なアーキテクチャを、個人開発向けに丁寧にチューニングしてこしらえた、という意味を表現できます。試作堂 (しさくどう / Shisakudo)理由: 「PoC検証」をレトロでやわらかい「〜堂」という響きにした名前。少し職人気質でありながら、親しみやすさがあります。
```
-> 最終的な案として、すなばECを採用

#### 各画面の表記について
1. 画面毎のタイトル表記を以下に合わせる

- SUNABA - 通販サイト
- ログイン | SUNABA
- 商品名 | SUNABA
- 買い物かご一覧 | SUNABA
- 購入確認 | SUNABA
- 購入完了 | SUNABA
- 購入履歴一覧 | SUNABA

2. ヘッダーのロゴをEC Storeから以下のロゴ画像に差し替える
  
![header_logo](./header_logo.png)

3. faviconをに設定する  
  
![logo](./favicon.svg)

4. フッターのサイト名を更新する
5. プロダクトのテーマカラーをサイトロゴの色に合わせて定義する
  
```css
@theme {
  --color-brand-50: #eff6ff;
  --color-brand-100: #dbeafe;
  --color-brand-200: #bfdbfe;
  --color-brand-400: #60a5fa;
  --color-brand-500: #3b82f6;
  --color-brand-600: #2563eb;
  --color-brand-700: #1d4ed8;
  --color-brand-800: #1e40af;

  /* グラデーション始点(シアン) */
  --color-gradient-from: #06b6d4;
  /* グラデーション終点(パープル) */
  --color-gradient-to: #8b5cf6;

  --color-danger-50: #fef2f2;
  --color-danger-100: #fee2e2;
  --color-danger-200: #fecaca;
  --color-danger-400: #f87171;
  --color-danger-500: #ef4444;
  --color-danger-600: #dc2626;
  --color-danger-700: #b91c1c;
  --color-danger-800: #991b1b;
}
```

## 体制/役割
- abydos
  - ログアウトAPIの実装
  - logback.xmlの導入
- trinity
  - プロダクト名のロゴを更新
  - 各画面のタイトルの更新
- millennium
  - orders,users,productsのタスク定義にfirelensの導入
  - cloudwatchへのロググループ追加、ローテション追加