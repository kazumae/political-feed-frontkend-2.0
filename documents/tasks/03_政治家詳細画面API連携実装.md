# 政治家詳細画面API連携実装

## 1. タスクの詳細

### タスク名
政治家詳細画面のAPI連携実装

### 目的
現在静的データで表示されている政治家詳細画面をバックエンドAPIと連携させ、実際のデータを表示できるようにする。

### 関連ドキュメント
- 01_frontend/documents/01_API連携/README.md
- 01_frontend/documents/01_API連携/api_hooks.md
- documents/画面設計書/POL-DET-001_政治家詳細画面.md

### 優先度
高

## 2. 対応内容

以下の作業を実施する：

1. **静的データの置き換え**
   - `src/app/politicians/[id]/page.tsx`内のモックデータをAPIからの取得に置き換える
   - `usePoliticians` hookを使用して政治家詳細データを取得する
   - `getPoliticianById`メソッドを使用してIDに基づいたデータ取得を実装する
   - ローディング状態とエラー状態の処理を実装する

2. **タブコンテンツの実装**
   - プロフィールタブのデータをAPIから取得して表示する
   - 発言タブのデータを`useStatements` hookを使用して取得する
   - トピックタブのデータを`getPoliticianTopics`メソッドを使用して取得する

3. **フォロー機能の実装**
   - フォローボタンのクリック時に`followPolitician`/`unfollowPolitician`メソッドを呼び出す
   - フォロー状態の表示を実装する

## 3. 完了条件
- 政治家詳細画面がAPIから取得した実際の政治家データを表示できること
- 各タブが正常に動作し、APIから取得したデータを表示できること
- フォロー機能が正常に動作し、フォロー状態が適切に表示されること