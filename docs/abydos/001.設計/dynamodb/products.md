# products テーブル設計書

## 概要
商品マスタテーブル。商品一覧・詳細・TOP画面表示に使用。

## テーブル定義

| 属性名       | 型  | Key     | 説明                           |
| ------------ | --- | ------- | ------------------------------ |
| product_id   | N   | PK      | ロット番号                     |
| product_name | S   | -       | 商品名                         |
| description  | S   | -       | 商品説明                       |
| image_url    | S   | -       | S3の商品画像URL                |
| shop_id      | N   | GSI1-PK | 店舗ID                         |
| category_id  | N   | GSI2-PK | カテゴリID                     |
| price        | N   | -       | 価格（税計算済み）             |
| tax_type     | S   | -       | I:内税 / E:外税 / N:税無し     |
| rating       | N   | -       | 評価スコア（例: 4.0）          |
| review_count | N   | -       | レビュー件数                   |
| stock        | N   | -       | 在庫数                         |
| status       | S   | -       | O:販売中 / S:売切 / D:販売終了 |
| created_at   | N   | GSI2-SK | UnixTimestamp(ms)              |

## LSI

なし

## GSI

### shop-product-index

| 属性名     | Key | Projection |
| ---------- | --- | ---------- |
| shop_id    | PK  | ALL        |
| product_id | SK  | -          |

- 管理画面で店舗単位の商品一覧をロット番号降順でページネーション取得する用途
- `Query(PK=shop_id, ScanIndexForward=false)` + `Limit` + `ExclusiveStartKey` でページング

### category-product-index

| 属性名      | Key | Projection |
| ----------- | --- | ---------- |
| category_id | PK  | ALL        |
| created_at  | SK  | -          |

- カテゴリページTOPでカテゴリ指定の商品一覧を新しい順に表示する用途
- `Query(PK=category_id, ScanIndexForward=false)` + `Limit` + `ExclusiveStartKey` でページング

## キャパシティモード
オンデマンド

## 備考
- TOP画面の表示商品はPh1では固定値のロット番号を指定して BatchGetItem で取得
- Ph2以降は入稿システムから登録されたロットをAPI経由で指定し表示する予定
