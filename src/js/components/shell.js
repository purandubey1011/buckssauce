export const shell = pageContent => `
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="loader" aria-hidden="true"><div class="loader-mark"><span></span><b>MOLTEN<br>MOUTH</b></div><div class="loader-count">00</div></div>
  <div class="page-wipe" aria-hidden="true"></div>
  <header class="site-header">
    <a class="brand" href="index.html" aria-label="Molten Mouth home"><span>MM</span><b>MOLTEN<br>MOUTH</b></a>
    <nav class="desktop-nav" aria-label="Primary"><a href="shop.html">Shop</a><a href="about.html">About</a><a href="wholesale.html">Wholesale</a><a href="faq.html">FAQ</a></nav>
    <a class="header-cta" href="shop.html">Get sauce</a>
    <button class="icon-button cart-trigger" aria-label="Open cart"><span aria-hidden="true">▱</span><b data-cart-count>0</b></button>
    <button class="icon-button menu-trigger" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
  </header>
  <div class="menu-backdrop" data-overlay hidden></div>
  <nav class="menu-overlay" aria-label="Full-screen menu" aria-hidden="true" hidden>
    <div class="menu-top"><span>Molten Mouth / Menu</span><button class="icon-button menu-close" aria-label="Close menu">×</button></div>
    <div class="menu-links"><a href="shop.html"><small>01</small>Shop</a><a href="about.html"><small>02</small>About</a><a href="wholesale.html"><small>03</small>Wholesale</a><a href="faq.html"><small>04</small>FAQ</a><a href="contact.html"><small>05</small>Contact</a></div>
    <div class="menu-foot"><span>Philadelphia-ish</span><span>Instagram · TikTok</span><button class="text-link cart-trigger">Cart (<b data-cart-count>0</b>)</button></div>
  </nav>
  <aside class="cart-drawer" aria-label="Shopping cart" aria-hidden="true" hidden><div class="cart-head"><div><span>Your emergency supply</span><h2>Cart (<b data-cart-count>0</b>)</h2></div><button class="icon-button cart-close" aria-label="Close cart">×</button></div><div class="cart-items" data-cart-items></div><div class="cart-empty" data-cart-empty><span>\_(ツ)_/¯</span><h3>Bone dry.</h3><p>The cart has excellent potential and no sauce.</p><a class="button button--dark" href="shop.html">Add some flavor</a></div><div class="cart-foot" data-cart-foot hidden><div><span>Subtotal</span><b data-cart-total>$0.00</b></div><a class="button button--dark" href="checkout.html">Checkout for real-ish</a><small>Checkout is a non-payment placeholder.</small></div></aside>
  <div class="sr-status" aria-live="polite" aria-atomic="true"></div>
  <canvas class="sauce-cursor" aria-hidden="true"></canvas>
  ${pageContent}
  <footer class="site-footer"><div class="footer-mark"><span>MM</span><h2>MOLTEN<br>MOUTH</h2></div><div class="footer-links"><div><span>Go places</span><a href="shop.html">Shop</a><a href="about.html">About</a><a href="wholesale.html">Wholesale</a><a href="faq.html">FAQ</a><a href="contact.html">Contact</a></div><form class="newsletter" novalidate><span>Good emails. Hot news.</span><h3>Join the burn book.</h3><label><span class="sr-only">Email address</span><input type="email" placeholder="you@email.com" required><button aria-label="Subscribe">→</button></label><p role="status"></p></form></div><div class="footer-bottom"><span>© 2026 Molten Mouth Co.</span><span>Privacy · Terms · No boring bites</span></div></footer>`;
