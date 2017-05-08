## 概要
現在アップローダー部分のみ  
セキュリティノーガード戦法なので取り扱いに注意

## アップローダーセットアップメモ
### S3
1. 適当なバケット整備
2. CORS設定を`cors.xml`を参考に設定（オリジンは制限推奨）

### Cognito
1. Identity Pool作成、その時にUnauthenticated identity をON
2. IAMロールが作成されるので、Unauth向けの方に`uploadRole.json`を参考にポリシー追加

### ビルド
1. `index.jsx`へパラメータ追記
2. `yarn install` (yarnが入っていない場合は入れる)
3. `yarn start`
4. `dist/index.html`へアクセス、動作すればOK 
