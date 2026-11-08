"use client";
import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════
// SHARED: Brand, Data, Components
// ═══════════════════════════════════════════

const BRAND = {
  navy: "#1a2744", gold: "#c9a84c", cream: "#f5f0e8",
  warmWhite: "#faf8f4", charcoal: "#2a2a2a", stone: "#8a8172", deepNavy: "#0f1a30",
};

const WATCHES = [
  { id:1, brand:"Omega", model:"Seamaster De Ville Crosshair", era:"1960s", price:0, priceRange:"S$800–1,200", style:"Dress", condition:"Good", movement:"Automatic", case_size:"34mm", case_material:"Stainless Steel", dial:"Crosshair Silver", strap:"Calf Leather", tag:"Classic Pick", desc:"Omega first introduced the Ref. 166.020 in 1962, combining the sporty character of the Seamaster line with the dress-style elegance of the newly introduced De Ville range. This particular example features a distinctive crosshair dial in a non-luminous configuration — no luminescent accents on the numerals or hands, giving it a clean, refined look. Powered by the self-winding Calibre 562 with a semi-quick date-change mechanism: advance the date manually by moving the hands back and forth between 9 PM and 1 AM.", img:"/watch-1-omega-seamaster-deville.jpeg", sold:false },
  { id:2, brand:"Omega", model:"Genève Blue Breguet", era:"1970s", price:0, priceRange:"S$600–900", style:"Dress", condition:"Excellent", movement:"Manual Wind", case_size:"35×30mm", case_material:"Stainless Steel", dial:"Blue Metallic", strap:"Calf Leather", tag:"Just In", desc:"A beautiful Omega Genève from the 1970s — an era when Omega experimented freely with bold designs. The Genève line was all about simplicity, creativity, and accessible pricing, which gave Omega room to push boundaries without fear of failure. This piece suits both male and female wrists thanks to its balanced case proportions. The case is mostly flat on the front with edges sloping down towards hooded lugs. And the dial — full Breguet numerals paired with a blue metallic sunburst pattern. An absolute stunner.", img:"/watch-2-omega-geneve-blue.jpeg", sold:false },
  { id:3, brand:"Omega", model:"De Ville Ellipse Roman", era:"1970s", price:0, priceRange:"S$500–800", style:"Dress", condition:"Unpolished", movement:"Quartz", case_size:"33mm", case_material:"Stainless Steel", dial:"White Roman", strap:"Lizard", tag:"", desc:"A vintage Omega De Ville in the iconic ellipse shape, in unpolished condition with Roman numerals on the dial. An interesting detail: this model doesn't have a traditional crown — instead, it uses a push-button function to move the hands, which gives it a cleaner, more minimalist look. Quartz movement.", img:"/watch-3-omega-deville-ellipse.jpeg", sold:false },
  { id:4, brand:"Tudor", model:"Black Bay Heritage 41mm", era:"2010s", price:0, priceRange:"S$3,500–4,200", style:"Diver", condition:"Full Set", movement:"Automatic", case_size:"41mm", case_material:"Stainless Steel", dial:"Black Gilt", strap:"Leather", tag:"Full Set", desc:"Tudor Black Bay Heritage Ref. 79230N — and it's worth noting how balanced this watch looks without a date window. But it gets even better: gilt accents on the dial top things off beautifully. The Black Bay collection has grown considerably since the original burgundy bezel model with an ETA movement, evolving to house the in-house Calibre MT5602 from 2015 onwards. This one comes as a full set — box, papers, and even the hand tag.", img:"/watch-4-tudor-black-bay.jpeg", sold:false },
  { id:5, brand:"Seiko", model:"Moon (Sayoko Yamaguchi)", era:"1990s", price:0, priceRange:"S$1,200–1,800", style:"Art Deco", condition:"Mint", movement:"Quartz", case_size:"28mm", case_material:"Stainless Steel", dial:"Cream", strap:"Calf Leather", tag:"Collector's Piece", desc:"An iconic piece by Seiko, remarkable not only for its melting-clock shape but for being the first Seiko designed by a woman — Sayoko Yamaguchi. An internationally renowned Japanese model and actress, she was commissioned by Seiko in the '90s to create a collection specifically designed for women, by women. These have become highly sought-after by collectors, and rumour has it that across all three moon variants, only around 1,000 pieces were produced — making them extremely limited. In mint condition, steel variant.", img:"/watch-5-seiko-sayoko.jpeg", sold:false },
  { id:6, brand:"Omega", model:"De Ville Ellipse Mesh", era:"1970s", price:0, priceRange:"S$500–700", style:"Dress", condition:"Good", movement:"Manual Wind", case_size:"31mm", case_material:"Stainless Steel", dial:"White Cream Sunburst", strap:"Mesh Bracelet", tag:"Just In", desc:"A vintage Omega De Ville in the ellipse shape — slightly smaller than the Universal Genève equivalent, but it absolutely delivers that classic ellipse aesthetic. Paired with a white cream sunburst dial and an interesting fish-scale-textured mesh bracelet that adds real character. Manual winding movement.", img:"/watch-6-omega-deville-ellipse-mesh.jpeg", sold:false },
  { id:7, brand:"Longines", model:"Sympathie", era:"1950s", price:0, priceRange:"S$400–600", style:"Art Deco", condition:"Restored", movement:"Manual Wind", case_size:"29mm", case_material:"Gold Filled", dial:"Black Enamel", strap:"Lizard", tag:"", desc:"The Longines Sympathie — a charming piece with its cushion-shaped case and pointed design. Classic, beautiful, and beloved by many collectors. Fun fact: the name \"Sympathie\" was actually a nickname given by collectors, not by Longines themselves. A piece definitely not to be missed.", img:"/watch-7-longines-sympathie.jpeg", sold:false },
  { id:8, brand:"Universal Genève", model:"White Shadow Ellipse", era:"1960s", price:0, priceRange:"S$1,000–1,500", style:"Dress", condition:"Good", movement:"Automatic", case_size:"34mm", case_material:"Stainless Steel", dial:"Silver Sunburst", strap:"Milanese Mesh", tag:"Rare Find", desc:"A Universal Genève White Shadow in the ellipse shape, housing a unique automatic microrotor calibre — the smallest of its era. Everyone needs an integrated bracelet in their collection, and this one delivers with a gorgeous sunburst dial and a different kind of wearability that's hard to match.", img:"/watch-8-ug-white-shadow.jpeg", sold:false },
  { id:9, brand:"Seiko", model:"Trapezoid", era:"1970s", price:0, priceRange:"S$300–500", style:"Dress", condition:"Good", movement:"Manual Wind", case_size:"30mm", case_material:"Gold Plated", dial:"Two-Tone", strap:"Calf Leather", tag:"Entry Pick", desc:"A trapezoid-shaped Seiko with a unique design language — the dial styling is reminiscent of the Longines Gilbert Albert, and the dial itself features two distinct shades that catch the light differently. Manual winding. A true conversation starter.", img:"/watch-9-seiko-trapezoid.jpeg", sold:false },
];

const ARTICLES = [
  { id:1, title:"The Seiko You Didn't Know About", subtitle:"How Seiko's JDM-only Asterisk line quietly rivalled the Jaeger-LeCoultre Reverso", category:"Deep Dive", date:"28 Mar 2026", readTime:"5 min", img:"/journal-seiko-asterisk.jpeg", featured:true, body:[
    {type:"text",content:"If you've ever browsed a vintage watch market in Singapore, you've probably walked past a Seiko Asterisk without knowing it. And that's exactly what makes it special — it's the watch that even watch people don't know about."},
    {type:"text",content:"Released exclusively for the Japanese domestic market in the mid-1980s, the Asterisk line was Seiko's answer to a question nobody outside Japan was asking: what if we made a reversible-case dress watch, but priced it for everyday wear?"},
    {type:"heading",content:"The Reverso Connection"},
    {type:"text",content:"The parallels to Jaeger-LeCoultre's iconic Reverso are impossible to ignore. Both feature rectangular cases that flip to reveal a second face. But while the Reverso was born from the polo fields and carries a five-figure price tag, the Asterisk was designed for the Tokyo salaryman — elegant, functional, and affordable."},
    {type:"text",content:"The Asterisk's case is gold-plated with a white dial featuring Roman numerals, housed in a slim profile that slides under a shirt cuff with ease. Flip it over and you'll find a second dial — some models mirror the front, others feature a simpler design for discreet time-checking during meetings."},
    {type:"heading",content:"Why It Matters Now"},
    {type:"text",content:"In a market obsessed with Rolex Submariners and Omega Speedmasters, the Asterisk represents something different: genuine horological creativity from a brand that had nothing to prove. Seiko wasn't trying to compete with JLC — they were solving a design problem in their own way."},
    {type:"text",content:"Today, Asterisks are hard to find in good condition. Compare that scarcity to a vintage Reverso, which starts north of S$5,000, and you begin to see why collectors in the know are quietly snapping these up."},
    {type:"heading",content:"What to Look For"},
    {type:"text",content:"The reversing mechanism should click firmly into place in both positions — any looseness suggests wear. Check the gold plating on the case edges, as this is where wear shows first. The crystal should be clean, though minor scratches can be polished out."},
    {type:"text",content:"If you find one with the original box and papers, you've struck gold. But even without, a well-preserved Asterisk is a conversation starter that punches well above its weight."},
  ]},
  { id:2, title:"Why Neo-Vintage Is the Smartest Entry Into Watches", subtitle:"Forget saving for a Submariner — here's why watches from the '50s to '90s are the sweet spot", category:"Opinion", date:"20 Mar 2026", readTime:"6 min", img:"/journal-titus-neovintage.jpeg", featured:false, body:[
    {type:"text",content:"There's a common trajectory in the watch world: you start by wanting a Rolex, realize you can't afford one, and either give up or buy a homage. But there's a third path that more collectors are discovering — neo-vintage."},
    {type:"heading",content:"What Is Neo-Vintage?"},
    {type:"text",content:"Neo-vintage refers to watches from roughly the 1950s to the 1990s — old enough to have character and history, but recent enough to be reliable daily wearers. Think pre-quartz Omega Seamasters, 1980s Seiko dress watches, and Cartier Tanks from the Must de Cartier era."},
    {type:"text",content:"These are watches from heritage brands, built during periods of genuine innovation, available at prices that won't require a bank loan. A beautiful Omega De Ville from the 1970s can be had for under S$500. A Seiko King Quartz that rivalled Swiss chronometers? Under S$300."},
    {type:"heading",content:"The Value Proposition"},
    {type:"text",content:"Unlike modern luxury watches where you're paying for marketing budgets and brand ambassadors, neo-vintage prices reflect the actual watchmaking. You're getting heritage, craftsmanship, and design at a fraction of what the same brands charge today."},
    {type:"text",content:"And unlike true vintage (pre-1950s), neo-vintage watches are robust enough for regular wear. Parts are still available, movements are well-documented, and a good watchmaker can keep them running for decades more."},
    {type:"heading",content:"Hidden Gems: Brands You Should Know"},
    {type:"text",content:"Some of the most interesting neo-vintage finds come from brands that don't get the spotlight today. Take Titus, often seen as \"Solvil et Titus\" — a brand that was widely sold during the Cold War era and was particularly popular in the Soviet Union. We recently handled a stunning Titus piece that stood out not just for its GMT hand and month-day complication, but because every numeral on the dial was written in Farsi. It's a perfect example of the kind of unique, historically rich timepiece you can only find in the neo-vintage space."},
    {type:"text",content:"These are the watches that tell stories — not just about watchmaking, but about the world they were made for. A Farsi-dial Titus sold in the Middle East during the Cold War carries more narrative weight than any modern limited edition ever could."},
    {type:"heading",content:"Why Now Is the Time"},
    {type:"text",content:"The neo-vintage market is still relatively under the radar compared to modern luxury or true vintage. Prices are accessible, the variety is extraordinary, and there's a real thrill in discovering a piece that most people have never seen before. Whether you're a first-time buyer or a seasoned collector looking for something different, neo-vintage is where the magic is."},
  ]},
  { id:3, title:"Cartier Tank Must: A Buyer's Guide", subtitle:"Everything you need to know before buying your first Must de Cartier Tank", category:"Guide", date:"12 Mar 2026", readTime:"8 min", img:"/journal-cartier-tank.jpeg", featured:false, body:[
    {type:"text",content:"The Cartier Tank is one of the most recognizable watch designs ever created — and for good reason. Designed by Louis Cartier in 1917, the Tank was inspired by the geometric lines of Renault tanks used in World War I. Its clean rectangular case, Roman numeral dial, and blue cabochon crown have remained virtually unchanged for over a century, making it one of the most enduring designs in all of horology."},
    {type:"heading",content:"A Brief History"},
    {type:"text",content:"The original Tank was presented to General John Pershing of the American Expeditionary Force in 1918. Commercial production began in 1919, and the watch quickly became a symbol of understated elegance. Over the decades, Cartier expanded the Tank family with variations like the Tank Française, Tank Américaine, and Tank Solo — but it was the Must de Cartier line, launched in the late 1970s, that truly democratized the design."},
    {type:"text",content:"The \"Must\" program was Cartier's masterstroke in making luxury accessible. By using vermeil cases (sterling silver with gold plating) instead of solid gold, and quartz movements instead of mechanical, Cartier brought the Tank's iconic design to a much wider audience without sacrificing the essence of what made it special."},
    {type:"heading",content:"Must vs. Cartier: What's the Difference?"},
    {type:"text",content:"The Must de Cartier Tank uses a vermeil case rather than solid gold, and the movements are typically quartz. But don't let the \"entry level\" label fool you — these are genuine Cartier watches, made in Switzerland, with the same iconic design DNA as their solid gold siblings. The dials come in a stunning variety of colours and patterns — from the classic white Roman to the coveted tricolour and checkered variants."},
    {type:"heading",content:"What to Look For When Buying"},
    {type:"text",content:"Case condition is everything. The vermeil finish wears over time, particularly on the edges and around the crown. Light wear adds character and patina; heavy wear may require replating, which can be costly. Always check that the blue sapphire cabochon crown is intact and original — replacements are a telltale sign of a less carefully maintained piece."},
    {type:"text",content:"Dial condition varies widely. The lacquered dials (tricolour, solid colours) are generally more durable than the painted dials. Look for even colour with no flaking or discoloration. Spider-web cracking on lacquered dials, while sometimes considered charming, does affect value."},
    {type:"heading",content:"The Iconic Dial Variants"},
    {type:"text",content:"The Must Tank came in an extraordinary range of dial designs. The classic white Roman is the most common and versatile. The tricolour — with diagonal stripes of gold, silver, and copper — is the most iconic and commands the highest prices. Then there are the solid-colour dials: burgundy, blue, black, and green, each with its own following. Rarer still are the checkered and wood-grain dials, which surface occasionally and generate real excitement among collectors."},
    {type:"heading",content:"Why the Must Tank Is a Smart Buy"},
    {type:"text",content:"In a world of oversized sport watches, the Must Tank is a breath of fresh air. It's slim enough to slide under any cuff, elegant enough for any occasion, and carries the weight of over a century of Cartier design heritage. At current market prices, it remains one of the most accessible ways to own a genuine piece of luxury watchmaking history."},
  ]},
  { id:4, title:"Behind the Booth: Our Katong Square Pop-Up", subtitle:"What it's really like running a 3-day watch pop-up in Singapore", category:"Behind the Scenes", date:"6 Mar 2026", readTime:"5 min", img:"/journal-katong-popup.jpeg", featured:false, body:[
    {type:"text",content:"Friday, Saturday, Sunday — three days of early mornings, starting the setup at 9 AM, unloading suitcases and trays of watches before the crowd arrives. That's The Retro Factory at Katong Square."},
    {type:"heading",content:"The Setup"},
    {type:"text",content:"Every pop-up begins the same way: lay the navy tablecloth, position the watch trays, arrange the display cases, and hope the weather cooperates. Katong Square is outdoors, which means hot and sunny days are part of the deal — but honestly, the energy makes it all worth it."},
    {type:"heading",content:"The People"},
    {type:"text",content:"The best part of any pop-up is always the people. We get amazing customers and watch enthusiasts from all walks of life, as well as regulars who come back every month. There's the uncle who shares his love, passion, and decades of knowledge about vintage watches. The student buying their very first vintage piece. The couple picking out a matching pair. Each interaction reminds us why we do this."},
    {type:"heading",content:"More Than Just Selling"},
    {type:"text",content:"A Naxo pop-up isn't just about buying and selling. We help customers change watch batteries, swap out straps, and assist with whatever they need. We chat about the latest watch news, discuss new finds, and sometimes we bring out our precious hard-to-find pieces — the ones that aren't for sale — just to share them with fellow enthusiasts."},
    {type:"text",content:"One of the highlights is our special roll-the-dice game, where customers get a chance to win a discount on their purchase. It adds a bit of fun and always gets people laughing."},
    {type:"heading",content:"The Vibe"},
    {type:"text",content:"Hot sun, cold sake, great conversations, and watches with stories to tell. That's The Retro Factory in a nutshell. If you haven't visited one yet, come find us at the next one — we'd love to meet you."},
  ]},
  { id:5, title:"5 Watches Under S$1,000 That Look Like a Million Bucks", subtitle:"Affordable neo-vintage picks that punch way above their weight", category:"Guide", date:"25 Feb 2026", readTime:"6 min", img:"/journal-under1000.jpeg", featured:false, body:[
    {type:"text",content:"You don't need deep pockets to wear something special. Here are some watches we regularly stock that deliver serious style and heritage — all for under S$1,000."},
    {type:"heading",content:"1. Seiko Dolce (S$250–350)"},
    {type:"text",content:"Seiko's Japan-only Dolce line is criminally underrated. Thin cases, beautiful dials, and the kind of quiet refinement you'd expect from a watch costing three times as much. The two-tone models are particularly striking, and the build quality punches well above its modest price point."},
    {type:"text",content:"Worth noting: Seiko also produced the Exceline and Tisse lines — both designed as ladies' models. The Exceline shares the same DNA as the Dolce but in more petite proportions, while the Tisse offered a slightly more contemporary aesthetic. If you're looking for a matching pair or a gift, these sister lines are excellent options in a similar price range."},
    {type:"heading",content:"2. Omega De Ville (S$500–1,000)"},
    {type:"text",content:"The Omega De Ville range from the late '70s through the '80s is one of the best value propositions in vintage watches. Available in both quartz and manual-winding variants, these offer genuine Swiss luxury branding and elegant designs at a fraction of what Omega charges today. The quartz models are ultra-reliable daily wearers, while the manual-wind versions appeal to purists who enjoy the ritual of winding their watch each morning."},
    {type:"text",content:"Case shapes range from classic round to the distinctive cushion and ellipse forms. Dials come in everything from clean white with Roman numerals to textured black with gold indices. Whatever your style, there's a De Ville that fits — and at these prices, you might end up with more than one."},
    {type:"heading",content:"3. Citizen Exceed (S$500–700)"},
    {type:"text",content:"Often overlooked in favour of Seiko, Citizen's Exceed line is one of the best-kept secrets in Japanese watchmaking. Launched as Citizen's premium dress watch range, the Exceed was designed to compete with the finest Swiss offerings — and it delivered. These watches feature incredibly thin profiles, sapphire crystals, and titanium or stainless steel cases with exceptional finishing."},
    {type:"text",content:"What makes the Exceed special is the attention to detail: mirror-polished cases, finely printed dials, and a wearing experience that feels far more expensive than it is. Some models even featured eco-drive movements decades before solar-powered watches became mainstream. For the price, you're getting a level of craftsmanship that most brands can't touch."},
  ]},
];

const MILESTONES = [
  {year:"2023",title:"The Spark",desc:"Two classmates at Temasek Polytechnic discover a shared love for vintage watches."},
  {year:"2024",title:"Naxo Is Born",desc:"Officially launches with hand-picked Seiko and Omega pieces."},
  {year:"2024",title:"First Pop-Up",desc:"Our debut pop-up draws a crowd of curious collectors."},
  {year:"2024",title:"100 Watches Sold",desc:"A milestone that proved this wasn't just a hobby."},
  {year:"2025",title:"500+ Watches",desc:"Collection expands to Cartier, Longines, JLC, and more."},
  {year:"2026",title:"Going Online",desc:"We launch naxotimepieces.com."},
];

// ─── Shared Components ───

function useIsMobile() {
  const[mobile,setMobile]=useState(false);
  useEffect(()=>{const check=()=>setMobile(window.innerWidth<768);check();window.addEventListener("resize",check);return()=>window.removeEventListener("resize",check)},[]);
  return mobile;
}

function Reveal({children,delay=0,direction="up"}) {
  const ref=useRef(null); const[v,setV]=useState(false);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting)setV(true)},{threshold:0.08,rootMargin:"0px 0px -40px 0px"});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[]);
  const transforms={up:"translateY(40px)",down:"translateY(-40px)",left:"translateX(40px)",right:"translateX(-40px)",scale:"scale(0.95)"};
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0) translateX(0) scale(1)":(transforms[direction]||transforms.up),transition:`all 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`}}>{children}</div>;
}

function Counter({end,suffix="",duration=2000}) {
  const[count,setCount]=useState(0);const ref=useRef(null);const started=useRef(false);
  useEffect(()=>{const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!started.current){started.current=true;const s=performance.now();const step=(n)=>{const p=Math.min((n-s)/duration,1);setCount(Math.floor(p*end));if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}},{threshold:0.5});if(ref.current)obs.observe(ref.current);return()=>obs.disconnect();},[end,duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Nav({scrolled,currentPage,navigate}) {
  const links=["Home","Shop","About","Journal","Events","Servicing","Contact"];
  const mobile=useIsMobile();
  const[menuOpen,setMenuOpen]=useState(false);
  return (
    <nav style={{background:scrolled?"rgba(26,39,68,0.97)":"rgba(26,39,68,0.85)",backdropFilter:"blur(12px)",transition:"all 0.5s cubic-bezier(0.22,1,0.36,1)",borderBottom:`1px solid rgba(201,168,76,${scrolled?"0.15":"0.08"})`}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:scrolled?60:68,transition:"height 0.5s ease"}}>
        <a onClick={()=>{navigate("home");setMenuOpen(false)}} style={{cursor:"pointer",display:"flex",alignItems:"center"}}>
          <img src="/naxo-logo-white.png" alt="Naxo Timepieces" style={{height:mobile?36:48,objectFit:"contain",transition:"height 0.3s"}}/>
        </a>
        {mobile?<>
          <button onClick={()=>setMenuOpen(!menuOpen)} style={{background:"none",border:"none",color:BRAND.gold,fontSize:24,cursor:"pointer",padding:8,transition:"transform 0.3s",transform:menuOpen?"rotate(90deg)":"rotate(0deg)"}}>{menuOpen?"✕":"☰"}</button>
          <div style={{position:"absolute",top:"100%",left:0,right:0,background:"rgba(26,39,68,0.98)",backdropFilter:"blur(12px)",borderBottom:`1px solid rgba(201,168,76,0.15)`,padding:menuOpen?"16px 0":"0",maxHeight:menuOpen?"400px":"0",opacity:menuOpen?1:0,overflow:"hidden",transition:"all 0.4s cubic-bezier(0.22,1,0.36,1)"}}>
            {links.map((l,li)=>{const key=l.toLowerCase();return(
              <a key={l} onClick={()=>{navigate(key==="home"?"home":key);setMenuOpen(false)}} style={{display:"block",padding:"14px 24px",fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:currentPage===(key==="home"?"home":key)?BRAND.gold:"rgba(255,255,255,0.7)",textDecoration:"none",letterSpacing:2.5,textTransform:"uppercase",cursor:"pointer",transition:`all 0.3s ease ${li*0.05}s`,transform:menuOpen?"translateX(0)":"translateX(-20px)",opacity:menuOpen?1:0}}>{l}</a>
            )})}
          </div>
        </>:
        <div style={{display:"flex",gap:32,alignItems:"center"}}>
          {links.map(l=>{const key=l.toLowerCase();return(
            <a key={l} onClick={()=>navigate(key==="home"?"home":key)} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:currentPage===(key==="home"?"home":key)?BRAND.gold:"rgba(255,255,255,0.65)",textDecoration:"none",letterSpacing:2.5,textTransform:"uppercase",cursor:"pointer",transition:"color 0.3s"}}
            onMouseEnter={e=>e.target.style.color=BRAND.gold} onMouseLeave={e=>{if(currentPage!==(key==="home"?"home":key))e.target.style.color="rgba(255,255,255,0.65)"}}>{l}</a>
          )})}
        </div>}
      </div>
    </nav>
  );
}

function Footer({navigate}) {
  const m=useIsMobile();
  const brands=[
    {src:"/brand-omega.png",name:"Omega"},
    {src:"/brand-rolex.png",name:"Rolex"},
    {src:"/brand-tudor.png",name:"Tudor"},
    {src:"/brand-cartier.png",name:"Cartier"},
    {src:"/brand-longines.png",name:"Longines"},
    {src:"/brand-patek.png",name:"Patek Philippe"},
    {src:"/brand-seiko.png",name:"Seiko"},
    {src:"/brand-grandseiko.png",name:"Grand Seiko"},
    {src:"/brand-credor.png",name:"Credor"},
  ];
  const links=[["Shop","shop"],["About","about"],["Journal","journal"],["Events","events"],["Servicing","servicing"],["Contact","contact"]];
  return (
    <footer style={{background:BRAND.deepNavy,borderTop:`1px solid rgba(201,168,76,0.12)`}}>
      {/* Brand logos row */}
      <div style={{borderBottom:`1px solid rgba(201,168,76,0.08)`,padding:"32px 0"}}>
        <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 60px"}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:10,color:"rgba(245,240,232,0.3)",letterSpacing:4,textTransform:"uppercase",textAlign:"center",marginBottom:24}}>Brands We Carry</div>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",gap:m?20:36}}>
            {brands.map(b=>(
              <img key={b.name} src={b.src} alt={b.name} style={{height:m?20:26,objectFit:"contain",opacity:0.35,filter:"brightness(0) invert(1)",transition:"opacity 0.3s"}}
                onMouseEnter={e=>e.target.style.opacity="0.75"}
                onMouseLeave={e=>e.target.style.opacity="0.35"}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Main footer row */}
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"28px 20px":"36px 60px",display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr 1fr",gap:m?28:0,alignItems:"center"}}>
        <a onClick={()=>navigate("home")} style={{cursor:"pointer"}}>
          <img src="/naxo-logo-white.png" alt="Naxo Timepieces" style={{height:36,objectFit:"contain"}}/>
        </a>
        <div style={{display:"flex",justifyContent:m?"flex-start":"center",gap:m?16:28,flexWrap:"wrap"}}>
          {links.map(([label,key])=>(
            <a key={key} onClick={()=>navigate(key)} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:"rgba(245,240,232,0.4)",letterSpacing:2,textTransform:"uppercase",cursor:"pointer",transition:"color 0.3s",textDecoration:"none"}}
              onMouseEnter={e=>e.target.style.color=BRAND.gold}
              onMouseLeave={e=>e.target.style.color="rgba(245,240,232,0.4)"}>{label}</a>
          ))}
        </div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:"rgba(245,240,232,0.25)",letterSpacing:1,textAlign:m?"left":"right"}}>© 2026 Naxo Timepieces</div>
      </div>
    </footer>
  );
}

function PageHero({tag,title,titleGold,subtitle}) {
  const[loaded,setLoaded]=useState(false);const m=useIsMobile();useEffect(()=>{setTimeout(()=>setLoaded(true),100)},[]);
  return(
    <section style={{paddingTop:100,paddingBottom:60,background:`linear-gradient(160deg,${BRAND.deepNavy} 0%,${BRAND.navy} 60%,#1e3255 100%)`,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:`linear-gradient(rgba(201,168,76,1) 1px,transparent 1px),linear-gradient(90deg,rgba(201,168,76,1) 1px,transparent 1px)`,backgroundSize:"80px 80px"}}/>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"60px 20px 30px":"80px 40px 40px",position:"relative"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:6,textTransform:"uppercase",marginBottom:24,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(20px)",transition:"all 0.8s ease 0.2s"}}>{tag}</div>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(40px,5vw,64px)",color:BRAND.cream,fontWeight:700,lineHeight:1.08,margin:"0 0 24px",opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(40px)",transition:"all 1s ease 0.4s"}} dangerouslySetInnerHTML={{__html:`${title} <span style="color:${BRAND.gold};font-style:italic">${titleGold}</span>`}}/>
        {subtitle&&<p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:"rgba(245,240,232,0.5)",maxWidth:480,lineHeight:1.7,opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(30px)",transition:"all 0.8s ease 0.6s"}}>{subtitle}</p>}
      </div>
    </section>
  );
}

function GoldButton({children,onClick,ghost=false}) {
  return <button onClick={onClick} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,letterSpacing:3,textTransform:"uppercase",background:ghost?"transparent":BRAND.gold,color:ghost?BRAND.cream:BRAND.navy,border:ghost?`1px solid rgba(245,240,232,0.25)`:"none",padding:"16px 36px",cursor:"pointer",fontWeight:600,transition:"all 0.3s",position:"relative",zIndex:5}}
  onMouseEnter={e=>{if(ghost){e.target.style.borderColor=BRAND.gold;e.target.style.color=BRAND.gold}else{e.target.style.background="#d4b45e"}}}
  onMouseLeave={e=>{if(ghost){e.target.style.borderColor="rgba(245,240,232,0.25)";e.target.style.color=BRAND.cream}else{e.target.style.background=BRAND.gold}}}>{children}</button>;
}

// ═══════════════════════════════════════════
// PAGE: HOME
// ═══════════════════════════════════════════

function HomePage({navigate}) {
  const[loaded,setLoaded]=useState(false);const[hovId,setHovId]=useState(null);const[sellHov,setSellHov]=useState(null);const m=useIsMobile();
  useEffect(()=>{setTimeout(()=>setLoaded(true),100)},[]);
  const featured=WATCHES.slice(0,9);

  return(<>
    {/* HERO */}
    <section style={{position:"relative",minHeight:"100vh",overflow:"hidden",background:BRAND.deepNavy}}>
      {/* Full bleed background image with overlay */}
      <div style={{position:"absolute",inset:0,backgroundImage:`url('/hero-watches.jpeg')`,backgroundSize:"cover",backgroundPosition:"center",filter:"brightness(0.35) sepia(0.2)"}}/>
      {/* Gold grain overlay */}
      <div style={{position:"absolute",inset:0,opacity:0.06,backgroundImage:`radial-gradient(circle at 1px 1px,${BRAND.gold} 1px,transparent 0)`,backgroundSize:"32px 32px"}}/>
      {/* Left side gold accent bar */}
      <div style={{position:"absolute",left:0,top:0,bottom:0,width:3,background:`linear-gradient(180deg,transparent,${BRAND.gold},transparent)`,opacity:0.6}}/>

      {/* Main content — padded top to clear fixed header (marquee ~34px + nav ~68px) */}
      <div style={{position:"relative",zIndex:2,maxWidth:1400,margin:"0 auto",padding:m?"102px 20px 140px":"110px 60px 160px",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center"}}>
        {/* Top label */}
        <div style={{opacity:loaded?1:0,transform:loaded?"translateY(0)":"translateY(16px)",transition:"all 0.7s ease 0.1s",marginBottom:m?24:32,display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:40,height:1,background:BRAND.gold}}/>
          <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.gold,letterSpacing:6,textTransform:"uppercase"}}>Est. 2023 · Singapore</span>
        </div>

        {/* Giant editorial headline */}
        <div style={{maxWidth:m?"100%":700}}>
          <h1 style={{fontFamily:"'Playfair Display',serif",fontWeight:700,color:BRAND.cream,lineHeight:1,margin:"0 0 40px",opacity:loaded?1:0,transition:"all 1s ease 0.3s"}}>
            <span style={{display:"block",fontSize:m?"clamp(44px,11vw,72px)":"clamp(56px,6.5vw,96px)"}}>Curating</span>
            <span style={{display:"block",fontSize:m?"clamp(44px,11vw,72px)":"clamp(56px,6.5vw,96px)",color:BRAND.gold,fontStyle:"italic"}}>Moments,</span>
            <span style={{display:"block",fontSize:m?"clamp(44px,11vw,72px)":"clamp(56px,6.5vw,96px)"}}>One Watch</span>
            <span style={{display:"block",fontSize:m?"clamp(44px,11vw,72px)":"clamp(56px,6.5vw,96px)"}}>at a Time</span>
          </h1>

          {/* Subtitle + CTA */}
          <div style={{opacity:loaded?1:0,transition:"all 0.8s ease 0.7s"}}>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:m?16:19,color:"rgba(245,240,232,0.55)",lineHeight:1.75,maxWidth:420,margin:"0 0 36px"}}>
              Neo-vintage timepieces from the 1950s to 1990s — sourced, authenticated, and restored with care in Singapore.
            </p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <GoldButton onClick={()=>navigate("shop")}>Browse Collection</GoldButton>
              <GoldButton ghost onClick={()=>navigate("about")}>Our Story</GoldButton>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,background:"rgba(10,20,45,0.85)",backdropFilter:"blur(12px)",borderTop:`1px solid rgba(201,168,76,0.2)`}}>
        <div style={{maxWidth:1400,margin:"0 auto",padding:m?"16px 20px":"28px 60px",display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(4,1fr)",gap:m?16:0}}>
          {[{n:500,s:"+",l:"Watches Sold"},{n:30,s:"+",l:"Pop-Ups Held"},{n:10,s:"",l:"Brands Curated"},{n:1300,s:"+",l:"Happy Collectors"}].map((s,i)=>(
            <div key={i} style={{textAlign:"center",padding:m?0:"0 40px",borderRight:!m&&i<3?`1px solid rgba(201,168,76,0.15)`:"none"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?26:36,color:BRAND.gold,fontWeight:700,lineHeight:1}}><Counter end={s.n} suffix={s.s}/></div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:"rgba(245,240,232,0.45)",letterSpacing:3,textTransform:"uppercase",marginTop:6}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FEATURED COLLECTION */}
    <section style={{background:BRAND.warmWhite,padding:"100px 0"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:60}}>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:12}}>The Collection</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(36px,4vw,56px)",color:BRAND.navy,fontWeight:700,margin:0}}>Recently <span style={{fontStyle:"italic",color:BRAND.gold}}>Acquired</span></h2>
          </div>
          <a onClick={()=>navigate("shop")} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.navy,letterSpacing:3,textTransform:"uppercase",textDecoration:"none",borderBottom:`1px solid ${BRAND.gold}`,paddingBottom:4,cursor:"pointer"}}>View All →</a>
        </div>
        {/* Brand pills */}
        <div style={{display:"flex",gap:8,marginBottom:48,flexWrap:"wrap",overflowX:m?"auto":"visible"}}>
          {["All","Seiko","Omega","Cartier","Longines","Universal Genève","Rolex"].map((cat,i)=>(
            <button key={cat} onClick={()=>navigate("shop")} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,letterSpacing:2,textTransform:"uppercase",background:i===0?BRAND.navy:"transparent",color:i===0?BRAND.cream:BRAND.navy,border:`1px solid ${i===0?BRAND.navy:"rgba(26,39,68,0.2)"}`,padding:"10px 24px",cursor:"pointer",transition:"all 0.3s"}}>{cat}</button>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(3,1fr)",gap:24}}>
          {featured.map((w,i)=>(
            <div key={w.id} onMouseEnter={()=>setHovId(w.id)} onMouseLeave={()=>setHovId(null)} onClick={()=>navigate("shop")} style={{position:"relative",cursor:"pointer",overflow:"hidden",background:BRAND.cream}}>
              <div style={{width:"100%",paddingBottom:"100%",background:`url('${w.img}') center 20%/cover`,filter:"sepia(0.08)",transition:"transform 0.8s cubic-bezier(0.22,1,0.36,1)",transform:hovId===w.id?"scale(1.05)":"scale(1)"}}/>
              <div style={{position:"absolute",bottom:0,left:0,right:0,padding:"40px 24px 24px",background:"linear-gradient(transparent,rgba(15,26,48,0.85))"}}>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.gold,letterSpacing:3,textTransform:"uppercase",marginBottom:6}}>{w.era} · {w.style}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.cream,fontWeight:600}}>{w.brand}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:"rgba(245,240,232,0.7)",marginBottom:8}}>{w.model}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.gold,fontWeight:600}}>{w.price>0?"S$"+w.price.toLocaleString():"Enquire"}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* SELL YOUR WATCH */}
    <section style={{background:`linear-gradient(160deg,${BRAND.deepNavy} 0%,${BRAND.navy} 100%)`,padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px",display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:m?32:80,alignItems:"center",position:"relative"}}>
        <div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:20}}>Buy · Trade · Consign</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,4vw,52px)",color:BRAND.cream,fontWeight:700,lineHeight:1.1,margin:"0 0 24px"}}>Sell Us Your<br/><span style={{color:BRAND.gold,fontStyle:"italic"}}>Watch</span></h2>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:"rgba(245,240,232,0.55)",lineHeight:1.8,marginBottom:40,maxWidth:440}}>Got a watch you're ready to part with? We buy, trade, and consign watches from brands like Seiko, Omega, Cartier, Rolex, and more. Fair prices, quick payment, no hassle.</p>
          <div style={{display:"flex",gap:16}}>
            <GoldButton onClick={()=>window.open("https://wa.me/6588255367?text=Hi%20Naxo!%20I%27d%20like%20to%20get%20a%20quote%20for%20my%20watch.","_blank")}>Get a Quote</GoldButton>
            <GoldButton ghost onClick={()=>navigate("howitworks")}>How It Works</GoldButton>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          {[{icon:"◎",title:"Sell",desc:"Get a fair cash offer. No lowballing — we value your timepiece honestly."},{icon:"⇄",title:"Trade",desc:"Swap your current piece towards something new from our collection."},{icon:"◈",title:"Consign",desc:"Let us sell it for you. We handle photos, listing, and buyer communication."}].map((s,i)=>(
            <div key={s.title} onMouseEnter={()=>setSellHov(i)} onMouseLeave={()=>setSellHov(null)} style={{display:"flex",alignItems:"center",gap:24,padding:"28px 32px",background:sellHov===i?"rgba(201,168,76,0.08)":"rgba(245,240,232,0.03)",border:`1px solid ${sellHov===i?"rgba(201,168,76,0.3)":"rgba(245,240,232,0.06)"}`,transition:"all 0.4s",cursor:"pointer",transform:sellHov===i?"translateX(8px)":"translateX(0)"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:BRAND.gold,width:48,textAlign:"center",flexShrink:0}}>{s.icon}</div>
              <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:BRAND.cream,fontWeight:600,marginBottom:6}}>{s.title}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:"rgba(245,240,232,0.5)",lineHeight:1.6}}>{s.desc}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>


    {/* TRUST SIGNALS */}
    <section style={{background:BRAND.cream,padding:"80px 0",borderTop:`1px solid rgba(201,168,76,0.1)`}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <Reveal><div style={{textAlign:"center",marginBottom:52}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:12}}>Why Naxo</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,40px)",color:BRAND.navy,fontWeight:700,margin:0}}>Buy with <span style={{fontStyle:"italic",color:BRAND.gold}}>Confidence</span></h2>
        </div></Reveal>
        <div style={{display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(4,1fr)",gap:m?16:24}}>
          {[
            {icon:"🔍",title:"Authenticated",desc:"Every piece is personally inspected and verified before it reaches you."},
            {icon:"🤝",title:"Fair Pricing",desc:"Transparent price ranges upfront. No hidden fees, no hard sell."},
            {icon:"🔄",title:"Buy · Trade · Consign",desc:"Flexible options — sell outright, trade up, or consign with us."},
            {icon:"📍",title:"Meet In Person",desc:"View watches by appointment at Far East Plaza or at our pop-ups."},
          ].map((t,i)=>(
            <Reveal key={i} delay={i*0.08}><div style={{textAlign:"center",padding:m?"24px 16px":"32px 24px"}}>
              <div style={{fontSize:32,marginBottom:16}}>{t.icon}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:BRAND.navy,fontWeight:700,marginBottom:10}}>{t.title}</div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.7,margin:0}}>{t.desc}</p>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* EVENTS */}
    <section style={{background:BRAND.cream,padding:"100px 0"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:12}}>Pop-ups & Events</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,3.5vw,48px)",color:BRAND.navy,fontWeight:700,margin:"0 0 48px"}}>Meet Us <span style={{fontStyle:"italic",color:BRAND.gold}}>In Person</span></h2>
        <div style={{display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:24}}>
          {[{title:"The Retro Factory",date:"2–4 Oct 2026",loc:"Katong Square",note:"Free Sake"},{title:"SMUSA Bizneyland",date:"27–28 Oct 2026",loc:"SMU T-Junction",note:"12PM–6PM"}].map((ev,i)=>(
            <div key={i} onClick={()=>navigate("events")} style={{border:`1px solid rgba(26,39,68,0.12)`,padding:40,position:"relative",background:BRAND.warmWhite,cursor:"pointer",transition:"all 0.4s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=BRAND.gold} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(26,39,68,0.12)"}>
              {ev.note&&<div style={{position:"absolute",top:16,right:16,background:BRAND.gold,padding:"6px 14px",fontFamily:"'Cormorant Garamond',serif",fontSize:10,color:BRAND.navy,letterSpacing:2,textTransform:"uppercase",fontWeight:700}}>{ev.note}</div>}
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.stone,letterSpacing:3,textTransform:"uppercase",marginBottom:12}}>{ev.date}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:BRAND.navy,fontWeight:700,marginBottom:8}}>{ev.title}</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:BRAND.stone}}>{ev.loc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section style={{background:BRAND.deepNavy,padding:"100px 0",textAlign:"center",position:"relative"}}>
      <div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:`radial-gradient(circle at 2px 2px,${BRAND.gold} 1px,transparent 0)`,backgroundSize:"40px 40px"}}/>
      <div style={{maxWidth:600,margin:"0 auto",padding:m?"0 20px":"0 40px",position:"relative"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,4vw,52px)",color:BRAND.cream,fontWeight:700,lineHeight:1.15,margin:"0 0 24px"}}>Found Your Next<br/><span style={{color:BRAND.gold,fontStyle:"italic"}}>Timepiece</span>?</h2>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:"rgba(245,240,232,0.55)",lineHeight:1.7,marginBottom:40}}>DM us on Instagram or WhatsApp, or drop us a message. We're always happy to help you find the one.</p>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <GoldButton onClick={()=>navigate("contact")}>Contact Us</GoldButton>
          <GoldButton ghost onClick={()=>navigate("shop")}>Browse Watches</GoldButton>
        </div>
      </div>
    </section>
  </>);
}

// ═══════════════════════════════════════════
// PAGE: SHOP
// ═══════════════════════════════════════════

function ShopPage({navigate}) {
  const m=useIsMobile();
  const[brand,setBrand]=useState("All");const[style,setStyle]=useState("All");const[sort,setSort]=useState("Newest");const[showSold,setShowSold]=useState(false);const[sel,setSel]=useState(null);const[q,setQ]=useState("");const[hovId,setHovId]=useState(null);
  const BRANDS=["All","Seiko","Omega","Tudor","Longines","Universal Genève"];const STYLES=["All","Dress","Diver","Sport","Art Deco"];
  let f=WATCHES.filter(w=>{if(brand!=="All"&&w.brand!==brand)return false;if(style!=="All"&&w.style!==style)return false;if(!showSold&&w.sold)return false;if(q){const s=q.toLowerCase();return(w.brand+w.model+w.era+w.style).toLowerCase().includes(s)}return true});
  if(sort==="Price: Low → High")f.sort((a,b)=>a.price-b.price);if(sort==="Price: High → Low")f.sort((a,b)=>b.price-a.price);

  return(<>
    <PageHero tag="The Collection" title="Our " titleGold="Catalog" subtitle="Browse our curated selection of neo-vintage timepieces."/>
    {/* Filters */}
    <section style={{background:BRAND.cream,borderBottom:`1px solid rgba(26,39,68,0.06)`,position:"sticky",top:60,zIndex:50}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"16px 40px",display:"flex",alignItems:"center",gap:m?8:20,flexWrap:"wrap",overflowX:m?"auto":"visible"}}>
        <input type="text" placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} style={{padding:"8px 14px",fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:BRAND.navy,background:BRAND.warmWhite,border:`1px solid rgba(26,39,68,0.1)`,outline:"none",width:180,letterSpacing:1}}/>
        <div style={{width:1,height:28,background:"rgba(26,39,68,0.1)"}}/>
        {BRANDS.map(b=><button key={b} onClick={()=>setBrand(b)} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,padding:"6px 14px",background:brand===b?BRAND.navy:"transparent",color:brand===b?BRAND.cream:BRAND.navy,border:`1px solid ${brand===b?BRAND.navy:"rgba(26,39,68,0.12)"}`,cursor:"pointer",transition:"all 0.2s"}}>{b}</button>)}
        <div style={{width:1,height:28,background:"rgba(26,39,68,0.1)"}}/>
        {STYLES.map(s=><button key={s} onClick={()=>setStyle(s)} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,padding:"6px 14px",background:style===s?BRAND.navy:"transparent",color:style===s?BRAND.cream:BRAND.navy,border:`1px solid ${style===s?BRAND.navy:"rgba(26,39,68,0.12)"}`,cursor:"pointer",transition:"all 0.2s"}}>{s}</button>)}
        <div style={{flex:1}}/>
        <label style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.stone,display:"flex",alignItems:"center",gap:6,cursor:"pointer"}}><input type="checkbox" checked={showSold} onChange={e=>setShowSold(e.target.checked)} style={{accentColor:BRAND.gold}}/>Sold</label>
        <select value={sort} onChange={e=>setSort(e.target.value)} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.navy,background:BRAND.warmWhite,border:`1px solid rgba(26,39,68,0.12)`,padding:"6px 10px",outline:"none",cursor:"pointer"}}>{["Newest","Price: Low → High","Price: High → Low"].map(o=><option key={o}>{o}</option>)}</select>
      </div>
    </section>
    {/* Grid */}
    <section style={{padding:"48px 0 100px",background:BRAND.warmWhite}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        {f.length===0?<div style={{textAlign:"center",padding:"100px 0",fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:BRAND.stone}}>No watches found — try adjusting filters</div>:
        <div style={{display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(3,1fr)",gap:20}}>
          {f.map((w,i)=>(
            <div key={w.id} onMouseEnter={()=>setHovId(w.id)} onMouseLeave={()=>setHovId(null)} onClick={()=>setSel(w)} style={{display:"flex",flexDirection:"column",cursor:"pointer",overflow:"hidden",background:BRAND.cream}}>
              <div style={{width:"100%",paddingBottom:"100%",position:"relative",overflow:"hidden",flexShrink:0}}>
                <div style={{position:"absolute",inset:0,background:`url('${w.img}') center 20%/cover`,filter:"sepia(0.08)",transition:"transform 0.8s cubic-bezier(0.22,1,0.36,1)",transform:hovId===w.id?"scale(1.05)":"scale(1)"}}/>
                {w.tag&&!w.sold&&<div style={{position:"absolute",top:10,left:10,background:w.tag==="Just In"?BRAND.gold:BRAND.navy,color:w.tag==="Just In"?BRAND.navy:BRAND.gold,fontFamily:"'Cormorant Garamond',serif",fontSize:10,letterSpacing:2,textTransform:"uppercase",padding:"4px 10px",fontWeight:600}}>{w.tag}</div>}
                {w.sold&&<div style={{position:"absolute",inset:0,background:"rgba(15,26,48,0.35)",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{fontFamily:"'Playfair Display',serif",fontSize:m?14:18,color:BRAND.cream,letterSpacing:m?4:6,textTransform:"uppercase",padding:m?"8px 18px":"10px 28px",border:"2px solid rgba(245,240,232,0.6)",fontWeight:700}}>Sold</span></div>}
              </div>
              <div style={{padding:m?"12px 12px 16px":"16px 16px 20px",borderTop:`1px solid rgba(201,168,76,${hovId===w.id?"0.4":"0.1"})`,transition:"border-color 0.4s",background:BRAND.cream,flex:1,display:"flex",flexDirection:m?"column":"row",justifyContent:m?"flex-start":"space-between",alignItems:m?"flex-start":"flex-start",gap:m?2:0}}>
                <div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:m?9:10,color:BRAND.gold,letterSpacing:m?2:3,textTransform:"uppercase",marginBottom:4}}>{w.era} · {w.style}</div>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?14:16,color:BRAND.navy,fontWeight:600,lineHeight:1.3}}>{w.brand}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:m?12:13,color:BRAND.stone,marginTop:2,lineHeight:1.3}}>{w.model}</div>
                </div>
                <div style={{textAlign:m?"left":"right",flexShrink:0,marginLeft:m?0:8,marginTop:m?6:0}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?12:13,color:w.sold?BRAND.stone:BRAND.gold,fontWeight:600,textDecoration:w.sold?"line-through":"none"}}>{w.sold?"Sold":"Enquire"}</div>
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>
    </section>
    {/* Sourcing CTA */}
    <section style={{background:BRAND.navy,padding:"60px 0"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:24}}>
        <div><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:BRAND.cream,fontWeight:700,margin:"0 0 8px"}}>Looking for something <span style={{color:BRAND.gold,fontStyle:"italic"}}>specific</span>?</h3><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"rgba(245,240,232,0.5)",margin:0}}>We source watches on request. Tell us what you're after.</p></div>
        <GoldButton onClick={()=>navigate("contact")}>Request a Watch</GoldButton>
      </div>
    </section>
    {/* Drawer */}
    {sel&&<><div onClick={()=>setSel(null)} style={{position:"fixed",inset:0,zIndex:200,background:"rgba(15,26,48,0.6)",backdropFilter:"blur(4px)",animation:"fadeIn 0.3s ease"}}/>
    <div style={{position:"fixed",top:0,right:0,maxHeight:"100vh",zIndex:201,width:m?"100vw":"min(680px,90vw)",background:BRAND.warmWhite,boxShadow:"-20px 0 60px rgba(0,0,0,0.3)",overflowY:"auto",animation:"slideIn 0.4s cubic-bezier(0.22,1,0.36,1)"}}>
      <button onClick={()=>setSel(null)} style={{position:"fixed",top:m?112:20,right:m?16:20,zIndex:210,background:BRAND.navy,border:"none",color:BRAND.cream,width:48,height:48,borderRadius:"50%",cursor:"pointer",fontSize:20,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(0,0,0,0.3)",flexShrink:0}}>✕</button>
      <div style={{width:"100%",maxHeight:"70vh",overflow:"hidden",background:BRAND.cream,marginTop:0,display:"flex",alignItems:"center",justifyContent:"center"}}><img src={sel.img} alt={sel.brand+" "+sel.model} style={{width:"100%",height:"auto",maxHeight:"70vh",objectFit:"contain",filter:"sepia(0.08)",display:"block"}}/></div>
      <div style={{padding:m?"32px 24px 80px":"40px 40px 60px"}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:4,textTransform:"uppercase",marginBottom:8}}>{sel.era} · {sel.style}</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?28:36,color:BRAND.navy,fontWeight:700,margin:"0 0 4px"}}>{sel.brand}</h2>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:BRAND.stone,margin:"0 0 16px"}}>{sel.model}</p>
        {sel.sold&&<div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:BRAND.stone,fontWeight:600,marginBottom:24,textDecoration:"line-through"}}>Sold</div>}
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:BRAND.charcoal,lineHeight:1.8,marginBottom:40}}>{sel.desc}</p>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.gold,letterSpacing:4,textTransform:"uppercase",marginBottom:16,paddingBottom:12,borderBottom:`1px solid rgba(201,168,76,0.2)`}}>Specifications</div>
        <div style={{display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:"16px 32px",marginBottom:40}}>
          {[["Movement",sel.movement],["Case",sel.case_size],["Material",sel.case_material],["Dial",sel.dial],["Strap",sel.strap],["Condition",sel.condition]].map(([l,v])=><div key={l}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.stone,letterSpacing:2,textTransform:"uppercase",marginBottom:4}}>{l}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:BRAND.navy,fontWeight:600}}>{v}</div></div>)}
        </div>
        {!sel.sold?<GoldButton onClick={()=>window.open("https://wa.me/6588255367?text=Hi%20Naxo!%20I%27m%20interested%20in%20the%20"+encodeURIComponent(sel.brand+" "+sel.model),"_blank")}>Enquire Now</GoldButton>:
        <div style={{textAlign:"center",padding:"24px",background:BRAND.cream,border:`1px solid rgba(201,168,76,0.2)`}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.navy,fontWeight:600,marginBottom:8}}>This piece has found a new home</div>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,marginBottom:16}}>Interested in something similar? We can source one for you.</p>
          <GoldButton onClick={()=>window.open("https://wa.me/6588255367?text=Hi%20Naxo!%20I%20saw%20the%20"+encodeURIComponent(sel.brand+" "+sel.model)+"%20is%20sold.%20Can%20you%20source%20a%20similar%20piece%3F","_blank")}>Contact Us to Source</GoldButton>
        </div>}
      </div>
    </div></>}
  </>);
}

// ─── Marquee Banner ───
function MarqueeBanner({navigate}) {
  const items=["✦ Monthly pop-ups at Katong Square — The Retro Factory","✦ Buy · Sell · Trade · Consign · Repair","✦ Monthly pop-ups at Katong Square — The Retro Factory","✦ Buy · Sell · Trade · Consign · Repair"];
  const text=items.join("          ");
  return(
    <div style={{background:BRAND.gold,overflow:"hidden",padding:"8px 0",cursor:"pointer"}} onClick={()=>navigate("events")}>
      <div className="marquee-track" style={{display:"flex",whiteSpace:"nowrap"}}>
        {[...Array(4)].map((_,i)=>(
          <span key={i} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.navy,letterSpacing:2,textTransform:"uppercase",paddingRight:80,flexShrink:0}}>{text}</span>
        ))}
      </div>
    </div>
  );
}


function GalleryScroll({photos}) {
  const scrollRef=useRef(null);const m=useIsMobile();const[isDragging,setIsDragging]=useState(false);const[startX,setStartX]=useState(0);const[scrollLeft,setScrollLeft]=useState(0);
  const onDown=(e)=>{setIsDragging(true);setStartX((e.pageX||e.touches?.[0]?.pageX||0)-scrollRef.current.offsetLeft);setScrollLeft(scrollRef.current.scrollLeft)};
  const onUp=()=>setIsDragging(false);
  const onMove=(e)=>{if(!isDragging)return;e.preventDefault();const x=(e.pageX||e.touches?.[0]?.pageX||0)-scrollRef.current.offsetLeft;scrollRef.current.scrollLeft=scrollLeft-(x-startX)*1.5};
  return(
    <div ref={scrollRef} onMouseDown={onDown} onMouseUp={onUp} onMouseLeave={onUp} onMouseMove={onMove} onTouchStart={onDown} onTouchEnd={onUp} onTouchMove={onMove}
      style={{display:"flex",gap:m?12:16,padding:"20px 40px",overflowX:"auto",cursor:isDragging?"grabbing":"grab",WebkitOverflowScrolling:"touch",scrollbarWidth:"none",msOverflowStyle:"none"}}>
      <style>{`.gallery-scroll::-webkit-scrollbar{display:none}`}</style>
      {photos.map((src,i)=>{const h=m?220:[280,320,260,300,240,310,270,290,250,320,280][i%11];return(
        <div key={i} style={{flexShrink:0,width:m?260:360,height:h,borderRadius:4,overflow:"hidden",position:"relative",transform:`translateY(${i%2===0?0:30}px)`,pointerEvents:isDragging?"none":"auto"}}>
          <div style={{position:"absolute",inset:0,backgroundImage:`url('${src}')`,backgroundPosition:"center",backgroundSize:"cover",transition:"transform 0.6s cubic-bezier(0.22,1,0.36,1)"}}
            onMouseEnter={e=>{if(!isDragging)e.currentTarget.style.transform="scale(1.08)"}}
            onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
          />
        </div>
      )})}
    </div>
  );
}

// ═══════════════════════════════════════════
// PAGE: ABOUT
// ═══════════════════════════════════════════

function AboutPage({navigate}) {
  const m=useIsMobile();
  return(<>
    <PageHero tag="Our Story" title="It Started With Two Watches &amp; a " titleGold="Friendship" subtitle="What began as two friends geeking out over forgotten Seikos has become Singapore's go-to destination for neo-vintage timepieces."/>
    {/* Story */}
    <section style={{background:BRAND.warmWhite,padding:"100px 0"}}><div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px",display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:m?32:80,alignItems:"center"}}>
      <Reveal><div style={{borderLeft:`3px solid ${BRAND.gold}`,paddingLeft:40}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(24px,2.5vw,36px)",color:BRAND.navy,fontWeight:600,lineHeight:1.4,fontStyle:"italic",marginBottom:32}}>"We fell in love with the idea that a beautifully made watch from 1970 could still turn heads — and cost less than a new smartwatch."</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:BRAND.gold,letterSpacing:3,textTransform:"uppercase"}}>— The Founders</div></div></Reveal>
      <Reveal delay={0.2}><div><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:BRAND.charcoal,lineHeight:1.85,marginBottom:24}}>It started the way most good things do — by accident. We were two classmates at Temasek Polytechnic who discovered a shared obsession with vintage watches. What began as swapping finds between lectures quickly turned into late nights hunting down our next piece together.</p><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:BRAND.charcoal,lineHeight:1.85}}>Naxo Timepieces was born from the belief that great watches shouldn't be gatekept. That you don't need to spend thousands to own something with genuine horological heritage.</p></div></Reveal>
    </div></section>
    {/* Photo Gallery - Horizontal Scroll Parallax */}
    <section style={{background:BRAND.cream,padding:"100px 0 80px",overflow:"hidden"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <Reveal><div style={{textAlign:"center",marginBottom:56}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:16}}>Behind the Scenes</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,3.5vw,48px)",color:BRAND.navy,fontWeight:700,margin:0}}>The <span style={{fontStyle:"italic",color:BRAND.gold}}>Naxo</span> Family</h2>
        </div></Reveal>
      </div>
      <GalleryScroll photos={["/gallery-1.jpeg","/gallery-2.jpeg","/gallery-3.jpeg","/gallery-4.jpeg","/gallery-5.jpeg","/gallery-6.jpeg","/gallery-7.jpeg","/gallery-8.jpeg","/gallery-9.jpeg","/gallery-10.jpeg","/gallery-11.jpeg"]}/>
    </section>
    {/* Timeline */}
    <section style={{background:BRAND.navy,padding:"100px 0",position:"relative"}}><div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:`radial-gradient(circle at 1.5px 1.5px,${BRAND.gold} 1px,transparent 0)`,backgroundSize:"32px 32px"}}/>
      <div style={{maxWidth:900,margin:"0 auto",padding:m?"0 20px":"0 40px",position:"relative"}}>
        <Reveal><div style={{textAlign:"center",marginBottom:64}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:16}}>The Journey</div><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,3.5vw,48px)",color:BRAND.cream,fontWeight:700,margin:0}}>How We Got <span style={{fontStyle:"italic",color:BRAND.gold}}>Here</span></h2></div></Reveal>
        <div style={{position:"relative"}}><div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:"rgba(201,168,76,0.25)",transform:"translateX(-50%)"}}/>
          {MILESTONES.map((m,i)=>{const isL=i%2===0;return(<Reveal key={i} delay={i*0.08}><div style={{display:"grid",gridTemplateColumns:"1fr 50px 1fr",alignItems:"center",marginBottom:40}}>
            <div style={{textAlign:"right",paddingRight:28,opacity:isL?1:0}}>{isL&&<><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:BRAND.gold,fontWeight:700,letterSpacing:2,marginBottom:6}}>{m.year}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.cream,fontWeight:600,marginBottom:6}}>{m.title}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:"rgba(245,240,232,0.5)",lineHeight:1.6}}>{m.desc}</div></>}</div>
            <div style={{display:"flex",justifyContent:"center"}}><div style={{width:12,height:12,borderRadius:"50%",background:BRAND.navy,border:`2px solid ${BRAND.gold}`,zIndex:2}}/></div>
            <div style={{paddingLeft:28,opacity:isL?0:1}}>{!isL&&<><div style={{fontFamily:"'Playfair Display',serif",fontSize:14,color:BRAND.gold,fontWeight:700,letterSpacing:2,marginBottom:6}}>{m.year}</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.cream,fontWeight:600,marginBottom:6}}>{m.title}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:"rgba(245,240,232,0.5)",lineHeight:1.6}}>{m.desc}</div></>}</div>
          </div></Reveal>)})}
        </div>
      </div>
    </section>
    {/* Values */}
    <section style={{background:BRAND.warmWhite,padding:"100px 0"}}><div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <Reveal><div style={{textAlign:"center",marginBottom:64}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:16}}>What We Stand For</div><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,3.5vw,48px)",color:BRAND.navy,fontWeight:700,margin:0}}>Our <span style={{fontStyle:"italic",color:BRAND.gold}}>Values</span></h2></div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(4,1fr)",gap:24}}>
        {[{i:"◎",t:"Authenticity First",d:"Every watch is carefully inspected and authenticated."},{i:"◈",t:"Curated, Not Mass",d:"We pick pieces with character and history."},{i:"◉",t:"Community Driven",d:"Built around real connections with watch lovers."},{i:"◇",t:"Accessible Luxury",d:"Heritage brands at fair prices."}].map((v,i)=>(
          <Reveal key={i} delay={i*0.1}><div style={{padding:"40px 28px",textAlign:"center",border:`1px solid rgba(26,39,68,0.06)`,background:BRAND.warmWhite}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:32,color:BRAND.gold,marginBottom:20}}>{v.i}</div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.navy,fontWeight:600,marginBottom:12}}>{v.t}</h3>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.7}}>{v.d}</p>
          </div></Reveal>
        ))}
      </div>
    </div></section>
    {/* CTA */}
    <section style={{background:BRAND.deepNavy,padding:"80px 0",textAlign:"center"}}><div style={{maxWidth:600,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3.5vw,44px)",color:BRAND.cream,fontWeight:700,margin:"0 0 24px"}}>Ready to Find Your <span style={{color:BRAND.gold,fontStyle:"italic"}}>Next Watch</span>?</h2>
      <div style={{display:"flex",gap:16,justifyContent:"center"}}><GoldButton onClick={()=>navigate("shop")}>Browse Collection</GoldButton><GoldButton ghost onClick={()=>navigate("contact")}>Contact Us</GoldButton></div>
    </div></section>
  </>);
}

// ═══════════════════════════════════════════
// PAGE: JOURNAL
// ═══════════════════════════════════════════

function JournalPage({navigate}) {
  const m=useIsMobile();
  const[cat,setCat]=useState("All");const[reading,setReading]=useState(null);const[hovId,setHovId]=useState(null);
  const CATS=["All","Deep Dive","Guide","Behind the Scenes","Opinion"];
  const filtered=ARTICLES.filter(a=>cat==="All"||a.category===cat);

  if(reading) return(<>
    <section style={{paddingTop:64,background:BRAND.navy}}><div style={{width:"100%",height:"45vh",minHeight:300,background:`url('${reading.img}') center/cover`,filter:"sepia(0.1)",position:"relative"}}><div style={{position:"absolute",inset:0,background:"linear-gradient(transparent 40%,rgba(15,26,48,0.7) 100%)"}}/></div></section>
    <section style={{background:BRAND.warmWhite,padding:"60px 0 100px"}}><div style={{maxWidth:720,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <button onClick={()=>setReading(null)} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.gold,background:"none",border:"none",cursor:"pointer",letterSpacing:2,textTransform:"uppercase",marginBottom:40,padding:0}}>← Back to Journal</button>
      <div style={{display:"flex",gap:12,marginBottom:24}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.navy,letterSpacing:3,textTransform:"uppercase",background:BRAND.cream,padding:"5px 14px",border:`1px solid rgba(26,39,68,0.08)`}}>{reading.category}</span><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.stone}}>{reading.date} · {reading.readTime}</span></div>
      <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(32px,4vw,48px)",color:BRAND.navy,fontWeight:700,lineHeight:1.15,margin:"0 0 16px"}}>{reading.title}</h1>
      <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:19,color:BRAND.stone,fontStyle:"italic",margin:"0 0 48px"}}>{reading.subtitle}</p>
      <div style={{width:60,height:2,background:BRAND.gold,marginBottom:48}}/>
      {reading.body.map((b,i)=>b.type==="heading"?<h2 key={i} style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:BRAND.navy,fontWeight:600,margin:"48px 0 20px"}}>{b.content}</h2>:<p key={i} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:18,color:BRAND.charcoal,lineHeight:1.9,margin:"0 0 24px"}}>{b.content}</p>)}
      <div style={{display:"flex",justifyContent:"center",gap:8,margin:"60px 0 48px"}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,borderRadius:"50%",background:BRAND.gold,opacity:0.4+i*0.2}}/>)}</div>
      <div style={{textAlign:"center"}}><GoldButton onClick={()=>setReading(null)}>Browse More Articles</GoldButton></div>
    </div></section>
  </>);

  return(<>
    <PageHero tag="Stories & Insights" title="The " titleGold="Journal" subtitle="Deep dives, buying guides, and behind-the-scenes stories from the world of neo-vintage watches."/>
    <section style={{background:BRAND.cream,borderBottom:`1px solid rgba(26,39,68,0.06)`,position:"sticky",top:60,zIndex:50}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:"16px 40px",display:"flex",gap:8,alignItems:"center"}}>
        {CATS.map(c=><button key={c} onClick={()=>setCat(c)} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,letterSpacing:2,textTransform:"uppercase",padding:"8px 20px",background:cat===c?BRAND.navy:"transparent",color:cat===c?BRAND.cream:BRAND.navy,border:`1px solid ${cat===c?BRAND.navy:"rgba(26,39,68,0.12)"}`,cursor:"pointer",transition:"all 0.25s"}}>{c}</button>)}
        <div style={{flex:1}}/><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.stone}}>{filtered.length} articles</span>
      </div>
    </section>
    <section style={{padding:"60px 0 100px",background:BRAND.warmWhite}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <div style={{display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(3,1fr)",gap:24}}>
          {filtered.map((a,i)=>(
            <Reveal key={a.id} delay={i*0.06}><div onClick={()=>{setReading(a);window.scrollTo(0,0)}} onMouseEnter={()=>setHovId(a.id)} onMouseLeave={()=>setHovId(null)} style={{cursor:"pointer",overflow:"hidden",border:`1px solid ${hovId===a.id?"rgba(201,168,76,0.4)":"rgba(26,39,68,0.06)"}`,background:BRAND.cream,transition:"all 0.5s",transform:hovId===a.id?"translateY(-5px)":"translateY(0)"}}>
              <div style={{position:"relative",overflow:"hidden"}}><div style={{width:"100%",paddingBottom:"62%",background:`url('${a.img}') center/cover`,filter:"sepia(0.08)",transition:"transform 0.8s cubic-bezier(0.22,1,0.36,1)",transform:hovId===a.id?"scale(1.05)":"scale(1)"}}/><div style={{position:"absolute",bottom:0,left:0,right:0,height:"40%",background:`linear-gradient(transparent,${BRAND.cream})`}}/><div style={{position:"absolute",top:16,left:16,background:"rgba(15,26,48,0.7)",backdropFilter:"blur(4px)",padding:"4px 12px",fontFamily:"'Cormorant Garamond',serif",fontSize:10,color:BRAND.gold,letterSpacing:3,textTransform:"uppercase"}}>{a.category}</div></div>
              <div style={{padding:"0 24px 28px",marginTop:-20,position:"relative"}}><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:BRAND.navy,fontWeight:600,lineHeight:1.3,margin:"0 0 10px"}}>{a.title}</h3><div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.stone}}>{a.date} · {a.readTime}</span><span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:hovId===a.id?BRAND.gold:BRAND.navy,letterSpacing:2,textTransform:"uppercase",transition:"color 0.3s"}}>Read →</span></div></div>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>
  </>);
}

// ═══════════════════════════════════════════
// PAGE: EVENTS
// ═══════════════════════════════════════════

function EventsPage({navigate}) {
  const m=useIsMobile();
  const[expIdx,setExpIdx]=useState(null);
  const upcoming=[
    {title:"The Retro Factory",date:"2–4 Oct 2026",time:"10AM–10PM",loc:"Katong Square",addr:"E Coast Rd, #86-88, Singapore 428788",note:"Free Sake",status:"soon"},
    {title:"Retro Kulture",date:"4 Oct 2026",time:"11AM–7PM",loc:"Kapo Factory Building",addr:"Tai Seng, Upper Paya Lebar",note:"",status:"soon"},
    {title:"SMUSA Bizneyland",date:"27–28 Oct 2026",time:"12PM–6PM",loc:"SMU T-Junction",addr:"Singapore Management University",note:"",status:"soon"},
  ];
  const past=[
    {title:"SMUSA Bizneyland",date:"Sep 2026",loc:"SMU",recap:"An exciting student-run market at SMU. Great energy from a young crowd discovering vintage watches for the first time."},
    {title:"CSNC Block Party (Common Man Coffee Roasters)",date:"Aug 2026",loc:"52 Chin Swee Rd",recap:"A vibrant block party hosted by Common Man Coffee Roasters. Coffee, community, and vintage watches — a great combination."},
    {title:"SIJE — Singapore International Jewellery Exhibition",date:"Jul 2026",loc:"Marina Bay Sands",recap:"A prestigious exhibition at MBS alongside fine jewellery brands. A new crowd for us and a great platform for the brand."},
    {title:"Earthtopia Festival",date:"May 2026",loc:"Fort Canning Park",recap:"A sustainability-focused outdoor festival at Fort Canning. The neo-vintage ethos resonated well — buying less, buying better."},
    {title:"Matsuri Vintage Market (Sake Matsuri Festival)",date:"Mar 2026",loc:"F1 Pit Building",recap:"A massive vintage market during the Sake Matsuri Festival. Great turnout, great sake, and plenty of watch conversations."},
    {title:"Hammock Market",date:"Jan 2026",loc:"Aperia Mall",recap:"A flea market vibe at Aperia Mall. Casual, fun, and a good mix of first-time visitors and returning collectors."},
    {title:"m/m Bar (Wine & Watches Event)",date:"Jan 2026",loc:"Circular Road",recap:"An intimate Wine & Watches evening at m/m Bar. Fine wine, fine watches, and great company."},
    {title:"Temasek Polytechnic (Alumni Returns)",date:"Jan 2026",loc:"Tampines",recap:"Back at our alma mater for the Alumni Returns event. Full circle moment for us."},
    {title:"Resurrack Market (Christmas Edition)",date:"Dec 2025",loc:"Bugis Street Art Lane",recap:"The Christmas edition of Resurrack — festive energy and holiday gift shoppers made this one special."},
    {title:"Temasek Polytechnic (Alumni Returns)",date:"Dec 2025",loc:"Tampines",recap:"Our first time setting up at TP where it all began. Emotional, nostalgic, and packed with familiar faces."},
    {title:"Fronds & Finds",date:"Nov 2025",loc:"Katong",recap:"A yoga studio turned pop-up event space. Unexpected venue, unexpectedly amazing turnout."},
    {title:"Curbside Crafters (Curated Vendors)",date:"Oct 2025",loc:"North Bridge Road",recap:"A curated vendor market alongside fellow independent brands. Great synergy and new customers."},
    {title:"Resurrack (Planet Racks Event)",date:"Jun 2025",loc:"Bugis Street Art Lane",recap:"Our first time at Resurrack's Planet Racks event. The Bugis Street Art Lane setting gave it real character."},
    {title:"Middle Child Bar (Father's Day Event)",date:"Jun 2025",loc:"Bencoolen",recap:"A Father's Day pop-up at Middle Child Bar. Lots of sons and daughters picking out watches for dad."},
  ];

  return(<>
    <PageHero tag="Pop-Ups & Events" title="Come See the " titleGold="Watches" subtitle="We believe watches should be seen, held, and tried on."/>
    {/* Upcoming */}
    <section style={{background:BRAND.warmWhite,padding:"80px 0 100px"}}><div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <Reveal><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:16}}>What's Next</div><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,44px)",color:BRAND.navy,fontWeight:700,margin:"0 0 48px"}}>Upcoming <span style={{fontStyle:"italic",color:BRAND.gold}}>Events</span></h2></Reveal>
      <div style={{display:"flex",flexDirection:"column",gap:24}}>
        {upcoming.map((ev,i)=>(
          <Reveal key={i} delay={i*0.1}><div style={{display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",background:BRAND.cream,border:`1px solid rgba(26,39,68,0.06)`}}>
            <div style={{padding:48,display:"flex",alignItems:"center",justifyContent:"center",background:BRAND.cream,minHeight:300}}>
              <div style={{textAlign:"center"}}><div style={{fontFamily:"'Playfair Display',serif",fontSize:64,color:BRAND.gold,fontWeight:700,lineHeight:1}}>{ev.date.split(" ")[0]}</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:BRAND.stone,letterSpacing:2,marginTop:8}}>{ev.date.split(" ").slice(1).join(" ")}</div>
              {ev.note&&<div style={{marginTop:20,display:"inline-block",background:BRAND.gold,padding:"8px 20px",fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.navy,letterSpacing:2,textTransform:"uppercase",fontWeight:700}}>✦ {ev.note}</div>}</div>
            </div>
            <div style={{padding:"48px 40px",display:"flex",flexDirection:"column",justifyContent:"center"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:8,background:ev.status==="now"?"#2d6a4f":BRAND.gold,padding:"6px 16px",fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:ev.status==="now"?"#fff":BRAND.navy,letterSpacing:3,textTransform:"uppercase",fontWeight:600,marginBottom:20,alignSelf:"flex-start"}}>
                {ev.status==="now"&&<span style={{width:8,height:8,borderRadius:"50%",background:"#6ee7a0",animation:"pulse 1.5s ease infinite"}}/>}{ev.status==="now"?"Happening Now":"Coming Soon"}
              </div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:32,color:BRAND.navy,fontWeight:700,margin:"0 0 20px"}}>{ev.title}</h3>
              <div style={{display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:"16px 32px",marginBottom:24}}>
                <div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:10,color:BRAND.stone,letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>Time</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:BRAND.navy,fontWeight:600}}>{ev.time}</div></div>
                <div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:10,color:BRAND.stone,letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>Venue</div><div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:BRAND.navy,fontWeight:600}}>{ev.loc}</div></div>
              </div>
              {ev.addr&&<div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:14,color:BRAND.stone}}>{ev.addr}</div>}
            </div>
          </div></Reveal>
        ))}
      </div>
    </div></section>
    {/* Past */}
    <section style={{background:BRAND.navy,padding:"100px 0",position:"relative"}}><div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:`radial-gradient(circle at 1.5px 1.5px,${BRAND.gold} 1px,transparent 0)`,backgroundSize:"32px 32px"}}/>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px",position:"relative"}}>
        <Reveal><div style={{marginBottom:60}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:16}}>Looking Back</div><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,44px)",color:BRAND.cream,fontWeight:700,margin:"0 0 20px"}}>Past <span style={{fontStyle:"italic",color:BRAND.gold}}>Pop-Ups</span></h2><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"rgba(245,240,232,0.5)",lineHeight:1.7,maxWidth:600}}>Aside from The Retro Factory at Katong Square — which we host monthly — here are the other events and pop-ups we've been part of.</p></div></Reveal>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {past.map((ev,i)=>(
            <Reveal key={i} delay={i*0.06}><div onClick={()=>setExpIdx(expIdx===i?null:i)} style={{background:"rgba(245,240,232,0.04)",border:`1px solid rgba(201,168,76,${expIdx===i?"0.3":"0.08"})`,cursor:"pointer",transition:"all 0.4s",overflow:"hidden"}}>
              <div style={{display:"grid",gridTemplateColumns:m?"1fr 70px 30px":"1fr 140px 160px 40px",alignItems:"center",padding:"22px 28px",gap:20}}>
                <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.cream,fontWeight:600,margin:0}}>{ev.title}</h3>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.gold,letterSpacing:2}}>{ev.date}</div>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:"rgba(245,240,232,0.45)"}}>{ev.loc}</div>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:BRAND.gold,textAlign:"center",transform:expIdx===i?"rotate(45deg)":"rotate(0deg)",transition:"transform 0.3s"}}>+</div>
              </div>
              <div style={{maxHeight:expIdx===i?120:0,opacity:expIdx===i?1:0,transition:"all 0.5s cubic-bezier(0.22,1,0.36,1)",overflow:"hidden"}}>
                <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:"rgba(245,240,232,0.55)",lineHeight:1.7,padding:"0 28px 24px",margin:0,borderTop:`1px solid rgba(201,168,76,0.1)`,paddingTop:20}}>{ev.recap}</p>
              </div>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>
    {/* Event CTA */}
    <section style={{background:BRAND.deepNavy,padding:"80px 0",textAlign:"center",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:0.04,backgroundImage:`radial-gradient(circle at 2px 2px,${BRAND.gold} 1px,transparent 0)`,backgroundSize:"40px 40px"}}/>
      <div style={{maxWidth:560,margin:"0 auto",padding:m?"0 20px":"0 40px",position:"relative"}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,3vw,40px)",color:BRAND.cream,fontWeight:700,lineHeight:1.2,margin:"0 0 20px"}}>Want Us at <span style={{color:BRAND.gold,fontStyle:"italic"}}>Your Event</span>?</h2>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:"rgba(245,240,232,0.5)",marginBottom:36,lineHeight:1.7}}>We're open to collaborations — markets, corporate events, private viewings. Drop us a message.</p>
        <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
          <a href="https://www.instagram.com/naxotimepieces/" target="_blank" rel="noopener noreferrer" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,letterSpacing:2,textTransform:"uppercase",background:"transparent",color:BRAND.cream,border:`1px solid rgba(201,168,76,0.4)`,padding:"14px 28px",cursor:"pointer",fontWeight:600,transition:"all 0.3s",textDecoration:"none"}}
            onMouseEnter={e=>{e.target.style.background=BRAND.gold;e.target.style.color=BRAND.navy;e.target.style.borderColor=BRAND.gold}}
            onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=BRAND.cream;e.target.style.borderColor="rgba(201,168,76,0.4)"}}>Instagram</a>
          <a href="https://wa.me/6588255367?text=Hi%20Naxo!%20I%27d%20like%20to%20enquire%20about%20having%20you%20at%20our%20event." target="_blank" rel="noopener noreferrer" style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,letterSpacing:2,textTransform:"uppercase",background:"transparent",color:BRAND.cream,border:`1px solid rgba(201,168,76,0.4)`,padding:"14px 28px",cursor:"pointer",fontWeight:600,transition:"all 0.3s",textDecoration:"none"}}
            onMouseEnter={e=>{e.target.style.background=BRAND.gold;e.target.style.color=BRAND.navy;e.target.style.borderColor=BRAND.gold}}
            onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=BRAND.cream;e.target.style.borderColor="rgba(201,168,76,0.4)"}}>WhatsApp</a>
        </div>
      </div>
    </section>
  </>);
}

// ═══════════════════════════════════════════
// PAGE: HOW IT WORKS
// ═══════════════════════════════════════════

function HowItWorksPage({navigate}) {
  const m=useIsMobile();
  const[openHiwFaq,setOpenHiwFaq]=useState(null);
  const steps=[
    {num:"01",title:"Send Us Your Watch Details",desc:"DM us on Instagram, Telegram, or WhatsApp with photos of your watch — front, back, and any close-ups of the dial, case, and movement if possible. Include the brand, model, and any known history about the piece."},
    {num:"02",title:"We Assess & Make an Offer",desc:"Our team will evaluate your watch based on its condition, rarity, market demand, and authenticity. We'll get back to you within 24–48 hours with a fair and transparent offer — or a consignment proposal if that's a better fit."},
    {num:"03",title:"Choose Your Option",desc:"You can sell outright for immediate cash, trade towards another watch in our collection, or consign with us and we'll handle the listing, photography, and sale on your behalf."},
    {num:"04",title:"Meet Up & Complete the Deal",desc:"We'll arrange a meet-up at our location at Mu Templar Service Centre (Far East Plaza, #02-20A) or at one of our pop-up events. Payment is made on the spot — fast, simple, no hassle."},
  ];

  return(<>
    <PageHero tag="Sell · Trade · Consign" title="How It " titleGold="Works" subtitle="Thinking about selling, trading, or consigning your watch? Here's how the process works — simple, transparent, and fair."/>
    
    {/* Steps */}
    <section style={{background:BRAND.warmWhite,padding:"80px 0 100px"}}><div style={{maxWidth:900,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      {steps.map((s,i)=>(
        <Reveal key={i} delay={i*0.1}><div style={{display:"flex",gap:m?20:40,alignItems:"flex-start",paddingBottom:40,marginBottom:40,borderBottom:i<steps.length-1?`1px solid rgba(26,39,68,0.08)`:"none"}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?36:56,color:BRAND.gold,fontWeight:700,lineHeight:1,flexShrink:0,opacity:0.4}}>{s.num}</div>
          <div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:m?20:24,color:BRAND.navy,fontWeight:600,margin:"0 0 12px"}}>{s.title}</h3>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:m?16:18,color:BRAND.charcoal,lineHeight:1.8,margin:0}}>{s.desc}</p>
          </div>
        </div></Reveal>
      ))}
    </div></section>

    {/* Options comparison */}
    <section style={{background:BRAND.cream,padding:"80px 0"}}><div style={{maxWidth:1200,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <Reveal><div style={{textAlign:"center",marginBottom:56}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:16}}>Your Options</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"clamp(28px,5vw,36px)":"clamp(32px,3.5vw,44px)",color:BRAND.navy,fontWeight:700,margin:0}}>Three Ways to <span style={{fontStyle:"italic",color:BRAND.gold}}>Work With Us</span></h2>
      </div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:m?"1fr":"repeat(3,1fr)",gap:24}}>
        {[
          {title:"Sell",icon:"◎",points:["Immediate cash payment","Fair market valuation","No listing or waiting","Meet up and done"]},
          {title:"Trade",icon:"⇄",points:["Swap towards any piece in our collection","Top-up or credit the difference","Upgrade or change your style","Same-day exchange"]},
          {title:"Consign",icon:"◈",points:["We handle everything — photos, listing, sale","Your watch gets maximum exposure","Competitive commission rate","Payment upon sale"]},
        ].map((opt,i)=>(
          <Reveal key={i} delay={i*0.1}><div style={{padding:m?"32px 24px":"40px 32px",background:BRAND.warmWhite,border:`1px solid rgba(26,39,68,0.06)`,textAlign:"center"}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:36,color:BRAND.gold,marginBottom:16}}>{opt.icon}</div>
            <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:BRAND.navy,fontWeight:600,marginBottom:20}}>{opt.title}</h3>
            {opt.points.map((p,j)=><p key={j} style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.8,margin:"0 0 8px"}}>✦ {p}</p>)}
          </div></Reveal>
        ))}
      </div>
    </div></section>

    {/* FAQ */}
    <section style={{background:BRAND.warmWhite,padding:"80px 0"}}><div style={{maxWidth:800,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <Reveal><div style={{textAlign:"center",marginBottom:48}}>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"clamp(24px,5vw,32px)":"clamp(28px,3vw,40px)",color:BRAND.navy,fontWeight:700,margin:0}}>Common <span style={{fontStyle:"italic",color:BRAND.gold}}>Questions</span></h2>
      </div></Reveal>
      {[
        {q:"What brands do you buy?",a:"We buy Seiko, Omega, Cartier, Longines, Universal Genève, Tudor, Rolex, JLC, and more. If you're unsure, just send us photos and we'll let you know."},
        {q:"How do you determine the price?",a:"We consider the brand, model, condition, completeness (box/papers), current market value, and demand. Our offers are based on real market data — no lowballing."},
        {q:"How long does consignment take?",a:"It depends on the piece. Popular models can sell within days, while niche pieces may take a few weeks. We'll give you an honest estimate upfront."},
        {q:"Can I sell a watch that needs repair?",a:"Yes — we buy watches in all conditions, including those needing servicing. The offer will reflect the cost of repair, but we're happy to take them off your hands."},
        {q:"Is there a minimum value?",a:"We're open to all price ranges. Whether it's a S$100 Seiko or a S$5,000 Rolex, we're happy to chat."},
      ].map((faq,i)=>(
        <Reveal key={i} delay={i*0.05}><div onClick={()=>setOpenHiwFaq(openHiwFaq===i?null:i)} style={{background:BRAND.cream,border:`1px solid ${openHiwFaq===i?"rgba(201,168,76,0.3)":"rgba(26,39,68,0.06)"}`,cursor:"pointer",overflow:"hidden",marginBottom:8}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 28px"}}><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:m?15:17,color:BRAND.navy,fontWeight:600,margin:0}}>{faq.q}</h3><span style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:BRAND.gold,transform:openHiwFaq===i?"rotate(45deg)":"rotate(0)",transition:"transform 0.3s",flexShrink:0,marginLeft:16}}>+</span></div>
          <div style={{maxHeight:openHiwFaq===i?200:0,opacity:openHiwFaq===i?1:0,transition:"all 0.4s cubic-bezier(0.22,1,0.36,1)",overflow:"hidden"}}><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.8,padding:"0 28px 24px",margin:0,borderTop:`1px solid rgba(26,39,68,0.06)`,paddingTop:20}}>{faq.a}</p></div>
        </div></Reveal>
      ))}
    </div></section>

    {/* CTA */}
    <section style={{background:BRAND.deepNavy,padding:"80px 0",textAlign:"center"}}><div style={{maxWidth:560,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:m?"clamp(24px,5vw,32px)":"clamp(28px,3vw,40px)",color:BRAND.cream,fontWeight:700,lineHeight:1.2,margin:"0 0 20px"}}>Ready to <span style={{color:BRAND.gold,fontStyle:"italic"}}>Get Started</span>?</h2>
      <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:"rgba(245,240,232,0.5)",marginBottom:36,lineHeight:1.7}}>Send us your watch details and we'll get back to you within 24 hours.</p>
      <div style={{display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
        <GoldButton onClick={()=>navigate("contact")}>Contact Us</GoldButton>
        <GoldButton ghost onClick={()=>navigate("shop")}>Browse Our Collection</GoldButton>
      </div>
    </div></section>
  </>);
}

// ═══════════════════════════════════════════
// PAGE: CONTACT
// ═══════════════════════════════════════════

function ContactPage({navigate}) {
  const m=useIsMobile();
  const[form,setForm]=useState({name:"",email:"",type:"",message:""});const[sent,setSent]=useState(false);const[hovCh,setHovCh]=useState(null);const[openFaq,setOpenFaq]=useState(null);
  const channels=[{name:"Instagram",handle:"@naxotimepieces",icon:"📷",link:"https://www.instagram.com/naxotimepieces/"},{name:"Telegram",handle:"@naxotimepiecessg",icon:"✈️",link:"https://t.me/naxotimepiecessg"},{name:"WhatsApp",handle:"Chat with us",icon:"💬",link:"https://wa.me/6588255367"},{name:"Email",handle:"naxotimepieces@gmail.com",icon:"✉️",link:"mailto:naxotimepieces@gmail.com"},{name:"Carousell",handle:"@naxotimepieces",icon:"🛒",link:"https://www.carousell.sg/u/naxotimepieces/"},{name:"TikTok",handle:"@naxotimepieces",icon:"🎵",link:"https://www.tiktok.com/@naxotimepieces"},{name:"Facebook",handle:"Naxo Timepieces",icon:"👥",link:"https://www.facebook.com/share/1YAru9ssGW/?mibextid=wwXIfr"}];
  const faqs=[{q:"Are your watches authentic?",a:"Yes — every watch is carefully inspected and authenticated. We stand behind everything we sell."},{q:"Do you ship internationally?",a:"On a case-by-case basis. Drop us a message with your location."},{q:"How does consignment work?",a:"Send us photos. We'll value, photograph, list, and sell. Competitive commission."},{q:"Do you do repairs?",a:"We work with trusted watchmakers for servicing, crystals, and straps."}];
  const inpStyle={width:"100%",padding:"14px 18px",fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.navy,background:BRAND.warmWhite,border:`1px solid rgba(26,39,68,0.12)`,outline:"none",letterSpacing:0.5};

  return(<>
    <PageHero tag="Get In Touch" title="Let's " titleGold="Talk Watches" subtitle="Whether you're looking for a specific piece, want to consign, or just want to geek out — we'd love to hear from you."/>
    {/* Channels */}
    <section style={{background:BRAND.warmWhite,padding:"80px 0"}}><div style={{maxWidth:1200,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <Reveal><div style={{textAlign:"center",marginBottom:48}}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:16}}>Reach Us On</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,40px)",color:BRAND.navy,fontWeight:700,margin:0}}>Our <span style={{fontStyle:"italic",color:BRAND.gold}}>Channels</span></h2>
      </div></Reveal>
      <div style={{display:"grid",gridTemplateColumns:m?"repeat(2,1fr)":"repeat(4,1fr)",gap:16,marginBottom:16}}>
        {channels.slice(0,4).map((ch,i)=>(
          <Reveal key={ch.name} delay={i*0.06}><a href={ch.link} target="_blank" rel="noopener noreferrer" onMouseEnter={()=>setHovCh(i)} onMouseLeave={()=>setHovCh(null)} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:m?"24px 16px":"32px 24px",background:hovCh===i?BRAND.cream:BRAND.warmWhite,border:`1px solid ${hovCh===i?"rgba(201,168,76,0.4)":"rgba(26,39,68,0.06)"}`,transition:"all 0.4s",cursor:"pointer",textDecoration:"none",transform:hovCh===i?"translateY(-4px)":"translateY(0)"}}>
            <div style={{fontSize:28,marginBottom:12}}>{ch.icon}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?16:18,color:BRAND.navy,fontWeight:600,marginBottom:4}}>{ch.name}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:hovCh===i?BRAND.gold:BRAND.stone,transition:"color 0.3s"}}>{ch.handle}</div>
          </a></Reveal>
        ))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:m?"repeat(3,1fr)":"repeat(3,1fr)",gap:16}}>
        {channels.slice(4).map((ch,i)=>(
          <Reveal key={ch.name} delay={(i+4)*0.06}><a href={ch.link} target="_blank" rel="noopener noreferrer" onMouseEnter={()=>setHovCh(i+4)} onMouseLeave={()=>setHovCh(null)} style={{display:"flex",flexDirection:"column",alignItems:"center",padding:m?"20px 12px":"28px 24px",background:hovCh===i+4?BRAND.cream:BRAND.warmWhite,border:`1px solid ${hovCh===i+4?"rgba(201,168,76,0.4)":"rgba(26,39,68,0.06)"}`,transition:"all 0.4s",cursor:"pointer",textDecoration:"none",transform:hovCh===i+4?"translateY(-4px)":"translateY(0)"}}>
            <div style={{fontSize:24,marginBottom:10}}>{ch.icon}</div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?14:16,color:BRAND.navy,fontWeight:600,marginBottom:4}}>{ch.name}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:hovCh===i+4?BRAND.gold:BRAND.stone,transition:"color 0.3s"}}>{ch.handle}</div>
          </a></Reveal>
        ))}
      </div>
    </div></section>
    {/* Form */}
    <section style={{background:BRAND.cream,padding:"100px 0"}}><div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px",display:"grid",gridTemplateColumns:m?"1fr":"1fr 1.2fr",gap:m?32:80,alignItems:"start"}}>
      <Reveal><div>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:16}}>Send Us a Message</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,40px)",color:BRAND.navy,fontWeight:700,margin:"0 0 24px"}}>Enquiry <span style={{fontStyle:"italic",color:BRAND.gold}}>Form</span></h2>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:BRAND.charcoal,lineHeight:1.8,marginBottom:40}}>Drop us a message and we'll get back to you within 24 hours.</p>
        <div style={{padding:"28px 32px",background:BRAND.warmWhite,border:`1px solid rgba(26,39,68,0.06)`}}>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:BRAND.navy,fontWeight:600,marginBottom:8}}>Visit Us — By Appointment</div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.7}}>Mu Templar Service Centre<br/>Far East Plaza, #02-20A<br/>14 Scotts Road, Singapore 228213</div>
        </div>
      </div></Reveal>
      <Reveal delay={0.15}><div style={{padding:"48px 44px",background:BRAND.warmWhite,border:`1px solid rgba(26,39,68,0.06)`}}>
        {sent?<div style={{textAlign:"center",padding:"40px 0"}}><div style={{fontSize:48,marginBottom:24}}>✦</div><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:28,color:BRAND.navy,fontWeight:700,margin:"0 0 12px"}}>Message Sent</h3><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:BRAND.stone}}>We'll get back to you within 24 hours.</p></div>:
        <><div style={{display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:24,marginBottom:24}}>
          <div><label style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.stone,letterSpacing:3,textTransform:"uppercase",marginBottom:8,display:"block"}}>Your Name</label><input type="text" placeholder="e.g. John" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={inpStyle}/></div>
          <div><label style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.stone,letterSpacing:3,textTransform:"uppercase",marginBottom:8,display:"block"}}>Email</label><input type="email" placeholder="john@email.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={inpStyle}/></div>
        </div>
        <div style={{marginBottom:24}}><label style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.stone,letterSpacing:3,textTransform:"uppercase",marginBottom:8,display:"block"}}>What's This About?</label><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} style={{...inpStyle,cursor:"pointer"}}><option value="">Select...</option>{["Interested in a watch","Looking to sell/consign","Sourcing request","Repair/servicing","Collaboration","General question"].map(t=><option key={t}>{t}</option>)}</select></div>
        <div style={{marginBottom:32}}><label style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.stone,letterSpacing:3,textTransform:"uppercase",marginBottom:8,display:"block"}}>Message</label><textarea placeholder="Tell us what you're looking for..." rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} style={{...inpStyle,resize:"vertical",minHeight:120}}/></div>
        <button onClick={async()=>{try{await fetch("https://formspree.io/f/xaqlrrwa",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:form.name,email:form.email,type:form.type,message:form.message})});setSent(true)}catch(e){setSent(true)}}} style={{width:"100%",fontFamily:"'Cormorant Garamond',serif",fontSize:15,letterSpacing:3,textTransform:"uppercase",background:BRAND.gold,color:BRAND.navy,border:"none",padding:"18px 40px",cursor:"pointer",fontWeight:600,transition:"all 0.3s"}} onMouseEnter={e=>e.target.style.background="#d4b45e"} onMouseLeave={e=>e.target.style.background=BRAND.gold}>Send Enquiry</button></>}
      </div></Reveal>
    </div></section>
    {/* Location */}
    <section style={{background:BRAND.navy,padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:0.03,backgroundImage:`radial-gradient(circle at 1.5px 1.5px,${BRAND.gold} 1px,transparent 0)`,backgroundSize:"32px 32px"}}/>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px",position:"relative",display:"grid",gridTemplateColumns:m?"1fr":"1fr 1fr",gap:m?32:60,alignItems:"center"}}>
        <Reveal><div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:16}}>Visit Us</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,44px)",color:BRAND.cream,fontWeight:700,margin:"0 0 32px",lineHeight:1.15}}>Our <span style={{fontStyle:"italic",color:BRAND.gold}}>Location</span></h2>
          <div style={{display:"inline-flex",alignItems:"center",gap:10,background:"rgba(201,168,76,0.12)",border:`1px solid rgba(201,168,76,0.25)`,padding:"10px 20px",marginBottom:32}}>
            <span style={{width:8,height:8,borderRadius:"50%",background:BRAND.gold}}/>
            <span style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:3,textTransform:"uppercase",fontWeight:600}}>By Appointment Only</span>
          </div>
          <div style={{marginBottom:40}}>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:22,color:BRAND.cream,fontWeight:600,marginBottom:8}}>Mu Templar Service Centre</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"rgba(245,240,232,0.6)",lineHeight:1.8}}>Far East Plaza<br/>14 Scotts Road, #02-20A<br/>Singapore 228213</div>
          </div>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"rgba(245,240,232,0.45)",lineHeight:1.8,marginBottom:32,borderLeft:`2px solid rgba(201,168,76,0.3)`,paddingLeft:20}}>We operate out of Mu Templar Service Centre at Far East Plaza. Visits are by appointment only — drop us a DM on Instagram or Telegram to schedule a viewing.</p>
          <div style={{display:"flex",gap:12}}>
            <GoldButton onClick={()=>window.open("https://wa.me/6588255367?text=Hi%20Naxo!%20I%27d%20like%20to%20book%20an%20appointment%20to%20view%20watches.","_blank")}>Book an Appointment</GoldButton>
            <GoldButton ghost onClick={()=>window.open("https://www.google.com/maps/dir//Far+East+Plaza+14+Scotts+Rd+Singapore+228213","_blank")}>Get Directions</GoldButton>
          </div>
        </div></Reveal>
        <Reveal delay={0.15}><div style={{position:"relative",overflow:"hidden",border:`1px solid rgba(201,168,76,0.15)`}}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7889!2d103.8313!3d1.3066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da19a7d0e1e937%3A0x8c3b3e5c2d3a1b0c!2sFar%20East%20Plaza!5e0!3m2!1sen!2ssg!4v1700000000000!5m2!1sen!2ssg" width="100%" height="460" style={{border:0,display:"block",filter:"grayscale(0.6) contrast(1.1)"}} allowFullScreen="" loading="lazy" title="Location"/>
          <div style={{position:"absolute",bottom:20,left:20,right:20,background:"rgba(15,26,48,0.9)",backdropFilter:"blur(8px)",padding:"16px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontFamily:"'Playfair Display',serif",fontSize:15,color:BRAND.cream,fontWeight:600}}>Mu Templar Service Centre</div><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:"rgba(245,240,232,0.5)"}}>Far East Plaza #02-20A</div></div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:10,color:BRAND.gold,letterSpacing:3,textTransform:"uppercase",border:`1px solid rgba(201,168,76,0.3)`,padding:"6px 14px"}}>Appointment Only</div>
          </div>
        </div></Reveal>
      </div>
    </section>
    {/* FAQ */}
    <section style={{background:BRAND.warmWhite,padding:"100px 0"}}><div style={{maxWidth:800,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
      <Reveal><div style={{textAlign:"center",marginBottom:56}}><div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:16}}>Common Questions</div><h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,40px)",color:BRAND.navy,fontWeight:700,margin:0}}>Frequently <span style={{fontStyle:"italic",color:BRAND.gold}}>Asked</span></h2></div></Reveal>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {faqs.map((faq,i)=>(
          <Reveal key={i} delay={i*0.05}><div onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{background:BRAND.cream,border:`1px solid ${openFaq===i?"rgba(201,168,76,0.3)":"rgba(26,39,68,0.06)"}`,cursor:"pointer",overflow:"hidden"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 28px"}}><h3 style={{fontFamily:"'Playfair Display',serif",fontSize:17,color:BRAND.navy,fontWeight:600,margin:0}}>{faq.q}</h3><span style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:BRAND.gold,transform:openFaq===i?"rotate(45deg)":"rotate(0)",transition:"transform 0.3s",flexShrink:0,marginLeft:16}}>+</span></div>
            <div style={{maxHeight:openFaq===i?200:0,opacity:openFaq===i?1:0,transition:"all 0.4s cubic-bezier(0.22,1,0.36,1)",overflow:"hidden"}}><p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.8,padding:"0 28px 24px",margin:0,borderTop:`1px solid rgba(26,39,68,0.06)`,paddingTop:20}}>{faq.a}</p></div>
          </div></Reveal>
        ))}
      </div>
    </div></section>
  </>);
}

// ═══════════════════════════════════════════
// MAIN APP — Router
// ═══════════════════════════════════════════

// ═══════════════════════════════════════════
// PAGE: SERVICING
// ═══════════════════════════════════════════

function ServicingPage({navigate}) {
  const m=useIsMobile();const[openFaq,setOpenFaq]=useState(null);
  const services=[
    {icon:"🔋",title:"Battery Replacement",price:"From S$15",desc:"Quick and clean battery swap for quartz watches. We use quality cells and test the watch thoroughly before returning it to you.",time:"Same day"},
    {icon:"🔧",title:"Basic Service",price:"From S$80",desc:"Full movement clean, oil, and regulation. Includes case and bracelet clean. Ideal for watches that are running slow or losing time.",time:"3–5 days"},
    {icon:"⚙️",title:"Full Overhaul",price:"From S$180",desc:"Complete disassembly, ultrasonic clean, lubrication, and reassembly of all components. Recommended every 3–5 years for mechanical watches.",time:"1–2 weeks"},
    {icon:"✨",title:"Case Polishing",price:"From S$40",desc:"Light polishing of case and bracelet to restore lustre. We take a conservative approach — we won't over-polish vintage pieces.",time:"2–3 days"},
    {icon:"🔗",title:"Bracelet & Strap",price:"From S$20",desc:"Bracelet sizing, pin replacement, and strap changes. We carry a range of quality leather and NATO straps if you need a replacement.",time:"Same day"},
    {icon:"🔍",title:"Authentication & Valuation",price:"From S$30",desc:"Full inspection and authentication report for your watch. Useful for insurance, resale, or just peace of mind about what you own.",time:"1–2 days"},
    {icon:"💧",title:"Pressure Testing",price:"From S$25",desc:"Water resistance testing for dive and sport watches. Essential after any service or if you plan to wear your watch near water.",time:"Same day"},
    {icon:"📐",title:"Dial Restoration",price:"Quote on request",desc:"Cleaning and light restoration of dials. We work carefully to preserve patina while removing dirt and damage. Pricing depends on condition.",time:"1–2 weeks"},
  ];

  const faqs=[
    {q:"Do I need an appointment?",a:"Yes — we operate by appointment at Mu Templar Service Centre, Far East Plaza #02-20A. DM us on WhatsApp or Instagram to book a slot. Drop-ins may be accommodated depending on availability."},
    {q:"How do I get a quote for my watch?",a:"Send us a few photos of your watch via WhatsApp with a brief description of the issue. We'll give you an honest assessment and quote before any work begins."},
    {q:"Do you service all watch brands?",a:"We specialise in vintage and neo-vintage pieces — Seiko, Omega, Longines, Cartier, Universal Genève, and similar. We also handle Tudor and Rolex for basic services. Some modern watches may be better served by authorised centres."},
    {q:"Will servicing affect my watch's value?",a:"Done correctly, servicing maintains and can improve value. We're experienced with vintage pieces and take a conservative approach — preserving originality wherever possible."},
    {q:"What's your turnaround time?",a:"It varies by service type. Battery replacements and strap changes are often same day. Full overhauls can take 1–2 weeks. We'll give you a realistic timeframe when you drop off your watch."},
    {q:"Do you offer a warranty on servicing?",a:"Yes — all our service work comes with a 6-month movement warranty. If the issue reoccurs within that period, we'll take another look at no charge."},
  ];

  return(<>
    <PageHero tag="Watch Care" title="Our " titleGold="Servicing" subtitle="Professional care for your timepieces — from battery swaps to full overhauls."/>

    {/* Services Grid */}
    <section style={{background:BRAND.warmWhite,padding:"100px 0"}}>
      <div style={{maxWidth:1400,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <Reveal><div style={{textAlign:"center",marginBottom:64}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:16}}>What We Offer</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,44px)",color:BRAND.navy,fontWeight:700,margin:"0 0 16px"}}>Services & <span style={{fontStyle:"italic",color:BRAND.gold}}>Pricing</span></h2>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:17,color:BRAND.stone,maxWidth:560,margin:"0 auto",lineHeight:1.7}}>All prices are indicative. Final quotes are given after inspection. We work on vintage and neo-vintage timepieces with care and honesty.</p>
        </div></Reveal>
        <div style={{display:"grid",gridTemplateColumns:m?"1fr":"repeat(2,1fr)",gap:2,background:"rgba(26,39,68,0.06)"}}>
          {services.map((s,i)=>(
            <Reveal key={i} delay={i*0.05}><div style={{background:BRAND.warmWhite,padding:m?"28px 24px":"36px 40px",transition:"all 0.3s"}}
              onMouseEnter={e=>e.currentTarget.style.background=BRAND.cream}
              onMouseLeave={e=>e.currentTarget.style.background=BRAND.warmWhite}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12,flexWrap:"wrap",gap:8}}>
                <div style={{display:"flex",alignItems:"center",gap:14}}>
                  <span style={{fontSize:28}}>{s.icon}</span>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?17:20,color:BRAND.navy,fontWeight:700}}>{s.title}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontFamily:"'Playfair Display',serif",fontSize:16,color:BRAND.gold,fontWeight:600}}>{s.price}</div>
                  <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:11,color:BRAND.stone,letterSpacing:2,textTransform:"uppercase",marginTop:2}}>{s.time}</div>
                </div>
              </div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.8,margin:0}}>{s.desc}</p>
            </div></Reveal>
          ))}
        </div>
        <Reveal><div style={{marginTop:48,background:BRAND.navy,padding:m?"28px 24px":"40px 48px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24}}>
          <div>
            <div style={{fontFamily:"'Playfair Display',serif",fontSize:m?20:26,color:BRAND.cream,fontWeight:700,marginBottom:8}}>Not sure what your watch needs?</div>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,color:"rgba(245,240,232,0.6)",margin:0}}>Send us photos and we'll advise for free — no obligation.</p>
          </div>
          <GoldButton onClick={()=>window.open("https://wa.me/6588255367?text=Hi%20Naxo!%20I%27d%20like%20to%20enquire%20about%20watch%20servicing.","_blank")}>Get a Free Quote</GoldButton>
        </div></Reveal>
      </div>
    </section>

    {/* Process */}
    <section style={{background:BRAND.cream,padding:"100px 0"}}>
      <div style={{maxWidth:1200,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <Reveal><div style={{textAlign:"center",marginBottom:64}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:16}}>How It Works</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,44px)",color:BRAND.navy,fontWeight:700}}>Simple <span style={{fontStyle:"italic",color:BRAND.gold}}>Process</span></h2>
        </div></Reveal>
        <div style={{display:"grid",gridTemplateColumns:m?"1fr":"repeat(4,1fr)",gap:m?24:0}}>
          {[
            {step:"01",title:"Contact Us",desc:"Send us photos of your watch via WhatsApp with a brief description of the issue."},
            {step:"02",title:"Get a Quote",desc:"We'll assess and give you an honest quote before any work begins. No surprises."},
            {step:"03",title:"Drop It Off",desc:"Bring your watch to us at Far East Plaza #02-20A by appointment."},
            {step:"04",title:"Collect & Enjoy",desc:"We'll notify you when it's ready. Pick up in person or arrange delivery."},
          ].map((s,i)=>(
            <Reveal key={i} delay={i*0.1}><div style={{textAlign:"center",padding:m?"0":"0 32px",borderRight:!m&&i<3?`1px solid rgba(201,168,76,0.2)`:"none"}}>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:48,color:"rgba(201,168,76,0.2)",fontWeight:700,marginBottom:16}}>{s.step}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.navy,fontWeight:700,marginBottom:12}}>{s.title}</div>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.7,margin:0}}>{s.desc}</p>
            </div></Reveal>
          ))}
        </div>
      </div>
    </section>

    {/* FAQ */}
    <section style={{background:BRAND.warmWhite,padding:"100px 0"}}>
      <div style={{maxWidth:800,margin:"0 auto",padding:m?"0 20px":"0 40px"}}>
        <Reveal><div style={{textAlign:"center",marginBottom:56}}>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:12,color:BRAND.gold,letterSpacing:5,textTransform:"uppercase",marginBottom:16}}>Common Questions</div>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(28px,3vw,40px)",color:BRAND.navy,fontWeight:700}}>FAQ</h2>
        </div></Reveal>
        {faqs.map((faq,i)=>(
          <Reveal key={i} delay={i*0.05}><div onClick={()=>setOpenFaq(openFaq===i?null:i)} style={{background:BRAND.cream,border:`1px solid ${openFaq===i?"rgba(201,168,76,0.3)":"rgba(26,39,68,0.06)"}`,cursor:"pointer",overflow:"hidden",marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 28px"}}>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:m?15:17,color:BRAND.navy,fontWeight:600,margin:0}}>{faq.q}</h3>
              <span style={{fontFamily:"'Playfair Display',serif",fontSize:20,color:BRAND.gold,transform:openFaq===i?"rotate(45deg)":"rotate(0)",transition:"transform 0.3s",flexShrink:0,marginLeft:16}}>+</span>
            </div>
            <div style={{maxHeight:openFaq===i?200:0,opacity:openFaq===i?1:0,transition:"all 0.4s cubic-bezier(0.22,1,0.36,1)",overflow:"hidden"}}>
              <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.8,padding:"0 28px 24px",margin:0,borderTop:`1px solid rgba(26,39,68,0.06)`,paddingTop:20}}>{faq.a}</p>
            </div>
          </div></Reveal>
        ))}
        <Reveal><div style={{textAlign:"center",marginTop:48}}>
          <GoldButton onClick={()=>window.open("https://wa.me/6588255367?text=Hi%20Naxo!%20I%27d%20like%20to%20book%20a%20watch%20service.","_blank")}>Book a Service</GoldButton>
        </div></Reveal>
      </div>
    </section>
  </>);
}

export default function NaxoApp() {
  const[page,setPage]=useState("home");const[scrolled,setScrolled]=useState(false);const[transitioning,setTransitioning]=useState(false);const[waOpen,setWaOpen]=useState(false);
  useEffect(()=>{const h=()=>setScrolled(window.scrollY>60);window.addEventListener("scroll",h);return()=>window.removeEventListener("scroll",h)},[]);
  const navigate=(p)=>{if(p===page)return;setTransitioning(true);setTimeout(()=>{setPage(p);window.scrollTo(0,0);setTimeout(()=>setTransitioning(false),50)},300)};
  const pages={home:HomePage,shop:ShopPage,about:AboutPage,journal:JournalPage,events:EventsPage,contact:ContactPage,howitworks:HowItWorksPage,servicing:ServicingPage};
  const Page=pages[page]||HomePage;

  return(
    <div style={{background:BRAND.warmWhite,minHeight:"100vh"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap');
        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}
        ::selection{background:rgba(201,168,76,0.3);color:#1a2744}
        input::placeholder,textarea::placeholder{color:rgba(138,129,114,0.5)}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.3)}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes waPop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
        @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}
      `}</style>
      <div style={{position:"fixed",top:0,left:0,right:0,zIndex:100}}>
        <MarqueeBanner navigate={navigate}/>
        <Nav scrolled={scrolled} currentPage={page} navigate={navigate}/>
      </div>
      <div style={{opacity:transitioning?0:1,transform:transitioning?"translateY(12px)":"translateY(0)",transition:"all 0.3s cubic-bezier(0.22,1,0.36,1)"}}>
        <Page navigate={navigate}/>
      </div>
      <Footer navigate={navigate}/>

      {/* WhatsApp Floating Widget */}
      <div style={{position:"fixed",bottom:28,right:28,zIndex:90,display:"flex",flexDirection:"column",alignItems:"flex-end",gap:12}}>
        {waOpen&&<div style={{background:"#fff",borderRadius:16,padding:"24px 28px",boxShadow:"0 8px 32px rgba(0,0,0,0.15)",maxWidth:280,animation:"waPop 0.3s ease"}}>
          <button onClick={()=>setWaOpen(false)} style={{position:"absolute",top:12,right:16,background:"none",border:"none",fontSize:18,color:"#999",cursor:"pointer"}}>✕</button>
          <div style={{fontFamily:"'Playfair Display',serif",fontSize:18,color:BRAND.navy,fontWeight:700,marginBottom:8}}>Need Help?</div>
          <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:BRAND.stone,lineHeight:1.6,marginBottom:16}}>Chat with us about watches, pricing, or anything else. We're happy to help!</p>
          <a href="https://wa.me/6588255367?text=Hi%20Naxo!%20I%27d%20like%20to%20know%20more." target="_blank" rel="noopener noreferrer" style={{display:"block",background:"#25D366",color:"#fff",fontFamily:"'Cormorant Garamond',serif",fontSize:15,fontWeight:600,textAlign:"center",padding:"14px 24px",borderRadius:10,textDecoration:"none",letterSpacing:1,transition:"background 0.3s"}}
          onMouseEnter={e=>e.target.style.background="#1ebe57"} onMouseLeave={e=>e.target.style.background="#25D366"}>Chat on WhatsApp</a>
        </div>}
        {!waOpen&&<div style={{background:"rgba(255,255,255,0.95)",borderRadius:20,padding:"8px 16px",boxShadow:"0 2px 12px rgba(0,0,0,0.08)",fontFamily:"'Cormorant Garamond',serif",fontSize:13,color:BRAND.navy,animation:"waPop 0.3s ease",animationDelay:"2s",animationFillMode:"both"}}>Chat with us!</div>}
        <button onClick={()=>setWaOpen(!waOpen)} style={{width:60,height:60,borderRadius:"50%",background:"#25D366",border:"none",cursor:"pointer",boxShadow:"0 4px 20px rgba(37,211,102,0.4)",display:"flex",alignItems:"center",justifyContent:"center",transition:"transform 0.3s",animation:"float 3s ease-in-out infinite"}}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </button>
      </div>
    </div>
  );
}
