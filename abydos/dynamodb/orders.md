# orders テーブル設計書

## 概要
注文テーブル。user_id をPK、order_id をSKとして注文履歴をユーザー単位で管理。

## テーブル定義

| 属性名          | 型  | Key | 説明                                      |
| --------------- | --- | --- | ----------------------------------------- |
| user_id         | N   | PK  | ユーザーID（JWTから取得）                 |
| order_id        | N   | SK  | 注文ID                                    |
| created_at      | N   | -   | 注文日時 UnixTimestamp(ms)                |

## LSI

なし

## GSI

なし

## キャパシティモード
オンデマンド

## 備考
- 受注明細は sub_orders テーブルに分離
- 注文履歴取得時は orders を Query → 各 order_id で sub_orders を Query（2段階取得）
