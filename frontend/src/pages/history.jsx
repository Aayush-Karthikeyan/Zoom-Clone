import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom';
import "../App.css";

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {}
        }
        fetchHistory();
    }, [])  // eslint-disable-line react-hooks/exhaustive-deps

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
    }

    return (
        <div style={{ minHeight:'100vh', background:'var(--bg)', color:'var(--text)', fontFamily:"'DM Sans',sans-serif" }}>
            {/* Orbs */}
            <div className="orb orb-purple" style={{ width:400, height:400, top:'-100px', right:'-80px', opacity:0.12 }} />
            <div className="orb orb-blue"   style={{ width:300, height:300, bottom:'-80px', left:'-60px', opacity:0.1 }} />

            {/* Navbar */}
            <nav className="home-nav">
                <Link to="/" className="landing-logo" style={{ textDecoration:'none', color:'inherit' }}>
                    <div className="logo-icon">⚡</div>
                    Nexus
                </Link>
                <button className="btn-ghost" style={{ padding:'9px 20px', fontSize:'14px' }} onClick={() => navigate('/home')}>
                    ← Back to Home
                </button>
            </nav>

            {/* Content */}
            <div style={{ maxWidth:640, margin:'0 auto', padding:'60px 24px' }}>
                <div className="fade-up" style={{ marginBottom:40 }}>
                    <h1 style={{ fontFamily:"'Clash Display',sans-serif", fontSize:'2rem', fontWeight:700, letterSpacing:'-0.03em', marginBottom:8 }}>
                        Meeting History
                    </h1>
                    <p style={{ color:'var(--muted)', fontSize:'0.95rem' }}>Your recent Nexus calls</p>
                </div>

                {meetings.length === 0 ? (
                    <div className="glass fade-up-2" style={{ padding:'48px 32px', textAlign:'center', borderRadius:'var(--radius-lg)' }}>
                        <div style={{ fontSize:40, marginBottom:16 }}>📭</div>
                        <p style={{ color:'var(--muted)', fontSize:'0.95rem' }}>No meetings yet. Start one!</p>
                        <button className="btn-glow" style={{ marginTop:24, padding:'12px 28px' }} onClick={() => navigate('/home')}>
                            Start a meeting →
                        </button>
                    </div>
                ) : (
                    <div className="fade-up-2" style={{ display:'flex', flexDirection:'column', gap:12 }}>
                        {meetings.map((e, i) => (
                            <div key={i} className="glass" style={{ padding:'20px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', borderRadius:'var(--radius)', cursor:'pointer', transition:'border-color 0.2s, transform 0.2s' }}
                                onMouseEnter={el => el.currentTarget.style.borderColor='rgba(16,185,129,0.35)'}
                                onMouseLeave={el => el.currentTarget.style.borderColor='var(--border)'}
                                onClick={() => navigate(`/${e.meetingCode}`)}
                            >
                                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                                    <div style={{ width:40, height:40, borderRadius:12, background:'rgba(16,185,129,0.12)', border:'1px solid rgba(16,185,129,0.2)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:18 }}>
                                        🎥
                                    </div>
                                    <div>
                                        <p style={{ fontWeight:600, fontSize:'0.95rem', marginBottom:2 }}>{e.meetingCode}</p>
                                        <p style={{ color:'var(--muted)', fontSize:'0.8rem' }}>{formatDate(e.date)}</p>
                                    </div>
                                </div>
                                <span style={{ fontSize:13, color:'var(--green2)', fontWeight:600 }}>Rejoin →</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
