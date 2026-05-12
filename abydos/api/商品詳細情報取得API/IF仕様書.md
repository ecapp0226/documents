# 商品詳細情報取得API

## Endpoint
/products/:id

## HTTP Methods
GET

## Request
| 物理名     | 論理名     | Required | 型     | Note                 |
| ---------- | ---------- | -------- | ------ | -------------------- |
| product_id | ロット番号 | 〇       | Number | パスパラメータで指定 |
|            |            |          |        |                      |

## Response
**正常系**

| 物理名       | 論理名         | Required | 型     | Note                                                     |
| ------------ | -------------- | -------- | ------ | -------------------------------------------------------- |
| product_id   | ロット番号     | 〇       | Number |                                                          |
| product_name | 商品名         | 〇       | String |                                                          |
| description  | 商品説明       | 〇       | String |                                                          |
| image_url    | 商品画像URL    | 〇       | String | S3のURL                                                  |
| shop_id      | 店舗Id         | 〇       | Number |                                                          |
| category_id  | カテゴリId     | 〇       | Number |                                                          |
| price        | 価格           | 〇       | Number | 税種別に応じた計算はストレージの時点で実施されています。 |
| tax_type     | 税種別         | 〇       | String | I:内税 / E:外税 / N:税無し                               |
| rating       | 評価スコア     | 〇       | Number | 例: 4.0                                                  |
| review_count | レビュー件数   | 〇       | Number |                                                          |
| stock        | 在庫数         | 〇       | Number |                                                          |
| status       | 販売ステータス | 〇       | String | O:販売中 / S:売切 / D:販売終了                           |
| created_at   | 作成日         | 〇       | Number | UnixTimestamp(ミリ秒)                                    |

```json
{
  "product_id": 1,
  "product_name": "プレミアムコットンTシャツ",
  "description": "上質なオーガニックコットン100%使用。肌触りが良く、日常使いに最適です。",
  "image_url": "https://s3.ap-northeast-1.amazonaws.com/bucket/products/1.jpg",
  "shop_id": 10001,
  "category_id": 32,
  "price": 2480,
  "tax_type": "I",
  "rating": 4.0,
  "review_count": 12,
  "stock": 50,
  "status": "O",
  "created_at": 1496918153734
}
```

**異常系**

| HttpStatus | error_code | message                 | 条件                                 |
| ---------- | ---------- | ----------------------- | ------------------------------------ |
| 400        | API_ERR001 | validation check error. | バリデーションエラー                 |
| 404        | API_ERR004 | data not found.         | 指定した商品が存在しない場合         |
| 500        | API_ERR999 | server error.           | バックエンド内で想定外のエラー発生時 |

```json
{
  "error_code": "API_ERR001",
  "message": "validation check error."
}
```

```json
{
  "error_code": "API_ERR002",
  "message": "data not found."
}
```
  
```json
{
  "error_code": "API_ERR999",
  "message": "server error."
}
```