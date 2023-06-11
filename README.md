# todo_tasks.github.io
データベースを利用したTODOタスクの簡単なWebアプリケーション
ローカルホストで動作できるまでを実装

【以下実装までの手順】
・上記フォルダ・ファイルを格納したフォルダを作成(dirAとする)
/実行環境(個人でインストール)
 Node.js ver18.16.0
 Mysql   ver8.0.33 (後ほどmysql2をインストールします)
 
 /環境構築（以下コマンドをcmdで実行）
   npm install express-generator -g
   express --view=ejs dirA
   (以下 dirAに移動して実行)
   npm install
   npm install mysql2
   npm install knex
   npx knex init (knexfile,knex.jsはupしてある方を使う)
   npm install cookie-session
   npm install bcrypt
   npm install passport@0.5.3 
   npm install passport-local
   npm install connect-flash

  (以下はcmd上のmysqlでdb,table作成, exitで終了可)
   mysql -u root -p
   create database todo_app;
   create table todo_app.users (id int unsigned auto_increment not null, name varchar(255) unique, password varchar(255), PRIMARY KEY (id));
   use todo_app;
   create table todo_app.tasks (id int unsigned auto_increment not null, user_id int not null, content varchar(255) not null, PRIMARY KEY (id));

 /実装
 1. cmdでdirAフォルダに移動
 2. npm start　を実行
 3. webでlocalhost:3000に移動
 4. サインアップ・サインインしてTODOの追加・削除を利用
