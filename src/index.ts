declare const Cheerio: any; // Cheerioライブラリ用の型宣言

/**
 * example.com のコンテンツを取得し、Cheerioでパースした後、
 * HTMLコンテンツをコンソールに出力します。
 */
function scrapeAndLogExampleCom(): void {
  const url =
    'https://e5489.jr-odekake.net/e5489/cspc/CBDayTimeArriveSelRsvMyDiaPC?inputDepartStName=%91%E5%8D%E3&inputArriveStName=%93%8C%8B%9E&inputType=0&inputDate=20250620&inputHour=23&inputMinute=00&inputUniqueDepartSt=1&inputUniqueArriveSt=1&inputSearchType=2&inputTransferDepartStName1=%91%E5%8D%E3&inputTransferArriveStName1=%93%8C%8B%9E&inputTransferDepartStUnique1=1&inputTransferArriveStUnique1=1&inputTransferTrainType1=0001&inputSpecificTrainType1=2&inputSpecificBriefTrainKana1=%BB%BE%C4%BB%20000&SequenceType=0&inputReturnUrl=goyoyaku/campaign/sunriseseto_izumo/form.html&RTURL=https://www.jr-odekake.net/goyoyaku/campaign/sunriseseto_izumo/form.html&';

  try {
    console.log(`URLを取得中: ${url}`);
    // HTMLコンテンツを取得
    // HTTPの非200番台レスポンスをエラーとして扱わず、手動で処理するために muteHttpExceptions を true に設定
    const response = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    const responseCode = response.getResponseCode();

    if (responseCode === 200) {
      const htmlContent = response.getContentText();
      console.log('HTMLコンテンツの取得に成功しました。');

      // CheerioにHTMLを読み込ませる
      // Cheerio は Apps Script ライブラリからグローバル変数として提供されていることを想定
      const $ = Cheerio.load(htmlContent);
      console.log('HTMLコンテンツをCheerioに読み込みました。');

      // CheerioによってパースされたHTML全体の構造をログに出力
      console.log('--- CheerioによってパースされたHTMLコンテンツ ---');
      console.log($.html());
      console.log('--- パースされたHTMLコンテンツの終わり ---');
    } else {
      console.error(
        `URLの取得に失敗しました: ${url} ステータスコード: ${responseCode}`
      );
      // エラーレスポンスの先頭500文字を表示
      console.error(
        `レスポンス内容 (先頭500文字): ${response.getContentText().substring(0, 500)}`
      );
    }
  } catch (e: any) {
    console.error(`スクレイピング中にエラーが発生しました: ${e.toString()}`);
    if (e.stack) {
      console.error(`スタックトレース: ${e.stack}`);
    }
  }
}
