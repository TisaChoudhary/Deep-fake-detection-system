import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  if (token) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="container">
      <nav className="navbar" style={{ marginBottom: '3rem' }}>
        <div className="brand" style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
          🛡️ Deep Fake Detection
        </div>
        <div className="nav-links">
          <a href="#features" style={{ cursor: 'pointer' }}>Features</a>
          <a href="#about" style={{ cursor: 'pointer' }}>About</a>
          <a href="#faq" style={{ cursor: 'pointer' }}>FAQ</a>
          <Link to="/auth" className="btn" style={{ margin: 0 }}>Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section" style={{ marginBottom: '4rem' }}>
        <div className="hero">
          <div>
            <h1 style={{ fontSize: '3.5rem', lineHeight: '1.2', marginBottom: '1rem' }}>
              Detect AI-Generated Deepfakes With Confidence
            </h1>
            <p style={{ fontSize: '1.15rem', color: '#b7c2de', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Upload images or videos and instantly analyze whether they're authentic or AI-generated. Get confidence scores, detailed explanations, and heatmaps showing suspicious regions.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/auth" className="btn">Start Detecting Now</Link>
              <button 
                className="btn"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3>Advanced AI Detection</h3>
            <p style={{ color: '#b7c2de' }}>
              Powered by deep learning models trained on millions of images and videos
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section" style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>Key Features</h2>
        <div className="grid grid-3">
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📤</div>
            <h3>Easy Upload</h3>
            <p style={{ color: '#b7c2de' }}>
              Simply drag and drop your image or video. Support for all common formats.
            </p>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
            <h3>Instant Analysis</h3>
            <p style={{ color: '#b7c2de' }}>
              Get results in seconds with real-time processing and confidence scoring.
            </p>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎯</div>
            <h3>Detailed Reports</h3>
            <p style={{ color: '#b7c2de' }}>
              Heatmaps show exactly which regions appear manipulated or suspicious.
            </p>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📊</div>
            <h3>History Tracking</h3>
            <p style={{ color: '#b7c2de' }}>
              Keep records of all your detections for future reference and analysis.
            </p>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔒</div>
            <h3>Secure & Private</h3>
            <p style={{ color: '#b7c2de' }}>
              JWT authentication and encrypted connections protect your data.
            </p>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📱</div>
            <h3>Responsive Design</h3>
            <p style={{ color: '#b7c2de' }}>
              Works seamlessly on desktop, tablet, and mobile devices.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="about" className="section" style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>How It Works</h2>
        <div className="grid grid-2">
          <div className="card" style={{ padding: '2rem' }}>
            <h3>The Process</h3>
            <ol style={{ color: '#b7c2de', lineHeight: '2' }}>
              <li>Upload your image or video</li>
              <li>AI extracts facial regions and key features</li>
              <li>Deep learning model analyzes for synthetic artifacts</li>
              <li>Confidence score and explanation generated</li>
              <li>Heatmap highlights suspicious regions</li>
              <li>Results saved to your history</li>
            </ol>
          </div>
          <div className="card" style={{ padding: '2rem' }}>
            <h3>What We Detect</h3>
            <ul style={{ color: '#b7c2de', lineHeight: '2' }}>
              <li>✓ Synthetic face generation (deepfakes)</li>
              <li>✓ Face swapping artifacts</li>
              <li>✓ Unnatural facial expressions</li>
              <li>✓ Temporal inconsistencies (videos)</li>
              <li>✓ Eye and mouth manipulation</li>
              <li>✓ Lighting and shadow anomalies</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section" style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>Technology Stack</h2>
        <div className="grid grid-3">
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h4>Frontend</h4>
            <p style={{ color: '#b7c2de', fontSize: '0.95rem' }}>
              React.js • Vite • React Router
            </p>
          </div>
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h4>Backend</h4>
            <p style={{ color: '#b7c2de', fontSize: '0.95rem' }}>
              Flask • Python • JWT
            </p>
          </div>
          <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
            <h4>AI/ML</h4>
            <p style={{ color: '#b7c2de', fontSize: '0.95rem' }}>
              PyTorch • OpenCV • Deep Learning
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section" style={{ marginBottom: '4rem' }}>
        <h2 style={{ marginBottom: '2rem' }}>Frequently Asked Questions</h2>
        <div className="grid grid-2">
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4>What file formats are supported?</h4>
            <p style={{ color: '#b7c2de' }}>
              Images: JPG, PNG, GIF, WebP | Videos: MP4, AVI, MOV, MKV
            </p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4>How accurate is the detection?</h4>
            <p style={{ color: '#b7c2de' }}>
              Our model achieves 95%+ accuracy on standard benchmarks. Results depend on media quality.
            </p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4>Is my data secure?</h4>
            <p style={{ color: '#b7c2de' }}>
              Yes. We use SSL encryption, JWT tokens, and never share your data with third parties.
            </p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4>Can I download my reports?</h4>
            <p style={{ color: '#b7c2de' }}>
              Yes! Generate PDF reports for each detection with detailed analysis and heatmaps.
            </p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4>What about false positives?</h4>
            <p style={{ color: '#b7c2de' }}>
              Confidence scores indicate certainty. Always review results with the AI explanation.
            </p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <h4>Is there an API?</h4>
            <p style={{ color: '#b7c2de' }}>
              Yes! REST API available for developers. Documentation coming soon.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ marginBottom: '4rem' }}>
        <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>Ready to detect deepfakes?</h2>
          <p style={{ color: '#b7c2de', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Start protecting yourself and others from misinformation today.
          </p>
          <Link to="/auth" className="btn">Get Started Free</Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '2rem 0',
        textAlign: 'center',
        color: '#b7c2de'
      }}>
        <p>&copy; 2026 Deep Fake Detection System. All rights reserved.</p>
        <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>
          Built for final-year B.Tech CS project
        </p>
      </footer>
    </div>
  );
};

export default HomePage;