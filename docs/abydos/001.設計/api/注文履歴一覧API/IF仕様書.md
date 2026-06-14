# 注文履歴取得API

## Endpoint
api/v1/orders

## HTTP Methods
GET

## Request
| 物理名      | 論理名                | Required | 型     | Note                        |
| ----------- | --------------------- | -------- | ------ | --------------------------- |
| limit       | 取得件数              |          | Number | デフォルト10件、最大100件   |
| lastOrderId | 最後に取得したOrderId |          | Number | ページネーション用のorderId |

※ ユーザーIDはAuthorizationヘッダーのJWTトークンから取得

## Response
**正常系**

| 物理名      |                 |              | 論理名                | Required | 型     | Note                       |
| ----------- | --------------- | ------------ | --------------------- | -------- | ------ | -------------------------- |
| lastOrderId |                 |              | 最後に取得したOrderId |          | Number | 次ページがある場合のみ返却 |
| orders      |                 |              | 注文一覧              | 〇       | Array  |                            |
|             | order_id        |              | 注文ID                | 〇       | Number |                            |
|             | created_at      |              | 注文日時              | 〇       | Number | UnixTimestamp(ミリ秒)      |
|             | total           |              | 合計金額              | 〇       | Number |                            |
|             | details         |              | 受注一覧              | 〇       | Array  |                            |
|             |                 | detail_id    | 受注ID                | 〇       | Number |                            |
|             |                 | product_id   | 商品ID                | 〇       | Number |                            |
|             |                 | product_name | 商品名                | 〇       | String |                            |
|             |                 | shop_id      | 店舗ID                | 〇       | Number |                            |
|             |                 | price        | 単価                  | 〇       | Number |                            |
|             |                 | order_num    | 注文数                | 〇       | Number |                            |
|             |                 | total        | 小計                  | 〇       | Number | price * order_num          |
|             | delivery_status |              | 配送ステータス        | 〇       | String |                            |

```json
{
  "lastOrderId": 123456,
  "orders": [
    {
      "order_id": 123456,
      "created_at": 1496918153734,
      "total": 13740,
      "details": [
        {
          "detail_id": 1,
          "product_id": 10001,
          "product_name": "プレミアムコットンTシャツ",
          "shop_id": 20001,
          "price": 2480,
          "order_num": 2,
          "total": 4960
        },
        {
          "detail_id": 2,
          "product_id": 10002,
          "product_name": "ランニングシューズ",
          "shop_id": 20001,
          "price": 6800,
          "order_num": 1,
          "total": 6800
        },
        {
          "detail_id": 3,
          "product_id": 10003,
          "product_name": "UVカットキャップ",
          "shop_id": 12346,
          "price": 990,
          "order_num": 2,
          "total": 1980
        }
      ],
      "delivery_status": "ED"
    }
  ]
}
```

```json
{
  "orders": []
}
```

**異常系**

| HttpStatus | error_code | message                 | 条件                                 |
| ---------- | ---------- | ----------------------- | ------------------------------------ |
| 400        | API_ERR001 | validation check error. | バリデーションエラー                 |
| 401        | API_ERR003 | unauthorized.           | 未ログイン時のアクセス               |
| 500        | API_ERR999 | server error.           | バックエンド内で想定外のエラー発生時 |

```json
{
  "error_code": "API_ERR001",
  "message": "validation check error."
}
```

```json
{
  "error_code": "API_ERR999",
  "message": "server error."
}
```
