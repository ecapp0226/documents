# orders テーブル設計書

## 概要
注文テーブル。user_id をPK、order_id をSKとして注文履歴をユーザー単位で管理。

## テーブル定義

| 属性名          | 型  | Key | 説明                                      |
| --------------- | --- | --- | ----------------------------------------- |
| user_id         | N   | PK  | ユーザーID（JWTから取得）                 |
| order_id        | N   | SK  | 注文ID                                    |
| created_at      | N   | -   | 注文日時 UnixTimestamp(ms)                |
| sub_order_ids   | NS  | -   | 受注明細IDのSet（商品単位の連番）         |

## LSI

なし

## GSI

なし

## キャパシティモード
オンデマンド

## 備考
- 受注明細は sub_orders テーブルに分離
- sub_order_ids は N+1問題回避のために保持。BatchGetItem で sub_orders を一括取得する際のキー情報として使用
- 注文履歴取得時は orders を Query → sub_order_ids を用いて sub_orders を BatchGetItem で一括取得（2回のアクセスで完結）
- BatchGetItem の上限（100件）を超える場合は分割して実行する
