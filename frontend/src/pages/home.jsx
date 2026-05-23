import React, { useContext, useState, useRef, useCallback } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate, Link } from 'react-router-dom'
import "../App.css";
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [copied, setCopied] = useState(false);
    const [pendingCode, setPendingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);
    const spotlightRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!spotlightRef.current) return;
        const rect = spotlightRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spotlightRef.current.style.setProperty('--x', `${x}px`);
        spotlightRef.current.style.setProperty('--y', `${y}px`);
    }, []);

    const handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) return;
        await addToUserHistory(meetingCode);
        navigate(`/${meetingCode}`);
    };

    const handleNewMeeting = () => {
        const code = Math.random().toString(36).substring(2, 10);
        setPendingCode(code);
        navigate(`/${code}`);
    };

    const handleCopyLink = async () => {
        const code = Math.random().toString(36).substring(2, 10);
        const link = `${window.location.origin}/${code}`;
        await navigator.clipboard.writeText(link);
        setPendingCode(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

    return (
        <div className="home-page" ref={spotlightRef} onMouseMove={handleMouseMove}>
            {/* Cursor spotlight */}
            <div className="cursor-spotlight" />

            {/* Navbar */}
            <nav className="home-nav">
                <Link to="/" className="landing-logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className="logo-icon">⚡</div>
                    Nexus
                </Link>
                <div className="home-nav-right">
                    <Link to="/history" className="icon-btn" title="History">🕐</Link>
                    <button
                        className="btn-ghost"
                        style={{ padding: '9px 20px', fontSize: '14px' }}
                        onClick={() => { localStorage.removeItem("token"); navigate("/auth"); }}
                    >
                        Sign out
                    </button>
                </div>
            </nav>

            {/* Body */}
            <div className="home-body">
                <div className="home-greeting fade-up">
                    <h1>{greeting} 👋</h1>
                    <p>What would you like to do today?</p>
                </div>

                <div className="home-cards fade-up-2">
                    {/* New Meeting */}
                    <div className="action-card">
                        <div className="card-icon-wrap green">🎥</div>
                        <div>
                            <h3>New Meeting</h3>
                            <p>Start an instant meeting and share the link with anyone.</p>
                        </div>
                        <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
                            <button className="btn-glow" style={{ padding:'10px 22px', fontSize:'14px' }} onClick={handleNewMeeting}>
                                Start now →
                            </button>
                            <button className="btn-ghost" style={{ padding:'10px 18px', fontSize:'14px' }} onClick={handleCopyLink}>
                                {copied ? '✅ Copied!' : '🔗 Copy link'}
                            </button>
                        </div>
                        {copied && (
                            <p style={{ fontSize:12, color:'var(--green2)', marginTop:0 }}>
                                Link copied — share it to invite others!
                            </p>
                        )}
                    </div>

                    {/* Join Meeting */}
                    <div className="action-card join-card">
                        <div className="card-icon-wrap amber">🔗</div>
                        <div>
                            <h3>Join Meeting</h3>
                            <p>Enter a meeting code or paste a link to join a call.</p>
                        </div>
                        <div className="join-input-row">
                            <input
                                className="nexus-input"
                                placeholder="Enter code or paste link"
                                value={meetingCode}
                                onChange={e => setMeetingCode(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleJoinVideoCall()}
                            />
                            <button className="btn-small" onClick={handleJoinVideoCall}>Join</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(HomeComponent)