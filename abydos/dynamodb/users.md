# users テーブル設計書

## 概要
ユーザー認証・ログイン用テーブル。

## テーブル定義

| 属性名        | 型  | Key     | 説明                             |
| ------------- | --- | ------- | -------------------------------- |
| user_id       | N   | PK      | ユーザーID                       |
| email         | S   | GSI1-PK | メールアドレス（ログイン検索用） |
| password_hash | S   | -       | bcryptハッシュ化パスワード       |
| user_name     | S   | -       | 表示名                           |
| created_at    | N   | -       | UnixTimestamp(ms)                |

## LSI

なし

## GSI

### email-index

| 属性名 | Key | Projection |
| ------ | --- | ---------- |
| email  | PK  | ALL        |

## キャパシティモード
オンデマンド

## 備考
- パスワードは bcrypt でハッシュ化して保存
- JWT発行後はステートレス認証のため、セッション管理テーブルは不要
