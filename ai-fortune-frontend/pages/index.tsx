import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [hanja, setHanja] = useState("");
  const [birth, setBirth] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("https://your-render-api.onrender.com/fortune", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, hanja, birth, time }),
      });
      const data = await res.json();
      if (data.result) setResult(data.result);
      else setResult(data.error || "운세 정보를 가져오지 못했습니다.");
    } catch (err) {
      setResult("운세 요청 중 오류가 발생했습니다.");
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20, fontFamily: "sans-serif" }}>
      <h1>AI 사주 운세</h1>
      <form onSubmit={handleSubmit}>
        <label>이름:<br/><input value={name} onChange={e => setName(e.target.value)} required /></label><br/><br/>
        <label>한자이름:<br/><input value={hanja} onChange={e => setHanja(e.target.value)} /></label><br/><br/>
        <label>생년월일 (YYYY-MM-DD):<br/><input value={birth} onChange={e => setBirth(e.target.value)} required /></label><br/><br/>
        <label>태어난 시간:<br/><input value={time} onChange={e => setTime(e.target.value)} /></label><br/><br/>
        <button type="submit" disabled={loading}>{loading ? "분석 중..." : "운세 보기"}</button>
      </form>

      <hr/>
      <div>
        <h2>운세 결과</h2>
        <p>{result}</p>
      </div>
    </div>
  );
}
