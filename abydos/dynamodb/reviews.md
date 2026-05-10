# reviews テーブル設計書

## 概要
商品レビューテーブル。商品詳細画面でのレビュー表示に使用。

## テーブル定義

| 属性名     | 型  | Key     | 説明               |
| ---------- | --- | ------- | ------------------ |
| product_id | N   | PK      | 商品ID             |
| review_id  | N   | SK      | レビューID         |
| user_id    | N   | GSI1-PK | 投稿者ID           |
| rating     | N   | LSI1-SK | 評価スコア（1〜5） |
| comment    | S   | -       | レビューコメント   |
| created_at | N   | GSI1-SK | UnixTimestamp(ms)  |

## LSI

### rating-index

| 属性名     | Key | Projection |
| ---------- | --- | ---------- |
| product_id | PK  | ALL        |
| rating     | SK  | -          |

- 商品詳細画面で「高評価順」「低評価順」のレビュー表示に使用
- `Query(PK=product_id, ScanIndexForward=false)` で高評価順に取得

## GSI

### user-review-index

| 属性名     | Key | Projection |
| ---------- | --- | ---------- |
| user_id    | PK  | ALL        |
| created_at | SK  | -          |

- ユーザーが投稿したレビュー一覧を新しい順に取得する用途
- `Query(PK=user_id, ScanIndexForward=false)` + `Limit` + `ExclusiveStartKey` でページング

## キャパシティモード
オンデマンド

## 備考
- products テーブルの `rating` / `review_count` はレビュー投稿時に非同期で集計更新する想定
- Phase 1 ではレビュー投稿APIは対象外（将来拡張）
- LSI はテーブル作成時にのみ設定可能（後から追加不可）のため、初期構築時に定義しておく
