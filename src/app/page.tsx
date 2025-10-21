export default function Home() {
  return (
    <div className="space-y-6">
      <div className="bg-card p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold">第4四半期 全社ミーティング</h2>
        <p className="text-sm text-muted-foreground">CEOからのメッセージ</p>
        <div className="mt-4 aspect-video bg-black rounded-md flex items-center justify-center">
          <p className="text-white">（ビデオプレースホルダー）</p>
        </div>
      </div>

      <div className="bg-card p-4 rounded-lg shadow">
        <h3 className="font-semibold mb-2">経営層からのメッセージ</h3>
        <div className="space-y-4">
           {/* メッセージカードのプレースホルダー */}
          <div className="border p-3 rounded-lg">
            <p className="font-bold">田中, CEO</p>
            <p className="text-sm">第4四半期の戦略</p>
          </div>
          <div className="border p-3 rounded-lg">
            <p className="font-bold">佐藤, CTO</p>
            <p className="text-sm">DX推進の進捗</p>
          </div>
        </div>
      </div>
    </div>
  );
}
