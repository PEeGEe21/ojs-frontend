if(!self.define){let s,e={};const i=(i,a)=>(i=new URL(i+".js",a).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(a,t)=>{const n=s||("document"in self?document.currentScript.src:"")||location.href;if(e[n])return;let c={};const r=s=>i(s,n),d={module:{uri:n},exports:c,require:r};e[n]=Promise.all(a.map((s=>d[s]||r(s)))).then((s=>(t(...s),c)))}}define(["./workbox-4754cb34"],(function(s){"use strict";importScripts(),self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"c93b50215c7da6c133ce2b085e71027f"},{url:"/_next/static/chunks/13b76428-6b30cc43e742e4a7.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/1749-b519eb4d4adb8997.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/1769-2eeb05b245a4b930.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/3105-b46ba60b00dca2dc.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/3544-4ef44a7ed9649b42.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/3851-6a65a234edd6e31e.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/41ade5dc-4e4f8514fa8be2d0.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/467-7c8a3d6679b8d433.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/4829-01390ef3b32986ee.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/4909-895890d7e578df08.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/4938-68e47d94dc85c5a5.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/4991-5b7eb65ae2b1e59c.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/5250-2456684b1eab219a.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/5370-920d604982969f3c.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/566-3d64440480ca3a3c.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/6072-70e7044aea967a3a.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/6161-16ffe460541bb37e.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/6496-11f0592871433e18.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/6605-0ec9c0dbde7db70b.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/6667-7a6096b12b7c6cd9.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/6871.d75828cbd26ae793.js",revision:"d75828cbd26ae793"},{url:"/_next/static/chunks/7115-a6586f54c6635f42.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/7127-cf6bdfde0f291277.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/7251-40dac9123dd8d864.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/7891-3e5ad98cc88d2408.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/8492-ed95263ac6ac630f.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/883-a9ec9c1ff070aff1.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/9345-e4cd7d1a81661ac9.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/9628-6ea6fbb39bf4bb40.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/a5ed7f3c-de48d576bc36a357.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/analytics/error-4a625afb830cf4a8.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/analytics/loading-9fba0713f56b8a9d.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/analytics/not-found-39fa4c612dbcff2d.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/analytics/page-36341df7af321bb5.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/issues/error-87b0900f43bce9a7.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/issues/loading-9af845fd50715908.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/issues/not-found-b8389ff872b1c1a3.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/issues/page-a46252af56da670f.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/layout-1e71591661f4f5e6.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/settings/error-b3ace920ea8bc548.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/settings/journal/page-c008d7d6573f0c03.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/settings/loading-929a8f8d125c9312.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/settings/not-found-3c25ab82b20f011f.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/settings/page-0694ff560439c0bc.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/submissions/%5BsubmissionId%5D/loading-49cbc210afbdfbdb.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/submissions/%5BsubmissionId%5D/page-d5d0c7c5191550d2.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/submissions/create/page-1e2e3e6db4475287.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/submissions/error-7f8eebd4bac65e2c.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/submissions/loading-68e6a38d30eb1a52.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/submissions/not-found-92f7e34356211ad6.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/submissions/page-969a6bf2024f3576.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/users/error-f23762b34598891d.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/users/loading-8f8dbb96012a06d9.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/users/not-found-554cba5a0d3b5e20.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/users/page-4303eb698f7017dc.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/users/roles/page-5a8dcc250afe6d44.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/admin/users/test/page-f16770465da266a2.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/author/analytics/error-e0bd38faec844fec.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/author/analytics/loading-a7e7f598b9a9271e.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/author/analytics/not-found-7a29998746e0504e.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/author/analytics/page-6a8a03fd7ea0c3bb.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/author/layout-02e4da739096211b.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/author/submissions/%5Bslug%5D/loading-de256c4a54b73b0b.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/author/submissions/%5Bslug%5D/page-c812d101754fd996.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/author/submissions/create/loading-4a6fd6e9d185f41e.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/author/submissions/create/page-04888af556c97146.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/author/submissions/loading-d4953dc79bd52689.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/author/submissions/page-d2c51932f3088dd7.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/(dashboard)/layout-a5d495d105d35082.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/_not-found-a8ae053545539884.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/articles/loading-c855685b45d94196.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/articles/page-f2e866e06d8018b3.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/auth/layout-60efd00b137a07ba.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/auth/login/page-fc4c86cab2e10e81.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/auth/signup/page-33c816100aef5448.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/journals/%5BjournalId%5D/articles/%5BarticleId%5D/loading-0513880ac9ba0bbe.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/journals/%5BjournalId%5D/articles/%5BarticleId%5D/page-374054a939199c03.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/journals/%5BjournalId%5D/articles/loading-60f99cc47be682b2.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/journals/%5BjournalId%5D/articles/page-c6d274049b80a3a9.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/journals/%5BjournalId%5D/loading-e043741d36de10a3.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/journals/%5BjournalId%5D/page-6ed0fc58bcf8477c.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/journals/layout-ac79772f32948edd.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/journals/page-b00ffa34f1380c37.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/layout-45681b5ee7fc98cd.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/app/page-b4dbc2d9b1fcd0d5.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/fd9d1056-917c6c24ee3af519.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/framework-638abc5ad5ea33cc.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/main-2a3439bd2eba0fa2.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/main-app-5080b6638a8f86e0.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/pages/_app-31397adcb4d2b835.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/pages/_error-b225d4412fb76f89.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-2dcaa0384739080e.js",revision:"r1WO1Z3iG1tYOx5p5H1Tj"},{url:"/_next/static/css/29934c8a99f7622b.css",revision:"29934c8a99f7622b"},{url:"/_next/static/css/4df78f2cd73d6b26.css",revision:"4df78f2cd73d6b26"},{url:"/_next/static/css/8bb190849356e3f1.css",revision:"8bb190849356e3f1"},{url:"/_next/static/css/b66e6c5bfcc68dbb.css",revision:"b66e6c5bfcc68dbb"},{url:"/_next/static/media/0066078b55585ece-s.p.ttf",revision:"ed86af2ed5bbaf879e9f2ec2e2eac929"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/29f102afc662829f-s.p.ttf",revision:"b6d08fb2f89a7b71dd0ca70ce941c922"},{url:"/_next/static/media/54c76208542a99cd-s.p.ttf",revision:"5e077c15f6e1d334dd4e9be62b28ac75"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/5f09f4e4c1b6445e-s.p.ttf",revision:"155c2e8af05b78017012be8ff2962731"},{url:"/_next/static/media/62e48611196b08b2-s.p.ttf",revision:"bdb7ba651b7bdcda6ce527b3b6705334"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/762f69bea2cb4058-s.p.ttf",revision:"85caebdc62414beb10457fdc6ca2d4c2"},{url:"/_next/static/media/941396b781615e84-s.p.ttf",revision:"cc10461cb5e0a6f2621c7179f4d6de17"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/ajax-loader.0b80f665.gif",revision:"0b80f665"},{url:"/_next/static/media/c67a6a7546a3e253-s.p.ttf",revision:"d52e2a5ca7f9d70f174ac0a7095dbccf"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/slick.25572f22.eot",revision:"25572f22"},{url:"/_next/static/media/slick.653a4cbb.woff",revision:"653a4cbb"},{url:"/_next/static/media/slick.6aa1ee46.ttf",revision:"6aa1ee46"},{url:"/_next/static/media/slick.f895cfdf.svg",revision:"f895cfdf"},{url:"/_next/static/r1WO1Z3iG1tYOx5p5H1Tj/_buildManifest.js",revision:"a27b2b7607326fa26b144e657011ec52"},{url:"/_next/static/r1WO1Z3iG1tYOx5p5H1Tj/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/icons/android-chrome-192x192.png",revision:"7d5a0d6592efa670804ae1586d0efbe6"},{url:"/icons/android-chrome-512x512.png",revision:"117ac878b5320ed55d93ae31efc9b63e"},{url:"/icons/apple-touch-icon.png",revision:"4cc73cc09e85b3a407755df21e883687"},{url:"/icons/browserconfig.xml",revision:"a493ba0aa0b8ec8068d786d7248bb92c"},{url:"/icons/favicon-16x16.png",revision:"8dc91d3bfb991d9c48d46638007df138"},{url:"/icons/favicon-32x32.png",revision:"6b9a156b29575bf513fafd8efc8c05d0"},{url:"/icons/favicon.ico",revision:"6fa4f67397afcc237d130e8147c803f3"},{url:"/icons/icon-192x192.png",revision:"71bce7bff50006c8ffdf9bb08e50d41b"},{url:"/icons/icon-256x256.png",revision:"580398bdcb8f956461410a2ea0a96c16"},{url:"/icons/icon-384x384.png",revision:"6115540106dd07ed954a32cdc1905426"},{url:"/icons/icon-512x512.png",revision:"d96af6f5023161ebb69862162dcd647f"},{url:"/icons/mstile-150x150.png",revision:"fe03ad12200e7bd759561535410f3295"},{url:"/icons/safari-pinned-tab.svg",revision:"fa2bec50138bf903bbd74a16d0112908"},{url:"/images/Pencil.png",revision:"3e60c7a3728185fb59d3024edd62a316"},{url:"/images/albert-canite-RG2YD21o81E-unsplash.jpg",revision:"cd4b6448322c9a7b775fd85e84e43ce6"},{url:"/images/avatar-1.png",revision:"b794185eb6e0e2ee3eab0094a01a257e"},{url:"/images/bg4.jpg",revision:"fd6931f5ac09e473e285c005a07c838f"},{url:"/images/default.jpg",revision:"c1b2178526f98c9ae6aa748b39b999f8"},{url:"/images/dummy-avatar.jpg",revision:"31899ac57f01a5bb633cb54f41f46f68"},{url:"/images/empty.svg",revision:"ad17058e0be79216b2a5ad2a66b2769c"},{url:"/images/img-02.jpg",revision:"0d1de0eba465a0f74563715f2dc8f4e9"},{url:"/images/img-08.jpg",revision:"97ba6ca0b7ada58c16c7affec15b582d"},{url:"/images/logo-white.svg",revision:"4644a9eb645b683bdeb2d2fbecfa15a4"},{url:"/images/logo.svg",revision:"b130d5af209425881852bee855384c7f"},{url:"/images/no-transactions.png",revision:"fac49c4673d1fdfb3e285f1234c7affa"},{url:"/images/page_not_found.svg",revision:"228e4ee9247e1cceb504ad2281f14458"},{url:"/images/socialIcons/apple.svg",revision:"01757cfb5d9ec53247c4f7a7d6e06be3"},{url:"/images/socialIcons/discord.svg",revision:"a1200f081a00352e409e8fee72850de8"},{url:"/images/socialIcons/facebook.svg",revision:"caa02e14b090dab2a6387c6a9643202a"},{url:"/images/socialIcons/google.svg",revision:"97ef9e117a1508170a996d37251c893a"},{url:"/images/socialIcons/linkedin.svg",revision:"8886a46babd87b186dbd9cf501311872"},{url:"/images/socialIcons/twitter.svg",revision:"6a71aeef497755725c9b23405d420cc1"},{url:"/images/users/300_15.jpg",revision:"0b794c49b990f145288d7e0c8196166b"},{url:"/images/users/300_17.jpg",revision:"83264b6b6ad778267da25cf1ce4080d8"},{url:"/images/users/300_20.jpg",revision:"5afd45fd362317743c90466034e134d0"},{url:"/images/users/300_25.jpg",revision:"b5bc9ee931bdcc0c439702898a9dc0d2"},{url:"/images/users/300_5.jpg",revision:"c9e0d2abc53975895fd819203ef5c380"},{url:"/images/users/300_8.jpg",revision:"1be916fdc2e3b5ba8a82cb097dc4a6ce"},{url:"/images/void-ggu.svg",revision:"27bf9e3d99b21dc17c032c310f1b7717"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),s.cleanupOutdatedCaches(),s.registerRoute("/",new s.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:s,response:e,event:i,state:a})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new s.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),s.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new s.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new s.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new s.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),s.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new s.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/image\?url=.+$/i,new s.StaleWhileRevalidate({cacheName:"next-image",plugins:[new s.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp3|wav|ogg)$/i,new s.CacheFirst({cacheName:"static-audio-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:mp4)$/i,new s.CacheFirst({cacheName:"static-video-assets",plugins:[new s.RangeRequestsPlugin,new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:js)$/i,new s.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:css|less)$/i,new s.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new s.StaleWhileRevalidate({cacheName:"next-data",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute(/\.(?:json|xml|csv)$/i,new s.NetworkFirst({cacheName:"static-data-assets",plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;const e=s.pathname;return!e.startsWith("/api/auth/")&&!!e.startsWith("/api/")}),new s.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>{if(!(self.origin===s.origin))return!1;return!s.pathname.startsWith("/api/")}),new s.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),s.registerRoute((({url:s})=>!(self.origin===s.origin)),new s.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new s.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
