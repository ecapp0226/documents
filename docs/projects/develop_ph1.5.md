# 概要
develop_ph1では、一旦商品をかごに入れ、ログインし、購入できるまでの一連のフローに必要な最低限の実装を行った。
今回はPh2以降の画面、機能作成前に軽微な改修・追加を行って起き、新規追加に専念できるようにしておく

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