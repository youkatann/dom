import Script from 'next/script';
import "./globals.css";

export const metadata = {
  title: "Інвестиційний проєкт DOM HOTEL – готель поблизу Києва ",
  description: "DOM HOTEL –  готовий інвестиційний актив під Києвом. Працюючий готель із преміальною архітектурою, рестораноми і басейном. Гарантований дохід без сезонних ризиків. Обмежена кількість юнітів у продажу",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '938356011085635');
              fbq('track', 'PageView');
            `,
          }}
        />
      </head>
      <body
        className="antialised"
      >
        <div className='bg-black'>
          <div className='bg-neutral rounded-2xl'>
            {children}
          </div>
        </div>
          <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=938356011085635&ev=PageView&noscript=1"
          />
        </noscript>
      </body>
    </html>
  );
}
