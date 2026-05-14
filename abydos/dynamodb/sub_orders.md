# sub_orders テーブル設計書

## 概要
受注明細テーブル。注文に紐づく商品明細を商品単位で管理。1注文に対して複数の明細を保持する。

## テーブル定義

| 属性名          | 型  | Key     | 説明                                      |
| --------------- | --- | ------- | ----------------------------------------- |
| order_id        | N   | PK      | 注文ID（orders テーブルの SK と対応）     |
| sub_order_id    | N   | SK      | 受注明細ID（商品単位の連番）                |
| user_id         | N   | -       | ユーザーID                                |
| shop_id         | N   | GSI1-PK | 店舗ID                                    |
| product_id      | N   | -       | 商品ID                                    |
| product_name    | S   | -       | 商品名（注文時点のスナップショット）      |
| price           | N   | -       | 注文時単価                                |
| order_num       | N   | -       | 注文数                                    |
| created_at      | N   | GSI1-SK | 受注日時 UnixTimestamp(ms)                |
| delivery_status | S   | -       | 配送ステータス（PR:処理中 / ED:配送済み） |

## LSI

なし

## GSI

### shop-id-index

| 属性名     | Key | Projection |
| ---------- | --- | ---------- |
| shop_id    | PK  | ALL        |
| created_at | SK  | -          |

- 管理画面で店舗単位の受注一覧をページネーション取得する用途
- `Query(PK=shop_id, ScanIndexForward=false)` + `Limit` + `ExclusiveStartKey` でページング

## キャパシティモード
オンデマンド

## 備考
- 1レコード = 1商品（商品単位で管理）
- `product_name` は注文時点のスナップショットとして保持（商品名変更の影響を受けない）
- 管理画面での店舗単位の受注表示は、shop-id-index で取得後にアプリケーション側で order_id をキーにグルーピングして対応
- 注文履歴取得時は orders.sub_order_ids を用いて BatchGetItem で一括取得（N+1問題回避）
