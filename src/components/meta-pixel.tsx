import Script from "next/script";

/**
 * Meta (Facebook) Pixel, requested by Cinthia for the ad campaigns she runs
 * on the site. Standard base pixel code — loads the fbevents.js loader and
 * fires a PageView on every full page load, plus the <noscript> fallback for
 * visitors with JS disabled. No route-change tracking beyond that: the site
 * is server-rendered pages with full navigations, so the one PageView per
 * load already matches what campaign traffic needs.
 *
 * `next/script` with `strategy="afterInteractive"` matches what the raw
 * snippet does (loads after the page is usable, non-blocking) without an
 * inline <script> tag, which Next.js's App Router discourages.
 */
const PIXEL_ID = "2859630997747718";

export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element -- tracking pixel, not a content image */}
        <img
          alt=""
          height={1}
          width={1}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          style={{ display: "none" }}
        />
      </noscript>
    </>
  );
}
