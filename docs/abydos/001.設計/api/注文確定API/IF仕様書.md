# 注文確定API

## Endpoint
api/v1/orders

## HTTP Methods
POST

## Request
| 物理名   |            | 論理名     | Required | 型     | Note      |
| -------- | ---------- | ---------- | -------- | ------ | --------- |
| products |            | 商品リスト | 〇       | JSON[] | 20件まで |
|          | product_id | 商品ID     | 〇       | Number |           |
|          | quantity   | 注文数量   | 〇       | Number | 1以上     |

※ ユーザーIDはAuthorizationヘッダーのJWTトークンから取得

```json
{
  "products": [
    {
      "product_id": 10001,
      "quantity": 2
    },
    {
      "product_id": 10002,
      "quantity": 1
    },
    {
      "product_id": 20001,
      "quantity": 3
    }
  ]
}
```

## Response
**正常系**

| 物理名 |        | 論理名 | Required | 型 | Note |
| ------ | ------ | ------ | -------- | -- | ---- |
|        |        |        |          |    |      |

レスポンスボディなし
```json
```

**異常系**

| HttpStatus | error_code       | message                 | 条件                                 |
| ---------- | ---------------- | ----------------------- | ------------------------------------ |
| 400        | API_ERR001       | validation check error. | バリデーションエラー                 |
| 401        | API_ERR003       | unauthorized.           | 未ログイン時のアクセス               |
| 400        | API_ORDER_ERR001 | product not found.      | 商品が存在しない                     |
| 400        | API_ORDER_ERR002 | product unavailable.    | 商品ステータスが購入不可             |
| 400        | API_ORDER_ERR003 | out of stock.           | 在庫不足                             |
| 500        | API_ERR999       | server error.           | バックエンド内で想定外のエラー発生時 |

```json
{
  "error_code": "API_ERR001",
  "message": "validation check error."
}
```

```json
{
  "error_code": "API_ORDER_ERR001",
  "message": "product not found."
}
```

```json
{
  "error_code": "API_ORDER_ERR002",
  "message": "product unavailable."
}
```

```json
{
  "error_code": "API_ORDER_ERR003",
  "message": "out of stock."
}
```

```json
{
  "error_code": "API_ERR999",
  "message": "server error."
}
```
