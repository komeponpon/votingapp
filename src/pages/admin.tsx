// pages/admin.js
import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

const AdminPage = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [voteResults, setVoteResults] = useState({ normal: { yes: 0, no: 0 }, nash: { yes: 0, no: 0 }, stalin: [] });
  const { lastJsonMessage } = useWebSocket('ws://localhost:3000/vote', {
    share: true,
    filter: () => authenticated, // 認証済みの場合のみWebSocketを接続する
    onMessage: (event) => {
      const data = JSON.parse(event.data);
      setVoteResults(data.voteResults);
    },
  });

  useEffect(() => {
    if (authenticated && lastJsonMessage) {
      setVoteResults(lastJsonMessage.voteResults);
    }
  }, [authenticated, lastJsonMessage]);

  const handleLogin = () => {
    // ここでパスワードの認証をする
    if (password === 'secretpassword') {
      setAuthenticated(true);
    } else {
      alert('パスワードが間違っています');
    }
  };

  return (
    <div>
      {!authenticated ? (
        <div>
          <h1>管理者ページ</h1>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="パスワードを入力" />
          <button onClick={handleLogin}>ログイン</button>
        </div>
      ) : (
        <div>
          <h1>投票結果 (リアルタイム)</h1>
          <h2>通常モード</h2>
          <p>YES: {voteResults.normal.yes}</p>
          <p>NO: {voteResults.normal.no}</p>
          <h2>ナッシュ均衡モード</h2>
          <p>YES: {voteResults.nash.yes}</p>
          <p>NO: {voteResults.nash.no}</p>
          <h2>スターリンモード</h2>
          <ul>
            {voteResults.stalin.map((choice, index) => (
              <li key={index}>スターリンの選択: {choice}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminPage;