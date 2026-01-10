# 認証・認可 仕様書

Supabase Auth を利用したログイン機能と、レシピの権限管理に関する仕様です。

## 目的
- レシピ作成は登録者のみ可能にする
- レシピ閲覧は未登録者でも可能にする
- レシピ編集・削除は作成者のみ可能にする

## 認証方式
- Supabase Auth（Email + Password）
- 認証状態は Supabase のセッションで管理

## 画面仕様
- ログイン画面
  - Email と Password の入力
  - 成功時はレシピ一覧へ遷移
- サインアップ画面
  - Email と Password の入力
  - 成功時はレシピ一覧へ遷移
- ログアウト
  - ヘッダーにログアウトボタンを配置

## 権限仕様
- 未認証ユーザー
  - レシピ一覧/詳細: 閲覧可
  - レシピ作成: 不可
  - レシピ編集/削除: 不可
- 認証済みユーザー
  - レシピ一覧/詳細: 閲覧可
  - レシピ作成: 可
  - レシピ編集/削除: 作成者のみ可

## データ仕様（Supabase）
テーブル: `recipes`
- `id`: bigint
- `title`: text
- `description`: text
- `time`: text
- `difficulty`: text
- `calories`: text
- `author`: text
- `likes`: text
- `tag`: text
- `servings`: text
- `ingredients`: text[]
- `steps`: text[]
- `created_at`: timestamptz
- `user_id`: uuid（作成者の `auth.users.id`）

## RLS ポリシー
`public.recipes` に対して以下を設定する。

```sql
alter table public.recipes enable row level security;

create policy "public read recipes"
on public.recipes
for select
to anon, authenticated
using (true);

create policy "authenticated insert recipes"
on public.recipes
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "owner update recipes"
on public.recipes
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "owner delete recipes"
on public.recipes
for delete
to authenticated
using (auth.uid() = user_id);
```

## 補足
- レシピ作成時は `user_id` を必ず保存する
- UI 上は未ログイン状態で「レシピを登録」ボタンを無効化/非表示にする
