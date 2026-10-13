useEffect(()=>{
  const load=async()=>{
    // 1. LOCAL FIRST - so picture shows instantly
    try{
      const v=localStorage.getItem("hero_transfers")
      if(v){
        const p=JSON.parse(v)
        if(Array.isArray(p)&&p.length>0){
          setTransfers(p.map((x:any)=>({
            id:x.id,
            name:x.name,
            area:x.area||"West",
            duration:x.duration||"",
            price:x.price,
            market:x.market||x.market_price||x.price,
            desc:x.desc||x.description||"",
            imageDatas:x.imageDatas||x.image_urls||[]
          })))
        }
      }
    }catch{}

    // 2. THEN try DB to merge - DB wins for price but keeps local images if DB has none
    try{
      const r=await fetch('/api/transfers',{cache:'no-store'})
      const d=await r.json()
      if(Array.isArray(d)&&d.length>0 && d.length>=3){ // only if DB has real data
        setTransfers(prev=>{
          const dbMap=new Map(d.map((x:any)=>[x.id,x]))
          return prev.map(t=>{
            const db:any=dbMap.get(t.id)
            if(!db) return t
            // Keep local image if DB image empty
            const dbImages = db.image_urls||[]
            const keepImages = dbImages.length>0? dbImages : (t.imageDatas||[])
            return {...t, price:db.price??t.price, market:db.market_price??db.market??t.market, imageDatas:keepImages}
          })
        })
      }
    }catch{}
  }
  load()
},[])