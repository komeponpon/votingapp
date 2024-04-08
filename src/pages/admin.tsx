import { useState, useEffect, SetStateAction } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const AdminPage = () => {
  const [voteData, setVoteData] = useState({
    mode: 'normal',
    voteCount: { yes: 0, no: 0 },
    stalinsChoice: null,
  });

  useEffect(() => {
    socket.on('voteUpdate', (data: SetStateAction<{ mode: string; voteCount: { yes: number; no: number; }; stalinsChoice: null; }>) => {
      setVoteData(data);
    });
  }, []);

  return (
    <div>
      <h1>管理者ページ</h1>
      <p>投票モード: {voteData.mode}</p>
      {voteData.mode === 'stalin' && (
        <p>スターリンの選択: {voteData.stalinsChoice}</p>
      )}
      <p>
        はい: {voteData.voteCount.yes}, いいえ: {voteData.voteCount.no}
      </p>
    </div>
  );
};

export default AdminPage;