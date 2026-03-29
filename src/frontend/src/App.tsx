import { useCallback, useEffect, useRef, useState } from "react";
import { useActor } from "./hooks/useActor";

// ── Types ──────────────────────────────────────────────────────────────────
type Page = "password" | "welcome" | "memories" | "mid" | "promise";

interface Memory {
  image: string;
  caption: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
const MEMORIES: Memory[] = [
  {
    image:
      "/assets/uploads/whatsapp_image_2026-03-30_at_01.23.39-019d3b38-3822-75cf-8bdb-726121eecb66-1.jpeg",
    caption:
      "Jab tum chup chaap so rahi hoti ho…\nmain bas tumhe dekh kar sukoon mehsoos karta hoon ❤️",
  },
  {
    image:
      "/assets/uploads/whatsapp_image_2026-03-30_at_01.23.38-019d3b38-3891-7794-adb2-e906b2698542-3.jpeg",
    caption:
      "In raaton mein na koi shor hota hai…\nbas tum aur meri feelings hoti hain 🌙",
  },
  {
    image:
      "/assets/uploads/whatsapp_image_2026-03-30_at_01.23.40-019d3b38-383c-778b-8feb-28864c4e7169-2.jpeg",
    caption: "Ye wo raat hai jab neend se zyada tum zaroori thi 💫",
  },
  {
    image:
      "/assets/uploads/whatsapp_image_2026-03-30_at_01.23.41-019d3b38-3a84-77d8-aad2-64a8bedf9f31-4.jpeg",
    caption:
      "Tumhara yun so jaana…\naur main ghanton tak jaagta reh jaata hoon 🌙",
  },
  {
    image:
      "/assets/uploads/whatsapp_image_2026-03-30_at_01.23.40_1-019d3b38-3a72-70ed-8a86-8bb52497e0ae-5.jpeg",
    caption: "Tumhari ye masoomiyat hi meri sabse badi weakness hai 🥺",
  },
  {
    image:
      "/assets/uploads/whatsapp_image_2026-03-30_at_01.23.40_2-019d3b38-3ab4-7574-89c9-fe0c57daeedb-6.jpeg",
    caption: "Har raat ye feeling…\nki kaash main wahan hota tumhare paas 💫",
  },
  {
    image:
      "/assets/uploads/whatsapp_image_2026-03-30_at_01.23.41_1-019d3b38-3ac3-7772-afc2-d797b4bcf850-7.jpeg",
    caption:
      "Is neend mein kitna sukoon hai tumhara…\nkash main hamesha aise dekh sakta 🥺❤️",
  },
];

// ── Floating Particles ─────────────────────────────────────────────────────
interface Particle {
  id: number;
  x: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  drift: number;
  symbol: string;
}

function FloatingParticles() {
  const particles: Particle[] = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 10 + Math.random() * 12,
    opacity: 0.3 + Math.random() * 0.5,
    duration: 8 + Math.random() * 10,
    delay: Math.random() * 12,
    drift: (Math.random() - 0.5) * 60,
    symbol: ["❤️", "✨", "💫", "🌙", "⭐", "❤️", "💕", "✨"][
      Math.floor(Math.random() * 8)
    ],
  }));

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {particles.map((p) => (
        <span
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            bottom: "-5%",
            fontSize: `${p.size}px`,
            opacity: p.opacity,
            animation: `floatUp ${p.duration}s ${p.delay}s ease-in-out infinite`,
            ["--drift" as string]: `${p.drift}px`,
            ["--start-opacity" as string]: p.opacity,
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
}

// ── Heart Burst ────────────────────────────────────────────────────────────
function HeartBurst({ onDone }: { onDone: () => void }) {
  const bursts = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: 30 + Math.random() * 40,
    y: 20 + Math.random() * 60,
    delay: Math.random() * 0.5,
    size: 16 + Math.random() * 16,
  }));

  useEffect(() => {
    const t = setTimeout(onDone, 1200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {bursts.map((b) => (
        <span
          key={b.id}
          style={{
            position: "absolute",
            left: `${b.x}%`,
            top: `${b.y}%`,
            fontSize: `${b.size}px`,
            animation: `heartBurst 1s ${b.delay}s ease forwards`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}

// ── Password Page ──────────────────────────────────────────────────────────
function PasswordPage({ onSuccess }: { onSuccess: () => void }) {
  const { actor, isFetching } = useActor();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shaking, setShaking] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!actor || loading) return;
      setLoading(true);
      setError("");
      try {
        const ok = await actor.verifyPassword(password);
        if (ok) {
          onSuccess();
        } else {
          setError("Galat password hai 💔");
          setShaking(true);
          setTimeout(() => setShaking(false), 600);
        }
      } catch {
        setError("Kuch gadbad hui... dobara try karo 💔");
      } finally {
        setLoading(false);
      }
    },
    [actor, loading, password, onSuccess],
  );

  return (
    <div
      className="relative min-h-dvh flex flex-col items-center justify-center page-enter"
      style={{
        background:
          "linear-gradient(135deg, #050B16 0%, #0B1630 60%, #0D0A1F 100%)",
      }}
    >
      <FloatingParticles />
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-sm">
        <div
          className="text-6xl"
          style={{ filter: "drop-shadow(0 0 20px rgba(231,181,174,0.6))" }}
        >
          🔒
        </div>
        <h1
          className="font-playfair text-4xl font-bold text-center glow-text-pulse"
          style={{ color: "#F3EEE9" }}
        >
          🌙 Divya ke Liye
        </h1>
        <p
          className="font-lato text-sm text-center"
          style={{ color: "#8BA0C0" }}
        >
          Sirf tumhare liye banaya hai ye jagah ❤️
        </p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className={shaking ? "shake" : ""}>
            <input
              data-ocid="password.input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password..."
              className="w-full px-5 py-4 rounded-full text-center font-lato text-lg outline-none"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(231,181,174,0.3)",
                color: "#F3EEE9",
                backdropFilter: "blur(8px)",
                letterSpacing: "0.2em",
              }}
            />
          </div>

          {error && (
            <p
              data-ocid="password.error_state"
              className="text-center font-lato text-sm"
              style={{ color: "#E7B5AE" }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            data-ocid="password.submit_button"
            disabled={loading || isFetching}
            className="btn-rose w-full py-4 rounded-full font-playfair text-lg font-bold"
            style={{ color: "#0B1630" }}
          >
            {loading ? "Checking... ✨" : "Unlock ❤️"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Welcome Page ───────────────────────────────────────────────────────────
function WelcomePage({ onEnter }: { onEnter: () => void }) {
  return (
    <div
      className="relative min-h-dvh flex flex-col items-center justify-center page-enter-slow"
      style={{
        background:
          "linear-gradient(135deg, #050B16 0%, #0B1630 60%, #0D0A1F 100%)",
      }}
    >
      <FloatingParticles />
      <div className="relative z-10 flex flex-col items-center gap-10 px-8 text-center max-w-sm">
        <div
          className="text-7xl"
          style={{
            animation: "pulseGlow 3s ease-in-out infinite",
            filter: "drop-shadow(0 0 25px rgba(231,181,174,0.7))",
          }}
        >
          ❤️
        </div>
        <div>
          <h1
            className="font-playfair text-5xl font-bold glow-text-pulse"
            style={{ color: "#F3EEE9", marginBottom: "1rem" }}
          >
            Divya,
          </h1>
          <p
            className="font-playfair italic text-xl leading-relaxed"
            style={{
              color: "#D6D0CB",
              textShadow: "0 0 15px rgba(231,181,174,0.4)",
            }}
          >
            ye raaton ki yaadein…
            <br />
            meri sabse pyari duniya hain ❤️
          </p>
        </div>
        <button
          type="button"
          data-ocid="welcome.primary_button"
          onClick={onEnter}
          className="btn-rose px-10 py-4 rounded-full font-playfair text-lg font-bold"
          style={{ color: "#0B1630" }}
        >
          Enter 🌙
        </button>
      </div>
    </div>
  );
}

// ── Memory Page ────────────────────────────────────────────────────────────
function MemoryPages({
  onNext,
  onBack,
}: { onNext: () => void; onBack: () => void }) {
  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);
  const memory = MEMORIES[index];

  const goNext = () => {
    if (index === MEMORIES.length - 1) {
      onNext();
    } else {
      setIndex((i) => i + 1);
      setKey((k) => k + 1);
    }
  };

  const goBack = () => {
    if (index === 0) {
      onBack();
    } else {
      setIndex((i) => i - 1);
      setKey((k) => k + 1);
    }
  };

  return (
    <div
      className="relative min-h-dvh flex flex-col items-center justify-between py-8 px-4 page-enter"
      style={{
        background:
          "linear-gradient(135deg, #050B16 0%, #0B1630 60%, #0D0A1F 100%)",
      }}
    >
      <FloatingParticles />

      {/* Counter */}
      <div
        className="relative z-10 font-lato text-sm"
        style={{ color: "#8BA0C0" }}
      >
        💫 {index + 1} / {MEMORIES.length}
      </div>

      {/* Image + Caption */}
      <div
        key={key}
        className="relative z-10 flex flex-col items-center gap-5 w-full max-w-sm memory-fade"
      >
        <img
          src={memory.image}
          alt={`Memory ${index + 1}`}
          className="img-glow rounded-2xl object-cover w-full"
          style={{ maxHeight: "55vh", objectFit: "cover" }}
        />
        <p
          className="font-playfair italic text-center text-lg leading-relaxed glow-text"
          style={{ color: "#F3EEE9", whiteSpace: "pre-line" }}
        >
          {memory.caption}
        </p>
      </div>

      {/* Navigation */}
      <div className="relative z-10 flex gap-4 w-full max-w-sm justify-between">
        <button
          type="button"
          data-ocid="memories.secondary_button"
          onClick={goBack}
          className="flex-1 py-3 rounded-full font-playfair font-bold"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(231,181,174,0.2)",
            color: "#D6D0CB",
          }}
        >
          Back 💫
        </button>
        <button
          type="button"
          data-ocid="memories.primary_button"
          onClick={goNext}
          className="flex-1 py-3 rounded-full font-playfair font-bold btn-rose"
          style={{ color: "#0B1630" }}
        >
          Next ❤️
        </button>
      </div>
    </div>
  );
}

// ── Mid Message Page ───────────────────────────────────────────────────────
function MidMessagePage({ onNext }: { onNext: () => void }) {
  return (
    <div
      className="relative min-h-dvh flex flex-col items-center justify-center page-enter-slow"
      style={{
        background:
          "linear-gradient(135deg, #050B16 0%, #0B1630 60%, #0D0A1F 100%)",
      }}
    >
      <FloatingParticles />
      <div className="relative z-10 flex flex-col items-center gap-10 px-8 text-center max-w-sm">
        <p
          className="font-playfair italic text-3xl leading-loose glow-text-pulse"
          style={{ color: "#F3EEE9" }}
        >
          Har raat tumhe dekhna…
          <br />
          <span style={{ color: "#E7B5AE" }}>meri aadat ban chuki hai ❤️</span>
        </p>
        <button
          type="button"
          data-ocid="mid.primary_button"
          onClick={onNext}
          className="btn-rose px-10 py-4 rounded-full font-playfair text-lg font-bold"
          style={{ color: "#0B1630" }}
        >
          Aage Chalo 💫
        </button>
      </div>
    </div>
  );
}

// ── Final Promise Page ─────────────────────────────────────────────────────
function FinalPromisePage() {
  const [burst, setBurst] = useState(false);

  const handleButtonClick = () => {
    setBurst(true);
  };

  return (
    <div
      className="relative min-h-dvh flex flex-col items-center justify-center page-enter-slow"
      style={{
        background:
          "linear-gradient(135deg, #050B16 0%, #0B1630 60%, #0D0A1F 100%)",
      }}
    >
      <FloatingParticles />
      {burst && <HeartBurst onDone={() => setBurst(false)} />}

      <div className="relative z-10 flex flex-col items-center gap-6 px-8 text-center max-w-sm">
        <h1
          className="font-playfair text-5xl font-bold glow-text-pulse promise-line-1"
          style={{ color: "#F3EEE9" }}
        >
          Divya,
        </h1>

        <div className="flex flex-col gap-3">
          <p
            className="font-playfair italic text-xl leading-relaxed promise-line-2"
            style={{ color: "#D6D0CB" }}
          >
            main promise karta hoon…
          </p>
          <p
            className="font-playfair italic text-xl leading-relaxed promise-line-3"
            style={{ color: "#E7B5AE" }}
          >
            main hamesha tumhare saath rahunga ❤️
          </p>
          <p
            className="font-playfair italic text-lg leading-relaxed promise-line-4"
            style={{ color: "#D6D0CB", marginTop: "0.5rem" }}
          >
            Chahe kuch bhi ho jaye,
          </p>
          <p
            className="font-playfair italic text-lg leading-relaxed promise-line-5"
            style={{ color: "#D6D0CB" }}
          >
            main kabhi tumhara saath nahi chhodunga 💯
          </p>
          <p
            className="font-playfair italic text-lg leading-relaxed promise-line-6"
            style={{ color: "#E7B5AE", marginTop: "0.5rem" }}
          >
            Tumhari khushi hi meri sabse badi priority hai 💫
          </p>
          <p
            className="font-playfair italic text-lg leading-relaxed promise-line-7"
            style={{ color: "#D6D0CB", marginTop: "0.5rem" }}
          >
            Ye koi promise nahi…
          </p>
          <p
            className="font-playfair italic text-xl font-bold leading-relaxed promise-line-8"
            style={{ color: "#F3EEE9" }}
          >
            meri zindagi ka sach hai ❤️
          </p>
        </div>

        <div
          className="flex gap-4 mt-4"
          style={{ animation: "slideUp 0.7s 2.8s ease both", opacity: 0 }}
        >
          <button
            type="button"
            data-ocid="promise.primary_button"
            onClick={handleButtonClick}
            className="btn-rose px-8 py-4 rounded-full font-playfair text-lg font-bold"
            style={{ color: "#0B1630" }}
          >
            Hamesha ❤️
          </button>
          <button
            type="button"
            data-ocid="promise.secondary_button"
            onClick={handleButtonClick}
            className="btn-rose px-8 py-4 rounded-full font-playfair text-lg font-bold"
            style={{ color: "#0B1630" }}
          >
            Forever ♾️
          </button>
        </div>
      </div>

      {/* Footer */}
      <p
        className="absolute bottom-4 font-lato text-xs"
        style={{ color: "rgba(139,160,192,0.4)" }}
      >
        © {new Date().getFullYear()}. Built with{" "}
        <span style={{ color: "#C8948E" }}>❤️</span> using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "rgba(139,160,192,0.5)" }}
        >
          caffeine.ai
        </a>
      </p>
    </div>
  );
}

// ── App Root ───────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<Page>("password");
  const pageRef = useRef<Page>("password");

  const navigate = (p: Page) => {
    pageRef.current = p;
    setPage(p);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background:
          "linear-gradient(135deg, #050B16 0%, #0B1630 50%, #0D0A1F 100%)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "430px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {page === "password" && (
          <PasswordPage onSuccess={() => navigate("welcome")} />
        )}
        {page === "welcome" && (
          <WelcomePage onEnter={() => navigate("memories")} />
        )}
        {page === "memories" && (
          <MemoryPages
            onNext={() => navigate("mid")}
            onBack={() => navigate("welcome")}
          />
        )}
        {page === "mid" && (
          <MidMessagePage onNext={() => navigate("promise")} />
        )}
        {page === "promise" && <FinalPromisePage />}
      </div>
    </div>
  );
}
