export interface AudioEntry {
  text: string;
  fileName: string;
  description: string;
}

export type AudioGroups = AudioEntry[][];

export const audios: AudioGroups = [
  [
    {
      text: 'ﾊﾑﾁでｽ‼️',
      fileName: 'はむちです',
      description: 'しっかりとしたハムチの自己紹介',
    },
    {
      text: 'ﾊﾑ、ｽﾀｰ',
      fileName: 'はむすたー、へっへっへっへっ',
      description: '流れ星ｷﾞﾌﾄ受け取り時のハムチの鳴き声',
    },
    {
      text: 'ﾊﾑ、ｽﾀｰ (x10)',
      fileName: 'はむすたー、へっへっへっへっ（x10）',
      description: '流れ星ｷﾞﾌﾄ受け取り時の長めのハムチの鳴き声',
    },
    {
      text: '🖐️へらに^_^す',
      fileName: 'へらにす',
      description:
        'おやすみなさいという意味（配信終了時にリスナーの好きなひらがなを募集した際に決定）',
    },
    {
      text: 'あと5分あれば',
      fileName: 'あと5分あれば',
      description:
        'おやすみなさいという意味②（配信終了時にリスナーの好きなひらがなを募集した際に決定）',
    },
    {
      text: 'ｳﾏﾏﾁﾏﾁﾏ(short)',
      fileName: 'ｳﾏﾏﾁﾏﾁﾏ(short)',
      description:
        'ｷﾞﾌﾄや弾幕をいただいてありがとうございますという意の鳴き声（短いver）',
    },
    {
      text: 'ｳﾏﾏﾁﾏﾁﾏ',
      fileName: 'ｳﾏﾏﾁﾏﾁﾏ',
      description: 'ｷﾞﾌﾄや弾幕をいただいてありがとうございますという意の鳴き声',
    },
    {
      text: 'ｻｽ理',
      fileName: 'ｻｽ理',
      description: '「さすが理系！」の略称',
    },
  ],
  [
    {
      text: 'ﾁｬｲﾁｬｲﾁｬｲ',
      fileName: 'ﾁｬｲﾁｬｲﾁｬｲ',
      description: '「配信に来てくれてありがとう！いらっしゃい！」という意',
    },
    {
      text: 'ｯﾀｸ…ｼｬｱﾈｪﾅｧ……',
      fileName: 'ったく ',
      description: '「まったくもう、、、しょうがないな、、、」という意',
    },
    {
      text: 'ﾊﾞﾁﾝ',
      fileName: 'ばちん',
      description: '機材を繋ぎなおす際の音を口頭で伝えている様',
    },
    {
      text: 'ﾏﾂｷﾁ‼️',
      fileName: 'ﾏﾂｷﾁ',
      description: 'おみくじで末吉が出た際の鳴き声',
    },
    {
      text: '感性変‼️',
      fileName: '感性変',
      description: '相手の感性を疑う際に叫ぶ鳴き声',
    },
    {
      text: 'ｳﾙﾁｪ‼️',
      fileName: 'ｳﾙﾁｪｴ',
      description: '相手が煩い際や都合の悪いことを言われた際の威嚇',
    },
    {
      text: '結婚結婚結婚‼️',
      fileName: '結婚結婚結婚',
      description: '結婚に関するｷﾞﾌﾄを貰った際の鳴き声',
    },
    {
      text: 'ﾊｲﾊｲ沐浴',
      fileName: '沐浴',
      description: '「だこちて」などのコメントが飛び交った際に沐浴をさせるため',
    },
  ],
  [
    {
      text: 'ｼﾈﾄﾞｽ',
      fileName: 'ｼﾈﾄﾞｽ',
      description: '京都ポケモン',
    },
    {
      text: 'ﾜﾀﾞﾜﾀﾞﾜﾀﾞﾜﾀﾞ',
      fileName: 'ﾜﾀﾞﾜﾀﾞﾜﾀﾞﾜﾀﾞ',
      description: '待機時間の鳴き声',
    },
    {
      text: 'ｻｲﾃｰ‼️ｳﾝﾁ‼️',
      fileName: 'サイテー！ウンチ！',
      description: '相手を罵倒し蔑む際の言葉',
    },
    {
      text: 'ｱﾁ‼️',
      fileName: 'ｱﾁ',
      description: '「アツイ‼️」と思った際に叫ぶ単語',
    },
    {
      text: 'ありゃとありゃと',
      fileName: 'ありゃとありゃと',
      description:
        '「誠にありがとうございます。ありがとうございます。」という感謝の意',
    },
    {
      text: 'ﾊﾞﾊﾞﾝﾁ‼️',
      fileName: 'ﾊﾞﾊﾞﾝﾁ',
      description: '「バイバイ、また明日ね」という意',
    },
    {
      text: '了解',
      fileName: '了解',
      description: '了解をしまくる際の言葉',
    },
    {
      text: 'ありがとっ',
      fileName: 'ありがとっ',
      description: '「ありがと～！」という感謝の意',
    },
  ],
  [
    {
      text: 'ちょうど終わるとこ',
      fileName: 'ちょうど終わるとこ',
      description: '配信がちょうど終わるタイミングで入室があった際の挨拶',
    },
    {
      text: 'ｼｬﾗｸｾｪ‼️',
      fileName: 'ｼｬﾗｸｾｪ',
      description: 'しゃらくさい出来事が起きた際に吐き捨てる言葉',
    },
    {
      text: '涙の味もしないや',
      fileName: '涙の味もしないや',
      description: '罰ゲームポエムツイートをした際の1文',
    },
    {
      text: 'ボケナス',
      fileName: 'ボケナス',
      description: '「ええ加減にしろこの野郎」という意味',
    },
    {
      text: '次はシバきます',
      fileName: '次はシバきます',
      description: '「次は無いと思え」という意味',
    },
    {
      text: 'ﾔﾍﾞ‼️',
      fileName: 'ﾔﾍﾞ',
      description: 'ヤバイ‼️大焦りの様',
    },
    {
      text: '光あﾝねﾝ',
      fileName: '光あﾝねﾝ',
      description:
        '胡散臭いLPを作った際に救いの言葉として記載したもの\n参考資料⇒https://april.hamuchi.world',
    },
    {
      text: '半返しするねー！',
      fileName: '半返しするねー！',
      description: '結婚ｷﾞﾌﾄに関するレスポンスコメント',
    },
  ],
  [
    {
      text: 'ほぁ',
      fileName: 'ほぁ',
      description: '鳴き声（意味無）',
    },
    {
      text: 'ﾎﾟｲﾝﾎﾟｲﾝ',
      fileName: 'ﾎﾟｲﾝﾎﾟｲﾝ',
      description:
        'ペットボトルで頭を一定のリズムで叩く際の音（配信中に頻繁にみられる行動）',
    },
    {
      text: 'おはよおはよ',
      fileName: 'おはよおはよおはよ',
      description:
        '「おはようございます。おはようございます。」という明るい挨拶',
    },
    {
      text: 'ﾅｲﾊﾞﾁ',
      fileName: 'ﾅｲﾊﾞﾁﾅﾊﾞﾁﾅﾊﾞﾊﾞﾁﾏ',
      description:
        '「ナイスバッジ獲得！」の略。配信時にサポートバッジを取って貰った際の鳴き声',
    },
    {
      text: 'ﾎﾞﾍﾎﾞﾍﾎﾞﾍ',
      fileName: 'ﾎﾞﾍﾎﾞﾍﾎﾞﾍ',
      description: '思考中の鳴き声（意味無）',
    },
    {
      text: 'ﾌﾟｽｯ',
      fileName: 'ﾌﾟｽｯ',
      description: '薔薇のｷﾞﾌﾄを貰った際に薔薇が刺さった音をあらわしたもの',
    },
    {
      text: 'めろりーん',
      fileName: 'めろりーん',
      description: 'あまりにメロメロになっている様子',
    },
    {
      text: 'しゃるどね',
      fileName: 'しゃるどねーしょーん',
      description: '口が気持ちいいから発する鳴き声（意味無）',
    },
  ],
  [
    {
      text: 'カーー',
      fileName: 'カーー',
      description: '大変照れた際の赤面の様子を表している',
    },
    {
      text: 'ちゆ',
      fileName: 'ちゆ',
      description: '「ちゅ♡」プリチー愛嬌レベル34',
    },
    {
      text: 'ウェ～',
      fileName: 'ウェ～',
      description: 'イヤなコトがあった際の鳴き声',
    },
    {
      text: 'んーーーまっ！',
      fileName: 'んーーーまっ！',
      description: '投げキッス。プリチー愛嬌レベル45',
    },
    {
      text: 'ﾍﾞﾍﾞﾝ‼️',
      fileName: 'ﾍﾞﾍﾞﾝ',
      description: '王としての威厳を見せつける威風堂々たる態度',
    },
    {
      text: 'ぶぇっ',
      fileName: 'ぶぇっ',
      description: '少しの驚きの際の鳴き声（意味無）',
    },
    {
      text: 'ｺｺｯ‼️',
      fileName: 'ｺｺｯ',
      description: '何かを説明する際の鳴き声',
    },
  ],
];

