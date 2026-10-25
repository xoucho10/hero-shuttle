"use client"
import { useEffect } from "react"

export default function TripAdvisorWidget() {
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://www.jscache.com/wejs?wtype=cdswritereviewlg&uniq=34749047&locationId=34749047&lang=en_US&border=true&display_version=2"
    script.async = true
    document.getElementById("TA_widget")?.appendChild(script)
  }, [])

  return (
    <div className="w-full flex flex-col items-center">
      {/* TripAdvisor Certificate + Reviews Button */}
      <div id="TA_cdswritereviewlg34749047" className="TA_cdswritereviewlg">
        <ul id="oGpZ7Y" className="TA_links">
          <li id="Y1R0k2" className="wJ3c1d">
            <a target="_blank" href="https://www.tripadvisor.com/Attraction_Review-g8055401-d34749047-Reviews-Hero_Shuttles-Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html">
              Hero Shuttles on TripAdvisor
            </a>
          </li>
        </ul>
      </div>
      
      {/* Direct link + Embed iframe fallback */}
      <div id="TA_widget" className="mt-4 w-full"></div>
      
      <div className="mt-6 text-center">
        <a 
          href="https://www.tripadvisor.com/Attraction_Review-g8055401-d34749047-Reviews-Hero_Shuttles-Zanzibar_City_Zanzibar_Island_Zanzibar_Archipelago.html" 
          target="_blank"
          className="inline-block bg-[#00af87] text-white px-8 py-3 rounded-full font-bold hover:bg-[#008f6e]"
        >
          Read all reviews on TripAdvisor
        </a>
        <div className="mt-4">
          <iframe
            src="https://www.tripadvisor.com/WidgetEmbed-cdswritereviewlg?locationId=34749047&display_version=2&uniq=34749047&lang=en_US&border=true"
            width="100%"
            height="400"
            frameBorder="0"
            className="rounded-xl"
          ></iframe>
        </div>
      </div>
    </div>
  )
}