import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-hero">
        <div>
          <h1>Hello, I'm Emma.</h1>
          <p>
            Paper &amp; Ink is my small corner of the internet dedicated to the things I love most:
            beautiful stationery, the joy of a well-organized notebook, and the quiet satisfaction
            of a productive study session.
          </p>
          <p>
            I started this blog in 2022 as a way to document my bullet journaling practice and share
            the products I had fallen in love with. It has since grown into a community of fellow
            paper enthusiasts from all over the world, and I could not be more grateful.
          </p>
          <p>
            When I am not writing here, you will find me in a bookshop, at my desk with a cup of
            Earl Grey, or attempting (and usually failing) to keep my washi tape collection at a
            reasonable size.
          </p>
        </div>
        <div className="about-portrait">
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--color-green)', opacity: 0.4 }}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      </div>

      <div className="about-content">
        <div className="about-block">
          <h2>What I Write About</h2>
          <p>This blog covers everything at the intersection of stationery and thoughtful study:</p>
          <ul>
            <li>Honest notebook and pen reviews</li>
            <li>Bullet journal setup and spreads</li>
            <li>Study techniques and desk setups</li>
            <li>Letter writing and slow correspondence</li>
            <li>Seasonal stationery hauls and favorites</li>
          </ul>
        </div>

        <div className="about-block">
          <h2>My Current Favorites</h2>
          <ul>
            <li><strong>Notebook:</strong> Leuchtturm1917 A5 Dotted in Forest Green</li>
            <li><strong>Everyday pen:</strong> Staedtler Triplus 0.3mm</li>
            <li><strong>Fountain pen:</strong> TWSBI Eco with Diamine Oxblood ink</li>
            <li><strong>Highlighter:</strong> Zebra Mildliner Brush, warm gray</li>
            <li><strong>Washi tape:</strong> MT masking tape, botanical series</li>
            <li><strong>Desk companion:</strong> A very small succulent named Herbert</li>
          </ul>
        </div>

        <div className="about-block">
          <h2>A Note on Reviews</h2>
          <p>
            All reviews on this blog reflect my genuine personal experience with products I have
            purchased with my own money unless explicitly noted otherwise. When a brand sends me
            something to try, I will always disclose it clearly at the top of the post.
          </p>
          <p>
            I believe the stationery community deserves honest opinions, even when that means
            saying a hyped product did not work for me.
          </p>
        </div>

        <div className="about-block">
          <h2>Get in Touch</h2>
          <p>
            Whether you want to share a stationery recommendation, ask a question, or just say
            hello — I genuinely love hearing from readers. The best way to reach me is through
            the <a href="/contact">contact page</a>.
          </p>
          <p>
            For collaboration or press enquiries, please mention this in your message and I will
            get back to you as soon as I can.
          </p>
        </div>
      </div>
    </main>
  )
}
