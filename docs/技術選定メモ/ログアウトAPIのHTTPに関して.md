## HTTPメソッドについて

どちらかのメソッドで検討

- POST
  - Pro セキュリティ的な面ではこちらが一般的
  - Cons あまりRestfulではない
- DELETE
  - Pro JWTのトークンの破棄なので考慮はできそう
  - Cons CSRFの対策必要になる、フォームが使えない

以下の観点でPOSTを採用
- どちらもありであれば一般的なものであったほうが説明はしやすい方を選びたい
- RESTにこだわればDELETEもありだが、そもそもログアウトをAPI化するべきでないこと
- パスパラメーターにトークンがあるわけではなく、厳密にリソースかというとそういうくくりでもないため

## HTTPステータスについて

- 200: 成功という意味で良さそう
- 204: レスポンスボディを返さないのでこちらもあり

特別レスポンスの中身を返す必要もないので、204で採用

## 参考
- https://qiita.com/wasnot/items/949c6c4efe43ca0fa1cc
- https://blog.tokumaru.org/2013/02/purpose-and-implementation-of-the-logout-function.html

## 結論
- 決定日：2026/7/2
- HTTPメソッドはPOSTとする
- HTTPステータスは204で返す