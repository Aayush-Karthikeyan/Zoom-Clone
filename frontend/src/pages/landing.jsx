import React, { useEffect, useRef } from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'

export default function LandingPage() {
    const router = useNavigate();
    const cursorRef = useRef(null);
    const posRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const currentRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const rafRef = useRef(null);

    useEffect(() => {
        const handleMove = (e) => {
            posRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMove);

        const lerp = (a, b, t) => a + (b - a) * t;

        const animate = () => {
            currentRef.current.x = lerp(currentRef.current.x, posRef.current.x, 0.07);
            currentRef.current.y = lerp(currentRef.current.y, posRef.current.y, 0.07);
            if (cursorRef.current) {
                cursorRef.current.style.transform =
                    `translate(${currentRef.current.x - 200}px, ${currentRef.current.y - 200}px)`;
            }
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div className="landing">

            {/* Lerp cursor glow */}
            <div ref={cursorRef} className="cursor-glow" />

            {/* Tunnel text background */}
            <div className="tunnel-wrap">
                <div className="tunnel-text">
                    <div className="tunnel-row">CONNECT</div>
                    <div className="tunnel-row">VIDEO · CALL</div>
                    <div className="tunnel-row">NEXUS</div>
                    <div className="tunnel-row">CONNECT</div>
                    <div className="tunnel-row">VIDEO · CALL</div>
                    <div className="tunnel-row">NEXUS</div>
                </div>
            </div>

            {/* Navbar */}
            <nav className="landing-nav">
                <Link to="/" className="landing-logo">
                    <div className="logo-icon">⚡</div>
                    Nexus
                </Link>
                <div className="landing-nav-links">
                    <button className="nav-link" onClick={() => router("/aljk23")}>Join as Guest</button>
                    <Link to="/auth" className="btn-ghost" style={{ padding:'9px 20px', fontSize:'13px' }}>Log in</Link>
                    <Link to="/auth" className="btn-glow" style={{ padding:'9px 20px', fontSize:'15px' }}>Get started →</Link>
                </div>
            </nav>

            {/* Full width editorial hero — no card */}
            <div className="landing-hero-full">
                <div className="hero-badge fade-up">
                    <span className="hero-badge-dot" />
                    Now in beta · Free to use
                </div>

                <h1 className="hero-h1-full fade-up-2">
                    Video calls,<br />
                    <span style={{ color:'#39ff14', WebkitTextStroke:'0px' }}>reimagined.</span>
                </h1>

                <p className="hero-sub-full fade-up-3">
                    Peer-to-peer video meetings. Real-time collaboration.<br />
                    No downloads. No friction. Just connect.
                </p>

                <div className="hero-cta fade-up-4">
                    <Link to="/auth" className="btn-glow">Start for free →</Link>
                    <button className="btn-ghost" onClick={() => router("/aljk23")}>Join as guest</button>
                </div>

                {/* Stats row */}
                <div className="hero-stats fade-up-4">
                    {[
                        { val: 'P2P', label: 'WebRTC direct' },
                        { val: '<50ms', label: 'Latency' },
                        { val: '∞', label: 'Free forever' },
                    ].map((s, i) => (
                        <div className="hero-stat" key={i}>
                            <span className="hero-stat-val">{s.val}</span>
                            <span className="hero-stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Marquee strip */}
            <div className="marquee-wrap">
                <div className="marquee-track">
                    {[...Array(3)].map((_, i) => (
                        <span className="marquee-content" key={i}>
                            VIDEO CALLS &nbsp;·&nbsp; SCREEN SHARE &nbsp;·&nbsp;
                            LIVE CHAT &nbsp;·&nbsp; PEER TO PEER &nbsp;·&nbsp;
                            WEBRTC &nbsp;·&nbsp; NEXUS &nbsp;·&nbsp;
                            NO DOWNLOADS &nbsp;·&nbsp; OPEN SOURCE &nbsp;·&nbsp;&nbsp;
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
