import { SetStateAction, useState } from "react";

const VotingApp = () => {
  const [mode, setMode] = useState('normal');
  const [voteCount, setVoteCount] = useState({yes: 0, no:0 });
  const [showResults, setShowResults] = useState(false);
  const [stalinsChoice, setStalinsChoice] = useState(null);

  const castVote = (choice:any) => {
    if (mode === 'stalin') {
      setStalinsChoice(choice);
      setShowResults(true);
    } else if (mode === 'nash'){
      const majority = getMajority();
      setVoteCount((prevCount) => ({
        yes: majority === 'はい' ? prevCount.yes + 1 : prevCount.yes,
        no: majority === 'いいえ' ? prevCount.no + 1 : prevCount.no,
      }));
      setShowResults(true);
    } else {
      setVoteCount((prevCount) => ({
        yes: choice === 'はい' ? prevCount.yes + 1 : prevCount.yes,
        no: choice === 'いいえ' ? prevCount.no + 1 : prevCount.no,
      }));
      setShowResults(true);
    }
  };

  const reset = () => {
    setStalinsChoice(null);
    setVoteCount({yes: 0, no: 0});
    setShowResults(false);
  };

  const getMajority = () => {
    return voteCount.yes > voteCount.no ? 'はい' : 'いいえ';
  };

  return (
    <div>
      <h1>匿名投票</h1>
      <div>
        投票モード:
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="normal">通常</option>
          <option value="stalin">スターリン</option>
          <option value="nash">サイレントマジョリティ</option>
        </select>
      </div>
      {!showResults ? (
        <div>
          {mode === 'nash' ? (
            <button onClick={castVote}>投票する</button>
          ) : (
            <>
              <button onClick={() => castVote('はい')}>はい</button>
              <button onClick={() => castVote('いいえ')}>いいえ</button>
            </>
          )}
        </div>
      ) : (
        <div>
          <h2>結果</h2>
          {mode === 'stalin' && <p>スターリンの選択: {stalinsChoice}</p>}
          {mode === 'nash' && (
            <p>
              サイレントマジョリティ: {getMajority()}に投票が加算されました <br />
              はい: {voteCount.yes}, いいえ: {voteCount.no}
            </p>
          )}
          {mode === 'normal' && (
            <p>
              はい: {voteCount.yes}, いいえ: {voteCount.no}
            </p>
          )}
          <button onClick={reset}>もう一度投票する</button>
        </div>
      )}
    </div>
  );
};

export default VotingApp;